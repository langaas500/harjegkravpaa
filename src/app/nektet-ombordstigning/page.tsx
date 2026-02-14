import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle, ChevronDown } from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

export default function NektetOmbordstigningPage() {
  return (
    <BilSeoHero
      eyebrow="Flypassasjerrettigheter"
      h1Top="Nektet ombordstigning?"
      h1Accent="Du kan ha krav på opptil 600 euro."
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Hvis flyselskapet nekter deg ombordstigning mot din vilje på grunn av
          overbooking, har du krav på kompensasjon. I tillegg kan du velge
          mellom refusjon eller ombooking.
        </p>
      }
      heroImageAlt="Nektet ombordstigning – sjekk om du har krav på kompensasjon"
      primaryCtaTitle="Ble du nektet ombordstigning?"
      primaryCtaText="Svar på noen enkle spørsmål om flyreisen din, så finner vi ut om du har krav på kompensasjon."
      primaryCtaButton="Sjekk flyreisen din"
      secondaryCtaText="Sjekk saken din nå →"
      ctaHref="/flyreiser"
    >
      {/* Hva er overbooking */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Hva er overbooking?</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Flyselskaper selger ofte flere billetter enn det er seter på flyet.
            De regner med at noen ikke møter opp. Når alle møter opp, må noen
            nektes ombordstigning.
          </p>
          <p className="text-slate-300">
            Dette er{" "}
            <strong className="text-white">flyselskapets risiko</strong>, og du
            skal ikke tape på det. Derfor har du krav på kompensasjon når dette
            skjer.
          </p>
        </div>
      </section>

      {/* Hvor mye */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Hvor mye kan du få?</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 text-center">
            <p className="text-3xl font-bold text-white mb-1">250 EUR</p>
            <p className="text-sm text-slate-400">Under 1500 km</p>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 text-center">
            <p className="text-3xl font-bold text-white mb-1">400 EUR</p>
            <p className="text-sm text-slate-400">1500–3500 km</p>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 text-center">
            <p className="text-3xl font-bold text-white mb-1">600 EUR</p>
            <p className="text-sm text-slate-400">Over 3500 km</p>
          </div>
        </div>
        <p className="text-sm text-slate-400 mt-4">
          I tillegg til kompensasjonen har du rett til refusjon av billetten
          eller ombooking til neste ledige fly.
        </p>
      </section>

      {/* Dine rettigheter */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Dine rettigheter ved nektet ombordstigning
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-white">
                  Kompensasjon umiddelbart
                </span>
                <p className="text-sm text-slate-400">
                  Flyselskapet skal tilby kompensasjon på stedet, ikke bare ved
                  klage senere.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-white">
                  Valg mellom refusjon eller ombooking
                </span>
                <p className="text-sm text-slate-400">
                  Du velger selv om du vil ha pengene tilbake eller bli booket
                  om.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-white">
                  Mat, drikke og hotell
                </span>
                <p className="text-sm text-slate-400">
                  Flyselskapet skal dekke nødvendige utgifter mens du venter.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Når har du krav / ikke krav */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Når har du krav – og når har du ikke?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="font-medium text-white mb-3">Du har krav ved:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-300">
                    Overbooking (for mange billetter solgt)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-300">
                    Operasjonelle grunner (flybytte, besetning)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-300">
                    Nektet uten god grunn
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-3">
                Ikke krav dersom:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-400">
                    Du kom for sent til gate
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-400">
                    Manglende reisedokumenter
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-400">
                    Sikkerhets- eller helseårsaker
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Frivillig vs ufrivillig */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Frivillig vs. ufrivillig
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Flyselskapet skal først spørre om noen vil gi fra seg plassen
            frivillig mot kompensasjon. Hvis du takker ja frivillig, forhandler
            du selv om hva du får.
          </p>
          <p className="text-slate-300">
            Hvis du nektes ombordstigning{" "}
            <strong className="text-white">mot din vilje</strong>, har du krav
            på full kompensasjon etter EU-forordningen.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Ofte stilte spørsmål</h2>
        <div className="space-y-3">
          {[
            {
              q: "Hvor lenge kan jeg vente med å kreve kompensasjon?",
              a: "Du kan kreve kompensasjon for nektet ombordstigning opptil 3 år tilbake i tid.",
            },
            {
              q: "Hva hvis jeg ga fra meg plassen frivillig?",
              a: "Hvis du frivillig ga fra deg plassen, gjelder ikke de faste kompensasjonssatsene. Da har du kun krav på det flyselskapet tilbød deg.",
            },
            {
              q: "Gjelder reglene for alle flyselskaper?",
              a: "Reglene gjelder for alle flyselskaper som flyr fra EU/EØS, og for EU-baserte selskaper som flyr til EU/EØS.",
            },
            {
              q: "Kan flyselskapet nekte å betale?",
              a: "Ved overbooking har du krav på kompensasjon, og flyselskapet kan ikke nekte dette. Hvis de likevel gjør det, kan du ta saken videre til Transportklagenemnda.",
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
            Sjekk om du har krav
          </h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Svar på noen enkle spørsmål, så finner vi ut om du har rett til
            kompensasjon for nektet ombordstigning.
          </p>
          <Link
            href="/flyreiser"
            className="group inline-flex items-center gap-2 bg-emerald-500 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-400 transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Sjekk flyreisen din
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
