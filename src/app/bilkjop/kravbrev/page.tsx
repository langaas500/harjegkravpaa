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
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("bilkjop-data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData(parsed);

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

    // Validate required fields before checkout
    const errors: string[] = [];
    const v = data?.vehicle as Record<string, unknown> | undefined;
    if (!v?.purchaseDate || typeof v.purchaseDate !== "string" || !v.purchaseDate.trim())
      errors.push("Kjøpsdato mangler");
    if (!v?.price || !Number.isFinite(Number(v.price)) || Number(v.price) <= 0)
      errors.push("Kjøpesum mangler eller er ugyldig");
    const hasId = (v?.regNumber && String(v.regNumber).trim()) ||
      (v?.regNum && String(v.regNum).trim()) ||
      (v?.make && String(v.make).trim() && v?.model && String(v.model).trim());
    if (!hasId) errors.push("Bilidentifikasjon mangler (reg.nr eller merke+modell)");
    if (!data?.buyerName || typeof data.buyerName !== "string" || !data.buyerName.trim())
      errors.push("Kjøpers navn mangler");
    if (!data?.sellerName || typeof data.sellerName !== "string" || !data.sellerName.trim())
      errors.push("Selgers navn mangler");
    const hasContent = (Array.isArray(data?.issues) && data.issues.length > 0) ||
      (typeof data?.userDescription === "string" && data.userDescription.trim().length > 0);
    if (!hasContent) errors.push("Feilbeskrivelse mangler");

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors([]);
    setIsLoading(true);

    const updatedData = {
      ...data,
      claimType,
      discountAmount: claimType === "discount" ? String(discountAmountNumber) : null,
    };
    localStorage.setItem("bilkjop-data", JSON.stringify(updatedData));

    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
      <main className="bg-[#0a0f0d] text-white flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </main>
    );
  }

  return (
    <main className="bg-[#0a0f0d] text-white min-h-screen relative overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(16,185,129,0.04) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.025) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10">
        <div className="mx-auto max-w-2xl px-4 py-10 space-y-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Tilbake
          </button>

          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.08]">
                <FileText className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Kravbrev</h1>
                <p className="text-slate-400 text-sm">
                  Ferdig formulert brev du kan sende til selger
                </p>
              </div>
            </div>

            {/* Sammendrag */}
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Sak</span>
                <span>
                  {data.vehicle?.make} {data.vehicle?.model}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Kjøper</span>
                <span>{data.buyerName || "Ikke oppgitt"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Selger</span>
                <span>{data.sellerName || "Ikke oppgitt"}</span>
              </div>

              <div className="pt-2 text-xs text-slate-600">
                Adresse og registreringsnummer hentes automatisk fra saken du fylte ut i wizard.
              </div>
            </div>

            {/* Hva krever du? */}
            <div className="space-y-3">
              <label className="block text-sm text-slate-400">Hva krever du?</label>
              <div className="grid grid-cols-3 gap-3">
                {([
                  { type: "repair" as ClaimType, icon: Wrench, label: "Reparasjon" },
                  { type: "discount" as ClaimType, icon: BadgePercent, label: "Prisavslag" },
                  { type: "cancel" as ClaimType, icon: Undo2, label: "Heve kjøpet" },
                ]).map(({ type, icon: Icon, label }) => (
                  <button
                    key={type}
                    onClick={() => setClaimType(type)}
                    className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                      claimType === type
                        ? "border-emerald-500/40 bg-emerald-500/[0.08]"
                        : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 ${
                        claimType === type ? "text-emerald-400" : "text-slate-400"
                      }`}
                    />
                    <span className={`text-sm font-medium ${claimType === type ? "text-white" : ""}`}>{label}</span>
                  </button>
                ))}
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
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 pr-12 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                    kr
                  </span>
                </div>

                {discountAmount.trim().length > 0 &&
                  (!Number.isFinite(discountAmountNumber) || discountAmountNumber <= 0) && (
                    <p className="text-xs text-rose-400">
                      Skriv inn et beløp større enn 0.
                    </p>
                  )}
              </div>
            )}

            {/* Pris og betaling */}
            <div className="border-t border-white/[0.06] pt-6">
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Juridisk kravbrev</p>
                    <p className="text-xs text-slate-500">Ferdig formulert, klart til å sende</p>
                  </div>
                  <p className="text-2xl font-extrabold">99 kr</p>
                </div>
              </div>

              {validationErrors.length > 0 && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/[0.08] p-4 mb-4">
                  <p className="text-sm font-semibold text-red-400 mb-2">Kan ikke starte betaling:</p>
                  <ul className="text-sm text-red-400 space-y-1">
                    {validationErrors.map((e, i) => (
                      <li key={i}>• {e}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-slate-500 mt-2">Gå tilbake og fyll ut manglende informasjon.</p>
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={!canProceed || isLoading}
                className="group w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-4 font-bold text-lg hover:bg-emerald-400 transition disabled:opacity-30 disabled:hover:bg-emerald-500"
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
                Brevet utformes basert på opplysningene i saken din og norsk forbrukerlovgivning.
              </p>

              <p className="text-[11px] text-slate-600 text-center mt-2">
                Neste steg etter betaling: kun telefon og e-post (resten hentes fra wizard).
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}