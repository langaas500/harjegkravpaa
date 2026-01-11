import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const problemTypeMap: Record<string, string> = {
      DELAY: "Forsinkelse",
      CANCELLED: "Kansellering",
      DENIED_BOARDING: "Nektet ombordstigning",
      BAGGAGE: "Bagasjeproblem",
    };
    const problemTypeText = problemTypeMap[data.problemType] || "Ukjent";

    const baggageTypeMap: Record<string, string> = {
      delayed: "Forsinket bagasje",
      lost: "Tapt bagasje",
      damaged: "Skadet bagasje",
    };
    const baggageTypeText = data.baggageType ? baggageTypeMap[data.baggageType] : null;

    const baggageDelayMap: Record<string, string> = {
      under24h: "Under 24 timer",
      "1to2days": "1-2 døgn",
      "2to4days": "2-4 døgn",
      over4days: "Over 4 døgn",
    };
    const baggageDelayText = data.baggageDelayDuration ? baggageDelayMap[data.baggageDelayDuration] : null;

    const expenseTypeMap: Record<string, string> = {
      clothes: "Klær",
      toiletries: "Toalettsaker",
      work_equipment: "Arbeidsutstyr",
      transport: "Transport",
      medicine: "Medisiner",
      other: "Annet",
    };
    const expenseTypesText = data.expenseTypes
      ? (data.expenseTypes as string[]).map((t: string) => expenseTypeMap[t] || t).join(", ")
      : null;

    const receiptsMap: Record<string, string> = {
      yes: "Ja, har kvitteringer",
      partial: "Delvis dokumentasjon",
      no: "Ingen kvitteringer",
    };
    const receiptsText = data.hasReceipts ? receiptsMap[data.hasReceipts] : null;

    const delayMap: Record<string, string> = {
      under2: "Under 2 timer",
      "2to3": "2-3 timer",
      "3to4": "3-4 timer",
      over4: "Over 4 timer",
      never: "Flyet kom aldri",
    };
    const delayText = data.delayDuration ? delayMap[data.delayDuration] : null;

    const cancellationMap: Record<string, string> = {
      under7: "Under 7 dager før avgang",
      "7to14": "7-14 dager før avgang",
      over14: "Over 14 dager før avgang",
    };
    const cancellationText = data.cancellationNotice ? cancellationMap[data.cancellationNotice] : null;

    const isBaggage = data.problemType === "BAGGAGE";

    const prompt = isBaggage
      ? `🧠 VURDERINGSRAPPORT BAGASJE - Du er en erfaren norsk forbrukerjurist

ROLLE:
Du skriver kun en vurderingsrapport til passasjeren om bagasjeproblemer.
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

NIVÅ-VURDERING:
- "GREEN" = Sterkt grunnlag - flere momenter taler for at passasjer kan ha krav på erstatning
- "YELLOW" = Mulig krav - usikkert, avhenger av dokumentasjon
- "RED" = Svakt grunnlag - få momenter taler for passasjerens sak

JURIDISK KONTEKST - MONTREALKONVENSJONEN:
- Gjelder for alle internasjonale flyreiser
- Flyselskapet er ansvarlig for skadet, forsinket eller tapt bagasje
- Maksimal erstatning: ca. 16 000 kr (1 288 SDR)
- Foreldelse: 2 år fra flydato

VIKTIGE REGLER FOR BAGASJE:
- Forsinket bagasje: Du kan kreve erstatning for nødvendige utgifter (klær, toalettsaker) mens du venter
- Tapt bagasje: Regnes som tapt etter 21 dager - du kan kreve full erstatning for innholdet
- Skadet bagasje: Du må melde fra innen 7 dager etter mottak
- PIR-skjema: Property Irregularity Report fra flyplassen er viktig dokumentasjon
- Du må dokumentere utgifter og verdier med kvitteringer

FRISTER:
- Skadet bagasje: Klag innen 7 dager
- Forsinket bagasje: Klag innen 21 dager etter mottak
- Tapt bagasje: Regnes som tapt etter 21 dager

SAKSDATA:
- Passasjer: ${data.passengerName || "Ikke oppgitt"}
- Flyselskap: ${data.flight?.airline || "Ikke oppgitt"}
- Flynummer: ${data.flight?.flightNumber || "Ikke oppgitt"}
- Rute: ${data.flight?.departureAirport || "?"} → ${data.flight?.arrivalAirport || "?"}
- Flydato: ${data.flight?.flightDate || "Ikke oppgitt"}
- Problemtype: ${baggageTypeText || "Bagasjeproblem"}
${baggageDelayText ? `- Forsinkelsens varighet: ${baggageDelayText}` : ""}
- PIR-skjema utfylt: ${data.hasPIR ? "Ja" : data.hasPIR === false ? "Nei" : "Ikke oppgitt"}
${data.hadWorkMeetings !== null ? `- Jobb/møter påvirket: ${data.hadWorkMeetings ? "Ja" : "Nei"}` : ""}
${data.workMeetingsDetails ? `- Detaljer om påvirket arbeid: ${data.workMeetingsDetails}` : ""}
${expenseTypesText ? `- Utgiftstyper: ${expenseTypesText}` : ""}
${data.totalExpenseAmount ? `- Totalt utgiftsbeløp: ${data.totalExpenseAmount} kr` : ""}
${receiptsText ? `- Dokumentasjon: ${receiptsText}` : ""}
${data.expenseTypes?.includes("medicine") && data.medicineWasNecessary !== null ? `- Medisintype: ${data.medicineWasNecessary ? "Nødvendige medisiner som normalt tas med" : "Kjøpt under reisen"}` : ""}
- Kontaktet flyselskap: ${data.contactedAirline ? "Ja" : "Nei"}
${data.airlineResponse ? `- Flyselskapets respons: ${data.airlineResponse}` : ""}
${data.userDescription ? `- Brukerens beskrivelse: ${data.userDescription}` : ""}
${data.wantsClaimText === "yes" ? "- Ønsker hjelp til kravtekst: Ja" : ""}

SVAR I DETTE JSON-FORMATET:
{
  "level": "GREEN" | "YELLOW" | "RED",
  "headline": "SANNSYNLIG JA" | "USIKKERT" | "SANNSYNLIG NEI",
  "title": "Kort, nøktern oppsummering (maks 15 ord)",
  "summary": "2-3 setninger som forklarer vurderingen.",
  "confidence": "Høy" | "Middels" | "Lav",
  "compensationAmount": "Opptil ca. 16 000 kr" | null,
  "keyPoints": ["Punkt 1", "Punkt 2", "Punkt 3", "Punkt 4"],
  "legalRefs": [{"heading": "Montrealkonvensjonen", "refs": ["Art. 17: Ansvar for bagasje", "Art. 22: Erstatningsgrenser"]}],
  "nextSteps": ["Konkret steg 1", "Konkret steg 2", "Konkret steg 3", "Konkret steg 4"],
  "proTip": "Et konkret tips",
  "disclaimer": "Dette er veiledning basert på oppgitt informasjon, ikke juridisk rådgivning."
}

Svar KUN med JSON, ingen annen tekst.`
      : `🧠 VURDERINGSRAPPORT FLYREISER - Du er en erfaren norsk forbrukerjurist

ROLLE:
Du skriver kun en vurderingsrapport til passasjeren.
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

NIVÅ-VURDERING:
- "GREEN" = Sterkt krav - flere momenter taler for at passasjer kan ha krav på kompensasjon
- "YELLOW" = Mulig krav - usikkert, avhenger av ytterligere dokumentasjon eller omstendigheter
- "RED" = Svakt krav - få momenter taler for passasjerens sak

JURIDISK KONTEKST:
- Gjeldende regelverk: EU-forordning 261/2004 (flypassasjerrettigheter)
- Gjelder: Alle fly fra EU/EØS, eller til EU/EØS med EU-basert flyselskap
- Foreldelse: 3 år fra flydato

KOMPENSASJONSBELØP (EU 261/2004 Art. 7):
- Korte flyvninger (under 1500 km): 250 EUR
- Mellomflyvninger (1500-3500 km): 400 EUR
- Lange flyvninger (over 3500 km): 600 EUR
- Ved kansellering med alternativ transport som ankommer nært opprinnelig tid, kan beløpet halveres

VIKTIGE REGLER:
- Ved forsinkelse over 3 timer ved ankomst: Rett til kompensasjon (Sturgeon-dommen)
- Ved kansellering under 14 dager før: Rett til kompensasjon med mindre god alternativ tilbys
- Ved nektet ombordstigning (overbooking): Alltid rett til kompensasjon
- Ekstraordinære omstendigheter: Flyselskapet kan nekte kompensasjon ved ekstremvær, terrorfare, flygelederstreik, uforutsette sikkerhetsfeil
- IKKE ekstraordinært: Tekniske feil, bemanningsproblemer, overbooking

SAKSDATA:
- Passasjer: ${data.passengerName || "Ikke oppgitt"}
- Flyselskap: ${data.flight?.airline || "Ikke oppgitt"}
- Flynummer: ${data.flight?.flightNumber || "Ikke oppgitt"}
- Rute: ${data.flight?.departureAirport || "?"} → ${data.flight?.arrivalAirport || "?"}
- Flydato: ${data.flight?.flightDate || "Ikke oppgitt"}
- Billettpris: ${data.flight?.bookedPrice ? data.flight.bookedPrice + " kr" : "Ikke oppgitt"}
- Problemtype: ${problemTypeText}
${data.problemType === "DELAY" ? `- Forsinkelse: ${delayText}` : ""}
${data.problemType === "CANCELLED" ? `- Varsel om kansellering: ${cancellationText}` : ""}
${data.offeredAlternative !== null ? `- Tilbudt alternativ transport: ${data.offeredAlternative ? "Ja" : "Nei"}` : ""}
${data.alternativeDetails ? `- Alternativdetaljer: ${data.alternativeDetails}` : ""}
- Ekstraordinære omstendigheter påberopt: ${data.wasExtraordinary ? "Ja" : "Nei / Vet ikke"}
${data.extraordinaryReason ? `- Flyselskapets begrunnelse: ${data.extraordinaryReason}` : ""}
- Kontaktet flyselskap: ${data.contactedAirline ? "Ja" : "Nei"}
${data.airlineResponse ? `- Flyselskapets respons: ${data.airlineResponse}` : ""}
${data.userDescription ? `- Brukerens beskrivelse: ${data.userDescription}` : ""}

SVAR I DETTE JSON-FORMATET:
{
  "level": "GREEN" | "YELLOW" | "RED",
  "headline": "SANNSYNLIG JA" | "USIKKERT" | "SANNSYNLIG NEI",
  "title": "Kort, nøktern oppsummering (maks 15 ord) - IKKE bruk 'sterkt krav' eller 'klart'",
  "summary": "2-3 setninger som forklarer vurderingen. Bruk 'kan ha krav', 'momenter som taler for', 'grunnlag for'. ALDRI absolutte påstander.",
  "confidence": "Høy" | "Middels" | "Lav",
  "compensationAmount": "250 EUR" | "400 EUR" | "600 EUR" | null,
  "keyPoints": ["Punkt 1 - nøktern formulering", "Punkt 2", "Punkt 3", "Punkt 4"],
  "legalRefs": [{"heading": "EU-forordning 261/2004", "refs": ["Art. X: Kort forklaring"]}],
  "nextSteps": ["Konkret steg 1", "Konkret steg 2", "Konkret steg 3", "Konkret steg 4"],
  "proTip": "Et konkret tips som kan styrke dokumentasjonen eller prosessen",
  "disclaimer": "Dette er veiledning basert på oppgitt informasjon, ikke juridisk rådgivning. Kontakt advokat for bindende råd."
}

EKSEMPLER PÅ GODE FORMULERINGER:
- title: "Flere momenter taler for kompensasjonskrav" (ikke "Sterkt krav")
- summary: "Basert på opplysningene kan du ha krav på kompensasjon etter EU-forordning 261/2004. Forsinkelsen på over 3 timer gir normalt grunnlag for kompensasjon."
- keyPoints: "Forsinkelsen overstiger 3-timersgrensen" (ikke "klart krav")

EKSEMPLER PÅ FORBUDTE FORMULERINGER:
- "Du har et klart krav på kompensasjon" ❌
- "Flyselskapet må betale" ❌
- "Dette er åpenbart ditt krav" ❌

Svar KUN med JSON, ingen annen tekst.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
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
    console.error("Flight analysis error:", error);
    return NextResponse.json(
      { error: "Kunne ikke analysere saken" },
      { status: 500 }
    );
  }
}
