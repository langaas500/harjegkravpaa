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

NIVÅ-VURDERING:
- "GREEN" = Sterkt krav - flere momenter taler for at kjøper kan ha et krav
- "YELLOW" = Mulig krav - usikkert, avhenger av ytterligere dokumentasjon
- "RED" = Svakt krav - få momenter taler for kjøpers sak

JURIDISK KONTEKST:
- Gjeldende lov: ${applicableLaw}
- Reklamasjonsfrist: ${warrantyPeriod}
- Dager siden kjøp: ${daysSincePurchase || "Ukjent"}
${isDealer && daysSincePurchase && daysSincePurchase <= 180 ? "- Kjøpet er innen 6 måneder: Etter loven presumeres feil å ha eksistert ved levering" : ""}
${!isDealer ? "- Ved privatkjøp må kjøper normalt dokumentere at feilen eksisterte ved kjøpet" : ""}

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
  "legalRefs": [{"heading": "${applicableLaw}", "refs": ["§X: Kort forklaring"]}],
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
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Kunne ikke analysere saken" },
      { status: 500 }
    );
  }
}