"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Scale, FileText, Shield, CheckCircle, Car, Plane, Package, Wrench, Sparkles } from "lucide-react";
import AppHeader from "./components/AppHeader";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <AppHeader />

        {/* Hero Section */}
        <section className="px-4 pt-20 pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <Sparkles className="h-4 w-4 text-pink-400" />
              <span className="text-sm text-slate-300">AI-drevet juridisk vurdering</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Har du krav?
              <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Få svar på sekunder.
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Vår AI analyserer saken din basert på norsk lovverk og gir deg en 
              profesjonell vurdering av dine rettigheter.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/bilkjop")}
                className="group px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl font-semibold text-lg hover:from-pink-500 hover:to-purple-500 transition-all shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40"
              >
                <span className="flex items-center justify-center gap-2">
                  Start gratis vurdering
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all"
              >
                Hvordan fungerer det?
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-8 mt-16 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Gratis vurdering</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Basert på norsk lov</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Svar på 30 sekunder</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Scale,
                  title: "Juridisk grunnlag",
                  desc: "Vurdering basert på Kjøpsloven og Forbrukerkjøpsloven",
                  gradient: "from-pink-500 to-rose-500"
                },
                {
                  icon: Shield,
                  title: "Nøktern analyse",
                  desc: "Ingen falske forhåpninger - bare realistisk sannsynlighet",
                  gradient: "from-purple-500 to-indigo-500"
                },
                {
                  icon: FileText,
                  title: "Profesjonell rapport",
                  desc: "PDF du kan sende til selger eller bruke videre",
                  gradient: "from-blue-500 to-cyan-500"
                }
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group p-8 rounded-3xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all"
                >
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-5`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section id="how-it-works" className="px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Velg din kategori</h2>
              <p className="text-slate-400 text-lg">Hva trenger du hjelp med?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Bilkjøp - Active */}
              <button
                onClick={() => router.push("/bilkjop")}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 hover:border-pink-500/40 transition-all text-left overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-pink-500/20">
                      <Car className="h-8 w-8 text-pink-400" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                      Live
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Bilkjøp</h3>
                  <p className="text-slate-400 mb-4">Kjøpt bil med feil? Sjekk om du har krav på reparasjon, prisavslag eller heving.</p>
                  <span className="inline-flex items-center gap-2 text-pink-400 font-medium group-hover:gap-3 transition-all">
                    Start vurdering <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </button>

              {/* Fly - Coming */}
              <div className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] text-left opacity-60">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-white/10">
                    <Plane className="h-8 w-8 text-slate-400" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-slate-400 text-sm font-medium">
                    Kommer snart
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Flyreiser</h3>
                <p className="text-slate-500">Forsinket eller kansellert fly? Sjekk dine rettigheter under EU261.</p>
              </div>

              {/* Reklamasjon - Coming */}
              <div className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] text-left opacity-60">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-white/10">
                    <Package className="h-8 w-8 text-slate-400" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-slate-400 text-sm font-medium">
                    Kommer snart
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Reklamasjon</h3>
                <p className="text-slate-500">Feil på varer? Sjekk reklamasjonsfrister og dine muligheter.</p>
              </div>

              {/* Håndverker - Coming */}
              <div className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] text-left opacity-60">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-white/10">
                    <Wrench className="h-8 w-8 text-slate-400" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-slate-400 text-sm font-medium">
                    Kommer snart
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Håndverker</h3>
                <p className="text-slate-500">Dårlig arbeid eller forsinkelse? Sjekk hva du kan kreve.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing hint */}
        <section className="px-4 py-20">
          <div className="max-w-3xl mx-auto">
            <div className="relative p-10 rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.05] text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-purple-500/5" />
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Gratis vurdering – betal kun for rapport</h2>
                <p className="text-slate-400 text-lg mb-6">
                  Gå gjennom hele prosessen og se resultatet før du bestemmer deg. 
                  Rapport koster kun <span className="text-white font-semibold">49 kr</span>.
                </p>
                <button
                  onClick={() => router.push("/bilkjop")}
                  className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-semibold hover:bg-slate-100 transition-all"
                >
                  Prøv gratis nå
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-12 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-slate-500 text-sm">
                © 2026 HarJegKravPå.no – AI-drevet juridisk veiledning
              </div>
              <div className="text-slate-500 text-sm">
                Dette er veiledning, ikke juridisk rådgivning
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}