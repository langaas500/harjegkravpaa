"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  FileText,
  Download,
  Copy,
  Check,
  Loader2,
  ArrowLeft,
  AlertCircle,
  FolderPlus,
  User,
  Building,
  ChevronDown,
} from "lucide-react";
import { generateReportPdf } from "@/lib/bilkjop/generateReportPdf";

function track(event: string, product?: string) {
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, category: "bilkjop", product, ts: Date.now() }),
  }).catch(() => {});
}

interface ContactInfo {
  buyerName: string;
  buyerAddress: string;
  buyerPostcode: string;
  buyerCity: string;
  buyerPhone: string;
  buyerEmail: string;
  sellerAddress: string;
  sellerPostcode: string;
  sellerCity: string;
}

export default function KravbrevBetaltPage() {
  const router = useRouter();
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [letter, setLetter] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [entitlement, setEntitlement] = useState<"loading" | "verified" | "denied" | "error">("loading");
  const [step, setStep] = useState<"contact" | "letter">("contact");
  const [fontData, setFontData] = useState<{ regular: string; bold: string } | null>(null);
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    buyerName: "",
    buyerAddress: "",
    buyerPostcode: "",
    buyerCity: "",
    buyerPhone: "",
    buyerEmail: "",
    sellerAddress: "",
    sellerPostcode: "",
    sellerCity: "",
  });
  const letterRef = useRef<HTMLDivElement>(null);
  const contactAnchorRef = useRef<HTMLDivElement>(null);
  const resultAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initData = (parsedData: Record<string, unknown>) => {
      setData(parsedData);
      // Migrate: if old LS has access_token, set session cookie then remove it
      if (parsedData.access_token) {
        fetch("/api/case/resolve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token: parsedData.access_token }),
        }).catch(() => {});
        const { access_token: _, ...clean } = parsedData;
        localStorage.setItem("bilkjop-data", JSON.stringify(clean));
      }
      const storedContact = localStorage.getItem("kravbrev-contact");
      if (storedContact) {
        setContactInfo(JSON.parse(storedContact));
      } else {
        setContactInfo({
          buyerName: (parsedData.buyerName as string) || "",
          buyerAddress: "",
          buyerPostcode: "",
          buyerCity: "",
          buyerPhone: "",
          buyerEmail: "",
          sellerAddress: "",
          sellerPostcode: "",
          sellerCity: "",
        });
      }
    };

    const stored = localStorage.getItem("bilkjop-data");
    if (stored) {
      initData(JSON.parse(stored));
    } else {
      // Fallback: recover case data from Supabase using URL token
      const params = new URLSearchParams(window.location.search);
      const urlToken = params.get("token");
      if (urlToken) {
        // Set cookie via resolve, then recover data
        fetch("/api/case/resolve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token: urlToken }),
        }).catch(() => {});
        fetch(`/api/sak/${urlToken}`)
          .then((res) => res.json())
          .then((result) => {
            if (result.payload) {
              const recovered = {
                ...result.payload,
                outcome: result.outcome,
                caseId: result.id,
              } as Record<string, unknown>;
              localStorage.setItem("bilkjop-data", JSON.stringify(recovered));
              initData(recovered);
            } else {
              setError("Fant ikke saksdata. Vennligst start på nytt.");
            }
          })
          .catch(() => {
            setError("Fant ikke saksdata. Vennligst start på nytt.");
          });
      } else {
        setError("Fant ikke saksdata. Vennligst start på nytt.");
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
        // Fall back to helvetica
      }
    };
    loadFonts();
  }, []);

  // Entitlement verification via session cookie
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 4;
    let timeoutId: NodeJS.Timeout;
    let cancelled = false;

    const verify = () => {
      attempts++;
      fetch("/api/verify-entitlement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productType: "KRAVBREV", case_type: "BIL" }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (cancelled) return;
          if (result.ok) {
            setEntitlement("verified");
            track("checkout_success", "KRAVBREV");
          } else if (attempts < maxAttempts) {
            timeoutId = setTimeout(verify, 2000);
          } else {
            setEntitlement("denied");
          }
        })
        .catch(() => {
          if (cancelled) return;
          if (attempts < maxAttempts) {
            timeoutId = setTimeout(verify, 2000);
          } else {
            setEntitlement("error");
          }
        });
    };

    verify();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  // Auto-scroll to contact form when entitlement is verified
  useEffect(() => {
    if (entitlement === "verified" && step === "contact" && contactAnchorRef.current) {
      contactAnchorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [entitlement, step]);

  // Auto-scroll to result when letter is ready
  useEffect(() => {
    if (letter && !isGenerating && resultAnchorRef.current) {
      resultAnchorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [letter, isGenerating]);

  const handleContactChange = (field: keyof ContactInfo, value: string) => {
    setContactInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleContactSubmit = () => {
    if (!contactInfo.buyerName || !contactInfo.buyerAddress || !contactInfo.buyerCity) {
      setError("Vennligst fyll ut navn og adresse");
      return;
    }

    localStorage.setItem("kravbrev-contact", JSON.stringify(contactInfo));
    setStep("letter");
    setError(null);

    if (data) {
      generateLetter({ ...data, contactInfo });
    }
  };

  const generateLetter = async (caseData: Record<string, unknown>) => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-kravbrev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(caseData),
      });

      const result = await response.json();

      if (result.error) {
        setError(result.error);
        return;
      }

      setLetter(result.letter);
      setEmailSent(!!result.emailSent);
      localStorage.setItem("kravbrev-text", result.letter);
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
      track("copy_letter", "KRAVBREV");
      setCopied(true);
      setHasCopied(true);
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
    const vehicle = data?.vehicle as Record<string, string> | undefined;
    link.download = `kravbrev-${vehicle?.make || "bil"}-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setHasDownloaded(true);
  };

  const handleDownloadDocx = async () => {
    if (!letter) return;
    track("download_docx", "KRAVBREV");

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
    const vehicle = data?.vehicle as Record<string, string> | undefined;
    link.download = `kravbrev-${vehicle?.make || "bil"}-${new Date().toISOString().split("T")[0]}.docx`;
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

    const vehicle = data?.vehicle as Record<string, string> | undefined;
    const fileName = `kravbrev-${vehicle?.make || "bil"}-${new Date().toISOString().split("T")[0]}.pdf`;

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let currentPage = 1;

    if (fontData) {
      doc.addFileToVFS("Roboto-Regular.ttf", fontData.regular);
      doc.addFileToVFS("Roboto-Bold.ttf", fontData.bold);
      doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
      doc.addFont("Roboto-Bold.ttf", "Roboto", "bold");
    }

    const useFont = fontData ? "Roboto" : "helvetica";
    const isDealer = data?.sellerType === "DEALER";

    const addHeader = (isFirstPage: boolean) => {
      doc.setFillColor(30, 41, 59);
      doc.rect(0, 0, pageWidth, isFirstPage ? 30 : 25, "F");

      if (isFirstPage) {
        doc.setFillColor(16, 185, 129);
        doc.roundedRect(margin, 8, 14, 14, 2, 2, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.setFont(useFont, "bold");
        doc.text("H", margin + 5, 17);

        doc.setFontSize(18);
        doc.text("KRAVBREV", margin + 20, 17);
        doc.setFontSize(9);
        doc.setFont(useFont, "normal");
        doc.text(`${isDealer ? "Forhandler" : "Privat"} - ${new Date().toLocaleDateString("nb-NO")}`, margin + 20, 24);
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

    addHeader(true);
    let y = 40;

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

    addFooter();
    doc.save(fileName);
    setHasDownloaded(true);
  };

  const handleDownloadReportPdf = async () => {
    if (!data) return;
    setIsGeneratingReport(true);
    try {
      await generateReportPdf(data, fontData);
    } catch (err) {
      console.error("Report PDF error:", err);
      alert("Kunne ikke generere PDF-vurdering. Prøv igjen.");
    } finally {
      setIsGeneratingReport(false);
    }
  };

  if (error && !data) {
    return (
      <main className="bg-[#0a0f0d] text-white min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(16,185,129,0.04) 0%, transparent 70%)" }} />
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
            <p className="text-red-400">{error}</p>
            <button
              onClick={() => router.push("/bilkjop")}
              className="text-slate-500 hover:text-white transition"
            >
              Start på nytt
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (entitlement !== "verified") {
    return (
      <main className="bg-[#0a0f0d] text-white min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(16,185,129,0.04) 0%, transparent 70%)" }} />
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            {entitlement === "loading" && (
              <>
                <Loader2 className="h-8 w-8 animate-spin text-emerald-400 mx-auto" />
                <p className="text-slate-400">Verifiserer betaling...</p>
              </>
            )}
            {entitlement === "denied" && (
              <>
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
                <p className="text-lg font-semibold">Betaling ikke funnet</p>
                <p className="text-sm text-slate-400">Vi fant ingen gyldig betaling for kravbrev knyttet til denne saken.</p>
                <button
                  onClick={() => router.push("/bilkjop")}
                  className="px-6 py-3 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition"
                >
                  Gå til betaling
                </button>
              </>
            )}
            {entitlement === "error" && (
              <>
                <AlertCircle className="h-12 w-12 text-amber-500 mx-auto" />
                <p className="text-lg font-semibold">Kunne ikke verifisere</p>
                <p className="text-sm text-slate-400">Det oppstod en feil. Prøv å laste siden på nytt.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 rounded-xl border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.03] transition"
                >
                  Prøv igjen
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    );
  }

  const vehicle = data?.vehicle as Record<string, string> | undefined;
  const sellerName = vehicle?.seller || "Selger";

  const inputClasses = "w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition";
  const inputClassesBlue = "w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-slate-600 focus:border-blue-500/40 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition";

  return (
    <main className="bg-[#0a0f0d] text-white min-h-screen relative overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(16,185,129,0.04) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.025) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10">
        <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
          <button
            onClick={() => router.push("/bilkjop")}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Tilbake til oversikt
          </button>

          {/* Success banner */}
          <div className="flex items-center gap-4 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.08]">
            <CheckCircle className="h-8 w-8 text-emerald-400 shrink-0" />
            <div>
              <h1 className="text-xl font-bold text-emerald-400">Betaling mottatt!</h1>
              <p className="text-sm text-slate-400">
                {step === "contact"
                  ? "Fyll ut kontaktinfo for å lage et send-klart brev"
                  : "Utarbeider ditt kravbrev..."}
              </p>
            </div>
          </div>

          {/* ═══════════ CONTACT STEP ═══════════ */}
          {step === "contact" && (
            <div className="space-y-6">
              <div ref={contactAnchorRef} className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4">
                <p className="text-sm font-bold text-emerald-400">Steg 1 av 2</p>
                <p className="text-sm text-slate-300 mt-1">Fyll inn kontaktinfo så lager vi et ferdig kravbrev du kan sende.</p>
                <p className="text-xs text-slate-500 mt-1">Tar ca. 2 minutter.</p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <User className="h-5 w-5 text-emerald-400" />
                  <h2 className="font-semibold">Din kontaktinformasjon</h2>
                </div>

                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Fullt navn *</label>
                    <input
                      type="text"
                      value={contactInfo.buyerName}
                      onChange={(e) => handleContactChange("buyerName", e.target.value)}
                      placeholder="Ola Nordmann"
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Adresse *</label>
                    <input
                      type="text"
                      value={contactInfo.buyerAddress}
                      onChange={(e) => handleContactChange("buyerAddress", e.target.value)}
                      placeholder="Gateveien 123"
                      className={inputClasses}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Postnummer *</label>
                      <input
                        type="text"
                        value={contactInfo.buyerPostcode}
                        onChange={(e) => handleContactChange("buyerPostcode", e.target.value)}
                        placeholder="0123"
                        maxLength={4}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Poststed *</label>
                      <input
                        type="text"
                        value={contactInfo.buyerCity}
                        onChange={(e) => handleContactChange("buyerCity", e.target.value)}
                        placeholder="Oslo"
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Telefon</label>
                      <input
                        type="tel"
                        value={contactInfo.buyerPhone}
                        onChange={(e) => handleContactChange("buyerPhone", e.target.value)}
                        placeholder="912 34 567"
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">E-post</label>
                      <input
                        type="email"
                        value={contactInfo.buyerEmail}
                        onChange={(e) => handleContactChange("buyerEmail", e.target.value)}
                        placeholder="ola@example.no"
                        className={inputClasses}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Building className="h-5 w-5 text-blue-400" />
                  <h2 className="font-semibold">Selgers adresse</h2>
                  <span className="text-sm text-slate-500">({sellerName})</span>
                </div>

                <p className="text-sm text-slate-400 mb-4">
                  Hvis du har selgers adresse, fyll den inn under. Hvis ikke, kan du la feltene stå tomme og legge det
                  til manuelt senere.
                </p>

                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Adresse</label>
                    <input
                      type="text"
                      value={contactInfo.sellerAddress}
                      onChange={(e) => handleContactChange("sellerAddress", e.target.value)}
                      placeholder="Bilveien 456"
                      className={inputClassesBlue}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Postnummer</label>
                      <input
                        type="text"
                        value={contactInfo.sellerPostcode}
                        onChange={(e) => handleContactChange("sellerPostcode", e.target.value)}
                        placeholder="0456"
                        maxLength={4}
                        className={inputClassesBlue}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Poststed</label>
                      <input
                        type="text"
                        value={contactInfo.sellerCity}
                        onChange={(e) => handleContactChange("sellerCity", e.target.value)}
                        placeholder="Oslo"
                        className={inputClassesBlue}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-3 p-4 rounded-xl border border-red-500/20 bg-red-500/[0.08]">
                  <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <button
                onClick={handleContactSubmit}
                className="w-full py-4 rounded-xl bg-emerald-500 text-black font-bold text-lg hover:bg-emerald-400 transition"
              >
                Lag kravbrev
              </button>
            </div>
          )}

          {/* ═══════════ LETTER STEP ═══════════ */}
          {step === "letter" && (
            <>
              {isGenerating && (
                <div className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 space-y-3">
                  <p className="text-sm font-bold text-emerald-400">Steg 2 av 2</p>
                  <p className="text-sm text-slate-300">Genererer kravbrev...</p>
                  <div className="space-y-1.5 text-xs text-slate-500">
                    <p>Setter inn kjøpsinfo</p>
                    <p>Formulerer krav</p>
                    <p>Klargjør for utskrift</p>
                  </div>
                </div>
              )}

              <div ref={resultAnchorRef} />

              {letter && (
                <div className={`flex items-center gap-2 text-sm px-4 py-2.5 rounded-lg ${emailSent ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
                  {emailSent ? (
                    <><Check className="h-4 w-4 flex-shrink-0" /> Sak-lenke sendt til din e-post</>
                  ) : (
                    <><AlertCircle className="h-4 w-4 flex-shrink-0" /> Ingen e-post oppgitt — lagre lenken fra &quot;Flere valg&quot; under</>
                  )}
                </div>
              )}

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-slate-400" />
                    <span className="font-medium">Ditt kravbrev</span>
                  </div>

                  {letter && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setStep("contact")}
                        className="px-3 py-1.5 rounded-lg text-sm border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.03] transition"
                      >
                        Endre info
                      </button>
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.03] transition"
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 text-emerald-400" />
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
                      <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
                      <p className="text-slate-400">Konstruerer kravbrev...</p>
                      <p className="text-xs text-slate-600">Vent litt</p>
                    </div>
                  ) : error ? (
                    <div className="flex flex-col items-center justify-center h-64 gap-4">
                      <AlertCircle className="h-8 w-8 text-red-500" />
                      <p className="text-red-400">{error}</p>
                      <button
                        onClick={() => data && generateLetter({ ...data, contactInfo })}
                        className="px-4 py-2 rounded-xl border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.03] transition"
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
                <div className="space-y-4">
                  {/* ═══ KOMPAKT 1-2-3 ═══ */}
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] px-5 py-3 space-y-1.5">
                    <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Ferdig på 60 sek</p>
                    <div className="text-sm space-y-1">
                      <p><span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500 text-black font-bold text-xs mr-1.5">1</span>Kopier brevet</p>
                      <p><span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs mr-1.5">2</span>Lim inn i e-post og legg ved .docx</p>
                      <p><span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs mr-1.5">3</span>Send og sett rimelig svarfrist (ofte 14 dager)</p>
                    </div>
                  </div>

                  {/* ═══ PRIMÆR CTA: KOPIER ═══ */}
                  <button
                    onClick={handleCopy}
                    className="w-full py-5 rounded-xl bg-emerald-500 text-black font-bold text-lg hover:bg-emerald-400 transition flex items-center justify-center gap-3"
                  >
                    {copied ? (
                      <>
                        <Check className="h-6 w-6" />
                        Kopiert til utklippstavlen!
                      </>
                    ) : (
                      <>
                        <Copy className="h-6 w-6" />
                        Kopier kravbrevet
                      </>
                    )}
                  </button>

                  {/* ═══ SEND I DAG ═══ */}
                  {hasCopied && (
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5 space-y-4">
                      <p className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Send i dag</p>

                      {/* Emne */}
                      <div className="space-y-1.5">
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Emne</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-sm text-slate-300 truncate">
                            Reklamasjon – {vehicle?.make} {vehicle?.model} {vehicle?.year}
                          </div>
                          <button
                            onClick={async () => {
                              const subject = `Reklamasjon – ${vehicle?.make || ""} ${vehicle?.model || ""} ${vehicle?.year || ""}`.trim();
                              await navigator.clipboard.writeText(subject);
                              setCopiedField("subject");
                              setTimeout(() => setCopiedField(null), 2000);
                            }}
                            className="shrink-0 px-3 py-2 rounded-lg border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.03] transition text-xs"
                          >
                            {copiedField === "subject" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* E-posttekst */}
                      <div className="space-y-1.5">
                        <p className="text-xs text-slate-500 uppercase tracking-wider">E-posttekst</p>
                        <div className="flex items-start gap-2">
                          <div className="flex-1 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-sm text-slate-300">
                            Vedlagt følger formell reklamasjon. Jeg ber vennligst om tilbakemelding innen fristen angitt i brevet.
                          </div>
                          <button
                            onClick={async () => {
                              await navigator.clipboard.writeText("Vedlagt følger formell reklamasjon. Jeg ber vennligst om tilbakemelding innen fristen angitt i brevet.");
                              setCopiedField("body");
                              setTimeout(() => setCopiedField(null), 2000);
                            }}
                            className="shrink-0 px-3 py-2 rounded-lg border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.03] transition text-xs"
                          >
                            {copiedField === "body" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* Tips */}
                      <div className="text-xs text-slate-500 space-y-1">
                        <p>• Legg ved .docx-filen som vedlegg</p>
                        <p>• Be om lesebekreftelse</p>
                      </div>

                      {/* Kopier alt */}
                      <button
                        onClick={async () => {
                          const subject = `Reklamasjon – ${vehicle?.make || ""} ${vehicle?.model || ""} ${vehicle?.year || ""}`.trim();
                          await navigator.clipboard.writeText(`Emne: ${subject}\n\nVedlagt følger formell reklamasjon. Jeg ber vennligst om tilbakemelding innen fristen angitt i brevet.`);
                          setCopiedField("all");
                          setTimeout(() => setCopiedField(null), 2000);
                        }}
                        className="w-full py-3 rounded-xl border border-emerald-500/30 text-emerald-400 font-semibold hover:bg-emerald-500/10 transition flex items-center justify-center gap-2"
                      >
                        {copiedField === "all" ? (
                          <>
                            <Check className="h-4 w-4" />
                            Kopiert emne + tekst!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Kopier alt (emne + tekst)
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* ═══ SEKUNDÆR: LAST NED .DOCX ═══ */}
                  <button
                    onClick={handleDownloadDocx}
                    className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.03] transition"
                  >
                    <Download className="h-5 w-5" />
                    <span>Last ned .docx</span>
                  </button>

                  {/* ═══ PDF-VURDERING (inkludert gratis) ═══ */}
                  <button
                    onClick={handleDownloadReportPdf}
                    disabled={isGeneratingReport}
                    className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.08] hover:bg-emerald-500/[0.12] transition text-emerald-400 disabled:opacity-60"
                  >
                    {isGeneratingReport ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Genererer vurdering...</span>
                      </>
                    ) : (
                      <>
                        <FileText className="h-5 w-5" />
                        <span>Last ned PDF-vurdering (inkludert)</span>
                      </>
                    )}
                  </button>

                  {/* ═══ FLERE VALG (collapsible) ═══ */}
                  <button
                    onClick={() => setShowMore(!showMore)}
                    aria-expanded={showMore}
                    className="w-full flex items-center justify-center gap-2 py-3 text-sm text-slate-500 hover:text-slate-300 transition"
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform ${showMore ? "rotate-180" : ""}`} />
                    Flere valg
                  </button>

                  {showMore && (
                    <div className="space-y-3">
                      <button
                        onClick={handleDownloadTxt}
                        className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.03] transition"
                      >
                        <Download className="h-5 w-5" />
                        <span>Last ned .txt</span>
                      </button>

                      <button
                        onClick={handleDownloadPdf}
                        className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.03] transition"
                      >
                        <Download className="h-5 w-5" />
                        <span>Last ned PDF (uten vedlegg)</span>
                      </button>

                      <button
                        onClick={() => router.push("/bilkjop/dokumenter")}
                        className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.03] transition"
                      >
                        <FolderPlus className="h-5 w-5" />
                        <span>Legg til vedlegg og lag samlet PDF</span>
                      </button>
                    </div>
                  )}

                  {/* What happens next */}
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-4">
                    <p className="text-sm text-amber-200">
                      <strong>Hva skjer videre?</strong> Vi anbefaler å gi selger rimelig tid til å svare (ofte 14 dager).
                      Hører du ikke noe, eller tilbudet er uakseptabelt, kan mekling eller klagebehandling
                      gjennom relevante tvisteløsningsorganer være aktuelt som neste steg.
                    </p>
                  </div>

                  <div className="text-center text-xs text-slate-600 pt-4">
                    <p>
                      Veiledende dokument utarbeidet av harjegkravpå.no.
                      <br />
                      Ikke juridisk rådgivning. Kontakt advokat for bindende råd.
                    </p>
                  </div>

                  {hasDownloaded && (
                    <>
                      <button
                        onClick={() => router.push("/hva-na")}
                        className="w-full py-4 rounded-xl bg-emerald-500 text-black font-bold text-lg hover:bg-emerald-400 transition"
                      >
                        Hva gjør jeg nå?
                      </button>

                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}