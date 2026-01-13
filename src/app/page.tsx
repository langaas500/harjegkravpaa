"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Car, Plane, Package, Wrench, ChevronDown } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  const liveCats = [
    { key: "bilkjop", icon: Car, title: "Bilkjøp", desc: "Kjøpt bil som er ødelagt?", href: "/bilkjop" },
    { key: "flyreiser", icon: Plane, title: "Flyreiser", desc: "Forsinket eller kansellert fly?", href: "/flyreiser" },
  ] as const;

  const soonCats = [
    { key: "handverker", icon: Wrench, title: "Håndverkere", desc: "Dårlig utført håndverkerjobb?" },
    { key: "reklamasjon", icon: Package, title: "Reklamasjon", desc: "Feil på varer eller tjenester?" },
  ] as const;

  return (
    <main className="bg-nordic text-white">
      {/* Hero */}
      <section className="relative min-h-[calc(100vh-120px)] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl leading-[1.1] mb-4">
          Finn ut om du har krav
        </h1>

        <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-lg">
          før du gir opp eller betaler advokat
        </p>

        <button
          onClick={() => document.getElementById("kategorier")?.scrollIntoView({ behavior: "smooth" })}
          className="group px-8 py-4 bg-[#1F4F45] text-[#ECFDF5] font-semibold text-lg rounded-xl hover:bg-[#246457] transition-all mb-4"
        >
          <span className="flex items-center gap-3">
            Sjekk saken din
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>

        <p className="text-sm text-slate-500">
          Tar 2 minutter • Gratis vurdering • Rapport du kan bruke til å klage
        </p>

        <p className="mt-3 text-xs text-slate-600 max-w-lg">
          Vurderingen er veiledende og basert på opplysninger du har meldt inn om saken.
        </p>

        {/* Kategorier */}
        <div id="kategorier" className="mt-12 w-full max-w-3xl">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-px w-10 bg-white/10" />
            <p className="text-xs text-slate-500 uppercase tracking-widest">Kategorier</p>
            <span className="h-px w-10 bg-white/10" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Live kategorier */}
            {liveCats.map((c) => (
              <button
                key={c.key}
                onClick={() => router.push(c.href)}
                className="group text-left rounded-2xl border border-[rgba(31,79,69,0.25)] bg-white/[0.03] hover:bg-white/[0.06] hover:border-[rgba(31,79,69,0.4)] transition-all p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                    <c.icon className="h-4 w-4 text-slate-300" />
                  </div>
                </div>
                <p className="font-semibold text-white text-sm">{c.title}</p>
                <p className="text-xs text-slate-400 mt-1">{c.desc}</p>
              </button>
            ))}

            {/* Snart kategorier */}
            {soonCats.map((c) => (
              <button
                key={c.key}
                onClick={() => router.push(`/snart?cat=${encodeURIComponent(c.key)}`)}
                className="group text-left rounded-2xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] transition-all p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                    <c.icon className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
                <p className="font-semibold text-white text-sm">{c.title}</p>
                <p className="text-xs text-slate-500 mt-1">{c.desc}</p>
              </button>
            ))}
          </div>

          <p className="mt-4 text-xs text-slate-600">
            Tar 2 minutter • Gratis vurdering • Rapport du kan bruke til å klage
          </p>
        </div>

        {/* Scroll-indikator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-5 w-5 text-slate-600" />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 px-4">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-slate-600">
          <span>Bruksvilkår • Personvern • Kontakt oss</span>
        </div>
      </footer>
    </main>
  );
}
