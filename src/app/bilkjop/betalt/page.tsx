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
    const stored = localStorage.getItem("bilkjop-data");
    if (stored) {
      setData(JSON.parse(stored));
    }

    const loadFonts = async () => {
      try {
        const [regularRes, boldRes] = await Promise.all([
          fetch("https://cdn.jsdelivr.net/gh/nicholasmckinney/google-fonts-ttf@master/Roboto/Roboto-Regular.ttf"),
          fetch("https://cdn.jsdelivr.net/gh/nicholasmckinney/google-fonts-ttf@master/Roboto/Roboto-Bold.ttf"),
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
        console.log("Font load error");
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

      if (fontData) {
        doc.addFileToVFS("Roboto-Regular.ttf", fontData.regular);
        doc.addFileToVFS("Roboto-Bold.ttf", fontData.bold);
        doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
        doc.addFont("Roboto-Bold.ttf", "Roboto", "bold");
      }

      const useFont = fontData ? "Roboto" : "helvetica";
      const isDealer = data.sellerType === "DEALER";
      const applicableLaw = isDealer ? "Forbrukerkjøpsloven" : "Kjøpsloven";
      const warrantyText = isDealer ? "5 år (2 år for slitedeler)" : "2 år";
      const vehicle = data.vehicle as Record<string, string> | undefined;
      const outcome = data.outcome as Record<string, unknown> | undefined;
      const daysSince = calculateDaysSince(vehicle?.purchaseDate || "");

      const addPage = () => {
        doc.addPage();
        y = margin;
        doc.setFillColor(30, 41, 59);
        doc.rect(0, 0, pageWidth, 25, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont(useFont, "bold");
        doc.text("BILKJØP-RAPPORT", margin, 16);
        doc.setFontSize(9);
        doc.setFont(useFont, "normal");
        doc.text(`${isDealer ? "Forhandler" : "Privat"} - ${new Date().toLocaleDateString("nb-NO")}`, pageWidth - margin, 16, { align: "right" });
        y = 35;
      };

      const checkPageBreak = (needed: number) => {
        if (y + needed > pageHeight - 25) addPage();
      };

      const drawBox = (x: number, yPos: number, width: number, height: number, fillColor: number[]) => {
        doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
        doc.roundedRect(x, yPos, width, height, 2, 2, "F");
      };

      // PAGE 1
      doc.setFillColor(30, 41, 59);
      doc.rect(0, 0, pageWidth, 30, "F");
      doc.setFillColor(16, 185, 129);
      doc.roundedRect(margin, 8, 14, 14, 2, 2, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont(useFont, "bold");
      doc.text("H", margin + 5, 17);
      doc.setFontSize(18);
      doc.text("BILKJØP-RAPPORT", margin + 20, 17);
      doc.setFontSize(9);
      doc.setFont(useFont, "normal");
      doc.text(`${isDealer ? "Forhandler" : "Privat"} - ${new Date().toLocaleDateString("nb-NO")}`, margin + 20, 24);

      y = 40;

      // === SEKSJON A: VURDERING AV KRAV ===
      const levelColors: Record<string, number[]> = { GREEN: [34, 197, 94], YELLOW: [234, 179, 8], RED: [239, 68, 68] };
      const levelLabels: Record<string, string> = { GREEN: "Sterkt krav", YELLOW: "Usikkert krav", RED: "Svakt krav" };
      const levelExplanations: Record<string, string> = {
        GREEN: "Basert på opplysningene i saken er det høy sannsynlighet for at du har et gyldig krav mot selger.",
        YELLOW: "Basert på opplysningene i saken er det usikkert om du har et gyldig krav mot selger.",
        RED: "Basert på opplysningene i saken er det lav sannsynlighet for at du har et gyldig krav mot selger."
      };
      const outcomeLevel = outcome?.level as string || "YELLOW";
      const levelColor = levelColors[outcomeLevel] || levelColors.YELLOW;

      // Tittel: Vurdering av krav
      doc.setFontSize(14);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text("Vurdering av krav", margin, y);
      y += 8;

      // Status med farge
      doc.setFillColor(levelColor[0], levelColor[1], levelColor[2]);
      doc.circle(margin + 3, y, 3, "F");
      doc.setFontSize(12);
      doc.setFont(useFont, "bold");
      doc.setTextColor(levelColor[0], levelColor[1], levelColor[2]);
      doc.text(levelLabels[outcomeLevel] || "Usikkert krav", margin + 10, y + 1);
      y += 8;

      // Forklaring
      doc.setFontSize(10);
      doc.setFont(useFont, "normal");
      doc.setTextColor(71, 85, 105);
      const explanationLines = doc.splitTextToSize(levelExplanations[outcomeLevel] || levelExplanations.YELLOW, safeWidth);
      doc.text(explanationLines, margin, y);
      y += explanationLines.length * 5 + 8;

      // === SEKSJON A (del 2): ANBEFALT NESTE STEG ===
      doc.setFontSize(12);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text("Anbefalt neste steg", margin, y);
      y += 7;

      doc.setFontSize(10);
      doc.setFont(useFont, "normal");
      doc.setTextColor(71, 85, 105);
      const nextStepText = "Send et formelt kravbrev til selger.\n\nBasert på vurderingen anbefales det å fremme kravet skriftlig, med tydelig henvisning til relevant lovverk og frister.";
      const nextStepLines = doc.splitTextToSize(nextStepText, safeWidth);
      doc.text(nextStepLines, margin, y);
      y += nextStepLines.length * 5 + 10;

      // === SEKSJON C: HANDLING / CTA ===
      doc.setFontSize(10);
      doc.setFont(useFont, "normal");
      doc.setTextColor(71, 85, 105);
      doc.text("Ønsker du hjelp med dette steget?", margin, y);
      y += 8;

      // CTA-blokk
      const ctaBoxHeight = 42;
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(0.5);
      doc.roundedRect(margin, y, contentWidth, ctaBoxHeight, 2, 2, "S");

      doc.setFontSize(11);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text("Last ned ferdig kravbrev til selger", margin + 4, y + 7);

      doc.setFontSize(10);
      doc.setFont(useFont, "normal");
      doc.setTextColor(71, 85, 105);
      doc.text("Pris: 99 kr", margin + 4, y + 14);

      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      const ctaPoints = [
        "– Juridisk korrekt formulert",
        "– Henviser til relevante lovparagrafer",
        "– Setter tydelige svarfrister",
        "– Klar til å sendes direkte"
      ];
      let ctaY = y + 21;
      ctaPoints.forEach((point) => {
        doc.text(point, margin + 4, ctaY);
        ctaY += 5;
      });
      y += ctaBoxHeight + 10;

      // === RESTEN AV SIDE 1 ===
      const boxW = (contentWidth - 4) / 3;

      // Parties
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(11);
      doc.setFont(useFont, "bold");
      doc.text("Parter", margin, y);
      y += 2;
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(0.5);
      doc.line(margin, y, margin + 18, y);
      y += 5;

      drawBox(margin, y, boxW, 18, [248, 250, 252]);
      drawBox(margin + boxW + 2, y, boxW, 18, [248, 250, 252]);
      drawBox(margin + (boxW + 2) * 2, y, boxW, 18, [248, 250, 252]);

      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.setFont(useFont, "normal");
      doc.text("Kjøper", margin + 2, y + 4);
      doc.text("Selger", margin + boxW + 4, y + 4);
      doc.text("Type kjøp", margin + (boxW + 2) * 2 + 2, y + 4);

      doc.setFontSize(9);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text(truncate((data.buyerName as string) || "Ikke oppgitt", 18), margin + 2, y + 12);
      doc.text(truncate((data.sellerName as string) || "Ikke oppgitt", 18), margin + boxW + 4, y + 12);
      doc.text(isDealer ? "Forhandler" : "Privat", margin + (boxW + 2) * 2 + 2, y + 12);
      y += 22;

      // Vehicle
      doc.setFontSize(11);
      doc.setFont(useFont, "bold");
      doc.text("Kjøretøy", margin, y);
      y += 2;
      doc.setDrawColor(16, 185, 129);
      doc.line(margin, y, margin + 22, y);
      y += 5;

      drawBox(margin, y, boxW, 18, [248, 250, 252]);
      drawBox(margin + boxW + 2, y, boxW, 18, [248, 250, 252]);
      drawBox(margin + (boxW + 2) * 2, y, boxW, 18, [248, 250, 252]);

      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.setFont(useFont, "normal");
      doc.text("Merke", margin + 2, y + 4);
      doc.text("Modell", margin + boxW + 4, y + 4);
      doc.text("Reg.nr", margin + (boxW + 2) * 2 + 2, y + 4);

      doc.setFontSize(9);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text(truncate(vehicle?.make || "", 16), margin + 2, y + 12);
      doc.text(truncate(vehicle?.model || "", 16), margin + boxW + 4, y + 12);
      doc.text(truncate(vehicle?.regNum || "", 12), margin + (boxW + 2) * 2 + 2, y + 12);
      y += 20;

      drawBox(margin, y, boxW, 18, [248, 250, 252]);
      drawBox(margin + boxW + 2, y, boxW, 18, [248, 250, 252]);
      drawBox(margin + (boxW + 2) * 2, y, boxW, 18, [248, 250, 252]);

      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.setFont(useFont, "normal");
      doc.text("Årsmodell", margin + 2, y + 4);
      doc.text("Km.stand", margin + boxW + 4, y + 4);
      doc.text("Kjøpesum", margin + (boxW + 2) * 2 + 2, y + 4);

      doc.setFontSize(9);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text(vehicle?.year || "-", margin + 2, y + 12);
      doc.text(vehicle?.km ? `${vehicle.km} km` : "-", margin + boxW + 4, y + 12);
      doc.text(vehicle?.price ? `${vehicle.price} kr` : "-", margin + (boxW + 2) * 2 + 2, y + 12);

      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.text("harjegkravpå.no", margin, pageHeight - 8);
      doc.text("Side 1/3", pageWidth - margin, pageHeight - 8, { align: "right" });

      // PAGE 2
      addPage();

      const halfW = (contentWidth - 2) / 2;

      // Kjøpsdato og tid siden kjøp
      drawBox(margin, y, halfW, 18, [248, 250, 252]);
      drawBox(margin + halfW + 2, y, halfW, 18, [248, 250, 252]);

      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.setFont(useFont, "normal");
      doc.text("Kjøpsdato", margin + 2, y + 4);
      doc.text("Tid siden kjøp", margin + halfW + 4, y + 4);

      doc.setFontSize(9);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text(formatDate(vehicle?.purchaseDate || ""), margin + 2, y + 12);
      doc.text(daysSince ? `${daysSince} dager` : "-", margin + halfW + 4, y + 12);
      y += 22;

      // Problem
      doc.setFontSize(11);
      doc.setFont(useFont, "bold");
      doc.text("Problemet", margin, y);
      y += 2;
      doc.setDrawColor(16, 185, 129);
      doc.line(margin, y, margin + 26, y);
      y += 5;

      drawBox(margin, y, boxW, 18, [248, 250, 252]);
      drawBox(margin + boxW + 2, y, boxW, 18, [248, 250, 252]);
      drawBox(margin + (boxW + 2) * 2, y, boxW, 18, [248, 250, 252]);

      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.setFont(useFont, "normal");
      doc.text("Feilområder", margin + 2, y + 4);
      doc.text("Sikkerhetskritisk", margin + boxW + 4, y + 4);
      doc.text("Kjørbar", margin + (boxW + 2) * 2 + 2, y + 4);

      doc.setFontSize(8);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      const issues = data.issues as string[] || [];
      doc.text(truncate(issues.join(", "), 22), margin + 2, y + 12);
      doc.text(data.safetyCritical ? "Ja" : "Nei", margin + boxW + 4, y + 12);
      doc.text(data.notDriveable ? "Nei" : "Ja", margin + (boxW + 2) * 2 + 2, y + 12);
      y += 20;

      drawBox(margin, y, boxW, 18, [248, 250, 252]);
      drawBox(margin + boxW + 2, y, boxW, 18, [248, 250, 252]);
      drawBox(margin + (boxW + 2) * 2, y, boxW, 18, [248, 250, 252]);

      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.setFont(useFont, "normal");
      doc.text("Kostnadsanslag", margin + 2, y + 4);
      doc.text("Reklamert", margin + boxW + 4, y + 4);
      doc.text("Feil oppstod", margin + (boxW + 2) * 2 + 2, y + 4);

      doc.setFontSize(9);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text(truncate((data.costBracket as string) || "Ukjent", 14), margin + 2, y + 12);
      doc.text(data.complainedQuickly ? "Raskt" : "Sent", margin + boxW + 4, y + 12);
      doc.text(data.defectSoonAfter ? "Tidlig" : "Sent", margin + (boxW + 2) * 2 + 2, y + 12);
      y += 22;

      // Contact
      doc.setFontSize(11);
      doc.setFont(useFont, "bold");
      doc.text("Kontakt med selger", margin, y);
      y += 2;
      doc.setDrawColor(16, 185, 129);
      doc.line(margin, y, margin + 42, y);
      y += 5;

      drawBox(margin, y, halfW, 18, [248, 250, 252]);
      drawBox(margin + halfW + 2, y, halfW, 18, [248, 250, 252]);

      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.setFont(useFont, "normal");
      doc.text("Kontaktet selger", margin + 2, y + 4);
      doc.text("Status", margin + halfW + 4, y + 4);

      doc.setFontSize(9);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text(data.contactedSeller ? "Ja" : "Nei", margin + 2, y + 12);
      doc.text(data.contactedSeller ? (data.sellerResponse ? "Fått svar" : "Venter") : "Ikke kontaktet", margin + halfW + 4, y + 12);
      y += 20;

      if (data.contactedSeller && data.sellerResponse) {
        const responseLines = doc.splitTextToSize(data.sellerResponse as string, safeWidth - 6);
        const responseHeight = Math.min(20, 8 + responseLines.length * 4);
        drawBox(margin, y, contentWidth, responseHeight, [254, 243, 199]);
        doc.setFontSize(7);
        doc.setTextColor(133, 77, 14);
        doc.setFont(useFont, "bold");
        doc.text("Selgers respons:", margin + 2, y + 4);
        doc.setFont(useFont, "normal");
        doc.setFontSize(8);
        doc.setTextColor(113, 63, 18);
        doc.text(responseLines.slice(0, 3), margin + 2, y + 9);
        y += responseHeight + 4;
      }

      drawBox(margin, y, contentWidth, 14, [241, 245, 249]);
      doc.setFontSize(9);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text(`Gjeldende lov: ${applicableLaw}`, margin + 3, y + 5);
      doc.setFont(useFont, "normal");
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(`Reklamasjonsfrist: ${warrantyText}`, margin + 3, y + 10);
      y += 18;

      // Vurderingsgrunnlag
      doc.setFontSize(11);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text("Vurderingsgrunnlag", margin, y);
      y += 2;
      doc.setDrawColor(16, 185, 129);
      doc.line(margin, y, margin + 42, y);
      y += 5;

      doc.setFontSize(8);
      doc.setFont(useFont, "normal");
      doc.setTextColor(71, 85, 105);
      doc.text("Basert på informasjonen du har oppgitt:", margin, y);
      y += 6;

      const keyPoints = (outcome?.keyPoints as string[]) || [];
      keyPoints.forEach((point: string) => {
        checkPageBreak(10);
        doc.setFillColor(16, 185, 129);
        doc.circle(margin + 2, y - 1, 1.2, "F");
        doc.setTextColor(30, 41, 59);
        doc.setFontSize(8);
        const pointLines = doc.splitTextToSize(point, safeWidth - 8);
        doc.text(pointLines, margin + 6, y);
        y += pointLines.length * 4 + 3;
      });

      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.text("harjegkravpå.no", margin, pageHeight - 8);
      doc.text("Side 2/3", pageWidth - margin, pageHeight - 8, { align: "right" });

      // PAGE 3
      addPage();

      // Juridisk grunnlag
      doc.setFontSize(11);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text("Juridisk grunnlag", margin, y);
      y += 2;
      doc.setDrawColor(16, 185, 129);
      doc.line(margin, y, margin + 38, y);
      y += 6;

      const legalRefs = (outcome?.legalRefs as Array<{ heading: string; refs: string[] }>) || [];
      legalRefs.forEach((section) => {
        checkPageBreak(16);
        doc.setFontSize(9);
        doc.setFont(useFont, "bold");
        doc.setTextColor(30, 41, 59);
        doc.text(section.heading, margin, y);
        y += 5;
        (section.refs || []).forEach((ref: string) => {
          checkPageBreak(8);
          doc.setFillColor(30, 41, 59);
          doc.circle(margin + 2, y - 1, 0.8, "F");
          doc.setFontSize(8);
          doc.setFont(useFont, "normal");
          doc.setTextColor(71, 85, 105);
          const refLines = doc.splitTextToSize(ref, safeWidth - 8);
          doc.text(refLines, margin + 6, y);
          y += refLines.length * 4 + 2;
        });
        y += 3;
      });
      y += 4;

      checkPageBreak(22);
      const tipLines = doc.splitTextToSize((outcome?.proTip as string) || "", safeWidth - 6);
      const tipHeight = Math.max(18, 10 + tipLines.length * 4);
      drawBox(margin, y, contentWidth, tipHeight, [254, 249, 195]);
      doc.setFontSize(9);
      doc.setFont(useFont, "bold");
      doc.setTextColor(133, 77, 14);
      doc.text("Pro-tip", margin + 3, y + 5);
      doc.setFontSize(8);
      doc.setFont(useFont, "normal");
      doc.setTextColor(113, 63, 18);
      doc.text(tipLines.slice(0, 3), margin + 3, y + 11);
      y += tipHeight + 6;

      if (data.userDescription) {
        checkPageBreak(40);
        doc.setFontSize(11);
        doc.setFont(useFont, "bold");
        doc.setTextColor(30, 41, 59);
        doc.text("Din beskrivelse", margin, y);
        y += 2;
        doc.setDrawColor(16, 185, 129);
        doc.line(margin, y, margin + 36, y);
        y += 5;

        const descLines = doc.splitTextToSize(`"${data.userDescription}"`, safeWidth - 4);
        const descHeight = Math.min(38, 6 + descLines.length * 4);
        drawBox(margin, y, contentWidth, descHeight, [248, 250, 252]);
        doc.setFontSize(8);
        doc.setFont(useFont, "normal");
        doc.setTextColor(71, 85, 105);
        doc.text(descLines.slice(0, 8), margin + 3, y + 5);
        y += descHeight + 6;
      }

      if (data.sellerPromises || data.hadAsIsClause !== null || data.visibleDefect !== null || data.hasWorkshopReport !== null) {
        checkPageBreak(40);
        doc.setFontSize(11);
        doc.setFont(useFont, "bold");
        doc.setTextColor(30, 41, 59);
        doc.text("Kritiske juridiske momenter", margin, y);
        y += 2;
        doc.setDrawColor(239, 68, 68);
        doc.line(margin, y, margin + 58, y);
        y += 5;

        if (data.sellerPromises) {
          checkPageBreak(15);
          doc.setFontSize(8);
          doc.setFont(useFont, "bold");
          doc.setTextColor(217, 119, 6);
          doc.text("Selgers løfter/påstander:", margin, y);
          y += 5;
          const promiseLines = doc.splitTextToSize(String(data.sellerPromises), safeWidth - 4);
          drawBox(margin, y, contentWidth, 6 + promiseLines.slice(0, 5).length * 4, [254, 243, 199]);
          doc.setFontSize(7);
          doc.setFont(useFont, "normal");
          doc.setTextColor(120, 53, 15);
          doc.text(promiseLines.slice(0, 5), margin + 3, y + 4);
          y += 6 + promiseLines.slice(0, 5).length * 4 + 4;
        }

        if (data.hadAsIsClause !== null && data.hadAsIsClause !== undefined) {
          checkPageBreak(10);
          doc.setFontSize(8);
          doc.setFont(useFont, "bold");
          const isDealer = data.sellerType === "DEALER";
          if (data.hadAsIsClause && isDealer) {
            doc.setTextColor(220, 38, 38);
            doc.text('"Som den er"-klausul: JA (UGYLDIG hos forhandler etter 01.01.2024)', margin, y);
          } else if (data.hadAsIsClause) {
            doc.setTextColor(217, 119, 6);
            doc.text('"Som den er"-klausul: JA (kan ha betydning, men beskytter ikke mot skjulte feil)', margin, y);
          } else {
            doc.setTextColor(22, 163, 74);
            doc.text('"Som den er"-klausul: Nei, normalt salg', margin, y);
          }
          y += 6;
        }

        if (data.visibleDefect !== null && data.visibleDefect !== undefined) {
          checkPageBreak(10);
          doc.setFontSize(8);
          doc.setFont(useFont, "bold");
          if (data.visibleDefect) {
            doc.setTextColor(217, 119, 6);
            doc.text("Synlig feil ved kjøp: JA (kan svekke saken, men ikke umuliggjør krav)", margin, y);
          } else {
            doc.setTextColor(22, 163, 74);
            doc.text("Synlig feil ved kjøp: NEI - Feilen var skjult (styrker saken)", margin, y);
          }
          y += 6;
        }

        if (data.hasWorkshopReport !== null && data.hasWorkshopReport !== undefined) {
          checkPageBreak(10);
          doc.setFontSize(8);
          doc.setFont(useFont, "bold");
          if (data.hasWorkshopReport) {
            doc.setTextColor(22, 163, 74);
            doc.text("Verkstedsrapport: JA (styrker saken betydelig)", margin, y);
            y += 5;
            if (data.workshopReportText) {
              const workshopLines = doc.splitTextToSize(String(data.workshopReportText), safeWidth - 4);
              const wsHeight = 6 + Math.min(workshopLines.length, 8) * 4;
              drawBox(margin, y, contentWidth, wsHeight, [219, 234, 254]);
              doc.setFontSize(7);
              doc.setFont(useFont, "normal");
              doc.setTextColor(30, 58, 138);
              doc.text(workshopLines.slice(0, 8), margin + 3, y + 4);
              y += wsHeight + 4;
            } else {
              y += 2;
            }
          } else {
            doc.setTextColor(217, 119, 6);
            doc.text("Verkstedsrapport: Ikke undersøkt ennå (anbefales å få dette)", margin, y);
            y += 6;
          }
        }
        y += 4;
      }

      if (data.additionalInfo) {
        checkPageBreak(40);
        doc.setFontSize(11);
        doc.setFont(useFont, "bold");
        doc.setTextColor(30, 41, 59);
        doc.text("Tilleggsinformasjon", margin, y);
        y += 2;
        doc.setDrawColor(16, 185, 129);
        doc.line(margin, y, margin + 46, y);
        y += 5;

        const addInfoLines = doc.splitTextToSize(`${data.additionalInfo}`, safeWidth - 4);
        const maxLines = 25;
        const linesToShow = addInfoLines.slice(0, maxLines);
        const addInfoHeight = Math.min(60, 6 + linesToShow.length * 4);
        drawBox(margin, y, contentWidth, addInfoHeight, [240, 253, 244]);
        doc.setFontSize(7);
        doc.setFont(useFont, "normal");
        doc.setTextColor(22, 101, 52);
        doc.text(linesToShow, margin + 3, y + 5);
        y += addInfoHeight + 6;
      }

      checkPageBreak(50);
      doc.setFontSize(11);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text("Dokumentasjon du trenger", margin, y);
      y += 2;
      doc.setDrawColor(16, 185, 129);
      doc.line(margin, y, margin + 58, y);
      y += 5;

      doc.setFontSize(8);
      doc.setFont(useFont, "normal");
      doc.setTextColor(71, 85, 105);
      doc.text("Samle følgende for å styrke saken:", margin, y);
      y += 6;

      ["Kjøpekontrakt eller kvittering", "Bilder/video av feilen", "Verkstedrapport", "Kommunikasjon med selger", "Annonse (skjermbilde)", "Feilkoder fra OBD", "Kostnadsoverslag"].forEach((item) => {
        checkPageBreak(6);
        doc.setFillColor(34, 197, 94);
        doc.rect(margin, y - 2.5, 3, 3, "F");
        doc.setTextColor(30, 41, 59);
        doc.setFontSize(8);
        doc.text(item, margin + 6, y);
        y += 6;
      });
      y += 8;

      checkPageBreak(14);
      drawBox(margin, y, contentWidth, 12, [241, 245, 249]);
      doc.setFontSize(8);
      doc.setFont(useFont, "bold");
      doc.setTextColor(100, 116, 139);
      doc.text("Viktig:", margin + 3, y + 5);
      doc.setFont(useFont, "normal");
      doc.setFontSize(7);
      doc.text(truncate((outcome?.disclaimer as string) || "Veiledningen er basert på opplysningene du har gitt.", 80), margin + 16, y + 5);

      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.text("harjegkravpå.no", margin, pageHeight - 8);
      doc.text("Side 3/3", pageWidth - margin, pageHeight - 8, { align: "right" });

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
          <p className="text-slate-400">49 kr</p>
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
                  Bestill kravbrev - 149 kr
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