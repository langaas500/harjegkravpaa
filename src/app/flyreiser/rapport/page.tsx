"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, CreditCard, FileText, Clock, XCircle, UserX, Briefcase } from "lucide-react";

interface FlightData {
  problemType: "DELAY" | "CANCELLED" | "DENIED_BOARDING" | "BAGGAGE";
  flight: {
    airline: string;
    flightNumber: string;
    departureAirport: string;
    arrivalAirport: string;
    flightDate: string;
    bookedPrice: string;
  };
  passengerName: string;
  delayDuration: string | null;
  cancellationNotice: string | null;
  baggageType: "delayed" | "lost" | "damaged" | null;
  outcome: {
    level: "GREEN" | "YELLOW" | "RED";
    title: string;
    summary: string;
    compensationAmount: string | null;
  } | null;
}

export default function FlyreiserRapportPage() {
  const router = useRouter();
  const [data, setData] = useState<FlightData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("flyreiser-data");
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

  const getProblemTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      DELAY: "Forsinkelse",
      CANCELLED: "Kansellering",
      DENIED_BOARDING: "Nektet ombordstigning",
      BAGGAGE: "Bagasjeproblem",
    };
    return labels[type] || type;
  };

  const getProblemIcon = (type: string) => {
    switch (type) {
      case "DELAY": return <Clock className="h-5 w-5 text-amber-400" />;
      case "CANCELLED": return <XCircle className="h-5 w-5 text-red-400" />;
      case "DENIED_BOARDING": return <UserX className="h-5 w-5 text-orange-400" />;
      case "BAGGAGE": return <Briefcase className="h-5 w-5 text-purple-400" />;
      default: return null;
    }
  };

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      // Hent access_token fra localStorage
      const stored = localStorage.getItem("flyreiser-data");
      const token = stored ? JSON.parse(stored).access_token : null;

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
          productType: "REPORT",
          category: "flyreiser",
          returnPath: "/flyreiser/betalt",
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
          <h1 className="text-3xl font-bold">Din rapport er klar</h1>

          <div
            className={`rounded-xl p-5 ${
              data.outcome?.level === "GREEN"
                ? "bg-emerald-500/10 border border-emerald-500/30"
                : data.outcome?.level === "YELLOW"
                ? "bg-amber-500/10 border border-amber-500/30"
                : "bg-red-500/10 border border-red-500/30"
            }`}
          >
            <p className="font-semibold text-lg">{data.outcome?.title}</p>
            <p className="text-slate-400 mt-1">{data.outcome?.summary}</p>
            {data.outcome?.compensationAmount && (
              <p className="mt-3 text-lg font-bold text-emerald-400">
                Mulig kompensasjon: {data.outcome.compensationAmount}
              </p>
            )}
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-slate-500">Passasjer</span>
              <span>{data.passengerName || "Ikke oppgitt"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-slate-500">Problemtype</span>
              <span className="flex items-center gap-2">
                {getProblemIcon(data.problemType)}
                {getProblemTypeLabel(data.problemType)}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-slate-500">Flyselskap</span>
              <span>{data.flight?.airline || "Ikke oppgitt"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-slate-500">Flynummer</span>
              <span>{data.flight?.flightNumber || "Ikke oppgitt"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-slate-500">Rute</span>
              <span>{data.flight?.departureAirport} → {data.flight?.arrivalAirport}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-slate-500">Flydato</span>
              <span>{formatDate(data.flight?.flightDate)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-500">Regelverk</span>
              <span>{data.problemType === "BAGGAGE" ? "Montrealkonvensjonen" : "EU-forordning 261/2004"}</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl border border-white/10 bg-white/[0.03]">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Komplett PDF-rapport</p>
                    <p className="text-xs text-slate-500">Vurdering med lovhenvisninger og neste steg</p>
                  </div>
                </div>
                <p className="text-2xl font-bold">39 kr</p>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={isLoading}
              className="group w-full flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-4 font-bold text-lg hover:bg-teal-400 transition disabled:opacity-60"
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

            <p className="text-xs text-slate-600 text-center mt-3">
              Sikker betaling via Stripe. Rapporten lastes ned etter betaling.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
