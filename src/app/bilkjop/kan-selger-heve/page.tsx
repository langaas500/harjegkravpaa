import type { Metadata } from "next";
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

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Hjem",
      item: "https://harjegkravpå.no",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Bilkjøp",
      item: "https://harjegkravpå.no/bilkjop",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Heving av bilkjøp",
      item: "https://harjegkravpå.no/bilkjop/heving",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Kan selger heve bilkjøpet?",
      item: "https://harjegkravpå.no/bilkjop/kan-selger-heve",
    },
  ],
};

export const metadata: Metadata = {
  description:
    "Kan selger heve bilkjøpet? Les om reglene — og sjekk din sak med AI-verktøyet vårt. Rapport + kravbrev for 99 kr.",
};

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
          betalingsmislighold eller annet vesentlig kontraktsbrudd. Denne guiden
          forklarer når selger kan heve bilkjøpet, hvilke frister som gjelder,
          og hva konsekvensene er.
        </p>
      }
      heroImageAlt="Kan selger heve kjøpet av bil? Regler og vilkår"
      primaryCtaTitle="Lurer du på dine rettigheter?"
      primaryCtaText="Enten du er kjøper eller selger – svar på noen spørsmål og få en veiledende vurdering av saken din."
      primaryCtaButton="Sjekk saken din"
      secondaryCtaText="Sjekk saken din nå →"
    >
      <p className="text-xs text-slate-500 mb-10">
        Sist oppdatert: Februar 2026
      </p>

      {/* Når kan selger heve? */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Når kan selger heve bilkjøpet?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Selgers hevingsrett reguleres av kjøpsloven §§ 54–57. Hovedregelen
            er at selger kan heve bilkjøpet dersom kjøpers kontraktsbrudd er
            vesentlig. Det er viktig å understreke at selger ikke kan heve
            bilkjøpet bare fordi han angrer på salget – det kreves et reelt og
            kvalifisert mislighold fra kjøpers side.
          </p>
          <p className="text-slate-300">
            De vanligste situasjonene der selger kan heve bilkjøpet:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>• Kjøper betaler ikke kjøpesummen til avtalt tid</li>
            <li>
              • Kjøper henter ikke bilen som avtalt (medvirkningssvikt)
            </li>
            <li>• Kjøper bryter andre vesentlige kontraktsvilkår</li>
            <li>
              • Det er klart at kjøper kommer til å misligholde vesentlig
              (antesipert mislighold)
            </li>
          </ul>
          <p className="text-slate-300">
            Heving er den mest inngripende sanksjonen og krever at misligholdet
            er av en viss alvorlighetsgrad. Selger kan ikke heve bilkjøpet ved
            bagateller eller mindre forsinkelser. Mildere virkemidler som
            tilbakeholdsrett bør vurderes først.
          </p>
          <p className="text-slate-300">
            For kjøpers hevingsrett, se vår{" "}
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

      {/* Betalingsmislighold */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Kjøpers betalingsmislighold
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Den klart vanligste grunnen til at selger vil heve bilkjøpet, er at
            kjøper ikke betaler. For at selger skal kunne heve, må
            betalingsmisligholdet være vesentlig. En kort forsinkelse på noen
            dager gir normalt ikke grunnlag for heving.
          </p>
          <p className="text-slate-300">
            Momenter i vesentlighetsvurderingen:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • <strong className="text-white">Forsinkelsens varighet:</strong>{" "}
              Hvor lenge betalingen er forsinket. En uke er normalt for kort,
              mens flere uker taler for vesentlighet.
            </li>
            <li>
              • <strong className="text-white">Tilleggsfrist:</strong> Om
              selger har gitt kjøper en rimelig tilleggsfrist og denne er
              oversittet. En formelt fremsatt tilleggsfrist styrker selgers
              posisjon betydelig.
            </li>
            <li>
              • <strong className="text-white">Betalingsvilje:</strong> Om det
              foreligger holdepunkter for at kjøper ikke vil eller kan betale.
            </li>
            <li>
              • <strong className="text-white">Beløpets størrelse:</strong>{" "}
              Mislighold av hele kjøpesummen veier tyngre enn mislighold av en
              delinnbetaling.
            </li>
          </ul>
          <p className="text-slate-300">
            I praksis bør selger alltid sette en rimelig tilleggsfrist for
            betaling. Oversitter kjøper denne fristen, styrker det selgers
            hevingsgrunnlag betydelig og gjør det enklere å dokumentere at
            misligholdet er vesentlig.
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
            Før selger hever bilkjøpet, kan det være aktuelt å bruke mildere
            virkemidler som pressmiddel:
          </p>
          <div className="space-y-3 mt-2">
            <div className="border-l-2 border-emerald-500/40 pl-4">
              <p className="font-medium text-white">Tilbakeholdsrett</p>
              <p className="text-sm text-slate-400 mt-1">
                Selger kan holde tilbake bilen inntil kjøper betaler. Dette
                forutsetter at bilen ikke allerede er overlevert. Dersom bilen
                er levert uten at betaling er mottatt, har selger mistet
                tilbakeholdsretten.
              </p>
            </div>
            <div className="border-l-2 border-emerald-500/40 pl-4">
              <p className="font-medium text-white">Stansingsrett</p>
              <p className="text-sm text-slate-400 mt-1">
                Dersom bilen er sendt men ikke mottatt av kjøper, kan selger
                stanse leveringen ved betalingsmislighold. Denne retten følger
                av kjøpsloven § 61 og forutsetter at selger handler raskt.
              </p>
            </div>
          </div>
          <p className="text-slate-300 mt-4">
            Disse virkemidlene er mindre inngripende enn heving og kan brukes
            som pressmiddel for å sikre betaling. Selger bør alltid vurdere om
            et mildere virkemiddel er tilstrekkelig før han hever bilkjøpet.
          </p>
        </div>
      </section>

      {/* Antesipert mislighold */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Heving før bilen er levert (antesipert mislighold)
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Etter kjøpsloven § 62 kan selger heve bilkjøpet allerede før
            betalingsfristen har gått ut, dersom det er klart at kjøper kommer
            til å misligholde vesentlig. Dette kalles antesipert mislighold og
            er et unntak fra hovedregelen om at misligholdet må ha inntruffet.
          </p>
          <p className="text-slate-300">
            Typiske situasjoner der antesipert mislighold er aktuelt:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • Kjøper erklærer uttrykkelig at han ikke vil betale eller fullføre
              kjøpet
            </li>
            <li>
              • Det fremgår av kjøpers handlemåte at betaling ikke vil skje –
              for eksempel at kjøper har forsøkt å videreselge bilen før betaling
            </li>
            <li>
              • Kjøper er gått konkurs, det er åpnet gjeldsforhandling, eller
              det foreligger andre klare holdepunkter for betalingsudyktighet
            </li>
          </ul>
          <p className="text-slate-300">
            Selger bør likevel varsle kjøper og gi mulighet til å stille
            sikkerhet for betalingen, jf. kjøpsloven § 62 annet ledd. Unnlater
            selger dette, kan hevingen være uberettiget – og det kan gi kjøper
            grunnlag for erstatningskrav mot selger.
          </p>
        </div>
      </section>

      {/* Selgers frister */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Frister for selgers heving
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Også selger må handle innen rimelige tidsrammer. Selger mister
            hevingsretten dersom det tar urimelig lang tid før heving gjøres
            gjeldende etter at misligholdet er konstatert. Dette kalles
            passivitetstap.
          </p>
          <p className="text-slate-300">
            Praktisk betyr dette:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • Selger bør erklære heving så snart misligholdet er konstatert
              og tilleggsfristen er utløpt
            </li>
            <li>
              • Venter selger uker eller måneder etter at tilleggsfristen utløp,
              kan retten til å heve bilkjøpet gå tapt
            </li>
            <li>
              • Hevingserklæringen bør sendes skriftlig og inneholde en klar
              begrunnelse
            </li>
          </ul>
          <p className="text-slate-300">
            Les mer om frister generelt i vår guide om{" "}
            <Link
              href="/bilkjop/heving-tidsfrist"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              tidsfrist for heving av bilkjøp
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Konsekvenser av heving */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Konsekvenser når selger hever bilkjøpet
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Heving innebærer at avtalen faller bort og ytelsene skal
            tilbakeføres. Begge parter skal stilles som om bilkjøpet aldri
            fant sted:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • Kjøper leverer tilbake bilen i den stand den ble mottatt
            </li>
            <li>• Selger tilbakefører mottatt betaling</li>
            <li>
              • Selger kan kreve erstatning for dokumenterte tap som følge av
              kjøpers mislighold – for eksempel verdireduksjon, lagringskostnader
              eller tapt salg til annen kjøper
            </li>
            <li>
              • Selger kan kreve nyttevederlag for kjøpers bruk av bilen i
              perioden
            </li>
          </ul>
          <p className="text-slate-300">
            Hevingsoppgjøret bør avtales skriftlig. Dersom partene ikke blir
            enige, kan saken bringes inn for domstolene.
          </p>
        </div>
      </section>

      {/* Forskjell privat vs forhandler som selger */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Gjelder andre regler for forhandler enn privatperson?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Selgers hevingsrett følger av kjøpsloven ved privatsalg og
            forbrukerkjøpsloven ved forhandlersalg. Vilkårene for at selger kan
            heve bilkjøpet er i stor grad like uavhengig av om selger er
            privatperson eller forhandler:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • Det kreves vesentlig kontraktsbrudd fra kjøpers side i begge
              tilfeller
            </li>
            <li>
              • Selger bør gi tilleggsfrist uavhengig av om han er privat eller
              profesjonell
            </li>
            <li>
              • Selger må handle innen rimelig tid etter at misligholdet er
              konstatert
            </li>
          </ul>
          <p className="text-slate-300">
            Forskjellen ligger primært i kjøpers hevingsrett, som er sterkere
            ved forhandlerkjøp. Les mer om forskjellene i våre detaljerte guider
            om{" "}
            <Link
              href="/bilkjop/heving-privat"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              heving ved privatkjøp
            </Link>{" "}
            og{" "}
            <Link
              href="/bilkjop/heving-forhandler"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              heving hos forhandler
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Praktiske eksempler */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Praktiske eksempler</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <div className="space-y-4">
            <div className="border-l-2 border-emerald-500/40 pl-4">
              <p className="font-medium text-white">
                Eksempel 1: Kjøper betaler ikke etter tilleggsfrist
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Selger og kjøper avtaler kjøp av bil for 150 000 kr. Betaling
                skulle skje ved overlevering, men kjøper dukker ikke opp.
                Selger gir en tilleggsfrist på 14 dager. Fristen utløper uten
                at kjøper betaler eller tar kontakt. Selger har nå godt
                grunnlag for å heve bilkjøpet og eventuelt kreve erstatning
                for dokumenterte tap.
              </p>
            </div>
            <div className="border-l-2 border-emerald-500/40 pl-4">
              <p className="font-medium text-white">
                Eksempel 2: Kjøper erklærer at han ikke vil betale
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Kjøper sender melding om at han har ombestemt seg og ikke
                vil gjennomføre kjøpet, selv om kontrakt er signert. Her
                foreligger antesipert mislighold. Selger bør likevel varsle
                kjøper formelt om at heving vil bli gjort gjeldende dersom
                kjøper ikke stiller sikkerhet eller bekrefter at kjøpet
                gjennomføres.
              </p>
            </div>
            <div className="border-l-2 border-red-500/40 pl-4">
              <p className="font-medium text-white">
                Eksempel 3: Selger venter for lenge
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Kjøper betaler ikke til avtalt tid. Selger gir tilleggsfrist
                som utløper i mars, men erklærer først heving i august – fem
                måneder senere. I mellomtiden har kjøper brukt bilen daglig.
                Selgers passivitet kan medføre at hevingsretten er tapt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kort oppsummert */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Kort oppsummert</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • Selger kan heve bilkjøpet ved vesentlig kontraktsbrudd fra
              kjøpers side
            </li>
            <li>
              • Betalingsmislighold er den vanligste hevingsgrunnen for selger
            </li>
            <li>
              • Selger bør gi tilleggsfrist før heving erklæres
            </li>
            <li>
              • Tilbakeholdsrett og stansingsrett kan brukes som mildere
              virkemidler
            </li>
            <li>
              • Heving kan skje før levering ved antesipert mislighold
            </li>
            <li>
              • Selger mister hevingsretten ved passivitet – handle raskt
            </li>
            <li>
              • Selger kan kreve erstatning for tap som følge av kjøpers
              mislighold
            </li>
          </ul>
          <p className="text-slate-300 mt-4">
            Lurer du på om du som kjøper kan heve? Les vår{" "}
            <Link
              href="/bilkjop/heving"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              hovedguide til heving av bilkjøp
            </Link>
            . Se også{" "}
            <Link
              href="/bilkjop/heving-tidsfrist"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              tidsfrist for heving
            </Link>{" "}
            for oversikt over frister som gjelder.
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
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
            Sjekk saken din — 99 kr
            <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <p className="text-xs text-slate-600 mt-4">
            Tar ca. 2 minutter · Ingen registrering
          </p>
        </div>
      </section>

      <p className="text-xs text-slate-500 text-center mt-8">
        Basert på kjøpsloven og forbrukerkjøpsloven. Innholdet er generell
        juridisk informasjon og ikke individuell rådgivning.
      </p>
    </BilSeoHero>
  );
}
