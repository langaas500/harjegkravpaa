"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Car, Plane, Package, Wrench, ChevronDown } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  const showSocialProof = true;

  const soonCats = [
    { key: "reklamasjon", icon: Package, title: "Reklamasjon", desc: "Feil vare?" },
    { key: "handverker", icon: Wrench, title: "Håndverker", desc: "Dårlig arbeid?" },
  ] as const;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero - én ting i fokus */}
      <section className="relative min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-4 text-center">
        {showSocialProof ? (
          <p className="text-sm text-slate-500 mb-8">
            52 har sjekket saken sin denne uken
          </p>
        ) : (
          <p className="text-sm text-slate-500 mb-8">
            Basert på norsk lov • Gratis vurdering • Ingen persondata lagres
          </p>
        )}

        <h1 className="text-5xl md:text-7xl font-bold max-w-4xl leading-[1.1] mb-4">
          Finn ut om du har krav
        </h1>

        <p className="text-xl md:text-2xl text-slate-400 mb-8 max-w-xl">
          før du gir opp eller betaler advokat
        </p>

        <button
          onClick={() => router.push("/bilkjop")}
          className="group px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-slate-100 transition-all mb-4"
        >
          <span className="flex items-center gap-3">
            Sjekk saken din
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>

        <p className="text-sm text-slate-600">
          Tar 2 minutter • Gratis vurdering • Rapport 49 kr (valgfritt)
        </p>

        <p className="mt-3 text-xs text-slate-700 max-w-xl">
          Veiledende vurdering, ikke juridisk rådgivning. Resultat avhenger av fakta og dokumentasjon.
        </p>

        {/* Minimal kategorirad */}
        <div className="mt-10 w-full max-w-3xl">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-px w-10 bg-white/10" />
            <p className="text-xs text-slate-500 uppercase tracking-wide">Kategorier</p>
            <span className="h-px w-10 bg-white/10" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {/* Bilkjøp LIVE */}
            <button
              onClick={() => router.push("/bilkjop")}
              className="group text-left rounded-2xl border border-emerald-500/25 bg-emerald-500/10 hover:bg-emerald-500/12 transition-all p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2">
                  <Car className="h-4 w-4 text-emerald-300" />
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-200">
                  Live
                </span>
              </div>
              <p className="font-semibold text-white text-sm">Bilkjøp</p>
              <p className="text-xs text-slate-300 mt-1">Feil på bilen?</p>
              <p className="text-xs text-emerald-200 mt-2 flex items-center gap-1">
                Start{" "}
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </p>
            </button>

            {/* Flyreiser LIVE */}
            <button
              onClick={() => router.push("/flyreiser")}
              className="group text-left rounded-2xl border border-emerald-500/25 bg-emerald-500/10 hover:bg-emerald-500/12 transition-all p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2">
                  <Plane className="h-4 w-4 text-emerald-300" />
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-200">
                  Live
                </span>
              </div>
              <p className="font-semibold text-white text-sm">Flyreiser</p>
              <p className="text-xs text-slate-300 mt-1">Forsinket eller kansellert?</p>
              <p className="text-xs text-emerald-200 mt-2 flex items-center gap-1">
                Sjekk flyreisen{" "}
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </p>
            </button>

            {/* Snart-kategorier (klikkbare til waitlist-side) */}
            {soonCats.map((c) => (
              <button
                key={c.key}
                onClick={() => router.push(`/snart?cat=${encodeURIComponent(c.key)}`)}
                className="group text-left rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition-all p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2">
                    <c.icon className="h-4 w-4 text-slate-200" />
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-200">
                    Snart
                  </span>
                </div>
                <p className="font-semibold text-white text-sm">{c.title}</p>
                <p className="text-xs text-slate-400 mt-1">{c.desc}</p>
                <p className="text-xs text-slate-500 mt-2 group-hover:text-slate-300 transition-colors">
                  Varsle meg
                </p>
              </button>
            ))}
          </div>

          <p className="mt-3 text-[11px] text-slate-600">
            Bilkjøp og flyreiser er live nå. Klikk &ldquo;Snart&rdquo; for å få beskjed når vi lanserer flere.
          </p>
        </div>

        {/* Scroll-indikator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-slate-500" />
        </div>
      </section>

      {/* Under fold - kort og skummbar */}
      <section className="border-t border-white/5 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-14">
            <p className="text-slate-500 text-sm uppercase tracking-wide mb-6">
              Høres dette kjent ut?
            </p>
            <div className="space-y-3 text-lg text-slate-300">
              <p>"Feil oppstår kort tid etter kjøp."</p>
              <p>"Selger svarer tregt eller ikke i det hele tatt."</p>
              <p>"Forhandler skylder på deg."</p>
              <p>"Du vet ikke hva du kan kreve."</p>
            </div>
          </div>

          <div className="mb-14">
            <p className="text-slate-500 text-sm uppercase tracking-wide mb-6">
              Det du får
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <p className="text-3xl font-bold text-white mb-2">Svar</p>
                <p className="text-slate-400">
                  Realistisk vurdering: ja / nei / usikkert, med kort begrunnelse.
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white mb-2">Dokumentasjon</p>
                <p className="text-slate-400">
                  PDF-rapport med struktur og lovhenvisninger du kan sende til selger.
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white mb-2">Tyngde</p>
                <p className="text-slate-400">
                  En vag melding kan ignoreres. Et ryddig dokument gjør dialogen mer seriøs.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <p className="text-slate-500 text-sm uppercase tracking-wide mb-6">Pris</p>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-bold text-white">49 kr</span>
              <span className="text-slate-500 text-lg">for rapport</span>
            </div>
            <p className="text-slate-600 mt-3">
              Vurderingen er gratis. Du betaler kun hvis du vil ha rapporten.
            </p>

            <div className="text-center mt-10">
              <button
                onClick={() => router.push("/bilkjop")}
                className="group px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-slate-100 transition-all"
              >
                <span className="flex items-center gap-3">
                  Start gratis vurdering
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-6 px-4">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-slate-600">
          <span>© 2026 harjegkravpå.no</span>
          <span>Veiledende vurdering, ikke juridisk rådgivning</span>
        </div>
      </footer>
    </main>
  );
}