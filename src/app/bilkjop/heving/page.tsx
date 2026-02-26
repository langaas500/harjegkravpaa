import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

const CANONICAL_URL = "https://harjegkravpå.no/bilkjop/heving";

const faqs = [
  {
    q: "Kan jeg heve hvis bilen har vært på verksted flere ganger?",
    a: "Flere mislykkede reparasjonsforsøk kan styrke et hevingskrav. Hvor mye som kreves avhenger av feiltype og bilens alder.",
  },
  {
    q: "Kan selger nekte heving?",
    a: "Selger kan forsøke retting først, men retten til å rette har grenser. Dersom retting ikke lykkes, kan heving være aktuelt.",
  },
  {
    q: "Hvor lang tid har jeg på å heve bilkjøpet?",
    a: "Du må reklamere innen rimelig tid etter at du oppdaget feilen. Det finnes også absolutte frister som varierer med kjøpsform.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Heve bilkjøp? Regler, frister og hva som kreves",
  description:
    "Sjekk når du kan heve bilkjøp ved feil eller skjulte opplysninger. Vesentlig mangel, frister og forskjellen på privat og forhandler.",
  url: CANONICAL_URL,
  isPartOf: {
    "@type": "WebSite",
    name: "Harjegkravpå.no",
    url: "https://harjegkravpå.no",
  },
  publisher: {
    "@type": "Organization",
    name: "Harjegkravpå.no",
    url: "https://harjegkravpå.no",
  },
};

export const metadata: Metadata = {
  title: "Heve bilkjøp? Regler, frister og hva som kreves",
  description:
    "Sjekk når du kan heve bilkjøp ved feil eller skjulte opplysninger. Vesentlig mangel, frister og forskjellen på privat og forhandler.",
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Heve bilkjøp? Sjekk om du kan få pengene tilbake",
    description:
      "Regler og frister for heving av bilkjøp. Se krav til vesentlig mangel, privat vs forhandler og hva som typisk gir avslag.",
    url: CANONICAL_URL,
    siteName: "Harjegkravpå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heve bilkjøp? Sjekk om du kan få pengene tilbake",
    description:
      "Heving av bilkjøp: vesentlig mangel, frister og forskjellen på privat og forhandler. Kort og praktisk oversikt + FAQ.",
  },
};

