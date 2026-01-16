"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Car, Plane, Wrench, Package, ChevronDown } from "lucide-react";

const LIVE_CATEGORIES = [
  {
    key: "bilkjop",
    icon: Car,
    title: "Bilkjøp",
    desc: "Feil på bil eller MC etter kjøp?",
    href: "/bilkjop",
    bullets: [
      "Skjulte feil og mangler",
      "Reklamasjon mot selger",
      "Heving eller prisavslag",
      "Privatkjøp og forhandlerkjøp",
    ],
  },
  {
    key: "flyreiser",
    icon: Plane,
    title: "Flyreiser",
    desc: "Forsinket, kansellert eller mistet bagasje?",
    href: "/flyreiser",
    bullets: [
      "Forsinkelse over 3 timer",
      "Kansellert fly",
      "Nektet ombordstigning",
      "Mistet eller forsinket bagasje",
    ],
  },
  {
    key: "handverkere",
    icon: Wrench,
    title: "Håndverkere",
    desc: "Dårlig arbeid eller uenighet om pris?",
    href: "/handverkere",
    bullets: [
      "Mangelfull utførelse",
      "Forsinkelser",
      "Uenighet om pris",
      "Reklamasjon på håndverkerarbeid",
    ],
  },
];

const COMING_SOON = {
  key: "reklamasjon",
  icon: Package,
  title: "Reklamasjon",
  desc: "Feil på vare eller tjeneste?",
  bullets: [
    "Produkter som ikke fungerer",
    "Tjenester som ikke holder mål",
    "Frister og dokumentasjon",
    "Denne kategorien er under utvikling og blir tilgjengelig snart.",
  ],
};

export default function KategorierPage() {
  const router = useRouter();
  const accordionRef = useRef<HTMLDivElement>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const scrollToAccordion = (key: string) => {
    setOpenAccordion(key);
    setTimeout(() => {
      accordionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <main className="bg-nordic text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Tilbake-lenke */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8">
          <ArrowLeft className="h-4 w-4" />
          Tilbake
        </Link>

        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Velg kategori</h1>
        <p className="text-slate-400 mb-8">Velg det som passer best for saken din.</p>

        {/* Kategoripaneler - 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {/* Live kategorier */}
          {LIVE_CATEGORIES.map((cat) => (
            <div
              key={cat.key}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 min-h-[180px] flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                  <cat.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">{cat.title}</h2>
                  <p className="text-sm text-slate-400">{cat.desc}</p>
                </div>
              </div>

              <div className="mt-auto flex items-center gap-3">
                <button
                  onClick={() => router.push(cat.href)}
                  className="inline-flex items-center gap-2 bg-[#1F4F45] text-[#ECFDF5] px-5 py-2.5 rounded-xl font-semibold hover:bg-[#246457] transition"
                >
                  Start vurdering
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => scrollToAccordion(cat.key)}
                  className="text-sm text-slate-400 hover:text-white transition"
                >
                  Les mer
                </button>
              </div>
            </div>
          ))}

          {/* Reklamasjon - kommer snart */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 min-h-[180px] flex flex-col opacity-70">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                <COMING_SOON.icon className="h-5 w-5 text-slate-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-white">{COMING_SOON.title}</h2>
                  <span className="text-xs bg-white/10 text-slate-400 px-2 py-0.5 rounded-full">Kommer snart</span>
                </div>
                <p className="text-sm text-slate-500">{COMING_SOON.desc}</p>
              </div>
            </div>

            <div className="mt-auto flex items-center gap-3">
              <button
                onClick={() => router.push("/snart")}
                className="inline-flex items-center gap-2 bg-white/10 text-slate-400 px-5 py-2.5 rounded-xl font-medium hover:bg-white/15 transition"
              >
                Se hva som kommer
              </button>
              <button
                onClick={() => scrollToAccordion(COMING_SOON.key)}
                className="text-sm text-slate-500 hover:text-slate-300 transition"
              >
                Les mer
              </button>
            </div>
          </div>
        </div>

        {/* Accordion - Les mer */}
        <div ref={accordionRef} className="scroll-mt-8">
          <h2 className="text-xl font-semibold mb-4">Les mer om kategoriene</h2>
          <div className="space-y-3">
            {/* Live kategorier accordion */}
            {LIVE_CATEGORIES.map((cat) => (
              <div
                key={cat.key}
                className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden"
              >
                <button
                  onClick={() => setOpenAccordion(openAccordion === cat.key ? null : cat.key)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition"
                >
                  <div className="flex items-center gap-3">
                    <cat.icon className="h-5 w-5 text-slate-300" />
                    <span className="font-medium text-white">{cat.title}</span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 transition-transform ${
                      openAccordion === cat.key ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === cat.key && (
                  <div className="px-4 pb-4">
                    <ul className="text-sm text-slate-300 space-y-2 mb-4">
                      {cat.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-slate-500">•</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => router.push(cat.href)}
                      className="inline-flex items-center gap-2 bg-[#1F4F45] text-[#ECFDF5] px-4 py-2 rounded-lg font-medium text-sm hover:bg-[#246457] transition"
                    >
                      Start vurdering
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Reklamasjon accordion */}
            <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === COMING_SOON.key ? null : COMING_SOON.key)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition"
              >
                <div className="flex items-center gap-3">
                  <COMING_SOON.icon className="h-5 w-5 text-slate-400" />
                  <span className="font-medium text-white">{COMING_SOON.title}</span>
                  <span className="text-xs bg-white/10 text-slate-500 px-2 py-0.5 rounded-full">Kommer snart</span>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-slate-400 transition-transform ${
                    openAccordion === COMING_SOON.key ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === COMING_SOON.key && (
                <div className="px-4 pb-4">
                  <ul className="text-sm text-slate-300 space-y-2 mb-4">
                    {COMING_SOON.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-slate-500">•</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => router.push("/snart")}
                    className="inline-flex items-center gap-2 bg-white/10 text-slate-400 px-4 py-2 rounded-lg font-medium text-sm hover:bg-white/15 transition"
                  >
                    Se hva som kommer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Diskret info */}
        <p className="mt-8 text-xs text-slate-600 text-center">
          Gratis å starte · Full rapport: 39 kr · Kravbrev: 99 kr
        </p>
      </div>
    </main>
  );
}
