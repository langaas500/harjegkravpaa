import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

const faqs = [
  {
    q: "Kan selger heve hvis kjøper betaler én dag for sent?",
    a: "Nei, én dags forsinkelse vil normalt ikke utgjøre vesentlig kontraktsbrudd. Selger må gi en rimelig tilleggsfrist, og forsinkelsen må være av en viss varighet og betydning.",
  },
  {
    q: "Kan selger heve etter at bilen er levert?",
    a: "Ja, men bare dersom selger har tatt forbehold om dette (stansingsrett/salgspant), eller dersom kjøper ikke har betalt og det foreligger vesentlig betalingsmislighold.",
  },
  {
    q: "Hva skjer med bilen hvis selger hever?",
    a: "Ved heving skal ytelsene tilbakeføres. Kjøper leverer tilbake bilen, og selger tilbakefører eventuelt mottatt betaling. Begge parter skal stilles som om avtalen ikke var inngått.",
  },
  {
    q: "Kan selger heve hvis kjøper ikke henter bilen?",
    a: "Ja, dersom kjøper uten gyldig grunn unnlater å medvirke til kjøpet, for eksempel ved ikke å hente bilen som avtalt, kan dette utgjøre et kontraktsbrudd som gir selger hevingsrett.",
  },
  {
    q: "Gjelder samme regler for privatperson og forhandler som selger?",
    a: "Selgers hevingsrett følger av kjøpsloven ved privatsalg og forbrukerkjøpsloven ved forhandlersalg. Vilkårene er i stor grad like: det kreves vesentlig kontraktsbrudd fra kjøpers side.",
  },
];

