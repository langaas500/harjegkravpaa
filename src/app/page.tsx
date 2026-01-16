"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Car, Plane, Package, Wrench } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  const liveCats = [
    { key: "bilkjop", icon: Car, title: "Kjøretøy", desc: "Feil på bil eller MC? Få vurdert saken din og se hva du kan kreve.", href: "/bilkjop" },
    { key: "flyreiser", icon: Plane, title: "Flyreiser", desc: "Forsinket eller kansellert fly? Få vurdert saken din og se hva du kan kreve.", href: "/flyreiser" },
    { key: "handverker", icon: Wrench, title: "Håndverkere", desc: "Dårlig arbeid eller uenighet? Få vurdert saken din og se hva du kan kreve.", href: "/handverkere" },
  ] as const;

  const soonCats = [
    { key: "reklamasjon", icon: Package, title: "Reklamasjon", desc: "Kjøpt noe som ikke holder mål? Få vurdert saken din og se hva du kan kreve." },
  ] as const;

  return (
    <main className="bg-nordic text-white min-h-screen flex flex-col md:h-screen md:overflow-hidden">
      {/* Hero - kompakt, alt above the fold */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-4 md:py-2 text-center">
        <h1 className="text-3xl md:text-5xl font-bold max-w-2xl leading-[1.15] mb-3 md:mb-2">
          Finn ut om du har krav – og hva du bør gjøre nå
        </h1>

        <p className="text-base md:text-lg text-slate-400 mb-4 md:mb-3 max-w-md">
          Svar på noen spørsmål og få en veiledende vurdering av saken din.
        </p>

        {/* CTA-knapp - hovedhandling */}
        <button
          onClick={() => router.push("/kategorier")}
          className="group px-8 py-4 text-lg bg-[#1F4F45] text-[#ECFDF5] font-semibold rounded-xl hover:bg-[#246457] transition-all"
        >
          <span className="flex items-center gap-2">
            Start vurdering
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>

        <p className="mt-2 text-xs text-slate-500">
          Gratis å starte · Ingen konto · Du kan stoppe når som helst
        </p>

        {/* Kategorier - kompakte kort */}
        <div className="w-full max-w-2xl mt-3 md:mt-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {/* Live kategorier */}
            {liveCats.map((c) => (
              <button
                key={c.key}
                onClick={() => router.push(c.href)}
                className="group text-left rounded-xl border border-[rgba(31,79,69,0.25)] bg-white/[0.03] hover:bg-white/[0.06] hover:border-[rgba(31,79,69,0.4)] transition-all p-3"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="rounded-lg border border-white/10 bg-white/5 p-1.5">
                    <c.icon className="h-3.5 w-3.5 text-slate-300" />
                  </div>
                  <p className="font-semibold text-white text-sm">{c.title}</p>
                </div>
                <p className="text-xs text-slate-400 leading-snug">{c.desc}</p>
              </button>
            ))}

            {/* Snart kategorier */}
            {soonCats.map((c) => (
              <button
                key={c.key}
                onClick={() => router.push(`/snart?cat=${encodeURIComponent(c.key)}`)}
                className="group text-left rounded-xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] transition-all p-3"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="rounded-lg border border-white/10 bg-white/5 p-1.5">
                    <c.icon className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                  <p className="font-semibold text-white text-sm">{c.title}</p>
                </div>
                <p className="text-xs text-slate-500 leading-snug">{c.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <p className="mt-2 text-xs text-slate-600">
          Full rapport: 39 kr · Kravbrev: 99 kr
        </p>
      </section>

      {/* Footer - minimal */}
      <footer className="border-t border-white/5 py-2 md:py-1.5 px-4">
        <div className="max-w-2xl mx-auto text-center text-xs text-slate-600 space-y-1">
          <span><a href="/bruksvilkar" className="hover:text-slate-400">Bruksvilkår</a> • <a href="/personvern" className="hover:text-slate-400">Personvern</a> • <a href="/kontakt" className="hover:text-slate-400">Kontakt oss</a></span>
          <div>
            Solutions by Langaas • Org.nr: 936 977 774 • <a href="mailto:kontakt@harjegkravpå.no" className="hover:text-slate-400">kontakt@harjegkravpå.no</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
