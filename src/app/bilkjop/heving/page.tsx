import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

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
          kjøpet.
        </p>
      }
      heroImageAlt="Heving av bilkjøp – sjekk om du kan få pengene tilbake"
      primaryCtaTitle="Kan du heve bilkjøpet?"
      primaryCtaText="Svar på noen spørsmål og få en veiledende vurdering basert på hvem du kjøpte bilen fra og hva som har skjedd."
      primaryCtaButton="Se om du kan få pengene tilbake"
      secondaryCtaText="Sjekk saken din nå →"
    >
      {/* Kravet om vesentlig mangel */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Kravet om vesentlig mangel
        </h2>
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
              <p className="font-medium text-white">
                «Feilen er ikke alvorlig nok»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Vurderingen avhenger av pris, alder og hva du kunne forvente.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                «Vi har tilbudt reparasjon»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Selger har rett til å forsøke retting, men retten er ikke
                ubegrenset.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                «Du har brukt bilen for lenge»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Bruk etter oppdaget feil kan påvirke, men stopper ikke
                nødvendigvis kravet.
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
            Heving krever en konkret vurdering
          </h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Svar på noen spørsmål om bilkjøpet ditt – få en vurdering av saken
            din på 2 minutter.
          </p>
          <Link
            href="/bilkjop"
            className="group inline-flex items-center gap-2 bg-emerald-500 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-400 transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Start gratis vurdering
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
