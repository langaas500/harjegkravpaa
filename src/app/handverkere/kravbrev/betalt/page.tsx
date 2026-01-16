"use client";

import React, { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle,
  FileText,
  Download,
  Copy,
  Check,
  Loader2,
  ArrowLeft,
  AlertCircle,
  Mail,
  User,
  Building,
} from "lucide-react";

interface ContactInfo {
  customerName: string;
  customerAddress: string;
  customerPostcode: string;
  customerCity: string;
  customerPhone: string;
  customerEmail: string;
  contractorName: string;
  contractorAddress: string;
  contractorPostcode: string;
  contractorCity: string;
}

function KravbrevBetaltContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [letter, setLetter] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState<"contact" | "letter">("contact");
  const [fontData, setFontData] = useState<{ regular: string; bold: string } | null>(null);
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    customerName: "",
    customerAddress: "",
    customerPostcode: "",
    customerCity: "",
    customerPhone: "",
    customerEmail: "",
    contractorName: "",
    contractorAddress: "",
    contractorPostcode: "",
    contractorCity: "",
  });
  const letterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("handverk-data");
    if (stored) {
      const parsedData = JSON.parse(stored);
      setData(parsedData);

      // Bruk strukturerte adresser direkte fra wizard
      setContactInfo({
        customerName: (parsedData.navn as string) || "",
        customerAddress: (parsedData.kundeAdresse as string) || "",
        customerPostcode: (parsedData.kundePostnummer as string) || "",
        customerCity: (parsedData.kundePoststed as string) || "",
        customerPhone: (parsedData.telefon as string) || "",
        customerEmail: (parsedData.epost as string) || "",
        contractorName: (parsedData.handverkerNavn as string) || "",
        contractorAddress: (parsedData.handverkerAdresse as string) || "",
        contractorPostcode: (parsedData.handverkerPostnummer as string) || "",
        contractorCity: (parsedData.handverkerPoststed as string) || "",
      });

      // Hent access_token fra saksdata
      if (parsedData.access_token) {
        setAccessToken(parsedData.access_token as string);
      }

      // Sjekk om vi har alle nødvendige adresser fra wizard
      const hasAllInfo = parsedData.kundeAdresse && parsedData.kundePostnummer && parsedData.kundePoststed &&
                         parsedData.handverkerAdresse && parsedData.handverkerPostnummer && parsedData.handverkerPoststed;

      if (hasAllInfo) {
        // Gå direkte til brev-generering
        setStep("letter");
        generateLetterFromWizardData(parsedData);
      }
    } else {
      setError("Fant ikke saksdata. Vennligst start på nytt.");
    }

    // Load Roboto fonts for PDF
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

  const handleContactChange = (field: keyof ContactInfo, value: string) => {
    setContactInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleContactSubmit = () => {
    if (!contactInfo.customerName || !contactInfo.customerAddress || !contactInfo.customerCity) {
      setError("Vennligst fyll ut navn og adresse");
      return;
    }

    localStorage.setItem("handverk-kravbrev-contact", JSON.stringify(contactInfo));
    setStep("letter");
    setError(null);

    if (data) {
      // Bygg fullstendige adresser for API-en
      const kundeAdresse = [
        contactInfo.customerAddress,
        `${contactInfo.customerPostcode} ${contactInfo.customerCity}`.trim()
      ].filter(Boolean).join(", ");

      const handverkerAdresse = [
        contactInfo.contractorAddress,
        `${contactInfo.contractorPostcode} ${contactInfo.contractorCity}`.trim()
      ].filter(Boolean).join(", ");

      generateLetter({
        ...data,
        navn: contactInfo.customerName,
        epost: contactInfo.customerEmail || data.epost,
        telefon: contactInfo.customerPhone || data.telefon,
        kundeAdresse,
        handverkerNavn: contactInfo.contractorName || data.handverkerNavn,
        handverkerAdresse,
      });
    }
  };

  // Generer brev med data direkte fra wizard (strukturerte adresser)
  const generateLetterFromWizardData = async (wizardData: Record<string, unknown>) => {
    setIsGenerating(true);
    setError(null);

    try {
      // Bygg fullstendige adresser for API-en
      const kundeFullAdresse = [
        wizardData.kundeAdresse,
        `${wizardData.kundePostnummer} ${wizardData.kundePoststed}`.trim()
      ].filter(Boolean).join("\n");

      const handverkerFullAdresse = [
        wizardData.handverkerAdresse,
        `${wizardData.handverkerPostnummer} ${wizardData.handverkerPoststed}`.trim()
      ].filter(Boolean).join("\n");

      const response = await fetch("/api/generate-handverk-kravbrev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...wizardData,
          kundeAdresse: kundeFullAdresse,
          handverkerAdresse: handverkerFullAdresse,
        }),
      });

      const result = await response.json();

      if (result.error) {
        setError(result.error);
        return;
      }

      setLetter(result.kravbrev);
      localStorage.setItem("handverk-kravbrev-text", result.kravbrev);
    } catch (err) {
      console.error("Generate error:", err);
      setError("Kunne ikke opprette kravbrev. Prøv igjen.");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateLetter = async (caseData: Record<string, unknown>) => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-handverk-kravbrev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(caseData),
      });

      const result = await response.json();

      if (result.error) {
        setError(result.error);
        return;
      }

      setLetter(result.kravbrev);
      localStorage.setItem("handverk-kravbrev-text", result.kravbrev);
    } catch (err) {
      console.error("Generate error:", err);
      setError("Kunne ikke opprette kravbrev. Prøv igjen.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!letter) return;

    try {
      await navigator.clipboard.writeText(letter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleDownloadTxt = () => {
    if (!letter) return;

    const blob = new Blob([letter], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kravbrev-handverker-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setHasDownloaded(true);
  };

  const handleDownloadDocx = async () => {
    if (!letter) return;

    const { Document, Packer, Paragraph, TextRun } = await import("docx");

    const paragraphs = letter.split("\n\n").map((para) => {
      const lines = para.split("\n");
      return new Paragraph({
        children: lines.flatMap((line, idx) => [
          new TextRun({ text: line }),
          ...(idx < lines.length - 1 ? [new TextRun({ break: 1 })] : []),
        ]),
        spacing: { after: 200 },
      });
    });

    const doc = new Document({
      sections: [{ children: paragraphs }],
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kravbrev-handverker-${new Date().toISOString().split("T")[0]}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setHasDownloaded(true);
  };

  const handleDownloadPdf = async () => {
    if (!letter) return;

    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({
      unit: "mm",
      format: "a4",
    });

    const fileName = `kravbrev-handverker-${new Date().toISOString().split("T")[0]}.pdf`;

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let currentPage = 1;

    // Load fonts
    if (fontData) {
      doc.addFileToVFS("Roboto-Regular.ttf", fontData.regular);
      doc.addFileToVFS("Roboto-Bold.ttf", fontData.bold);
      doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
      doc.addFont("Roboto-Bold.ttf", "Roboto", "bold");
    }

    const useFont = fontData ? "Roboto" : "helvetica";
    const fagType = Array.isArray(data?.fag) ? (data.fag as string[]).join(", ") : "Håndverkertjeneste";

    // Add header to first page
    const addHeader = (isFirstPage: boolean) => {
      doc.setFillColor(30, 41, 59);
      doc.rect(0, 0, pageWidth, isFirstPage ? 30 : 25, "F");

      if (isFirstPage) {
        // Logo
        doc.setFillColor(16, 185, 129);
        doc.roundedRect(margin, 8, 14, 14, 2, 2, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.setFont(useFont, "bold");
        doc.text("H", margin + 5, 17);

        // Title
        doc.setFontSize(18);
        doc.text("KRAVBREV", margin + 20, 17);
        doc.setFontSize(9);
        doc.setFont(useFont, "normal");
        doc.text(`Håndverkertjeneste - ${new Date().toLocaleDateString("nb-NO")}`, margin + 20, 24);
      } else {
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont(useFont, "bold");
        doc.text("KRAVBREV", margin, 16);
        doc.setFontSize(9);
        doc.setFont(useFont, "normal");
        doc.text(`Side ${currentPage}`, pageWidth - margin, 16, { align: "right" });
      }
    };

    const addFooter = () => {
      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.text("harjegkravpå.no", margin, pageHeight - 8);
      doc.text(`Side ${currentPage}`, pageWidth - margin, pageHeight - 8, { align: "right" });
    };

    const addPage = () => {
      addFooter();
      doc.addPage();
      currentPage++;
      addHeader(false);
      return 35;
    };

    // First page header
    addHeader(true);
    let y = 40;

    // Parse and render letter content
    const paragraphs = letter.replace(/\r\n/g, "\n").split("\n\n");

    doc.setFontSize(10);
    doc.setFont(useFont, "normal");
    doc.setTextColor(30, 41, 59);

    for (let p = 0; p < paragraphs.length; p++) {
      const para = paragraphs[p].trim();
      if (!para) continue;

      const lines = para.split("\n");

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Check if it's a title line (REKLAMASJON, etc.)
        const isTitle = line.startsWith("REKLAMASJON") || line.match(/^[A-ZÆØÅ\s\-–]+$/);

        if (isTitle && line.length > 3) {
          doc.setFont(useFont, "bold");
          doc.setFontSize(12);
        } else {
          doc.setFont(useFont, "normal");
          doc.setFontSize(10);
        }

        const wrapped = doc.splitTextToSize(line || " ", contentWidth);
        for (let w = 0; w < wrapped.length; w++) {
          if (y > pageHeight - 25) {
            y = addPage();
          }
          doc.text(wrapped[w], margin, y);
          y += isTitle ? 6 : 5;
        }
      }

      y += 3;
      if (y > pageHeight - 25) {
        y = addPage();
      }
    }

    // Footer on last page
    addFooter();

    doc.save(fileName);
    setHasDownloaded(true);
  };

  if (error && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <p className="text-red-400">{error}</p>
          <button
            onClick={() => router.push("/handverkere")}
            className="text-slate-400 hover:text-white transition"
          >
            Start på nytt
          </button>
        </div>
      </div>
    );
  }

  const contractorName = contactInfo.contractorName || (data?.handverkerNavn as string) || "Håndverker";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <button
        onClick={() => router.push("/handverkere")}
        className="flex items-center gap-2 text-slate-500 hover:text-white transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Tilbake til oversikt
      </button>

      <div className="flex items-center gap-4 p-4 rounded-xl border border-green-500/30 bg-green-500/10">
        <CheckCircle className="h-8 w-8 text-green-500 shrink-0" />
        <div>
          <h1 className="text-xl font-bold text-green-400">Betaling mottatt!</h1>
          <p className="text-sm text-slate-400">
            {step === "contact"
              ? "Fyll ut kontaktinfo for å lage et send-klart brev"
              : "Utarbeider ditt kravbrev..."}
          </p>
        </div>
      </div>

      {step === "contact" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <User className="h-5 w-5 text-emerald-400" />
              <h2 className="font-semibold">Din kontaktinformasjon</h2>
            </div>

            <div className="grid gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Fullt navn *</label>
                <input
                  type="text"
                  value={contactInfo.customerName}
                  onChange={(e) => handleContactChange("customerName", e.target.value)}
                  placeholder="Ola Nordmann"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-emerald-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">Adresse *</label>
                <input
                  type="text"
                  value={contactInfo.customerAddress}
                  onChange={(e) => handleContactChange("customerAddress", e.target.value)}
                  placeholder="Gateveien 123"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-emerald-500 focus:outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Postnummer *</label>
                  <input
                    type="text"
                    value={contactInfo.customerPostcode}
                    onChange={(e) => handleContactChange("customerPostcode", e.target.value)}
                    placeholder="0123"
                    maxLength={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-emerald-500 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Poststed *</label>
                  <input
                    type="text"
                    value={contactInfo.customerCity}
                    onChange={(e) => handleContactChange("customerCity", e.target.value)}
                    placeholder="Oslo"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-emerald-500 focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Telefon</label>
                  <input
                    type="tel"
                    value={contactInfo.customerPhone}
                    onChange={(e) => handleContactChange("customerPhone", e.target.value)}
                    placeholder="912 34 567"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-emerald-500 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">E-post</label>
                  <input
                    type="email"
                    value={contactInfo.customerEmail}
                    onChange={(e) => handleContactChange("customerEmail", e.target.value)}
                    placeholder="ola@example.no"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-emerald-500 focus:outline-none transition"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Building className="h-5 w-5 text-blue-400" />
              <h2 className="font-semibold">Håndverkers adresse</h2>
              {contactInfo.contractorName && (
                <span className="text-sm text-slate-500">({contactInfo.contractorName})</span>
              )}
            </div>

            <p className="text-sm text-slate-400 mb-4">
              Hvis du har håndverkers adresse, fyll den inn under. Hvis ikke, kan du la feltene stå tomme og legge det
              til manuelt senere.
            </p>

            <div className="grid gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Firma/navn</label>
                <input
                  type="text"
                  value={contactInfo.contractorName}
                  onChange={(e) => handleContactChange("contractorName", e.target.value)}
                  placeholder="Håndverker AS"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">Adresse</label>
                <input
                  type="text"
                  value={contactInfo.contractorAddress}
                  onChange={(e) => handleContactChange("contractorAddress", e.target.value)}
                  placeholder="Verkstedveien 456"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Postnummer</label>
                  <input
                    type="text"
                    value={contactInfo.contractorPostcode}
                    onChange={(e) => handleContactChange("contractorPostcode", e.target.value)}
                    placeholder="0456"
                    maxLength={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Poststed</label>
                  <input
                    type="text"
                    value={contactInfo.contractorCity}
                    onChange={(e) => handleContactChange("contractorCity", e.target.value)}
                    placeholder="Oslo"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition"
                  />
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-3 p-4 rounded-xl border border-red-500/30 bg-red-500/10">
              <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <button
            onClick={handleContactSubmit}
            className="w-full py-4 rounded-full bg-teal-500 text-[#0c1220] font-bold text-lg hover:bg-teal-400 transition"
          >
            Lag kravbrev
          </button>
        </div>
      )}

      {step === "letter" && (
        <>
          <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-slate-400" />
                <span className="font-medium">Ditt kravbrev</span>
              </div>

              {letter && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setStep("contact")}
                    className="px-3 py-1.5 rounded-lg text-sm border border-white/10 hover:border-white/30 transition"
                  >
                    Endre info
                  </button>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border border-white/10 hover:border-white/30 transition"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-green-500" />
                        Kopiert!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Kopier
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            <div ref={letterRef} className="p-6 min-h-[400px] max-h-[600px] overflow-y-auto">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                  <p className="text-slate-400">Konstruerer kravbrev...</p>
                  <p className="text-xs text-slate-600">Vent litt</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                  <AlertCircle className="h-8 w-8 text-red-500" />
                  <p className="text-red-400">{error}</p>
                  <button
                    onClick={() => data && generateLetter({ ...data, contactInfo })}
                    className="px-4 py-2 rounded-lg border border-white/10 hover:border-white/30 transition"
                  >
                    Prøv igjen
                  </button>
                </div>
              ) : letter ? (
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-300">
                  {letter}
                </pre>
              ) : null}
            </div>
          </div>

          {letter && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleDownloadDocx}
                  className="flex items-center justify-center gap-2 p-4 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition"
                >
                  <Download className="h-5 w-5" />
                  <span>Last ned .docx</span>
                </button>

                <button
                  onClick={handleDownloadTxt}
                  className="flex items-center justify-center gap-2 p-4 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition"
                >
                  <Download className="h-5 w-5" />
                  <span>Last ned .txt</span>
                </button>
              </div>

              <button
                onClick={handleDownloadPdf}
                className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition"
              >
                <Download className="h-5 w-5" />
                <span>Last ned PDF</span>
              </button>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-slate-400 mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <p className="font-medium text-sm">Slik sender du brevet</p>
                    <ul className="text-xs text-slate-400 space-y-1">
                      <li>- E-post: Send som vedlegg og be om lesebekreftelse</li>
                      <li>- Rekommandert post: Gir dokumentasjon på at brevet er mottatt</li>
                      <li>- Ta vare på kopi: Lagre alltid en kopi av alt du sender</li>
                    </ul>
                  </div>
                </div>
              </div>

              {hasDownloaded && (
                <button
                  onClick={() => router.push("/hva-na")}
                  className="w-full py-4 rounded-full bg-teal-500 text-[#0c1220] font-bold text-lg hover:bg-teal-400 transition"
                >
                  Hva gjør jeg nå?
                </button>
              )}

              {accessToken && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
                  <p className="text-sm text-slate-300">
                    Du kan komme tilbake til denne saken senere via denne lenken.
                    Lagre den hvis du vil ha tilgang til rapporten og kravbrevet igjen.
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

              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                <p className="text-sm text-amber-200">
                  <strong>Hva skjer nå?</strong> Håndverkeren har 14 dager på seg til å svare. Hvis du ikke får svar eller
                  tilbudet er uakseptabelt, kan du klage til{" "}
                  <a
                    href="https://www.forbrukerradet.no"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-white"
                  >
                    Forbrukerrådet
                  </a>
                  .
                </p>
              </div>

              <div className="text-center text-xs text-slate-600 pt-4">
                <p>
                  Veiledende dokument utarbeidet av harjegkravpå.no.
                  <br />
                  Ikke juridisk rådgivning. Kontakt advokat for bindende råd.
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function HandverkKravbrevBetaltPage() {
  return (
    <main className="bg-nordic text-white">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        }
      >
        <KravbrevBetaltContent />
      </Suspense>
    </main>
  );
}
