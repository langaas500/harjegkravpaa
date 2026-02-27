import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

const faqs = [
  {
    q: "Hvor lenge kan jeg reklamere på bil kjøpt av forhandler?",
    a: "Den absolutte reklamasjonsfristen er 5 år fra levering for feil som kan vare over tid (forbrukerkjøpsloven § 27). Du må også reklamere «innen rimelig tid» etter at du oppdaget feilen — normalt 2–3 måneder.",
  },
  {
    q: "Hva betyr seks måneders-regelen (bevispresumpsjon)?",
    a: "Feil som viser seg innen 6 måneder etter levering presumeres å ha eksistert ved leveringstidspunktet. Det er forhandler som må bevise at feilen oppstod etter levering — ikke du som må bevise at den fantes fra før.",
  },
  {
    q: "Hvor mange ganger kan forhandler forsøke å rette feilen?",
    a: "Forhandler har som hovedregel rett til to rettingsforsøk for samme mangel. Dersom retting mislykkes etter to forsøk, kan du kreve prisavslag eller heving.",
  },
  {
    q: "Kan forhandler nekte heving og bare tilby prisavslag?",
    a: "Forhandler kan ikke fritt velge å tilby prisavslag fremfor heving dersom vilkårene for heving er oppfylt. Men heving krever at mangelen er «ikke uvesentlig» — altså av en viss alvorlighetsgrad.",
  },
  {
    q: "Kan forhandler avtale bort mine rettigheter?",
    a: "Nei. Forbrukerkjøpsloven er ufravikelig ved forbrukerkjøp. Kontraktsvilkår som gir deg dårligere rettigheter enn loven er ugyldige — uansett hva kontrakten sier.",
  },
  {
    q: "Hva gjør jeg hvis forhandler avviser reklamasjonen?",
    a: "Et avslag er forhandlers vurdering, ikke en juridisk avgjørelse. Du kan ta saken til Forbrukerklageutvalget (gratis) eller Forbrukerrådet for mekling. Du kan også bruke vår tjeneste for å få en veiledende vurdering.",
  },
];

export const metadata: Metadata = {
  description:
    "Kjøpte du bil fra forhandler? Les om dine rettigheter etter forbrukerkjøpsloven – reklamasjon, heving og hva du kan kreve. Sjekk saken din gratis.",
};

