import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { rateLimit, getIP } from "@/lib/rateLimit";
import { withTimeout } from "@/lib/withTimeout";

const client = new Anthropic();

const MAX_PAYLOAD = 50_000;

export async function POST(req: NextRequest) {
  const blocked = rateLimit(req, "analyze");
  if (blocked) return blocked;

  try {
    const raw = await req.text();
    if (raw.length > MAX_PAYLOAD) {
      return NextResponse.json({ error: "payload_too_large" }, { status: 413 });
    }

    const data = JSON.parse(raw);

    // Beregn dager siden reklamasjon og oppdagelse
    const oppdagetDato = data.oppdagetDato;
    let dagerSidenOppdaget = null;
    if (oppdagetDato) {
      const oppdaget = new Date(oppdagetDato);
      const today = new Date();
      dagerSidenOppdaget = Math.ceil(
        (today.getTime() - oppdaget.getTime()) / (1000 * 60 * 60 * 24)
      );
    }

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

NIVÅ-VURDERING (bruk vektingskriteriene aktivt):
- "GREEN" = Sannsynlig krav - flere momenter taler for at forbruker kan ha et krav
- "YELLOW" = Mulig krav - usikkert, avhenger av ytterligere dokumentasjon
- "RED" = Svakt krav - få momenter taler for forbrukers sak

VEKTINGSKRITERIER:
Sterke GREEN-indikatorer (2+ av disse → GREEN):
- Sikkerhetsrisiko (fare for person eller eiendom)
- Funksjonell feil (tingen/installasjonen fungerer ikke som den skal)
- Strukturell feil eller brudd på forskrift/standard
- Skriftlig avtale med klare vilkår som er brutt
- Tredjepartsdokumentasjon fra uavhengig fagperson foreligger
- Rask reklamasjon og god dokumentasjon
- Forbruker har bedt om retting uten resultat
- Vesentlig prisoverskridelse uten varsling (mer enn 15% over overslag)
- Arbeid avbrutt eller ikke ferdigstilt

Sterke RED-indikatorer (2+ av disse → RED):
- Kun estetisk mangel av mindre omfang
- Ingen dokumentasjon (hverken kontrakt, bilder eller annet)
- Lang tid siden oppdagelse uten reklamasjon
- Lavt beløp/omfang i forhold til tjenestens art
- Forbruker har ikke gitt håndverker mulighet til å rette
- Normal slitasje eller forventet vedlikeholdsbehov

YELLOW = motstridende indikatorer eller manglende dokumentasjon

VIKTIG OVERSTYRINGSREGEL:
- Når det er motstridende GREEN- og RED-indikatorer, velg YELLOW — ikke RED.
- Sikkerhetsrisiko eller forskriftsbrudd veier tungt uavhengig av andre faktorer.

JURIDISK KONTEKST:
- Gjeldende lov: Håndverkertjenesteloven (hvtjl.)
- Reklamasjonsfrist: Innen rimelig tid etter at mangel ble oppdaget, senest 5 år (§ 22)
- Ved prisoverskridelse: Håndverker må varsle før overslag overskrides vesentlig, mer enn 15% (§ 32)
${dagerSidenOppdaget !== null ? `- Dager siden problem oppdaget: ${dagerSidenOppdaget}` : ""}
${dagerSidenOppdaget !== null && dagerSidenOppdaget > 60 ? "- OBS: Det har gått en stund siden oppdagelse — vurder om reklamasjon er fremsatt innen rimelig tid" : ""}

KORREKTE PARAGRAFHENVISNINGER (håndverkertjenesteloven):
- § 5: Fagmessig utførelse (tjenesten skal utføres fagmessig)
- § 6: Materialer (håndverker skal bruke forsvarlige materialer)
- § 7: Frarådingsplikt (håndverker skal fraråde hvis tjenesten ikke vil gi rimelig resultat)
- § 9: Tilleggsarbeid (håndverker skal kontakte forbruker ved behov for tilleggsarbeid)
- § 17: Mangel (tjenesten har mangel hvis resultatet ikke svarer til det forbrukeren har rett til å kreve)
- § 22: Reklamasjonsfrist (innen rimelig tid, absolutt frist 5 år)
- § 23: Tilbakeholdsrett (forbruker kan holde tilbake betaling)
- § 24: Retting (forbruker kan kreve retting uten kostnad)
- § 25: Prisavslag (ved mangel som ikke rettes)
- § 26: Heving (ved vesentlig mangel)
- § 28: Erstatning (for tap som følge av mangel)
- § 32: Prisberegning og varslingsplikt (overslag, fastpris, timepris)

VIKTIGE JURIDISKE MOMENTER:
- Forbruker har rett til retting uten kostnad (§ 24)
- Ved vesentlig mangel kan forbruker heve avtalen (§ 26)
- Forbruker kan kreve prisavslag tilsvarende kostnad ved å rette mangelen (§ 25)
- Håndverker har rett til å forsøke retting før andre krav (§ 24)
- Bustadoppføringslova kan være relevant ved nybygg/større rehabilitering

SAKSDATA:
- Kunde: ${data.navn || "Ikke oppgitt"}
- Håndverker: ${data.handverkerNavn || "Ikke oppgitt"}
- Fag: ${data.fag?.join(", ") || "Ikke spesifisert"}
- Problemer: ${data.problemer?.join(", ") || "Ikke spesifisert"}

ALVORLIGHET OG TYPE FEIL:
- Fungerer ikke som det skal: ${data.funkerIkke === true ? "JA" : data.funkerIkke === false ? "Nei" : "Ukjent"}
- Sikkerhetsrisiko: ${data.sikkerhetsrisiko === true ? "JA - fare for person/eiendom" : data.sikkerhetsrisiko === false ? "Nei" : "Ukjent"}
- Type feil: ${data.typeFeil?.join(", ") || "Ikke spesifisert"}
- Dokumentert avvik fra avtale/standard: ${data.maltDokAvvik === true ? "Ja" : data.maltDokAvvik === false ? "Nei" : "Ukjent"}
${data.beskrivelsetilleggKort ? `- Tilleggsbeskrivelse: ${data.beskrivelsetilleggKort}` : ""}

AVTALE OG PRIS:
- Pris avtalt på forhånd: ${data.prisAvtalt === "ja" ? "Ja" : data.prisAvtalt === "nei" ? "Nei" : "Usikker"}
- Skriftlig avtale: ${data.prisSkriftlig === true ? "Ja" : data.prisSkriftlig === false ? "Nei" : "Ukjent"}
- Prisform: ${data.prisform || "Ukjent"}
${data.kontraktssum ? `- Kontraktssum: ${data.kontraktssum} kr` : ""}
${data.fakturaSum ? `- Fakturert beløp: ${data.fakturaSum} kr` : ""}
${data.kontraktssum && data.fakturaSum ? `- Differanse: ${Number(data.fakturaSum) - Number(data.kontraktssum)} kr (${Math.round(((Number(data.fakturaSum) - Number(data.kontraktssum)) / Number(data.kontraktssum)) * 100)}% over avtalt)` : ""}

TIDSLINJE:
- Jobbstart: ${data.jobbStartDato || "Ukjent"}
- Avtalt ferdigdato: ${data.hadFerdigDato ? (data.ferdigDato || "Ja, men dato ukjent") : "Nei"}
- Problem oppdaget: ${data.oppdagetDato || "Ukjent"}
- Har reklamert: ${data.harReklamert ? "Ja" : "Nei"}
- Reklamert dato: ${data.reklamertDato || "Ukjent"}

OMFANG OG KOSTNADER:
${data.utbedringEstimert ? `- Estimert utbedringskostnad: ${data.utbedringEstimert} kr` : "- Estimert utbedringskostnad: Ukjent"}
- Innhentet tilbud fra annen fagperson: ${data.innhentetTilbud === true ? "Ja" : data.innhentetTilbud === false ? "Nei" : "Ukjent"}
${data.tilbudSum ? `- Tilbudssum for utbedring: ${data.tilbudSum} kr` : ""}
- Holdt tilbake betaling: ${data.holdtTilbakeBetaling === true ? "JA" : data.holdtTilbakeBetaling === false ? "Nei" : "Ukjent"}
- Håndverker gjenstarter arbeid: ${data.gjenstarArbeid === true ? "Ja" : data.gjenstarArbeid === false ? "Nei" : "Ukjent"}
- Tredjepartsdokumentasjon: ${data.harTredjepartDokumentasjon === true ? "JA - dokumentasjon fra uavhengig fagperson" : data.harTredjepartDokumentasjon === false ? "Nei" : "Ukjent"}

HVA FORBRUKEREN ØNSKER:
- Ønsket utfall: ${data.onsker?.join(", ") || "Ikke spesifisert"}
- Har bedt håndverker om retting: ${data.harBedtOmRett === true ? "Ja" : data.harBedtOmRett === false ? "Nei" : "Ukjent"}
- Ønsker befaring: ${data.onskerBefaring === true ? "Ja" : data.onskerBefaring === false ? "Nei" : "Ukjent"}

DOKUMENTASJON:
- Tilgjengelig dokumentasjon: ${data.dokumentasjon?.join(", ") || "Ingen"}

${data.dinHistorie ? `KUNDENS BESKRIVELSE (viktig - inkluder dette i analysen):\n${data.dinHistorie}` : ""}
${data.handverkerSvar ? `HÅNDVERKERENS RESPONS:\n${data.handverkerSvar}` : ""}

SVAR I DETTE JSON-FORMATET:
{
  "level": "GREEN" | "YELLOW" | "RED",
  "headline": "SANNSYNLIG JA" | "USIKKERT" | "SANNSYNLIG NEI",
  "title": "Kort, nøktern oppsummering (maks 15 ord) - IKKE bruk 'sterkt krav' eller 'klart mangel'",
  "summary": "2-3 setninger som forklarer vurderingen. Bruk 'kan utgjøre', 'momenter som taler for', 'grunnlag for'. ALDRI absolutte påstander.",
  "confidence": "Høy" | "Middels" | "Lav",
  "keyPoints": ["Punkt 1 - nøktern formulering", "Punkt 2", "Punkt 3", "Punkt 4"],
  "legalRefs": [{"heading": "Håndverkertjenesteloven", "refs": ["Bruk KUN paragrafene fra KORREKTE PARAGRAFHENVISNINGER ovenfor"]}],
  "nextSteps": ["Konkret steg 1", "Konkret steg 2", "Konkret steg 3"],
  "proTip": "Et konkret tips som kan styrke dokumentasjonen",
  "disclaimer": "Dette er veiledning basert på oppgitt informasjon, ikke juridisk rådgivning. Kontakt advokat for bindende råd.",
  "recommendedClaim": "retting" | "prisavslag" | "heving" | "erstatning",
  "severity": "lav" | "middels" | "høy",
  "strengthFactors": ["Faktor som styrker saken"],
  "riskFactors": ["Faktor som svekker saken"],
  "whatToWriteNow": "Hva forbrukeren bør gjøre akkurat nå",
  "deadlineSuggestion": "Anbefalt frist å gi håndverker"
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

    const ip = getIP(req);
    console.log(`[analyze-handverk] ip=${ip.slice(0, 8)}*** start`);

    const message = await withTimeout(
      client.messages.create({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }],
      }),
      45_000,
      "analyze-handverk"
    );

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

    console.log(`[analyze-handverk] ip=${ip.slice(0, 8)}*** ok`);
    return NextResponse.json({ outcome });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("TIMEOUT")) {
      console.log(`[analyze-handverk] 504 timeout`);
      return NextResponse.json({ error: "timeout" }, { status: 504 });
    }
    console.error("Handverk analysis error:", error);
    return NextResponse.json(
      { error: "Kunne ikke analysere saken" },
      { status: 500 }
    );
  }
}
