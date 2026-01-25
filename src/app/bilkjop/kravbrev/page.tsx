"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  Loader2,
  Wrench,
  BadgePercent,
  Undo2,
} from "lucide-react";

type ClaimType = "repair" | "discount" | "cancel";

export default function KravbrevPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [claimType, setClaimType] = useState<ClaimType | null>(null);
  const [discountAmount, setDiscountAmount] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("bilkjop-data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData(parsed);

        // Hvis bruker har vært her før, hent valg tilbake
        if (parsed?.claimType) setClaimType(parsed.claimType as ClaimType);
        if (parsed?.discountAmount) setDiscountAmount(String(parsed.discountAmount));
      } catch {
        setData(null);
      }
    }
  }, []);

  const discountAmountNumber = useMemo(() => {
    const n = Number(discountAmount);
    return Number.isFinite(n) ? n : NaN;
  }, [discountAmount]);

  const canProceed = useMemo(() => {
    if (!claimType) return false;
    if (claimType === "discount") {
      return Number.isFinite(discountAmountNumber) && discountAmountNumber > 0;
    }
    return true;
  }, [claimType, discountAmountNumber]);

  const handlePayment = async () => {
    if (!canProceed) return;
    setIsLoading(true);

    // IKKE be om adresse/regnr her. Alt slikt skal komme fra wizard (bilkjop-data).
    const updatedData = {
      ...data,
      claimType,
      discountAmount: claimType === "discount" ? String(discountAmountNumber) : null,
    };
    localStorage.setItem("bilkjop-data", JSON.stringify(updatedData));

    try {
      const token = updatedData?.access_token as string | undefined;

      if (!token) {
        alert("Feil: Kunne ikke finne saksreferanse. Prøv å gå gjennom skjemaet på nytt.");
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          productType: "KRAVBREV",
          category: "bilkjop",
          returnPath: "/bilkjop/kravbrev/betalt",
        }),
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
      <main className="bg-nordic text-white flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </main>
    );
  }

  return (
    <main className="bg-nordic text-white">
      <div className="mx-auto max-w-2xl px-4 py-10 space-y-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition"
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
              <p className="text-slate-400 text-sm">
                Ferdig formulert brev du kan sende til selger
              </p>
            </div>
          </div>

          {/* Sammendrag */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Sak</span>
              <span>
                {data.vehicle?.make} {data.vehicle?.model}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Kjøper</span>
              <span>{data.buyerName || "Ikke oppgitt"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Selger</span>
              <span>{data.sellerName || "Ikke oppgitt"}</span>
            </div>

            {/* Viktig: Vi spør IKKE om adresse/reg.nr her */}
            <div className="pt-2 text-xs text-slate-500">
              Adresse og registreringsnummer hentes automatisk fra saken du fylte ut i wizard.
            </div>
          </div>

          {/* Hva krever du? */}
          <div className="space-y-3">
            <label className="block text-sm text-slate-400">Hva krever du?</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setClaimType("repair")}
                className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                  claimType === "repair"
                    ? "border-white bg-white/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <Wrench
                  className={`h-6 w-6 ${
                    claimType === "repair" ? "text-white" : "text-slate-400"
                  }`}
                />
                <span className="text-sm font-medium">Reparasjon</span>
              </button>

              <button
                onClick={() => setClaimType("discount")}
                className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                  claimType === "discount"
                    ? "border-white bg-white/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <BadgePercent
                  className={`h-6 w-6 ${
                    claimType === "discount" ? "text-white" : "text-slate-400"
                  }`}
                />
                <span className="text-sm font-medium">Prisavslag</span>
              </button>

              <button
                onClick={() => setClaimType("cancel")}
                className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                  claimType === "cancel"
                    ? "border-white bg-white/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <Undo2
                  className={`h-6 w-6 ${
                    claimType === "cancel" ? "text-white" : "text-slate-400"
                  }`}
                />
                <span className="text-sm font-medium">Heve kjøpet</span>
              </button>
            </div>
          </div>

          {/* Beløp hvis prisavslag */}
          {claimType === "discount" && (
            <div className="space-y-2">
              <label className="block text-sm text-slate-400">
                Hvor mye krever du i prisavslag?
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(e.target.value)}
                  placeholder="F.eks. 15000"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-4 pr-12 text-white placeholder:text-slate-500 focus:outline-none focus:border-white/30"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  kr
                </span>
              </div>

              {discountAmount.trim().length > 0 &&
                (!Number.isFinite(discountAmountNumber) || discountAmountNumber <= 0) && (
                  <p className="text-xs text-rose-300">
                    Skriv inn et beløp større enn 0.
                  </p>
                )}
            </div>
          )}

          {/* Pris og betaling */}
          <div className="border-t border-white/10 pt-6">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Juridisk kravbrev</p>
                  <p className="text-xs text-slate-400">Ferdig formulert, klart til å sende</p>
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

            <p className="text-xs text-slate-500 text-center mt-3">
              Brevet utformes basert på opplysningene i saken din og norsk forbrukerlovgivning.
            </p>

            <p className="text-[11px] text-slate-500 text-center mt-2">
              Neste steg etter betaling: kun telefon og e-post (resten hentes fra wizard).
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
