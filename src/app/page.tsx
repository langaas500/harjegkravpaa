// src/app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Car,
  Plane,
  Wrench,
  Package,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Clock,
} from "lucide-react";
import HeroProductPreview from "@/components/HeroProductPreview";

type Cat = {
  key: string;
  title: string;
  desc: string;
  href: string;
  icon: React.ElementType;
  disabled?: boolean;
  tag?: string;
};

export default function HomePage() {
  const router = useRouter();
  const [caseCount, setCaseCount] = useState(0);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => { if (d.count > 0) setCaseCount(d.count); })
      .catch(() => {});
  }, []);

  const cats: Cat[] = [
    {
      key: "kjoretoy",
      icon: Car,
      title: "Kjøretøy",
      desc: "Feil på bil eller MC etter kjøpet? Sjekk kravene dine på 2 min.",
      href: "/bilkjop",
      tag: "Mest brukt",
    },
    {
      key: "flyreiser",
      icon: Plane,
      title: "Flyreiser",
      desc: "Forsinket eller kansellert fly? Sjekk om du har krav på erstatning.",
      href: "/flyreiser",
    },
    {
      key: "handverkere",
      icon: Wrench,
      title: "Håndverkere",
      desc: "Dårlig arbeid eller uenighet om pris? Få en vurdering av saken.",
      href: "/handverkere",
    },
    {
      key: "reklamasjon",
      icon: Package,
      title: "Reklamasjon",
      desc: "Feil med varen? Finn ut om du har rett til omlevering eller refusjon.",
      href: "/snart?cat=reklamasjon",
      disabled: true,
    },
  ];

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#0a0f0d] text-white">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url(/bg.png)" }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0a0f0d]/80 via-[#0a0f0d]/60 to-[#0a0f0d]/90" />

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none -z-5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/[0.03] rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col px-6">
        {/* Top nav */}
        <header className="pt-5">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-emerald-400/90" />
              <span className="text-sm font-semibold tracking-tight text-white/90">
                Harjegkravpå.no
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-sm text-white/60">
              <Link
                href="/om-oss"
                className="hover:text-white/90 transition-colors"
              >
                Om oss
              </Link>
              <Link
                href="/kontakt"
                className="hover:text-white/90 transition-colors"
              >
                Kontakt oss
              </Link>
            </nav>

            <button
              onClick={() => router.push("/bilkjop")}
              className="rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-300 backdrop-blur-md transition-colors"
            >
              Start vurdering →
            </button>
          </div>
        </header>

        {/* Main content */}
        <div className="flex flex-1 flex-col justify-between pb-5 pt-8 md:pt-14">
          {/* Hero — text left, preview right */}
          <section className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
            {/* Left: text + CTA */}
            <div className="flex-1 max-w-xl">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-emerald-400 text-sm font-medium mb-6">
                <ShieldCheck className="h-3.5 w-3.5" />
                Basert på norsk forbrukerlov
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
                Finn ut om du har
                <br />
                <span className="bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                  krav etter kjøpet
                </span>
              </h1>

              <p className="mt-4 md:mt-6 text-base md:text-lg text-slate-400 leading-relaxed max-w-xl">
                Gratis, veiledende vurdering på ca. 2 minutter.
                <br className="hidden md:block" />
                Ingen konto. Ingen binding. Basert på din situasjon.
              </p>

              <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={() => router.push("/bilkjop")}
                  className="group inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-7 py-3.5 text-base font-bold text-black hover:bg-emerald-400 transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start gratis vurdering
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-emerald-500/60" />
                    Ca. 2 min
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-emerald-500/60" />
                    {caseCount > 0 ? `${caseCount}+ vurderinger` : "Gratis vurdering"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: animated product preview */}
            <div className="hidden lg:block flex-shrink-0">
              <HeroProductPreview />
            </div>
          </section>

          {/* Categories */}
          <section className="mt-10 md:mt-14">
            <div className="flex items-end justify-between gap-3 mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-white/80">
                Velg kategori
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {cats.map((c) => (
                <button
                  key={c.key}
                  onClick={() => !c.disabled && router.push(c.href)}
                  className={[
                    "group text-left rounded-2xl border bg-white/[0.04] backdrop-blur-md",
                    "px-5 py-4 md:px-6 md:py-5 transition-all",
                    c.disabled
                      ? "opacity-50 cursor-not-allowed border-white/[0.06]"
                      : "border-white/[0.08] hover:border-emerald-500/30 hover:bg-white/[0.07] hover:shadow-[0_0_30px_rgba(16,185,129,0.06)]",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={[
                        "mt-0.5 flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full border",
                        c.disabled
                          ? "border-white/[0.08] bg-white/[0.04]"
                          : "border-emerald-500/20 bg-emerald-500/[0.08] group-hover:bg-emerald-500/[0.12]",
                      ].join(" ")}
                    >
                      <c.icon
                        className={[
                          "h-5 w-5",
                          c.disabled ? "text-white/40" : "text-emerald-400/80",
                        ].join(" ")}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-lg md:text-xl font-semibold text-white/90">
                          {c.title}
                        </p>
                        {c.tag && (
                          <span className="text-xs font-medium text-emerald-400/80 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-0.5">
                            {c.tag}
                          </span>
                        )}
                        {c.disabled && (
                          <span className="text-xs text-slate-600">
                            Kommer snart
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">
                        {c.desc}
                      </p>
                      {!c.disabled && (
                        <span className="inline-flex items-center gap-1 mt-2.5 text-sm font-medium text-emerald-400/70 group-hover:text-emerald-400 transition-colors">
                          Start vurdering
                          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Intern SEO-lenker */}
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
              <Link
                href="/bilkjop/heving"
                className="hover:text-emerald-400/70 transition-colors"
              >
                Heving av bilkjøp
              </Link>
              <Link
                href="/bilkjop/bruktbil-feil"
                className="hover:text-emerald-400/70 transition-colors"
              >
                Kjøpt bruktbil med feil?
              </Link>
              <Link
                href="/bilkjop/reklamasjon-bruktbil"
                className="hover:text-emerald-400/70 transition-colors"
              >
                Reklamasjon på bruktbil
              </Link>
            </div>
          </section>

          {/* Trust bar */}
          <section className="mt-8 md:mt-10">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500/50" />
                Gratis vurdering
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500/50" />
                Ingen registrering
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500/50" />
                Basert på norsk lov
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500/50" />
                AI-drevet analyse
              </span>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="pb-5">
          <div className="text-center text-xs text-slate-600">
            <Link
              href="/bruksvilkar"
              className="hover:text-slate-400 transition-colors"
            >
              Bruksvilkår
            </Link>{" "}
            ·{" "}
            <Link
              href="/personvern"
              className="hover:text-slate-400 transition-colors"
            >
              Personvern
            </Link>{" "}
            ·{" "}
            <Link
              href="/kontakt"
              className="hover:text-slate-400 transition-colors"
            >
              Kontakt oss
            </Link>{" "}
            ·{" "}
            <a
              href="https://solutionsbylangaas.no"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-400 transition-colors"
            >
              Utviklet av Langaas
            </a>{" "}
            ·{" "}
            <a
              href="mailto:kontakt@harjegkravpaa.no"
              className="hover:text-slate-400 transition-colors"
            >
              kontakt@harjegkravpaa.no
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}