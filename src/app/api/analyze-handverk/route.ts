import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const prompt = `🧠 VURDERINGSRAPPORT - Du er en erfaren norsk forbrukerjurist

ROLLE:
Du skriver kun en vurderingsrapport til forbruker om en håndverkertjeneste.
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
- "GREEN" = Sannsynlig krav - flere momenter taler for at forbruker kan ha et krav
- "YELLOW" = Mulig krav - usikkert, avhenger av ytterligere dokumentasjon
- "RED" = Svakt krav - få momenter taler for forbrukers sak

JURIDISK KONTEKST:
- Gjeldende lov: Håndverkertjenesteloven (hvtjl.)
- Reklamasjonsfrist: Innen rimelig tid etter at mangel ble oppdaget, senest 5 år
- Ved prisoverskridelse: Håndverker må varsle før overslag overskrides vesentlig (mer enn 15%)

VIKTIGE JURIDISKE MOMENTER:
- Forbruker har rett til retting uten kostnad (hvtjl. § 24)
- Ved vesentlig mangel kan forbruker heve avtalen (hvtjl. § 26)
- Forbruker kan kreve prisavslag tilsvarende kostnad ved å rette mangelen (hvtjl. § 25)
- Håndverker har rett til å rette mangel før andre krav (hvtjl. § 24)
- Bustadoppføringslova kan være relevant ved nybygg/større rehabilitering

SAKSDATA:
- Kunde: ${data.navn || "Ikke oppgitt"}
- Håndverker: ${data.handverkerNavn || "Ikke oppgitt"}
- Fag: ${data.fag?.join(", ") || "Ikke spesifisert"}
- Problemer: ${data.problemer?.join(", ") || "Ikke spesifisert"}
- Pris avtalt på forhånd: ${data.prisAvtalt === "ja" ? "Ja" : data.prisAvtalt === "nei" ? "Nei" : "Usikker"}
- Skriftlig avtale: ${data.prisSkriftlig === true ? "Ja" : data.prisSkriftlig === false ? "Nei" : "Ukjent"}
- Prisform: ${data.prisform || "Ukjent"}
- Jobbstart: ${data.jobbStartDato || "Ukjent"}
- Avtalt ferdigdato: ${data.hadFerdigDato ? (data.ferdigDato || "Ja, men dato ukjent") : "Nei"}
- Problem oppdaget: ${data.oppdagetDato || "Ukjent"}
- Har reklamert: ${data.harReklamert ? "Ja" : "Nei"}
- Reklamert dato: ${data.reklamertDato || "Ukjent"}
- Dokumentasjon: ${data.dokumentasjon?.join(", ") || "Ingen"}
${data.dinHistorie ? `- Kundens beskrivelse:\n${data.dinHistorie}` : ""}
${data.handverkerSvar ? `- Håndverkerens respons: ${data.handverkerSvar}` : ""}

SVAR I DETTE JSON-FORMATET:
{
  "level": "GREEN" | "YELLOW" | "RED",
  "headline": "SANNSYNLIG JA" | "USIKKERT" | "SANNSYNLIG NEI",
  "title": "Kort, nøktern oppsummering (maks 15 ord)",
  "summary": "2-3 setninger som forklarer vurderingen. Bruk 'kan utgjøre', 'momenter som taler for', 'grunnlag for'. ALDRI absolutte påstander.",
  "confidence": "Høy" | "Middels" | "Lav",
  "keyPoints": ["Punkt 1 - nøktern formulering", "Punkt 2", "Punkt 3", "Punkt 4"],
  "legalRefs": [{"heading": "Håndverkertjenesteloven", "refs": ["§ 17: Mangel foreligger hvis resultatet ikke svarer til avtalen", "§ 24: Forbruker kan kreve retting"]}],
  "nextSteps": ["Konkret steg 1", "Konkret steg 2", "Konkret steg 3"],
  "proTip": "Et konkret tips som kan styrke dokumentasjonen",
  "disclaimer": "Dette er veiledning basert på oppgitt informasjon, ikke juridisk rådgivning. Kontakt advokat for bindende råd."
}

EKSEMPLER PÅ GODE FORMULERINGER:
- title: "Flere momenter taler for reklamasjonsrett"
- summary: "Basert på opplysningene kan arbeidet utgjøre en mangel etter håndverkertjenesteloven."
- keyPoints: "Resultatet kan avvike fra det avtalte - grunnlag for reklamasjon"

EKSEMPLER PÅ FORBUDTE FORMULERINGER:
- "Du har et meget sterkt reklamasjonskrav" ❌
- "Dette er klart en mangel" ❌
- "Håndverkeren har brutt loven" ❌

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
    console.error("Handverk analysis error:", error);
    return NextResponse.json(
      { error: "Kunne ikke analysere saken" },
      { status: 500 }
    );
  }
}
