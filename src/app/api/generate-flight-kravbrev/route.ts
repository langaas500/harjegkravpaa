import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { runWithTimeout } from "@/lib/runWithTimeout";
import { logEvent, generateRequestId } from "@/lib/logger";

const client = new Anthropic();

function cleanText(raw: string) {
  let t = (raw || "").trim();
  if (t.startsWith("```")) {
    t = t.replace(/^```[a-zA-Z]*\n?/, "");
    t = t.replace(/```$/, "");
  }
  return t.trim();
}

function safeStr(v: unknown, fallback = ""): string {
  if (typeof v === "string") return v.trim();
  return fallback;
}

// Reformuler brukerens fritekst til nøytral saksfremstilling
function reformulateText(raw: string): string {
  if (!raw) return "";
  let text = raw
    .replace(/!!+/g, ".")
    .replace(/\?\?+/g, "?")
    .replace(/\.\.\.+/g, ".")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length > 0) {
    text = text.charAt(0).toUpperCase() + text.slice(1);
  }
  if (text.length > 0 && !text.match(/[.!?]$/)) {
    text += ".";
  }
  return text;
}

// Sjekk kritiske felt
function getMissingFields(data: Record<string, unknown>): string[] {
  const missing: string[] = [];
  const flight = data.flight as Record<string, string> | undefined;

  if (!flight?.flightNumber) missing.push("Flightnummer");
  if (!flight?.airline) missing.push("Flyselskap");
  if (!flight?.flightDate) missing.push("Flydato");
  if (!flight?.departureAirport) missing.push("Avgangssted");
  if (!flight?.arrivalAirport) missing.push("Destinasjon");
  if (!data.passengerName) missing.push("Passasjernavn");

  return missing;
}

