"use client";

import React, { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Mail, CheckCircle2, ArrowLeft } from "lucide-react";

const CAT_LABELS: Record<string, { title: string; desc: string }> = {
  flyreiser: { title: "Flyreiser", desc: "Forsinkelser, kansellering, bagasje og refusjon." },
  reklamasjon: { title: "Reklamasjon", desc: "Feil på varer, angrerett og krav mot selger." },
  handverker: { title: "Håndverker", desc: "Dårlig arbeid, pris, reklamasjon og utbedring." },
};

function SoonContent() {
  const params = useSearchParams();
  const cat = params.get("cat") || "flyreiser";

  const info = useMemo(() => {
    return CAT_LABELS[cat] ?? { title: "Kategori", desc: "Vi lanserer snart." };
  }, [cat]);

  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function isValidEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const v = email.trim().toLowerCase();
    if (!isValidEmail(v)) {
      setError("Skriv inn en gyldig e-postadresse.");
      return;
    }

    // (Backup) lagre lokalt også
    const key = "hjkp_whitelist_v1";
    const raw = typeof window !== "undefined" ? localStorage.getItem(key) : null;
    const list: Array<{ email: string; cat: string; createdAt: string }> = raw ? JSON.parse(raw) : [];

    const exists = list.some((x) => x.email === v && x.cat === cat);
    const next = exists ? list : [...list, { email: v, cat, createdAt: new Date().toISOString() }];
    localStorage.setItem(key, JSON.stringify(next));

    try {
      const res = await fetch("/api/whitelist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: v, source: `snart:${cat}` }),
      });

      const json = await res.json().catch(() => ({} as any));

      if (!res.ok || json?.ok === false) {
        setError(json?.error || "Kunne ikke lagre e-post. Prøv igjen.");
        return;
      }

      setSaved(true);
    } catch (err) {
      console.error("Waitlist submit error:", err);
      setError("Kunne ikke kontakte server. Prøv igjen.");
    }
  }

  return (
    <div className="mx-auto max-w-xl py-10">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
        <ArrowLeft className="h-4 w-4" />
        Tilbake
      </Link>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <p className="text-xs uppercase tracking-wide text-amber-200/90">Kommer snart</p>
        <h1 className="mt-2 text-3xl font-bold">{info.title}</h1>
        <p className="mt-2 text-slate-400">{info.desc}</p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
          Vær blant de første til å teste. Legg inn e-post, så gir vi beskjed når vi lanserer.
        </div>

        {!saved ? (
          <form onSubmit={onSubmit} className="mt-6 space-y-3">
            <label className="block text-sm text-slate-300">
              E-post
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-3 py-3">
                <Mail className="h-4 w-4 text-slate-400" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="navn@epost.no"
                  className="w-full bg-transparent outline-none text-white placeholder:text-slate-600"
                  inputMode="email"
                  autoComplete="email"
                />
              </div>
            </label>

            {error && <p className="text-sm text-rose-300">{error}</p>}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 font-bold text-black hover:bg-emerald-400"
            >
              Varsle meg <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        ) : (
          <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-300 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Takk! Du står på lista.</p>
                <p className="text-sm text-slate-300 mt-1">Vi gir beskjed når {info.title} lanseres.</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-sm text-slate-400 mb-3">Vil du sjekke bilkjøp nå?</p>
          <Link
            href="/bilkjop"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 font-semibold hover:bg-white/[0.05]"
          >
            Start bilkjøp (live) <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SoonPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white px-4">
      <Suspense fallback={<div className="mx-auto max-w-xl py-10 text-slate-400">Laster...</div>}>
        <SoonContent />
      </Suspense>
    </main>
  );
}
