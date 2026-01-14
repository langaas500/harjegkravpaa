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

    // Bygg kravtekst basert på claimType
    const hovedkravTekst = claimType === "retting"
      ? "Retting av manglene uten kostnad for meg"
      : claimType === "prisavslag"
      ? `Prisavslag${prisavslagBelop ? ` på kr ${prisavslagBelop}` : " tilsvarende utbedringskostnaden"}`
      : claimType === "heving"
      ? "Heving av avtalen"
      : claimType === "stanse_ekstraregning"
      ? "Stansing av ekstraregning og skriftlig begrunnelse"
      : "Retting av manglene, alternativt prisavslag";

    const prompt = `Du er en erfaren norsk forbrukerjurist. Skriv et stramt, sendeklart reklamasjonsbrev.

KRITISKE REGLER:
- MAKS 350 ord totalt (ekskludert header). Brevet skal passe på 1-2 sider.
- Brevet er HANDLING, ikke forklaring. Rapporten forklarer - brevet krever.
- Rolig, autoritativt, profesjonelt. Ingen trusler.
- Ingen vage ord: "kanskje", "muligens", "kan tyde på", "eventuelt vurdere"
- Bruk bestemt språk: "Jeg reklamerer...", "Jeg krever...", "Jeg ber om..."
- IKKE gjengi skrivefeil. Reformuler alt til profesjonelt språk.
- Velg kun de 2-4 viktigste manglene. Ikke alt.

SAKSDATA:
Avsender: ${data.navn || "[Navn]"}, ${data.kundeAdresse || data.adresse || "[Adresse]"}
E-post: ${data.epost || "[E-post]"} | Tlf: ${data.telefon || "[Telefon]"}
Mottaker: ${data.handverkerNavn || "[Håndverker]"}, ${data.handverkerAdresse || "[Adresse]"}
Dato: ${dagensDato}

Oppdrag: ${Array.isArray(data.fag) ? data.fag.join(", ") : "Håndverkertjeneste"}
Mangler: ${Array.isArray(data.problemer) ? data.problemer.join(", ") : "Ikke spesifisert"}
Saksbakgrunn: ${bearbeidetHistorie || "Ikke oppgitt"}
${bearbeidetSvar ? `Håndverkers svar: ${bearbeidetSvar}` : ""}

Hovedkrav: ${hovedkravTekst}
Svarfrist: ${fristDager} dager

STRUKTUR (FØLG NØYAKTIG):

[HEADER - ikke tell med i ordgrense]
${data.navn || "[Navn]"}
${data.kundeAdresse || data.adresse || "[Adresse]"}
${data.epost || "[E-post]"} | ${data.telefon || "[Telefon]"}

${dagensDato}

${data.handverkerNavn || "[Håndverker]"}
${data.handverkerAdresse || "[Adresse]"}

Reklamasjon og krav om ${claimType === "retting" ? "retting" : claimType === "prisavslag" ? "prisavslag" : claimType === "heving" ? "heving" : "retting"} – håndverkertjenesteloven

[A) ÅPNING - 1-2 setninger]
"Jeg viser til avtale om [arbeid] og fremmer med dette reklamasjon."

[B) SAKSBAKGRUNN - maks 4-6 linjer]
Kort, nøytral, bearbeidet. Ingen detaljer som hører i rapporten.

[C) MANGLER - punktliste, 2-4 punkter]
Kun de viktigste. Kort og konkret.
Eksempel:
- Arbeidet er ikke utført fagmessig
- [Konkret mangel]

[D) RETTSLIG GRUNNLAG - maks 2-3 setninger]
"Forholdene utgjør mangel etter håndverkertjenesteloven § 17. Jeg har rett til ${claimType === "retting" ? "retting uten kostnad, jf. § 24" : claimType === "prisavslag" ? "prisavslag, jf. § 25" : "å heve avtalen, jf. § 26"}."

[E) MINE KRAV - nummerert, maks 3 punkter]
1. ${hovedkravTekst}
2. Skriftlig tilbakemelding innen ${fristDager} dager
${claimType === "retting" ? "3. Forslag til tidspunkt for befaring/utbedring" : ""}

[F) VED MANGLENDE SVAR - 1-2 setninger]
"Dersom jeg ikke mottar svar innen fristen, vil saken bli brakt inn for ekstern behandling."

[G) AVSLUTNING - 1 setning]
"Jeg ser frem til en konstruktiv løsning."

Med vennlig hilsen
[Navn]

Skriv BARE brevet. Ingen forklaringer.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") throw new Error("Unexpected response type");

    const brev = cleanText(content.text);

    // Fallback hvis brevet er for kort - stramt, maks 2 sider
    if (brev.length < 400) {
      const fagType = Array.isArray(data.fag) ? data.fag.join(", ") : "håndverkertjeneste";
      const problemerListe = Array.isArray(data.problemer) ? data.problemer.slice(0, 4) : [];

      return NextResponse.json({
        kravbrev: `${data.navn || "[Navn]"}
${data.kundeAdresse || data.adresse || "[Adresse]"}
${data.epost || "[E-post]"} | ${data.telefon || "[Telefon]"}

${dagensDato}

${data.handverkerNavn || "[Håndverker]"}
${data.handverkerAdresse || "[Adresse]"}


Reklamasjon og krav om ${claimType === "retting" ? "retting" : claimType === "prisavslag" ? "prisavslag" : "retting"} – håndverkertjenesteloven

Jeg viser til avtale om ${fagType} og fremmer med dette reklamasjon på utført arbeid.

${bearbeidetHistorie || `Det ble inngått avtale om ${fagType}. Etter ferdigstillelse har jeg avdekket mangler ved arbeidet.`}

Følgende mangler er konstatert:
${problemerListe.length > 0 ? problemerListe.map((p) => `- ${p}`).join("\n") : "- Arbeidet er ikke utført fagmessig\n- [Konkret mangel]"}

Forholdene utgjør mangel etter håndverkertjenesteloven § 17. Jeg har etter loven rett til ${claimType === "retting" ? "retting uten kostnad, jf. § 24" : claimType === "prisavslag" ? "prisavslag, jf. § 25" : "retting uten kostnad, jf. § 24"}.

Mine krav:
1. ${hovedkravTekst}
2. Skriftlig tilbakemelding innen ${fristDager} dager fra mottak
${claimType === "retting" ? "3. Forslag til tidspunkt for befaring og utbedring" : ""}

Dersom jeg ikke mottar svar innen fristen, vil saken bli brakt inn for ekstern behandling.

Jeg ser frem til en konstruktiv løsning.

Med vennlig hilsen

${data.navn || "[Navn]"}`
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
