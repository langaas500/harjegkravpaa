import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

export default function PrivatKjopPage() {
  return (
    <BilSeoHero
      eyebrow="Forbrukerrettigheter"
      h1Top="Privat bilkjøp"
      h1Accent="Har du rettigheter?"
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Mange tror at kjøp fra privatperson betyr null rettigheter. Det
          stemmer ikke. Kjøpsloven gjelder også mellom private, og den gir deg
          rettigheter selv om bilen er solgt «som den er».
        </p>
      }
      heroImageAlt="Privat bilkjøp – dine rettigheter"
      primaryCtaTitle="Usikker på om du har en sak?"
      primaryCtaText="Om du har rettigheter avhenger av hva selger visste, hva som ble sagt, og hva som faktisk var galt med bilen."
      primaryCtaButton="Sjekk saken din"
      secondaryCtaText="Sjekk saken din nå →"
    >
      {/* Kjøpsloven og «som den er» */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Kjøpsloven gjelder – også ved «som den er»
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Kjøpsloven regulerer privatkjøp og gir deg rett til å reklamere
            dersom bilen har en mangel. «Som den er» beskytter ikke selger mot
            egne feil eller tilbakeholdt informasjon.
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>• Selger har holdt tilbake opplysninger du burde fått</li>
            <li>• Selger har gitt uriktige opplysninger</li>
            <li>
              • Bilen er i vesentlig dårligere stand enn du hadde grunn til å
              forvente
            </li>
          </ul>
        </div>
      </section>

      {/* Hvorfor mange gir opp */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Hvorfor mange gir opp for tidlig
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <div className="space-y-3">
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                «Selger sa at bilen var solgt som den er»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Det fritar ikke selger fra ansvar for tilbakeholdte eller
                uriktige opplysninger.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                «Selger sier han ikke visste om feilen»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Bilen kan likevel være i vesentlig dårligere stand enn forventet.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">«Jeg har ikke bevis»</p>
              <p className="text-sm text-slate-400 mt-1">
                Annonsetekst, meldinger og tilstandsrapporter kan være viktig
                dokumentasjon.
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
          {[
            {
              q: "Har jeg kortere reklamasjonsfrist ved privatkjøp?",
              a: "Ja, den absolutte fristen er to år (mot fem år ved forhandlerkjøp). Du må uansett reklamere innen rimelig tid.",
            },
            {
              q: "Kan jeg kreve heving ved privatkjøp?",
              a: "Ja, men terskelen er høy. Mangelen må være vesentlig. Prisavslag eller erstatning er ofte mer realistisk.",
            },
            {
              q: "Hva hvis selger nekter å svare?",
              a: "Send skriftlig reklamasjon for å sikre dokumentasjon. Saken kan tas videre til forliksrådet.",
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
            Privatkjøp er mer usikkert – men ikke uten vern
          </h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Svar på noen spørsmål om bilkjøpet ditt – få en vurdering av saken
            din på 2 minutter.
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
