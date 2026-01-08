"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Scale,
  FileText,
  Shield,
  CheckCircle,
  Car,
  Plane,
  Package,
  Wrench,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="px-4 pt-8 pb-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-3">
              <Sparkles className="h-3 w-3 text-pink-400" />
              <span className="text-xs text-slate-300">AI-drevet juridisk vurdering</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">
              Har du krav?
              <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Få svar på sekunder.
              </span>
            </h1>

            <p className="text-sm text-slate-400 mb-4 max-w-lg mx-auto">
              Vår AI analyserer saken din basert på norsk lovverk og gir deg en profesjonell vurdering.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 justify-center mb-3">
              <button
                onClick={() => router.push("/bilkjop")}
                className="group px-5 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl font-semibold text-sm hover:from-pink-500 hover:to-purple-500 transition-all shadow-lg shadow-pink-500/25"
              >
                <span className="flex items-center justify-center gap-2">
                  Start gratis vurdering
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button
                onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })}
                className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl font-semibold text-sm hover:bg-white/10 transition-all"
              >
                Se kategorier
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Gratis vurdering</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Basert på norsk lov</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Svar på 30 sekunder</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-4 py-3">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { icon: Scale, title: "Juridisk grunnlag", desc: "Kjøpsloven og Forbrukerkjøpsloven", gradient: "from-pink-500 to-rose-500" },
                { icon: Shield, title: "Nøktern analyse", desc: "Realistisk sannsynlighet", gradient: "from-purple-500 to-indigo-500" },
                { icon: FileText, title: "Profesjonell rapport", desc: "PDF du kan sende til selger", gradient: "from-blue-500 to-cyan-500" },
              ].map((feature, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] transition-all">
                  <div className={`inline-flex p-1.5 rounded-lg bg-gradient-to-br ${feature.gradient} mb-2`}>
                    <feature.icon className="h-3.5 w-3.5 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold mb-0.5">{feature.title}</h3>
                  <p className="text-slate-400 text-xs">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section id="categories" className="px-4 py-3">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-lg font-bold mb-3 text-center">Velg kategori</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {/* Bilkjøp */}
              <button
                onClick={() => router.push("/bilkjop")}
                className="group p-3 rounded-xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 hover:border-pink-500/40 transition-all text-left"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="p-1.5 rounded-lg bg-pink-500/20">
                    <Car className="h-4 w-4 text-pink-400" />
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px]">Live</span>
                </div>
                <h3 className="font-bold text-sm mb-0.5">Bilkjøp</h3>
                <p className="text-slate-400 text-[11px] mb-1">Kjøpt bil med feil?</p>
                <span className="text-pink-400 text-xs font-medium flex items-center gap-1">
                  Start <ArrowRight className="h-2.5 w-2.5" />
                </span>
              </button>

              {/* Fly */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-left opacity-50">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="p-1.5 rounded-lg bg-white/10">
                    <Plane className="h-4 w-4 text-slate-400" />
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full bg-white/10 text-slate-400 text-[10px]">Snart</span>
                </div>
                <h3 className="font-bold text-sm mb-0.5">Flyreiser</h3>
                <p className="text-slate-500 text-[11px]">Forsinket fly?</p>
              </div>

              {/* Reklamasjon */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-left opacity-50">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="p-1.5 rounded-lg bg-white/10">
                    <Package className="h-4 w-4 text-slate-400" />
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full bg-white/10 text-slate-400 text-[10px]">Snart</span>
                </div>
                <h3 className="font-bold text-sm mb-0.5">Reklamasjon</h3>
                <p className="text-slate-500 text-[11px]">Feil på varer?</p>
              </div>

              {/* Håndverker */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-left opacity-50">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="p-1.5 rounded-lg bg-white/10">
                    <Wrench className="h-4 w-4 text-slate-400" />
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full bg-white/10 text-slate-400 text-[10px]">Snart</span>
                </div>
                <h3 className="font-bold text-sm mb-0.5">Håndverker</h3>
                <p className="text-slate-500 text-[11px]">Dårlig arbeid?</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA - Inline */}
        <section className="px-4 py-2">
          <div className="max-w-2xl mx-auto">
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-between">
              <span className="text-sm text-slate-300">Gratis vurdering – rapport kun <span className="font-bold text-white">49 kr</span></span>
              <button
                onClick={() => router.push("/bilkjop")}
                className="px-4 py-1.5 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-all text-sm"
              >
                Prøv gratis
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-2 border-t border-white/5">
          <div className="max-w-5xl mx-auto flex justify-between items-center text-[11px] text-slate-500">
            <span>© 2026 HarJegKravPå.no</span>
            <span>Veiledning, ikke juridisk rådgivning</span>
          </div>
        </footer>
      </div>
    </main>
  );
}