export default function KanSelgerHevePage() {
  return (
    <BilSeoHero
      eyebrow="Forbrukerrettigheter"
      h1Top="Kan selger heve"
      h1Accent="kjøpet av bil?"
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Heving er ikke bare en rett for kjøper. Også selger kan under visse
          forutsetninger heve et bilkjøp – primært ved kjøpers
          betalingsmislighold eller annet vesentlig kontraktsbrudd.
        </p>
      }
      heroImageAlt="Kan selger heve kjøpet av bil? Regler og vilkår"
      primaryCtaTitle="Lurer du på dine rettigheter?"
      primaryCtaText="Enten du er kjøper eller selger – svar på noen spørsmål og få en veiledende vurdering av saken din."
      primaryCtaButton="Sjekk saken din"
      secondaryCtaText="Sjekk saken din nå →"
    >
      {/* Når kan selger heve? */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Når kan selger heve bilkjøpet?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Selgers hevingsrett reguleres av kjøpsloven §§ 54–57. Hovedregelen
            er at selger kan heve dersom kjøpers kontraktsbrudd er vesentlig.
            De vanligste situasjonene er:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>• Kjøper betaler ikke kjøpesummen til avtalt tid</li>
            <li>• Kjøper henter ikke bilen som avtalt (medvirkningssvikt)</li>
            <li>• Kjøper bryter andre vesentlige kontraktsvilkår</li>
          </ul>
          <p className="text-slate-300">
            Heving er den mest inngripende sanksjonen og krever at misligholdet
            er av en viss alvorlighetsgrad. Selger kan ikke heve ved bagateller
            eller mindre forsinkelser.
          </p>
        </div>
      </section>

      {/* Betalingsmislighold */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Kjøpers betalingsmislighold
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Den klart vanligste grunnen til at selger vil heve, er at kjøper
            ikke betaler. For at selger skal kunne heve, må
            betalingsmisligholdet være vesentlig.
          </p>
          <p className="text-slate-300">
            Momenter i vesentlighetsvurderingen:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>• Hvor lenge betalingen er forsinket</li>
            <li>• Om kjøper har fått tilleggsfrist og oversittet denne</li>
            <li>• Om det foreligger holdepunkter for at kjøper ikke vil betale</li>
            <li>• Beløpets størrelse og den samlede kontraktssummen</li>
          </ul>
          <p className="text-slate-300">
            I praksis bør selger sette en rimelig tilleggsfrist for betaling.
            Oversitter kjøper denne fristen, styrker det selgers hevingsgrunnlag
            betydelig.
          </p>
        </div>
      </section>

      {/* Tilbakeholdsrett og stansing */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Tilbakeholdsrett og stansingsrett
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Før selger hever, kan det være aktuelt å bruke mildere virkemidler:
          </p>
          <div className="space-y-3 mt-2">
            <div className="border-l-2 border-emerald-500/40 pl-4">
              <p className="font-medium text-white">Tilbakeholdsrett</p>
              <p className="text-sm text-slate-400 mt-1">
                Selger kan holde tilbake bilen inntil kjøper betaler. Dette
                forutsetter at bilen ikke allerede er overlevert.
              </p>
            </div>
            <div className="border-l-2 border-emerald-500/40 pl-4">
              <p className="font-medium text-white">Stansingsrett</p>
              <p className="text-sm text-slate-400 mt-1">
                Dersom bilen er sendt men ikke mottatt av kjøper, kan selger
                stanse leveringen ved betalingsmislighold. Denne retten følger
                av kjøpsloven § 61.
              </p>
            </div>
          </div>
          <p className="text-slate-300 mt-4">
            Disse virkemidlene er mindre inngripende enn heving og kan brukes
            som pressmiddel for å sikre betaling.
          </p>
        </div>
      </section>

      {/* Heving før levering */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Heving før bilen er levert (antesipert mislighold)
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Etter kjøpsloven § 62 kan selger heve allerede før betalingsfristen
            har gått ut, dersom det er klart at kjøper kommer til å
            misligholde vesentlig. Dette kalles antesipert mislighold.
          </p>
          <p className="text-slate-300">
            Typiske situasjoner:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>• Kjøper erklærer at han ikke vil betale</li>
            <li>
              • Det fremgår av kjøpers handlemåte at betaling ikke vil skje
            </li>
            <li>
              • Kjøper er gått konkurs eller det er åpnet gjeldsforhandling
            </li>
          </ul>
          <p className="text-slate-300">
            Selger bør likevel varsle kjøper og gi mulighet til å stille
            sikkerhet for betalingen, jf. kjøpsloven § 62 annet ledd. Unnlater
            selger dette, kan hevingen være uberettiget.
          </p>
        </div>
      </section>

      {/* Konsekvenser av heving */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Konsekvenser når selger hever
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Heving innebærer at avtalen faller bort og ytelsene skal
            tilbakeføres:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>• Kjøper leverer tilbake bilen i den stand den ble mottatt</li>
            <li>• Selger tilbakefører mottatt betaling</li>
            <li>
              • Selger kan kreve erstatning for tap som følge av kjøpers
              mislighold
            </li>
            <li>
              • Selger kan kreve nyttevederlag for kjøpers bruk av bilen
            </li>
          </ul>
          <p className="text-slate-300">
            Merk at selger mister hevingsretten dersom det tar urimelig lang tid
            før heving gjøres gjeldende. Selger bør handle raskt når
            misligholdet er konstatert.
          </p>
        </div>
      </section>

      {/* Kort oppsummert */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Kort oppsummert</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>• Selger kan heve ved vesentlig kontraktsbrudd fra kjøpers side</li>
            <li>• Betalingsmislighold er den vanligste hevingsgrunnen for selger</li>
            <li>• Selger bør gi tilleggsfrist før heving</li>
            <li>• Tilbakeholdsrett og stansingsrett kan brukes som mildere virkemidler</li>
            <li>• Heving kan skje før levering ved antesipert mislighold</li>
            <li>• Selger mister hevingsretten ved passivitet</li>
          </ul>
          <p className="text-slate-300 mt-4">
            Lurer du på om du som kjøper kan heve? Les vår{" "}
            <Link
              href="/bilkjop/heving"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              hovedguide til heving av bilkjøp
            </Link>
            .
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
            Usikker på rettighetene dine?
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
