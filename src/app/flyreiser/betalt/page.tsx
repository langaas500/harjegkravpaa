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
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("flyreiser-data");
    if (stored) {
      const parsedData = JSON.parse(stored);
      setData(parsedData);
      if (parsedData.access_token) {
        setAccessToken(parsedData.access_token as string);
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

  const getProblemTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      DELAY: "Forsinkelse",
      CANCELLED: "Kansellering",
      DENIED_BOARDING: "Nektet ombordstigning",
      BAGGAGE: "Bagasjeproblem",
    };
    return labels[type] || type;
  };

  const getBaggageTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      delayed: "Forsinket bagasje",
      lost: "Tapt bagasje",
      damaged: "Skadet bagasje",
    };
    return labels[type] || type;
  };

  const getBaggageDelayLabel = (duration: string) => {
    const labels: Record<string, string> = {
      under24h: "Under 24 timer",
      "1to2days": "1-2 døgn",
      "2to4days": "2-4 døgn",
      over4days: "Over 4 døgn",
    };
    return labels[duration] || duration;
  };

  const getExpenseTypeLabels = (types: string[]) => {
    const labels: Record<string, string> = {
      clothes: "Klær",
      toiletries: "Toalettsaker",
      work_equipment: "Arbeidsutstyr",
      transport: "Transport",
      medicine: "Medisiner",
      other: "Annet",
    };
    return types.map((t) => labels[t] || t).join(", ");
  };

  const getDelayLabel = (duration: string) => {
    const labels: Record<string, string> = {
      under2: "Under 2 timer",
      "2to3": "2-3 timer",
      "3to4": "3-4 timer",
      over4: "Over 4 timer",
      never: "Ankom aldri",
    };
    return labels[duration] || duration;
  };

  const getCancellationNoticeLabel = (notice: string) => {
    const labels: Record<string, string> = {
      under7: "Under 7 dager før",
      "7to14": "7-14 dager før",
      over14: "Over 14 dager før",
    };
    return labels[notice] || notice;
  };

  // Hjelpefunksjon: Reformuler brukerens fritekst til nøytral saksfremstilling
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

  // Hjelpefunksjon: Generer juridisk analyse basert på problemtype
  const getFlightLegalAnalysis = (problemType: string, isBaggage: boolean): string[] => {
    const analyses: string[] = [];

    if (isBaggage) {
      analyses.push("Montrealkonvensjonen regulerer flypassasjerers rettigheter ved bagasjeproblemer. Konvensjonen gjelder for all internasjonal lufttransport mellom stater som har ratifisert den, samt innenriksflygninger i EU/EØS.");
      analyses.push("Etter Montrealkonvensjonen art. 17 er flyselskapet objektivt ansvarlig for skade som følge av ødeleggelse, tap eller forsinkelse av innsjekket bagasje. Ansvaret gjelder så lenge bagasjen var i flyselskapets varetekt.");
      analyses.push("Erstatningen er begrenset til ca. 1 288 SDR (Special Drawing Rights) per passasjer, tilsvarende omtrent kr 16 000. Ved forsinket bagasje dekkes rimelige og nødvendige utgifter til erstatningsartikler.");
    } else {
      analyses.push("EU-forordning 261/2004 etablerer felles regler for kompensasjon og assistanse til flypassasjerer ved nektet ombordstigning, innstillinger og lengre forsinkelser. Forordningen gjelder i hele EU/EØS-området.");

      if (problemType === "DELAY") {
        analyses.push("Ved forsinkelse har passasjeren rett til kompensasjon dersom flyet ankommer endelig bestemmelsessted mer enn 3 timer forsinket, jf. EU-domstolens avgjørelse i Sturgeon (C-402/07). Tidspunktet for ankomst er når minst én av flydørene åpnes.");
        analyses.push("Kompensasjonsbeløpet etter art. 7 er EUR 250 for flygninger inntil 1 500 km, EUR 400 for flygninger mellom 1 500 og 3 500 km, og EUR 600 for flygninger over 3 500 km.");
      } else if (problemType === "CANCELLED") {
        analyses.push("Ved innstilling har passasjeren rett til kompensasjon etter art. 5 og 7, med mindre flyselskapet kan bevise at innstillingen skyldtes ekstraordinære omstendigheter som ikke kunne vært unngått selv om alle rimelige tiltak var truffet.");
        analyses.push("Kompensasjon kan unngås dersom passasjeren ble informert om innstillingen minst 14 dager før planlagt avgang, eller ble tilbudt omruting som oppfylte vilkårene i art. 5 nr. 1 bokstav c.");
      } else if (problemType === "DENIED_BOARDING") {
        analyses.push("Ved nektet ombordstigning mot passasjerens vilje har passasjeren alltid rett til kompensasjon etter art. 4 og 7. Dette gjelder selv om flyselskapet hadde operative grunner til å nekte ombordstigning.");
        analyses.push("Flyselskapet skal først søke frivillige mot godtgjørelse. Nektes passasjeren ombordstigning ufrivillig, utløses full kompensasjonsrett umiddelbart.");
      }

      analyses.push("Flyselskapet kan påberope seg fritak etter art. 5 nr. 3 dersom forsinkelsen eller innstillingen skyldtes ekstraordinære omstendigheter. Bevisbyrden ligger fullt ut hos flyselskapet. Tekniske problemer, bemanningsproblemer og operative forsinkelser regnes normalt som del av flyselskapets normale drift.");
    }

    return analyses;
  };

  // Hjelpefunksjon: Generer passasjerrettigheter
  const getPassengerRights = (problemType: string, isBaggage: boolean): Array<{ title: string; desc: string }> => {
    if (isBaggage) {
      return [
        { title: "Erstatning for utgifter", desc: "Rett til erstatning for rimelige og nødvendige utgifter som følge av bagasjeforsinkelsen, som klær, toalettsaker og andre nødvendigheter." },
        { title: "PIR-skjema", desc: "Ved bagasjeproblemer bør PIR-skjema (Property Irregularity Report) fylles ut på flyplassen. Dette dokumenterer hendelsen og styrker kravet." },
        { title: "Reklamasjonsfrist", desc: "Ved forsinket bagasje må reklamasjon fremmes innen 21 dager fra bagasjen ble levert. Ved skadet bagasje er fristen 7 dager." },
        { title: "Maksimal erstatning", desc: "Erstatningen er begrenset til ca. 1 288 SDR (omtrent kr 16 000) per passasjer, med mindre høyere verdi er deklarert og ekstra avgift er betalt." },
      ];
    }

    return [
      { title: "Kompensasjon (art. 7)", desc: "Standardkompensasjon på EUR 250, 400 eller 600 avhengig av flyreisens lengde. Beløpet er uavhengig av billettprisen." },
      { title: "Omsorg (art. 9)", desc: "Ved ventetid har passasjeren rett til mat, drikke, hotellovernatting ved behov, og transport mellom flyplass og hotell. Flyselskapet skal tilby dette uten oppfordring." },
      { title: "Refusjon eller omruting (art. 8)", desc: "Ved innstilling eller lang forsinkelse kan passasjeren velge mellom full refusjon av billetten, omruting snarest mulig, eller omruting på et senere tidspunkt." },
      { title: "Erstatning for følgetap", desc: "I tillegg til standardkompensasjon kan passasjeren kreve erstatning for dokumenterte utgifter og tap som følge av forsinkelsen eller innstillingen." },
    ];
  };

  // Hjelpefunksjon: Generer handlingspunkter
  const getFlightActionPoints = (outcomeLevel: string, isBaggage: boolean): string[] => {
    const points: string[] = [];

    if (isBaggage) {
      points.push("Sørg for at PIR-skjema (Property Irregularity Report) er utfylt på flyplassen. Ta kopi av skjemaet.");
      points.push("Samle kvitteringer for alle nødvendige utgifter. Behold originalkvitteringer og ta bilder av dem.");
      points.push("Send skriftlig krav til flyselskapet innen 21 dager fra bagasjen ble levert (7 dager ved skade).");
    } else {
      points.push("Send skriftlig krav om kompensasjon til flyselskapet. Oppgi flightnummer, dato, bookingreferanse og beløpet du krever.");
      points.push("Dokumenter forsinkelsen med skjermbilder av flightstatus, SMS/e-post fra flyselskapet, eller boardingkort.");
      points.push("Samle kvitteringer for eventuelle utgifter til mat, drikke, transport eller overnatting i ventetiden.");
    }

    points.push("Gi flyselskapet en rimelig svarfrist på 14 dager. Flyselskapet plikter å behandle kravet uten ugrunnet opphold.");

    if (outcomeLevel === "GREEN") {
      points.push("Ved avslag eller manglende svar kan saken klages inn til Transportklagenemnda. Nemnda behandler saker kostnadsfritt for forbrukeren.");
    } else if (outcomeLevel === "YELLOW") {
      points.push("Ved avslag bør du vurdere å klage til Transportklagenemnda. Nemnda kan vurdere om flyselskapets begrunnelse holder juridisk.");
    } else {
      points.push("Selv om saken er krevende, bør du likevel fremme kravet skriftlig. Flyselskapets respons kan gi grunnlag for å vurdere saken på nytt.");
    }

    return points;
  };

  // Hjelpefunksjon: Generer konsekvenstekst
  const getFlightConsequenceText = (outcomeLevel: string): string => {
    if (outcomeLevel === "GREEN") {
      return "Dersom flyselskapet ikke besvarer kravet innen fristen, eller avviser kravet uten saklig grunn, kan saken bringes inn for Transportklagenemnda for flypassasjerer. Nemndas avgjørelser følges av de fleste flyselskaper. Ved fortsatt manglende betaling kan kravet forfølges rettslig, og flyselskapet vil da risikere å måtte dekke sakskostnader i tillegg til hovedkravet.";
    } else if (outcomeLevel === "YELLOW") {
      return "Flyselskapets respons på kravet vil være avgjørende for hvordan saken bør håndteres videre. Dersom flyselskapet erkjenner forholdet, kan partene ofte finne en løsning. Ved avslag med henvisning til ekstraordinære omstendigheter bør du vurdere om begrunnelsen holder juridisk. Transportklagenemnda kan gi en uavhengig vurdering.";
    } else {
      return "Selv om saken fremstår som krevende, er det viktig å fremme kravet skriftlig. Flyselskapets respons kan belyse forhold som endrer vurderingen. I enkelte tilfeller viser det seg at flyselskapet likevel utbetaler kompensasjon når kravet formaliseres.";
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
      const problemType = data.problemType as string;
      const isBaggage = problemType === "BAGGAGE";
      const applicableLaw = isBaggage ? "Montrealkonvensjonen" : "EU-forordning 261/2004";
      const flight = data.flight as Record<string, string> | undefined;
      const outcome = data.outcome as Record<string, unknown> | undefined;
      const outcomeLevel = (outcome?.level as string) || "YELLOW";

      // Hjelpefunksjoner for PDF
      const addPageHeader = (pageNum: number) => {
        doc.setFillColor(30, 41, 59);
        doc.rect(0, 0, pageWidth, 22, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(11);
        doc.setFont(useFont, "bold");
        doc.text("JURIDISK VURDERING – FLYREISE", margin, 14);
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
      doc.text(`Flyreise – ${getProblemTypeLabel(problemType)}`, margin + 18, 36);

      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      doc.text(`Utarbeidet: ${new Date().toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric" })}`, margin + 18, 45);
      doc.text(`Referanse: FLY-${Date.now().toString().slice(-8)}`, margin + 18, 51);

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

      // Kompensasjonsbeløp
      const compensationAmount = outcome?.compensationAmount as string;
      if (compensationAmount) {
        doc.setFontSize(11);
        doc.setFont(useFont, "bold");
        doc.setTextColor(22, 163, 74);
        doc.text(`Mulig kompensasjon: ${compensationAmount}`, margin + 5, y + 28);
      }

      doc.setFontSize(9);
      doc.setFont(useFont, "normal");
      doc.setTextColor(51, 65, 85);
      const summaryText = outcome?.summary as string || `Saken gjelder ${getProblemTypeLabel(problemType).toLowerCase()} på flyreise med ${flight?.airline || "flyselskapet"}.`;
      const summaryLines = doc.splitTextToSize(summaryText, safeWidth - 10);
      doc.text(summaryLines.slice(0, 2), margin + 5, y + (compensationAmount ? 36 : 28));

      y += 55;

      // SEKSJON 1: Anbefalt fremgangsmåte (konkrete neste steg)
      checkPageBreak(80);
      addSectionTitle("Anbefalt fremgangsmåte");

      addParagraph("Basert på opplysningene i saken anbefales følgende fremgangsmåte for å få utbetalt erstatning:");
      y += 2;

      const recommendedSteps = [
        "Send skriftlig krav til flyselskapet. Kravet bør sendes direkte til flyselskapets kundeservice eller klageavdeling.",
        "Legg ved dokumentasjon: PIR-skjema (Property Irregularity Report), kvitteringer for nødvendige utgifter, eventuell dokumentasjon på jobb- eller møteforpliktelser.",
        "Spesifiser beløp og grunnlag. Oppgi hvilke utgifter som kreves refundert, og hvorfor de var nødvendige.",
        "Sett en svarfrist. Anbefalt svarfrist er 14 dager.",
        "Ved avslag eller manglende svar kan saken tas videre med formelt kravbrev eller klage til relevant instans.",
      ];

      recommendedSteps.forEach((step, index) => {
        checkPageBreak(12);
        doc.setFillColor(16, 185, 129);
        doc.circle(margin + 3, y + 1, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.setFont(useFont, "bold");
        doc.text(`${index + 1}`, margin + 1.5, y + 2.5);

        doc.setFontSize(9);
        doc.setFont(useFont, "normal");
        doc.setTextColor(51, 65, 85);
        const stepLines = doc.splitTextToSize(step, safeWidth - 12);
        let stepY = y;
        stepLines.forEach((line: string) => {
          doc.text(line, margin + 10, stepY + 2);
          stepY += 4.5;
        });
        y = stepY + 3;
      });

      y += 4;
      checkPageBreak(15);
      drawBox(margin, y, contentWidth, 12, [254, 243, 199]);
      doc.setFontSize(8);
      doc.setFont(useFont, "normal");
      doc.setTextColor(133, 77, 14);
      doc.text("Erfaring viser at tydelige, skriftlige krav med dokumentasjon gir betydelig høyere sannsynlighet for utbetaling.", margin + 5, y + 7);
      y += 18;

      // SEKSJON 2: Rettslig grunnlag (kort og relevant)
      checkPageBreak(60);
      addSectionTitle("Rettslig grunnlag");

      addParagraph("Denne vurderingen bygger blant annet på følgende regelverk:");
      y += 2;

      doc.setFontSize(9);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text("Montreal-konvensjonen artikkel 19", margin, y);
      y += 4;
      doc.setFont(useFont, "normal");
      doc.setTextColor(51, 65, 85);
      const montrealText = "Flyselskapet er ansvarlig for skade som følge av forsinket bagasje, med mindre de kan bevise at alle rimelige tiltak er truffet.";
      const montrealLines = doc.splitTextToSize(montrealText, safeWidth);
      montrealLines.forEach((line: string) => {
        doc.text(line, margin, y);
        y += 4.5;
      });
      y += 3;

      doc.setFontSize(9);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text("EU-regelverk og praksis", margin, y);
      y += 4;
      doc.setFont(useFont, "normal");
      doc.setTextColor(51, 65, 85);
      const euText = "Nødvendige og rimelige utgifter som klær, medisiner og arbeidsrelatert utstyr er ofte erstatningsberettiget ved dokumentert bagasjeforsinkelse.";
      const euLines = doc.splitTextToSize(euText, safeWidth);
      euLines.forEach((line: string) => {
        doc.text(line, margin, y);
        y += 4.5;
      });
      y += 4;

      // Styrkende faktorer basert på brukerdata
      addParagraph("I denne saken styrkes kravet av:");
      const strengthFactors: string[] = [];
      if (data.hasPIR) strengthFactors.push("Utfylt PIR-skjema");
      if (data.hasReceipts === "yes" || data.totalExpenseAmount) strengthFactors.push("Dokumenterte utgifter");
      if (data.hadWorkMeetings) strengthFactors.push("Sammenheng mellom forsinkelsen og behovet for kjøpene");
      if (strengthFactors.length === 0) {
        strengthFactors.push("Dokumentasjon av hendelsen");
      }

      strengthFactors.forEach((factor) => {
        checkPageBreak(6);
        doc.setFillColor(30, 41, 59);
        doc.circle(margin + 2, y, 1, "F");
        doc.setFontSize(9);
        doc.setFont(useFont, "normal");
        doc.setTextColor(51, 65, 85);
        doc.text(factor, margin + 6, y + 1);
        y += 5;
      });

      y += 6;

      // Saksopplysninger
      addSectionTitle("1. Saksopplysninger");

      const boxW = (contentWidth - 4) / 2;
      drawBox(margin, y, boxW, 22, [248, 250, 252]);
      drawBox(margin + boxW + 4, y, boxW, 22, [248, 250, 252]);

      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.setFont(useFont, "normal");
      doc.text("PASSASJER", margin + 3, y + 5);
      doc.text("FLYSELSKAP", margin + boxW + 7, y + 5);

      doc.setFontSize(10);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text(data.passengerName as string || "Ikke oppgitt", margin + 3, y + 14);
      doc.text(flight?.airline || "Ikke oppgitt", margin + boxW + 7, y + 14);

      y += 28;

      // Flydetaljer
      drawBox(margin, y, contentWidth, 18, [248, 250, 252]);
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.setFont(useFont, "normal");
      doc.text("FLYVNING", margin + 3, y + 5);
      doc.setFontSize(10);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      const flightInfo = `${flight?.flightNumber || "?"} | ${flight?.departureAirport || "?"} → ${flight?.arrivalAirport || "?"} | ${formatDate(flight?.flightDate || "")}`;
      doc.text(flightInfo, margin + 3, y + 13);
      y += 24;

      // Ekstra detaljer basert på problemtype
      if (!isBaggage) {
        const thirdW = (contentWidth - 6) / 3;
        drawBox(margin, y, thirdW, 18, [248, 250, 252]);
        drawBox(margin + thirdW + 3, y, thirdW, 18, [248, 250, 252]);
        drawBox(margin + (thirdW + 3) * 2, y, thirdW, 18, [248, 250, 252]);

        doc.setFontSize(7);
        doc.setTextColor(100, 116, 139);
        doc.setFont(useFont, "normal");
        doc.text("PROBLEMTYPE", margin + 3, y + 5);
        doc.text("REGELVERK", margin + thirdW + 6, y + 5);
        doc.text(problemType === "DELAY" ? "FORSINKELSE" : "VARSEL", margin + (thirdW + 3) * 2 + 3, y + 5);

        doc.setFontSize(9);
        doc.setFont(useFont, "bold");
        doc.setTextColor(30, 41, 59);
        doc.text(getProblemTypeLabel(problemType), margin + 3, y + 13);
        doc.text("EU 261/2004", margin + thirdW + 6, y + 13);

        if (problemType === "DELAY" && data.delayDuration) {
          doc.text(getDelayLabel(data.delayDuration as string), margin + (thirdW + 3) * 2 + 3, y + 13);
        } else if (problemType === "CANCELLED" && data.cancellationNotice) {
          doc.text(getCancellationNoticeLabel(data.cancellationNotice as string), margin + (thirdW + 3) * 2 + 3, y + 13);
        } else {
          doc.text("-", margin + (thirdW + 3) * 2 + 3, y + 13);
        }
        y += 22;

        // PNR og tidspunkter hvis tilgjengelig
        if (flight?.bookingReference || flight?.scheduledDeparture || flight?.scheduledArrival) {
          drawBox(margin, y, contentWidth, 18, [248, 250, 252]);
          doc.setFontSize(7);
          doc.setTextColor(100, 116, 139);
          doc.setFont(useFont, "normal");
          doc.text("TILLEGGSINFO", margin + 3, y + 5);
          doc.setFontSize(9);
          doc.setFont(useFont, "normal");
          doc.setTextColor(30, 41, 59);
          const extraInfo = [
            flight?.bookingReference ? `PNR: ${flight.bookingReference}` : "",
            flight?.scheduledDeparture ? `Avgang: ${flight.scheduledDeparture}` : "",
            flight?.scheduledArrival ? `Ankomst: ${flight.scheduledArrival}` : "",
            data.actualArrival ? `Faktisk: ${data.actualArrival}` : "",
          ].filter(Boolean).join(" | ");
          doc.text(extraInfo || "-", margin + 3, y + 13);
          y += 22;
        }
      } else {
        // Bagasjedetaljer
        drawBox(margin, y, contentWidth, 18, [248, 250, 252]);
        doc.setFontSize(7);
        doc.setTextColor(100, 116, 139);
        doc.setFont(useFont, "normal");
        doc.text("BAGASJEPROBLEM", margin + 3, y + 5);
        doc.setFontSize(10);
        doc.setFont(useFont, "bold");
        doc.setTextColor(30, 41, 59);
        const baggageInfo = [
          data.baggageType ? getBaggageTypeLabel(data.baggageType as string) : "",
          data.baggageDelayDuration ? getBaggageDelayLabel(data.baggageDelayDuration as string) : "",
          data.hasPIR ? "PIR utfylt" : "",
        ].filter(Boolean).join(" | ");
        doc.text(baggageInfo || "Bagasjeproblem", margin + 3, y + 13);
        y += 22;

        if (data.totalExpenseAmount || (data.expenseTypes && (data.expenseTypes as string[]).length > 0)) {
          drawBox(margin, y, contentWidth, 18, [248, 250, 252]);
          doc.setFontSize(7);
          doc.setTextColor(100, 116, 139);
          doc.setFont(useFont, "normal");
          doc.text("DOKUMENTERTE UTGIFTER", margin + 3, y + 5);
          doc.setFontSize(9);
          doc.setFont(useFont, "normal");
          doc.setTextColor(30, 41, 59);
          const expenseInfo = [
            data.totalExpenseAmount ? `kr ${data.totalExpenseAmount}` : "",
            data.expenseTypes ? getExpenseTypeLabels(data.expenseTypes as string[]) : "",
          ].filter(Boolean).join(" – ");
          doc.text(expenseInfo || "-", margin + 3, y + 13);
          y += 22;
        }
      }

      // Footer side 1
      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.text("harjegkravpå.no – Juridisk veiledning for forbrukere", margin, pageHeight - 8);
      doc.text("Konfidensielt", pageWidth - margin, pageHeight - 8, { align: "right" });

      // ===== SIDE 2: SAKSFREMSTILLING =====
      addPage();

      addSectionTitle("2. Saksfremstilling");

      addParagraph("Nedenfor følger en gjennomgang av saksforholdet slik det er beskrevet. Fremstillingen er bearbeidet til en nøytral saksfremstilling egnet som grunnlag for reklamasjon.");
      y += 3;

      // Brukerens beskrivelse
      const userDescription = data.userDescription as string;
      if (userDescription) {
        const reformulatedText = reformulateUserText(userDescription);

        doc.setFontSize(10);
        doc.setFont(useFont, "bold");
        doc.setTextColor(30, 41, 59);
        doc.text("Passasjerens beskrivelse av hendelsen:", margin, y);
        y += 6;

        const historyLines = doc.splitTextToSize(reformulatedText, safeWidth - 8);
        const boxHeight = Math.max(30, 10 + historyLines.length * 4.5);

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

      // Tidslinje
      addSectionTitle("3. Hendelsesforløp");

      const timelineItems: string[] = [];
      timelineItems.push(`Flyvning ${flight?.flightNumber || "[flightnummer]"} fra ${flight?.departureAirport || "[avgang]"} til ${flight?.arrivalAirport || "[destinasjon]"} den ${formatDate(flight?.flightDate || "")}.`);

      if (problemType === "DELAY") {
        if (flight?.scheduledArrival) timelineItems.push(`Planlagt ankomst: ${flight.scheduledArrival}.`);
        if (data.actualArrival) timelineItems.push(`Faktisk ankomst (dør åpnet): ${data.actualArrival}.`);
        if (data.delayDuration) timelineItems.push(`Forsinkelse ved ankomst: ${getDelayLabel(data.delayDuration as string)}.`);
      } else if (problemType === "CANCELLED") {
        if (data.cancellationNotice) timelineItems.push(`Varsel om kansellering: ${getCancellationNoticeLabel(data.cancellationNotice as string)} avgang.`);
        if (data.cancellationNoticeDate) timelineItems.push(`Varsel mottatt: ${formatDate(data.cancellationNoticeDate as string)}.`);
        if (data.offeredAlternative !== null) {
          timelineItems.push(data.offeredAlternative ? "Passasjeren ble tilbudt alternativ transport." : "Ingen alternativ transport ble tilbudt.");
        }
      } else if (problemType === "DENIED_BOARDING") {
        timelineItems.push("Passasjeren ble nektet ombordstigning mot sin vilje.");
      } else if (isBaggage) {
        timelineItems.push(`Bagasjen var ${getBaggageTypeLabel(data.baggageType as string || "forsinket").toLowerCase()}.`);
        if (data.baggageDelayDuration) timelineItems.push(`Forsinkelsen varte ${getBaggageDelayLabel(data.baggageDelayDuration as string).toLowerCase()}.`);
        if (data.hasPIR) timelineItems.push("PIR-skjema ble utfylt på flyplassen.");
      }

      timelineItems.forEach((item) => {
        checkPageBreak(8);
        doc.setFillColor(30, 41, 59);
        doc.circle(margin + 2, y, 1, "F");
        doc.setFontSize(9);
        doc.setFont(useFont, "normal");
        doc.setTextColor(51, 65, 85);
        const itemLines = doc.splitTextToSize(item, safeWidth - 8);
        doc.text(itemLines, margin + 6, y + 1);
        y += itemLines.length * 4.5 + 2;
      });

      y += 6;

      // SEKSJON 3: Mulige innvendinger fra flyselskapet
      checkPageBreak(80);
      addSectionTitle("Mulige innvendinger fra flyselskapet");

      addParagraph("Flyselskapet kan forsøke å avvise kravet med følgende argumenter:");
      y += 2;

      doc.setFontSize(9);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text("«Ekstraordinære omstendigheter»", margin, y);
      y += 4;
      doc.setFont(useFont, "normal");
      doc.setTextColor(51, 65, 85);
      const extraOrdText = "Flyselskapet kan hevde at forsinkelsen skyldtes ekstraordinære omstendigheter utenfor deres kontroll. Merk: Tekniske feil regnes normalt ikke som ekstraordinært.";
      const extraOrdLines = doc.splitTextToSize(extraOrdText, safeWidth);
      extraOrdLines.forEach((line: string) => {
        doc.text(line, margin, y);
        y += 4.5;
      });
      y += 3;

      doc.setFontSize(9);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text("«Forsinkelsen var under 3 timer»", margin, y);
      y += 4;
      doc.setFont(useFont, "normal");
      doc.setTextColor(51, 65, 85);
      const under3Text = "EU-domstolen har fastslått at forsinkelser over 3 timer utløser kompensasjonsrett. Mål nøyaktig fra dører åpnes ved ankomst.";
      const under3Lines = doc.splitTextToSize(under3Text, safeWidth);
      under3Lines.forEach((line: string) => {
        doc.text(line, margin, y);
        y += 4.5;
      });
      y += 3;

      doc.setFontSize(9);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text("«Du fikk tilbud om omruting»", margin, y);
      y += 4;
      doc.setFont(useFont, "normal");
      doc.setTextColor(51, 65, 85);
      const rerouteText = "Omruting fritar kun for kompensasjon dersom den oppfylte strenge vilkår. Du kan fortsatt ha krav selv om du ble omrutet.";
      const rerouteLines = doc.splitTextToSize(rerouteText, safeWidth);
      rerouteLines.forEach((line: string) => {
        doc.text(line, margin, y);
        y += 4.5;
      });
      y += 6;

      // ===== SIDE 3: JURIDISK VURDERING =====
      addPage();

      addSectionTitle("4. Juridisk grunnlag");

      addParagraph(`Saken reguleres av ${applicableLaw}. Nedenfor følger en gjennomgang av de relevante bestemmelsene og hvordan disse kommer til anvendelse.`);
      y += 4;

      const legalAnalyses = getFlightLegalAnalysis(problemType, isBaggage);

      legalAnalyses.forEach((analysis) => {
        checkPageBreak(20);

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

      // Ekstraordinære omstendigheter
      if (!isBaggage && data.wasExtraordinary === true) {
        y += 4;
        checkPageBreak(30);
        drawBox(margin, y, contentWidth, 25, [254, 243, 199]);
        doc.setDrawColor(202, 138, 4);
        doc.setLineWidth(0.5);
        doc.line(margin, y, margin, y + 25);

        doc.setFontSize(9);
        doc.setFont(useFont, "bold");
        doc.setTextColor(133, 77, 14);
        doc.text("Flyselskapets påstand om ekstraordinære omstendigheter", margin + 5, y + 7);

        doc.setFontSize(8);
        doc.setFont(useFont, "normal");
        doc.setTextColor(113, 63, 18);
        const extraText = data.extraordinaryReason ? `Flyselskapet har påberopt: "${reformulateUserText(data.extraordinaryReason as string)}". Bevisbyrden for slike omstendigheter ligger hos flyselskapet.` : "Flyselskapet har påberopt ekstraordinære omstendigheter, men bevisbyrden ligger hos flyselskapet.";
        const extraLines = doc.splitTextToSize(extraText, safeWidth - 10);
        doc.text(extraLines.slice(0, 3), margin + 5, y + 14);

        y += 30;
      }

      // Passasjerens rettigheter
      checkPageBreak(40);
      addSectionTitle("5. Passasjerens rettigheter");

      addParagraph(`Ved ${getProblemTypeLabel(problemType).toLowerCase()} har passasjeren følgende rettigheter etter ${applicableLaw}:`);
      y += 2;

      const rights = getPassengerRights(problemType, isBaggage);

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

      const actionPoints = getFlightActionPoints(outcomeLevel, isBaggage);

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

      // Konsekvenser
      y += 4;
      addSectionTitle("7. Konsekvenser ved manglende oppfølging");

      const consequenceText = getFlightConsequenceText(outcomeLevel);
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
      const deadlineText = isBaggage
        ? "Ved forsinket bagasje må reklamasjon fremmes innen 21 dager fra bagasjen ble levert. Ved skadet bagasje er fristen 7 dager. Den absolutte foreldelsesfristen er 2 år."
        : "Det anbefales å fremme krav så snart som mulig etter hendelsen. Den absolutte foreldelsesfristen for EU261-krav er normalt 3 år, men kan variere mellom land.";
      const deadlineLines = doc.splitTextToSize(deadlineText, safeWidth - 10);
      doc.text(deadlineLines, margin + 5, y + 15);

      y += 38;

      // ===== SIDE 5: DOKUMENTASJON OG TVISTELØSNING =====
      addPage();

      addSectionTitle("8. Dokumentasjon og bevisføring");

      addParagraph("For å styrke saken anbefales det å samle og sikre følgende dokumentasjon:");
      y += 2;

      const docPoints = isBaggage ? [
        "PIR-skjema (Property Irregularity Report) fra flyplassen",
        "Bagasjetag / bagasjekvittering fra innsjekking",
        "Kvitteringer for alle nødvendige innkjøp (klær, toalettsaker, etc.)",
        "Boardingkort eller bookingbekreftelse",
        "Skriftlig korrespondanse med flyselskapet",
        "Bilder av skadet bagasje (hvis relevant)",
      ] : [
        "Boardingkort eller bookingbekreftelse med bookingreferanse (PNR)",
        "Dokumentasjon på forsinkelse/kansellering (skjermbilde av flightstatus, SMS, e-post)",
        "Kvitteringer for utgifter til mat, drikke, transport eller overnatting",
        "Skriftlig korrespondanse med flyselskapet",
        "Bilder eller video som dokumenterer forholdene på flyplassen",
        "Vitneforklaringer fra medpassasjerer (hvis relevant)",
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

      addParagraph("Dersom flyselskapet avviser kravet eller ikke svarer, finnes følgende muligheter for tvisteløsning:");
      y += 2;

      const disputeOptions = [
        { title: "Transportklagenemnda", desc: "Behandler klager på flypassasjerrettigheter kostnadsfritt for forbrukeren. Nemndas avgjørelser følges av de fleste flyselskaper. Saken kan klages inn via flyklager.no." },
        { title: "Forbrukerrådet", desc: "Tilbyr veiledning og mekling i forbrukersaker. Kan bistå med å forstå rettighetene dine og hvordan du bør gå frem." },
        { title: "EU-klageportalen (ODR)", desc: "For grensekryssende tvister innen EU/EØS. Tilgjengelig på ec.europa.eu/odr. Kan benyttes når flyselskapet er registrert i et annet EU-land." },
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

      // SEKSJON 4: Neste steg: Formelt kravbrev
      y += 6;
      checkPageBreak(70);
      addSectionTitle("Neste steg: Formelt kravbrev");

      addParagraph("Et godt formulert kravbrev øker sjansen for utbetaling betydelig. Et kravbrev bør inneholde:");
      y += 2;

      const kravbrevPoints = [
        "Tydelig angivelse av hvem som reklamerer og hvilken flygning det gjelder",
        "Konkret beløp som kreves, og grunnlaget for kravet",
        "Henvisning til relevant regelverk (EU 261/2004, Montrealkonvensjonen)",
        "Frist for svar (normalt 14 dager)",
        "Informasjon om hva som skjer ved manglende oppfølging (klagenemnd, rettslige skritt)",
      ];

      kravbrevPoints.forEach((point) => {
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
      y += 4;

      addParagraph("Basert på opplysningene i saken kan harjegkravpå.no generere et ferdig kravbrev tilpasset din situasjon.");

      // Avsluttende merknad
      y += 6;
      addSectionTitle("10. Avsluttende merknad");

      addParagraph("Denne vurderingen er utarbeidet på grunnlag av opplysningene som er gitt, og gir en foreløpig vurdering av saken. Den konkrete rettsstillingen vil avhenge av den fullstendige dokumentasjonen og eventuelle innsigelser fra flyselskapet.");

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
      doc.text("Neste steg: Skriftlig krav til flyselskapet", margin + 5, y + 8);

      doc.setFontSize(9);
      doc.setFont(useFont, "normal");
      doc.setTextColor(51, 65, 85);
      const ctaText = "For å fremme kravet formelt kan du bestille et ferdig utformet kravbrev basert på denne vurderingen. Brevet er tilpasset din sak, juridisk korrekt formulert, og klart til å sendes til flyselskapet.";
      const ctaLines = doc.splitTextToSize(ctaText, safeWidth - 10);
      doc.text(ctaLines, margin + 5, y + 15);

      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text("Kravbrev kan bestilles på harjegkravpå.no (99 kr)", margin + 5, y + 26);

      y += 35;

      // SEKSJON 5: Viktig å merke seg
      checkPageBreak(25);
      doc.setFontSize(8);
      doc.setFont(useFont, "normal");
      doc.setTextColor(120, 120, 120);
      const disclaimerText = "Viktig å merke seg: Denne rapporten er basert på opplysningene du har oppgitt og gir en foreløpig vurdering. Vurderingen utgjør ikke juridisk rådgivning. Ved tvil anbefales det å søke profesjonell juridisk bistand.";
      const disclaimerLines = doc.splitTextToSize(disclaimerText, safeWidth);
      disclaimerLines.forEach((line: string) => {
        checkPageBreak(4);
        doc.text(line, margin, y);
        y += 3.5;
      });

      // Footer på alle sider
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(7);
        doc.setFont(useFont, "normal");
        doc.setTextColor(150, 150, 150);
        doc.text("harjegkravpå.no – Juridisk veiledning for forbrukere", margin, pageHeight - 8);
        doc.text(`Side ${i} av ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: "right" });
      }

      const fileName = `flyreise-rapport-${new Date().toISOString().split("T")[0]}.pdf`;
      doc.save(fileName);
      setDownloaded(true);
    } catch (error) {
      console.error("PDF generation error:", error);
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
    <div className="mx-auto max-w-2xl px-4 py-10 space-y-6">
      <div className="flex items-center gap-3 text-emerald-400">
        <CheckCircle2 className="h-8 w-8" />
        <h1 className="text-2xl font-bold">Betaling fullført!</h1>
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
            Last ned rapport (PDF)
          </>
        )}
      </button>

      {downloaded && (
        <>
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
            <p className="text-emerald-400 text-sm">
              Rapporten er lastet ned! Sjekk nedlastingsmappen din.
            </p>
          </div>

          <div className="border-t border-white/10 pt-6 mt-2">
            <div className="border border-white/10 bg-white/5 rounded-2xl p-5 text-left">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-xl border border-white/10 bg-white/5">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">Trenger du et kravbrev?</h3>
                  <p className="text-sm text-slate-400 mb-3">
                    Få et ferdig formulert juridisk brev du kan sende direkte til flyselskapet.
                    Spar tid og få et profesjonelt resultat.
                  </p>
                  <ul className="text-sm text-slate-300 space-y-1 mb-4">
                    <li>Tilpasset din sak</li>
                    <li>Juridisk korrekt språk</li>
                    <li>Konkrete krav og frister</li>
                  </ul>
                  <button
                    onClick={() => router.push("/flyreiser/kravbrev")}
                    className="group w-full flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition"
                  >
                    Bestill kravbrev - 99 kr
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {accessToken && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
          <p className="text-sm text-slate-300">
            Du kan komme tilbake til denne saken senere via denne lenken.
            Lagre den hvis du vil ha tilgang til rapporten igjen.
          </p>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10">
            <input
              type="text"
              readOnly
              value={`${typeof window !== "undefined" ? window.location.origin : ""}/sak/${accessToken}`}
              className="flex-1 bg-transparent text-sm text-slate-400 outline-none"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/sak/${accessToken}`);
              }}
              className="px-3 py-1.5 rounded-lg text-xs border border-white/10 hover:border-white/30 transition"
            >
              Kopier
            </button>
          </div>
        </div>
      )}

      <div className="border-t border-white/10 pt-6">
        <p className="text-xs text-slate-600 text-center">
          Rapporten er basert på informasjonen du oppga. Ta vare på all dokumentasjon.
        </p>
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
