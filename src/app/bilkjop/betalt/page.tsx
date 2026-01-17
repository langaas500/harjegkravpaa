"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { jsPDF } from "jspdf";
import { CheckCircle2, FileDown, Loader2, FileText, ArrowRight } from "lucide-react";

function BetaltContent() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [fontData, setFontData] = useState<{ regular: string; bold: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("bilkjop-data");
    if (stored) {
      setData(JSON.parse(stored));
    }

    const loadFonts = async () => {
      try {
        const [regularRes, boldRes] = await Promise.all([
          fetch("https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf"),
          fetch("https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc9.ttf"),
        ]);
        if (regularRes.ok && boldRes.ok) {
          const [regularBuffer, boldBuffer] = await Promise.all([
            regularRes.arrayBuffer(),
            boldRes.arrayBuffer(),
          ]);
          const toBase64 = (buffer: ArrayBuffer) =>
            btoa(new Uint8Array(buffer).reduce((d, byte) => d + String.fromCharCode(byte), ""));
          setFontData({ regular: toBase64(regularBuffer), bold: toBase64(boldBuffer) });
        }
      } catch {
        // Fall back to helvetica if fonts fail to load
      }
    };
    loadFonts();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Ikke oppgitt";
    return new Date(dateString).toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric" });
  };

  const calculateDaysSince = (dateString: string) => {
    if (!dateString) return null;
    const diff = Math.abs(new Date().getTime() - new Date(dateString).getTime());
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const truncate = (text: string, maxLen: number) => {
    if (!text) return "-";
    return text.length > maxLen ? text.substring(0, maxLen - 2) + ".." : text;
  };

  // Hjelpefunksjon: Omskriv brukerens fritekst til nøytral saksfremstilling
  const reformulateUserText = (rawText: string): string => {
    if (!rawText) return "";
    let text = rawText
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
  };

  // Hjelpefunksjon: Utvidet juridisk analyse basert på kjøpstype og problemtype
  const getBilkjopLegalAnalysis = (isDealer: boolean, issues: string[], hadAsIsClause: boolean): string[] => {
    const analyses: string[] = [];
    const lawShort = isDealer ? "fkjl." : "kjl.";

    if (isDealer) {
      analyses.push(`Ved kjøp av motorvogn fra forhandler reguleres forholdet av forbrukerkjøpsloven av 21. juni 2002 nr. 34. Loven er ufravikelig, og selger kan ikke avtale vilkår som er dårligere for forbrukeren enn det som følger av loven, jf. fkjl. § 3.`);
      analyses.push(`Fra 1. januar 2024 er det ikke lenger adgang til å selge bruktbiler "som den er" til forbrukere. Tidligere inntatt forbehold etter § 17 er ikke lenger gyldige. Dette styrker kjøperens posisjon betydelig ved reklamasjon.`);
    } else {
      analyses.push(`Ved kjøp av motorvogn fra privatperson reguleres forholdet av kjøpsloven av 13. mai 1988 nr. 27. Loven gjelder når begge parter er privatpersoner. Selger kan ta forbehold om at tingen selges "som den er", men dette beskytter ikke mot skjulte feil.`);
      if (hadAsIsClause) {
        analyses.push(`Selv om kjøretøyet er solgt "som den er" (${lawShort} § 19), foreligger det likevel mangel dersom selger har gitt uriktige opplysninger, har unnlatt å opplyse om vesentlige forhold, eller tingen er i vesentlig dårligere stand enn kjøper hadde grunn til å forvente.`);
      }
    }

    if (issues.some(i => i.toLowerCase().includes("motor") || i.toLowerCase().includes("gir") || i.toLowerCase().includes("mekanikk"))) {
      analyses.push(`Mekaniske feil som oppstår kort tid etter kjøpet vil ofte utgjøre en mangel etter ${lawShort} § 17. ${isDealer ? "Etter fkjl. § 18 annet ledd presumeres feil som viser seg innen ett år etter levering å ha eksistert ved risikoens overgang, med mindre selger kan bevise det motsatte." : "Ved privatkjøp må kjøper sannsynliggjøre at feilen eksisterte ved kjøpet."}`);
    }

    if (issues.some(i => i.toLowerCase().includes("rust") || i.toLowerCase().includes("karosseri"))) {
      analyses.push(`Rust som ikke var synlig ved besiktigelse, eller som er mer omfattende enn forventet ut fra kjøretøyets alder og pris, kan utgjøre en mangel. Omfattende rustskader som truer kjøretøyets strukturelle integritet vil normalt være en vesentlig mangel.`);
    }

    if (issues.some(i => i.toLowerCase().includes("elektr") || i.toLowerCase().includes("lys") || i.toLowerCase().includes("sensor"))) {
      analyses.push(`Elektriske feil og feil på sikkerhetssystemer vil normalt utgjøre mangler, særlig dersom de påvirker kjøretøyets sikkerhet eller brukbarhet. Slike feil kan gi grunnlag for både retting og erstatning for følgeskader.`);
    }

    analyses.push(`Etter ${lawShort} ${isDealer ? "§ 26" : "§ 32"} kan kjøperen kreve retting, omlevering, prisavslag eller heving ved mangel. ${isDealer ? "Selger dekker kostnadene ved retting." : "Retting skal skje uten vesentlig ulempe for kjøper."} Ved vesentlig mangel kan kjøper heve kjøpet.`);

    analyses.push(`Erstatning kan kreves for tap som følge av mangelen, jf. ${lawShort} ${isDealer ? "§ 33" : "§ 40"}. Dette omfatter både direkte tap (utgifter til reparasjon, leiebil mv.) og indirekte tap (tapt arbeidsfortjeneste mv.) dersom selger er å bebreide.`);

    return analyses;
  };

  // Hjelpefunksjon: Kjøperens rettigheter
  const getBilkjopRights = (isDealer: boolean): Array<{ title: string; desc: string }> => {
    const lawShort = isDealer ? "fkjl." : "kjl.";
    return [
      {
        title: `Tilbakeholdsrett (${lawShort} ${isDealer ? "§ 20" : "§ 42"})`,
        desc: "Kjøperen kan holde tilbake så mye av kjøpesummen som er nødvendig for å sikre at kravet blir dekket. Dette gjelder også etter levering dersom det oppdages mangler."
      },
      {
        title: `Rett til retting (${lawShort} ${isDealer ? "§ 29" : "§ 34"})`,
        desc: `Kjøperen kan kreve at selger retter mangelen uten kostnad for kjøper. ${isDealer ? "Forhandler har rett til å foreta to rettingsforsøk for samme mangel." : "Retting skal skje innen rimelig tid og uten vesentlig ulempe."}`
      },
      {
        title: `Prisavslag (${lawShort} ${isDealer ? "§ 31" : "§ 38"})`,
        desc: "Dersom mangelen ikke rettes, kan kjøperen kreve prisavslag tilsvarende mangelens betydning. Prisavslaget skal normalt tilsvare reparasjonskostnadene."
      },
      {
        title: `Heving (${lawShort} ${isDealer ? "§ 32" : "§ 39"})`,
        desc: "Ved vesentlig mangel kan kjøperen heve kjøpet og få kjøpesummen tilbake. Terskelen for heving er høy, men sikkerhetskritiske feil eller svært kostbare reparasjoner kan gi grunnlag for heving."
      },
      {
        title: `Erstatning (${lawShort} ${isDealer ? "§ 33" : "§ 40"})`,
        desc: "Kjøperen kan kreve erstatning for tap som følge av mangelen. Dette omfatter utgifter til verksted, leiebil, berging og andre direkte tap."
      }
    ];
  };

  // Hjelpefunksjon: Handlingspunkter
  const getActionPoints = (outcomeLevel: string, isDealer: boolean): string[] => {
    const points: string[] = [];

    points.push("Send skriftlig reklamasjon til selger uten ugrunnet opphold. Reklamasjonen bør sendes rekommandert eller per e-post med lesebekreftelse for å sikre dokumentasjon på at den er mottatt.");
    points.push("Reklamasjonen skal inneholde: (1) en klar beskrivelse av feilen/mangelen, (2) hvilke krav du fremmer (retting, prisavslag, heving eller erstatning), og (3) en rimelig frist for tilbakemelding (normalt 14 dager).");
    points.push("Dokumenter feilen grundig med bilder, video og skriftlig beskrivelse. Få gjerne en verkstedsrapport som bekrefter feilens art og omfang, samt anslått reparasjonskostnad.");
    points.push("Ikke reparer kjøretøyet før selger har fått anledning til å vurdere mangelen og eventuelt tilby retting. Unntak gjelder ved akutte sikkerhetsfeil eller dersom selger ikke responderer innen rimelig tid.");

    if (outcomeLevel === "GREEN") {
      if (isDealer) {
        points.push("Gi selger anledning til å rette mangelen. Forhandler har rett til inntil to rettingsforsøk for samme mangel. Dersom retting ikke lykkes, kan du kreve prisavslag eller heving.");
      } else {
        points.push("Gi selger rimelig anledning til å rette mangelen før du eventuelt reparerer hos verksted. Ta vare på alle kvitteringer for utlegg du har hatt som følge av mangelen.");
      }
    } else if (outcomeLevel === "YELLOW") {
      points.push("Vurder å kontakte Forbrukertilsynet eller en forbrukerorganisasjon for veiledning dersom selger avviser reklamasjonen. Ved kjøp fra forhandler kan Forbrukerrådet bistå med mekling.");
    } else {
      points.push("Selv om saken fremstår som utfordrende, bør du likevel fremme en skriftlig reklamasjon. Selgers respons kan gi grunnlag for å vurdere saken på nytt.");
    }

    return points;
  };

  // Hjelpefunksjon: Konsekvenstekst
  const getConsequenceText = (outcomeLevel: string, isDealer: boolean): string => {
    if (outcomeLevel === "GREEN") {
      if (isDealer) {
        return "Dersom forhandleren ikke besvarer reklamasjonen innen fristen, eller avviser kravet uten saklig grunn, kan saken bringes inn for Forbrukerrådet for mekling. Fører ikke mekling frem, kan saken bringes inn for Forbrukerklageutvalget. Forhandleren risikerer i så fall å måtte dekke dine sakskostnader i tillegg til kravet.";
      } else {
        return "Dersom selger ikke besvarer reklamasjonen innen fristen, eller avviser kravet uten saklig grunn, kan saken bringes inn for forliksrådet. Ved privatkjøp er det viktig å handle raskt, da foreldelsesfristen er kortere enn ved forbrukerkjøp.";
      }
    } else if (outcomeLevel === "YELLOW") {
      return "Selgers respons på reklamasjonen vil være avgjørende for hvordan saken bør håndteres videre. Dersom selger erkjenner forholdet helt eller delvis, kan partene ofte finne en minnelig løsning. Ved uenighet kan det være aktuelt å innhente en uavhengig verkstedvurdering.";
    } else {
      return "Selv om saken fremstår som krevende, er det viktig å fremme reklamasjonen skriftlig. Selgers respons kan belyse forhold som endrer vurderingen. En verkstedsrapport kan også avdekke feil som styrker saken.";
    }
  };

  const generatePDF = async () => {
    if (!data) return;
    setIsGenerating(true);

    try {
      const doc = new jsPDF("p", "mm", "a4");
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;
      const safeWidth = contentWidth - 4;
      let y = 0;
      let currentPage = 1;

      if (fontData) {
        doc.addFileToVFS("Roboto-Regular.ttf", fontData.regular);
        doc.addFileToVFS("Roboto-Bold.ttf", fontData.bold);
        doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
        doc.addFont("Roboto-Bold.ttf", "Roboto", "bold");
      }

      const useFont = fontData ? "Roboto" : "helvetica";
      const isDealer = data.sellerType === "DEALER";
      const warrantyText = isDealer ? "5 år (2 år for slitedeler)" : "2 år";
      const vehicle = data.vehicle as Record<string, string> | undefined;
      const outcome = data.outcome as Record<string, unknown> | undefined;
      const daysSince = calculateDaysSince(vehicle?.purchaseDate || "");
      const issues = data.issues as string[] || [];
      const hadAsIsClause = data.hadAsIsClause as boolean || false;

      // Forbedret header med sidetall
      const addPageHeader = (pageNum: number) => {
        doc.setFillColor(30, 41, 59);
        doc.rect(0, 0, pageWidth, 22, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(11);
        doc.setFont(useFont, "bold");
        doc.text("JURIDISK VURDERING – KJØRETØYKJØP", margin, 14);
        doc.setFontSize(8);
        doc.setFont(useFont, "normal");
        doc.text(`Side ${pageNum}`, pageWidth - margin, 14, { align: "right" });
        y = 30;
      };

      const addPage = () => {
        doc.addPage();
        currentPage++;
        addPageHeader(currentPage);
      };

      const checkPageBreak = (needed: number) => {
        if (y + needed > pageHeight - 20) addPage();
      };

      const drawBox = (x: number, yPos: number, width: number, height: number, fillColor: number[]) => {
        doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
        doc.roundedRect(x, yPos, width, height, 2, 2, "F");
      };

      const addSectionTitle = (title: string) => {
        checkPageBreak(15);
        doc.setFontSize(12);
        doc.setFont(useFont, "bold");
        doc.setTextColor(30, 41, 59);
        doc.text(title, margin, y);
        y += 2;
        doc.setDrawColor(16, 185, 129);
        doc.setLineWidth(0.8);
        doc.line(margin, y, margin + doc.getTextWidth(title) + 5, y);
        y += 6;
      };

      const addParagraph = (text: string, fontSize: number = 9) => {
        doc.setFontSize(fontSize);
        doc.setFont(useFont, "normal");
        doc.setTextColor(51, 65, 85);
        const lines = doc.splitTextToSize(text, safeWidth);
        lines.forEach((line: string) => {
          checkPageBreak(5);
          doc.text(line, margin, y);
          y += 4.5;
        });
        y += 2;
      };

      const outcomeLevel = (outcome?.level as string) || "YELLOW";
      const buyerName = (data.buyerName as string) || "Kjøper";
      const sellerName = (data.sellerName as string) || "Selger";

      // ===== SIDE 1: FORSIDE OG SAMMENDRAG =====
      doc.setFillColor(30, 41, 59);
      doc.rect(0, 0, pageWidth, 70, "F");

      // Logo-område
      doc.setFillColor(16, 185, 129);
      doc.roundedRect(margin, 20, 12, 12, 2, 2, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont(useFont, "bold");
      doc.text("H", margin + 4, 28);

      doc.setFontSize(22);
      doc.setFont(useFont, "bold");
      doc.text("JURIDISK VURDERING", margin + 18, 28);

      doc.setFontSize(12);
      doc.setFont(useFont, "normal");
      doc.text(`Kjøretøykjøp – ${isDealer ? "Forhandler" : "Privat"}salg`, margin + 18, 36);

      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      doc.text(`Utarbeidet: ${new Date().toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric" })}`, margin + 18, 45);
      doc.text(`Referanse: BIL-${Date.now().toString().slice(-8)}`, margin + 18, 51);

      y = 80;

      // Konklusjonsboks
      const levelColors: Record<string, number[]> = {
        GREEN: [22, 163, 74],
        YELLOW: [202, 138, 4],
        RED: [220, 38, 38]
      };
      const levelLabels: Record<string, string> = {
        GREEN: "KRAVET HAR GODT GRUNNLAG",
        YELLOW: "KRAVET KREVER NÆRMERE VURDERING",
        RED: "KRAVET HAR BEGRENSET GRUNNLAG"
      };
      const levelColor = levelColors[outcomeLevel] || levelColors.YELLOW;

      drawBox(margin, y, contentWidth, 45, [248, 250, 252]);
      doc.setDrawColor(levelColor[0], levelColor[1], levelColor[2]);
      doc.setLineWidth(1);
      doc.line(margin, y, margin, y + 45);

      doc.setFontSize(10);
      doc.setFont(useFont, "bold");
      doc.setTextColor(100, 116, 139);
      doc.text("KONKLUSJON", margin + 5, y + 8);

      doc.setFontSize(13);
      doc.setTextColor(levelColor[0], levelColor[1], levelColor[2]);
      doc.text(levelLabels[outcomeLevel], margin + 5, y + 18);

      doc.setFontSize(9);
      doc.setFont(useFont, "normal");
      doc.setTextColor(51, 65, 85);
      const summaryText = outcomeLevel === "GREEN"
        ? `Basert på de fremlagte opplysningene fremstår ${buyerName}s krav mot ${sellerName} som velbegrunnet. Saken gjelder ${vehicle?.make || "kjøretøy"} ${vehicle?.model || ""} der det er påberopt feil ved ${issues.join(", ").toLowerCase() || "kjøretøyet"}. Det anbefales å fremme skriftlig reklamasjon med konkrete krav.`
        : outcomeLevel === "YELLOW"
        ? `Saken reiser flere spørsmål som krever nærmere vurdering. Det er påberopt feil ved ${issues.join(", ").toLowerCase() || "kjøretøyet"}. Styrken av kravet vil avhenge av dokumentasjonen og selgers tilsvar.`
        : `Saken fremstår som utfordrende å vinne frem med basert på de opplysningene som er gitt. Det anbefales likevel å fremme skriftlig reklamasjon for å avklare selgers standpunkt.`;

      const summaryLines = doc.splitTextToSize(summaryText, safeWidth - 10);
      doc.text(summaryLines.slice(0, 4), margin + 5, y + 28);

      y += 55;

      // Seksjon 1: Saksopplysninger
      addSectionTitle("1. Saksopplysninger");

      const boxW = (contentWidth - 4) / 2;
      drawBox(margin, y, boxW, 22, [248, 250, 252]);
      drawBox(margin + boxW + 4, y, boxW, 22, [248, 250, 252]);

      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.setFont(useFont, "normal");
      doc.text("KJØPER", margin + 3, y + 5);
      doc.text("SELGER", margin + boxW + 7, y + 5);

      doc.setFontSize(10);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text(buyerName, margin + 3, y + 14);
      doc.text(sellerName, margin + boxW + 7, y + 14);

      y += 28;

      // Kjøretøyinformasjon
      const thirdW = (contentWidth - 6) / 3;
      drawBox(margin, y, thirdW, 18, [248, 250, 252]);
      drawBox(margin + thirdW + 3, y, thirdW, 18, [248, 250, 252]);
      drawBox(margin + (thirdW + 3) * 2, y, thirdW, 18, [248, 250, 252]);

      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.setFont(useFont, "normal");
      doc.text("MERKE/MODELL", margin + 3, y + 5);
      doc.text("REG.NR", margin + thirdW + 6, y + 5);
      doc.text("ÅRSMODELL", margin + (thirdW + 3) * 2 + 3, y + 5);

      doc.setFontSize(9);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text(truncate(`${vehicle?.make || ""} ${vehicle?.model || ""}`, 20), margin + 3, y + 13);
      doc.text(vehicle?.regNum || "-", margin + thirdW + 6, y + 13);
      doc.text(vehicle?.year || "-", margin + (thirdW + 3) * 2 + 3, y + 13);

      y += 22;

      drawBox(margin, y, thirdW, 18, [248, 250, 252]);
      drawBox(margin + thirdW + 3, y, thirdW, 18, [248, 250, 252]);
      drawBox(margin + (thirdW + 3) * 2, y, thirdW, 18, [248, 250, 252]);

      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.setFont(useFont, "normal");
      doc.text("KJØPESUM", margin + 3, y + 5);
      doc.text("KM-STAND", margin + thirdW + 6, y + 5);
      doc.text("KJØPSDATO", margin + (thirdW + 3) * 2 + 3, y + 5);

      doc.setFontSize(9);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text(vehicle?.price ? `${vehicle.price} kr` : "-", margin + 3, y + 13);
      doc.text(vehicle?.km ? `${vehicle.km} km` : "-", margin + thirdW + 6, y + 13);
      doc.text(formatDate(vehicle?.purchaseDate || ""), margin + (thirdW + 3) * 2 + 3, y + 13);

      y += 24;

      // Salgsform
      drawBox(margin, y, boxW, 18, [248, 250, 252]);
      drawBox(margin + boxW + 4, y, boxW, 18, [248, 250, 252]);

      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.setFont(useFont, "normal");
      doc.text("TYPE SALG", margin + 3, y + 5);
      doc.text("TID SIDEN KJØP", margin + boxW + 7, y + 5);

      doc.setFontSize(9);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text(isDealer ? "Forhandlerkjøp" : "Privatkjøp", margin + 3, y + 13);
      doc.text(daysSince ? `${daysSince} dager` : "-", margin + boxW + 7, y + 13);

      // Footer side 1
      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.text("harjegkravpå.no – Juridisk veiledning for forbrukere", margin, pageHeight - 8);
      doc.text("Konfidensielt", pageWidth - margin, pageHeight - 8, { align: "right" });

      // ===== SIDE 2: SAKSFREMSTILLING =====
      addPage();

      addSectionTitle("2. Saksfremstilling");

      addParagraph("Nedenfor følger en gjennomgang av saksforholdet slik det er beskrevet av kjøperen. Fremstillingen er bearbeidet til en nøytral saksfremstilling egnet som grunnlag for reklamasjon.");
      y += 3;

      if (data.userDescription) {
        const reformulatedText = reformulateUserText(data.userDescription as string);

        doc.setFontSize(10);
        doc.setFont(useFont, "bold");
        doc.setTextColor(30, 41, 59);
        doc.text("Kjøpers beskrivelse av forholdet:", margin, y);
        y += 6;

        const historyLines = doc.splitTextToSize(reformulatedText, safeWidth - 8);
        const boxHeight = Math.max(40, 10 + historyLines.length * 4.5);

        checkPageBreak(boxHeight + 10);
        drawBox(margin, y, contentWidth, boxHeight, [248, 250, 252]);
        doc.setDrawColor(100, 116, 139);
        doc.setLineWidth(0.3);
        doc.line(margin + 3, y + 3, margin + 3, y + boxHeight - 3);

        doc.setFontSize(9);
        doc.setFont(useFont, "normal");
        doc.setTextColor(51, 65, 85);
        let textY = y + 8;
        historyLines.forEach((line: string) => {
          if (textY < y + boxHeight - 5) {
            doc.text(line, margin + 8, textY);
            textY += 4.5;
          }
        });

        y += boxHeight + 8;
      }

      // Seksjon 3: Påberopte feil
      addSectionTitle("3. Påberopte feil og mangler");

      addParagraph("Basert på den fremlagte beskrivelsen kan følgende forhold identifiseres som grunnlag for reklamasjon:");
      y += 2;

      if (issues.length > 0) {
        issues.forEach((issue, index) => {
          checkPageBreak(20);

          doc.setFontSize(10);
          doc.setFont(useFont, "bold");
          doc.setTextColor(30, 41, 59);
          doc.text(`${index + 1}. ${issue}`, margin, y);
          y += 5;

          // Forklaring per problemtype
          let explanation = "";
          if (issue.toLowerCase().includes("motor") || issue.toLowerCase().includes("mekanikk")) {
            explanation = `Motorproblemer som oppstår kort tid etter kjøp vil ofte utgjøre en mangel etter ${isDealer ? "fkjl." : "kjl."} § 17. ${isDealer ? "Ved forhandlerkjøp presumeres feil innen ett år å ha eksistert ved kjøpet." : "Kjøper må sannsynliggjøre at feilen eksisterte ved kjøpet."}`;
          } else if (issue.toLowerCase().includes("gir") || issue.toLowerCase().includes("kløtsj")) {
            explanation = "Feil på girkasse eller clutch er kostbare å reparere og vil normalt utgjøre en mangel dersom feilen eksisterte ved kjøpet.";
          } else if (issue.toLowerCase().includes("rust") || issue.toLowerCase().includes("karosseri")) {
            explanation = "Rust som ikke var synlig ved besiktigelse, eller som er mer omfattende enn forventet, kan utgjøre en mangel.";
          } else if (issue.toLowerCase().includes("elektr") || issue.toLowerCase().includes("sensor")) {
            explanation = "Elektriske feil og sensorfeil kan gi grunnlag for reklamasjon, særlig dersom de påvirker sikkerhet eller brukbarhet.";
          } else {
            explanation = `Dette kan utgjøre en mangel etter ${isDealer ? "forbrukerkjøpsloven" : "kjøpsloven"} dersom feilen eksisterte ved kjøpet.`;
          }

          addParagraph(explanation);
          y += 2;
        });
      }

      // Tilleggsinformasjon om sikkerhet og kjørbarhet
      if (data.safetyCritical || data.notDriveable) {
        checkPageBreak(25);
        drawBox(margin, y, contentWidth, 20, [254, 226, 226]);
        doc.setDrawColor(220, 38, 38);
        doc.setLineWidth(0.5);
        doc.line(margin, y, margin, y + 20);

        doc.setFontSize(9);
        doc.setFont(useFont, "bold");
        doc.setTextColor(153, 27, 27);
        doc.text("Alvorlig forhold", margin + 5, y + 7);

        doc.setFontSize(8);
        doc.setFont(useFont, "normal");
        doc.setTextColor(127, 29, 29);
        const severityText = data.safetyCritical && data.notDriveable
          ? "Feilen er sikkerhetskritisk og kjøretøyet er ikke kjørbart. Dette styrker saken betydelig."
          : data.safetyCritical
          ? "Feilen er sikkerhetskritisk. Dette styrker saken betydelig."
          : "Kjøretøyet er ikke kjørbart. Dette styrker saken betydelig.";
        doc.text(severityText, margin + 5, y + 14);
        y += 26;
      }

      // ===== SIDE 3: JURIDISK VURDERING =====
      addPage();

      addSectionTitle("4. Juridisk grunnlag");

      addParagraph(`Avtaleforholdet reguleres av ${isDealer ? "forbrukerkjøpsloven av 21. juni 2002 nr. 34" : "kjøpsloven av 13. mai 1988 nr. 27"}. Nedenfor følger en gjennomgang av de relevante bestemmelsene og hvordan disse kommer til anvendelse i saken.`);
      y += 4;

      const legalAnalyses = getBilkjopLegalAnalysis(isDealer, issues, hadAsIsClause);

      legalAnalyses.forEach((analysis) => {
        checkPageBreak(20);
        const analysisLines = doc.splitTextToSize(analysis, safeWidth - 5);
        doc.setFontSize(9);
        doc.setFont(useFont, "normal");
        doc.setTextColor(51, 65, 85);
        analysisLines.forEach((line: string) => {
          checkPageBreak(5);
          doc.text(line, margin, y);
          y += 4.5;
        });
        y += 4;
      });

      // Seksjon 5: Kjøperens rettigheter
      checkPageBreak(40);
      addSectionTitle("5. Kjøperens rettigheter");

      addParagraph(`Ved mangel har kjøperen følgende beføyelser etter ${isDealer ? "forbrukerkjøpsloven" : "kjøpsloven"}:`);
      y += 2;

      const rights = getBilkjopRights(isDealer);

      rights.forEach((right) => {
        checkPageBreak(18);
        doc.setFontSize(9);
        doc.setFont(useFont, "bold");
        doc.setTextColor(30, 41, 59);
        doc.text(right.title, margin, y);
        y += 4;

        doc.setFont(useFont, "normal");
        doc.setTextColor(51, 65, 85);
        const rightLines = doc.splitTextToSize(right.desc, safeWidth);
        rightLines.forEach((line: string) => {
          doc.text(line, margin, y);
          y += 4;
        });
        y += 3;
      });

      // ===== SIDE 4: ANBEFALT HANDLING =====
      addPage();

      addSectionTitle("6. Anbefalt fremgangsmåte");

      addParagraph("For å ivareta dine rettigheter anbefales følgende fremgangsmåte. Punktene bør følges i den angitte rekkefølgen:");
      y += 4;

      const actionPoints = getActionPoints(outcomeLevel, isDealer);

      actionPoints.forEach((point, index) => {
        checkPageBreak(20);

        doc.setFillColor(16, 185, 129);
        doc.circle(margin + 3, y + 1, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.setFont(useFont, "bold");
        doc.text(`${index + 1}`, margin + 1.5, y + 2.5);

        doc.setFontSize(9);
        doc.setFont(useFont, "normal");
        doc.setTextColor(51, 65, 85);
        const pointLines = doc.splitTextToSize(point, safeWidth - 12);
        let pointY = y;
        pointLines.forEach((line: string) => {
          checkPageBreak(5);
          doc.text(line, margin + 10, pointY + 2);
          pointY += 4.5;
        });
        y = pointY + 4;
      });

      // Seksjon 7: Konsekvenser
      y += 4;
      addSectionTitle("7. Konsekvenser ved manglende oppfølging");

      const consequenceText = getConsequenceText(outcomeLevel, isDealer);
      addParagraph(consequenceText);

      // Tidsfrister
      y += 4;
      checkPageBreak(35);
      drawBox(margin, y, contentWidth, 30, [254, 249, 195]);
      doc.setDrawColor(202, 138, 4);
      doc.setLineWidth(0.5);
      doc.line(margin, y, margin, y + 30);

      doc.setFontSize(10);
      doc.setFont(useFont, "bold");
      doc.setTextColor(133, 77, 14);
      doc.text("Viktige frister", margin + 5, y + 8);

      doc.setFontSize(8);
      doc.setFont(useFont, "normal");
      doc.setTextColor(113, 63, 18);
      const deadlineText = isDealer
        ? `Reklamasjon må fremsettes innen rimelig tid etter at mangelen ble oppdaget. Den absolutte reklamasjonsfristen er ${warrantyText} fra levering. For skjulte mangler som viser seg etter 2 år, gjelder 5 års frist.`
        : `Ved privatkjøp er reklamasjonsfristen normalt 2 år fra kjøpet. Reklamasjon må fremsettes innen rimelig tid etter at mangelen ble oppdaget. Det anbefales å reklamere skriftlig så snart som mulig.`;
      const deadlineLines = doc.splitTextToSize(deadlineText, safeWidth - 10);
      doc.text(deadlineLines, margin + 5, y + 15);

      y += 38;

      // ===== SIDE 5: DOKUMENTASJON OG AVSLUTNING =====
      addPage();

      addSectionTitle("8. Dokumentasjon og bevisføring");

      addParagraph("For å styrke saken anbefales det å samle og sikre følgende dokumentasjon:");
      y += 2;

      const docPoints = [
        "Kjøpekontrakt eller kvittering som dokumenterer kjøpet",
        "Bilder og video av feilen fra flere vinkler med god belysning",
        "Verkstedrapport som bekrefter feilens art, omfang og estimert reparasjonskostnad",
        "Skjermbilde av annonsen dersom kjøretøyet ble kjøpt via nettannonse",
        "All korrespondanse med selger (e-post, SMS, brev)",
        "Feilkoder fra OBD-avlesning dersom relevant",
        "Kvitteringer for eventuelle utlegg (berging, leiebil, midlertidig reparasjon)"
      ];

      docPoints.forEach((point) => {
        checkPageBreak(8);
        doc.setFillColor(30, 41, 59);
        doc.circle(margin + 2, y, 1, "F");
        doc.setFontSize(9);
        doc.setFont(useFont, "normal");
        doc.setTextColor(51, 65, 85);
        const pointLines = doc.splitTextToSize(point, safeWidth - 8);
        doc.text(pointLines, margin + 6, y + 1);
        y += pointLines.length * 4.5 + 2;
      });

      // Seksjon 9: Annonsegrunnlag (kun hvis data finnes)
      const finnUrl = data.finnUrl as string | null;
      const adEvidenceFiles = data.adEvidenceFiles as Array<{ name: string }> | null;
      const adClaims = data.adClaims as string | null;

      if (finnUrl || (adEvidenceFiles && adEvidenceFiles.length > 0) || adClaims) {
        y += 6;
        addSectionTitle("9. Annonsegrunnlag");

        addParagraph("Følgende informasjon om annonsen er oppgitt av kjøperen. Dette kan være relevant dersom annonsen inneholdt opplysninger som viste seg å være uriktige.");
        y += 2;

        if (finnUrl) {
          checkPageBreak(12);
          doc.setFontSize(9);
          doc.setFont(useFont, "bold");
          doc.setTextColor(30, 41, 59);
          doc.text("Referanse til original annonse:", margin, y);
          y += 4;
          doc.setFont(useFont, "normal");
          doc.setTextColor(51, 65, 85);
          const urlLines = doc.splitTextToSize(finnUrl, safeWidth);
          urlLines.forEach((line: string) => {
            doc.text(line, margin, y);
            y += 4;
          });
          y += 3;
        }

        if (adClaims) {
          checkPageBreak(20);
          doc.setFontSize(9);
          doc.setFont(useFont, "bold");
          doc.setTextColor(30, 41, 59);
          doc.text("Kjøpers beskrivelse av hva annonsen lovet:", margin, y);
          y += 5;

          const claimsLines = doc.splitTextToSize(reformulateUserText(adClaims), safeWidth - 8);
          const claimsBoxHeight = Math.max(20, 8 + claimsLines.length * 4.5);

          drawBox(margin, y, contentWidth, claimsBoxHeight, [248, 250, 252]);
          doc.setDrawColor(100, 116, 139);
          doc.setLineWidth(0.3);
          doc.line(margin + 3, y + 3, margin + 3, y + claimsBoxHeight - 3);

          doc.setFontSize(9);
          doc.setFont(useFont, "normal");
          doc.setTextColor(51, 65, 85);
          let claimsY = y + 6;
          claimsLines.forEach((line: string) => {
            if (claimsY < y + claimsBoxHeight - 3) {
              doc.text(line, margin + 8, claimsY);
              claimsY += 4.5;
            }
          });
          y += claimsBoxHeight + 5;
        }

        if (adEvidenceFiles && adEvidenceFiles.length > 0) {
          checkPageBreak(15);
          doc.setFontSize(9);
          doc.setFont(useFont, "bold");
          doc.setTextColor(30, 41, 59);
          doc.text(`Vedlagt dokumentasjon (${adEvidenceFiles.length} fil${adEvidenceFiles.length > 1 ? "er" : ""}):`, margin, y);
          y += 5;

          adEvidenceFiles.forEach((file) => {
            checkPageBreak(6);
            doc.setFillColor(30, 41, 59);
            doc.circle(margin + 2, y, 1, "F");
            doc.setFontSize(9);
            doc.setFont(useFont, "normal");
            doc.setTextColor(51, 65, 85);
            doc.text(file.name, margin + 6, y + 1);
            y += 5;
          });
        }
      }

      y += 6;
      addSectionTitle("10. Tvisteløsning");

      addParagraph("Dersom reklamasjonen ikke fører frem, finnes følgende muligheter for tvisteløsning:");
      y += 2;

      const disputeOptions = isDealer
        ? [
            { title: "Forbrukerrådet", desc: "Tilbyr gratis mekling mellom forbruker og forhandler. Meklingen er frivillig, men mange saker løses på dette stadiet." },
            { title: "Forbrukerklageutvalget", desc: "Behandler klager på kjøretøykjøp fra forhandler dersom mekling ikke fører frem. Utvalgets avgjørelser er bindende dersom de ikke bringes inn for domstolene innen fire uker." },
            { title: "Domstolene", desc: "Saken kan bringes inn for forliksrådet eller tingretten. Ved forbrukertvister er det særlige regler om sakskostnader som beskytter forbrukeren." }
          ]
        : [
            { title: "Forliksrådet", desc: "Ved privatkjøp kan saken bringes direkte inn for forliksrådet. Forliksrådet forsøker først mekling, deretter kan det avsi dom i saker med tvistesum under 200 000 kr." },
            { title: "Domstolene", desc: "Dersom saken ikke løses i forliksrådet, kan den ankes til tingretten. Ved tvister mellom privatpersoner gjelder ordinære regler om sakskostnader." }
          ];

      disputeOptions.forEach((option) => {
        checkPageBreak(18);
        doc.setFontSize(9);
        doc.setFont(useFont, "bold");
        doc.setTextColor(30, 41, 59);
        doc.text(option.title, margin, y);
        y += 4;

        doc.setFont(useFont, "normal");
        doc.setTextColor(51, 65, 85);
        const optionLines = doc.splitTextToSize(option.desc, safeWidth);
        optionLines.forEach((line: string) => {
          doc.text(line, margin, y);
          y += 4;
        });
        y += 3;
      });

      // Avsluttende merknad
      y += 6;
      addSectionTitle("11. Avsluttende merknad");

      addParagraph("Denne vurderingen er utarbeidet på grunnlag av opplysningene som er gitt, og gir en foreløpig vurdering av saken. Den konkrete rettsstillingen vil avhenge av den fullstendige dokumentasjonen og eventuelle innsigelser fra motparten.");

      addParagraph("Rapporten er ment som veiledning og utgjør ikke juridisk rådgivning i lovens forstand. Ved kompliserte saker eller store verdier anbefales det å konsultere advokat for en bindende vurdering.");

      // CTA-boks for kravbrev
      y += 6;
      checkPageBreak(35);
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(0.5);
      doc.roundedRect(margin, y, contentWidth, 30, 2, 2, "S");

      doc.setFontSize(10);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text("Neste steg: Skriftlig reklamasjon", margin + 5, y + 8);

      doc.setFontSize(9);
      doc.setFont(useFont, "normal");
      doc.setTextColor(51, 65, 85);
      const ctaText = "For å fremme kravet formelt kan du bestille et ferdig utformet kravbrev basert på denne vurderingen. Brevet er tilpasset din sak, juridisk korrekt formulert, og klart til å sendes til selger.";
      const ctaLines = doc.splitTextToSize(ctaText, safeWidth - 10);
      doc.text(ctaLines, margin + 5, y + 15);

      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text("Kravbrev kan bestilles på harjegkravpå.no", margin + 5, y + 26);

      // Footer siste side
      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.text("harjegkravpå.no – Juridisk veiledning for forbrukere", margin, pageHeight - 8);
      doc.text("Konfidensielt", pageWidth - margin, pageHeight - 8, { align: "right" });

      doc.save(`bilkjop-rapport-${isDealer ? "forhandler" : "privat"}-${new Date().toISOString().split("T")[0]}.pdf`);
      setDownloaded(true);
    } catch (error) {
      console.error("PDF error:", error);
      alert("Kunne ikke generere PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!data) {
    return (
      <div className="bg-nordic text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-white" />
          <p>Laster rapport...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 space-y-6">
      <div className="space-y-6 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-emerald-400" />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">Betaling fullført!</h1>
          <p className="text-slate-400">Takk for kjøpet. Din rapport er klar.</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-left">
          <p className="text-sm text-slate-500 mb-1">Ordre</p>
          <p className="font-semibold">Bilkjøp-rapport PDF</p>
          <p className="text-slate-400">39 kr</p>
        </div>

        {/* B – UI FØR PDF */}
        <p className="text-sm text-slate-400">
          Du får en tydelig vurdering av om du har krav, og anbefalt neste steg basert på situasjonen.
        </p>

        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className="group w-full flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-4 font-bold text-lg hover:bg-teal-400 transition disabled:opacity-60"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Lager PDF...
            </>
          ) : (
            <>
              <FileDown className="h-5 w-5" />
              Last ned PDF-rapport
            </>
          )}
        </button>

        {downloaded && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
            <p className="text-emerald-400 text-sm">Rapporten er lastet ned!</p>
          </div>
        )}

        <div className="border-t border-white/10 pt-6 mt-6">
          <div className="border border-white/10 bg-white/5 rounded-2xl p-5 text-left">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-xl border border-white/10 bg-white/5">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Trenger du et kravbrev?</h3>
                <p className="text-sm text-slate-400 mb-3">
                  Få et ferdig formulert juridisk brev du kan sende direkte til selger. 
                  Spar tid og få et profesjonelt resultat.
                </p>
                <ul className="text-sm text-slate-300 space-y-1 mb-4">
                  <li>Tilpasset din sak</li>
                  <li>Juridisk korrekt språk</li>
                  <li>Konkrete krav og frister</li>
                </ul>
                <button
                  onClick={() => router.push("/bilkjop/kravbrev")}
                  className="group w-full flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition"
                >
                  Bestill kravbrev - 99 kr
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={() => router.push("/")}
            className="text-slate-500 hover:text-slate-300 text-sm"
          >
            Tilbake til forsiden
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BetaltPage() {
  return (
    <main className="bg-nordic text-white">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      }>
        <BetaltContent />
      </Suspense>
    </main>
  );
}