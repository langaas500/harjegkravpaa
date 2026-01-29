// src/app/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Car, Plane, Wrench, Package, ArrowRight, ShieldCheck } from "lucide-react";

type Cat = {
  key: string;
  title: string;
  desc: string;
  href: string;
  icon: React.ElementType;
  disabled?: boolean;
};

export default function HomePage() {
  const router = useRouter();
  const [showCategoryFocus, setShowCategoryFocus] = useState(false);

  const cats: Cat[] = [
    {
      key: "kjoretoy",
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
    {
      key: "reklamasjon",
      icon: Package,
      title: "Reklamasjon",
      desc: "Opplevd feil med varen? Finn ut om du har rett til omlevering.",
      href: "/snart?cat=reklamasjon",
      disabled: true,
    },
  ];

  const go = (href: string, disabled?: boolean) => {
    if (disabled) return;
    router.push(href);
  };

  return (
    <main className="relative min-h-screen text-white">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url(/bg.png)" }}
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/55 to-black/70" />
      {/* Subtle vignette */}
      <div className="absolute inset-0 -z-10 [background:radial-gradient(1000px_600px_at_20%_10%,rgba(255,255,255,0.10),transparent_60%),radial-gradient(900px_500px_at_80%_20%,rgba(255,255,255,0.08),transparent_55%)]" />

      {/* Content */}
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Top nav */}
        <header className="pt-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-emerald-300/90" />
              <span className="text-sm font-semibold tracking-tight text-white/90">
                Harjegkravpå.no
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
              <Link href="/om-oss" className="hover:text-white/90 transition-colors">
                Om oss <span className="text-white/40">⌄</span>
              </Link>
              <Link href="/kontakt" className="hover:text-white/90 transition-colors">
                Kontakt oss
              </Link>
            </nav>

            <button
              onClick={() => router.push("/bilkjop")}
              className="rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 px-4 py-2 text-sm font-semibold text-white/85 backdrop-blur-md transition-colors"
            >
              Start vurdering
            </button>
          </div>
        </header>

        {/* Hero */}
        <section className="pt-16 md:pt-20">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.03]">
              Finn ut om du har
              <br />
              krav etter kjøpet
            </h1>

            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              Gratis, veiledende vurdering basert på norsk forbrukerlov.
              <br />
              Tar ca. 5–10 minutter, ingen konto. Ingen binding.
            </p>

            <div className="mt-8">
              <button
                onClick={() => setShowCategoryFocus(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#1F4F45] px-6 py-3 text-base font-semibold text-[#ECFDF5] hover:bg-[#246457] transition-colors"
              >
                Start gratis vurdering
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mt-14">
          <h2 className="text-2xl font-semibold text-white/75">Velg kategori</h2>

          <div className="mt-2">
            <Link
              href="/bilkjop"
              className="text-sm text-white/70 hover:text-emerald-300 underline underline-offset-4 transition-colors"
            >
              Reklamasjon på bruktbil – sjekk om du har krav
            </Link>
          </div>

          <div
            className={[
              "mt-6 transition-all duration-300",
              showCategoryFocus
                ? "relative rounded-3xl ring-2 ring-emerald-500/30 shadow-[0_0_0_6px_rgba(16,185,129,0.08)] p-3"
                : "",
            ].join(" ")}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {cats.map((c) => (
                <button
                  key={c.key}
                  onClick={() => go(c.href, c.disabled)}
                  className={[
                    "text-left rounded-2xl border border-white/12 bg-white/[0.06] backdrop-blur-md",
                    "shadow-[0_18px_70px_rgba(0,0,0,0.35)]",
                    "px-6 py-5 transition-colors",
                    c.disabled
                      ? "opacity-60 cursor-not-allowed hover:bg-white/[0.06]"
                      : "hover:bg-white/[0.09]",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.05]">
                      <c.icon className="h-5 w-5 text-white/75" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xl font-semibold text-white/85">{c.title}</p>
                        {c.disabled ? (
                          <span className="text-xs text-white/45">Kommer snart</span>
                        ) : null}
                      </div>
                      <p className="mt-2 text-sm text-white/60 leading-relaxed">
                        {c.desc}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-14 pb-6">
          <div className="flex items-center justify-center gap-2 text-white/70">
            <ShieldCheck className="h-5 w-5 text-white/60" />
            <span className="text-lg font-medium">Basert på Forbrukerkjøpsloven</span>
          </div>

          <div className="mt-3 text-center text-xs text-white/45">
            <Link href="/bruksvilkar" className="hover:text-white/65 transition-colors">
              Bruksvilkår
            </Link>{" "}
            ·{" "}
            <Link href="/personvern" className="hover:text-white/65 transition-colors">
              Personvern
            </Link>{" "}
            ·{" "}
            <Link href="/kontakt" className="hover:text-white/65 transition-colors">
              Kontakt oss
            </Link>{" "}
            · utviklet av Langaas ·{" "}
            <a
              href="mailto:kontakt@harjegkravpå.no"
              className="hover:text-white/65 transition-colors"
            >
              kontakt@harjegkravpaa.no
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
