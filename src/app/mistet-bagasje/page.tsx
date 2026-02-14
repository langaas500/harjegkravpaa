import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  Briefcase,
  ChevronDown,
} from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

export default function MistetBagasjePage() {
  return (
    <BilSeoHero
      eyebrow="Flypassasjerrettigheter"
      h1Top="Mistet eller forsinket bagasje?"
      h1Accent="Du kan ha krav på opptil 16 000 kr."
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Ved mistet, forsinket eller skadet bagasje kan du ha krav på erstatning
          på opptil ca. 16 000 kr (1 288 SDR) per passasjer. Flyselskapet skal
          dekke dokumenterte utgifter og tap.
        </p>
      }
      heroImageAlt="Mistet bagasje – sjekk om du har krav på erstatning"
      primaryCtaTitle="Problemer med bagasjen?"
      primaryCtaText="Start med å sjekke flyreisen din for å se hva du kan kreve."
      primaryCtaButton="Sjekk flyreisen din"
      secondaryCtaText="Sjekk saken din nå →"
      ctaHref="/flyreiser"
    >
      {/* Hva skjedde med bagasjen */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Hva skjedde med bagasjen?
        </h2>
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="h-5 w-5 text-amber-400" />
              <span className="font-semibold">Forsinket bagasje</span>
            </div>
            <p className="text-sm text-slate-400">
              Bagasjen kommer etter deg. Du kan få dekket nødvendige innkjøp
              (klær, toalettsaker) mens du venter.
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="h-5 w-5 text-red-400" />
              <span className="font-semibold">Tapt bagasje</span>
            </div>
            <p className="text-sm text-slate-400">
              Bagasje som ikke finnes igjen innen 21 dager regnes som tapt. Du
              kan kreve erstatning for innholdet.
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="h-5 w-5 text-orange-400" />
              <span className="font-semibold">Skadet bagasje</span>
            </div>
            <p className="text-sm text-slate-400">
              Hvis bagasjen er ødelagt eller skadet, kan du kreve reparasjon
              eller erstatning.
            </p>
          </div>
        </div>
      </section>

      {/* Hvor mye */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Hvor mye kan du få?</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8">
          <p className="text-3xl font-bold text-white mb-2">
            Opptil ca. 16 000 kr
          </p>
          <p className="text-sm text-slate-400 mb-4">
            (1 288 SDR - Special Drawing Rights)
          </p>
          <p className="text-slate-300">
            Dette er maksbeløpet per passasjer. Du får dekket dokumenterte tap,
            ikke et fast beløp. Ta vare på kvitteringer.
          </p>
        </div>
      </section>

      {/* Hva må du gjøre */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Hva må du gjøre?</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-black rounded-full flex items-center justify-center font-bold">
              1
            </span>
            <div>
              <span className="font-medium text-white">
                Meld fra umiddelbart
              </span>
              <p className="text-sm text-slate-400">
                Gå til bagasjeservice på flyplassen og fyll ut PIR-skjema
                (Property Irregularity Report). Dette er viktig dokumentasjon.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-black rounded-full flex items-center justify-center font-bold">
              2
            </span>
            <div>
              <span className="font-medium text-white">Dokumenter alt</span>
              <p className="text-sm text-slate-400">
                Ta vare på boardingkort, bagasjekvittering og alle kvitteringer
                for nødkjøp.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-black rounded-full flex items-center justify-center font-bold">
              3
            </span>
            <div>
              <span className="font-medium text-white">
                Send skriftlig krav
              </span>
              <p className="text-sm text-slate-400">
                Kontakt flyselskapet skriftlig innen fristene.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Viktige frister */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Viktige frister</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <p className="font-semibold text-white">Skadet bagasje</p>
            <p className="text-2xl font-bold text-amber-400 my-2">7 dager</p>
            <p className="text-sm text-slate-400">Fra du mottar bagasjen</p>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <p className="font-semibold text-white">Forsinket bagasje</p>
            <p className="text-2xl font-bold text-red-400 my-2">21 dager</p>
            <p className="text-sm text-slate-400">
              Fra bagasjen skulle vært levert
            </p>
          </div>
        </div>
      </section>

      {/* Hva dekkes */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Hva dekkes og hva dekkes ikke?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="font-medium text-white mb-3">Hva dekkes:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-300">
                    Nødvendige klær og toalettsaker
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-300">
                    Verdi av tapt innhold (dokumentert)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-300">
                    Reparasjon eller erstatning av koffert
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-3">Hva dekkes ikke:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-400">
                    Verdisaker i innsjekket bagasje
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-400">
                    Skjøre gjenstander uten spesialemballasje
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-400">
                    Luksuskjøp utover nødvendig
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
              q: "Hva er et PIR-skjema?",
              a: "PIR (Property Irregularity Report) er et standardskjema du fyller ut på flyplassen når bagasjen er forsinket, tapt eller skadet. Dette er viktig dokumentasjon for senere krav.",
            },
            {
              q: "Når regnes bagasjen som tapt?",
              a: "Bagasje som ikke er funnet innen 21 dager etter at den skulle vært levert, regnes som tapt. Da kan du kreve full erstatning.",
            },
            {
              q: "Hva er SDR?",
              a: "SDR (Special Drawing Rights) er en internasjonal regneenhet brukt av IMF. 1 288 SDR tilsvarer ca. 16 000 kr, men kursen varierer.",
            },
            {
              q: "Kan jeg kjøpe hva som helst mens jeg venter?",
              a: "Nei. Du får dekket nødvendige utgifter – klær og toalettsaker som er rimelige. Luksuskjøp eller unødvendige ting dekkes ikke.",
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
            Svar på noen enkle spørsmål om flyreisen din, så finner vi ut hva du
            kan kreve erstatning for.
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
