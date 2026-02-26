"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import ReportPaywall from "@/components/bilkjop/ReportPaywall";

interface ReportData {
  fag: string[];
  problemer: string[];
  navn: string | null;
  handverkerNavn: string | null;
  outcome: {
    level: "GREEN" | "YELLOW" | "RED";
    title: string;
    summary: string;
    keyPoints: string[];
  } | null;
  access_token?: string;
}

export default function HandverkRapportPage() {
  const router = useRouter();
  const [data, setData] = useState<ReportData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("handverk-data");
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
      <div className="mx-auto max-w-2xl px-4 py-10 space-y-6">
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
          category="handverkere"
          kravbrevReturnPath="/handverkere/kravbrev/betalt"
          reportReturnPath="/handverkere/betalt"
          summaryRows={[
            { label: "Kunde", value: data.navn || "Ikke oppgitt" },
            { label: "Håndverker", value: data.handverkerNavn || "Ikke oppgitt" },
            { label: "Fag", value: data.fag?.join(", ") || "Ikke oppgitt" },
            { label: "Problem", value: data.problemer?.join(", ") || "Ikke oppgitt" },
            { label: "Lov", value: "Håndverkertjenesteloven" },
          ]}
        />
      </div>
    </main>
  );
}
