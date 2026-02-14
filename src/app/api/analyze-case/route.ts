import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const vehicleType = data.vehicleType || "CAR";
    const vehicleName = vehicleType === "MOTORCYCLE" ? "motorsykkel" : "bil";
    const vehicleNameCapital = vehicleType === "MOTORCYCLE" ? "Motorsykkel" : "Bil";

    const isDealer = data.sellerType === "DEALER";
    const applicableLaw = isDealer ? "Forbrukerkjøpsloven" : "Kjøpsloven";
    const warrantyPeriod = isDealer ? "5 år (2 år for slitedeler)" : "2 år";

    const purchaseDate = data.vehicle?.purchaseDate;
    let daysSincePurchase = null;
    if (purchaseDate) {
      const purchase = new Date(purchaseDate);
      const today = new Date();
      daysSincePurchase = Math.ceil(
        (today.getTime() - purchase.getTime()) / (1000 * 60 * 60 * 24)
      );
    }

    const prompt = `🧠 VURDERINGSRAPPORT - Du er en erfaren norsk forbrukerjurist

ROLLE:
Du skriver kun en vurderingsrapport til kjøper.
Du skriver aldri kravbrev, aldri formelle krav, aldri trusler.
Du forklarer juridiske rettigheter på klart, rolig og forståelig norsk.

FORMÅL:
Rapporten skal:
- gi brukeren trygghet
- forklare situasjonen i vanlig språk
- oversette juss til praktisk betydning
- hjelpe brukeren å forstå valgene sine
- gjøre brukeren klar for neste steg

MÅLGRUPPE:
Leseren kan være ung/eldre, lite/moderat juridisk kyndig, usikker eller frustrert.
Skriv slik at leseren tenker: "Dette er lett å forstå. Jeg vet hvor jeg står og hva jeg bør gjøre."

NIVÅ-VURDERING (bruk vektingskriteriene aktivt):
- "GREEN" = Sterkt krav - flere momenter taler for at kjøper kan ha et krav
- "YELLOW" = Mulig krav - usikkert, avhenger av ytterligere dokumentasjon
- "RED" = Svakt krav - få momenter taler for kjøpers sak

VEKTINGSKRITERIER:
Sterke GREEN-indikatorer (2+ av disse → GREEN):
- Forhandlerkjøp + feil innen 2 år (presumsjonsregelen § 18)
- Verkstedsrapport som bekrefter teknisk svikt (ikke slitasje)
- Sikkerhetskritisk feil eller bil ikke kjørbar
- Selger ga uriktige opplysninger eller brøt løfter
- Skjult feil som ikke kunne oppdages ved vanlig undersøkelse
- Rask reklamasjon og god dokumentasjon

Sterke RED-indikatorer (2+ av disse → RED):
- Privatkjøp + lang tid siden kjøp + ingen dokumentasjon
- Normal slitasje for bilens alder og kilometerstand
- Synlig feil som kjøper burde ha oppdaget (åpenbarhetsregelen)
- Ikke reklamert innen rimelig tid
- Lav reparasjonskostnad i forhold til kjøpesum
- Kjøper har bidratt til feilen

YELLOW = motstridende indikatorer eller manglende dokumentasjon

VIKTIG OVERSTYRINGSREGEL:
- Uriktige opplysninger fra selger overstyrer «som den er»-klausulen (kjøpsloven § 18/§ 19). Hvis selger beviselig ga feil informasjon (f.eks. løy om EU-kontroll, kilometerstand, eller tilstand), skal dette veie tungt — uavhengig av om det er privatkjøp.
- Når det er motstridende GREEN- og RED-indikatorer, velg YELLOW — ikke RED.

JURIDISK KONTEKST:
- Gjeldende lov: ${applicableLaw}
- Reklamasjonsfrist: ${warrantyPeriod}
- Dager siden kjøp: ${daysSincePurchase || "Ukjent"}
${isDealer && daysSincePurchase && daysSincePurchase <= 730 ? "- Kjøpet er innen 2 år: Etter forbrukerkjøpsloven § 18 presumeres mangel å ha eksistert ved levering (selger har bevisbyrden)" : ""}
${isDealer && daysSincePurchase && daysSincePurchase > 730 ? "- Kjøpet er over 2 år: Presumsjonsregelen gjelder ikke lenger, kjøper må dokumentere at feilen eksisterte ved levering" : ""}
${!isDealer ? "- Ved privatkjøp (kjøpsloven) må kjøper dokumentere at feilen eksisterte ved kjøpet" : ""}
${isDealer ? `
KORREKTE PARAGRAFHENVISNINGER (forbrukerkjøpsloven etter 01.01.2024):
- § 15: Tingens egenskaper (krav til varen)
- § 16: Mangel (varen har mangel hvis den ikke samsvarer med § 15)
- § 18: Tidspunkt for mangelsvurdering + bevisbyrde (2 års presumsjon)
- § 26: Forbrukerens krav ved mangler (oversikt)
- § 27: Reklamasjon (innen rimelig tid, absolutt frist 2/5 år)
- § 29: Retting og omlevering (avhjelp)
- § 31: Prisavslag
- § 32: Heving (ved vesentlig mangel)
- § 33: Erstatning
VIKTIG: «Som den er»-forbehold er OPPHEVET fra 01.01.2024 for forhandlere.` : `
KORREKTE PARAGRAFHENVISNINGER (kjøpsloven):
- § 17: Mangel (tingen er ikke i samsvar med avtalen)
- § 18: Ting solgt «som den er» (beskytter ikke mot skjulte feil eller uriktige opplysninger)
- § 19: Uriktige opplysninger fra selger
- § 30: Kjøpers krav ved mangel
- § 32: Reklamasjon (innen rimelig tid, absolutt frist 2 år)
- § 34: Retting
- § 37: Prisavslag
- § 39: Heving`}

SAKSDATA:
- Kjøper: ${data.buyerName || "Ikke oppgitt"}
- Selger: ${data.sellerName || "Ikke oppgitt"} (${isDealer ? "Forhandler" : "Privat"})
- ${vehicleNameCapital}: ${data.vehicle?.make || ""} ${data.vehicle?.model || ""} (${data.vehicle?.year || "ukjent"})
- Kilometerstand: ${data.vehicle?.km || "Ukjent"} km
- Kjøpesum: ${data.vehicle?.price || "Ukjent"} kr
- Feilområder: ${data.issues?.join(", ") || "Ikke spesifisert"}
- Sikkerhetskritisk: ${data.safetyCritical ? "JA" : "Nei"}
- Kjørbar: ${data.notDriveable ? `NEI - ${vehicleName} kan ikke kjøres` : "Ja"}
- Kostnadsanslag: ${data.costBracket || "Ukjent"}
- Reklamert raskt: ${data.complainedQuickly ? "Ja" : "Nei"}
- Feil oppsto tidlig: ${data.defectSoonAfter ? "Ja" : "Nei"}
- Kontaktet selger: ${data.contactedSeller ? "Ja" : "Nei"}
${data.sellerResponse ? `- Selgers respons: ${data.sellerResponse}` : ""}
${data.userDescription ? `- Brukerens beskrivelse: ${data.userDescription}` : ""}
${data.sellerPromises ? `- Selgers løfter/påstander: ${data.sellerPromises}` : ""}
${data.hadAsIsClause !== null && data.hadAsIsClause !== undefined ? `- "Som den er"-klausul: ${data.hadAsIsClause ? "JA - kan være ugyldig hvis forhandler etter 01.01.2024" : "Nei"}` : ""}
${data.visibleDefect !== null && data.visibleDefect !== undefined ? `- Synlig feil ved kjøp: ${data.visibleDefect ? "JA - kan svekke saken (åpenbarhetsregelen)" : "Nei - skjult feil"}` : ""}
${data.hasWorkshopReport !== null && data.hasWorkshopReport !== undefined ? `- Verkstedsrapport: ${data.hasWorkshopReport ? "JA" : "Nei, ikke undersøkt ennå"}` : ""}
${data.workshopReportText ? `- Verkstedsrapport innhold:\n${data.workshopReportText}` : ""}
${data.additionalInfo ? `\nTILLEGGSINFORMASJON FRA BRUKER (viktig - inkluder dette i analysen):\n${data.additionalInfo}` : ""}

SVAR I DETTE JSON-FORMATET:
{
  "level": "GREEN" | "YELLOW" | "RED",
  "headline": "SANNSYNLIG JA" | "USIKKERT" | "SANNSYNLIG NEI",
  "title": "Kort, nøktern oppsummering (maks 15 ord) - IKKE bruk 'sterkt krav' eller 'klart mangel'",
  "summary": "2-3 setninger som forklarer vurderingen. Bruk 'kan utgjøre', 'momenter som taler for', 'grunnlag for'. ALDRI absolutte påstander.",
  "confidence": "Høy" | "Middels" | "Lav",
  "keyPoints": ["Punkt 1 - nøktern formulering", "Punkt 2", "Punkt 3", "Punkt 4"],
  "legalRefs": [{"heading": "${applicableLaw}", "refs": ["Bruk KUN paragrafene fra KORREKTE PARAGRAFHENVISNINGER ovenfor"]}],
  "nextSteps": ["Konkret steg 1", "Konkret steg 2", "Konkret steg 3", "Konkret steg 4", "Konkret steg 5"],
  "proTip": "Et konkret tips som kan styrke dokumentasjonen",
  "disclaimer": "Dette er veiledning basert på oppgitt informasjon, ikke juridisk rådgivning. Kontakt advokat for bindende råd."
}

EKSEMPLER PÅ GODE FORMULERINGER:
- title: "Flere momenter taler for reklamasjonsrett" (ikke "Sterkt krav")
- summary: "Basert på opplysningene kan feilen utgjøre en mangel etter forbrukerkjøpsloven. Ettersom problemet viste seg innen kort tid, presumeres det etter loven å ha eksistert ved levering."
- keyPoints: "Feilen kan utgjøre en mangel - ikke normal slitasje" (ikke "klart mangel")

EKSEMPLER PÅ FORBUDTE FORMULERINGER:
- "Du har et meget sterkt reklamasjonskrav" ❌
- "Dette er klart en mangel" ❌
- "Selgers påstand er juridisk feil" ❌
- "Selger har bevisbyrden" ❌

Svar KUN med JSON, ingen annen tekst.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    let jsonText = content.text.trim();
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.slice(7);
    }
    if (jsonText.startsWith("```")) {
      jsonText = jsonText.slice(3);
    }
    if (jsonText.endsWith("```")) {
      jsonText = jsonText.slice(0, -3);
    }
    jsonText = jsonText.trim();

    const outcome = JSON.parse(jsonText);

    return NextResponse.json({ outcome });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Kunne ikke analysere saken" },
      { status: 500 }
    );
  }
}