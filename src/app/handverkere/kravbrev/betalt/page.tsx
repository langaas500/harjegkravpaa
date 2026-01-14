"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, FileDown, Loader2 } from "lucide-react";

function KravbrevBetaltContent() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [kravbrevText, setKravbrevText] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("handverk-data");
    if (stored) {
      const parsed = JSON.parse(stored);
      setData(parsed);
      generateKravbrev(parsed);
    }
  }, []);

  const generateKravbrev = async (caseData: Record<string, unknown>) => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-handverk-kravbrev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(caseData),
      });

      if (!response.ok) throw new Error("API failed");

      const result = await response.json();
      setKravbrevText(result.kravbrev);
    } catch (error) {
      console.error("Kravbrev generation failed:", error);
      // Fallback kravbrev
      const claimTypeText =
        caseData.claimType === "retting"
          ? "retting av arbeidet"
          : caseData.claimType === "prisavslag"
          ? `prisavslag${caseData.prisavslagBelop ? ` på kr ${caseData.prisavslagBelop}` : ""}`
          : "heving av avtalen";

      setKravbrevText(`${caseData.kundeAdresse || "[Din adresse]"}

${new Date().toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric" })}

${caseData.handverkerAdresse || "[Håndverkerens adresse]"}

REKLAMASJON OG KRAV – HÅNDVERKERTJENESTE

Jeg viser til håndverkertjenesten utført av dere.

Det foreligger mangel ved tjenesten. ${(caseData.problemer as string[])?.join(", ") || "Arbeidet er ikke i samsvar med det avtalte."}

${caseData.dinHistorie ? `Nærmere beskrivelse:\n${caseData.dinHistorie}\n` : ""}
Med hjemmel i håndverkertjenesteloven krever jeg ${claimTypeText}.

Jeg ber om skriftlig tilbakemelding innen 14 dager fra mottak av dette brevet.

Med vennlig hilsen

${caseData.navn || "[Ditt navn]"}
${caseData.telefon ? `Tlf: ${caseData.telefon}` : ""}
${caseData.epost ? `E-post: ${caseData.epost}` : ""}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadKravbrev = () => {
    if (!kravbrevText) return;

    const blob = new Blob([kravbrevText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kravbrev-handverker-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded(true);
  };

  if (!data || isGenerating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-white" />
          <p>{isGenerating ? "Genererer kravbrev..." : "Laster..."}</p>
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
          <h1 className="text-3xl font-bold mb-2">Kravbrev klart!</h1>
          <p className="text-slate-400">Takk for kjøpet. Ditt kravbrev er klart til nedlasting.</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-left">
          <p className="text-sm text-slate-500 mb-1">Ordre</p>
          <p className="font-semibold">Juridisk kravbrev til håndverker</p>
          <p className="text-slate-400">99 kr</p>
        </div>

        {kravbrevText && (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left">
            <p className="text-sm text-slate-500 mb-2">Forhåndsvisning:</p>
            <pre className="text-xs text-slate-300 whitespace-pre-wrap font-mono max-h-60 overflow-y-auto">
              {kravbrevText.slice(0, 800)}
              {kravbrevText.length > 800 && "..."}
            </pre>
          </div>
        )}

        <button
          onClick={downloadKravbrev}
          disabled={!kravbrevText}
          className="group w-full flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-4 font-bold text-lg hover:bg-teal-400 transition disabled:opacity-60"
        >
          <FileDown className="h-5 w-5" />
          Last ned kravbrev
        </button>

        {downloaded && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
            <p className="text-emerald-400 text-sm">Kravbrevet er lastet ned!</p>
          </div>
        )}

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-left">
          <p className="text-amber-400 font-semibold text-sm mb-1">Husk:</p>
          <ul className="text-xs text-slate-300 space-y-1">
            <li>• Send brevet rekommandert eller med sporbar e-post</li>
            <li>• Ta vare på kopi og sendingsbevis</li>
            <li>• Gi håndverkeren rimelig tid til å svare (14 dager)</li>
          </ul>
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
