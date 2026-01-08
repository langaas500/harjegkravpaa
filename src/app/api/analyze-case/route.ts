import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const context = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      console.error("ANTHROPIC_API_KEY is missing!");
      return NextResponse.json({ error: "API key mangler" }, { status: 500 });
    }

    // Calculate days since purchase
    let daysSincePurchase = "ukjent";
    if (context.vehicle?.purchaseDate) {
      const purchaseDate = new Date(context.vehicle.purchaseDate);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - purchaseDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      daysSincePurchase = `${diffDays} dager`;
    }

    // Determine applicable law
    const isDealer = context.sellerType === "DEALER";
    const applicableLaw = isDealer ? "Forbrukerkjøpsloven" : "Kjøpsloven";
    const warrantyPeriod = isDealer ? "5 år (eller 2 år for slitedeler)" : "2 år";

    const prompt = `Du er en erfaren juridisk rådgiver spesialisert på norsk kjøpslovgivning. Analyser denne bilkjøp-saken grundig.

VIKTIG JURIDISK KONTEKST:
- Dette er et kjøp fra ${isDealer ? "FORHANDLER - Forbrukerkjøpsloven gjelder" : "PRIVATPERSON - Kjøpsloven gjelder"}
- Reklamasjonsfrist: ${warrantyPeriod}
- Tid siden kjøp: ${daysSincePurchase}

KJØRETØY:
- ${context.vehicle?.make || "Ukjent"} ${context.vehicle?.model || ""}
- Årsmodell: ${context.vehicle?.year || "Ukjent"}
- Kilometerstand: ${context.vehicle?.km || "Ukjent"} km
- Kjøpesum: ${context.vehicle?.price || "Ukjent"} kr
- Kjøpsdato: ${context.vehicle?.purchaseDate || "Ukjent"}

PARTER:
- Kjøper: ${context.buyerName || "Ikke oppgitt"}
- Selger: ${context.sellerName || "Ikke oppgitt"}

PROBLEMET:
- Feilområder: ${context.issues?.join(", ") || "Ikke spesifisert"}
- Sikkerhetskritisk: ${context.safetyCritical ? "Ja" : "Nei"}
- Kjørbar: ${context.notDriveable ? "Nei, bilen står" : "Ja"}
- Estimert kostnad: ${context.costBracket || "Ukjent"}

TIMING:
- Reklamert raskt: ${context.complainedQuickly ? "Ja" : "Nei"}
- Feil oppstod tidlig: ${context.defectSoonAfter ? "Ja" : "Nei"}

KONTAKT MED SELGER:
- Har kontaktet selger: ${context.contactedSeller ? "Ja" : "Nei"}
${context.contactedSeller && context.sellerResponse ? `- Selgers respons: "${context.sellerResponse}"` : ""}

BRUKERENS BESKRIVELSE:
${context.userDescription || "(Ingen beskrivelse gitt)"}

---

Basert på informasjonen over, gi en GRUNDIG vurdering. ${isDealer ? "Husk at forbrukerkjøpsloven gir kjøper sterke rettigheter, og selger har bevisbyrden de første 6 månedene." : "Ved privatkjøp gjelder kjøpsloven, og bevisbyrden ligger hos kjøper."}

Svar KUN med JSON i dette eksakte formatet:
{
  "level": "GREEN" eller "YELLOW" eller "RED",
  "title": "Kort, konkret tittel på vurderingen",
  "summary": "3-4 setninger som oppsummerer situasjonen og hovedkonklusjonen",
  "confidence": "Høy" eller "Middels" eller "Lav",
  "keyPoints": [
    "Viktig punkt 1 - vær spesifikk til denne saken",
    "Viktig punkt 2",
    "Viktig punkt 3",
    "Viktig punkt 4"
  ],
  "legalRefs": [
    {
      "heading": "${applicableLaw}",
      "refs": [
        "§ X: Konkret paragraf med kort forklaring relevant for denne saken",
        "§ Y: Annen relevant paragraf"
      ]
    }
  ],
  "nextSteps": [
    "Konkret steg 1 tilpasset hvor de er i prosessen",
    "Steg 2",
    "Steg 3",
    "Steg 4",
    "Steg 5"
  ],
  "proTip": "Ett konkret, handlingsrettet råd spesifikt for denne saken",
  "disclaimer": "Dette er veiledning basert på oppgitt informasjon, ikke juridisk rådgivning. Kontakt advokat for bindende råd."
}`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Anthropic API error:", response.status, errorText);
      return NextResponse.json({ error: errorText }, { status: response.status });
    }

    const data = await response.json();
    const textContent = data.content.find((c: any) => c.type === "text")?.text || "";

    let outcome;
    try {
      const jsonMatch = textContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        outcome = JSON.parse(jsonMatch[0]);
      } else {
        outcome = JSON.parse(textContent);
      }
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return NextResponse.json({ error: "Kunne ikke parse AI-respons" }, { status: 500 });
    }

    return NextResponse.json({ outcome });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}