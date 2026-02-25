import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

const faqs = [
  {
    q: "Hvor mange rettingsforsøk har forhandler krav på?",
    a: "Loven setter ingen eksakt grense, men to forsøk på samme feil er normalt det som aksepteres. Etter det kan du ha rett til å kreve heving eller prisavslag.",
  },
  {
    q: "Kan forhandler avvise heving og tilby prisavslag?",
    a: "Forhandler kan argumentere for prisavslag fremfor heving, men dersom mangelen er vesentlig og retting ikke har lykkes, har du rett til å velge heving.",
  },
  {
    q: "Hva om forhandler har gitt garanti?",
    a: "En garanti kommer i tillegg til dine lovfestede rettigheter. Garantien kan ikke begrense rettighetene du har etter forbrukerkjøpsloven.",
  },
  {
    q: "Må jeg betale for bruk av bilen hvis kjøpet heves?",
    a: "Selger kan kreve nyttevederlag for den bruken du har hatt av bilen. Beløpet beregnes ut fra faktisk bruk i perioden.",
  },
  {
    q: "Kan forhandler kreve at jeg bruker deres verksted?",
    a: "Forhandler har rett til å velge hvordan retting gjennomføres, men rettingen må skje innen rimelig tid og uten vesentlig ulempe for deg.",
  },
  {
    q: "Hva gjør jeg hvis forhandler nekter å svare på reklamasjonen?",
    a: "Dokumenter at reklamasjonen er sendt. Manglende svar fritar ikke forhandler for ansvar. Du kan gå videre med kravet ditt.",
  },
];

