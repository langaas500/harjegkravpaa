// src/app/snart/page.tsx
"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Mail, CheckCircle2, TriangleAlert } from "lucide-react";

type CatKey = "flyreiser" | "bolig" | "handverkere" | "kvittering" | "annet";

const CAT_META: Record<string, { title: string; subtitle: string }> = {
  flyreiser: {
    title: "Flyreiser",
    subtitle: "Forsinkelser, kansellering, bagasje og refusjon.",
  },
  bolig: {
    title: "Bolig",
    subtitle: "Leie, depositum, oppsigelse og mangler.",
  },
  handverkere: {
    title: "Håndverkere",
    subtitle: "Forsinkelser, prisavslag, reklamasjon og tvist.",
  },
  kvittering: {
    title: "Kvittering",
    subtitle: "Dokumentasjon, garantier og angrerett.",
  },
  annet: {
    title: "Kommer snart",
    subtitle: "Vi bygger nye sjekker fortløpende.",
  },
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase());
}

export default function SnartPage() {
  const sp = useSearchParams();
  const catParam = (sp.get("cat") || "annet").toLowerCase();
  const cat: CatKey = (Object.keys(CAT_META).includes(catParam) ? catParam : "annet") as CatKey;

  const meta = useMemo(() => CAT_META[cat], [cat]);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const cleaned = email.trim().toLowerCase();

    if (!isValidEmail(cleaned)) {
      setStatus("error");
      setMessage("Skriv inn en gyldig e-postadresse.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/whitelist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleaned, source: `snart:${cat}` }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data?.ok === false) {
        setStatus("error");
        setMessage(data?.error || "Kunne ikke lagre e-post. Prøv igjen.");
        return;
      }

      setStatus("success");
      setMessage("Takk! Du er på listen. Vi gir beskjed når dette lanseres.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Nettverksfeil. Prøv igjen.");
    }
  }

  return (
    <main className="min-h-[calc(100vh-64px)] px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-slate-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Tilbake
          </Link>
        </div>

        <div className="mx-auto max-w-xl rounded-3xl border border-slate-800/70 bg-slate-900/40 backdrop-blur p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] space-y-5">
          <div className="space-y-2">
            <div className="text-[11px] tracking-widest text-amber-200/80">KOMMER SNART</div>
            <h1 className="text-3xl font-semibold text-slate-50">{meta.title}</h1>
            <p className="text-slate-300">{meta.subtitle}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-sm text-slate-200">
            Vær blant de første til å teste. Legg inn e-post, så gir vi beskjed når vi lanserer.
          </div>

          <form onSubmit={onSubmit} className="space-y-3">
            <label className="block text-sm text-slate-200">E-post</label>

            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading" || status === "success"}
                placeholder="navn@epost.no"
                className="w-full rounded-xl border border-slate-800 bg-slate-950/60 py-2.5 pl-10 pr-3 text-slate-100 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-emerald-500/40"
                inputMode="email"
                autoComplete="email"
              />
            </div>

            {status === "error" && (
              <div className="flex items-start gap-2 text-sm text-red-300">
                <TriangleAlert className="mt-0.5 h-4 w-4" />
                <span>{message || "Kunne ikke lagre e-post. Prøv igjen."}</span>
              </div>
            )}

            {status === "success" && (
              <div className="flex items-start gap-2 text-sm text-emerald-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4" />
                <span>{message}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="inline-flex items-center justify-center gap-2">
                {status === "loading" ? "Lagrer..." : "Varsle meg"}
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          </form>

          <div className="border-t border-slate-800/80 pt-4">
            <div className="mb-2 text-sm text-slate-300">Vil du sjekke bilkjøp nå?</div>
            <Link
              href="/bilkjop"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3 font-semibold text-slate-100 hover:bg-slate-950/60"
            >
              Start bilkjøp (live)
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
