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

    // Svarfrist dato
    const svarfristDato = new Date(
      Date.now() + parseInt(fristDager) * 24 * 60 * 60 * 1000
    ).toLocaleDateString("nb-NO", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    // Kontaktinfo
    const kundeNavn = data.navn || "[Ditt navn]";
    const kundeAdresse = data.kundeAdresse || data.adresse || "[Din adresse]";
    const kundeTelefon = data.telefon || "";
    const kundeEpost = data.epost || "";
    const handverkerNavn = data.handverkerNavn || "[Håndverker]";
    const handverkerAdresse = data.handverkerAdresse || "[Adresse]";

    // Fagtype og problemer
    const fagType = Array.isArray(data.fag) ? data.fag.join(", ") : "håndverkertjeneste";
    const problemerListe = Array.isArray(data.problemer) ? data.problemer : [];

    // Bygg kravtekst basert på claimType
    let claimText: string;
    let claimExplanation: string;

    if (claimType === "heving") {
      claimText = "heving av avtalen";
      claimExplanation = "Manglene er av en slik karakter at de utgjør et vesentlig kontraktsbrudd. Jeg kan ikke lenger ha tillit til at arbeidet vil bli utført tilfredsstillende, og mener derfor at vilkårene for heving er oppfylt etter håndverkertjenesteloven § 26.";
    } else if (claimType === "prisavslag") {
      claimText = prisavslagBelop
        ? `prisavslag på kr ${prisavslagBelop}`
        : "et forholdsmessig prisavslag";
      claimExplanation = "Jeg krever prisavslag tilsvarende kostnadene ved å få mangelen utbedret av annen fagperson, jf. håndverkertjenesteloven § 25. Alternativt er jeg åpen for at dere utbedrer mangelen for egen regning innen rimelig tid.";
    } else if (claimType === "stanse_ekstraregning") {
      claimText = "stansing av ekstraregning";
      claimExplanation = "Ekstraregningen bestrides da den ikke er i samsvar med avtalen. Håndverkeren har plikt til å varsle forbrukeren dersom prisen vil bli vesentlig høyere enn forventet, jf. håndverkertjenesteloven § 32. Jeg ber om skriftlig begrunnelse for ekstraregningen.";
    } else {
      // retting eller kombinasjon
      claimText = "retting av manglene";
      claimExplanation = "Jeg krever at manglene utbedres uten kostnad for meg, jf. håndverkertjenesteloven § 24. Dersom retting ikke lar seg gjennomføre innen rimelig tid, forbeholder jeg meg retten til å kreve prisavslag eller heving.";
    }

    // Tilbakeholdt betaling
    const holdtTilbakeBetaling = data.holdtTilbakeBetaling === true;
    const tilbakeholdtBetalingTekst = holdtTilbakeBetaling
      ? "Jeg vil holde tilbake betaling i henhold til håndverkertjenesteloven § 23 inntil manglene er rettet eller det er oppnådd enighet om prisavslag."
      : "";

    // Bygg signatur
    const kundeSignatur = [
      kundeNavn,
      kundeAdresse,
      kundeTelefon ? `Tlf: ${kundeTelefon}` : "",
      kundeEpost ? `E-post: ${kundeEpost}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const systemPrompt = `✉️ KRAVBREV - Du er en norsk forbrukerjurist som skriver formelle, presise og profesjonelle reklamasjonsbrev for håndverkertjenester.

ROLLE:
Du skriver kun reklamasjonsbrev til håndverker/tjenesteyter.
Du skriver aldri vurderingsrapport og aldri forklaringer rettet mot forbrukeren.

FORMÅL:
Kravbrevet skal:
- være juridisk korrekt
- tydelig beskrive faktum
- fastslå ansvar
- fremme konkrete krav
- sette en klar svarfrist
- tåle videre behandling hos Forbrukerrådet eller Forbrukerklageutvalget

MÅLGRUPPE:
Mottaker er håndverker/tjenesteyter (potensiell motpart i tvist).
Språket skal være: saklig, nøkternt, bestemt, følelsesløst.

JURIDISK GRUNNLAG:
- Håndverkertjenesteloven § 17 (mangel foreligger når resultatet ikke svarer til det forbrukeren har rett til å kreve)
- Håndverkertjenesteloven § 24 (forbrukerens rett til retting)
- Håndverkertjenesteloven § 25 (prisavslag)
- Håndverkertjenesteloven § 26 (heving ved vesentlig mangel)
- Håndverkertjenesteloven § 28 (erstatning for tap)
- Håndverkertjenesteloven § 32 (prisberegning og varslingsplikt)

OPPGAVE:
Skriv et komplett, profesjonelt og send-klart reklamasjonsbrev på 450-550 ord. Brevet skal:
- Ha profesjonelt juridisk språk (formelt, men forståelig)
- Henvise til KONKRETE lovparagrafer
- Kunne kopieres direkte og sendes til håndverker uten redigering
- Være strukturert, logisk og overbevisende
- Være saklig og følelsesløst (aldri aggressivt eller truende)

KRAVBREVET SKAL ALDRI:
❌ inneholde følelser eller emosjonelt språk
❌ forklare juss pedagogisk (dette er for motpart, ikke læring for forbruker)
❌ være for kort (minimum 450 ord)
❌ være uklart om hva som kreves
❌ være truende eller aggressivt

STRUKTUR (MÅ FØLGES):

1️⃣ FORMELL INNLEDNING (ÅPNING)
${dagensDato}

${handverkerNavn}
${handverkerAdresse}

REKLAMASJON – ${fagType.toUpperCase()}

Identifiser partene og hva saken gjelder.
"Jeg viser til avtale om ${fagType} og fremmer med dette formell reklamasjon på utført arbeid. Dette brevet er en skriftlig reklamasjon som dokumenterer mitt krav."

2️⃣ FAKTISK HENDELSESBESKRIVELSE (kun fakta, kronologisk, ingen følelser)
Beskriv oppdraget og hva som har skjedd. Vær konkret og faktabasert.
Bearbeid brukerens beskrivelse til profesjonelt språk.

3️⃣ MANGLER
Beskriv de konkrete manglene som påberopes. List opp de viktigste (maks 4-5 punkter).
Vær spesifikk om hva som er feil og hvorfor dette avviker fra fagmessig standard.

4️⃣ JURIDISK GRUNNLAG
Forklar hvorfor forholdet utgjør en mangel etter håndverkertjenesteloven § 17.
Henvis til relevante paragrafer for det aktuelle kravet (§ 24 for retting, § 25 for prisavslag, § 26 for heving).
Nevn § 32 hvis det gjelder prisoverskridelse eller manglende varsling.

5️⃣ KRAV (tydelig fremstilt)
"På bakgrunn av ovennevnte reklamerer jeg herved og krever ${claimText}."
${claimExplanation}
${tilbakeholdtBetalingTekst ? `\n${tilbakeholdtBetalingTekst}` : ""}

Oppgi sekundære krav dersom primærkrav ikke oppfylles innen rimelig tid.

6️⃣ FRIST OG VIDERE STEG (KONSEKVENS)
Konkret svarfrist: ${svarfristDato} (${fristDager} dager)
"Dersom jeg ikke mottar tilfredsstillende svar innen fristen, vil saken bli brakt inn for Forbrukerrådet for mekling, og eventuelt videre til Forbrukerklageutvalget eller de alminnelige domstoler."

7️⃣ AVSLUTNING
"Jeg håper vi kan finne en minnelig løsning. Ta gjerne kontakt dersom dere ønsker å diskutere saken eller avtale befaring."

Med vennlig hilsen

${kundeSignatur}

KRITISKE REGLER:
- Brevet skal være komplett og send-klart (450-550 ord)
- INGEN punktlister inne i brødteksten (kun i mangel-seksjonen hvis nødvendig)
- ALDRI referer til "rapport", "vurdering", "AI" eller "system"
- Bruk faktisk informasjon, ikke plassholdere
- Aktivt og klart språk
- Ingen AI-floskler

LEVERANSE:
Returner KUN brevet. Ingen tekst før eller etter.`;

    const userPrompt = `Skriv reklamasjonsbrev:

KRAVTYPE: ${claimType.toUpperCase()}

HÅNDVERKER/MOTTAKER:
${handverkerNavn}
${handverkerAdresse}

FORBRUKER/AVSENDER:
${kundeSignatur}

TJENESTE:
${fagType}

PROBLEMENE:
${problemerListe.length > 0 ? problemerListe.join(", ") : "Ikke spesifisert"}

SAKSBESKRIVELSE FRA FORBRUKER:
"${bearbeidetHistorie || "Det har oppstått problemer med utført håndverkertjeneste."}"

${bearbeidetSvar ? `HÅNDVERKERS TIDLIGERE SVAR:\n"${bearbeidetSvar}"\n` : ""}

KRAV: ${claimText}
${holdtTilbakeBetaling ? `\nTILBAKEHOLDT BETALING: Ja - inkluder setning om tilbakeholdt betaling med henvisning til § 23.` : ""}

SVARFRIST: ${fristDager} dager (${svarfristDato})

Skriv brevet nå.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [{ role: "user", content: userPrompt }],
      system: systemPrompt,
    });

    const content = message.content[0];
    if (content.type !== "text") throw new Error("Unexpected response type");

    const brev = cleanText(content.text);

    // Fallback hvis brevet er for kort
    if (brev.length < 800) {
      return NextResponse.json({
        kravbrev: `${dagensDato}

${handverkerNavn}
${handverkerAdresse}


REKLAMASJON – ${fagType.toUpperCase()}

Jeg viser til avtale om ${fagType} og fremmer med dette formell reklamasjon på utført arbeid. Dette brevet er en skriftlig reklamasjon som dokumenterer mitt krav.

${bearbeidetHistorie || `Det ble inngått avtale om ${fagType}. Etter at arbeidet ble utført, har jeg avdekket flere mangler som jeg ikke kan akseptere.`}

Følgende mangler er konstatert ved arbeidet:
${problemerListe.length > 0 ? problemerListe.map((p: string) => `- ${p}`).join("\n") : "- Arbeidet er ikke utført i henhold til fagmessig standard\n- Resultatet avviker fra det som var avtalt"}

Ovennevnte forhold utgjør mangel etter håndverkertjenesteloven § 17, da resultatet ikke svarer til det jeg som forbruker har rett til å kreve. Tjenesten skal utføres fagmessig og i samsvar med avtalen, jf. lovens §§ 5 og 6.

${claimType === "heving"
  ? "Manglene er av en slik karakter at de utgjør et vesentlig kontraktsbrudd. Jeg krever derfor heving av avtalen etter håndverkertjenesteloven § 26."
  : claimType === "prisavslag"
  ? `Jeg krever prisavslag${prisavslagBelop ? ` på kr ${prisavslagBelop}` : ""} tilsvarende kostnadene ved å få mangelen utbedret, jf. håndverkertjenesteloven § 25.`
  : "Jeg krever at manglene utbedres uten kostnad for meg, jf. håndverkertjenesteloven § 24. Dersom retting ikke gjennomføres innen rimelig tid, forbeholder jeg meg retten til å kreve prisavslag eller heving."}

På bakgrunn av ovennevnte reklamerer jeg herved og krever ${claimText}.
${holdtTilbakeBetaling ? `\n${tilbakeholdtBetalingTekst}\n` : ""}
Jeg ber om skriftlig tilbakemelding innen ${svarfristDato} (${fristDager} dager fra mottak av dette brevet).

Dersom jeg ikke mottar tilfredsstillende svar innen fristen, vil saken bli brakt inn for Forbrukerrådet for mekling, og eventuelt videre til Forbrukerklageutvalget eller de alminnelige domstoler.

Jeg håper vi kan finne en minnelig løsning på denne saken. Ta gjerne kontakt dersom dere ønsker å diskutere saken eller avtale befaring.

Med vennlig hilsen

${kundeSignatur}`
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
