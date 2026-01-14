import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

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

// Reformuler brukerens fritekst til profesjonell saksfremstilling
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

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const claimType =
      data.claimType ||
      (data.onsker === "retting"
        ? "retting"
        : data.onsker === "prisavslag"
        ? "prisavslag"
        : data.onsker === "heving"
        ? "heving"
        : data.onsker === "stanse_ekstraregning"
        ? "stanse_ekstraregning"
        : data.onsker === "kombinasjon"
        ? "kombinasjon"
        : "retting");

    const fristDager =
      data.frist && ["7", "14", "21"].includes(String(data.frist))
        ? String(data.frist)
        : "14";

    const prisavslagBelop = safeStr(data.prisavslagBelop, "");

    // Bearbeid brukerens fritekst
    const bearbeidetHistorie = reformulateText(data.dinHistorie || "");
    const bearbeidetSvar = reformulateText(data.handverkerSvar || "");

    // Dagens dato formatert
    const dagensDato = new Date().toLocaleDateString("nb-NO", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const prompt = `Du er en erfaren norsk forbrukerjurist. Skriv et profesjonelt, sendeklart reklamasjonsbrev.

ABSOLUTTE REGLER:
- Brevet skal være rolig, autoritativt og juridisk presist.
- Ingen trusler eller aggressivt språk.
- Ingen vage formuleringer som "kanskje", "muligens", "kan vurderes".
- Bruk aktiv, bestemt språkføring: "Jeg reklamerer herved...", "Jeg krever...", "Jeg ber om..."
- Brevet skal være 500-700 ord (ikke kortere).
- IKKE gjengi skrivefeil fra kundens tekst. Reformuler til profesjonelt språk.

SAKSDATA:
Avsender:
- Navn: ${data.navn || "[Kundens navn]"}
- Adresse: ${data.kundeAdresse || data.adresse || "[Kundens adresse]"}
- E-post: ${data.epost || "[E-post]"}
- Telefon: ${data.telefon || "[Telefon]"}

Mottaker:
- Firma/navn: ${data.handverkerNavn || "[Håndverkerens navn/firma]"}
- Adresse: ${data.handverkerAdresse || "[Håndverkerens adresse]"}

Dato: ${dagensDato}

Oppdrag:
- Type arbeid: ${Array.isArray(data.fag) ? data.fag.join(", ") : "Håndverkertjeneste"}
- Påberopte mangler: ${Array.isArray(data.problemer) ? data.problemer.join(", ") : "Ikke spesifisert"}
- Kontraktssum: ${data.kontraktssum || "Ikke oppgitt"}
- Fakturert: ${data.fakturaSum || "Ikke oppgitt"}

Tidslinje:
- Arbeid startet: ${data.jobbStartDato || "Ikke oppgitt"}
- Mangel oppdaget: ${data.oppdagetDato || "Ikke oppgitt"}
- Tidligere reklamert: ${data.reklamertDato || "Ikke oppgitt"}

Omfang:
- Funksjonssvikt: ${data.funkerIkke || "Ikke oppgitt"}
- Sikkerhetsrisiko: ${data.sikkerhetsrisiko || "Ikke oppgitt"}
- Estimert utbedringskostnad: ${data.utbedringEstimert || "Ikke oppgitt"}
- Holdt tilbake betaling: ${data.holdtTilbakeBetaling || "Ikke oppgitt"}

Saksfremstilling (bearbeidet):
${bearbeidetHistorie || "Ikke oppgitt"}

Håndverkers tidligere respons:
${bearbeidetSvar || "Ikke mottatt svar"}

KRAV SOM FREMMES:
- Hovedkrav: ${claimType === "retting" ? "Retting av mangler uten kostnad" : claimType === "prisavslag" ? `Prisavslag${prisavslagBelop ? ` på kr ${prisavslagBelop}` : ""}` : claimType === "heving" ? "Heving av avtalen" : claimType === "stanse_ekstraregning" ? "Stansing/omgjøring av ekstraregning" : "Retting og/eller prisavslag"}
- Svarfrist: ${fristDager} dager

JURIDISK GRUNNLAG (bruk kun relevante):
- Håndverkertjenesteloven § 17: Mangel foreligger dersom resultatet ikke svarer til det forbrukeren har rett til å kreve.
- § 24: Forbrukeren kan kreve retting uten kostnad dersom det ikke medfører urimelig ulempe for tjenesteyteren.
- § 25: Prisavslag tilsvarende kostnadene ved å få mangelen rettet.
- § 26: Heving ved vesentlig mangel.
- § 28: Erstatning for tap som følge av mangel.
- § 32: Ved prisoverslag skal prisen ikke overskrides vesentlig (maks 15%).

STRUKTUR (SKAL FØLGES NØYAKTIG):

A) HEADER
[Avsenders navn]
[Avsenders adresse]
[E-post] | [Telefon]

[Dato]

[Mottakers navn/firma]
[Mottakers adresse]

B) OVERSKRIFT
REKLAMASJON OG KRAV OM ${claimType === "retting" ? "RETTING" : claimType === "prisavslag" ? "PRISAVSLAG" : claimType === "heving" ? "HEVING" : "RETTING/PRISAVSLAG"} – HÅNDVERKERTJENESTELOVEN

C) INNLEDNING (2-3 setninger)
Viser til avtale om [type arbeid]. Dette brevet er en formell reklamasjon.

D) SAKSFREMSTILLING (1 avsnitt, 3-5 setninger)
Beskriv oppdraget, hva som ble avtalt, og når arbeidet ble utført. Profesjonelt språk.

E) MANGLER OG KONSEKVENSER (punktliste, 3-6 punkter)
For hver mangel: Hva er galt, og hvilken konsekvens har det (funksjon, sikkerhet, kostnad)?

F) RETTSLIG GRUNNLAG (1 avsnitt, 3-4 setninger)
Knyt manglene til håndverkertjenesteloven. Forklar kort hvorfor loven gir rett til kravet.

G) MINE KRAV (nummerert liste)
1. Hovedkrav (retting/prisavslag/heving)
2. Eventuelt subsidiært krav
3. Eventuelt erstatning for dokumenterte utgifter

H) FRISTER
- Svarfrist: Jeg ber om skriftlig tilbakemelding innen ${fristDager} dager fra mottak av dette brevet.
- Utbedringsfrist (hvis retting): Dersom retting aksepteres, ber jeg om at utbedring påbegynnes innen 21 dager etter at vi har avtalt tidspunkt.

I) KONSEKVENSER VED MANGLENDE RESPONS (1 avsnitt)
Dersom jeg ikke mottar svar innen fristen, eller vi ikke kommer til enighet, vil jeg:
- Bringe saken inn for Forbrukerrådet for mekling
- Ved fortsatt uenighet: Forbrukerklageutvalget eller forliksrådet
- Innhente tilbud fra annen håndverker for utbedring, med krav om kostnadsdekning

J) VEDLEGG
Liste over vedlegg (kontrakt/tilbud, fakturaer, bilder, kommunikasjon, evt. takst).

K) AVSLUTNING
Kort, høflig avslutning med kontaktinfo.

Skriv BARE selve brevet. Ingen forklaringer før eller etter.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 3500,
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") throw new Error("Unexpected response type");

    const brev = cleanText(content.text);

    // Fallback hvis brevet er for kort
    if (brev.length < 800) {
      const fagType = Array.isArray(data.fag) ? data.fag.join(", ") : "håndverkertjeneste";
      const problemerListe = Array.isArray(data.problemer) ? data.problemer : [];
      const kravTekst = claimType === "retting"
        ? "retting av manglene uten kostnad for meg"
        : claimType === "prisavslag"
        ? `prisavslag${prisavslagBelop ? ` på kr ${prisavslagBelop}` : " tilsvarende utbedringskostnaden"}`
        : claimType === "heving"
        ? "heving av avtalen"
        : "retting av manglene, eventuelt prisavslag";

      return NextResponse.json({
        kravbrev: `${data.navn || "[Kundens navn]"}
${data.kundeAdresse || data.adresse || "[Kundens adresse]"}
${data.epost || "[E-post]"} | ${data.telefon || "[Telefon]"}

${dagensDato}

${data.handverkerNavn || "[Håndverkerens navn/firma]"}
${data.handverkerAdresse || "[Håndverkerens adresse]"}


REKLAMASJON OG KRAV OM ${claimType === "retting" ? "RETTING" : claimType === "prisavslag" ? "PRISAVSLAG" : claimType === "heving" ? "HEVING" : "RETTING/PRISAVSLAG"} – HÅNDVERKERTJENESTELOVEN

Jeg viser til avtale om ${fagType}. Dette brevet er en formell reklamasjon etter lov om håndverkertjenester m.m. for forbrukere (håndverkertjenesteloven).


SAKSFREMSTILLING

${bearbeidetHistorie || `Det ble inngått avtale om ${fagType}. Etter at arbeidet ble utført, har jeg oppdaget mangler som jeg herved reklamerer på.`}


MANGLER OG KONSEKVENSER

Følgende mangler er konstatert ved det utførte arbeidet:

${problemerListe.length > 0 ? problemerListe.map((p, i) => `${i + 1}. ${p}`).join("\n") : "1. [Beskriv mangel]\n2. [Beskriv mangel]"}

Manglene medfører at arbeidet ikke svarer til det jeg har rett til å forvente etter avtalen og etter kravet til fagmessig utførelse.


RETTSLIG GRUNNLAG

Etter håndverkertjenesteloven § 17 foreligger det mangel dersom resultatet ikke svarer til det forbrukeren har rett til å kreve etter §§ 5, 6 og 9. Tjenesten skal utføres fagmessig og i samsvar med avtalen. Etter § 24 kan jeg kreve at mangelen rettes uten kostnad for meg, med mindre retting vil medføre urimelig ulempe eller kostnad for tjenesteyteren. Dersom retting ikke skjer, har jeg krav på prisavslag etter § 25.


MINE KRAV

På bakgrunn av ovennevnte krever jeg:

1. ${kravTekst.charAt(0).toUpperCase() + kravTekst.slice(1)}
${claimType === "retting" ? "2. Dersom retting ikke skjer innen rimelig tid, forbeholder jeg meg retten til å kreve prisavslag tilsvarende utbedringskostnaden" : ""}


FRISTER

Jeg ber om skriftlig tilbakemelding innen ${fristDager} dager fra mottak av dette brevet.

${claimType === "retting" ? "Dersom retting aksepteres, ber jeg om at vi avtaler tidspunkt for befaring og at utbedring påbegynnes innen 21 dager etter avtalt oppstart." : ""}


KONSEKVENSER VED MANGLENDE RESPONS

Dersom jeg ikke mottar svar innen fristen, eller vi ikke kommer til enighet, vil jeg:
- Bringe saken inn for Forbrukerrådet for mekling
- Ved fortsatt uenighet vurdere å bringe saken inn for Forbrukerklageutvalget eller forliksrådet
- Innhente tilbud fra annen håndverker for utbedring, med krav om kostnadsdekning etter håndverkertjenesteloven § 28


VEDLEGG

- Kopi av kontrakt/tilbud (hvis tilgjengelig)
- Faktura/betalingsoversikt
- Bilder som dokumenterer manglene
- Relevant korrespondanse (e-post/SMS)


Jeg ber om at denne henvendelsen behandles uten ugrunnet opphold.

Med vennlig hilsen

${data.navn || "[Kundens navn]"}
${data.epost || "[E-post]"}
${data.telefon || "[Telefon]"}`
      });
    }

    return NextResponse.json({ kravbrev: brev });
  } catch (error) {
    console.error("Kravbrev generation error:", error);
    return NextResponse.json(
      { error: "Kunne ikke generere kravbrev" },
      { status: 500 }
    );
  }
}
