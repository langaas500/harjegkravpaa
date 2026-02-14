import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

export default function GarantiPage() {
  return (
    <BilSeoHero
      eyebrow="Forbrukerrettigheter"
      h1Top="Garanti på bil"
      h1Accent="Hva gjelder egentlig?"
      intro="Garanti og reklamasjon er ikke det samme. Garantien er frivillig fra selger – reklamasjonsretten følger av loven og kan gi deg rettigheter selv når garantien ikke dekker."
      heroImageAlt="Garanti på bil – hva gjelder egentlig?"
      primaryCtaTitle="Gjelder garantien din situasjon?"
      primaryCtaText="Mange får avslag fordi garantien har begrensninger, selv om de fortsatt kan ha rettigheter etter loven. Sjekk saken din."
      primaryCtaButton="Sjekk saken din"
      secondaryCtaText="Sjekk saken din nå →"
    >
      {/* Garanti vs reklamasjon */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Garanti vs reklamasjon (kort forklart)
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-2">Garanti</p>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• Frivillig fra selger</li>
                <li>• Egne vilkår og unntak</li>
                <li>• Ofte tidsbegrenset</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-2">Reklamasjon</p>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• Lovfestet rett</li>
                <li>• Gjelder mangler ved kjøpet</li>
                <li>• 2 år (privat) / 5 år (forhandler)</li>
              </ul>
            </div>
          </div>
          <p className="text-slate-300">
            Får du avslag på garanti, kan du fortsatt ha krav etter loven.
          </p>
        </div>
      </section>

      {/* Vanlige grunner til garantiavslag */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Vanlige grunner til garantiavslag
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>• Krav om service hos godkjent verksted ikke oppfylt</li>
            <li>• Feilen gjelder slitedeler (bremser, clutch, batteri)</li>
            <li>• Garantitiden har utløpt</li>
          </ul>
          <p className="text-slate-300">
            Ingen av disse betyr automatisk at du ikke har en sak –{" "}
            <Link
              href="/bilkjop"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              sjekk reklamasjonsretten din her
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Ofte stilte spørsmål</h2>
        <div className="space-y-3">
          {[
            {
              q: "Kan jeg reklamere selv om garantien har utløpt?",
              a: "Ja. Reklamasjonsretten gjelder uavhengig av garantien – opptil 5 år ved kjøp fra forhandler.",
            },
            {
              q: "Hva hvis selger sier at garantien ikke dekker feilen?",
              a: "Garantiavslag betyr ikke at du mangler rettigheter. Feilen kan likevel være en mangel etter loven.",
            },
            {
              q: "Må jeg bruke merkeverksted for å beholde rettighetene mine?",
              a: "Garantien kan kreve det, men reklamasjonsretten har ingen slike krav.",
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer">
                <span className="font-medium pr-4">{faq.q}</span>
                <ChevronDown className="h-5 w-5 text-slate-500 group-open:rotate-180 transition-transform shrink-0" />
              </summary>
              <div className="px-5 pb-5">
                <p className="text-slate-400 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section
        data-final-cta="true"
        className="relative rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-emerald-500/5" />
        <div className="absolute inset-0 rounded-3xl border border-emerald-500/15" />
        <div className="relative p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Usikker på hva som gjelder i din situasjon?
          </h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Svar på noen spørsmål om bilkjøpet ditt – få en vurdering på 2
            minutter.
          </p>
          <Link
            href="/bilkjop"
            className="group inline-flex items-center gap-2 bg-emerald-500 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-400 transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Sjekk saken din
            <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <p className="text-xs text-slate-600 mt-4">
            Tar ca. 2 minutter · Ingen registrering
          </p>
        </div>
      </section>
    </BilSeoHero>
  );
}
