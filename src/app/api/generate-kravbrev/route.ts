import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const vehicleType = data.vehicleType || "CAR";
    const vehicleName = vehicleType === "MOTORCYCLE" ? "motorsykkel" : "bil";
    const vehicleNameGen = vehicleType === "MOTORCYCLE" ? "motorsykkelen" : "bilen";
    const vehicleNameDef = vehicleType === "MOTORCYCLE" ? "motorsykkelen" : "bilen";

    const sellerType = data.sellerType || "forhandler";
    const vehicle = data.vehicle || {};
    const issues = data.issues || {};
    const sellerContact = data.sellerContact || {};
    const userDescription = data.userDescription || "";
    const additionalInfo = data.additionalInfo || "";
    const outcome = data.outcome || "retting";

    // Nye kritiske felt
    const sellerPromises = data.sellerPromises || "";
    const hadAsIsClause = data.hadAsIsClause;
    const visibleDefect = data.visibleDefect;
    const hasWorkshopReport = data.hasWorkshopReport;
    const workshopReportText = data.workshopReportText || "";

    // Kontaktinfo fra skjema
    const contactInfo = data.contactInfo || {};
    const buyerName = contactInfo.buyerName || "[Ditt navn]";
    const buyerAddress = contactInfo.buyerAddress || "[Din adresse]";
    const buyerPostcode = contactInfo.buyerPostcode || "[Postnr]";
    const buyerCity = contactInfo.buyerCity || "[Poststed]";
    const buyerPhone = contactInfo.buyerPhone || "";
    const buyerEmail = contactInfo.buyerEmail || "";

    const safeSellerNameRaw =
      (typeof vehicle.seller === "string" ? vehicle.seller : "") ||
      (typeof data.sellerName === "string" ? data.sellerName : "") ||
      (typeof contactInfo.sellerName === "string" ? contactInfo.sellerName : "") ||
      (typeof data.seller === "string" ? data.seller : "") ||
      "";

    const safeSellerName = safeSellerNameRaw.trim() ? safeSellerNameRaw.trim() : "Selger";

    const sellerName = safeSellerName;
    const sellerAddress = contactInfo.sellerAddress || "[Adresse]";
    const sellerPostcode = contactInfo.sellerPostcode || "";
    const sellerCity = contactInfo.sellerCity || "";

    const sellerFullAddress =
      sellerAddress && sellerPostcode && sellerCity
        ? `${sellerAddress}\n${sellerPostcode} ${sellerCity}`
        : sellerAddress || "[Selgers adresse]";

    const purchaseDate = vehicle.purchaseDate
      ? new Date(vehicle.purchaseDate).toLocaleDateString("nb-NO", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "[kjøpsdato]";

    const daysSincePurchase = vehicle.purchaseDate
      ? Math.floor(
          (Date.now() - new Date(vehicle.purchaseDate).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : null;

    const price = vehicle.price
      ? `kr ${Number(vehicle.price).toLocaleString("nb-NO")},-`
      : "[kjøpesum]";

    const mileage = vehicle.mileage
      ? `${Number(vehicle.mileage).toLocaleString("nb-NO")} km`
      : "[kilometerstand]";

    const isConsumerPurchase = sellerType === "forhandler";
    const applicableLaw = isConsumerPurchase ? "forbrukerkjøpsloven" : "kjøpsloven";

    // Kravtype - heving prioriteres ved sikkerhetskritiske feil
    const isSafetyCritical =
      issues.safetyCritical === true || issues.safetyCritical === "true";
    const isNotDriveable =
      issues.driveable === false ||
      issues.driveable === "false" ||
      !issues.driveable;
    const userWantsHeving = outcome === "heving";
    const shouldClaimHeving = userWantsHeving || isSafetyCritical;

    let claimType: string;
    let claimText: string;
    let claimExplanation: string;

    if (shouldClaimHeving) {
      claimType = "HEVING";
      claimText = "heving av kjøpet med tilbakebetaling av kjøpesummen";
      claimExplanation = `Feilen er av en slik karakter at den utgjør et vesentlig kontraktsbrudd. ${
        isSafetyCritical
          ? "Feilen er sikkerhetskritisk og gjør at bilen ikke trygt kan brukes til sitt tiltenkte formål."
          : ""
      } ${isNotDriveable ? "Bilen er ikke lenger kjørbar." : ""} Jeg kan ikke lenger ha tillit til kjøretøyets tekniske tilstand, og mener derfor at vilkårene for heving er oppfylt. Ved heving ber jeg om full tilbakebetaling av kjøpesummen på ${price} mot at kjøretøyet tilbakeleveres.`;
    } else if (outcome === "prisavslag") {
      claimType = "PRISAVSLAG";
      claimText = "et forholdsmessig prisavslag";
      claimExplanation =
        "Jeg ber om et prisavslag som reflekterer mangelen og kostnadene ved å utbedre den. Alternativt er jeg åpen for at selger utbedrer feilen for egen regning.";
    } else {
      claimType = "RETTING";
      claimText = "at feilen utbedres for selgers regning";
      claimExplanation =
        "Jeg ber primært om at feilen utbedres uten kostnad for meg. Dersom retting ikke lar seg gjennomføre innen rimelig tid, forbeholder jeg meg retten til å kreve prisavslag eller heving.";
    }

    const today = new Date().toLocaleDateString("nb-NO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const deadline = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(
      "nb-NO",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

    // 6-månedersregelen
    let sixMonthInfo = "";
    if (isConsumerPurchase && daysSincePurchase !== null && daysSincePurchase <= 180) {
      sixMonthInfo = `Jeg gjør oppmerksom på at kjøpet fant sted for ${daysSincePurchase} dager siden, altså innenfor seksmånedersfristen. Etter ${applicableLaw} presumeres en mangel som viser seg innen seks måneder å ha eksistert ved risikoens overgang.`;
    }

    // Selgers respons
    let sellerResponseSection = "";
    if (sellerContact.contacted && sellerContact.response) {
      sellerResponseSection = `Jeg har tidligere vært i kontakt med dere angående dette. Dere har svart: "${sellerContact.response}". Jeg kan ikke akseptere dette standpunktet og fastholder min reklamasjon.`;
    } else if (sellerContact.contacted) {
      sellerResponseSection = `Jeg har tidligere forsøkt å ta kontakt, men har ikke mottatt tilfredsstillende svar.`;
    }

    // Bygg signatur
    const buyerSignature = [
      buyerName,
      buyerAddress,
      `${buyerPostcode} ${buyerCity}`,
      buyerPhone ? `Tlf: ${buyerPhone}` : "",
      buyerEmail ? `E-post: ${buyerEmail}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const systemPrompt = `Du er en erfaren juridisk skribent som skriver profesjonelle reklamasjonsbrev for norske forbrukere.

VIKTIG: Dette gjelder en ${vehicleName}. Bruk riktig terminologi (${vehicleNameDef}, ikke "bilen" hvis det er motorsykkel).

JURIDISK GRUNNLAG:
${isConsumerPurchase ? `
- Forbrukerkjøpsloven § 15 (mangel foreligger når varen ikke er i samsvar med avtalen)
- Forbrukerkjøpsloven § 27 (kjøpers krav ved mangel)
- Forbrukerkjøpsloven § 28 (reklamasjonsfrister - 5 år/2 år for slitedeler)
- Forbrukerkjøpsloven § 18 (presumpsjon - feil som viser seg innen 6 måneder presumeres å ha eksistert ved levering)
` : `
- Kjøpsloven § 17 (mangel foreligger når tingen ikke er i samsvar med avtalen)
- Kjøpsloven § 30 (kjøpers krav ved mangel)
- Kjøpsloven § 32 (reklamasjonsfrister - 2 år)
`}

OPPGAVE
Skriv et komplett, profesjonelt og send-klart reklamasjonsbrev på 450-550 ord. Brevet skal:
- Ha profesjonelt juridisk språk (formelt, men forståelig)
- Henvise til KONKRETE lovparagrafer
- Kunne kopieres direkte og sendes til selger uten redigering
- Være strukturert, logisk og overbevisende

KRITISK - KRAVTYPE: ${claimType}
${
  claimType === "HEVING"
    ? `⚠️ VIKTIG: Dette er et HEVINGSKRAV. Brevet skal TYDELIG kreve:
- Heving av kjøpet
- Full tilbakebetaling av ${price}
- Tilbakelevering av bilen
IKKE skriv at selger skal "reparere" eller "utbedre". Kjøper vil UT av kjøpet.`
    : ""
}

FORBUDTE FORMULERINGER - ALDRI BRUK DISSE:
❌ "klart mangel" → ✅ "kan utgjøre en mangel"
❌ "juridisk feil" → ✅ "ikke i tråd med ${applicableLaw}"
❌ "sterkt krav" → ✅ "grunnlag for å reklamere"
❌ "bevisbyrden ligger hos selger" → ✅ "presumeres å ha eksistert ved levering"
❌ "garantert" / "udiskutabelt" → ALDRI
❌ "jeg har krav på" → ✅ "jeg ber om"

EKSAKT STRUKTUR (følg denne nøyaktig):

${today}

${sellerName}
${sellerFullAddress}

REKLAMASJON – ${(vehicle.make || "[MERKE]").toUpperCase()} ${(vehicle.model || "[MODELL]").toUpperCase()} ${
      vehicle.year || ""
    }, REG.NR. ${(vehicle.regNumber || "[REG.NR]").toUpperCase()}

Avsnitt 1 - Innledning:
"Jeg viser til kjøp av ovennevnte kjøretøy den ${purchaseDate} for ${price}. Kilometerstanden ved kjøp var ${mileage}. Dette brevet er en formell reklamasjon på kjøpet."

Avsnitt 2 - Problemet (3-5 setninger):
Beskriv problemet detaljert basert på brukerens beskrivelse. Vær konkret og faktabasert.
${isSafetyCritical ? "Fremhev at feilen påvirker kjøresikkerheten." : ""}
${isNotDriveable ? "Nevn at bilen ikke er kjørbar." : ""}

Avsnitt 3 - Tidligere kontakt (hvis relevant):
${sellerResponseSection || "Utelat dette avsnittet hvis det ikke er relevant."}

Avsnitt 4 - Reklamasjonsgrunnlag (2-3 setninger):
Kort juridisk forankring med MYK formulering. Start med "Etter min vurdering kan de beskrevne forholdene utgjøre en mangel etter ${applicableLaw}."
${sixMonthInfo}

Avsnitt 5 - Kravet:
"På bakgrunn av ovennevnte reklamerer jeg herved på kjøpet og krever ${claimText}."
${claimExplanation}

Avsnitt 6 - Frist:
"Jeg ber om skriftlig tilbakemelding innen ${deadline}. Dersom jeg ikke hører fra dere innen fristen, vil jeg vurdere å bringe saken inn for Forbrukerrådet eller andre tvisteløsningsorganer."

Avsnitt 7 - Avslutning:
"Jeg håper vi kan finne en minnelig løsning på denne saken. Ta gjerne kontakt dersom dere ønsker ytterligere opplysninger."

Med vennlig hilsen

${buyerSignature}

Vedlegg:
- Kopi av kjøpekontrakt
- [Andre relevante vedlegg]

VIKTIG:
- Brevet skal være komplett og send-klart
- INGEN punktlister inne i brevet (kun i vedleggslisten)
- INGEN overskrifter inne i brevet utenom hovedoverskriften
- ALDRI referer til "rapport", "vurdering", "AI" eller "system"
- Bruk faktisk informasjon, ikke plassholdere (unntatt vedleggslisten)

LEVERANSE
Returner KUN brevet. Ingen tekst før eller etter.`;

    const userPrompt = `Skriv reklamasjonsbrev:

KRAVTYPE: ${claimType}
${claimType === "HEVING" ? "⚠️ KJØPER VIL HEVE KJØPET - IKKE FORESLÅ REPARASJON" : ""}

SELGER:
${sellerName}
${sellerFullAddress}

KJØPER:
${buyerSignature}

BIL:
${vehicle.make || "[Merke]"} ${vehicle.model || "[Modell]"} ${vehicle.year || ""}
Reg.nr: ${vehicle.regNumber || "[Reg.nr]"}
Km-stand ved kjøp: ${mileage}

KJØP:
Dato: ${purchaseDate}
Pris: ${price}
Dager siden kjøp: ${daysSincePurchase || "ukjent"}

PROBLEMET:
"${userDescription || `Det har oppstått problemer med ${vehicleNameDef} etter kjøpet.`}"

${additionalInfo ? `\nTILLEGGSINFORMASJON (viktig - inkluder relevante detaljer fra dette i brevet):\n${additionalInfo}\n` : ""}
${isSafetyCritical ? "⚠️ SIKKERHETSKRITISK FEIL" : ""}
${isNotDriveable ? `⚠️ ${vehicleName.toUpperCase()} ER IKKE KJØRBAR` : ""}
${issues.area ? `Feilområde: ${issues.area}` : ""}

KRITISKE JURIDISKE MOMENTER:
${sellerPromises ? `- Selgers løfter/påstander ved salg: "${sellerPromises}" (Dette styrker saken betydelig hvis det viste seg å være feil!)` : ""}
${hadAsIsClause === true ? `- ⚠️ "Som den er"-klausul: JA ${isConsumerPurchase && daysSincePurchase !== null && daysSincePurchase < 365 ? "(UGYLDIG - Forhandler kan ikke bruke slike klausuler etter 01.01.2024!)" : "(Kan ha betydning, men beskytter ikke mot skjulte feil)"}` : ""}
${hadAsIsClause === false ? `- "Som den er"-klausul: Nei, normalt salg` : ""}
${visibleDefect === false ? `- Synlig feil ved kjøp: NEI - Feilen var SKJULT (styrker saken)` : ""}
${visibleDefect === true ? `- ⚠️ Synlig feil ved kjøp: JA - Feilen kunne sees (kan svekke, men ikke umuliggjør krav)` : ""}
${hasWorkshopReport === true && workshopReportText ? `- Verkstedsrapport foreligger:\n${workshopReportText}` : ""}
${hasWorkshopReport === false ? `- Verkstedsrapport: Ikke undersøkt ennå (anbefal å få dette gjort)` : ""}

SELGERS RESPONS: ${sellerContact.response || "Ingen"}

KRAV: ${claimText}

Skriv brevet nå.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
      system: systemPrompt,
    });

    const textContent = message.content.find((block) => block.type === "text");
    const letter = textContent ? textContent.text : "Kunne ikke generere kravbrev.";

    return NextResponse.json({ letter });
  } catch (error) {
    console.error("Kravbrev generation error:", error);
    return NextResponse.json(
      { error: "Kunne ikke generere kravbrev. Prøv igjen senere." },
      { status: 500 }
    );
  }
}
