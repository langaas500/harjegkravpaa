"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileText, Loader2, Wrench, BadgePercent, Undo2 } from "lucide-react";

type ClaimType = "repair" | "discount" | "cancel";

export default function KravbrevPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [buyerAddress, setBuyerAddress] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");
  const [claimType, setClaimType] = useState<ClaimType | null>(null);
  const [discountAmount, setDiscountAmount] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("bilkjop-data");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  const canProceed = buyerAddress.trim() && sellerAddress.trim() && claimType;

  const handlePayment = async () => {
    if (!canProceed) return;
    setIsLoading(true);

    const updatedData = {
      ...data,
      buyerAddress,
      sellerAddress,
      claimType,
      discountAmount: claimType === "discount" ? discountAmount : null,
    };
    sessionStorage.setItem("bilkjop-data", JSON.stringify(updatedData));

    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productType: "kravbrev" }),
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
      <main className="min-h-screen bg-[#0a0a0f] text-slate-100 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-pink-400" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-slate-100 overflow-hidden">
      {/* Gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Tilbake
          </button>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-pink-500/20">
                <FileText className="h-6 w-6 text-pink-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Kravbrev</h1>
                <p className="text-slate-400 text-sm">Ferdig formulert brev du kan sende til selger</p>
              </div>
            </div>

            {/* Sammendrag */}
            <div className="bg-white/5 rounded-xl p-4 text-sm space-y-1">
              <p><strong>Sak:</strong> {data.vehicle?.make} {data.vehicle?.model}</p>
              <p><strong>Kjøper:</strong> {data.buyerName}</p>
              <p><strong>Selger:</strong> {data.sellerName}</p>
            </div>

            {/* Din adresse */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Din adresse</label>
              <textarea
                value={buyerAddress}
                onChange={(e) => setBuyerAddress(e.target.value)}
                placeholder="Ola Nordmann&#10;Gateveien 123&#10;0123 Oslo"
                className="w-full rounded-xl bg-white/5 border border-white/10 p-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-pink-500 min-h-[100px]"
              />
            </div>

            {/* Selgers adresse */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Selgers adresse</label>
              <textarea
                value={sellerAddress}
                onChange={(e) => setSellerAddress(e.target.value)}
                placeholder="Bilforhandler AS&#10;Bilveien 456&#10;0456 Oslo"
                className="w-full rounded-xl bg-white/5 border border-white/10 p-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-pink-500 min-h-[100px]"
              />
            </div>

            {/* Hva krever du? */}
            <div className="space-y-3">
              <label className="block text-sm font-medium">Hva krever du?</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setClaimType("repair")}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    claimType === "repair"
                      ? "border-pink-500 bg-pink-500/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <Wrench className={`h-6 w-6 ${claimType === "repair" ? "text-pink-400" : "text-slate-400"}`} />
                  <span className="text-sm font-medium">Reparasjon</span>
                </button>

                <button
                  onClick={() => setClaimType("discount")}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    claimType === "discount"
                      ? "border-pink-500 bg-pink-500/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <BadgePercent className={`h-6 w-6 ${claimType === "discount" ? "text-pink-400" : "text-slate-400"}`} />
                  <span className="text-sm font-medium">Prisavslag</span>
                </button>

                <button
                  onClick={() => setClaimType("cancel")}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    claimType === "cancel"
                      ? "border-pink-500 bg-pink-500/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <Undo2 className={`h-6 w-6 ${claimType === "cancel" ? "text-pink-400" : "text-slate-400"}`} />
                  <span className="text-sm font-medium">Heve kjøpet</span>
                </button>
              </div>
            </div>

            {/* Beløp hvis prisavslag */}
            {claimType === "discount" && (
              <div className="space-y-2">
                <label className="block text-sm font-medium">Hvor mye krever du i prisavslag?</label>
                <div className="relative">
                  <input
                    type="number"
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(e.target.value)}
                    placeholder="F.eks. 15000"
                    className="w-full rounded-xl bg-white/5 border border-white/10 p-3 pr-12 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-pink-500"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">kr</span>
                </div>
              </div>
            )}

            {/* Pris og betaling */}
            <div className="border-t border-white/10 pt-5">
              <div className="bg-white/5 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Juridisk kravbrev</p>
                    <p className="text-xs text-slate-400">Ferdig formulert, klart til å sende</p>
                  </div>
                  <p className="text-xl font-bold">149 kr</p>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={!canProceed || isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 py-4 text-white font-semibold hover:from-pink-500 hover:to-purple-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Starter betaling...
                  </>
                ) : (
                  <>
                    <FileText className="h-5 w-5" />
                    Betal og generer kravbrev
                  </>
                )}
              </button>

              <p className="text-xs text-slate-500 text-center mt-3">
                Brevet genereres med AI basert på din sak og norsk forbrukerlovgivning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}