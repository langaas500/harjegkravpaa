"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileText, Loader2, Wrench, BadgePercent, Undo2 } from "lucide-react";

type ClaimType = "retting" | "prisavslag" | "heving";

export default function HandverkKravbrevPage() {
  const router = useRouter();
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [claimType, setClaimType] = useState<ClaimType | null>(null);
  const [prisavslagBelop, setPrisavslagBelop] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("handverk-data");
    if (stored) {
      const parsed = JSON.parse(stored);
      setData(parsed);
    }
  }, []);

  // Hent adresser fra wizard-data
  const kundeAdresse = data?.kundeAdresse as string || "";
  const kundePostnummer = data?.kundePostnummer as string || "";
  const kundePoststed = data?.kundePoststed as string || "";
  const handverkerAdresse = data?.handverkerAdresse as string || "";
  const handverkerPostnummer = data?.handverkerPostnummer as string || "";
  const handverkerPoststed = data?.handverkerPoststed as string || "";

  // Sjekk at alle nødvendige felt er fylt ut fra wizard
  const hasAddresses = kundeAdresse && kundePostnummer && kundePoststed &&
                       handverkerAdresse && handverkerPostnummer && handverkerPoststed;
  const canProceed = hasAddresses && claimType;

  const handlePayment = async () => {
    if (!canProceed) return;
    setIsLoading(true);

    const updatedData = {
      ...data,
      claimType,
      prisavslagBelop: claimType === "prisavslag" ? prisavslagBelop : null,
    };
    localStorage.setItem("handverk-data", JSON.stringify(updatedData));

    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productType: "handverk-kravbrev" }),
      });

      const { url, error } = await response.json();

      if (error) {
        alert("Feil: " + error);
        return;
      }

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Kunne ikke starte betaling. Prøv igjen.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!data) {
    return (
      <main className="bg-nordic text-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </main>
    );
  }

  return (
    <main className="bg-nordic text-white">
      <div className="mx-auto max-w-2xl px-4 py-10 space-y-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Tilbake
        </button>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl border border-white/10 bg-white/[0.03]">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Kravbrev</h1>
              <p className="text-slate-500 text-sm">Ferdig formulert brev du kan sende til håndverkeren</p>
            </div>
          </div>

          {/* Sammendrag med adresser fra wizard */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-500">Sak</span>
              <span>{(data.fag as string[])?.join(", ") || "Håndverkertjeneste"}</span>
            </div>

            <div className="border-t border-white/10 pt-3">
              <span className="text-slate-500 text-xs uppercase tracking-wide">Avsender</span>
              <div className="mt-1 text-white">
                <p>{(data.navn as string) || "Ikke oppgitt"}</p>
                {kundeAdresse && <p>{kundeAdresse}</p>}
                {kundePostnummer && kundePoststed && <p>{kundePostnummer} {kundePoststed}</p>}
              </div>
            </div>

            <div className="border-t border-white/10 pt-3">
              <span className="text-slate-500 text-xs uppercase tracking-wide">Mottaker</span>
              <div className="mt-1 text-white">
                <p>{(data.handverkerNavn as string) || "Ikke oppgitt"}</p>
                {handverkerAdresse && <p>{handverkerAdresse}</p>}
                {handverkerPostnummer && handverkerPoststed && <p>{handverkerPostnummer} {handverkerPoststed}</p>}
              </div>
            </div>
          </div>

          {/* Mangler adresse-varsel */}
          {!hasAddresses && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
              <p>Adresseinformasjon mangler. Gå tilbake til wizard for å fylle ut adresser.</p>
              <button
                onClick={() => router.push("/handverkere")}
                className="mt-2 text-amber-400 underline hover:text-amber-300"
              >
                Gå til wizard
              </button>
            </div>
          )}

          {/* Hva krever du? */}
          <div className="space-y-3">
            <label className="block text-sm text-slate-500">Hva krever du?</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setClaimType("retting")}
                className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                  claimType === "retting"
                    ? "border-white bg-white/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <Wrench className={`h-6 w-6 ${claimType === "retting" ? "text-white" : "text-slate-500"}`} />
                <span className="text-sm font-medium">Retting</span>
              </button>

              <button
                onClick={() => setClaimType("prisavslag")}
                className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                  claimType === "prisavslag"
                    ? "border-white bg-white/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <BadgePercent className={`h-6 w-6 ${claimType === "prisavslag" ? "text-white" : "text-slate-500"}`} />
                <span className="text-sm font-medium">Prisavslag</span>
              </button>

              <button
                onClick={() => setClaimType("heving")}
                className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                  claimType === "heving"
                    ? "border-white bg-white/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <Undo2 className={`h-6 w-6 ${claimType === "heving" ? "text-white" : "text-slate-500"}`} />
                <span className="text-sm font-medium">Heve avtalen</span>
              </button>
            </div>
          </div>

          {/* Beløp hvis prisavslag */}
          {claimType === "prisavslag" && (
            <div className="space-y-2">
              <label className="block text-sm text-slate-500">Hvor mye krever du i prisavslag?</label>
              <div className="relative">
                <input
                  type="number"
                  value={prisavslagBelop}
                  onChange={(e) => setPrisavslagBelop(e.target.value)}
                  placeholder="F.eks. 15000"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-4 pr-12 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/30"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">kr</span>
              </div>
            </div>
          )}

          {/* Pris og betaling */}
          <div className="border-t border-white/10 pt-6">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Juridisk kravbrev</p>
                  <p className="text-xs text-slate-500">Ferdig formulert, klart til å sende</p>
                </div>
                <p className="text-2xl font-bold">99 kr</p>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={!canProceed || isLoading}
              className="group w-full flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-4 font-bold text-lg hover:bg-teal-400 transition disabled:opacity-40 disabled:hover:bg-teal-500"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Starter betaling...
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5" />
                  Betal og få kravbrev
                </>
              )}
            </button>

            <p className="text-xs text-slate-600 text-center mt-3">
              Brevet utformes basert på opplysningene i saken din og håndverkertjenesteloven.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
