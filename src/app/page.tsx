"use client";

import Link from "next/link";
import React from "react";
import {
  Scale,
  Car,
  Plane,
  Receipt,
  Hammer,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface GlassCardProps {
  title: string;
  desc: string;
  icon: React.ElementType;
  href?: string;
  badge?: string;
  disabled?: boolean;
}

function GlassCard({ title, desc, icon, href, badge, disabled }: GlassCardProps) {
  const Icon = icon;

  const badgeEl = badge ? (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
        badge.toLowerCase() === "live"
          ? "bg-slate-100 text-black ring-1 ring-[var(--accent-soft)]"
          : "bg-slate-100 text-black"
      }`}
    >
      {badge}
    </span>
  ) : null;

  const content = (
    <div className="space-y-2">
      <div className="flex items-start justify-between">
        <div className="rounded-xl border border-slate-800 bg-slate-950/30 p-1.5">
          <Icon className="h-4 w-4 text-slate-200" />
        </div>
        {badgeEl}
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-100">{title}</p>
        <p className="text-xs text-slate-300">{desc}</p>
      </div>

      {!disabled && (
        <div className="inline-flex items-center gap-1 text-xs font-semibold text-slate-200">
          Start
          <ArrowRight className="h-3 w-3" />
        </div>
      )}
    </div>
  );

  if (disabled) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-950/20 p-3 opacity-60 transition hover:border-[var(--accent-border)]">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href || "#"}
      className="group rounded-2xl border border-slate-800 bg-slate-950/25 p-3 hover:bg-slate-950/45 transition hover:border-[var(--accent-border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-soft)]"
    >
      {content}
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen text-slate-100">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.18),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(14,165,233,0.12),transparent_45%),radial-gradient(circle_at_50%_90%,rgba(99,102,241,0.10),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.0),rgba(2,6,23,0.6))]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-6 space-y-4">
        {/* Hero */}
        <section className="rounded-2xl border border-slate-800/70 bg-slate-900/40 backdrop-blur p-5 space-y-3 transition hover:border-[var(--accent-border)]">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/30 px-2 py-0.5 text-xs font-semibold text-slate-200">
            <Scale className="h-3 w-3" />
            Norge
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Finn ut om du <span className="text-slate-300">sannsynligvis</span> har et krav
          </h1>

          <p className="max-w-2xl text-sm text-slate-300">
            Enkle sjekker basert på norsk regelverk. Gratis vurdering – betal kun hvis du vil ha
            en rapport du kan sende videre.
          </p>

          <Link
            href="/bilkjop"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-black hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-[var(--accent-soft)]"
          >
            <Sparkles className="h-4 w-4" />
            Start med bilkjøp
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        {/* Value props */}
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/25 p-4 space-y-1.5 transition hover:border-[var(--accent-border)]">
            <ShieldCheck className="h-5 w-5 text-slate-200" />
            <p className="text-sm font-semibold">Nøktern vurdering</p>
            <p className="text-xs text-slate-300">
              Ikke advokatprat. Bare realistisk sannsynlighet og hvorfor.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/25 p-4 space-y-1.5 transition hover:border-[var(--accent-border)]">
            <Scale className="h-5 w-5 text-slate-200" />
            <p className="text-sm font-semibold">Bygget på lovverk</p>
            <p className="text-xs text-slate-300">
              Kjøpsloven og forbrukerkjøpsloven, forklart enkelt.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/25 p-4 space-y-1.5 transition hover:border-[var(--accent-border)]">
            <Receipt className="h-5 w-5 text-slate-200" />
            <p className="text-sm font-semibold">Klar PDF</p>
            <p className="text-xs text-slate-300">
              Last ned en rapport du faktisk kan sende til selger.
            </p>
          </div>
        </div>

        {/* Categories */}
        <section className="rounded-2xl border border-slate-800/70 bg-slate-900/40 backdrop-blur p-4 space-y-3 transition hover:border-[var(--accent-border)]">
          <h2 className="text-lg font-bold">Kategorier</h2>

          <div className="grid gap-3 md:grid-cols-2">
            <GlassCard
              title="Bilkjøp"
              desc="Privat eller forhandler. Feil, alder, km, pris og timing."
              icon={Car}
              href="/bilkjop"
              badge="Live"
            />

            <GlassCard
              title="Fly"
              desc="Forsinket eller kansellert fly? Sjekk rettigheter."
              icon={Plane}
              disabled
              badge="Kommer"
            />

            <GlassCard
              title="Reklamasjon (varer)"
              desc="Feil vare, mangler, reklamasjonstid."
              icon={Receipt}
              disabled
              badge="Senere"
            />

            <GlassCard
              title="Håndverker / tjenester"
              desc="Forsinkelse, prisoverslag, dårlig arbeid."
              icon={Hammer}
              disabled
              badge="Senere"
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="rounded-2xl border border-slate-800/70 bg-slate-900/40 backdrop-blur p-4 text-xs text-slate-300 transition hover:border-[var(--accent-border)]">
          <p className="text-sm font-semibold text-slate-100 mb-1">Viktig</p>
          <ul className="list-disc pl-4 space-y-0.5">
            <li>Dette er veiledning, ikke juridisk rådgivning</li>
            <li>Ingen innlogging eller lagring i denne MVP-en</li>
            <li>PDF-rapport er valgfri og koster litt</li>
          </ul>
        </footer>
      </div>
    </main>
  );
}