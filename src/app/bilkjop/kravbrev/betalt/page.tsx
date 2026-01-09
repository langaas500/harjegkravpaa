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
  Mail
} from "lucide-react";

export default function KravbrevBetaltPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [letter, setLetter] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("bilkjop-data");
    if (stored) {
      const parsedData = JSON.parse(stored);
      setData(parsedData);
      generateLetter(parsedData);
    } else {
      setError("Fant ikke saksdata. Vennligst start på nytt.");
    }
  }, []);

  const generateLetter = async (caseData: any) => {
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
    } catch (err) {
      console.error("Generate error:", err);
      setError("Kunne ikke generere kravbrev. Prøv igjen.");
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
    link.download = `kravbrev-${data?.vehicle?.make || "bil"}-${new Date().toISOString().split("T")[0]}.txt`;
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
    link.download = `kravbrev-${data?.vehicle?.make || "bil"}-${new Date().toISOString().split("T")[0]}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (error && !data) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
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

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
        <button
          onClick={() => router.push("/bilkjop")}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Tilbake til oversikt
        </button>

        <div className="flex items-center gap-4 p-4 rounded-xl border border-green-500/30 bg-green-500/10">
          <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0" />
          <div>
            <h1 className="text-xl font-bold text-green-400">Betaling mottatt!</h1>
            <p className="text-sm text-slate-400">
              Ditt kravbrev genereres nå med AI
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-slate-400" />
              <span className="font-medium">Ditt kravbrev</span>
            </div>
            
            {letter && (
              <div className="flex items-center gap-2">
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

          <div 
            ref={letterRef}
            className="p-6 min-h-[400px] max-h-[600px] overflow-y-auto"
          >
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
                <p className="text-slate-400">Genererer kravbrev...</p>
                <p className="text-xs text-slate-600">
                  Dette kan ta 10-20 sekunder
                </p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <AlertCircle className="h-8 w-8 text-red-500" />
                <p className="text-red-400">{error}</p>
                <button
                  onClick={() => data && generateLetter(data)}
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
                className="flex items-center justify-center gap-2 p-4 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/[0.03] transition"
              >
                <Download className="h-5 w-5" />
                <span>Last ned .docx</span>
              </button>
              
              <button
                onClick={handleDownloadTxt}
                className="flex items-center justify-center gap-2 p-4 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/[0.03] transition"
              >
                <Download className="h-5 w-5" />
                <span>Last ned .txt</span>
              </button>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="font-medium text-sm">Slik sender du brevet</p>
                  <ul className="text-xs text-slate-400 space-y-1">
                    <li>• <strong>E-post:</strong> Send som vedlegg og be om lesebekreftelse</li>
                    <li>• <strong>Rekommandert post:</strong> Gir dokumentasjon på at brevet er mottatt</li>
                    <li>• <strong>Ta vare på kopi:</strong> Lagre alltid en kopi av alt du sender</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
              <p className="text-sm text-amber-200">
                <strong>Hva skjer nå?</strong> Selger har 14 dager på seg til å svare. 
                Hvis du ikke får svar eller tilbudet er uakseptabelt, kan du klage til{" "}
                <a 
                  href="https://www.forbrukerradet.no" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                >
                  Forbrukerrådet
                </a>.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}