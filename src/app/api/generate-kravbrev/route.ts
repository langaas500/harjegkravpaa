import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface KravbrevData {
  buyerName: string;
  buyerAddress: string;
  sellerName: string;
  sellerAddress: string;
  vehicle: {
    make: string;
    model: string;
    year: string;
    regNumber?: string;
  };
  purchaseDate: string;
  purchasePrice: string;
  issueDate: string;
  issueDescription: string;
  claimType: "repair" | "discount" | "cancel";
  discountAmount?: string;
  timeline?: string;
  communication?: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: KravbrevData = await req.json();

    const claimTypeText = {
      repair: "reparasjon av mangelen",
      discount: `prisavslag på ${data.discountAmount ? `kr ${parseInt(data.discountAmount).toLocaleString("nb-NO")}` : "et passende beløp"}`,
      cancel: "heving av kjøpet med full tilbakebetaling av kjøpesummen",
    };

    const prompt = `Du er en norsk jurist som skriver profesjonelle kravbrev for forbrukere i bilkjøpstvister.

Skriv et formelt kravbrev på norsk basert på følgende informasjon:

KJØPER:
Navn: ${data.buyerName}
Adresse: ${data.buyerAddress}

SELGER:
Navn: ${data.sellerName}
Adresse: ${data.sellerAddress}

KJØRETØY:
Merke/modell: ${data.vehicle.make} ${data.vehicle.model} (${data.vehicle.year})
${data.vehicle.regNumber ? `Reg.nr: ${data.vehicle.regNumber}` : ""}

KJØP:
Kjøpsdato: ${data.purchaseDate}
Kjøpesum: kr ${parseInt(data.purchasePrice).toLocaleString("nb-NO")}

MANGEL:
Oppdaget: ${data.issueDate}
Beskrivelse: ${data.issueDescription}

${data.timeline ? `TIDSLINJE:\n${data.timeline}` : ""}

${data.communication ? `TIDLIGERE KOMMUNIKASJON:\n${data.communication}` : ""}

KRAV: ${claimTypeText[data.claimType]}

INSTRUKSJONER:
1. Skriv et profesjonelt, formelt kravbrev
2. Henvis til relevante lover (forbrukerkjøpsloven §§ 15, 16, 17, 26-31)
3. Sett en rimelig frist (14 dager)
4. Nevn at saken kan bringes inn for Forbrukertilsynet/Forbrukerrådet hvis ikke løst
5. Bruk formell brevstruktur med dato, referanse, overskrift
6. Vær saklig men bestemt i tonen
7. IKKE inkluder plassholdere - bruk faktisk informasjon fra dataene over

Formater brevet pent med avsnitt. Start direkte med brevhodet (avsenders adresse øverst).`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Du er en erfaren norsk forbrukerrettsjurist. Du skriver presise, profesjonelle kravbrev som følger norsk forbrukerlovgivning. Svar alltid på norsk.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    const letter = completion.choices[0]?.message?.content;

    if (!letter) {
      return NextResponse.json(
        { error: "Kunne ikke generere kravbrev" },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      letter,
      generatedAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Generate kravbrev error:", error);
    return NextResponse.json(
      { error: "Feil ved generering av kravbrev" },
      { status: 500 }
    );
  }
}