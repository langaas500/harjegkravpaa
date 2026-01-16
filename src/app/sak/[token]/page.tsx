"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  FileText,
  Download,
  Loader2,
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Clock,
} from "lucide-react";

interface CaseData {
  id: string;
  case_type: string;
  payload: Record<string, unknown>;
  outcome?: Record<string, unknown>;
  status: string;
  created_at: string;
}

export default function SakPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;

  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCase = async () => {
      if (!token) {
        setError("Ugyldig lenke");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/sak/${token}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Kunne ikke hente saken");
          return;
        }

        setCaseData(data);

        // Lagre data i localStorage for å kunne vise rapport/kravbrev
        if (data.case_type === "HANDVERK") {
          localStorage.setItem("handverk-data", JSON.stringify({
            ...data.payload,
            outcome: data.outcome,
            caseId: data.id,
            access_token: token,
          }));
        } else if (data.case_type === "BIL") {
          localStorage.setItem("bilkjop-data", JSON.stringify({
            ...data.payload,
            outcome: data.outcome,
            caseId: data.id,
            access_token: token,
          }));
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Kunne ikke hente saken. Prøv igjen senere.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCase();
  }, [token]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("nb-NO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getCaseTypeLabel = (type: string) => {
    switch (type) {
      case "HANDVERK":
        return "Håndverkertjeneste";
      case "BIL":
        return "Bilkjøp";
      case "FLYREISER":
        return "Flyreise";
      default:
        return type;
    }
  };

  const getOutcomeColor = (level: string | undefined) => {
    switch (level) {
      case "GREEN":
        return "text-green-400 bg-green-500/10 border-green-500/30";
      case "YELLOW":
        return "text-amber-400 bg-amber-500/10 border-amber-500/30";
      case "RED":
        return "text-red-400 bg-red-500/10 border-red-500/30";
      default:
        return "text-slate-400 bg-slate-500/10 border-slate-500/30";
    }
  };

  if (isLoading) {
    return (
      <main className="bg-nordic text-white min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-white mx-auto" />
          <p className="text-slate-400">Henter saken din...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-nordic text-white min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <p className="text-red-400">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="text-slate-400 hover:text-white transition"
          >
            Gå til forsiden
          </button>
        </div>
      </main>
    );
  }

  if (!caseData) {
    return null;
  }

  const outcomeLevel = caseData.outcome?.level as string | undefined;

  return (
    <main className="bg-nordic text-white min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Til forsiden
        </button>

        <div className="flex items-center gap-4">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Din sak</h1>
            <p className="text-slate-500">{getCaseTypeLabel(caseData.case_type)}</p>
          </div>
        </div>

        {/* Saksstatus */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-slate-400" />
              <span className="text-sm text-slate-400">Opprettet {formatDate(caseData.created_at)}</span>
            </div>
            {caseData.status === "completed" && (
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Fullført</span>
              </div>
            )}
          </div>

          {caseData.outcome && (
            <div className={`rounded-lg border p-4 ${getOutcomeColor(outcomeLevel)}`}>
              <p className="font-medium">
                {(caseData.outcome.headline as string) || "Vurdering fullført"}
              </p>
              <p className="text-sm mt-1 opacity-80">
                {(caseData.outcome.summary as string)?.slice(0, 200)}...
              </p>
            </div>
          )}
        </div>

        {/* Handlinger */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Dine dokumenter</h2>

          <div className="grid gap-3">
            <button
              onClick={() => {
                if (caseData.case_type === "HANDVERK") {
                  router.push("/handverkere/betalt");
                } else if (caseData.case_type === "BIL") {
                  router.push("/bilkjop/betalt");
                }
              }}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:border-white/20 transition"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-teal-400" />
                <div className="text-left">
                  <p className="font-medium">Juridisk vurdering</p>
                  <p className="text-sm text-slate-400">Se og last ned rapporten</p>
                </div>
              </div>
              <Download className="h-5 w-5 text-slate-500" />
            </button>

            <button
              onClick={() => {
                if (caseData.case_type === "HANDVERK") {
                  router.push("/handverkere/kravbrev/betalt");
                } else if (caseData.case_type === "BIL") {
                  router.push("/bilkjop/kravbrev/betalt");
                }
              }}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:border-white/20 transition"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-400" />
                <div className="text-left">
                  <p className="font-medium">Kravbrev</p>
                  <p className="text-sm text-slate-400">Se og last ned kravbrevet</p>
                </div>
              </div>
              <Download className="h-5 w-5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Hva nå */}
        <button
          onClick={() => router.push("/hva-na")}
          className="w-full py-4 rounded-full bg-teal-500 text-[#0c1220] font-bold text-lg hover:bg-teal-400 transition"
        >
          Hva gjør jeg nå?
        </button>

        <div className="text-center text-xs text-slate-600 pt-4">
          <p>harjegkravpå.no – Veiledning, ikke juridisk rådgivning.</p>
        </div>
      </div>
    </main>
  );
}
