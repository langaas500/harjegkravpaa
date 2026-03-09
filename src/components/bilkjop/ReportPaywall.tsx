"use client";

import React, { useState, useEffect } from "react";
import { Loader2, CreditCard, FileText, CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/posthog";

interface ReportPaywallProps {
  accessToken: string | null;
  outcome: { level: string; title: string } | null;
  category?: string;
  kravbrevReturnPath?: string;
  reportReturnPath?: string;
  summaryRows: { label: string; value: string }[];
}

const SHOW_REPORT_OPTION = false;

export default function ReportPaywall({
  accessToken,
  outcome,
  category = "bilkjop",
  kravbrevReturnPath = "/bilkjop/kravbrev/betalt",
  reportReturnPath = "/bilkjop/betalt",
  summaryRows,
}: ReportPaywallProps) {
  const [isLoading, setIsLoading] = useState(false);

  function track(event: string, product?: string) {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, category, product, ts: Date.now() }),
    }).catch(() => {});
  }

  useEffect(() => {
    track("paywall_open");
    trackEvent('paywall_view', { case_type: category });
  }, []);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      track("checkout_start", "REPORT");
      trackEvent('checkout_start', { case_type: category, product: 'REPORT' });

      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: accessToken || undefined,
          productType: "REPORT",
          category,
          returnPath: reportReturnPath,
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

  const handleKravbrevPayment = async () => {
    setIsLoading(true);
    try {
      track("checkout_start", "KRAVBREV");
      trackEvent('checkout_start', { case_type: category, product: 'KRAVBREV' });

      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: accessToken || undefined,
          productType: "KRAVBREV",
          category,
          returnPath: kravbrevReturnPath,
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

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Vurderingen er fullført</h3>

      <div
        className={`rounded-xl p-5 ${
          outcome?.level === "GREEN"
            ? "bg-emerald-500/10 border border-emerald-500/30"
            : outcome?.level === "YELLOW"
            ? "bg-amber-500/10 border border-amber-500/30"
            : "bg-red-500/10 border border-red-500/30"
        }`}
      >
        <p className="font-semibold text-lg">{outcome?.title}</p>
      </div>

      <div className="space-y-3 text-sm">
        {summaryRows.map((row, i) => (
          <div
            key={i}
            className={`flex justify-between py-2 ${
              i < summaryRows.length - 1 ? "border-b border-white/5" : ""
            }`}
          >
            <span className="text-slate-400">{row.label}</span>
            <span>{row.value || "Ikke oppgitt"}</span>
          </div>
        ))}
      </div>

      {SHOW_REPORT_OPTION && (
        <div className="border-t border-white/10 pt-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl border border-white/10 bg-white/[0.03]">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Komplett PDF-rapport</p>
                  <p className="text-xs text-slate-400">
                    3 sider med vurdering og lovhenvisninger
                  </p>
                </div>
              </div>
              <p className="text-2xl font-bold">99 kr</p>
            </div>
          </div>
          <button
            onClick={handlePayment}
            disabled={isLoading}
            className="group w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-4 font-bold text-lg hover:bg-emerald-400 transition disabled:opacity-60"
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
      )}

      <div className="border-t border-white/10 pt-6">
        <h3 className="text-xl font-bold mb-1">Juridisk rapport + kravbrev – 99 kr</h3>
        <p className="text-sm text-slate-400 mb-5">Du får juridisk rapport og ferdig kravbrev til selger i én pakke.</p>

        <ul className="space-y-2.5 mb-6">
          {[
            "Tilpasset din sak",
            "Relevant lovhenvisning inkludert",
            "Juridisk korrekt svarfrist inkludert",
            "Hva du gjør hvis motparten sier nei",
            "Full juridisk vurdering i PDF (3–5 sider)",
          ].map((text) => (
            <li key={text} className="flex items-start gap-2.5 text-sm text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-500/70 mt-0.5 shrink-0" />
              {text}
            </li>
          ))}
        </ul>

        <button
          onClick={handleKravbrevPayment}
          disabled={isLoading}
          className="group w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-4 font-bold text-lg hover:bg-emerald-400 transition disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Starter betaling...
            </>
          ) : (
            <>
              Send korrekt krav nå →
            </>
          )}
        </button>

        <p className="text-xs text-slate-500 text-center mt-3">
          15 minutter hos advokat koster ofte 1 000–2 000 kr.
        </p>
      </div>
    </div>
  );
}
