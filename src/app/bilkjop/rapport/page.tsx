"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, CreditCard, FileText } from "lucide-react";

interface ReportData {
  sellerType: "PRIVATE" | "DEALER";
  vehicle: any;
  buyerName: string;
  sellerName: string;
  issues: string[];
  outcome: any;
}

export default function RapportPage() {
  const router = useRouter();
  const [data, setData] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("bilkjop-data");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Ikke oppgitt";
    return new Date(dateString).toLocaleDateString("nb-NO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productType: "rapport" }),
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

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-5">
            <h1 className="text-2xl font-bold">Din rapport er klar</h1>

            <div
              className={`rounded-2xl p-4 ${
                data.outcome?.level === "GREEN"
                  ? "bg-green-500/10 border border-green-500/30"
                  : data.outcome?.level === "YELLOW"
                  ? "bg-yellow-500/10 border border-yellow-500/30"
                  : "bg-red-500/10 border border-red-500/30"
              }`}
            >
              <p className="font-semibold">{data.outcome?.title}</p>
              <p className="text-sm text-slate-300 mt-1">{data.outcome?.summary}</p>
            </div>

            <div className="space-y-2 text-sm">
              <p><strong>Kjøper:</strong> {data.buyerName || "Ikke oppgitt"}</p>
              <p><strong>Selger:</strong> {data.sellerName || "Ikke oppgitt"}</p>
              <p><strong>Bil:</strong> {data.vehicle?.make} {data.vehicle?.model}</p>
              <p><strong>Kjøpsdato:</strong> {formatDate(data.vehicle?.purchaseDate)}</p>
              <p><strong>Lov:</strong> {data.sellerType === "DEALER" ? "Forbrukerkjøpsloven" : "Kjøpsloven"}</p>
            </div>

            <div className="border-t border-white/10 pt-5">
              <div className="bg-white/5 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-pink-400" />
                    <div>
                      <p className="font-semibold">Komplett PDF-rapport</p>
                      <p className="text-xs text-slate-400">3 sider med vurdering og lovhenvisninger</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold">49 kr</p>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 py-4 text-white font-semibold hover:from-pink-500 hover:to-purple-500 transition disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Starter betaling...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5" />
                    Betal og last ned
                  </>
                )}
              </button>

              <p className="text-xs text-slate-500 text-center mt-3">
                Sikker betaling via Stripe. Rapporten lastes ned etter betaling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}