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
      name: "Heving hos forhandler",
      item: "https://harjegkravpå.no/bilkjop/heving-forhandler",
    },
  ],
};

export default function HevingForhandlerPage() {
  return (
    <BilSeoHero
      eyebrow="Forbrukerrettigheter"
      h1Top="Heving av bilkjøp"
      h1Accent="fra forhandler"
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Kjøpte du bil fra forhandler og oppdaget alvorlige feil?
          Forbrukerkjøpsloven gir deg et sterkt vern som ikke kan avtales bort.
          Heving av bilkjøp fra forhandler er mulig når mangelen ikke er
          uvesentlig og forhandler ikke har rettet feilen. Denne guiden
          forklarer dine rettigheter steg for steg.
        </p>
      }
      heroImageAlt="Heving av bilkjøp fra forhandler – dine rettigheter etter forbrukerkjøpsloven"
      primaryCtaTitle="Vil du sjekke om du kan heve?"
      primaryCtaText="Svar på noen spørsmål om bilkjøpet ditt og få en veiledende vurdering av om du har grunnlag for heving."
      primaryCtaButton="Sjekk saken din"
      secondaryCtaText="Sjekk saken din nå →"
    >
      <p className="text-xs text-slate-500 mb-10">
        Sist oppdatert: Februar 2026
      </p>

      {/* Forbrukerkjøpsloven */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Forbrukerkjøpsloven gir sterkere vern
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Når du kjøper bil av en næringsdrivende, gjelder forbrukerkjøpsloven.
            Loven kan ikke avtales bort, og gir deg flere vesentlige fordeler
            sammenlignet med kjøpsloven som gjelder ved{" "}
            <Link
              href="/bilkjop/heving-privat"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              heving ved privatkjøp
            </Link>
            :
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • <strong className="text-white">5 års reklamasjonsfrist</strong>{" "}
              for feil som kan vare over tid – biler er typisk omfattet av
              denne regelen
            </li>
            <li>
              • <strong className="text-white">Bevispresumpsjon i 6 måneder:</strong>{" "}
              Feil som viser seg innen 6 måneder etter levering antas å ha
              eksistert ved overtakelsen. Forhandler må bevise det motsatte.
            </li>
            <li>
              • <strong className="text-white">Ingen ansvarsfraskrivelse:</strong>{" "}
              Forhandler kan ikke begrense sitt ansvar gjennom «som den
              er»-klausuler eller andre kontraktsvilkår
            </li>
            <li>
              • <strong className="text-white">Strengere opplysningsplikt:</strong>{" "}
              Forhandler har profesjonell kunnskap og forventes å opplyse om
              forhold ved bilen som en privatperson kanskje ikke kjenner til
            </li>
          </ul>
          <p className="text-slate-300">
            Disse reglene gjør at terskelen for å nå frem med et hevingskrav er
            lavere enn ved privatkjøp. For en fullstendig gjennomgang av alle
            vilkår, se vår{" "}
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

      {/* 6-måneders presumsjonen */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Bevispresumpsjon de første 6 månedene
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Etter forbrukerkjøpsloven § 18 annet ledd gjelder en presumsjon om
            at feil som viser seg innen 6 måneder etter levering, forelå ved
            overtakelsestidspunktet. Dette er en av de viktigste fordelene ved
            kjøp fra forhandler.
          </p>
          <p className="text-slate-300">
            I praksis betyr dette:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • Oppdager du en feil innen 6 måneder, trenger du ikke bevise at
              feilen fantes ved kjøpet – det antas
            </li>
            <li>
              • Det er forhandler som må sannsynliggjøre at feilen oppsto etter
              levering dersom han vil avvise kravet
            </li>
            <li>
              • Presumsjonen gjelder ikke for feil som åpenbart skyldes en
              hendelse etter kjøpet (for eksempel kollisjon)
            </li>
          </ul>
          <p className="text-slate-300">
            Etter 6 måneder snus bevisbyrden. Da må du som kjøper sannsynliggjøre
            at feilen forelå ved levering, slik det også er ved{" "}
            <Link
              href="/bilkjop/heving-privat"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              heving ved privatkjøp
            </Link>
            . En verkstedrapport som uttaler seg om feilens alder kan være
            avgjørende bevis.
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
            retting før du kan kreve heving av bilkjøpet. Men denne retten har
            klare begrensninger:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • Retting må skje innen rimelig tid og uten vesentlig ulempe for
              deg
            </li>
            <li>
              • Forhandler har normalt to forsøk på å rette samme feil
            </li>
            <li>• Rettingen må faktisk løse problemet fullstendig</li>
            <li>• Du skal ikke ha kostnader i forbindelse med rettingen</li>
            <li>
              • Forhandler skal stille lånebil eller dekke alternativ transport
              dersom rettingen tar tid
            </li>
          </ul>
          <p className="text-slate-300">
            Dersom forhandler ikke retter innen rimelig tid, rettingen mislykkes,
            eller den medfører vesentlig ulempe for deg, er rettingsretten
            uttømt. Da åpner det for å heve bilkjøpet eller kreve prisavslag.
          </p>
          <p className="text-slate-300">
            Dokumenter alltid kommunikasjonen med forhandler under
            rettingsprosessen. Ta bilder av bilen før og etter verkstedbesøk,
            og noter datoer for innlevering og utlevering.
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
            «uvesentlig». Merk at dette er en lavere terskel enn ved
            privatkjøp, der kravet er at mangelen må være «vesentlig» (en
            høyere barre). Praktisk betyr det at de fleste feil av en viss
            økonomisk betydning kan gi grunnlag for heving hos forhandler.
          </p>
          <p className="text-slate-300">
            Momenter i vurderingen:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • Feilens omfang sett opp mot kjøpesummen og bilens alder
            </li>
            <li>
              • Om feilen påvirker bilens sikkerhet, funksjonalitet eller
              trafikksikkerhet
            </li>
            <li>
              • Om forhandler har hatt mulighet til å rette, og om rettingen
              mislyktes
            </li>
            <li>
              • Om det foreligger brudd på opplysningsplikten – for eksempel
              tilbakeholdt informasjon om tidligere skade eller feil
            </li>
            <li>
              • Antall feil – flere mindre feil kan samlet utgjøre en mangel som
              ikke er uvesentlig
            </li>
          </ul>
          <p className="text-slate-300">
            Et illustrerende eksempel: En motorfeil på 40 000 kr på en bil til
            200 000 kr utgjør 20 % av kjøpesummen. Det vil normalt ikke anses
            som uvesentlig, særlig dersom forhandler har fått to rettingsforsøk
            uten å løse problemet. Flere feil som samlet utgjør en betydelig
            kostnad kan også oppfylle vilkåret.
          </p>
        </div>
      </section>

      {/* Prisavslag vs heving */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Prisavslag eller heving?</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Prisavslag og heving er begge misligholdssanksjoner du kan gjøre
            gjeldende overfor forhandler, men de har forskjellige vilkår og
            konsekvenser:
          </p>
          <div className="space-y-3 mt-2">
            <div className="border-l-2 border-emerald-500/40 pl-4">
              <p className="font-medium text-white">Prisavslag</p>
              <p className="text-sm text-slate-400 mt-1">
                Krever bare at det foreligger en mangel – ingen krav om
                vesentlighet. Du beholder bilen og får kompensasjon tilsvarende
                verdireduksjonen. Prisavslaget skal stille deg økonomisk som om
                du hadde fått en mangelfri bil.
              </p>
            </div>
            <div className="border-l-2 border-emerald-500/40 pl-4">
              <p className="font-medium text-white">Heving</p>
              <p className="text-sm text-slate-400 mt-1">
                Krever at mangelen ikke er uvesentlig. Du leverer bilen tilbake
                og får kjøpesummen refundert, eventuelt med fradrag for
                nyttevederlag. Heving er mer inngripende og brukes når mangelen
                er for alvorlig til at prisavslag gir et rimelig resultat.
              </p>
            </div>
          </div>
          <p className="text-slate-300 mt-4">
            Forhandler vil ofte argumentere for prisavslag fremfor heving.
            Dersom mangelen er alvorlig nok, har du rett til å velge{" "}
            <Link
              href="/bilkjop/heving"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              heving av bilkjøp
            </Link>{" "}
            selv om forhandler tilbyr prisavslag. Vurderingen er konkret, og det
            avgjørende er om prisavslaget gir deg tilstrekkelig kompensasjon.
          </p>
        </div>
      </section>

      {/* Garanti vs lovfestede rettigheter */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Garanti og lovfestede rettigheter
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Mange forhandlere tilbyr garanti på bruktbiler. Det er viktig å
            forstå forskjellen mellom garanti og dine lovfestede rettigheter
            etter forbrukerkjøpsloven:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • En garanti kan gi deg rettigheter utover loven, men kan aldri
              begrense rettighetene du allerede har
            </li>
            <li>
              • At garantien har utløpt betyr ikke at du mister
              reklamasjonsretten – den gjelder i 5 år uavhengig av garantien
            </li>
            <li>
              • Garantivilkår som krever at du bruker forhandlers eget verksted
              begrenser ikke retten til å reklamere etter loven
            </li>
            <li>
              • «Ingen garanti» på kontrakten har ingen rettslig betydning – du
              har de samme rettighetene uansett
            </li>
          </ul>
          <p className="text-slate-300">
            Dersom forhandler avviser reklamasjonen din med henvisning til
            garantivilkår, har du fortsatt rett til å gjøre krav gjeldende etter
            forbrukerkjøpsloven. Les mer om{" "}
            <Link
              href="/bilkjop/heving-tidsfrist"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              tidsfrist for heving av bilkjøp
            </Link>{" "}
            for å forstå fristene som gjelder.
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
                Eksempel 1: Motorproblem innen 6 måneder
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Du kjøper en bruktbil fra forhandler for 250 000 kr. Etter fire
                måneder oppstår motorproblemer. Verkstedet fastslår at feilen
                skyldes slitasje som har utviklet seg over tid. Forhandler
                forsøker reparasjon to ganger uten å løse problemet. Her taler
                flere momenter for heving: feilen viste seg innen 6 måneder
                (bevispresumpsjonen gjelder), forhandler har fått to
                rettingsforsøk uten å lykkes, og feilen er ikke uvesentlig sett
                opp mot kjøpesummen.
              </p>
            </div>
            <div className="border-l-2 border-emerald-500/40 pl-4">
              <p className="font-medium text-white">
                Eksempel 2: Skjult rustskade
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Du kjøper en SUV for 320 000 kr. Etter 14 måneder oppdager et
                uavhengig verksted omfattende rust i bærende konstruksjon som er
                lakkert over. Reparasjonskostnad: 80 000 kr. Selv om 6-måneders
                presumsjonen er utløpt, har forhandler holdt tilbake
                informasjon. Rusten ble aktivt skjult (overlakkert), noe som
                taler sterkt for at du kan heve bilkjøpet.
              </p>
            </div>
            <div className="border-l-2 border-red-500/40 pl-4">
              <p className="font-medium text-white">
                Eksempel 3: Mindre feil med rimelig tilbud
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Du kjøper bil for 180 000 kr og oppdager at klimaanlegget ikke
                fungerer. Forhandler tilbyr å reparere på eget verksted, og
                rettingen lykkes. Her har forhandler utøvd sin rettingsrett, og
                feilen er utbedret. Grunnlag for heving foreligger normalt
                ikke.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hvis forhandler avviser */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Hva gjør du hvis forhandler avviser kravet?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Forhandler er ikke alltid enig i at det foreligger grunnlag for
            heving. Dersom kravet ditt avvises, har du flere muligheter:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • <strong className="text-white">Send formelt kravbrev:</strong>{" "}
              Et tydelig, skriftlig krav med juridisk begrunnelse og frist
              for tilbakemelding viser at du tar saken alvorlig
            </li>
            <li>
              • <strong className="text-white">Forbrukerrådet:</strong>{" "}
              Tilbyr gratis mekling i saker mellom forbrukere og
              næringsdrivende
            </li>
            <li>
              • <strong className="text-white">Forbrukertilsynet:</strong>{" "}
              Fører tilsyn med forbrukerkjøpsloven og kan veilede deg
            </li>
            <li>
              • <strong className="text-white">Forbrukertvistutvalget:</strong>{" "}
              Treffer bindende vedtak i forbrukersaker
            </li>
            <li>
              • <strong className="text-white">Domstolene:</strong>{" "}
              Siste utvei dersom andre kanaler ikke fører frem
            </li>
          </ul>
          <p className="text-slate-300">
            Du kan også vurdere om{" "}
            <Link
              href="/bilkjop/kan-selger-heve"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              selger har forsøkt å heve bilkjøpet
            </Link>{" "}
            på sin side – i så fall gjelder egne regler for selgers hevingsrett.
          </p>
        </div>
      </section>

      {/* Kort oppsummert */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Kort oppsummert</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • Forbrukerkjøpsloven gjelder ved heving hos forhandler – og kan
              ikke avtales bort
            </li>
            <li>
              • Forhandler har rett til å forsøke retting, men retten er
              begrenset til to forsøk og rimelig tid
            </li>
            <li>
              • Heving krever at mangelen ikke er uvesentlig – en lavere terskel
              enn ved privatkjøp
            </li>
            <li>
              • Feil innen 6 måneder antas å ha fantes ved levering
              (bevispresumpsjon)
            </li>
            <li>
              • Reklamasjonsfristen er 5 år fra overtakelse
            </li>
            <li>
              • Prisavslag er et alternativ med lavere terskel enn heving
            </li>
            <li>
              • Garanti kan ikke begrense dine lovfestede rettigheter
            </li>
            <li>
              • Flere mislykkede rettingsforsøk styrker et hevingskrav
            </li>
          </ul>
          <p className="text-slate-300 mt-4">
            For en fullstendig oversikt over alle vilkår, se vår{" "}
            <Link
              href="/bilkjop/heving"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              hovedguide til heving av bilkjøp
            </Link>
            . Kjøpte du bilen privat? Se{" "}
            <Link
              href="/bilkjop/heving-privat"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              heving ved privatkjøp
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
