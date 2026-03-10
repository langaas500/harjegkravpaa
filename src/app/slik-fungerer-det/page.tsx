import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Brain, FileText, CreditCard, ChevronRight } from "lucide-react";
import SeoJsonLd from "@/components/SeoJsonLd";
import SeoFloatingCTA from "@/components/SeoFloatingCTA";

const CANONICAL_URL = "https://harjegkravpå.no/slik-fungerer-det";

export const metadata: Metadata = {
  title: "Slik fungerer HarJegKravPå | Digital juridisk analyse",
  description:
    "Se hvordan vår AI analyserer din sak mot forbrukerkjøpsloven og genererer ferdige reklamasjonsbrev på 2 minutter.",
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    title: "Slik fungerer HarJegKravPå | Digital juridisk analyse",
    description:
      "Se hvordan vår AI analyserer din sak mot forbrukerkjøpsloven og genererer ferdige reklamasjonsbrev på 2 minutter.",
    url: CANONICAL_URL,
    siteName: "HarJegKravPå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Slik fungerer HarJegKravPå",
    description:
      "AI analyserer saken din mot norsk lov og lager rapport + kravbrev for 99 kr.",
  },
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Slik fungerer HarJegKravPå",
  description:
    "Se hvordan vår AI analyserer din sak mot forbrukerkjøpsloven og genererer ferdige reklamasjonsbrev på 2 minutter.",
  totalTime: "PT2M",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "NOK",
    value: "99",
  },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Smart kravsanalyse",
      text: "AI vurderer saken din mot Forbrukerkjøpsloven, Kjøpsloven, Håndverkertjenesteloven og EU 261/2004. Beskriv feilen og last opp dokumenter.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Gratis indikasjon",
      text: "Du får en GRØNN, GUL eller RØD vurdering helt gratis — før du bestemmer deg for å betale.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Juridisk rapport + kravbrev (99 kr)",
      text: "Full analyse med lovhenvisninger og ferdig kravbrev klart til sending — to PDF-er i én pakke.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Ingen registrering, ingen abonnement",
      text: "Betal kun for det du bruker. Ingen konto, ingen abonnement, ingen skjulte kostnader.",
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Hjem", item: "https://harjegkravpå.no" },
    { "@type": "ListItem", position: 2, name: "Slik fungerer det", item: CANONICAL_URL },
  ],
};

const steps = [
  {
    icon: Brain,
    number: "1",
    title: "Smart kravsanalyse",
    description:
      "AI vurderer saken din mot Forbrukerkjøpsloven, Kjøpsloven, Håndverkertjenesteloven og EU 261/2004. Du beskriver feilen med egne ord og laster opp bilder, kvitteringer eller kontrakter — AI-en gjør resten.",
    details: [
      "Automatisk identifisering av relevant lovverk",
      "Vurdering av vesentlig mangel, reklamasjonsfrist og bevisbyrde",
      "Tilpasset din konkrete sak — ikke generelle maler",
    ],
  },
  {
    icon: ShieldCheck,
    number: "2",
    title: "Gratis indikasjon",
    badge: "Gratis",
    description:
      "Du får en GRØNN, GUL eller RØD vurdering helt gratis — før du bestemmer deg for å betale. Slik vet du om det er verdt å gå videre med saken.",
    details: [
      "GRØNN: Sterk sak med gode utsikter",
      "GUL: Mulig sak, men noen usikre momenter",
      "RØD: Svak sak basert på informasjonen du har oppgitt",
    ],
  },
  {
    icon: FileText,
    number: "3",
    title: "Juridisk rapport + kravbrev",
    badge: "99 kr",
    description:
      "Full analyse med lovhenvisninger og ferdig kravbrev klart til sending. Du får to PDF-er: én juridisk rapport som vurderer din sak, og ett kravbrev du sender direkte til selger eller motpart.",
    details: [
      "Personlig rapport med juridisk begrunnelse",
      "Ferdig kravbrev med riktige lovhenvisninger",
      "Profesjonelt format — klar til sending med en gang",
    ],
  },
  {
    icon: CreditCard,
    number: "4",
    title: "Ingen registrering, ingen abonnement",
    description:
      "Betal kun for det du bruker. Ingen konto, ingen abonnement, ingen skjulte kostnader. Én betaling — 99 kr — og du har alt du trenger.",
    details: [
      "Ingen brukerkonto eller innlogging",
      "Engangsbetaling via Stripe — trygt og enkelt",
      "Advokat koster typisk 2 500 kr/t for samme vurdering",
    ],
  },
];

export default function SlikFungererDetPage() {
  return (
    <main className="bg-[#0a0f0d] text-white min-h-screen overflow-hidden" style={{ zoom: 0.88 }}>
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-600/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-10 pb-16">
        {/* Breadcrumb */}
        <nav aria-label="Brødsmuler" className="flex items-center gap-1.5 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-300 transition">Hjem</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-400">Slik fungerer det</span>
        </nav>

        {/* H1 */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-4">
            Slik fungerer{" "}
            <span className="bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
              HarJegKravPå
            </span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
            Beskriv saken din, last opp dokumenter — og AI-en analyserer alt mot
            norsk lov. Du får juridisk rapport og ferdig kravbrev på 2 minutter.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6 mb-16">
          {steps.map((step) => (
            <section
              key={step.number}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-lg">
                    {step.number}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl md:text-2xl font-bold">{step.title}</h2>
                    {step.badge && (
                      <span className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-0.5 text-emerald-400 text-sm font-medium">
                        {step.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2 text-sm text-slate-400">
                        <span className="text-emerald-500 mt-0.5">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Final CTA */}
        <section data-final-cta="true" className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-emerald-500/5" />
          <div className="absolute inset-0 rounded-3xl border border-emerald-500/15" />
          <div className="relative p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Klar til å sjekke saken din?
            </h2>
            <p className="text-slate-400 mb-6 max-w-lg mx-auto">
              Svar på noen spørsmål — få gratis indikasjon, og juridisk rapport + kravbrev for 99 kr.
            </p>
            <Link
              href="/bilkjop"
              className="group inline-flex items-center gap-2 bg-emerald-500 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-400 transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Start vurdering — 99 kr
              <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <p className="text-xs text-slate-600 mt-4">
              Tar ca. 2 minutter · Ingen registrering
            </p>
          </div>
        </section>

        <p className="text-xs text-slate-600 text-center mt-10">
          Innholdet er generell informasjon og ikke juridisk rådgivning.
        </p>
      </div>

      <SeoFloatingCTA href="/bilkjop" />
      <SeoJsonLd data={[howToJsonLd, breadcrumbJsonLd]} />
    </main>
  );
}
