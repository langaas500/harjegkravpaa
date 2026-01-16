"use client";

import React, { useEffect, useState, Suspense } from "react";
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
    const stored = localStorage.getItem("handverk-data");
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {
        console.error("Could not parse handverk-data");
      }
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

  const truncate = (text: string, maxLen: number) => {
    if (!text) return "-";
    return text.length > maxLen ? text.substring(0, maxLen - 2) + ".." : text;
  };

  // Hjelpefunksjon: Omskriv brukerens fritekst til nøytral saksfremstilling
  const reformulateUserText = (rawText: string): string => {
    if (!rawText) return "";
    // Fjern overdrevne tegnsettinger, rett opp vanlige skrivefeil, gjør nøytralt
    let text = rawText
      .replace(/!!+/g, ".")
      .replace(/\?\?+/g, "?")
      .replace(/\.\.\.+/g, ".")
      .replace(/\s+/g, " ")
      .trim();
    // Sørg for at første bokstav er stor
    if (text.length > 0) {
      text = text.charAt(0).toUpperCase() + text.slice(1);
    }
    // Sørg for at teksten slutter med punktum
    if (text.length > 0 && !text.match(/[.!?]$/)) {
      text += ".";
    }
    return text;
  };

  // Hjelpefunksjon: Generer utvidet juridisk begrunnelse basert på problemtype
  const getExtendedLegalAnalysis = (problemTypes: string[], hasWrittenAgreement: boolean, priceAgreed: string): string[] => {
    const analyses: string[] = [];

    analyses.push("Håndverkertjenesteloven (hvtjl.) regulerer avtaler mellom forbrukere og næringsdrivende om tjenester på ting og fast eiendom. Loven er ufravikelig i forbrukerforhold, jf. hvtjl. § 3, og håndverkeren kan ikke avtale seg bort fra forbrukerens rettigheter.");

    if (problemTypes.includes("Dårlig utført arbeid") || problemTypes.includes("Feil og mangler")) {
      analyses.push("Etter hvtjl. § 17 foreligger det en mangel dersom resultatet ikke svarer til det forbrukeren har rett til å kreve etter §§ 5, 6 og 9. Tjenesten skal utføres fagmessig, og resultatet skal svare til det som er avtalt og det forbrukeren med rimelighet kan forvente.");
      analyses.push("Håndverkeren har en selvstendig plikt til å fraråde arbeid dersom det ikke vil tjene forbrukerens interesser, jf. hvtjl. § 7. Unnlatelse av frarådingsplikten kan i seg selv utgjøre en mangel ved tjenesten.");
    }

    if (problemTypes.includes("Forsinkelse")) {
      analyses.push("Etter hvtjl. § 10 foreligger forsinkelse dersom tjenesten ikke er avsluttet innen den tid som er avtalt, eller innen rimelig tid dersom ingen frist er satt. Forbrukeren kan holde tilbake betaling, kreve oppfyllelse, heve avtalen eller kreve erstatning ved forsinkelse, jf. hvtjl. §§ 11-15.");
    }

    if (problemTypes.includes("Uventet høy pris") || problemTypes.includes("Prisuenighet")) {
      if (priceAgreed === "nei") {
        analyses.push("Der det ikke er avtalt pris, skal forbrukeren betale det som er rimelig i forhold til tjenestens art og omfang, jf. hvtjl. § 32 første ledd. Ved vurderingen skal det tas utgangspunkt i gjengs pris for tilsvarende tjenester på avtaletiden.");
      }
      analyses.push("Håndverkeren har plikt til å varsle forbrukeren dersom prisen vil bli vesentlig høyere enn det forbrukeren måtte vente, jf. hvtjl. § 32 tredje ledd. Unnlatelse av varslingsplikten kan medføre at forbrukeren ikke behøver å betale mer enn det som med rimelighet kunne forventes.");
      if (hasWrittenAgreement) {
        analyses.push("Ved fast pris eller prisoverslag er håndverkeren bundet av dette, med mindre det er tatt uttrykkelig forbehold. Et prisoverslag skal ikke overskrides vesentlig, og i alle tilfeller ikke med mer enn 15 prosent, jf. hvtjl. § 32 annet ledd.");
      }
    }

    if (problemTypes.includes("Skade på eiendom")) {
      analyses.push("Etter hvtjl. § 28 er håndverkeren erstatningsansvarlig for tap som følge av mangel eller forsinkelse, med mindre tapet skyldes hindring utenfor håndverkerens kontroll. Erstatningen omfatter både direkte og indirekte tap, herunder skade på annen eiendom enn den tjenesten gjelder.");
    }

    return analyses;
  };

  // Hjelpefunksjon: Generer konkrete handlingspunkter
  const getActionPoints = (outcomeLevel: string): string[] => {
    const points: string[] = [];

    points.push("Send skriftlig reklamasjon til håndverkeren uten ugrunnet opphold. Reklamasjonen bør sendes rekommandert eller per e-post med lesebekreftelse for å sikre dokumentasjon på at den er mottatt.");
    points.push("Reklamasjonen skal inneholde: (1) en klar beskrivelse av mangelen eller forsinkelsen, (2) hvilke krav du fremmer (retting, prisavslag, heving eller erstatning), og (3) en rimelig frist for tilbakemelding (normalt 14 dager).");
    points.push("Dokumenter alle mangler med bilder, video og skriftlige beskrivelser. Ta gjerne bilder fra flere vinkler og sørg for god belysning. Dokumentasjon bør sikres så tidlig som mulig.");
    points.push("Innhent gjerne en uavhengig vurdering fra en annen fagperson dersom det er uenighet om fagmessig utførelse. En slik vurdering kan være avgjørende bevis i en eventuell tvist.");

    if (outcomeLevel === "GREEN") {
      points.push("Gi håndverkeren anledning til å rette mangelen før du eventuelt engasjerer andre til å utbedre. Håndverkeren har etter hvtjl. § 24 rett til å rette mangelen dersom det kan skje uten vesentlig ulempe for deg.");
    } else if (outcomeLevel === "YELLOW") {
      points.push("Vurder å kontakte Forbrukerrådet for veiledning dersom håndverkeren avviser reklamasjonen. Forbrukerrådet tilbyr gratis mekling og kan bidra til løsning uten rettslige skritt.");
    } else {
      points.push("Selv om saken fremstår som utfordrende, bør du likevel fremme en skriftlig reklamasjon. Håndverkerens respons kan gi grunnlag for å vurdere saken på nytt.");
    }

    return points;
  };

  // Hjelpefunksjon: Generer konsekvenstekst
  const getConsequenceText = (outcomeLevel: string): string => {
    if (outcomeLevel === "GREEN") {
      return "Dersom håndverkeren ikke besvarer reklamasjonen innen fristen, eller avviser kravet uten saklig grunn, kan saken bringes inn for Forbrukerrådet for mekling. Fører ikke mekling frem, kan saken bringes inn for Forbrukerklageutvalget eller de alminnelige domstoler. Håndverkeren risikerer i så fall å måtte dekke dine sakskostnader i tillegg til kravet.";
    } else if (outcomeLevel === "YELLOW") {
      return "Håndverkerens respons på reklamasjonen vil være avgjørende for hvordan saken bør håndteres videre. Dersom håndverkeren erkjenner forholdet helt eller delvis, kan partene ofte finne en minnelig løsning. Ved uenighet kan Forbrukerrådets meklingstjeneste være et godt alternativ før eventuell rettslig behandling.";
    } else {
      return "Selv om saken fremstår som krevende, er det viktig å fremme reklamasjonen skriftlig. Håndverkerens respons kan belyse forhold som endrer vurderingen. I enkelte tilfeller viser det seg at håndverkeren likevel erkjenner ansvar når kravet blir formalisert.";
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
      let totalPages = 5; // Estimat, oppdateres til slutt

      if (fontData) {
        doc.addFileToVFS("Roboto-Regular.ttf", fontData.regular);
        doc.addFileToVFS("Roboto-Bold.ttf", fontData.bold);
        doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
        doc.addFont("Roboto-Bold.ttf", "Roboto", "bold");
      }

      const useFont = fontData ? "Roboto" : "helvetica";
      const outcome = data.outcome as Record<string, unknown> | undefined;
      const fag = data.fag as string[] | undefined;
      const problemer = data.problemer as string[] | undefined;

      // Forbedret header med sidetall
      const addPageHeader = (pageNum: number) => {
        doc.setFillColor(30, 41, 59);
        doc.rect(0, 0, pageWidth, 22, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(11);
        doc.setFont(useFont, "bold");
        doc.text("JURIDISK VURDERING – HÅNDVERKERTJENESTE", margin, 14);
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
      const kundeNavn = (data.navn as string) || "Forbruker";
      const handverkerNavn = (data.handverkerNavn as string) || "Håndverker";
      const fagListe = fag?.join(", ") || "ikke spesifisert";
      const problemListe = problemer || [];
      const harSkriftligAvtale = data.prisSkriftlig === true;
      const prisAvtalt = (data.prisAvtalt as string) || "usikker";

      // ===== SIDE 1: FORSIDE OG SAMMENDRAG =====
      // Profesjonell forside
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
      doc.text("Håndverkertjeneste – Reklamasjonssak", margin + 18, 36);

      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      doc.text(`Utarbeidet: ${new Date().toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric" })}`, margin + 18, 45);
      doc.text(`Referanse: HV-${Date.now().toString().slice(-8)}`, margin + 18, 51);

      y = 80;

      // Sammendrag-boks med tydelig konklusjon
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
        ? `Basert på de fremlagte opplysningene fremstår ${kundeNavn}s krav mot ${handverkerNavn} som velbegrunnet. Saken gjelder ${fagListe} der det er påberopt ${problemListe.join(", ").toLowerCase()}. Det anbefales å fremme skriftlig reklamasjon med konkrete krav.`
        : outcomeLevel === "YELLOW"
        ? `Saken reiser flere spørsmål som krever nærmere vurdering. Det er påberopt ${problemListe.join(", ").toLowerCase()} ved ${fagListe}. Styrken av kravet vil avhenge av dokumentasjonen og håndverkerens tilsvar.`
        : `Saken fremstår som utfordrende å vinne frem med basert på de opplysningene som er gitt. Det anbefales likevel å fremme skriftlig reklamasjon for å avklare håndverkerens standpunkt.`;

      const summaryLines = doc.splitTextToSize(summaryText, safeWidth - 10);
      doc.text(summaryLines.slice(0, 4), margin + 5, y + 28);

      y += 55;

      // Saksopplysninger i kompakt format
      addSectionTitle("1. Saksopplysninger");

      const boxW = (contentWidth - 4) / 2;
      drawBox(margin, y, boxW, 22, [248, 250, 252]);
      drawBox(margin + boxW + 4, y, boxW, 22, [248, 250, 252]);

      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.setFont(useFont, "normal");
      doc.text("FORBRUKER", margin + 3, y + 5);
      doc.text("HÅNDVERKER/TJENESTEYTER", margin + boxW + 7, y + 5);

      doc.setFontSize(10);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text(kundeNavn, margin + 3, y + 14);
      doc.text(handverkerNavn, margin + boxW + 7, y + 14);

      y += 28;

      // Tjenestens art
      drawBox(margin, y, contentWidth, 18, [248, 250, 252]);
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.setFont(useFont, "normal");
      doc.text("TJENESTENS ART", margin + 3, y + 5);
      doc.setFontSize(10);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text(fagListe.charAt(0).toUpperCase() + fagListe.slice(1), margin + 3, y + 13);
      y += 24;

      // Påberopte forhold
      drawBox(margin, y, contentWidth, 18, [248, 250, 252]);
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.setFont(useFont, "normal");
      doc.text("PÅBEROPTE FORHOLD", margin + 3, y + 5);
      doc.setFontSize(10);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text(problemListe.join(", ") || "Ikke spesifisert", margin + 3, y + 13);
      y += 24;

      // Avtaleforhold
      const avtaleBoxW = (contentWidth - 6) / 3;
      drawBox(margin, y, avtaleBoxW, 18, [248, 250, 252]);
      drawBox(margin + avtaleBoxW + 3, y, avtaleBoxW, 18, [248, 250, 252]);
      drawBox(margin + (avtaleBoxW + 3) * 2, y, avtaleBoxW, 18, [248, 250, 252]);

      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.setFont(useFont, "normal");
      doc.text("PRIS AVTALT", margin + 3, y + 5);
      doc.text("SKRIFTLIG AVTALE", margin + avtaleBoxW + 6, y + 5);
      doc.text("PRISFORM", margin + (avtaleBoxW + 3) * 2 + 3, y + 5);

      doc.setFontSize(9);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text(prisAvtalt === "ja" ? "Ja" : prisAvtalt === "nei" ? "Nei" : "Uavklart", margin + 3, y + 13);
      doc.text(harSkriftligAvtale ? "Ja" : "Nei", margin + avtaleBoxW + 6, y + 13);
      doc.text(truncate((data.prisform as string) || "Ikke oppgitt", 15), margin + (avtaleBoxW + 3) * 2 + 3, y + 13);

      // Footer side 1
      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.text("harjegkravpå.no – Juridisk veiledning for forbrukere", margin, pageHeight - 8);
      doc.text("Konfidensielt", pageWidth - margin, pageHeight - 8, { align: "right" });

      // ===== SIDE 2: SAKSFREMSTILLING =====
      addPage();

      addSectionTitle("2. Saksfremstilling");

      addParagraph("Nedenfor følger en gjennomgang av saksforholdet slik det er beskrevet av forbrukeren. Fremstillingen er bearbeidet til en nøytral saksfremstilling egnet som grunnlag for reklamasjon.");
      y += 3;

      if (data.dinHistorie) {
        const reformulatedText = reformulateUserText(data.dinHistorie as string);

        doc.setFontSize(10);
        doc.setFont(useFont, "bold");
        doc.setTextColor(30, 41, 59);
        doc.text("Forbrukerens beskrivelse av forholdet:", margin, y);
        y += 6;

        // Saksfremstillingen i innrammet boks
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

      // Identifiserte mangler/forhold
      addSectionTitle("3. Faktiske forhold og konsekvenser");

      addParagraph("Basert på den fremlagte beskrivelsen kan følgende forhold identifiseres som grunnlag for reklamasjon:");
      y += 2;

      problemListe.forEach((problem, index) => {
        checkPageBreak(25);

        doc.setFontSize(10);
        doc.setFont(useFont, "bold");
        doc.setTextColor(30, 41, 59);
        doc.text(`${index + 1}. ${problem}`, margin, y);
        y += 5;

        // Beskriv konsekvens for hver problemtype
        let consequence = "";
        if (problem.toLowerCase().includes("dårlig") || problem.toLowerCase().includes("feil") || problem.toLowerCase().includes("mangel")) {
          consequence = "Dette forholdet utgjør en mangel etter håndverkertjenesteloven § 17, da tjenesten ikke svarer til det forbrukeren har rett til å kreve. Mangelen kan gi grunnlag for krav om retting, prisavslag eller i alvorlige tilfeller heving av avtalen.";
        } else if (problem.toLowerCase().includes("forsink")) {
          consequence = "Forsinkelse foreligger når tjenesten ikke er ferdigstilt til avtalt tid eller innen rimelig tid. Dette gir forbrukeren rett til å holde tilbake betaling, kreve oppfyllelse, og eventuelt heve avtalen ved vesentlig forsinkelse.";
        } else if (problem.toLowerCase().includes("pris")) {
          consequence = "Uenighet om pris kan gi grunnlag for krav dersom håndverkeren har unnlatt varslingsplikten etter § 32, eller dersom prisen overstiger det som er rimelig for tilsvarende tjenester.";
        } else if (problem.toLowerCase().includes("skade")) {
          consequence = "Skade på forbrukerens eiendom gir grunnlag for erstatningskrav etter § 28. Håndverkeren er ansvarlig for tap som følge av mangel, med mindre det skyldes forhold utenfor hans kontroll.";
        } else {
          consequence = "Forholdet kan utgjøre en mangel eller forsinkelse etter håndverkertjenesteloven, og bør vurderes nærmere i lys av den konkrete dokumentasjonen.";
        }

        addParagraph(consequence);
        y += 2;
      });

      // ===== SIDE 3: JURIDISK VURDERING =====
      addPage();

      addSectionTitle("4. Juridisk grunnlag");

      addParagraph("Avtaleforholdet reguleres av lov om håndverkertjenester m.m. for forbrukere av 16. juni 1989 nr. 63 (håndverkertjenesteloven). Nedenfor følger en gjennomgang av de relevante bestemmelsene og hvordan disse kommer til anvendelse i saken.");
      y += 4;

      // Utvidet juridisk analyse
      const legalAnalyses = getExtendedLegalAnalysis(problemListe, harSkriftligAvtale, prisAvtalt);

      legalAnalyses.forEach((analysis, index) => {
        checkPageBreak(20);

        // Nummerert avsnitt med innrykk
        doc.setFontSize(9);
        doc.setFont(useFont, "normal");
        doc.setTextColor(51, 65, 85);

        const analysisLines = doc.splitTextToSize(analysis, safeWidth - 5);
        analysisLines.forEach((line: string) => {
          checkPageBreak(5);
          doc.text(line, margin, y);
          y += 4.5;
        });
        y += 4;
      });

      // Forbrukerens rettigheter
      checkPageBreak(40);
      addSectionTitle("5. Forbrukerens rettigheter");

      addParagraph("Ved mangel eller forsinkelse har forbrukeren følgende beføyelser etter håndverkertjenesteloven:");
      y += 2;

      const rights = [
        { title: "Tilbakeholdsrett (§ 13/23)", desc: "Forbrukeren kan holde tilbake så mye av betalingen som er nødvendig for å sikre at kravet blir dekket." },
        { title: "Rett til retting (§ 24)", desc: "Forbrukeren kan kreve at håndverkeren retter mangelen uten kostnad, med mindre det vil være urimelig." },
        { title: "Prisavslag (§ 25)", desc: "Dersom mangelen ikke rettes, kan forbrukeren kreve prisavslag tilsvarende kostnadene ved å få mangelen rettet." },
        { title: "Heving (§ 26)", desc: "Ved vesentlig mangel kan forbrukeren heve avtalen. Hva som er vesentlig beror på en helhetsvurdering." },
        { title: "Erstatning (§ 28)", desc: "Forbrukeren kan kreve erstatning for tap som følge av mangelen, herunder utgifter til utbedring og følgeskader." }
      ];

      rights.forEach((right) => {
        checkPageBreak(15);
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

      // Tilbakeholdt betaling
      if (data.holdtTilbakeBetaling === true) {
        y += 4;
        addParagraph("Forbrukeren har rett til å holde tilbake betaling inntil manglene er rettet, jf. håndverkertjenesteloven § 23.");
      }

      // Tredjepartsdokumentasjon
      if (data.harTredjepartDokumentasjon === true) {
        y += 4;
        addParagraph("Foreliggende dokumentasjon fra uavhengig fagperson styrker saken betydelig.");
      } else if (data.harTredjepartDokumentasjon === false) {
        y += 4;
        addParagraph("Dersom håndverkeren bestrider manglene, anbefales det å innhente en uavhengig faglig vurdering før saken bringes videre.");
      }

      // ===== SIDE 4: ANBEFALT HANDLING =====
      addPage();

      addSectionTitle("6. Anbefalt fremgangsmåte");

      addParagraph("For å ivareta dine rettigheter anbefales følgende fremgangsmåte. Punktene bør følges i den angitte rekkefølgen:");
      y += 4;

      const actionPoints = getActionPoints(outcomeLevel);

      actionPoints.forEach((point, index) => {
        checkPageBreak(20);

        // Nummerert punkt med grønn indikator
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

      // Konsekvenser dersom håndverker ikke følger opp
      y += 4;
      addSectionTitle("7. Konsekvenser ved manglende oppfølging");

      const consequenceText = getConsequenceText(outcomeLevel);
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
      const deadlineText = "Reklamasjon må fremsettes innen rimelig tid etter at mangelen ble eller burde blitt oppdaget. Den absolutte reklamasjonsfristen er fem år fra tjenesten ble avsluttet, jf. hvtjl. § 22. Det anbefales å reklamere skriftlig så snart som mulig.";
      const deadlineLines = doc.splitTextToSize(deadlineText, safeWidth - 10);
      doc.text(deadlineLines, margin + 5, y + 15);

      y += 38;

      // ===== SIDE 5: AVSLUTNING OG VIDERE PROSESS =====
      addPage();

      addSectionTitle("8. Dokumentasjon og bevisføring");

      addParagraph("For å styrke saken anbefales det å samle og sikre følgende dokumentasjon:");
      y += 2;

      const docPoints = [
        "Avtalen mellom partene (skriftlig avtale, e-post, SMS eller annen korrespondanse)",
        "Kvitteringer og fakturaer for utført arbeid og materialer",
        "Bilder og video som dokumenterer manglene (ta bilder fra flere vinkler med god belysning)",
        "Skriftlig korrespondanse med håndverkeren (e-post, meldinger, brev)",
        "Eventuelle uttalelser eller rapporter fra andre fagfolk",
        "Oversikt over egne utlegg og tap som følge av mangelen"
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

      y += 6;
      addSectionTitle("9. Tvisteløsning");

      addParagraph("Dersom reklamasjonen ikke fører frem, finnes følgende muligheter for tvisteløsning:");
      y += 2;

      const disputeOptions = [
        { title: "Forbrukerrådet", desc: "Tilbyr gratis mekling mellom forbruker og næringsdrivende. Meklingen er frivillig, men mange saker løses på dette stadiet." },
        { title: "Forbrukerklageutvalget", desc: "Behandler klager på håndverkertjenester dersom mekling ikke fører frem. Utvalgets avgjørelser er bindende dersom de ikke bringes inn for domstolene innen fire uker." },
        { title: "Domstolene", desc: "Saken kan bringes inn for forliksrådet eller tingretten. Ved forbrukertvister er det særlige regler om sakskostnader som beskytter forbrukeren." }
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
      addSectionTitle("10. Avsluttende merknad");

      addParagraph("Denne vurderingen er utarbeidet på grunnlag av opplysningene som er gitt, og gir en foreløpig vurdering av saken. Den konkrete rettsstillingen vil avhenge av den fullstendige dokumentasjonen og eventuelle innsigelser fra motparten.");

      addParagraph("Rapporten er ment som veiledning og utgjør ikke juridisk rådgivning i lovens forstand. Ved kompliserte saker eller store verdier anbefales det å konsultere advokat for en bindende vurdering.");

      // CTA-boks for kravbrev - nøktern og profesjonell
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
      const ctaText = "For å fremme kravet formelt kan du bestille et ferdig utformet kravbrev basert på denne vurderingen. Brevet er tilpasset din sak, juridisk korrekt formulert, og klart til å sendes til håndverkeren.";
      const ctaLines = doc.splitTextToSize(ctaText, safeWidth - 10);
      doc.text(ctaLines, margin + 5, y + 15);

      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text("Kravbrev kan bestilles på harjegkravpå.no", margin + 5, y + 26);

      // Oppdater sidetall i footer på alle sider
      totalPages = currentPage;

      // Footer siste side
      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.text("harjegkravpå.no – Juridisk veiledning for forbrukere", margin, pageHeight - 8);
      doc.text("Konfidensielt", pageWidth - margin, pageHeight - 8, { align: "right" });

      doc.save(`handverker-rapport-${new Date().toISOString().split("T")[0]}.pdf`);
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
      <div className="mx-auto max-w-2xl px-4 py-12 space-y-6 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center">
          <FileText className="h-8 w-8 text-amber-400" />
        </div>
        <h1 className="text-2xl font-bold">Ingen data funnet</h1>
        <p className="text-slate-400">
          Det ser ut til at saksdataene ikke ble lagret. Dette kan skje hvis du åpnet denne siden direkte.
        </p>
        <button
          onClick={() => router.push("/handverkere")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal-500 text-[#0c1220] font-semibold hover:bg-teal-400 transition"
        >
          Start på nytt
          <ArrowRight className="h-4 w-4" />
        </button>
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
          <p className="font-semibold">Håndverker-rapport PDF</p>
          <p className="text-slate-400">39 kr</p>
        </div>

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
                  Få et ferdig formulert juridisk brev du kan sende direkte til håndverkeren.
                  Spar tid og få et profesjonelt resultat.
                </p>
                <ul className="text-sm text-slate-300 space-y-1 mb-4">
                  <li>Tilpasset din sak</li>
                  <li>Juridisk korrekt språk</li>
                  <li>Konkrete krav og frister</li>
                </ul>
                <button
                  onClick={() => router.push("/handverkere/kravbrev")}
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

export default function HandverkBetaltPage() {
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
