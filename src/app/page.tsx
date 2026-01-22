// src/app/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Car,
  Plane,
  Wrench,
  Package,
  CheckCircle2,
  X,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [pickerOpen, setPickerOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const liveCats = [
    {
      key: "bilkjop",
      icon: Car,
      title: "Kjøretøy",
      desc: "Feil på bil eller MC? Finn ut om du har krav etter kjøpet.",
      href: "/bilkjop",
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
      desc: "Dårlig arbeid eller uenighet? Få en vurdering av saken din.",
      href: "/handverkere",
    },
  ] as const;

  const soonCats = [
    {
      key: "reklamasjon",
      icon: Package,
      title: "Reklamasjon",
      desc: "Kjøpt noe som ikke holder mål? Kommer snart.",
      href: "/snart?cat=reklamasjon",
    },
  ] as const;

  // ESC to close
  useEffect(() => {
    if (!pickerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPickerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pickerOpen]);

  // click outside to close
  useEffect(() => {
    if (!pickerOpen) return;
    const onDown = (e: MouseEvent) => {
      const el = dialogRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setPickerOpen(false);
      }
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [pickerOpen]);

  const openPicker = () => setPickerOpen(true);

  const go = (href: string) => {
    setPickerOpen(false);
    router.push(href);
  };

  return (
    <main className="bg-nordic text-white min-h-screen">
      <div className="mx-auto w-full max-w-6xl px-4 pt-16 pb-10 md:pt-20">
        {/* HERO */}
        <section className="text-center">
          <h1 className="mx-auto max-w-4xl text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight">
            Har du krav på prisavslag,
            <br className="hidden md:block" />
            heving eller erstatning?
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-slate-300/90">
            Finn raskt ut om du kan ha krav etter å ha oppdaget feil ved kjøpet.
          </p>

          {/* Trust points */}
          <div className="mx-auto mt-6 w-full max-w-xl text-left">
            <div className="flex items-start gap-3 text-sm md:text-[15px] text-slate-200">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400 shrink-0" />
              <span>Gratis veiledende vurdering basert på norsk forbrukerlov</span>
            </div>
            <div className="mt-2 flex items-start gap-3 text-sm md:text-[15px] text-slate-200">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400 shrink-0" />
              <span>Svar på noen spørsmål – få et klarere svar</span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-7">
            <button
              onClick={openPicker}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#1F4F45] px-8 py-4 text-base md:text-lg font-semibold text-[#ECFDF5] hover:bg-[#246457] transition-all"
            >
              Sjekk om du har krav
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="mt-3 text-xs md:text-sm text-slate-400">
              Velg hva saken gjelder, og få en rask vurdering.
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Ingen konto · Ingen binding · Du bestemmer neste steg
            </p>
          </div>
        </section>

        {/* INFOKORT */}
        <section className="mt-10">
          <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white/95 text-neutral-900 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div className="px-6 py-5 md:px-8 md:py-6 text-center">
              <h2 className="text-xl md:text-2xl font-bold">Når oppstår krav?</h2>
              <p className="mt-2 text-sm text-neutral-600">
                Ingen konto · Ingen binding · Du bestemmer selv neste steg
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-6 md:px-8 md:pb-8">
              <div className="rounded-xl bg-neutral-100 p-5 text-left">
                <p className="font-semibold mb-1">Skjulte feil</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Du har rettigheter hvis bil eller MC har feil som først ble oppdaget
                  etter kjøpet.
                </p>
              </div>

              <div className="rounded-xl bg-neutral-100 p-5 text-left">
                <p className="font-semibold mb-1">Ikke som avtalt</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Dersom kjøpet ikke lever opp til det som ble lovet eller avtalt.
                </p>
              </div>

              <div className="rounded-xl bg-neutral-100 p-5 text-left">
                <p className="font-semibold mb-1">Kjøpt av privatperson</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Forbrukerkjøpsloven kan også gjelde ved kjøp mellom privatpersoner.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* KATEGORIKORT */}
        <section className="mt-10">
          <div className="mx-auto w-full max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {liveCats.map((c) => (
                <button
                  key={c.key}
                  onClick={() => go(c.href)}
                  className="text-left rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] transition-all p-4"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <c.icon className="h-4 w-4 text-slate-200" />
                    <span className="font-semibold text-sm text-white">{c.title}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">{c.desc}</p>
                </button>
              ))}

              {soonCats.map((c) => (
                <button
                  key={c.key}
                  onClick={() => go(c.href)}
                  className="text-left rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all p-4"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <c.icon className="h-4 w-4 text-slate-400" />
                    <span className="font-semibold text-sm text-white/90">
                      {c.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-snug">{c.desc}</p>
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Trygghet for norsk forbrukerlov
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-10 border-t border-white/5 pt-4">
          <div className="text-center text-xs text-slate-600 space-y-1">
            <div>
              <a href="/bruksvilkar" className="hover:text-slate-400">Bruksvilkår</a>{" "}
              • <a href="/personvern" className="hover:text-slate-400">Personvern</a>{" "}
              • <a href="/kontakt" className="hover:text-slate-400">Kontakt oss</a>{" "}
              • <a href="/om-oss" className="hover:text-slate-400">Om oss</a>
            </div>
            <div>
              Solutions by Langaas • Org.nr 936 977 774 •{" "}
              <a href="mailto:kontakt@harjegkravpå.no" className="hover:text-slate-400">
                kontakt@harjegkravpå.no
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* MODAL: kategori-velger (ingen ny side, SEO-trygt) */}
      {pickerOpen && (
        <div className="fixed inset-0 z-50">
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* dialog */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div
              ref={dialogRef}
              className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#0b1216]/95 text-white shadow-[0_30px_80px_rgba(0,0,0,0.65)]"
              role="dialog"
              aria-modal="true"
              aria-label="Velg kategori"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div>
                  <p className="text-sm text-slate-400">Start vurdering</p>
                  <h3 className="text-lg font-semibold">Velg hva saken gjelder</h3>
                </div>
                <button
                  onClick={() => setPickerOpen(false)}
                  className="rounded-lg p-2 hover:bg-white/5 transition"
                  aria-label="Lukk"
                >
                  <X className="h-5 w-5 text-slate-300" />
                </button>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-1 gap-3">
                  {liveCats.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => go(c.href)}
                      className="w-full text-left rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                          <c.icon className="h-5 w-5 text-slate-200" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-semibold">{c.title}</p>
                            <span className="text-xs text-slate-400">Start</span>
                          </div>
                          <p className="mt-1 text-sm text-slate-400">{c.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}

                  {soonCats.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => go(c.href)}
                      className="w-full text-left rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                          <c.icon className="h-5 w-5 text-slate-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-semibold text-white/90">{c.title}</p>
                            <span className="text-xs text-slate-500">Kommer snart</span>
                          </div>
                          <p className="mt-1 text-sm text-slate-500">{c.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <p className="mt-4 text-xs text-slate-500">
                  Gratis å starte · Ingen konto · Du kan stoppe når som helst
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