export default function HevingForhandlerPage() {
  return (
    <BilSeoHero
      eyebrow="Forbrukerrettigheter"
      h1Top="Heving av bilkjøp"
      h1Accent="fra forhandler"
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Kjøpte du bil fra forhandler og oppdaget alvorlige feil?
          Forbrukerkjøpsloven gir deg et sterkt vern. Heving er mulig når
          mangelen er vesentlig og forhandler ikke har rettet feilen.
        </p>
      }
      heroImageAlt="Heving av bilkjøp fra forhandler – dine rettigheter etter forbrukerkjøpsloven"
      primaryCtaTitle="Vil du sjekke om du kan heve?"
      primaryCtaText="Svar på noen spørsmål om bilkjøpet ditt og få en veiledende vurdering av om du har grunnlag for heving."
      primaryCtaButton="Sjekk saken din"
      secondaryCtaText="Sjekk saken din nå →"
    >
      {/* Forbrukerkjøpsloven */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Forbrukerkjøpsloven gir sterkere vern
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Når du kjøper bil av en næringsdrivende, gjelder forbrukerkjøpsloven.
            Loven kan ikke avtales bort, og gir deg flere fordeler sammenlignet
            med kjøpsloven mellom private:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>• 5 års reklamasjonsfrist for feil som kan vare over tid</li>
            <li>
              • Feil som viser seg innen 6 måneder antas å ha eksistert ved
              levering – forhandler må bevise det motsatte
            </li>
            <li>
              • Forhandler kan ikke fraskrive seg ansvar gjennom «som den
              er»-klausuler eller andre kontraktsvilkår
            </li>
            <li>
              • Forhandler har strengere opplysningsplikt enn en privatperson
            </li>
          </ul>
          <p className="text-slate-300">
            Disse reglene gjør at terskelen for å nå frem med krav er lavere
            enn ved{" "}
            <Link
              href="/bilkjop/heving-privat"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              privatkjøp
            </Link>
            . For en fullstendig gjennomgang, se vår{" "}
            <Link
              href="/bilkjop/heving"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              hovedguide til heving
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Rettingsforsøk */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Forhandlers rett til å rette feilen
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Etter forbrukerkjøpsloven § 29 har forhandler rett til å forsøke
            retting før du kan kreve heving. Men denne retten har klare
            begrensninger:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • Retting må skje innen rimelig tid og uten vesentlig ulempe for
              deg
            </li>
            <li>• Forhandler har normalt to forsøk på samme feil</li>
            <li>• Rettingen må faktisk løse problemet</li>
            <li>• Du skal ikke ha kostnader i forbindelse med rettingen</li>
          </ul>
          <p className="text-slate-300">
            Dersom forhandler ikke retter innen rimelig tid, eller rettingen
            mislykkes, åpner det for heving eller prisavslag.
          </p>
        </div>
      </section>

      {/* Vesentlig mangel */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Hva er vesentlig mangel ved forhandlerkjøp?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Heving etter forbrukerkjøpsloven § 32 krever at mangelen ikke er
            «uvesentlig». Terskelen er lavere enn ved privatkjøp, der kravet er
            at mangelen må være «vesentlig».
          </p>
          <p className="text-slate-300">
            Momenter i vurderingen:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • Feilens omfang sett opp mot kjøpesummen og bilens alder
            </li>
            <li>• Om feilen påvirker bilens sikkerhet eller funksjonalitet</li>
            <li>• Om forhandler har hatt mulighet til å rette</li>
            <li>• Om det foreligger brudd på opplysningsplikten</li>
            <li>• Antall feil – flere mindre feil kan samlet utgjøre grunnlag</li>
          </ul>
          <p className="text-slate-300">
            En motorfeil på 40 000 kr på en bil til 200 000 kr vil normalt
            ikke anses som uvesentlig. Flere mindre feil som til sammen utgjør
            en betydelig kostnad kan også oppfylle kravet.
          </p>
        </div>
      </section>

      {/* Prisavslag vs heving */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Prisavslag eller heving?</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Prisavslag og heving er begge misligholdssanksjoner, men de har
            forskjellige vilkår og konsekvenser:
          </p>
          <div className="space-y-3 mt-2">
            <div className="border-l-2 border-emerald-500/40 pl-4">
              <p className="font-medium text-white">Prisavslag</p>
              <p className="text-sm text-slate-400 mt-1">
                Krever bare at det foreligger en mangel. Du beholder bilen og
                får kompensasjon tilsvarende verdireduksjonen. Ingen krav om
                vesentlighet.
              </p>
            </div>
            <div className="border-l-2 border-emerald-500/40 pl-4">
              <p className="font-medium text-white">Heving</p>
              <p className="text-sm text-slate-400 mt-1">
                Krever at mangelen ikke er uvesentlig. Du leverer bilen tilbake
                og får kjøpesummen refundert, eventuelt med fradrag for
                nyttevederlag.
              </p>
            </div>
          </div>
          <p className="text-slate-300 mt-4">
            Forhandler vil ofte argumentere for prisavslag fremfor heving. Dersom
            mangelen er alvorlig nok, har du rett til å velge{" "}
            <Link
              href="/bilkjop/heving"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              heving av bilkjøp
            </Link>{" "}
            selv om forhandler tilbyr prisavslag.
          </p>
        </div>
      </section>

      {/* Praktisk eksempel */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Praktisk eksempel</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Du kjøper en bruktbil fra forhandler for 250 000 kr. Etter fire
            måneder oppstår motorproblemer. Verkstedet fastslår at feilen skyldes
            slitasje som har utviklet seg over tid. Forhandler forsøker
            reparasjon to ganger uten å løse problemet.
          </p>
          <p className="text-slate-300">
            Her taler flere momenter for heving: feilen viste seg innen 6
            måneder (presumsjonen gjelder), forhandler har fått to
            rettingsforsøk uten å lykkes, og feilen er ikke uvesentlig sett opp
            mot kjøpesummen.
          </p>
        </div>
      </section>

      {/* Kort oppsummert */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Kort oppsummert</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>• Forbrukerkjøpsloven gjelder og kan ikke avtales bort</li>
            <li>• Forhandler har rett til å forsøke retting, men retten er begrenset</li>
            <li>• Heving krever at mangelen ikke er uvesentlig – lavere terskel enn privatkjøp</li>
            <li>• Feil innen 6 måneder antas å ha fantes ved levering</li>
            <li>• Prisavslag er et alternativ med lavere terskel enn heving</li>
            <li>• Flere mislykkede rettingsforsøk styrker et hevingskrav</li>
          </ul>
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
            Har forhandler ikke løst problemet?
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
