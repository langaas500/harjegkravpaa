"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Users } from "lucide-react";

export function CaseCounter() {
  const [caseCount, setCaseCount] = useState(0);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => {
        if (d.count > 0) setCaseCount(d.count);
      })
      .catch(() => {});
  }, []);

  return (
    <span className="flex items-center gap-1.5">
      <Users className="h-3.5 w-3.5 text-emerald-500/60" />
      {caseCount > 0 ? `${caseCount}+ vurderinger` : "Rapport + kravbrev — 99 kr"}
    </span>
  );
}

export function FaqAccordion({
  faqs,
}: {
  faqs: { q: string; a: string }[];
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="rounded-xl border border-white/[0.08] bg-white/[0.04]"
        >
          <button
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
            className="flex items-center justify-between w-full px-5 py-3.5 text-left text-sm font-medium text-white/90"
          >
            {faq.q}
            <ChevronDown
              className={`h-4 w-4 text-slate-500 transition-transform flex-shrink-0 ml-3 ${openFaq === i ? "rotate-180" : ""}`}
            />
          </button>
          {openFaq === i && (
            <div className="px-5 pb-4 text-sm text-slate-400 leading-relaxed">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function StickyMobileCta() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${showSticky ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="bg-[#0a0f0d]/95 backdrop-blur-md border-t border-white/[0.08] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex items-center justify-between gap-3">
        <div className="text-xs text-slate-500 leading-tight">
          Tar 2-3 min
        </div>
        <Link
          href="/bilkjop"
          className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-black hover:bg-emerald-400 transition-colors flex-shrink-0"
        >
          Sjekk saken din — 99 kr
        </Link>
      </div>
    </div>
  );
}
