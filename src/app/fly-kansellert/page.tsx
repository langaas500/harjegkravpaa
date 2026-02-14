import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

export default function FlyKansellertPage() {
  return (
    <BilSeoHero
      eyebrow="Flypassasjerrettigheter"
      h1Top="Fly kansellert?"
      h1Accent="Du kan ha krav på opptil 600 euro."
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Når flyselskapet kansellerer flyet ditt, har du rett til refusjon
          eller ombooking. I tillegg kan du ha krav på kompensasjon, avhengig av
          når du fikk beskjed om kanselleringen.
        </p>
      }
      heroImageAlt="Fly kansellert – sjekk om du har krav på kompensasjon"
      primaryCtaTitle="Ble flyet ditt kansellert?"
      primaryCtaText="Svar på noen enkle spørsmål om flyreisen din, så finner vi ut om du har krav på kompensasjon."
      primaryCtaButton="Sjekk flyreisen din"
      secondaryCtaText="Sjekk saken din nå →"
      ctaHref="/flyreiser"
    >
      {/* Når fikk du beskjed */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Når fikk du beskjed om kanselleringen?
        </h2>
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <span className="font-semibold">Under 7 dager før avgang</span>
            </div>
            <p className="text-sm text-slate-400">
              Full kompensasjon (250–600 EUR), med mindre du ble tilbudt
              alternativ transport som ankom nært opprinnelig tid.
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              <span className="font-semibold">7–14 dager før avgang</span>
            </div>
            <p className="text-sm text-slate-400">
              Du kan ha krav på kompensasjon, avhengig av alternativ transport
              som ble tilbudt.
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="h-5 w-5 text-slate-500" />
              <span className="font-semibold">Over 14 dager før avgang</span>
            </div>
            <p className="text-sm text-slate-400">
              Normalt ingen kompensasjon, men du har fortsatt rett til refusjon
              eller ombooking.
            </p>
          </div>
        </div>
      </section>

      {/* Hvor mye */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Hvor mye kan du få?</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 text-center">
            <p className="text-3xl font-bold text-white mb-1">250 EUR</p>
            <p className="text-sm text-slate-400">Under 1500 km</p>
            <p className="text-xs text-slate-500 mt-1">
              F.eks. Oslo–Stockholm
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 text-center">
            <p className="text-3xl font-bold text-white mb-1">400 EUR</p>
            <p className="text-sm text-slate-400">1500–3500 km</p>
            <p className="text-xs text-slate-500 mt-1">
              F.eks. Oslo–Barcelona
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 text-center">
            <p className="text-3xl font-bold text-white mb-1">600 EUR</p>
            <p className="text-sm text-slate-400">Over 3500 km</p>
            <p className="text-xs text-slate-500 mt-1">F.eks. Oslo–Bangkok</p>
          </div>
        </div>
      </section>

      {/* Dine rettigheter */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Dine rettigheter ved kansellering
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-white">
                  Valg mellom refusjon eller ombooking
                </span>
                <p className="text-sm text-slate-400">
                  Du velger selv om du vil ha pengene tilbake eller bli booket om
                  til en annen flyvning.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-white">
                  Mat og drikke ved lang ventetid
                </span>
                <p className="text-sm text-slate-400">
                  Flyselskapet skal dekke rimelige utgifter til mat og drikke
                  mens du venter.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-white">
                  Hotell ved overnatting
                </span>
                <p className="text-sm text-slate-400">
                  Hvis du må vente til neste dag, skal flyselskapet ordne og
                  betale for hotell.
                </p>
              </div>
            </li>
          </ul>
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
                    Ekstremvær som umuliggjør flyvning
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-400">
                    Flygelederstrike
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-400">
                    Politisk ustabilitet eller terrorfare
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
                    Tekniske problemer
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
                    Kommersielle beslutninger
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
              a: "Du kan kreve kompensasjon for kansellerte flyreiser opptil 3 år tilbake i tid. Det betyr at selv om kanselleringen skjedde for en stund siden, kan du fortsatt ha krav.",
            },
            {
              q: "Hva hvis jeg ble tilbudt ombooking?",
              a: "Du kan fortsatt ha krav på kompensasjon selv om du ble tilbudt ombooking, avhengig av ankomsttiden sammenlignet med opprinnelig fly.",
            },
            {
              q: "Gjelder reglene for alle flyselskaper?",
              a: "Reglene gjelder for alle flyselskaper som flyr fra EU/EØS, og for EU-baserte selskaper som flyr til EU/EØS.",
            },
            {
              q: "Kan jeg kreve både refusjon og kompensasjon?",
              a: "Ja. Kompensasjon og refusjon er to forskjellige ting. Du kan ha krav på begge deler ved kansellering.",
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
            kompensasjon for din kansellerte flyreise.
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
