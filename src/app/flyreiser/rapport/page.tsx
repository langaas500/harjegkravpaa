"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import ReportPaywall from "@/components/bilkjop/ReportPaywall";

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
  access_token?: string;
}

const PROBLEM_LABELS: Record<string, string> = {
  DELAY: "Forsinkelse",
  CANCELLED: "Kansellering",
  DENIED_BOARDING: "Nektet ombordstigning",
  BAGGAGE: "Bagasjeproblem",
};

function formatDate(dateString: string) {
  if (!dateString) return "Ikke oppgitt";
  return new Date(dateString).toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function FlyreiserRapportPage() {
  const router = useRouter();
  const [data, setData] = useState<FlightData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("flyreiser-data");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (!data) {
    return (
      <main className="bg-[#0a0f0d] text-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </main>
    );
  }

  return (
    <main className="bg-[#0a0f0d] text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-600/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto max-w-2xl px-4 py-10 space-y-6 relative z-10">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Tilbake
        </button>

        <ReportPaywall
          accessToken={data.access_token || null}
          outcome={data.outcome}
          category="flyreiser"
          kravbrevReturnPath="/flyreiser/kravbrev/betalt"
          reportReturnPath="/flyreiser/betalt"
          summaryRows={[
            { label: "Passasjer", value: data.passengerName || "Ikke oppgitt" },
            { label: "Problemtype", value: PROBLEM_LABELS[data.problemType] || data.problemType },
            { label: "Flyselskap", value: data.flight?.airline || "Ikke oppgitt" },
            { label: "Flynummer", value: data.flight?.flightNumber || "Ikke oppgitt" },
            { label: "Rute", value: `${data.flight?.departureAirport} → ${data.flight?.arrivalAirport}` },
            { label: "Flydato", value: formatDate(data.flight?.flightDate) },
            { label: "Regelverk", value: data.problemType === "BAGGAGE" ? "Montrealkonvensjonen" : "EU-forordning 261/2004" },
          ]}
        />
      </div>
    </main>
  );
}
