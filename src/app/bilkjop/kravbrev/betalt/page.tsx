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
  Mail,
  FolderPlus,
  User,
  Building,
} from "lucide-react";

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
  const [step, setStep] = useState<"contact" | "letter">("contact");
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

  useEffect(() => {
    const stored = localStorage.getItem("bilkjop-data");
    if (stored) {
      const parsedData = JSON.parse(stored);
      setData(parsedData);

      // Pre-fill from existing data if available
      const storedContact = localStorage.getItem("kravbrev-contact");
      if (storedContact) {
        const parsedContact = JSON.parse(storedContact);
        setContactInfo(parsedContact);
      } else {
        // Pre-fill from wizard data
        setContactInfo({
          buyerName: parsedData.buyerName || "",
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
    } else {
      setError("Fant ikke saksdata. Vennligst start på nytt.");
    }
  }, []);

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
    const vehicle = data?.vehicle as Record<string, string> | undefined;
    link.download = `kravbrev-${vehicle?.make || "bil"}-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
    const vehicle = data?.vehicle as Record<string, string> | undefined;
    link.download = `kravbrev-${vehicle?.make || "bil"}-${new Date().toISOString().split("T")[0]}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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

    const marginX = 15;
    const marginY = 18;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxWidth = pageWidth - marginX * 2;

    doc.setFont("times", "normal");
    doc.setFontSize(11);

    const paragraphs = letter.replace(/\r\n/g, "\n").split("\n\n");

    let y = marginY;

    for (let p = 0; p < paragraphs.length; p++) {
      const para = paragraphs[p];
      const lines = para.split("\n");
      for (let i = 0; i < lines.length; i++) {
        const wrapped = doc.splitTextToSize(lines[i] || " ", maxWidth);
        for (let w = 0; w < wrapped.length; w++) {
          if (y > pageHeight - marginY) {
            doc.addPage();
            y = marginY;
          }
          doc.text(wrapped[w], marginX, y);
          y += 6;
        }
      }

      y += 4;
      if (y > pageHeight - marginY) {
        doc.addPage();
        y = marginY;
      }
    }

    doc.save(fileName);
  };

  if (error && !data) {
    return (
      <main className="bg-nordic text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <p className="text-red-400">{error}</p>
          <button
            onClick={() => router.push("/bilkjop")}
            className="text-slate-400 hover:text-white transition"
          >
            Start på nytt
          </button>
        </div>
      </main>
    );
  }

  const vehicle = data?.vehicle as Record<string, string> | undefined;
  const sellerName = vehicle?.seller || "Selger";

  return (
    <main className="bg-nordic text-white">
      <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
        <button
          onClick={() => router.push("/bilkjop")}
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
                    value={contactInfo.buyerName}
                    onChange={(e) => handleContactChange("buyerName", e.target.value)}
                    placeholder="Ola Nordmann"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-emerald-500 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-1">Adresse *</label>
                  <input
                    type="text"
                    value={contactInfo.buyerAddress}
                    onChange={(e) => handleContactChange("buyerAddress", e.target.value)}
                    placeholder="Gateveien 123"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-emerald-500 focus:outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Postnummer *</label>
                    <input
                      type="text"
                      value={contactInfo.buyerPostcode}
                      onChange={(e) => handleContactChange("buyerPostcode", e.target.value)}
                      placeholder="0123"
                      maxLength={4}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-emerald-500 focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Poststed *</label>
                    <input
                      type="text"
                      value={contactInfo.buyerCity}
                      onChange={(e) => handleContactChange("buyerCity", e.target.value)}
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
                      value={contactInfo.buyerPhone}
                      onChange={(e) => handleContactChange("buyerPhone", e.target.value)}
                      placeholder="912 34 567"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-emerald-500 focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">E-post</label>
                    <input
                      type="email"
                      value={contactInfo.buyerEmail}
                      onChange={(e) => handleContactChange("buyerEmail", e.target.value)}
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
                <h2 className="font-semibold">Selgers adresse</h2>
                <span className="text-sm text-slate-500">({sellerName})</span>
              </div>

              <p className="text-sm text-slate-400 mb-4">
                Hvis du har selgers adresse, fyll den inn under. Hvis ikke, kan du la feltene stå tomme og legge det
                til manuelt senere.
              </p>

              <div className="grid gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Adresse</label>
                  <input
                    type="text"
                    value={contactInfo.sellerAddress}
                    onChange={(e) => handleContactChange("sellerAddress", e.target.value)}
                    placeholder="Bilveien 456"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Postnummer</label>
                    <input
                      type="text"
                      value={contactInfo.sellerPostcode}
                      onChange={(e) => handleContactChange("sellerPostcode", e.target.value)}
                      placeholder="0456"
                      maxLength={4}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Poststed</label>
                    <input
                      type="text"
                      value={contactInfo.sellerCity}
                      onChange={(e) => handleContactChange("sellerCity", e.target.value)}
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
                  onClick={() => router.push("/bilkjop/dokumenter")}
                  className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 transition text-emerald-400"
                >
                  <FolderPlus className="h-5 w-5" />
                  <span>Legg til vedlegg og lag samlet PDF</span>
                </button>

                <button
                  onClick={handleDownloadPdf}
                  className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition"
                >
                  <Download className="h-5 w-5" />
                  <span>Last ned PDF (uten vedlegg)</span>
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

                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                  <p className="text-sm text-amber-200">
                    <strong>Hva skjer nå?</strong> Selger har 14 dager på seg til å svare. Hvis du ikke får svar eller
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
    </main>
  );
}
