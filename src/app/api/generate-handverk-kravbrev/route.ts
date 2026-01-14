import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const claimTypeText =
      data.claimType === "retting"
        ? "retting av arbeidet"
        : data.claimType === "prisavslag"
        ? `prisavslag${data.prisavslagBelop ? ` på kr ${data.prisavslagBelop}` : ""}`
        : "heving av avtalen";

    const prompt = `Du er en erfaren norsk forbrukerjurist. Skriv et profesjonelt kravbrev på norsk.

SAKSDATA:
- Avsender: ${data.navn || "[Kundens navn]"}
- Avsenders adresse: ${data.kundeAdresse || "[Kundens adresse]"}
- Mottaker: ${data.handverkerNavn || "[Håndverkerens navn/firma]"}
- Mottakers adresse: ${data.handverkerAdresse || "[Håndverkerens adresse]"}
- Fag: ${data.fag?.join(", ") || "Håndverkertjeneste"}
- Problemer: ${data.problemer?.join(", ") || "Ikke spesifisert"}
- Kravtype: ${claimTypeText}
- Kundens beskrivelse: ${data.dinHistorie || "Ikke oppgitt"}
- Håndverkerens respons: ${data.handverkerSvar || "Ikke oppgitt"}

KRAV TIL BREVET:
1. Bruk formelt, høflig og profesjonelt språk
2. Henvis til håndverkertjenesteloven der relevant
3. Vær konkret om hva som kreves
4. Sett en rimelig svarfrist (14 dager)
5. Ikke bruk truende eller aggressivt språk
6. Bruk norske tegn (æ, ø, å) korrekt

STRUKTUR:
1. Avsenders adresse og dato
2. Mottakers adresse
3. Overskrift: "REKLAMASJON - [type arbeid]"
4. Innledning med henvisning til arbeidet
5. Beskrivelse av mangelen
6. Juridisk grunnlag (kort)
7. Krav (${claimTypeText})
8. Svarfrist
9. Avslutning med kontaktinfo

Skriv BARE selve brevet, ingen forklaringer før eller etter.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    return NextResponse.json({ kravbrev: content.text });
  } catch (error) {
    console.error("Kravbrev generation error:", error);
    return NextResponse.json(
      { error: "Kunne ikke generere kravbrev" },
      { status: 500 }
    );
  }
}
