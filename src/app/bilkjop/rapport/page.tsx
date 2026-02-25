"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import ReportPaywall from "@/components/bilkjop/ReportPaywall";

interface ReportData {
  sellerType: "PRIVATE" | "DEALER";
  vehicle: any;
  buyerName: string;
  sellerName: string;
  issues: string[];
  outcome: any;
  access_token: string;
}

export default function RapportPage() {
  const router = useRouter();
  const [data, setData] = useState<ReportData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("bilkjop-data");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (!data) {
    return (
      <main className="bg-[#0a0f0d] text-white min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </main>
    );
  }

  return (
    <main className="bg-[#0a0f0d] text-white min-h-screen relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-600/[0.03] rounded-full blur-[100px]" />
      </div>
      <div className="relative z-10 mx-auto max-w-2xl px-4 py-10 space-y-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Tilbake
        </button>

        <ReportPaywall
          accessToken={data.access_token}
          outcome={data.outcome}
          buyerName={data.buyerName}
          sellerName={data.sellerName}
          sellerType={data.sellerType}
          vehicle={data.vehicle}
        />
      </div>
    </main>
  );
}
