"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jsPDF } from "jspdf";
import mammoth from "mammoth";
import {
  ArrowLeft,
  Download,
  Loader2,
  CheckCircle,
  FileText,
  AlertCircle,
} from "lucide-react";
import {
  StoredDocument,
  DocumentCategory,
  CATEGORY_LABELS,
  getAllDocuments,
} from "@/lib/documentStorage";

const CATEGORY_ORDER: DocumentCategory[] = [
  "kontrakt",
  "rapport",
  "verksted",
  "bilder",
  "kommunikasjon",
  "feilkoder",
  "annet",
];

interface ExtractedContent {
  text: string;
  images: { data: string; width: number; height: number }[];
}

export default function GenererPDFPage() {
  const router = useRouter();
  const [documents, setDocuments] = useState<StoredDocument[]>([]);
  const [kravbrev, setKravbrev] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [logoData, setLogoData] = useState<string | null>(null);

  useEffect(() => {
    loadData();
    loadLogo();
  }, []);

  const loadLogo = async () => {
    try {
      const response = await fetch("/logo.png");
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = () => {
        setLogoData(reader.result as string);
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error("Could not load logo:", err);
    }
  };

  const loadData = async () => {
    try {
      const docs = await getAllDocuments();
      setDocuments(docs);

      const storedKravbrev = localStorage.getItem("kravbrev-text");
      setKravbrev(storedKravbrev);
    } catch (err) {
      console.error("Failed to load data:", err);
      setError("Kunne ikke laste data");
    } finally {
      setIsLoading(false);
    }
  };

  const getDocumentsByCategory = (category: DocumentCategory) => {
    return documents.filter((doc) => doc.category === category);
  };

  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = src;
    });
  };

  const extractWordContent = async (buffer: ArrayBuffer): Promise<ExtractedContent> => {
    const images: { data: string; width: number; height: number }[] = [];

    try {
      const result = await mammoth.convertToHtml({
        arrayBuffer: buffer,
        convertImage: mammoth.images.imgElement(async (image) => {
          const imageBuffer = await image.read();
          const base64 = btoa(
            new Uint8Array(imageBuffer).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const mimeType = image.contentType || "image/png";
          const dataUrl = `data:${mimeType};base64,${base64}`;

          try {
            const img = await loadImage(dataUrl);
            images.push({
              data: dataUrl,
              width: img.width,
              height: img.height,
            });
          } catch {
            images.push({ data: dataUrl, width: 400, height: 300 });
          }

          return { src: dataUrl };
        }),
      });

      const text = result.value
        .replace(/<\/p>/gi, "\n\n")
        .replace(/<\/h[1-6]>/gi, "\n\n")
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/li>/gi, "\n")
        .replace(/<\/tr>/gi, "\n")
        .replace(/<\/td>/gi, "  ")
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

      return { text, images };
    } catch (err) {
      console.error("Word extraction error:", err);
      return { text: "Kunne ikke lese Word-dokument", images: [] };
    }
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    setProgress(0);
    setProgressText("Starter...");
    setError(null);

    try {
      const doc = new jsPDF("p", "mm", "a4");
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;
      let currentPage = 1;

      doc.setFont("helvetica", "normal");

      const addHeader = (title: string) => {
        // Header bakgrunn
        doc.setFillColor(30, 41, 59);
        doc.rect(0, 0, pageWidth, 22, "F");

        // Logo hvis tilgjengelig
        if (logoData) {
          try {
            doc.addImage(logoData, "PNG", margin, 3, 16, 16);
          } catch (e) {
            console.error("Logo error:", e);
          }
        }

        // Tittel
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(title, logoData ? margin + 20 : margin, 13);

        // Sidetall
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.text(`Side ${currentPage}`, pageWidth - margin, 13, { align: "right" });
      };

      const addFooter = () => {
        doc.setFontSize(7);
        doc.setTextColor(150, 150, 150);
        doc.text("harjegkravpå.no", margin, pageHeight - 12);
        doc.text(
          "Veiledende dokument - ikke juridisk rådgivning",
          pageWidth / 2,
          pageHeight - 12,
          { align: "center" }
        );
        doc.text(
          new Date().toLocaleDateString("nb-NO"),
          pageWidth - margin,
          pageHeight - 12,
          { align: "right" }
        );
      };

      const addNewPage = (title: string): number => {
        doc.addPage();
        currentPage++;
        addHeader(title);
        addFooter();
        return 32;
      };

      const wrapText = (text: string, maxWidth: number, fontSize: number): string[] => {
        doc.setFontSize(fontSize);
        doc.setFont("helvetica", "normal");

        const allLines: string[] = [];
        const paragraphs = text.split("\n");

        for (const paragraph of paragraphs) {
          if (paragraph.trim() === "") {
            allLines.push("");
            continue;
          }

          const lines = doc.splitTextToSize(paragraph, maxWidth);

          for (const line of lines) {
            const lineWidth = doc.getTextWidth(line);
            if (lineWidth > maxWidth) {
              let currentLine = "";
              const chars = line.split("");

              for (const char of chars) {
                const testLine = currentLine + char;
                if (doc.getTextWidth(testLine) > maxWidth) {
                  if (currentLine) allLines.push(currentLine);
                  currentLine = char;
                } else {
                  currentLine = testLine;
                }
              }
              if (currentLine) allLines.push(currentLine);
            } else {
              allLines.push(line);
            }
          }
        }

        return allLines;
      };

      const addTextWithPageBreaks = (
        text: string,
        startY: number,
        fontSize: number,
        headerTitle: string,
        lineHeight?: number
      ): number => {
        const lines = wrapText(text, contentWidth, fontSize);
        const actualLineHeight = lineHeight || fontSize * 0.5;

        doc.setTextColor(30, 41, 59);
        doc.setFontSize(fontSize);
        doc.setFont("helvetica", "normal");

        let y = startY;

        for (const line of lines) {
          if (y > pageHeight - 25) {
            y = addNewPage(headerTitle);
            doc.setTextColor(30, 41, 59);
            doc.setFontSize(fontSize);
            doc.setFont("helvetica", "normal");
          }

          if (line === "") {
            y += actualLineHeight * 0.5;
          } else {
            doc.text(line, margin, y);
            y += actualLineHeight;
          }
        }

        return y;
      };

      const addImageToPDF = async (
        imgData: string,
        startY: number,
        maxImgWidth: number,
        maxImgHeight: number,
        headerTitle: string
      ): Promise<number> => {
        try {
          const img = await loadImage(imgData);

          let finalWidth = img.width;
          let finalHeight = img.height;

          const pxToMm = 0.264583;
          finalWidth *= pxToMm;
          finalHeight *= pxToMm;

          const ratio = Math.min(maxImgWidth / finalWidth, maxImgHeight / finalHeight, 1);
          finalWidth *= ratio;
          finalHeight *= ratio;

          let y = startY;

          if (y + finalHeight > pageHeight - 25) {
            y = addNewPage(headerTitle);
          }

          const xOffset = margin + (contentWidth - finalWidth) / 2;
          doc.addImage(imgData, "JPEG", xOffset, y, finalWidth, finalHeight);

          return y + finalHeight + 5;
        } catch {
          return startY;
        }
      };

      // === PAGE 1: Kravbrev ===
      setProgress(5);
      setProgressText("Legger til kravbrev...");
      addHeader("KRAVBREV");
      addFooter();

      if (kravbrev) {
        addTextWithPageBreaks(kravbrev, 32, 10, "KRAVBREV (fortsettelse)", 5);
      } else {
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(11);
        doc.text("Kravbrev ikke generert ennå.", margin, 40);
        doc.text("Gå til kravbrev-siden for å generere.", margin, 48);
      }

      // === PAGE 2: Vedleggsliste ===
      setProgress(10);
      setProgressText("Lager vedleggsoversikt...");
      let y = addNewPage("VEDLEGGSOVERSIKT");

      doc.setTextColor(30, 41, 59);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("Vedlagte dokumenter:", margin, y);
      y += 10;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");

      let vedleggNr = 1;
      for (const category of CATEGORY_ORDER) {
        const categoryDocs = getDocumentsByCategory(category);
        if (categoryDocs.length === 0) continue;

        if (y > pageHeight - 40) {
          y = addNewPage("VEDLEGGSOVERSIKT (fortsettelse)");
        }

        doc.setFont("helvetica", "bold");
        doc.text(`${CATEGORY_LABELS[category]}:`, margin, y);
        y += 6;
        doc.setFont("helvetica", "normal");

        for (const d of categoryDocs) {
          if (y > pageHeight - 30) {
            y = addNewPage("VEDLEGGSOVERSIKT (fortsettelse)");
          }
          let fileName = d.fileName;
          const maxFileNameWidth = contentWidth - 15;
          while (doc.getTextWidth(`  ${vedleggNr}. ${fileName}`) > maxFileNameWidth && fileName.length > 10) {
            fileName = fileName.slice(0, -4) + "...";
          }
          doc.text(`  ${vedleggNr}. ${fileName}`, margin, y);
          y += 5;
          vedleggNr++;
        }
        y += 4;
      }

      if (documents.length === 0) {
        doc.setTextColor(100, 100, 100);
        doc.text("Ingen vedlegg lastet opp.", margin, y);
      }

      // === VEDLEGG ===
      setProgress(20);

      const totalDocs = documents.length;
      let processedDocs = 0;

      for (const category of CATEGORY_ORDER) {
        const categoryDocs = getDocumentsByCategory(category);

        for (const storedDoc of categoryDocs) {
          processedDocs++;
          const progressPercent = 20 + Math.round((processedDocs / totalDocs) * 70);
          setProgress(progressPercent);
          setProgressText(`Behandler: ${storedDoc.fileName}`);

          doc.addPage();
          currentPage++;

          // Header med logo
          doc.setFillColor(30, 41, 59);
          doc.rect(0, 0, pageWidth, 25, "F");

          if (logoData) {
            try {
              doc.addImage(logoData, "PNG", margin, 4, 14, 14);
            } catch (e) {
              console.error("Logo error:", e);
            }
          }

          doc.setTextColor(255, 255, 255);
          doc.setFontSize(10);
          doc.setFont("helvetica", "bold");
          doc.text(
            `VEDLEGG ${processedDocs}: ${CATEGORY_LABELS[storedDoc.category]}`,
            logoData ? margin + 18 : margin,
            10
          );
          doc.setFontSize(9);
          doc.setFont("helvetica", "normal");

          let headerFileName = storedDoc.fileName;
          const maxHeaderWidth = contentWidth - 30;
          while (doc.getTextWidth(headerFileName) > maxHeaderWidth && headerFileName.length > 10) {
            headerFileName = headerFileName.slice(0, -4) + "...";
          }
          doc.text(headerFileName, logoData ? margin + 18 : margin, 18);
          doc.text(`Side ${currentPage}`, pageWidth - margin, 14, { align: "right" });

          addFooter();

          let contentY = 35;
          const headerTitle = `VEDLEGG ${processedDocs} (fortsettelse)`;

          // === BILDER ===
          if (storedDoc.fileType.startsWith("image/")) {
            try {
              const base64 = arrayBufferToBase64(storedDoc.fileData);
              const imgData = `data:${storedDoc.fileType};base64,${base64}`;

              const img = await loadImage(imgData);

              const maxWidth = contentWidth;
              const maxHeight = pageHeight - contentY - 25;

              let finalWidth = img.width;
              let finalHeight = img.height;

              const ratio = Math.min(maxWidth / finalWidth, maxHeight / finalHeight, 1);
              finalWidth *= ratio;
              finalHeight *= ratio;

              const xOffset = margin + (contentWidth - finalWidth) / 2;

              doc.addImage(imgData, "JPEG", xOffset, contentY, finalWidth, finalHeight);
            } catch (imgError) {
              console.error("Image error:", imgError);
              doc.setTextColor(200, 100, 100);
              doc.setFontSize(12);
              doc.text("Kunne ikke laste bilde", margin, contentY + 20);
            }
          }
          // === WORD-DOKUMENTER ===
          else if (
            storedDoc.fileType.includes("word") ||
            storedDoc.fileType.includes("document") ||
            storedDoc.fileName.endsWith(".docx") ||
            storedDoc.fileName.endsWith(".doc")
          ) {
            try {
              const { text, images } = await extractWordContent(storedDoc.fileData);

              contentY = addTextWithPageBreaks(text, contentY, 10, headerTitle, 5);

              if (images.length > 0) {
                contentY += 10;

                for (let i = 0; i < images.length; i++) {
                  const image = images[i];

                  if (contentY > pageHeight - 80) {
                    contentY = addNewPage(headerTitle);
                  }

                  doc.setTextColor(100, 116, 139);
                  doc.setFontSize(8);
                  doc.text(`Bilde ${i + 1} fra dokumentet:`, margin, contentY);
                  contentY += 5;

                  contentY = await addImageToPDF(
                    image.data,
                    contentY,
                    contentWidth,
                    pageHeight - contentY - 30,
                    headerTitle
                  );

                  contentY += 5;
                }
              }
            } catch {
              doc.setTextColor(100, 100, 100);
              doc.text("Kunne ikke lese Word-dokument", margin, contentY);
            }
          }
          // === PDF ===
          else if (storedDoc.fileType === "application/pdf") {
            doc.setFillColor(254, 243, 199);
            doc.roundedRect(margin, contentY, contentWidth, 70, 3, 3, "F");

            doc.setTextColor(133, 77, 14);
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.text("PDF-dokument vedlagt", margin + 10, contentY + 20);

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text(`Filnavn: ${storedDoc.fileName.slice(0, 50)}`, margin + 10, contentY + 35);
            doc.text(
              `Størrelse: ${(storedDoc.fileData.byteLength / 1024).toFixed(1)} KB`,
              margin + 10,
              contentY + 45
            );

            doc.setFontSize(9);
            doc.setTextColor(113, 63, 18);
            doc.text(
              "Merk: PDF-filer kan ikke vises direkte her.",
              margin + 10,
              contentY + 58
            );
            doc.text("Originalfilen bør sendes som separat vedlegg.", margin + 10, contentY + 65);
          }
          // === TEKSTFILER ===
          else if (
            storedDoc.fileType === "text/plain" ||
            storedDoc.fileType === "text/html"
          ) {
            try {
              const decoder = new TextDecoder("utf-8");
              const text = decoder.decode(storedDoc.fileData);
              addTextWithPageBreaks(text, contentY, 9, headerTitle, 4);
            } catch {
              doc.setTextColor(100, 100, 100);
              doc.text("Kunne ikke lese tekstfil", margin, contentY);
            }
          }
          // === EXCEL ===
          else if (
            storedDoc.fileType.includes("sheet") ||
            storedDoc.fileType.includes("excel") ||
            storedDoc.fileName.endsWith(".xlsx") ||
            storedDoc.fileName.endsWith(".xls")
          ) {
            doc.setFillColor(220, 252, 231);
            doc.roundedRect(margin, contentY, contentWidth, 70, 3, 3, "F");

            doc.setTextColor(22, 101, 52);
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.text("Excel-regneark vedlagt", margin + 10, contentY + 20);

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text(`Filnavn: ${storedDoc.fileName.slice(0, 50)}`, margin + 10, contentY + 35);
            doc.text(
              `Størrelse: ${(storedDoc.fileData.byteLength / 1024).toFixed(1)} KB`,
              margin + 10,
              contentY + 45
            );

            doc.setFontSize(9);
            doc.text("Originalfilen bør sendes som separat vedlegg.", margin + 10, contentY + 58);
          }
          // === ANDRE FILER ===
          else {
            doc.setFillColor(241, 245, 249);
            doc.roundedRect(margin, contentY, contentWidth, 70, 3, 3, "F");

            doc.setTextColor(71, 85, 105);
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.text("Fil vedlagt", margin + 10, contentY + 20);

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text(`Filnavn: ${storedDoc.fileName.slice(0, 50)}`, margin + 10, contentY + 35);
            doc.text(`Type: ${storedDoc.fileType || "Ukjent"}`, margin + 10, contentY + 45);
            doc.text(
              `Størrelse: ${(storedDoc.fileData.byteLength / 1024).toFixed(1)} KB`,
              margin + 10,
              contentY + 55
            );
          }
        }
      }

      // === SISTE SIDE: Disclaimer ===
      doc.addPage();
      currentPage++;
      addHeader("INFORMASJON");
      addFooter();

      doc.setTextColor(30, 41, 59);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("Viktig informasjon", margin, 40);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const disclaimerText = `Dette dokumentet er utarbeidet av harjegkravpå.no som et hjelpemiddel for forbrukere i forbindelse med reklamasjon på bruktbilkjøp.

Dokumentet er veiledende og utgjør ikke juridisk rådgivning. Vurderingene er basert på opplysninger gitt av kjøper og alminnelige prinsipper i forbrukerkjøpsloven.

Vi anbefaler at du:
- Kontakter en advokat dersom saken er kompleks eller beløpene er store
- Tar kontakt med Forbrukerrådet for gratis veiledning
- Dokumenterer all kommunikasjon med selger skriftlig

harjegkravpå.no påtar seg ikke ansvar for utfallet av saken eller for eventuelle feil i vurderingen.

Ved spørsmål, kontakt oss på post@harjegkravpå.no`;

      addTextWithPageBreaks(disclaimerText, 50, 10, "INFORMASJON", 5);

      setProgress(95);
      setProgressText("Lagrer PDF...");

      const today = new Date().toISOString().split("T")[0];
      doc.save(`kravbrev-med-vedlegg-${today}.pdf`);

      setProgress(100);
      setProgressText("Ferdig!");
      setSuccess(true);
    } catch (err) {
      console.error("PDF generation error:", err);
      setError("Kunne ikke generere PDF. Prøv igjen.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-2xl px-4 py-10 space-y-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Tilbake
        </button>

        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <FileText className="h-8 w-8 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold">Generer samlet PDF</h1>
          <p className="text-slate-400">
            Kravbrev og alle vedlegg i ett dokument
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-4">
          <h2 className="font-semibold">Innhold i PDF:</h2>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {kravbrev ? (
                <CheckCircle className="h-5 w-5 text-emerald-400" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-400" />
              )}
              <span className={kravbrev ? "text-white" : "text-amber-400"}>
                Kravbrev {kravbrev ? "(klar)" : "(ikke generert)"}
              </span>
            </div>

            {CATEGORY_ORDER.map((category) => {
              const count = getDocumentsByCategory(category).length;
              if (count === 0) return null;
              return (
                <div key={category} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                  <span>
                    {CATEGORY_LABELS[category]} ({count})
                  </span>
                </div>
              );
            })}

            {documents.length === 0 && (
              <div className="flex items-center gap-3 text-slate-500">
                <AlertCircle className="h-5 w-5" />
                <span>Ingen vedlegg lastet opp</span>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-white/10 text-sm text-slate-400">
            Totalt: {documents.length} vedlegg
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl border border-red-500/30 bg-red-500/10">
            <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-3 p-4 rounded-xl border border-green-500/30 bg-green-500/10">
            <CheckCircle className="h-5 w-5 text-green-400 shrink-0" />
            <p className="text-sm text-green-400">PDF generert og lastet ned!</p>
          </div>
        )}

        {isGenerating && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400 truncate">{progressText}</span>
              <span className="text-emerald-400">{progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-slate-100 transition disabled:opacity-60"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Genererer...
            </>
          ) : (
            <>
              <Download className="h-5 w-5" />
              Last ned samlet PDF
            </>
          )}
        </button>

        {!kravbrev && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-200">
              <strong>Tips:</strong> Du har ikke generert kravbrev ennå.{" "}
              <button
                onClick={() => router.push("/bilkjop/kravbrev")}
                className="underline hover:text-white"
              >
                Gå til kravbrev-siden
              </button>{" "}
              for å lage et først.
            </p>
          </div>
        )}

        {/* Disclaimer på siden */}
        <div className="text-center text-xs text-slate-600 pt-4 border-t border-white/5">
          <p>
            Veiledende dokument utarbeidet av harjegkravpå.no.
            <br />
            Ikke juridisk rådgivning. Kontakt advokat for bindende råd.
          </p>
        </div>
      </div>
    </main>
  );
}