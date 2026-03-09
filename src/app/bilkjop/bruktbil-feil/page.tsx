import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

const faqs = [
  {
    q: "Hva regnes som en mangel ved bruktbil?",
    a: "En mangel foreligger når bilen avviker fra det som er avtalt, når selger har gitt uriktige opplysninger, holdt tilbake vesentlig informasjon, eller når bilen er i vesentlig dårligere stand enn du hadde grunn til å forvente ut fra pris, alder og kilometerstand.",
  },
  {
    q: "Kan jeg reklamere på feil selv om bilen er solgt «som den er»?",
    a: "Ja. «Som den er»-forbehold fritar ikke selger fra ansvar for tilbakeholdte opplysninger, uriktige opplysninger eller vesentlige avvik fra forventet stand. Både kjøpsloven § 19 og forbrukerkjøpsloven § 17 regulerer dette.",
  },
  {
    q: "Hvor lang tid har jeg på å reklamere på feil?",
    a: "Ved kjøp fra forhandler har du inntil 5 år. Ved privatkjøp er fristen 2 år. I begge tilfeller må du reklamere «innen rimelig tid» etter at du oppdaget eller burde oppdaget feilen — normalt 2–3 måneder.",
  },
  {
    q: "Hva er forskjellen på prisavslag og heving?",
    a: "Prisavslag betyr at du beholder bilen men får kompensasjon for verdireduksjonen feilen medfører. Heving betyr at kjøpet reverseres — du leverer bilen tilbake og får kjøpesummen igjen. Heving krever at mangelen er vesentlig.",
  },
  {
    q: "Kan jeg kreve heving hvis bilen har flere små feil?",
    a: "Ja. Flere mindre feil kan samlet sett utgjøre en vesentlig mangel som gir grunnlag for heving, selv om ingen av feilene alene ville vært tilstrekkelig. Dette følger av rettspraksis og kalles kumulative mangler.",
  },
  {
    q: "Må jeg ha verkstedrapport for å reklamere?",
    a: "Nei, du trenger ikke verkstedrapport for å reklamere. Reklamer så snart du oppdager feilen, og innhent dokumentasjon etterpå. En verkstedrapport styrker imidlertid saken din betydelig.",
  },
];

export const metadata: Metadata = {
  description:
    "Feil på bruktbilen? Legg inn saken og last opp dokumenter — AI vurderer om du har krav og lager rapport + kravbrev for 99 kr.",
};

