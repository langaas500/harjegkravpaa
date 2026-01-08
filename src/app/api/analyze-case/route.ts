import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

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

    const prompt = `Du er en norsk forbrukerrettighetsekspert. Analyser denne bilkjøp-saken og gi en vurdering.

VIKTIG OM NIVÅ-VURDERING:
- "GREEN" = Kjøper har STERKE rettigheter, sannsynlig at de har krav
- "YELLOW" = Usikkert, kan gå begge veier
- "RED" = Kjøper har SVAKE rettigheter, sannsynlig at de IKKE har krav

VELG NIVÅ BASERT PÅ DETTE:
- Sikkerhetskritiske feil + kort tid siden kjøp + forhandler = GREEN
- Alvorlige feil innen 6 måneder fra forhandler = GREEN (bevisbyrde på selger)
- Mindre feil eller lang tid siden kjøp = YELLOW eller RED
- Kjøper burde oppdaget feilen før kjøp = RED

JURIDISK KONTEKST:
- Gjeldende lov: ${applicableLaw}
- Reklamasjonsfrist: ${warrantyPeriod}
- Dager siden kjøp: ${daysSincePurchase || "Ukjent"}
${isDealer ? "- Ved forhandlerkjøp har selger bevisbyrden de første 6 månedene" : "- Ved privatkjøp har kjøper bevisbyrden"}

SAKSDATA:
- Kjøper: ${data.buyerName || "Ikke oppgitt"}
- Selger: ${data.sellerName || "Ikke oppgitt"} (${isDealer ? "Forhandler" : "Privat"})
- Bil: ${data.vehicle?.make || ""} ${data.vehicle?.model || ""} (${data.vehicle?.year || "ukjent"})
- Kilometerstand: ${data.vehicle?.km || "Ukjent"} km
- Kjøpesum: ${data.vehicle?.price || "Ukjent"} kr
- Feilområder: ${data.issues?.join(", ") || "Ikke spesifisert"}
- Sikkerhetskritisk: ${data.safetyCritical ? "JA" : "Nei"}
- Kjørbar: ${data.notDriveable ? "NEI - bilen kan ikke kjøres" : "Ja"}
- Kostnadsanslag: ${data.costBracket || "Ukjent"}
- Reklamert raskt: ${data.complainedQuickly ? "Ja" : "Nei"}
- Feil oppsto tidlig: ${data.defectSoonAfter ? "Ja" : "Nei"}
- Kontaktet selger: ${data.contactedSeller ? "Ja" : "Nei"}
${data.sellerResponse ? `- Selgers respons: ${data.sellerResponse}` : ""}
${data.userDescription ? `- Brukerens beskrivelse: ${data.userDescription}` : ""}

SVAR I DETTE JSON-FORMATET:
{
  "level": "GREEN" | "YELLOW" | "RED",
  "title": "Kort oppsummering av konklusjonen (maks 15 ord)",
  "summary": "2-3 setninger som forklarer hovedkonklusjonen og hvorfor kjøper har/ikke har krav",
  "confidence": "Høy" | "Middels" | "Lav",
  "keyPoints": ["Punkt 1 om saken", "Punkt 2", "Punkt 3", "Punkt 4"],
  "legalRefs": [{"heading": "${applicableLaw}", "refs": ["§X: Forklaring", "§Y: Forklaring"]}],
  "nextSteps": ["Konkret steg 1", "Konkret steg 2", "Konkret steg 3", "Konkret steg 4", "Konkret steg 5"],
  "proTip": "Et konkret tips som kan styrke saken",
  "disclaimer": "Dette er veiledning basert på oppgitt informasjon, ikke juridisk rådgivning. Kontakt advokat for bindende råd."
}

KRITISK: Sørg for at "level" MATCHER konklusjonen:
- Hvis du sier kjøper har "sterke rettigheter" eller "godt grunnlag" → level SKAL være "GREEN"
- Hvis du sier kjøper har "svake rettigheter" eller "lite grunnlag" → level SKAL være "RED"
- Ikke gi motstridende signaler!

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