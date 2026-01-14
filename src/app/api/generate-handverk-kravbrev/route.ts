import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

function cleanText(raw: string) {
  let t = (raw || "").trim();
  // Fjern kodeblokker hvis modellen legger det inn
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

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Kravtype mapping (støtt både claimType og onsker fra wizard)
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
    const claimTypeText =
      claimType === "retting"
        ? "retting av arbeidet"
        : claimType === "prisavslag"
        ? `prisavslag${prisavslagBelop ? ` på kr ${prisavslagBelop}` : ""}`
        : claimType === "stanse_ekstraregning"
        ? "at ekstraregning stanses/omgjøres og begrunnes skriftlig"
        : claimType === "kombinasjon"
        ? "retting og/eller prisavslag"
        : "heving av avtalen";

    const prompt = `Du er en erfaren norsk forbrukerjurist. Skriv et profesjonelt reklamasjonsbrev (kravbrev) på norsk.

VIKTIG:
- Brevet skal være høflig, saklig og bestemt.
- Ingen trusler, ingen aggressivt språk.
- Ikke skriv "jeg tar saken til advokat". Du kan nøkternt nevne "Forbrukerrådet" som mulig neste instans.
- Hold brevet innen ca. 250–450 ord.
- Bruk tydelige avsnitt og punktliste der det passer.
- Hvis info mangler, bruk nøytrale plassholdere i klammer, f.eks. [dato], [adresse], [beløp].

SAKSDATA:
- Avsender: ${data.navn || "[Kundens navn]"}
- Avsenders adresse: ${data.kundeAdresse || data.adresse || "[Kundens adresse]"}
- Avsender e-post/telefon: ${data.epost || "[E-post]"} / ${data.telefon || "[Telefon]"}
- Mottaker: ${data.handverkerNavn || "[Håndverkerens navn/firma]"}
- Mottakers adresse: ${data.handverkerAdresse || "[Håndverkerens adresse]"}

Oppdrag:
- Fag/arbeid: ${Array.isArray(data.fag) ? data.fag.join(", ") : "Håndverkertjeneste"}
- Problem(er): ${Array.isArray(data.problemer) ? data.problemer.join(", ") : "Ikke spesifisert"}
- Kontrakt/tilbud/faktura (hvis kjent): kontraktssum=${data.kontraktssum || "ukjent"}, fakturasum=${data.fakturaSum || "ukjent"}
- Tidslinje: start=${data.jobbStartDato || "ukjent"}, oppdaget=${data.oppdagetDato || "ukjent"}, reklamert=${data.reklamertDato || "ukjent"}

Alvorlighet/omfang (hvis oppgitt):
- Funksjon/bruk: ${data.funkerIkke || "ukjent"}
- Sikkerhetsrisiko: ${data.sikkerhetsrisiko || "ukjent"}
- Type feil: ${data.typeFeil || "ukjent"}
- Målt/dokumentert avvik: ${data.maltDokAvvik || "ukjent"}
- Utbedring estimat: ${data.utbedringEstimert || "ukjent"}
- Holdt tilbake betaling: ${data.holdtTilbakeBetaling || "ukjent"}

Fritekst:
- Kundens beskrivelse: ${data.dinHistorie || "Ikke oppgitt"}
- Håndverkerens respons: ${data.handverkerSvar || "Ikke oppgitt"}

KRAV:
- Kravtype: ${claimTypeText}
- Svarfrist: ${fristDager} dager fra mottak

JUSS (kort og presist):
- Henvis hvtjl. § 17 (mangel), § 24 (retting), § 25 (prisavslag), § 26 (heving) der det passer.
- Ved "stanse ekstraregning": forklar kort at prisøkning normalt må varsles/begrunnes, særlig ved overslag.

STRUKTUR (må følges):
1) Avsenders navn + adresse + dato (dato kan være [dagens dato])
2) Mottakers navn + adresse
3) Overskrift: "REKLAMASJON – [kort type arbeid]"
4) Kort innledning: hva oppdraget gjaldt og at dette er reklamasjon
5) Beskrivelse av mangel: konkret, punktvis (2–5 punkter)
6) Juridisk grunnlag: 2–4 setninger (nøkternt)
7) Mitt krav: tydelig, 1 avsnitt + evt. punkt
8) Frist og videre prosess: "Jeg ber om skriftlig svar innen X dager..." + nøkternt "Hvis vi ikke blir enige vil jeg vurdere Forbrukerrådet."
9) Vedlegg: liste (kontrakt/tilbud, faktura, bilder, sms/epost, evt. måling/vater)
10) Avslutning: høflig, med kontaktinfo

Skriv BARE selve brevet. Ingen forklaringer før/etter.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2200,
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") throw new Error("Unexpected response type");

    const brev = cleanText(content.text);

    // En mild "guard": hvis brevet er ekstremt kort, gi fallback
    if (brev.length < 400) {
      return NextResponse.json({
        kravbrev: `REKLAMASJON – [type arbeid]

[Avsender]
${data.navn || "[Kundens navn]"}
${data.kundeAdresse || data.adresse || "[Kundens adresse]"}
[dagens dato]

[Mottaker]
${data.handverkerNavn || "[Håndverkerens navn/firma]"}
${data.handverkerAdresse || "[Håndverkerens adresse]"}

Jeg viser til arbeid utført som ${Array.isArray(data.fag) ? data.fag.join(", ") : "håndverkertjeneste"}. Dette er en reklamasjon etter håndverkertjenesteloven.

Manglene gjelder blant annet:
- ${Array.isArray(data.problemer) ? data.problemer.join("\n- ") : "[beskriv mangler]"}

Etter håndverkertjenesteloven § 17 foreligger det mangel dersom resultatet ikke svarer til avtalen eller det jeg har grunn til å forvente. Jeg ber derfor om ${claimTypeText}.

Jeg ber om skriftlig svar innen ${fristDager} dager fra mottak. Dersom vi ikke kommer til en løsning, vil jeg vurdere å ta saken videre til Forbrukerrådet.

Vedlegg:
- Kontrakt/tilbud (hvis tilgjengelig)
- Faktura/betalingsoversikt
- Bilder/video av mangler
- Dialog (SMS/e-post)

Vennlig hilsen
${data.navn || "[Kundens navn]"}
${data.epost || "[E-post]"} / ${data.telefon || "[Telefon]"}`
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
