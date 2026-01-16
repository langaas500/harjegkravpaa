"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { jsPDF } from "jspdf";
import { CheckCircle2, FileDown, Loader2 } from "lucide-react";

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

  const getReceiptsLabel = (status: string) => {
    const labels: Record<string, string> = {
      yes: "Ja",
      partial: "Delvis",
      no: "Nei",
    };
    return labels[status] || status;
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
      const problemType = data.problemType as string;
      const isBaggage = problemType === "BAGGAGE";
      const applicableLaw = isBaggage ? "Montrealkonvensjonen" : "EU-forordning 261/2004";
      const flight = data.flight as Record<string, string> | undefined;
      const outcome = data.outcome as Record<string, unknown> | undefined;

      const addPage = () => {
        doc.addPage();
        y = margin;
        doc.setFillColor(30, 41, 59);
        doc.rect(0, 0, pageWidth, 25, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont(useFont, "bold");
        doc.text("FLYREISE-RAPPORT", margin, 16);
        doc.setFontSize(9);
        doc.setFont(useFont, "normal");
        doc.text(`${getProblemTypeLabel(problemType)} - ${new Date().toLocaleDateString("nb-NO")}`, pageWidth - margin, 16, { align: "right" });
        y = 35;
      };

      const checkPageBreak = (needed: number) => {
        if (y + needed > pageHeight - 25) addPage();
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
      doc.text("FLYREISE-RAPPORT", margin + 20, 17);
      doc.setFontSize(9);
      doc.setFont(useFont, "normal");
      doc.text(`${getProblemTypeLabel(problemType)} - ${new Date().toLocaleDateString("nb-NO")}`, margin + 20, 24);

      y = 40;

      // === VURDERING AV KRAV ===
      const levelColors: Record<string, number[]> = { GREEN: [34, 197, 94], YELLOW: [234, 179, 8], RED: [239, 68, 68] };
      const levelLabels: Record<string, string> = { GREEN: "Sannsynlig krav", YELLOW: "Usikkert krav", RED: "Svakt krav" };
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

      // Summary
      const summary = outcome?.summary as string || "";
      doc.setFontSize(10);
      doc.setFont(useFont, "normal");
      doc.setTextColor(71, 85, 105);
      const summaryLines = doc.splitTextToSize(summary, safeWidth);
      doc.text(summaryLines, margin, y);
      y += summaryLines.length * 5 + 8;

      // Compensation amount
      const compensationAmount = outcome?.compensationAmount as string;
      if (compensationAmount) {
        doc.setFontSize(11);
        doc.setFont(useFont, "bold");
        doc.setTextColor(34, 197, 94);
        doc.text(`Mulig kompensasjon: ${compensationAmount}`, margin, y);
        y += 10;
      }

      // === SAKSDETALJER ===
      checkPageBreak(60);
      doc.setFontSize(12);
      doc.setFont(useFont, "bold");
      doc.setTextColor(30, 41, 59);
      doc.text("Saksdetaljer", margin, y);
      y += 7;

      const details = [
        ["Passasjer", data.passengerName as string || "Ikke oppgitt"],
        ["Flyselskap", flight?.airline || "Ikke oppgitt"],
        ["Flynummer", flight?.flightNumber || "Ikke oppgitt"],
        ["Rute", `${flight?.departureAirport || "?"} - ${flight?.arrivalAirport || "?"}`],
        ["Flydato", formatDate(flight?.flightDate || "")],
        ["Problemtype", getProblemTypeLabel(problemType)],
      ];

      if (isBaggage && data.baggageType) {
        details.push(["Bagasjetype", getBaggageTypeLabel(data.baggageType as string)]);
        if (data.baggageType === "delayed" && data.baggageDelayDuration) {
          details.push(["Forsinkelsens varighet", getBaggageDelayLabel(data.baggageDelayDuration as string)]);
        }
        if (data.hasPIR !== null) {
          details.push(["PIR-skjema", data.hasPIR ? "Ja" : "Nei"]);
        }
        if (data.expenseTypes && (data.expenseTypes as string[]).length > 0) {
          details.push(["Utgiftstyper", getExpenseTypeLabels(data.expenseTypes as string[])]);
        }
        if (data.totalExpenseAmount) {
          details.push(["Totalt utgiftsbeløp", `${data.totalExpenseAmount} kr`]);
        }
        if (data.hasReceipts) {
          details.push(["Har kvitteringer", getReceiptsLabel(data.hasReceipts as string)]);
        }
        if (data.hadWorkMeetings !== null) {
          details.push(["Jobb/møter påvirket", data.hadWorkMeetings ? "Ja" : "Nei"]);
        }
      }

      doc.setFontSize(10);
      details.forEach(([label, value]) => {
        doc.setFont(useFont, "normal");
        doc.setTextColor(100, 116, 139);
        doc.text(label, margin, y);
        doc.setTextColor(30, 41, 59);
        doc.text(value, margin + 45, y);
        y += 6;
      });
      y += 5;

      // === BAGGAGE ADDITIONAL INFO ===
      if (isBaggage) {
        const additionalInfo: string[] = [];

        if (data.workMeetingsDetails) {
          additionalInfo.push(`Påvirket arbeid/møter: ${data.workMeetingsDetails}`);
        }

        if (data.medicineWasNecessary !== null && (data.expenseTypes as string[] | null)?.includes("medicine")) {
          additionalInfo.push(
            data.medicineWasNecessary
              ? "Medisiner: Nødvendige medisiner som normalt tas med på reise"
              : "Medisiner: Kjøpt under reisen"
          );
        }

        if (additionalInfo.length > 0) {
          checkPageBreak(30);
          doc.setFontSize(12);
          doc.setFont(useFont, "bold");
          doc.setTextColor(30, 41, 59);
          doc.text("Tilleggsinformasjon", margin, y);
          y += 7;

          doc.setFontSize(10);
          doc.setFont(useFont, "normal");
          doc.setTextColor(71, 85, 105);
          additionalInfo.forEach((info) => {
            checkPageBreak(10);
            const lines = doc.splitTextToSize(`• ${info}`, safeWidth);
            doc.text(lines, margin, y);
            y += lines.length * 5 + 2;
          });
          y += 5;
        }
      }

      // === NØKKELPUNKTER ===
      const keyPoints = outcome?.keyPoints as string[] || [];
      if (keyPoints.length > 0) {
        checkPageBreak(40);
        doc.setFontSize(12);
        doc.setFont(useFont, "bold");
        doc.setTextColor(30, 41, 59);
        doc.text("Nøkkelpunkter", margin, y);
        y += 7;

        doc.setFontSize(10);
        doc.setFont(useFont, "normal");
        doc.setTextColor(71, 85, 105);
        keyPoints.forEach((point) => {
          checkPageBreak(10);
          const lines = doc.splitTextToSize(`• ${point}`, safeWidth);
          doc.text(lines, margin, y);
          y += lines.length * 5 + 2;
        });
        y += 5;
      }

      // === LOVHENVISNINGER ===
      const legalRefs = outcome?.legalRefs as Array<{ heading: string; refs: string[] }> || [];
      if (legalRefs.length > 0) {
        checkPageBreak(30);
        doc.setFontSize(12);
        doc.setFont(useFont, "bold");
        doc.setTextColor(30, 41, 59);
        doc.text("Juridisk grunnlag", margin, y);
        y += 7;

        legalRefs.forEach((section) => {
          checkPageBreak(20);
          doc.setFontSize(10);
          doc.setFont(useFont, "bold");
          doc.setTextColor(71, 85, 105);
          doc.text(section.heading, margin, y);
          y += 5;

          doc.setFont(useFont, "normal");
          section.refs.forEach((ref) => {
            checkPageBreak(8);
            const lines = doc.splitTextToSize(`• ${ref}`, safeWidth);
            doc.text(lines, margin + 3, y);
            y += lines.length * 5;
          });
          y += 3;
        });
        y += 5;
      }

      // === NESTE STEG ===
      const nextSteps = outcome?.nextSteps as string[] || [];
      if (nextSteps.length > 0) {
        checkPageBreak(40);
        doc.setFontSize(12);
        doc.setFont(useFont, "bold");
        doc.setTextColor(30, 41, 59);
        doc.text("Anbefalt neste steg", margin, y);
        y += 7;

        doc.setFontSize(10);
        doc.setFont(useFont, "normal");
        doc.setTextColor(71, 85, 105);
        nextSteps.forEach((step, i) => {
          checkPageBreak(10);
          const lines = doc.splitTextToSize(`${i + 1}. ${step}`, safeWidth);
          doc.text(lines, margin, y);
          y += lines.length * 5 + 2;
        });
        y += 5;
      }

      // === PRO TIP ===
      const proTip = outcome?.proTip as string;
      if (proTip) {
        checkPageBreak(25);
        doc.setFillColor(240, 253, 244);
        doc.roundedRect(margin, y, contentWidth, 18, 2, 2, "F");
        doc.setFontSize(9);
        doc.setFont(useFont, "bold");
        doc.setTextColor(34, 197, 94);
        doc.text("Tips:", margin + 4, y + 6);
        doc.setFont(useFont, "normal");
        doc.setTextColor(71, 85, 105);
        const tipLines = doc.splitTextToSize(proTip, safeWidth - 10);
        doc.text(tipLines, margin + 4, y + 11);
        y += 22;
      }

      // === DISCLAIMER ===
      checkPageBreak(20);
      y += 5;
      doc.setFontSize(8);
      doc.setFont(useFont, "normal");
      doc.setTextColor(148, 163, 184);
      const disclaimer = outcome?.disclaimer as string || "Dette er veiledning basert på oppgitt informasjon, ikke juridisk rådgivning.";
      const disclaimerLines = doc.splitTextToSize(disclaimer, safeWidth);
      doc.text(disclaimerLines, margin, y);

      // Footer on all pages
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setFont(useFont, "normal");
        doc.setTextColor(148, 163, 184);
        doc.text(`harjegkravpå.no - Side ${i} av ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: "center" });
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

          <button
            onClick={() => router.push("/hva-na")}
            className="w-full py-4 rounded-full bg-teal-500 text-[#0c1220] font-bold text-lg hover:bg-teal-400 transition"
          >
            Hva gjør jeg nå?
          </button>
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