export default function ForhandlerPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const breadcrumbSchema = {
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
        name: "Kjøpt bil av forhandler",
        item: "https://harjegkravpå.no/bilkjop/forhandler",
      },
    ],
  };

  return (
    <BilSeoHero
      eyebrow="Forbrukerrettigheter"
      h1Top="Kjøpt bil av forhandler?"
      h1Accent="Sjekk hvilke rettigheter du har."
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Forbrukerkjøpsloven gir deg sterkere vern enn ved privatkjøp — med
          lengre frister, bevispresumpsjon og rettigheter som ikke kan avtales
          bort. Men du må likevel dokumentere mangelen og reklamere i tide.
          Her forklarer vi hva loven gir deg, hva forhandler plikter, og
          hvordan du går frem.
        </p>
      }
      heroImageAlt="Kjøpt bil av forhandler – dine rettigheter etter forbrukerkjøpsloven"
      primaryCtaTitle="Usikker på hva du kan kreve?"
      primaryCtaText="Om du har et krav avhenger av feilen, hva som ble avtalt, og hvordan forhandler har håndtert saken. Det krever en konkret vurdering."
      primaryCtaButton="Sjekk saken din"
      secondaryCtaText="Sjekk saken din nå →"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <p className="text-sm text-slate-500 mb-10">
        Sist oppdatert: Februar 2026 · Innholdet er utarbeidet med grunnlag i
        forbrukerkjøpsloven og relevant nemndpraksis
      </p>

      {/* Forbrukerkjøpsloven */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Forbrukerkjøpsloven — ditt sterkeste vern
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Når du kjøper bil fra en forhandler (næringsdrivende), gjelder
            forbrukerkjøpsloven. Denne loven gir deg et vesentlig sterkere
            vern enn kjøpsloven som gjelder ved{" "}
            <Link
              href="/bilkjop/privat-kjop"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              privatkjøp
            </Link>
            .
          </p>
          <p className="text-slate-300">
            Forbrukerkjøpsloven er <em>ufravikelig</em> — det betyr at
            forhandler ikke kan avtale bort dine rettigheter gjennom
            kontraktsvilkår, småskrift eller muntlige forbehold. Vilkår som
            gir deg dårligere rettigheter enn loven er automatisk ugyldige.
          </p>
          <p className="text-slate-300">
            De viktigste fordelene ved forhandlerkjøp:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • <strong className="text-white">5 års reklamasjonsfrist</strong>{" "}
              for feil som kan vare over tid
            </li>
            <li>
              • <strong className="text-white">Bevispresumpsjon</strong> — feil
              innen 6 måneder antas å ha eksistert ved levering
            </li>
            <li>
              • <strong className="text-white">Ufravikelig</strong> — kan ikke
              avtales bort gjennom kontrakt
            </li>
            <li>
              • <strong className="text-white">Rettingsforsøk</strong> — maks
              to forsøk for samme feil
            </li>
            <li>
              • <strong className="text-white">
                Lavere hevingsterskel
              </strong>{" "}
              — mangelen trenger bare være «ikke uvesentlig»
            </li>
          </ul>
        </div>
      </section>

      {/* 5 års reklamasjonsfrist */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          5 års reklamasjonsfrist — hva betyr det i praksis?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Forbrukerkjøpsloven § 27 gir deg 5 års absolutt
            reklamasjonsfrist for mangler ved ting som «ved vanlig bruk er ment
            å vare vesentlig lengre enn to år». Biler faller klart inn under
            dette.
          </p>
          <p className="text-slate-300">
            Men den absolutte fristen er ikke den eneste du må overholde:
          </p>
          <div className="space-y-5">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-1">
                Absolutt frist: 5 år fra levering
              </p>
              <p className="text-sm text-slate-400">
                Du kan ikke reklamere senere enn 5 år etter at du overtok
                bilen. Etter dette er kravet foreldet — uavhengig av når
                feilen ble oppdaget.
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-1">
                Relativ frist: «innen rimelig tid»
              </p>
              <p className="text-sm text-slate-400">
                Du må også reklamere innen rimelig tid etter at du oppdaget
                eller burde oppdaget feilen — normalt 2–3 måneder. Reklamer så
                snart du kan.
              </p>
            </div>
          </div>
          <p className="text-slate-300">
            Les mer om alle frister, unntak og foreldelse i vår guide om{" "}
            <Link
              href="/bilkjop/heving-tidsfrist"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              tidsfrister ved heving av bilkjøp
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Bevispresumpsjon */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Bevispresumpsjon — de første 6 månedene
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Forbrukerkjøpsloven § 18 annet ledd inneholder en viktig
            bevispresumpsjon: dersom en feil viser seg innen 6 måneder etter
            levering, antas den å ha eksistert ved leveringstidspunktet. Det er
            da forhandler som må bevise at feilen oppstod etter levering —
            ikke du som må bevise at den fantes fra før.
          </p>
          <p className="text-slate-300">
            Denne regelen snur bevisbyrden i din favør og gjør det vesentlig
            enklere å vinne frem med krav i den tidlige perioden etter kjøpet.
            Etter 6 måneder er det du som har bevisbyrden, men du har fortsatt
            rettigheter — forutsatt at du kan sannsynliggjøre at feilen
            forelå ved levering.
          </p>
          <p className="text-slate-300">
            Bevispresumsjonen gjelder ikke dersom den er uforenlig med
            feilens art — for eksempel riper påført av kjøper etter levering.
            Men for mekaniske feil, motorproblemer og girkassefeil vil
            presumsjonen normalt gjelde.
          </p>
        </div>
      </section>

      {/* Rettingsforsøk */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Rettingsforsøk — forhandlers rett og begrensning
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Forhandler har som utgangspunkt rett til å forsøke å rette
            mangelen før du kan kreve prisavslag eller heving. Men denne retten
            er ikke ubegrenset:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • Forhandler har normalt <strong className="text-white">
                maks to rettingsforsøk
              </strong>{" "}
              for samme mangel (forbrukerkjøpsloven § 30)
            </li>
            <li>
              • Retting skal skje <strong className="text-white">
                innen rimelig tid
              </strong>{" "}
              og uten vesentlig ulempe for deg
            </li>
            <li>
              • Du skal ikke ha <strong className="text-white">
                kostnader
              </strong>{" "}
              knyttet til rettingen
            </li>
            <li>
              • Dersom retting{" "}
              <strong className="text-white">mislykkes</strong> eller
              forhandler{" "}
              <strong className="text-white">ikke tilbyr retting</strong>{" "}
              innen rimelig tid, kan du kreve prisavslag eller heving
            </li>
          </ul>
          <p className="text-slate-300">
            Eksempel: Forhandler har forsøkt å rette en motorfeil to ganger.
            Feilen kommer tilbake. Da har forhandler brukt opp sine
            rettingsforsøk, og du kan kreve prisavslag eller heving —
            avhengig av mangelens alvor.
          </p>
        </div>
      </section>

      {/* Dine krav */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Hva kan du kreve ved feil på bil fra forhandler?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Forbrukerkjøpsloven gir deg flere mulige krav dersom bilen har en
            mangel:
          </p>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-1">Retting</p>
              <p className="text-sm text-slate-400">
                Forhandler utbedrer feilen uten kostnad for deg. Forhandler
                har rett til å forsøke retting først, men maks to ganger for
                samme feil.
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-1">Omlevering</p>
              <p className="text-sm text-slate-400">
                Du får en tilsvarende bil i stedet. Mest aktuelt ved nybil der
                tilsvarende bil er tilgjengelig. Sjelden aktuelt for bruktbil.
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-1">Prisavslag</p>
              <p className="text-sm text-slate-400">
                Du beholder bilen og får kompensasjon for verdireduksjonen
                mangelen medfører. Kan kreves dersom retting ikke lykkes.
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-1">Heving</p>
              <p className="text-sm text-slate-400">
                Du leverer bilen tilbake og får kjøpesummen igjen (eventuelt
                med fradrag for nytten). Krever at mangelen er «ikke
                uvesentlig». Les mer i vår guide om{" "}
                <Link
                  href="/bilkjop/heving-forhandler"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
                >
                  heving av forhandlerkjøp
                </Link>
                .
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-1">Erstatning</p>
              <p className="text-sm text-slate-400">
                Dekning av økonomisk tap som følge av mangelen — for eksempel
                leiebil, transport eller feildiagnostisering. Kan kreves i
                tillegg til andre krav.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vanlige grunner til avslag */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Vanlige grunner til at forhandler avviser kravet
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Et avslag fra forhandler er deres syn på saken — ikke en juridisk
            konklusjon. Her er de vanligste begrunnelsene og hvorfor de ofte
            ikke holder:
          </p>
          <div className="space-y-3">
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                «Feilen er normal slitasje»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Slitasjevurderingen må ses i sammenheng med bilens pris, alder
                og kilometerstand. En alvorlig feil kort tid etter kjøp er
                sjelden «normal slitasje» — selv på en bruktbil.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                «Du har reklamert for sent»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Hva som er «rimelig tid» varierer. Forhandlers påstand er ikke
                avgjørende — det er en konkret vurdering. Har du reklamert
                innen 2–3 måneder etter oppdagelse, er du normalt innenfor.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                «Vi har tilbudt reparasjon»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Forhandler har rett til å forsøke retting, men retten er
                begrenset til to forsøk. Etter to mislykkede forsøk kan du
                kreve andre beføyelser.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                «Bilen ble solgt som den er»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Ved forhandlerkjøp har «som den er»-forbehold begrenset
                virkning etter forbrukerkjøpsloven § 17. Forhandler kan ikke
                fraskrive seg ansvar gjennom kontraktsvilkår.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                «Du burde ha undersøkt bilen bedre»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Kjøpers undersøkelsesplikt er begrenset, og forhandler har en
                profesjonell opplysningsplikt. Skjulte feil kan ikke forventes
                oppdaget ved prøvekjøring.
              </p>
            </div>
          </div>
          <p className="text-slate-300 mt-4">
            Har du fått avslag?{" "}
            <Link
              href="/bilkjop"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              Få en vurdering av saken din her
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Hva gjør du når forhandler avviser */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Slik går du frem hvis forhandler avviser kravet
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <ol className="text-slate-300 space-y-4 ml-4">
            <li>
              <strong className="text-white">
                1. Send formell skriftlig reklamasjon
              </strong>
              <p className="text-sm text-slate-400 mt-1">
                Dersom du ikke allerede har gjort det, send en{" "}
                <Link
                  href="/bilkjop/reklamasjon"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
                >
                  formell reklamasjon
                </Link>{" "}
                med beskrivelse av feilen, lovhenvisning og ditt krav. Sett
                en svarfrist på 14 dager.
              </p>
            </li>
            <li>
              <strong className="text-white">
                2. Innhent uavhengig verkstedrapport
              </strong>
              <p className="text-sm text-slate-400 mt-1">
                En rapport fra et uavhengig verksted dokumenterer feilens art,
                omfang og sannsynlig tidspunkt for oppstandelse. Bruk et annet
                verksted enn forhandlerens eget.
              </p>
            </li>
            <li>
              <strong className="text-white">
                3. Kontakt Forbrukerrådet
              </strong>
              <p className="text-sm text-slate-400 mt-1">
                Forbrukerrådet kan mekle mellom deg og forhandler. Tjenesten
                er gratis. Mange saker løses her uten behov for videre
                rettslige skritt.
              </p>
            </li>
            <li>
              <strong className="text-white">
                4. Klag til Forbrukerklageutvalget
              </strong>
              <p className="text-sm text-slate-400 mt-1">
                Forbrukerklageutvalget (FKU) behandler tvister mellom
                forbrukere og næringsdrivende. Avgjørelsen har virkning som
                dom. Behandlingen er gratis.
              </p>
            </li>
            <li>
              <strong className="text-white">
                5. Domstolsbehandling
              </strong>
              <p className="text-sm text-slate-400 mt-1">
                Siste utvei. Saker under 250 000 kr behandles normalt i
                forliksrådet først. Vurder rettshjelpsforsikring gjennom din
                bilforsikring.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* Garanti og lovfestede rettigheter */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Garanti og lovfestede rettigheter
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Mange forhandlere tilbyr{" "}
            <Link
              href="/bilkjop/garanti"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              garanti
            </Link>{" "}
            i tillegg til lovens reklamasjonsrett. Det er viktig å forstå at
            garantien og reklamasjonsretten er to uavhengige spor:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • Garantien kan gi deg noe <em>ekstra</em> utover lovens
              minimumsrettigheter
            </li>
            <li>
              • Garantien kan <em>ikke</em> begrense lovens rettigheter —
              bare utvide dem
            </li>
            <li>
              • Et garantiavslag betyr ikke at du mangler rettigheter etter
              loven
            </li>
            <li>
              • Garantikrav om merkeverksted gjelder ikke for
              reklamasjonsretten
            </li>
          </ul>
          <p className="text-slate-300">
            Les mer om forskjellen i vår guide om{" "}
            <Link
              href="/bilkjop/garanti"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              garanti på bil
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Når kan du heve kjøpet */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Når kan du heve bilkjøpet fra forhandler?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Heving er det sterkeste kravet du kan fremme. Ved forhandlerkjøp
            har du rett til å heve dersom mangelen er «ikke uvesentlig» —
            dette er en lavere terskel enn «vesentlig» som kreves ved
            privatkjøp.
          </p>
          <p className="text-slate-300">
            Typiske situasjoner der heving kan være aktuelt:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>• Alvorlig motorfeil eller girkassehavari</li>
            <li>• Tilbakestilt eller manipulert kilometerstand</li>
            <li>• Skjulte kollisjonsreparasjoner som ikke ble opplyst</li>
            <li>• Gjentatte feil etter mislykkede rettingsforsøk</li>
            <li>• Omfattende rust i bærende konstruksjoner</li>
            <li>• Feil som gjør bilen trafikkfarlig</li>
          </ul>
          <p className="text-slate-300">
            Les vår fullstendige guide om{" "}
            <Link
              href="/bilkjop/heving-forhandler"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              heving av bilkjøp fra forhandler
            </Link>{" "}
            for en detaljert gjennomgang av vilkår, prosess og typiske utfall.
            For en generell oversikt, se vår hovedguide om{" "}
            <Link
              href="/bilkjop/heving"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              heving av bilkjøp
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
            Rettigheter må alltid vurderes konkret
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
