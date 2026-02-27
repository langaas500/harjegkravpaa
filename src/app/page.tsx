import type { ElementType } from "react";
import Link from "next/link";
import {
  Car,
  Plane,
  Wrench,
  Package,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  FileText,
} from "lucide-react";
import HeroProductPreview from "@/components/HeroProductPreview";
import {
  CaseCounter,
  FaqAccordion,
  StickyMobileCta,
} from "./_components/HomeClientIslands";

type Cat = {
  key: string;
  title: string;
  desc: string;
  href: string;
  icon: ElementType;
  disabled?: boolean;
  tag?: string;
  highlight?: boolean;
};

const cats: Cat[] = [
  {
    key: "kjoretoy",
    icon: Car,
    title: "Kjøretøy",
    desc: "Feil på bil eller MC etter kjøpet? Sjekk kravene dine på 2 min.",
    href: "/bilkjop",
    tag: "Mest brukt",
    highlight: true,
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

const faqs = [
  {
    q: "Er dette en advokattjeneste?",
    a: "Nei. Vi gir automatisert, veiledende vurdering basert på norsk forbrukerlovgivning. Vi er ikke et advokatfirma og gir ikke juridisk rådgivning.",
  },
  {
    q: "Hva koster det?",
    a: "Vurderingen er gratis. Hvis du vil ha et ferdig kravbrev med juridiske referanser, koster det fra 99 kr. Ingen abonnement.",
  },
  {
    q: "Hva trenger jeg for å starte?",
    a: "Kjøpsdato og pris er nok til å komme i gang. Resten er valgfritt og kan legges til underveis.",
  },
];

export default function HomePage() {
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
      <div className="mx-auto flex w-full max-w-6xl flex-col px-6">
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

            <Link
              href="/bilkjop"
              className="rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-300 backdrop-blur-md transition-colors"
            >
              Start vurdering &rarr;
            </Link>
          </div>
        </header>

        {/* Main content */}
        <div className="flex flex-col pb-5 pt-8 md:pt-14">
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

              {/* A) Value-prop */}
              <p className="mt-4 md:mt-6 text-base md:text-lg text-slate-400 leading-relaxed max-w-xl">
                Sjekk om du har krav på 2-3 min. Få ferdig kravbrev fra 99 kr.
                <br className="hidden md:block" />
                Ingen konto. Ingen binding. Basert på din situasjon.
              </p>

              {/* F) CTA microcopy */}
              <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex flex-col items-start gap-1.5">
                  <Link
                    href="/bilkjop"
                    className="group inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-7 py-3.5 text-base font-bold text-black hover:bg-emerald-400 transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Sjekk om du har krav &ndash; gratis
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <span className="text-xs text-slate-600 pl-1">
                    Betal kun hvis du vil ha ferdig kravbrev.
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-emerald-500/60" />
                    Ca. 2 min
                  </span>
                  <CaseCounter />
                </div>
              </div>

              {/* B) Trust row */}
              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500/50 flex-shrink-0" />
                  Basert på norsk lov
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500/50 flex-shrink-0" />
                  Ingen abonnement
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500/50 flex-shrink-0" />
                  Kravbrev + vurdering
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500/50 flex-shrink-0" />
                  Sak-lenke du kan lagre
                </span>
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

            {/* E) Bilkjøp card priority via highlight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {cats.map((c) => {
                const cardClasses = [
                  "group text-left rounded-2xl border bg-white/[0.04] backdrop-blur-md",
                  "px-5 py-4 md:px-6 md:py-5 transition-all",
                  c.disabled
                    ? "opacity-50 cursor-not-allowed border-white/[0.06]"
                    : c.highlight
                      ? "border-emerald-500/25 hover:border-emerald-500/40 hover:bg-white/[0.07] hover:shadow-[0_0_30px_rgba(16,185,129,0.08)] ring-1 ring-emerald-500/10"
                      : "border-white/[0.08] hover:border-emerald-500/30 hover:bg-white/[0.07] hover:shadow-[0_0_30px_rgba(16,185,129,0.06)]",
                ].join(" ");

                const cardContent = (
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
                          Sjekk om du har krav
                          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      )}
                    </div>
                  </div>
                );

                return c.disabled ? (
                  <div key={c.key} className={cardClasses}>
                    {cardContent}
                  </div>
                ) : (
                  <Link key={c.key} href={c.href} className={cardClasses}>
                    {cardContent}
                  </Link>
                );
              })}
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
                href="/bilkjop/reklamasjon"
                className="hover:text-emerald-400/70 transition-colors"
              >
                Reklamasjon på bruktbil
              </Link>
            </div>
          </section>

          {/* C) "Hva du får" mini-block */}
          <section className="mt-10 md:mt-14">
            <h2 className="text-lg md:text-xl font-semibold text-white/80 mb-4">
              Hva du får
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5">
                <div className="flex items-center gap-2.5 mb-3">
                  <FileText className="h-5 w-5 text-emerald-400/80" />
                  <p className="font-semibold text-white/90">Juridisk vurdering (PDF)</p>
                </div>
                <ul className="space-y-1.5 text-sm text-slate-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500/50 mt-0.5 flex-shrink-0" />
                    Kort oppsummering av saken
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500/50 mt-0.5 flex-shrink-0" />
                    Hva du typisk kan kreve
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5">
                <div className="flex items-center gap-2.5 mb-3">
                  <FileText className="h-5 w-5 text-emerald-400/80" />
                  <p className="font-semibold text-white/90">Ferdig kravbrev</p>
                </div>
                <ul className="space-y-1.5 text-sm text-slate-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500/50 mt-0.5 flex-shrink-0" />
                    Riktig lovhenvisning
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500/50 mt-0.5 flex-shrink-0" />
                    Klar til å sende i dag
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* G) FAQ */}
          <section className="mt-10 md:mt-14">
            <h2 className="text-lg md:text-xl font-semibold text-white/80 mb-4">
              Vanlige spørsmål
            </h2>
            <FaqAccordion faqs={faqs} />
          </section>

          {/* Bottom spacer for sticky CTA on mobile */}
          <div className="h-16 md:hidden" />
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
            &middot;{" "}
            <Link
              href="/personvern"
              className="hover:text-slate-400 transition-colors"
            >
              Personvern
            </Link>{" "}
            &middot;{" "}
            <Link
              href="/kontakt"
              className="hover:text-slate-400 transition-colors"
            >
              Kontakt oss
            </Link>{" "}
            &middot;{" "}
            <a
              href="https://solutionsbylangaas.no"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-400 transition-colors"
            >
              Utviklet av Langaas
            </a>{" "}
            &middot;{" "}
            <a
              href="mailto:kontakt@harjegkravpaa.no"
              className="hover:text-slate-400 transition-colors"
            >
              kontakt@harjegkravpaa.no
            </a>
          </div>
        </footer>
      </div>

      {/* D) Sticky mobile CTA */}
      <StickyMobileCta />
    </main>
  );
}
