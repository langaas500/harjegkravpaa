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
      const outcome = data.outcome as Record<string, unknown> | undefined;
      const fag = data.fag as string[] | undefined;
      const problemer = data.problemer as string[] | undefined;

      const addPage = () => {
        doc.addPage();
        y = margin;
        doc.setFillColor(30, 41, 59);
        doc.rect(0, 0, pageWidth, 25, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont(useFont, "bold");
        doc.text("HÅNDVERKER-RAPPORT", margin, 16);
        doc.setFontSize(9);
        doc.setFont(useFont, "normal");
        doc.text(new Date().toLocaleDateString("nb-NO"), pageWidth - margin, 16, { align: "right" });
        y = 35;
      };

      const checkPageBreak = (needed: number) => {
        if (y + needed > pageHeight - 25) addPage();
      };

      const drawBox = (x: number, yPos: number, width: number, height: number, fillColor: number[]) => {
        doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
        doc.roundedRect(x, yPos, width, height, 2, 2, "F");
      };

      // PAGE 1 - Header
      doc.setFillColor(30, 41, 59);
      doc.rect(0, 0, pageWidth, 30, "F");
      doc.setFillColor(16, 185, 129);
      doc.roundedRect(margin, 8, 14, 14, 2, 2, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont(useFont, "bold");
      doc.text("H", margin + 5, 17);
      doc.setFontSize(18);
      doc.text("HÅNDVERKER-RAPPORT", margin + 20, 17);
      doc.setFontSize(9);
      doc.setFont(useFont, "normal");
      doc.text(new Date().toLocaleDateString("nb-NO"), margin + 20, 24);

      y = 40;

      // Vurdering av krav
      const levelColors: Record<string, number[]> = { GREEN: [34, 197, 94], YELLOW: [234, 179, 8], RED: [239, 68, 68] };
      const levelLabels: Record<string, string> = { GREEN: "Sannsynlig krav", YELLOW: "Usikkert krav", RED: "Svakt krav" };
      const levelExplanations: Record<string, string> = {
        GREEN: "Basert på opplysningene i saken er det høy sannsynlighet for at du har et gyldig krav mot håndverkeren.",
        YELLOW: "Basert på opplysningene i saken er det usikkert om du har et gyldig krav mot håndverkeren.",
        RED: "Basert på opplysningene i saken er det lav sannsynlighet for at du har et gyldig krav mot håndverkeren."
      };
      const outcomeLevel = outcome?.level as string || "YELLOW";
      const levelColor = levelColors[outcomeLevel] || levelColors.YELLOW;

      doc.setFontSize(14);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text("Vurdering av krav", margin, y);
      y += 8;

      doc.setFillColor(levelColor[0], levelColor[1], levelColor[2]);
      doc.circle(margin + 3, y, 3, "F");
      doc.setFontSize(12);
      doc.setFont(useFont, "bold");
      doc.setTextColor(levelColor[0], levelColor[1], levelColor[2]);
      doc.text(levelLabels[outcomeLevel] || "Usikkert krav", margin + 10, y + 1);
      y += 8;

      doc.setFontSize(10);
      doc.setFont(useFont, "normal");
      doc.setTextColor(71, 85, 105);
      const explanationLines = doc.splitTextToSize(levelExplanations[outcomeLevel] || levelExplanations.YELLOW, safeWidth);
      doc.text(explanationLines, margin, y);
      y += explanationLines.length * 5 + 8;

      // Anbefalt neste steg
      doc.setFontSize(12);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text("Anbefalt neste steg", margin, y);
      y += 7;

      doc.setFontSize(10);
      doc.setFont(useFont, "normal");
      doc.setTextColor(71, 85, 105);
      const nextStepText = "Send en skriftlig reklamasjon til håndverkeren.\n\nBasert på vurderingen anbefales det å fremme kravet skriftlig, med tydelig beskrivelse av problemet og hva du krever.";
      const nextStepLines = doc.splitTextToSize(nextStepText, safeWidth);
      doc.text(nextStepLines, margin, y);
      y += nextStepLines.length * 5 + 10;

      // CTA-blokk
      doc.setFontSize(10);
      doc.setFont(useFont, "normal");
      doc.setTextColor(71, 85, 105);
      doc.text("Ønsker du hjelp med dette steget?", margin, y);
      y += 8;

      const ctaBoxHeight = 42;
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(0.5);
      doc.roundedRect(margin, y, contentWidth, ctaBoxHeight, 2, 2, "S");

      doc.setFontSize(11);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text("Last ned ferdig kravbrev til håndverkeren", margin + 4, y + 7);

      doc.setFontSize(10);
      doc.setFont(useFont, "normal");
      doc.setTextColor(71, 85, 105);
      doc.text("Pris: 99 kr", margin + 4, y + 14);

      doc.setFontSize(9);
      const ctaPoints = [
        "– Juridisk korrekt formulert",
        "– Henviser til håndverkertjenesteloven",
        "– Setter tydelige svarfrister",
        "– Klar til å sendes direkte"
      ];
      let ctaY = y + 21;
      ctaPoints.forEach((point) => {
        doc.text(point, margin + 4, ctaY);
        ctaY += 5;
      });
      y += ctaBoxHeight + 10;

      // Parter og detaljer
      const boxW = (contentWidth - 4) / 3;

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
      drawBox(margin + boxW + 2, y, boxW * 2 + 2, 18, [248, 250, 252]);

      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.setFont(useFont, "normal");
      doc.text("Kunde", margin + 2, y + 4);
      doc.text("Håndverker", margin + boxW + 4, y + 4);

      doc.setFontSize(9);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text(truncate((data.navn as string) || "Ikke oppgitt", 18), margin + 2, y + 12);
      doc.text(truncate((data.handverkerNavn as string) || "Ikke oppgitt", 30), margin + boxW + 4, y + 12);
      y += 22;

      // Fag og problem
      doc.setFontSize(11);
      doc.setFont(useFont, "bold");
      doc.text("Saken gjelder", margin, y);
      y += 2;
      doc.setDrawColor(16, 185, 129);
      doc.line(margin, y, margin + 30, y);
      y += 5;

      drawBox(margin, y, contentWidth / 2 - 1, 18, [248, 250, 252]);
      drawBox(margin + contentWidth / 2 + 1, y, contentWidth / 2 - 1, 18, [248, 250, 252]);

      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.setFont(useFont, "normal");
      doc.text("Fag", margin + 2, y + 4);
      doc.text("Problem", margin + contentWidth / 2 + 3, y + 4);

      doc.setFontSize(9);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text(truncate(fag?.join(", ") || "-", 30), margin + 2, y + 12);
      doc.text(truncate(problemer?.join(", ") || "-", 30), margin + contentWidth / 2 + 3, y + 12);
      y += 22;

      // Avtale
      doc.setFontSize(11);
      doc.setFont(useFont, "bold");
      doc.text("Avtaleforhold", margin, y);
      y += 2;
      doc.setDrawColor(16, 185, 129);
      doc.line(margin, y, margin + 30, y);
      y += 5;

      drawBox(margin, y, boxW, 18, [248, 250, 252]);
      drawBox(margin + boxW + 2, y, boxW, 18, [248, 250, 252]);
      drawBox(margin + (boxW + 2) * 2, y, boxW, 18, [248, 250, 252]);

      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.setFont(useFont, "normal");
      doc.text("Pris avtalt", margin + 2, y + 4);
      doc.text("Skriftlig", margin + boxW + 4, y + 4);
      doc.text("Prisform", margin + (boxW + 2) * 2 + 2, y + 4);

      doc.setFontSize(9);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text(data.prisAvtalt === "ja" ? "Ja" : data.prisAvtalt === "nei" ? "Nei" : "Usikker", margin + 2, y + 12);
      doc.text(data.prisSkriftlig === true ? "Ja" : data.prisSkriftlig === false ? "Nei" : "-", margin + boxW + 4, y + 12);
      doc.text(truncate((data.prisform as string) || "-", 12), margin + (boxW + 2) * 2 + 2, y + 12);

      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.text("harjegkravpå.no", margin, pageHeight - 8);
      doc.text("Side 1/2", pageWidth - margin, pageHeight - 8, { align: "right" });

      // PAGE 2
      addPage();

      // Din beskrivelse
      if (data.dinHistorie) {
        doc.setFontSize(11);
        doc.setFont(useFont, "bold");
        doc.setTextColor(30, 41, 59);
        doc.text("Din beskrivelse", margin, y);
        y += 2;
        doc.setDrawColor(16, 185, 129);
        doc.line(margin, y, margin + 36, y);
        y += 5;

        const descLines = doc.splitTextToSize(`"${data.dinHistorie}"`, safeWidth - 4);
        const descHeight = Math.min(50, 6 + descLines.length * 4);
        drawBox(margin, y, contentWidth, descHeight, [248, 250, 252]);
        doc.setFontSize(8);
        doc.setFont(useFont, "normal");
        doc.setTextColor(71, 85, 105);
        doc.text(descLines.slice(0, 12), margin + 3, y + 5);
        y += descHeight + 8;
      }

      // Nøkkelpunkter
      const keyPoints = (outcome?.keyPoints as string[]) || [];
      if (keyPoints.length > 0) {
        checkPageBreak(40);
        doc.setFontSize(11);
        doc.setFont(useFont, "bold");
        doc.setTextColor(30, 41, 59);
        doc.text("Vurderingsgrunnlag", margin, y);
        y += 2;
        doc.setDrawColor(16, 185, 129);
        doc.line(margin, y, margin + 42, y);
        y += 6;

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
        y += 4;
      }

      // Juridisk grunnlag
      const legalRefs = (outcome?.legalRefs as Array<{ heading: string; refs: string[] }>) || [];
      if (legalRefs.length > 0) {
        checkPageBreak(30);
        doc.setFontSize(11);
        doc.setFont(useFont, "bold");
        doc.setTextColor(30, 41, 59);
        doc.text("Juridisk grunnlag", margin, y);
        y += 2;
        doc.setDrawColor(16, 185, 129);
        doc.line(margin, y, margin + 38, y);
        y += 6;

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
      }

      // Pro-tip
      const proTip = outcome?.proTip as string;
      if (proTip) {
        checkPageBreak(22);
        const tipLines = doc.splitTextToSize(proTip, safeWidth - 6);
        const tipHeight = Math.max(18, 10 + tipLines.length * 4);
        drawBox(margin, y, contentWidth, tipHeight, [254, 249, 195]);
        doc.setFontSize(9);
        doc.setFont(useFont, "bold");
        doc.setTextColor(133, 77, 14);
        doc.text("Tips", margin + 3, y + 5);
        doc.setFontSize(8);
        doc.setFont(useFont, "normal");
        doc.setTextColor(113, 63, 18);
        doc.text(tipLines.slice(0, 3), margin + 3, y + 11);
        y += tipHeight + 6;
      }

      // Disclaimer
      checkPageBreak(14);
      drawBox(margin, y, contentWidth, 12, [241, 245, 249]);
      doc.setFontSize(8);
      doc.setFont(useFont, "bold");
      doc.setTextColor(100, 116, 139);
      doc.text("Viktig:", margin + 3, y + 5);
      doc.setFont(useFont, "normal");
      doc.setFontSize(7);
      doc.text("Veiledningen er basert på opplysningene du har gitt og er ikke juridisk rådgivning.", margin + 16, y + 5);

      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.text("harjegkravpå.no", margin, pageHeight - 8);
      doc.text("Side 2/2", pageWidth - margin, pageHeight - 8, { align: "right" });

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