// Formater dato til norsk
function formatDate(dateString: string): string {
  if (!dateString) return "[DATO]";
  return new Date(dateString).toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// EU261 kompensasjonsbeløp basert på distanse
function getEU261Amount(distanceCategory: string): string {
  switch (distanceCategory) {
    case "short": return "EUR 250";
    case "medium": return "EUR 400";
    case "long": return "EUR 600";
    default: return "EUR 250–600 avhengig av distanse";
  }
}

export async function POST(req: NextRequest) {
  const requestId = generateRequestId();
  const start = Date.now();

  try {
    const data = await req.json();

    const flight = data.flight as Record<string, string> | undefined;
    const problemType = data.problemType as string;
    const isBaggage = problemType === "BAGGAGE";

    // Kritiske felt-sjekk
    const missingFields = getMissingFields(data);

    // Datoer
    const dagensDato = new Date().toLocaleDateString("nb-NO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const betalingsfristDato = new Date(
      Date.now() + 14 * 24 * 60 * 60 * 1000
    ).toLocaleDateString("nb-NO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Kontaktinfo
    const contactInfo = data.contactInfo || {};
    const passengerName = safeStr(data.passengerName, "[NAVN]");
    const passengerAddress = safeStr(contactInfo.address, "[ADRESSE]");
    const passengerPostcode = safeStr(contactInfo.postcode, "[POSTNR]");
    const passengerCity = safeStr(contactInfo.city, "[POSTSTED]");
    const passengerPhone = safeStr(contactInfo.phone, "");
    const passengerEmail = safeStr(contactInfo.email, "");

    const airline = safeStr(flight?.airline, "[FLYSELSKAP]");
    const flightNumber = safeStr(flight?.flightNumber, "[FLIGHTNUMMER]");
    const flightDate = formatDate(flight?.flightDate || "");
    const departureAirport = safeStr(flight?.departureAirport, "[AVGANG]");
    const arrivalAirport = safeStr(flight?.arrivalAirport, "[DESTINASJON]");
    const bookingReference = safeStr(flight?.bookingReference || data.bookingReference || contactInfo.bookingReference, "");

    // Tidspunkter for EU261-saker (fra wizard flight-objekt eller direkte)
    const scheduledDeparture = safeStr(flight?.scheduledDeparture || data.scheduledDeparture || contactInfo.scheduledDeparture, "");
    const scheduledArrival = safeStr(flight?.scheduledArrival || data.scheduledArrival || contactInfo.scheduledArrival, "");
    const actualArrival = safeStr(data.actualArrival || contactInfo.actualArrival, "");
    const distanceCategory = safeStr(data.distanceCategory, ""); // short/medium/long

    // Nye felter fra wizard
    const cancellationNoticeDate = safeStr(data.cancellationNoticeDate, "");
    const cancellationNoticeChannel = safeStr(data.cancellationNoticeChannel, "");
    const alternativeAccepted = data.alternativeAccepted;
    const additionalInfo = safeStr(data.additionalInfo, "");
    const bankAccount = safeStr(data.bankAccount, "");

    // Art. 9 utgifter (EU261)
    const hadExpenses = data.hadExpenses;
    const eu261ExpenseTypes = data.eu261ExpenseTypes as string[] | undefined;
    const eu261ExpenseAmount = safeStr(data.eu261ExpenseAmount, "");
    const eu261ExpenseDescription = safeStr(data.eu261ExpenseDescription, "");

    // Map for EU261 expense types
    const eu261ExpenseTypeMap: Record<string, string> = {
      food: "mat/drikke",
      hotel: "hotell",
      transport: "transport",
      phone: "telefon/kommunikasjon",
    };

    // Bearbeid brukerens fritekst
    const bearbeidetBeskrivelse = reformulateText(data.userDescription || "");
    const bearbeidetAirlineResponse = reformulateText(data.airlineResponse || "");

    // Passasjer signatur
    const passengerSignatur = [
      passengerName,
      passengerAddress,
      `${passengerPostcode} ${passengerCity}`,
      passengerPhone ? `Tlf: ${passengerPhone}` : "",
      passengerEmail ? `E-post: ${passengerEmail}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    // Problemtype maps
    const delayMap: Record<string, string> = {
      under2: "under 2 timer",
      "2to3": "2–3 timer",
      "3to4": "3–4 timer",
      over4: "over 4 timer",
      never: "flyet ankom aldri",
    };
    const delayText = data.delayDuration ? delayMap[data.delayDuration as string] : "";

    const cancellationMap: Record<string, string> = {
      under7: "under 7 dager",
      "7to14": "7–14 dager",
      over14: "over 14 dager",
    };
    const cancellationNoticeText = data.cancellationNotice ? cancellationMap[data.cancellationNotice as string] : "";

    // Bagasje maps
    const baggageTypeMap: Record<string, string> = {
      delayed: "forsinket",
      lost: "tapt",
      damaged: "skadet",
    };
    const baggageTypeText = data.baggageType ? baggageTypeMap[data.baggageType as string] : "";

    const baggageDelayMap: Record<string, string> = {
      under24h: "under 24 timer",
      "1to2days": "1–2 døgn",
      "2to4days": "2–4 døgn",
      over4days: "over 4 døgn",
    };
    const baggageDelayText = data.baggageDelayDuration ? baggageDelayMap[data.baggageDelayDuration as string] : "";

    const expenseTypeMap: Record<string, string> = {
      clothes: "klær",
      toiletries: "toalettsaker",
      work_equipment: "arbeidsutstyr",
      transport: "transport",
      medicine: "nødvendige medisiner",
      other: "øvrige nødvendigheter",
    };
    const expenseTypes = data.expenseTypes as string[] | undefined;
    const totalExpenseAmount = safeStr(data.totalExpenseAmount, "");

    // Bygg missing fields-seksjon
    let missingFieldsSection = "";
    if (missingFields.length > 0) {
      missingFieldsSection = `⚠️ FYLL INN FØR SENDING:
${missingFields.map((f) => `• ${f}: _______________`).join("\n")}

────────────────────────────────────────

`;
    }

    // Kompensasjonsbeløp
    const compensationAmount = distanceCategory ? getEU261Amount(distanceCategory) : "EUR 250–600";

    // ═══════════════════════════════════════════════════════════════════════════
    // SYSTEM PROMPT - Juridisk sterk, taktisk presis kravbrev-generator
    // ═══════════════════════════════════════════════════════════════════════════

    const systemPrompt = `DU ER EN SPESIALISERT KRAVBREV-GENERATOR FOR FLYSAKER.

Ditt eneste formål er å produsere juridisk sterke, taktisk presise og produksjonsklare kravbrev mot flyselskap.

GRUNNPRINSIPPER:
1. ALDRI skriv saksspesifikt uten at det kommer fra input
2. ALDRI bruk generiske eller hypotetiske formuleringer
3. ALDRI be pent eller bruk høflig usikkerhet
4. ALLTID:
   - Lås juridisk trigger (EU261 eller Montreal) eksplisitt
   - Plasser bevisbyrde hos flyselskapet
   - Krev dokumentasjon dersom ekstraordinære forhold påberopes
   - Avslutt med konkret betalingskrav, frist og eskaleringsplan

${isBaggage ? `
MONTREAL-KONVENSJONEN (BAGASJE):
- Flyselskapet har OBJEKTIVT ansvar for forsinket innsjekket bagasje
- Kun RIMELIGE og NØDVENDIGE utgifter skal kreves
- Hver utgift må knyttes til FORMÅL og TIDSKRITIKALITET
- Ikke bruk vage krav om "ulempe" – kun konkret økonomisk tap
` : `
EU-FORORDNING 261/2004 (FORSINKELSE/INNSTILLING):
- Vurdering baseres på FAKTISK ANKOMSTFORSINKELSE (>3 timer utløser kompensasjon)
- Du SKAL eksplisitt angi: planlagt ankomst, faktisk ankomst (dør åpnet), samlet forsinkelse
- "Tekniske problemer" = NORMAL DRIFT med mindre flyselskapet dokumenterer annet
- Manglende dokumentasjon fra flyselskapet tolkes i passasjerens favør
- Bevisbyrden for ekstraordinære omstendigheter ligger hos flyselskapet
`}

STRUKTUR (OBLIGATORISK REKKEFØLGE):

1. KONKLUSJON OG KRAV (ØVERST)
   - Hva kreves (beløp)
   - Juridisk hjemmel (én setning)
   - Betalingsfrist

2. FAKTUM
   - Flightnummer, rute, dato
   - Presise tidspunkt (planlagt vs faktisk)
   - Hva som skjedde (kort, nøytralt)

3. JURIDISK VURDERING
   - Hvorfor EU261/Montreal gjelder
   - Hvorfor flyselskapet er ansvarlig
   - Hvorfor evt. påberopte ekstraordinære omstendigheter ikke fritar

4. SPESIFISERT KRAV
   - Hovedkrav (kompensasjon/erstatning)
   - Eventuelle tilleggskrav (utgifter)
   - Totalt beløp

5. BETALINGSFRIST OG ESKALERING
   - 14 dagers frist
   - Konsekvens: Transportklagenemnda, deretter rettslige skritt

LENGDE: 2–2,5 sider (ca. 600–800 ord)
SPRÅK: Nøkternt, autoritativt, ikke emosjonelt

FORBUD:
❌ Hypotetiske formuleringer ("dersom", "muligens", "kan tyde på")
❌ Åpne for flyselskapets tolkning
❌ Uklare krav eller beløp
❌ Høflighetsfraser eller "håper på forståelse"
❌ Referanser til AI, system eller rapport

LEVERANSE:
Returner KUN kravbrevet. Ingen innledning, ingen avsluttende kommentar.`;

    // ═══════════════════════════════════════════════════════════════════════════
    // USER PROMPT - Saksspesifikk data
    // ═══════════════════════════════════════════════════════════════════════════

    let userPrompt: string;

    if (isBaggage) {
      // MONTREAL - BAGASJE
      const expenseList = expenseTypes
        ? expenseTypes.map((t) => `- ${expenseTypeMap[t] || t}`).join("\n")
        : "";

      userPrompt = `GENERER KRAVBREV – BAGASJE (MONTREAL-KONVENSJONEN)

═══════════════════════════════════════════════════════════════
AVSENDER (PASSASJER):
${passengerSignatur}

MOTTAKER:
${airline}
[Kundeservice/Reklamasjonsavdeling]

DATO: ${dagensDato}
═══════════════════════════════════════════════════════════════

FLYVNING:
• Flightnummer: ${flightNumber}
• Rute: ${departureAirport} → ${arrivalAirport}
• Dato: ${flightDate}
${bookingReference ? `• Bookingreferanse: ${bookingReference}` : ""}

BAGASJEPROBLEM:
• Type: ${baggageTypeText} bagasje
${baggageDelayText ? `• Forsinkelsens varighet: ${baggageDelayText}` : ""}
• PIR-skjema utfylt: ${data.hasPIR ? "Ja" : "Nei/Ukjent"}

DOKUMENTERTE UTGIFTER:
${expenseList || "Ikke spesifisert"}
${totalExpenseAmount ? `\nTOTALT KRAV: kr ${totalExpenseAmount}` : ""}

SAKSBESKRIVELSE:
${bearbeidetBeskrivelse || "Bagasjen ankom ikke som planlagt. Passasjeren pådro seg nødvendige utgifter i venteperioden."}

${data.hadWorkMeetings ? `ARBEID/MØTER PÅVIRKET: ${data.workMeetingsDetails || "Ja, jobb- eller møterelaterte behov var påvirket."}` : ""}

${bearbeidetAirlineResponse ? `FLYSELSKAPETS TIDLIGERE SVAR: "${bearbeidetAirlineResponse}"` : ""}

BETALINGSFRIST: ${betalingsfristDato}

═══════════════════════════════════════════════════════════════
SKRIV KRAVBREVET NÅ.
Bruk Montreal-konvensjonen art. 17, 19 og 22 som hjemmel.
Kravet gjelder erstatning for nødvendige og rimelige utgifter.
Flyselskapet har objektivt ansvar – ingen unnskyldningsgrunnlag.
═══════════════════════════════════════════════════════════════`;

    } else {
      // EU261 - FORSINKELSE / INNSTILLING / NEKTET OMBORDSTIGNING
      const problemTypeNorsk = problemType === "DELAY" ? "FORSINKELSE"
        : problemType === "CANCELLED" ? "INNSTILLING"
        : "NEKTET OMBORDSTIGNING";

      // Build Art. 9 expense section if applicable
      const eu261ExpenseList = eu261ExpenseTypes
        ? eu261ExpenseTypes.map((t) => eu261ExpenseTypeMap[t] || t).join(", ")
        : "";

      // Build channel text
      const channelMap: Record<string, string> = {
        sms: "SMS",
        email: "e-post",
        app: "app-varsel",
        phone: "telefon",
        airport: "på flyplassen",
      };
      const noticeChannelText = cancellationNoticeChannel ? channelMap[cancellationNoticeChannel] || cancellationNoticeChannel : "";

      userPrompt = `GENERER KRAVBREV – ${problemTypeNorsk} (EU-FORORDNING 261/2004)

═══════════════════════════════════════════════════════════════
AVSENDER (PASSASJER):
${passengerSignatur}

MOTTAKER:
${airline}
[Kundeservice/Reklamasjonsavdeling]

DATO: ${dagensDato}
═══════════════════════════════════════════════════════════════

FLYVNING:
• Flightnummer: ${flightNumber}
• Rute: ${departureAirport} → ${arrivalAirport}
• Dato: ${flightDate}
${bookingReference ? `• Bookingreferanse (PNR): ${bookingReference}` : ""}

TIDSPUNKTER:
${scheduledDeparture ? `• Planlagt avgang: ${scheduledDeparture}` : "• Planlagt avgang: [FYLL INN]"}
${scheduledArrival ? `• Planlagt ankomst: ${scheduledArrival}` : "• Planlagt ankomst: [FYLL INN]"}
${problemType === "DELAY" && actualArrival ? `• Faktisk ankomst (dør åpnet): ${actualArrival}` : problemType === "DELAY" ? "• Faktisk ankomst: [FYLL INN]" : ""}
${problemType === "DELAY" ? `• Forsinkelse ved ankomst: ${delayText || "[FYLL INN ANTALL TIMER]"}` : ""}
${problemType === "CANCELLED" ? `• Varsel om innstilling: ${cancellationNoticeText} før avgang` : ""}
${problemType === "CANCELLED" && cancellationNoticeDate ? `• Varsel mottatt: ${formatDate(cancellationNoticeDate)}${noticeChannelText ? ` via ${noticeChannelText}` : ""}` : ""}

KOMPENSASJONSKRAV:
• Standardkompensasjon: ${compensationAmount} (EU261 art. 7)
${hadExpenses && eu261ExpenseAmount ? `• Tilleggsutgifter (art. 9): kr ${eu261ExpenseAmount}${eu261ExpenseList ? ` (${eu261ExpenseList})` : ""}` : ""}
• Hjemmel: EU-forordning 261/2004 art. 5, 7${hadExpenses ? ", 9" : ""}

SAKSBESKRIVELSE:
${bearbeidetBeskrivelse || `Flyvning ${flightNumber} ble ${problemType === "DELAY" ? "forsinket" : problemType === "CANCELLED" ? "innstilt" : "oversolgt, og passasjeren ble nektet ombordstigning"}.`}

${additionalInfo ? `TILLEGGSINFORMASJON: ${reformulateText(additionalInfo)}` : ""}

${data.wasExtraordinary === true ? `
FLYSELSKAPETS PÅSTAND OM EKSTRAORDINÆRE OMSTENDIGHETER:
"${reformulateText(data.extraordinaryReason as string || "Ikke spesifisert")}"

PASSASJERENS POSISJON:
Flyselskapet har ikke fremlagt dokumentasjon som underbygger påstanden. Tekniske problemer, bemanningsproblemer og operative forsinkelser utgjør normal drift og fritar ikke for kompensasjonsansvar. Bevisbyrden ligger hos flyselskapet (EU261 art. 5 nr. 3).
` : ""}

${bearbeidetAirlineResponse ? `FLYSELSKAPETS TIDLIGERE SVAR: "${bearbeidetAirlineResponse}"` : ""}

${data.offeredAlternative !== null ? `TILBUDT ALTERNATIV TRANSPORT: ${data.offeredAlternative ? "Ja" : "Nei"}` : ""}
${data.alternativeDetails ? `ALTERNATIVDETALJER: ${reformulateText(data.alternativeDetails as string)}` : ""}
${alternativeAccepted !== null && data.offeredAlternative ? `AKSEPTERT: ${alternativeAccepted ? "Ja" : "Nei"}` : ""}

${bankAccount ? `KONTONUMMER FOR UTBETALING: ${bankAccount}` : ""}

BETALINGSFRIST: ${betalingsfristDato}

═══════════════════════════════════════════════════════════════
SKRIV KRAVBREVET NÅ.

VIKTIGE KRAV TIL INNHOLDET:
1. Start med KONKLUSJON: "Jeg krever utbetaling av [BELØP] innen [FRIST]"
2. Flightnummer ${flightNumber} skal nevnes minst 2 ganger
3. Angi presise tidspunkt for å dokumentere forsinkelsen
4. Plasser bevisbyrden eksplisitt hos flyselskapet
5. Inkluder én rettskilde-henvisning (f.eks. Sturgeon C-402/07 for forsinkelse)
6. Avslutt med klar eskaleringsplan (Transportklagenemnda → rettslige skritt)
${hadExpenses && eu261ExpenseAmount ? `7. Inkluder Art. 9-utgifter (kr ${eu261ExpenseAmount}) i SPESIFISERT KRAV-seksjonen` : ""}
${bankAccount ? `8. Inkluder kontonummer ${bankAccount} i betalingsinformasjonen` : ""}

SPRÅKKRAV:
- Nøkternt og autoritativt
- Ingen høflighetsfraser
- Ingen usikkerhet eller "muligens"
- Konkret og direkte
═══════════════════════════════════════════════════════════════`;
    }

    const message = await runWithTimeout(
      client.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        messages: [{ role: "user", content: userPrompt }],
        system: systemPrompt,
      }),
      60000
    );

    const content = message.content[0];
    if (content.type !== "text") throw new Error("Unexpected response type");

    let brev = cleanText(content.text);

    // Legg til missing fields-seksjon øverst hvis nødvendig
    if (missingFields.length > 0 && !brev.includes("FYLL INN FØR SENDING")) {
      brev = missingFieldsSection + brev;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // FALLBACK - Hvis AI-generert brev er for kort eller mislykket
    // ═══════════════════════════════════════════════════════════════════════════

    if (brev.length < 800) {
      if (isBaggage) {
        // Montreal fallback
        const expenseListFormatted = expenseTypes
          ? expenseTypes.map((t, i) => `   ${i + 1}. ${expenseTypeMap[t] || t}`).join("\n")
          : "   1. Nødvendige utgifter i venteperioden";

        brev = `${missingFieldsSection}${passengerName}
${passengerAddress}
${passengerPostcode} ${passengerCity}${passengerPhone ? `\nTlf: ${passengerPhone}` : ""}${passengerEmail ? `\nE-post: ${passengerEmail}` : ""}

${dagensDato}

${airline}
Kundeservice / Reklamasjonsavdeling


KRAV OM ERSTATNING – ${baggageTypeText.toUpperCase()} BAGASJE
Flyvning ${flightNumber}, ${departureAirport} → ${arrivalAirport}, ${flightDate}
${bookingReference ? `Bookingreferanse: ${bookingReference}` : ""}

────────────────────────────────────────────────────────────────

KONKLUSJON OG KRAV

Jeg krever erstatning på kr ${totalExpenseAmount || "[BELØP]"} for dokumenterte utgifter som følge av ${baggageTypeText} bagasje på ovennevnte flyvning.

Kravet fremmes med hjemmel i Montrealkonvensjonen art. 17 og 19. Flyselskapet har objektivt ansvar for forsinket innsjekket bagasje.

Betalingsfrist: ${betalingsfristDato}

────────────────────────────────────────────────────────────────

FAKTUM

Min innsjekket bagasje ankom ikke med flyvning ${flightNumber} fra ${departureAirport} til ${arrivalAirport} den ${flightDate}.${baggageDelayText ? ` Bagasjen var forsinket i ${baggageDelayText}.` : ""}

${bearbeidetBeskrivelse || "I venteperioden var det nødvendig å anskaffe erstatningsartikler for å dekke umiddelbare behov."}

${data.hasPIR ? "PIR-skjema (Property Irregularity Report) ble utfylt på flyplassen." : ""}

────────────────────────────────────────────────────────────────

JURIDISK VURDERING

Etter Montrealkonvensjonen art. 19 er flyselskapet ansvarlig for skade som følge av forsinkelse i lufttransporten av passasjerer, bagasje eller gods. Ansvaret er objektivt – flyselskapet kan ikke fritas ved å vise til driftsmessige forhold.

Passasjeren har rett til erstatning for rimelige og nødvendige utgifter som oppsto som direkte følge av bagasjeforsinkelsen. Erstatningen er begrenset til ca. 1 288 SDR (omtrent kr 16 000) per passasjer, jf. art. 22.

────────────────────────────────────────────────────────────────

SPESIFISERT KRAV

Følgende utgifter kreves erstattet:

${expenseListFormatted}

Totalt krav: kr ${totalExpenseAmount || "[FYLL INN BELØP]"}

Kvitteringer for samtlige utgifter er vedlagt.

────────────────────────────────────────────────────────────────

BETALINGSFRIST OG ESKALERING

Kravet forfaller til betaling innen ${betalingsfristDato}.

Ved manglende betaling vil saken bli innklaget til Transportklagenemnda for flypassasjerer. Dersom nemndsbehandling ikke fører frem, forbeholder jeg meg retten til å forfølge kravet rettslig. Flyselskapet vil i så fall bli holdt ansvarlig for sakskostnader.

────────────────────────────────────────────────────────────────

VEDLEGG
- ${data.hasPIR ? "PIR-skjema\n- " : ""}Bagasjetag / bagasjekvittering
- Kvitteringer for dokumenterte utgifter
${bookingReference ? `- Bookingbekreftelse (ref: ${bookingReference})` : "- Bookingbekreftelse"}

────────────────────────────────────────────────────────────────

Med vennlig hilsen

${passengerSignatur}`;

      } else {
        // EU261 fallback
        brev = `${missingFieldsSection}${passengerName}
${passengerAddress}
${passengerPostcode} ${passengerCity}${passengerPhone ? `\nTlf: ${passengerPhone}` : ""}${passengerEmail ? `\nE-post: ${passengerEmail}` : ""}

${dagensDato}

${airline}
Kundeservice / Reklamasjonsavdeling


KRAV OM KOMPENSASJON – ${problemType === "DELAY" ? "FORSINKET" : problemType === "CANCELLED" ? "INNSTILT" : "NEKTET OMBORDSTIGNING"} FLYVNING
Flyvning ${flightNumber}, ${departureAirport} → ${arrivalAirport}, ${flightDate}
${bookingReference ? `Bookingreferanse: ${bookingReference}` : ""}

────────────────────────────────────────────────────────────────

KONKLUSJON OG KRAV

Jeg krever utbetaling av ${compensationAmount} i standardkompensasjon etter EU-forordning 261/2004 art. 7.

Betalingsfrist: ${betalingsfristDato}

────────────────────────────────────────────────────────────────

FAKTUM

Flyvning ${flightNumber} fra ${departureAirport} til ${arrivalAirport} den ${flightDate} ${problemType === "DELAY" ? `ankom destinasjonen med en forsinkelse på ${delayText || "over 3 timer"}` : problemType === "CANCELLED" ? `ble innstilt med varsel ${cancellationNoticeText || "under 14 dager"} før avgang` : "var oversolgt, og jeg ble nektet ombordstigning mot min vilje"}.

${scheduledArrival ? `Planlagt ankomst: ${scheduledArrival}` : ""}
${actualArrival ? `Faktisk ankomst (dør åpnet): ${actualArrival}` : ""}
${delayText ? `Samlet forsinkelse: ${delayText}` : ""}

${bearbeidetBeskrivelse || ""}

────────────────────────────────────────────────────────────────

JURIDISK VURDERING

EU-forordning 261/2004 gjelder for alle flygninger fra EU/EØS-land, samt flygninger til EU/EØS med EU-registrert flyselskap. Flyvningen oppfyller vilkårene for forordningens anvendelse.

${problemType === "DELAY" ? "Etter EU-domstolens praksis (Sturgeon, C-402/07) har passasjerer rett til kompensasjon ved ankomstforsinkelse på 3 timer eller mer. Forsinkelsen på denne flyvningen overstiger denne terskelen." : problemType === "CANCELLED" ? "Ved innstilling med mindre enn 14 dagers varsel har passasjerer rett til kompensasjon etter art. 5 og 7, med mindre flyselskapet kan dokumentere ekstraordinære omstendigheter." : "Ved nektet ombordstigning mot passasjerens vilje har passasjeren alltid rett til kompensasjon etter art. 4 og 7."}

${data.wasExtraordinary === true ? `
Flyselskapet har påberopt "${reformulateText(data.extraordinaryReason as string || "ekstraordinære omstendigheter")}". Jeg avviser denne påstanden. Tekniske problemer, bemanningsproblemer og operative forsinkelser utgjør normal drift og fritar ikke for kompensasjonsansvar, jf. EU-domstolens faste praksis.

Bevisbyrden for ekstraordinære omstendigheter ligger hos flyselskapet (art. 5 nr. 3). Jeg ber om at flyselskapet fremlegger dokumentasjon som underbygger påstanden – herunder tekniske logger, METAR-data eller tilsvarende. Manglende dokumentasjon innebærer at unntaket ikke kommer til anvendelse.
` : "Flyselskapet har ikke påberopt ekstraordinære omstendigheter. Kompensasjonsplikten er derfor ubestridt."}

────────────────────────────────────────────────────────────────

SPESIFISERT KRAV

1. Standardkompensasjon etter EU 261/2004 art. 7: ${compensationAmount}
${hadExpenses && eu261ExpenseAmount ? `2. Dokumenterte tilleggsutgifter (art. 9): kr ${eu261ExpenseAmount}${eu261ExpenseDescription ? ` (${eu261ExpenseDescription})` : ""}` : ""}

${hadExpenses && eu261ExpenseAmount ? `Totalt krav: ${compensationAmount} + kr ${eu261ExpenseAmount}` : `Totalt krav: ${compensationAmount}`}

────────────────────────────────────────────────────────────────

BETALINGSFRIST OG ESKALERING

Kravet forfaller til betaling innen ${betalingsfristDato}.
${bankAccount ? `\nKontonummer for utbetaling: ${bankAccount}` : ""}

Ved manglende betaling vil saken bli innklaget til Transportklagenemnda for flypassasjerer. Nemndas avgjørelser er rådgivende, men følges av de fleste flyselskaper. Dersom nemndsbehandling ikke fører frem, vil kravet bli forfulgt rettslig. Flyselskapet vil i så fall bli holdt ansvarlig for sakskostnader i tillegg til hovedkravet.

Det er billigere for flyselskapet å betale nå enn å bestride kravet.

────────────────────────────────────────────────────────────────

VEDLEGG
- Boardingkort / bookingbekreftelse
${bookingReference ? `- Bookingreferanse: ${bookingReference}` : ""}
- Dokumentasjon på forsinkelse/innstilling (skjermbilde, SMS, e-post)
${hadExpenses ? "- Kvitteringer for tilleggsutgifter" : ""}
${bearbeidetAirlineResponse ? "- Tidligere korrespondanse med flyselskapet" : ""}

────────────────────────────────────────────────────────────────

Med vennlig hilsen

${passengerSignatur}`;
      }
    }

    logEvent({
      route: "generate-flight-kravbrev",
      category: "fly",
      requestId,
      status: "ok",
      latencyMs: Date.now() - start,
      model: "claude-sonnet-4-20250514",
    });

    return NextResponse.json({ kravbrev: brev });
  } catch (error) {
    const latencyMs = Date.now() - start;
    const isTimeout = error instanceof Error && error.message === "TIMEOUT";

    console.error("Flight kravbrev generation error:", error);

    logEvent({
      route: "generate-flight-kravbrev",
      category: "fly",
      requestId,
      status: isTimeout ? "timeout" : "error",
      latencyMs,
      model: "claude-sonnet-4-20250514",
    });

    if (isTimeout) {
      return NextResponse.json(
        { error: "Genereringen tok for lang tid. Prøv igjen.", requestId },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: "Kunne ikke generere kravbrev. Prøv igjen.", requestId },
      { status: 500 }
    );
  }
}