export default function HevingPage() {
  return (
    <BilSeoHero
      eyebrow="Forbrukerrettigheter"
      h1Top="Heve bilkjøp?"
      h1Accent="Få pengene tilbake hvis du har krav."
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Har bilen alvorlige feil, eller fikk du uriktige/skjulte opplysninger?
          Du kan ha krav på å levere bilen tilbake og få pengene igjen. Det
          avgjørende er om feilen er vesentlig og hva som har skjedd etter
          kjøpet. Reglene følger av kjøpsloven (privatkjøp) og
          forbrukerkjøpsloven (kjøp fra forhandler).
        </p>
      }
      heroImageAlt="Heving av bilkjøp – sjekk om du kan få pengene tilbake"
      primaryCtaTitle="Kan du heve bilkjøpet?"
      primaryCtaText="Svar på noen spørsmål og få en veiledende vurdering basert på hvem du kjøpte bilen fra og hva som har skjedd."
      primaryCtaButton="Se om du kan få pengene tilbake"
      secondaryCtaText="Sjekk saken din nå →"
    >
      {/* Relaterte guider (hub) */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Relaterte guider</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/bilkjop/heving-privat"
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] transition"
          >
            <p className="font-semibold text-white">Heving ved privatkjøp</p>
            <p className="text-slate-400 text-sm mt-1">
              Når du kjøpte av privatperson: terskel, bevis og typiske fallgruver.
            </p>
            <span className="inline-flex items-center gap-2 text-emerald-400 mt-4 text-sm">
              Les guiden <ArrowRight className="h-4 w-4" />
            </span>
          </Link>

          <Link
            href="/bilkjop/heving-forhandler"
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] transition"
          >
            <p className="font-semibold text-white">Heving hos forhandler</p>
            <p className="text-slate-400 text-sm mt-1">
              Når du kjøpte av forhandler: retting, frister og hva du kan kreve.
            </p>
            <span className="inline-flex items-center gap-2 text-emerald-400 mt-4 text-sm">
              Les guiden <ArrowRight className="h-4 w-4" />
            </span>
          </Link>

          <Link
            href="/bilkjop/heving-tidsfrist"
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] transition"
          >
            <p className="font-semibold text-white">Tidsfrist for heving</p>
            <p className="text-slate-400 text-sm mt-1">
              Hva betyr “rimelig tid”, og hvilke absolutte frister gjelder i praksis?
            </p>
            <span className="inline-flex items-center gap-2 text-emerald-400 mt-4 text-sm">
              Les guiden <ArrowRight className="h-4 w-4" />
            </span>
          </Link>

          <Link
            href="/bilkjop/kan-selger-heve"
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] transition"
          >
            <p className="font-semibold text-white">Kan selger heve kjøpet?</p>
            <p className="text-slate-400 text-sm mt-1">
              Når selger kan heve: betalingsmislighold, kontraktsbrudd og unntak.
            </p>
            <span className="inline-flex items-center gap-2 text-emerald-400 mt-4 text-sm">
              Les guiden <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>

      {/* Kan jeg heve kjøp av bil? */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Kan jeg heve kjøp av bil?</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Du kan heve kjøp av bil dersom bilen har en mangel som er så alvorlig
            at den utgjør et vesentlig kontraktsbrudd. Det betyr at feilen må
            være av en slik karakter at du ikke ville inngått avtalen om du
            visste om den på forhånd.
          </p>
          <p className="text-slate-300">
            Hvilket regelverk som gjelder avhenger av hvem du kjøpte av. Ved{" "}
            <Link
              href="/bilkjop/heving-privat"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              heving av privatkjøp
            </Link>{" "}
            reguleres saken av kjøpsloven, mens{" "}
            <Link
              href="/bilkjop/heving-forhandler"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              heving hos forhandler
            </Link>{" "}
            følger forbrukerkjøpsloven, som gir deg sterkere vern.
          </p>
          <p className="text-slate-300">
            For å heve kjøp av bil må du ha reklamert i tide, og selger må som
            hovedregel ha fått mulighet til å forsøke retting først. Dersom
            retting mislykkes eller er uforholdsmessig, kan du heve kjøp av bil
            og kreve kjøpesummen tilbake.
          </p>
        </div>
      </section>

      {/* Kan selger heve bilkjøpet? */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Kan selger heve bilkjøpet?</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Ja, i noen tilfeller kan selger heve bilkjøpet. Det skjer oftest når
            kjøper ikke betaler i tide, eller ved andre vesentlige
            kontraktsbrudd fra kjøpers side. Selger må varsle kjøper og gi
            rimelig frist før heving kan gjennomføres.
          </p>
          <p className="text-slate-300">
            Det er viktig å vite at spørsmålet om selger kan heve bilkjøpet
            vurderes strengt – selger kan ikke heve kun fordi han angrer. Les
            mer om{" "}
            <Link
              href="/bilkjop/kan-selger-heve"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              når selger kan heve bilkjøpet
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Kravet om vesentlig mangel */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Kravet om vesentlig mangel</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            For å heve må feilen være så alvorlig at kjøpet ikke gir deg det du
            med rimelighet kunne forvente. Hva som er «vesentlig» varierer fra
            sak til sak.
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>• Feilens betydning for bilens bruk og verdi</li>
            <li>• Om reparasjon er mulig eller uforholdsmessig dyrt</li>
            <li>• Om selger har fått en reell mulighet til å rette</li>
          </ul>
        </div>
      </section>

      {/* Hvorfor mange får avslag */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Hvorfor mange får avslag</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <div className="space-y-3">
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">«Feilen er ikke alvorlig nok»</p>
              <p className="text-sm text-slate-400 mt-1">
                Vurderingen avhenger av pris, alder og hva du kunne forvente.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">«Vi har tilbudt reparasjon»</p>
              <p className="text-sm text-slate-400 mt-1">
                Selger har rett til å forsøke retting, men retten er ikke ubegrenset.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">«Du har brukt bilen for lenge»</p>
              <p className="text-sm text-slate-400 mt-1">
                Bruk etter oppdaget feil kan påvirke, men stopper ikke nødvendigvis kravet.
              </p>
            </div>
          </div>
          <p className="text-slate-300 mt-4">
            <Link
              href="/bilkjop"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              Få en vurdering av saken din før du godtar avslaget →
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Ofte stilte spørsmål</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer">
                <span className="font-medium pr-4">{faq.q}</span>
                <ChevronDown className="h-5 w-5 text-slate-500 group-open:rotate-180 transition-transform shrink-0" />
              </summary>
              <div className="px-5 pb-5">
                <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>

        {/* FAQ JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        {/* WebPage JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
        />
      </section>

      {/* Final CTA */}
      <section data-final-cta="true" className="relative rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-emerald-500/5" />
        <div className="absolute inset-0 rounded-3xl border border-emerald-500/15" />
        <div className="relative p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Heving krever en konkret vurdering
          </h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Svar på noen spørsmål om bilkjøpet ditt – få en vurdering av saken din på 2 minutter.
          </p>
          <Link
            href="/bilkjop"
            className="group inline-flex items-center gap-2 bg-emerald-500 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-400 transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Start gratis vurdering
            <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <p className="text-xs text-slate-600 mt-4">Tar ca. 2 minutter · Ingen registrering</p>
        </div>
      </section>
    </BilSeoHero>
  );
}