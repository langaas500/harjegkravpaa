import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle, ChevronDown } from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

export default function FlyForsinketPage() {
  return (
    <BilSeoHero
      heroImageUrl="/fly-hero.jpg"
      eyebrow="Flypassasjerrettigheter"
      h1Top="Fly forsinket mer enn 3 timer?"
      h1Accent="Du kan ha krav på opptil 600 euro."
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Hvis flyet ditt er forsinket mer enn 3 timer ved ankomst, kan du ha
          krav på kompensasjon. Men det avhenger av flere faktorer – blant annet
          årsaken til forsinkelsen og hvor du fløy fra.
        </p>
      }
      heroImageAlt="Fly forsinket – sjekk om du har krav på kompensasjon"
      primaryCtaTitle="Var flyet ditt forsinket?"
      primaryCtaText="Svar på noen enkle spørsmål om flyreisen din, så finner vi ut om du har krav på kompensasjon."
      primaryCtaButton="Sjekk flyreisen din"
      secondaryCtaText="Sjekk saken din nå →"
      ctaHref="/flyreiser"
    >
      {/* Når har du krav */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Når har du krav på kompensasjon?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            EU-forordning 261/2004 gir deg rett til kompensasjon ved
            forsinkelse, men ikke i alle tilfeller. Flere vilkår må være
            oppfylt.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="text-slate-300">
                Forsinkelsen er over 3 timer ved ankomst
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="text-slate-300">
                Flyvningen går fra EU/EØS, eller til EU/EØS med et EU-basert
                flyselskap
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="text-slate-300">
                Forsinkelsen skyldes ikke ekstraordinære omstendigheter
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Hvor mye */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Hvor mye kan du få?</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 text-center">
            <p className="text-3xl font-bold text-white mb-1">250 EUR</p>
            <p className="text-sm text-slate-400">Under 1500 km</p>
            <p className="text-xs text-slate-500 mt-1">F.eks. Oslo–London</p>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 text-center">
            <p className="text-3xl font-bold text-white mb-1">400 EUR</p>
            <p className="text-sm text-slate-400">1500–3500 km</p>
            <p className="text-xs text-slate-500 mt-1">F.eks. Oslo–Roma</p>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 text-center">
            <p className="text-3xl font-bold text-white mb-1">600 EUR</p>
            <p className="text-sm text-slate-400">Over 3500 km</p>
            <p className="text-xs text-slate-500 mt-1">F.eks. Oslo–New York</p>
          </div>
        </div>
      </section>

      {/* Når får du ikke */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Når får du ikke kompensasjon?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Flyselskapet er ikke ansvarlig for «ekstraordinære omstendigheter» –
            hendelser utenfor deres kontroll.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <p className="font-medium text-white mb-3">
                Gir vanligvis ikke krav:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-400">
                    Dårlig vær (storm, snø, tåke)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-400">
                    Streik utenfor flyselskapets kontroll
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-400">
                    Sikkerhetstrussel eller politisk ustabilitet
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-3">
                Du har fortsatt krav ved:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-300">
                    Tekniske problemer med flyet
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-300">
                    Bemanningsproblemer
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-300">
                    Forsinkelse fra forrige flyvning
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Ofte stilte spørsmål</h2>
        <div className="space-y-3">
          {[
            {
              q: "Hvor lenge kan jeg vente med å kreve kompensasjon?",
              a: "Du kan kreve kompensasjon for flyreiser opptil 3 år tilbake i tid. Det betyr at selv om forsinkelsen skjedde for en stund siden, kan du fortsatt ha krav.",
            },
            {
              q: "Hva er «ekstraordinære omstendigheter»?",
              a: "Hendelser utenfor flyselskapets kontroll, som ekstremvær, terror eller luftromsstenging. Tekniske feil regnes vanligvis ikke som ekstraordinært.",
            },
            {
              q: "Gjelder reglene for alle flyselskaper?",
              a: "Reglene gjelder for alle flyselskaper som flyr fra EU/EØS, og for EU-baserte selskaper som flyr til EU/EØS.",
            },
            {
              q: "Kan jeg kreve kompensasjon selv om jeg fikk mat/hotell?",
              a: "Ja. Mat, drikke og hotell er forpleining du har krav på uavhengig av kompensasjon. Kompensasjonen kommer i tillegg.",
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
            kompensasjon for din forsinkede flyreise.
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