export default function BruktbilFeilPage() {
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
        name: "Feil på bruktbil",
        item: "https://harjegkravpå.no/bilkjop/bruktbil-feil",
      },
    ],
  };

  return (
    <BilSeoHero
      eyebrow="Forbrukerrettigheter"
      h1Top="Kjøpt bil med feil?"
      h1Accent="Sjekk om du har krav."
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Har du kjøpt bruktbil og oppdaget feil etter kjøpet? Enten du har
          kjøpt <strong className="text-white">bruktbil privat</strong> eller
          fra forhandler, kan du ha rettigheter dersom bilen har skjulte mangler,
          feilopplysninger eller er i vesentlig dårligere stand enn forventet.
          Her forklarer vi hva som regnes som en mangel, hvilke krav du kan
          stille, og hvordan du går frem.
        </p>
      }
      heroImageAlt="Kjøpt bil med feil – sjekk dine rettigheter ved mangel på bruktbil"
      primaryCtaTitle="Har du krav etter bilkjøpet?"
      primaryCtaText="Svar på noen spørsmål og få en veiledende vurdering av om du kan kreve prisavslag, retting eller heving."
      primaryCtaButton="Sjekk om du har krav"
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
        kjøpsloven, forbrukerkjøpsloven og relevant nemndpraksis
      </p>

      {/* Hva regnes som en mangel */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Hva regnes som en mangel ved bruktbil?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            En bruktbil har en mangel dersom den avviker fra det som er avtalt
            mellom kjøper og selger, eller ikke svarer til det kjøper med
            rimelighet kunne forvente ut fra bilens alder, kilometerstand og
            kjøpesum. Mangelbegrepet er sentralt i både kjøpsloven (privatkjøp)
            og forbrukerkjøpsloven (forhandlerkjøp).
          </p>
          <p className="text-slate-300">
            Det er viktig å skille mellom <em>feil</em> og <em>mangel</em>. En
            feil er et teknisk problem — for eksempel en ødelagt turbo. En mangel
            oppstår når feilen representerer et avvik fra det selger har opplyst,
            eller fra det du kunne forvente. Ikke alle feil er mangler, men
            mange feil på bruktbil vil oppfylle vilkårene.
          </p>
          <p className="text-slate-300">
            Loven definerer tre hovedtyper av mangler:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • <strong className="text-white">Uriktige opplysninger</strong> —
              Selger har gitt feil informasjon om bilens tilstand, historikk,
              kilometerstand, utstyr eller lignende (kjøpsloven § 18, fkjl. § 16)
            </li>
            <li>
              • <strong className="text-white">Tilbakeholdte opplysninger</strong>{" "}
              — Selger kjente til feil eller forhold ved bilen som burde vært
              opplyst, men unnlot å informere (kjøpsloven § 19, fkjl. § 16)
            </li>
            <li>
              • <strong className="text-white">Vesentlig dårligere stand</strong>{" "}
              — Bilen er i vesentlig dårligere stand enn det du med rimelighet
              hadde grunn til å forvente ut fra kjøpesum og øvrige forhold
            </li>
          </ul>
          <p className="text-slate-300">
            En helhetsvurdering avgjør om feilen utgjør en mangel. Momenter som
            vektlegges er bilens pris, alder, kilometerstand, hva selger
            opplyste, og hva kjøper med rimelighet kunne forvente.
          </p>
        </div>
      </section>

      {/* Vanlige feil på bruktbil */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Vanlige feil på bruktbil som kan utgjøre mangel
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Noen feiltyper går igjen i tvister om bruktbilkjøp. Her er de
            vanligste:
          </p>

          <div className="space-y-5">
            <div className="border-l-2 border-emerald-500/30 pl-4">
              <p className="font-medium text-white">Motor- og drivverkfeil</p>
              <p className="text-sm text-slate-400 mt-1">
                Turbohavari, motorstans, oljeforbruk, defekt EGR-ventil eller
                partikkelfilter. Alvorlige motorskader kort tid etter kjøp er
                blant de vanligste mangelgrunnlagene i Forbrukertilsynets og
                Forbrukertvistutvalgets praksis.
              </p>
            </div>
            <div className="border-l-2 border-emerald-500/30 pl-4">
              <p className="font-medium text-white">Girkasse og clutch</p>
              <p className="text-sm text-slate-400 mt-1">
                Rykninger, støy, feilkoder i automatgir. Girkassefeil kan koste
                20 000–80 000 kr å utbedre, og vil ofte oppfylle
                vesentlighetskravet for heving — særlig på biler i lavere
                prisklasser.
              </p>
            </div>
            <div className="border-l-2 border-emerald-500/30 pl-4">
              <p className="font-medium text-white">Rust og karosseriskader</p>
              <p className="text-sm text-slate-400 mt-1">
                Skjult rust i bærende konstruksjoner, lakkskader som dekker
                over korrosjon, eller uopplyste kollisjonsreparasjoner. Rust
                som truer bilens sikkerhet vil normalt utgjøre en mangel.
              </p>
            </div>
            <div className="border-l-2 border-emerald-500/30 pl-4">
              <p className="font-medium text-white">
                Kilometerstand og historikk
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Tilbakestilt kilometerstand er dokumentsvindel og gir alltid
                grunnlag for krav. Feil i servicehistorikk, skadehistorikk
                eller eierskifte kan også utgjøre mangler dersom du ble
                villedet.
              </p>
            </div>
            <div className="border-l-2 border-emerald-500/30 pl-4">
              <p className="font-medium text-white">Elektronikk og komfort</p>
              <p className="text-sm text-slate-400 mt-1">
                Feil i navigasjon, klimaanlegg, sentrallås, sensorer eller
                infotainment. Enkeltfeil er sjelden nok til heving, men
                gjentatte elektronikkproblemer kan samlet utgjøre en vesentlig
                mangel.
              </p>
            </div>
          </div>

          <p className="text-slate-300 mt-4">
            Les mer om hvilke feil som konkret kan gi grunnlag for krav i vår
            guide om{" "}
            <Link
              href="/bilkjop/reklamasjon"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              reklamasjon på bil
            </Link>
            .
          </p>
        </div>
      </section>

      {/* «Som den er» — hva betyr det? */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          «Som den er» — betyr det at du ikke har rettigheter?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Mange tror at «solgt som den er» betyr null rettigheter. Det stemmer
            ikke. Både kjøpsloven § 19 og forbrukerkjøpsloven § 17 begrenser
            virkningen av slike forbehold. Forbeholdet beskytter ikke selger
            dersom:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • Selger har gitt uriktige opplysninger som har innvirket på
              kjøpet
            </li>
            <li>
              • Selger har holdt tilbake opplysninger om forhold han kjente
              eller måtte kjenne til
            </li>
            <li>
              • Bilen er i vesentlig dårligere stand enn kjøper hadde grunn til
              å forvente
            </li>
          </ul>
          <p className="text-slate-300">
            Vesentlighetsvurderingen er konkret og helhetlig. En bruktbil til
            200 000 kr som trenger motor til 60 000 kr etter tre uker vil
            normalt anses å være i vesentlig dårligere stand enn forventet —
            uavhengig av «som den er»-forbehold.
          </p>
          <p className="text-slate-300">
            Reglene er litt forskjellige avhengig av om du kjøpte{" "}
            <Link
              href="/bilkjop/privat-kjop"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              bruktbil privat
            </Link>{" "}
            eller fra{" "}
            <Link
              href="/bilkjop/forhandler"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              forhandler
            </Link>
            . Ved forhandlerkjøp kan ikke selger avtale bort dine rettigheter
            etter forbrukerkjøpsloven.
          </p>
        </div>
      </section>

      {/* Dine krav ved feil på bruktbil */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Dine krav ved feil på bruktbil
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Dersom feilen utgjør en mangel, har du flere mulige krav. Hvilket
            krav som er mest hensiktsmessig avhenger av mangelens art og omfang:
          </p>

          <div className="space-y-5">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-1">1. Retting</p>
              <p className="text-sm text-slate-400">
                Selger reparerer feilen uten kostnad for deg. Selger har som
                hovedregel rett til å forsøke retting før du kan kreve andre
                beføyelser. Ved forhandlerkjøp har selger normalt to
                rettingsforsøk.
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-1">2. Prisavslag</p>
              <p className="text-sm text-slate-400">
                Du beholder bilen, men får kompensasjon for verdireduksjonen
                feilen medfører. Prisavslaget skal tilsvare forskjellen mellom
                bilens verdi med og uten mangel.
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-1">3. Heving</p>
              <p className="text-sm text-slate-400">
                Du leverer bilen tilbake og får kjøpesummen igjen. Krever at
                mangelen er vesentlig, og at selger ikke har klart å rette
                innen rimelig tid. Les mer om vilkår og fremgangsmåte i vår
                guide om{" "}
                <Link
                  href="/bilkjop/heving"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
                >
                  heving av bilkjøp
                </Link>
                .
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-1">4. Erstatning</p>
              <p className="text-sm text-slate-400">
                Dekning av økonomisk tap som følge av mangelen — for eksempel
                utgifter til leiebil, transport eller feildiagnostisering.
                Erstatning kan kreves i tillegg til de andre beføyelsene.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frister du må kjenne til */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Frister du må kjenne til
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Tidsfrister er avgjørende for om du kan gjøre mangelen gjeldende.
            Oversitter du fristen, taper du retten — uansett hvor alvorlig
            feilen er.
          </p>

          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-2 text-slate-400 font-medium">
                    Frist
                  </th>
                  <th className="text-left py-3 px-2 text-slate-400 font-medium">
                    Privatkjøp
                  </th>
                  <th className="text-left py-3 px-2 text-slate-400 font-medium">
                    Forhandlerkjøp
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-white/[0.06]">
                  <td className="py-3 px-2 font-medium text-white">
                    Absolutt frist
                  </td>
                  <td className="py-3 px-2">2 år</td>
                  <td className="py-3 px-2">5 år</td>
                </tr>
                <tr className="border-b border-white/[0.06]">
                  <td className="py-3 px-2 font-medium text-white">
                    Relativ frist
                  </td>
                  <td className="py-3 px-2">Rimelig tid (2–3 mnd)</td>
                  <td className="py-3 px-2">Rimelig tid (2–3 mnd)</td>
                </tr>
                <tr className="border-b border-white/[0.06]">
                  <td className="py-3 px-2 font-medium text-white">
                    Bevispresumpsjon
                  </td>
                  <td className="py-3 px-2">Gjelder ikke</td>
                  <td className="py-3 px-2">6 mnd etter levering</td>
                </tr>
              </tbody>
            </table>
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

      {/* Vanlige grunner til avslag */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Vanlige grunner til avslag — og hvorfor de ofte er feil
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Selgere avviser mange reklamasjoner med standardformuleringer. Disse
            er ikke nødvendigvis juridisk holdbare:
          </p>

          <div className="space-y-3">
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                «Feilen er normal slitasje»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Slitasjevurderingen må ses i sammenheng med bilens pris, alder
                og kilometerstand. En alvorlig feil kort tid etter kjøp vil
                sjelden være «normal slitasje» — selv på en eldre bil.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                «Bilen ble solgt som den er»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                «Som den er» fritar ikke selger fra ansvar for egne
                opplysningssvikt eller vesentlige avvik. Forbeholdet har
                begrenset rekkevidde etter loven.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                «Du burde ha oppdaget feilen på prøvekjøring»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Kjøpers undersøkelsesplikt er begrenset. Skjulte feil som ikke
                kan oppdages ved vanlig prøvekjøring eller visuell inspeksjon
                kan ikke holdes mot deg.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                «Du har kjørt for mange kilometer etter kjøpet»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Bruk etter kjøpet utelukker ikke krav. Det kan påvirke et
                eventuelt nyttevederlag ved heving, men er ikke grunnlag for å
                avvise reklamasjonen.
              </p>
            </div>
          </div>

          <p className="text-slate-300 mt-4">
            Har du fått avslag? Det betyr ikke at du ikke har en sak.{" "}
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

      {/* Slik går du frem */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Slik går du frem ved feil på bruktbil
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Oppdager du en feil etter kjøpet, bør du handle raskt og
            systematisk. Her er en steg-for-steg oversikt:
          </p>
          <ol className="text-slate-300 space-y-4 ml-4">
            <li>
              <strong className="text-white">1. Dokumenter feilen</strong>
              <p className="text-sm text-slate-400 mt-1">
                Ta bilder, noter symptomer, og oppbevar kvitteringer og
                kommunikasjon med selger. Ta vare på annonseteksten.
              </p>
            </li>
            <li>
              <strong className="text-white">2. Reklamer skriftlig</strong>
              <p className="text-sm text-slate-400 mt-1">
                Send en skriftlig{" "}
                <Link
                  href="/bilkjop/reklamasjon"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
                >
                  reklamasjon
                </Link>{" "}
                til selger så snart som mulig. Beskriv feilen og hold selger
                ansvarlig. Du trenger ikke kjenne årsaken — beskriv symptomene.
              </p>
            </li>
            <li>
              <strong className="text-white">3. Innhent verkstedvurdering</strong>
              <p className="text-sm text-slate-400 mt-1">
                En uavhengig verkstedrapport dokumenterer feilens art, omfang
                og estimert utbedringskostnad. Dette styrker saken din
                vesentlig.
              </p>
            </li>
            <li>
              <strong className="text-white">4. Vurder kravene dine</strong>
              <p className="text-sm text-slate-400 mt-1">
                Avhengig av feilens alvorlighetsgrad kan du kreve retting,
                prisavslag, heving eller erstatning. Ved alvorlige mangler kan
                du{" "}
                <Link
                  href="/bilkjop/heving"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
                >
                  kreve heving av bilkjøpet
                </Link>
                .
              </p>
            </li>
            <li>
              <strong className="text-white">5. Eskaleringsveien</strong>
              <p className="text-sm text-slate-400 mt-1">
                Hvis selger avviser kravet, kan du ta saken videre til
                Forbrukerrådet, Forbrukerklageutvalget eller forliksrådet
                avhengig av om det er et forbruker- eller privatkjøp.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* Privat vs forhandler */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Privat eller forhandler — hva betyr det for saken din?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Hvilke regler som gjelder avhenger av om du kjøpte bilen av en
            privatperson eller en forhandler. Her er de viktigste forskjellene:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-2">
                <Link
                  href="/bilkjop/privat-kjop"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
                >
                  Privatkjøp
                </Link>
              </p>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• Kjøpsloven gjelder</li>
                <li>• 2 års reklamasjonsfrist</li>
                <li>• Ingen bevispresumpsjon</li>
                <li>• «Som den er» har begrenset virkning</li>
                <li>• Tvist avgjøres i forliksrådet</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-2">
                <Link
                  href="/bilkjop/forhandler"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
                >
                  Forhandlerkjøp
                </Link>
              </p>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• Forbrukerkjøpsloven gjelder</li>
                <li>• 5 års reklamasjonsfrist</li>
                <li>• 6 mnd bevispresumpsjon</li>
                <li>• Kan ikke avtale bort rettigheter</li>
                <li>• Tvist til Forbrukerklageutvalget</li>
              </ul>
            </div>
          </div>
          <p className="text-slate-300">
            Uansett kjøpsform kan du ha krav dersom bilen har en mangel.
            Forskjellen ligger i bevisbyrden, fristene og hvilke instanser som
            behandler tvisten.
          </p>
        </div>
      </section>

      {/* Garanti vs reklamasjon */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Garanti og reklamasjon — ikke det samme
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Mange blander garanti og reklamasjon. Garantien er en frivillig
            ordning fra selger med egne vilkår og begrensninger.
            Reklamasjonsretten er lovfestet og gjelder uavhengig av om bilen har
            garanti.
          </p>
          <p className="text-slate-300">
            Får du avslag på en garantisak, kan du fortsatt ha rettigheter etter
            loven. Les mer om forskjellene i vår guide om{" "}
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

      {/* Intern linking */}
      <section className="mb-14">
        <h2 className="text-lg font-semibold text-slate-300 mb-3">
          Les også
        </h2>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link
            href="/bilkjop/heving"
            className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
          >
            Heving av bilkjøp
          </Link>
          <Link
            href="/bilkjop/reklamasjon"
            className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
          >
            Reklamasjon på bil
          </Link>
          <Link
            href="/bilkjop/skjulte-feil-bil"
            className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
          >
            Skjulte feil på bil
          </Link>
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
            Vil du sjekke om du har krav?
          </h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Svar på noen spørsmål om bilkjøpet ditt – få juridisk rapport og
            kravbrev til selger for 99 kr.
          </p>
          <Link
            href="/bilkjop"
            className="group inline-flex items-center gap-2 bg-emerald-500 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-400 transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Sjekk om du har krav
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
