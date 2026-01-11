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
    const stored = localStorage.getItem("bilkjop-data");
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
    localStorage.setItem("bilkjop-data", JSON.stringify(updatedData));

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
      <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
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

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl border border-white/10 bg-white/[0.03]">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Kravbrev</h1>
              <p className="text-slate-500 text-sm">Ferdig formulert brev du kan sende til selger</p>
            </div>
          </div>

          {/* Sammendrag */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Sak</span>
              <span>{data.vehicle?.make} {data.vehicle?.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Kjøper</span>
              <span>{data.buyerName || "Ikke oppgitt"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Selger</span>
              <span>{data.sellerName || "Ikke oppgitt"}</span>
            </div>
          </div>

          {/* Din adresse */}
          <div className="space-y-2">
            <label className="block text-sm text-slate-500">Din adresse</label>
            <textarea
              value={buyerAddress}
              onChange={(e) => setBuyerAddress(e.target.value)}
              placeholder="Ola Nordmann&#10;Gateveien 123&#10;0123 Oslo"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/30 min-h-[100px] resize-none"
            />
          </div>

          {/* Selgers adresse */}
          <div className="space-y-2">
            <label className="block text-sm text-slate-500">Selgers adresse</label>
            <textarea
              value={sellerAddress}
              onChange={(e) => setSellerAddress(e.target.value)}
              placeholder="Bilforhandler AS&#10;Bilveien 456&#10;0456 Oslo"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/30 min-h-[100px] resize-none"
            />
          </div>

          {/* Hva krever du? */}
          <div className="space-y-3">
            <label className="block text-sm text-slate-500">Hva krever du?</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setClaimType("repair")}
                className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                  claimType === "repair"
                    ? "border-white bg-white/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <Wrench className={`h-6 w-6 ${claimType === "repair" ? "text-white" : "text-slate-500"}`} />
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
                <BadgePercent className={`h-6 w-6 ${claimType === "discount" ? "text-white" : "text-slate-500"}`} />
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
                <Undo2 className={`h-6 w-6 ${claimType === "cancel" ? "text-white" : "text-slate-500"}`} />
                <span className="text-sm font-medium">Heve kjøpet</span>
              </button>
            </div>
          </div>

          {/* Beløp hvis prisavslag */}
          {claimType === "discount" && (
            <div className="space-y-2">
              <label className="block text-sm text-slate-500">Hvor mye krever du i prisavslag?</label>
              <div className="relative">
                <input
                  type="number"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(e.target.value)}
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
              className="group w-full flex items-center justify-center gap-2 rounded-full bg-white text-black py-4 font-bold text-lg hover:bg-slate-100 transition disabled:opacity-40 disabled:hover:bg-white"
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

            <p className="text-xs text-slate-600 text-center mt-3">
              Brevet utformes basert på opplysningene i saken din og norsk forbrukerlovgivning.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}