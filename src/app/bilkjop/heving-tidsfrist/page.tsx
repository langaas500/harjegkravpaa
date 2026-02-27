import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

const faqs = [
  {
    q: "Hva betyr «innen rimelig tid»?",
    a: "Det finnes ingen fast definisjon, men 2–3 måneder etter at du oppdaget feilen regnes normalt som innenfor. Jo lengre tid som går, desto større risiko for at reklamasjonen anses for sen.",
  },
  {
    q: "Kan jeg heve etter 5 år?",
    a: "Ved forhandlerkjøp er den absolutte fristen 5 år. Du må likevel reklamere innen rimelig tid etter at feilen ble oppdaget. Etter 5 år er kravet foreldet uavhengig av når feilen viste seg.",
  },
  {
    q: "Begynner fristen å løpe fra kjøpsdato eller leveringsdato?",
    a: "Fristene begynner normalt å løpe fra det tidspunktet du overtok bilen (leveringstidspunktet), ikke fra kontraktsdato.",
  },
  {
    q: "Hva hvis jeg oppdager feilen lenge etter kjøpet?",
    a: "Du kan fortsatt reklamere dersom du er innenfor den absolutte fristen (2 eller 5 år) og reklamerer innen rimelig tid etter oppdagelsen. Skjulte feil som viser seg sent kan gi grunnlag for krav.",
  },
  {
    q: "Mister jeg retten til heving hvis jeg reklamerer for sent?",
    a: "Ja. For sen reklamasjon medfører at du taper retten til å gjøre mangelen gjeldende – uavhengig av hvor alvorlig feilen er.",
  },
  {
    q: "Gjelder andre frister for erstatningskrav?",
    a: "Erstatningskrav følger de alminnelige foreldelsesreglene i foreldelsesloven, med en hovedregel på 3 år fra du fikk eller burde fått kjennskap til kravet.",
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
      name: "Tidsfrist for heving",
      item: "https://harjegkravpå.no/bilkjop/heving-tidsfrist",
    },
  ],
};

export default function HevingTidsfristPage() {
  return (
    <BilSeoHero
      eyebrow="Forbrukerrettigheter"
      h1Top="Tidsfrist for å heve"
      h1Accent="bilkjøpet"
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Du har ikke ubegrenset tid til å heve et bilkjøp. Fristene avhenger
          av om du kjøpte bilen privat eller fra forhandler, og når du oppdaget
          feilen. Tidsfrist heving bil er et av de vanligste temaene vi får
          spørsmål om – og en av de vanligste grunnene til at ellers
          berettigede krav tapes.
        </p>
      }
      heroImageAlt="Tidsfrist for å heve bilkjøp – reklamasjonsfrist og absolutte frister"
      primaryCtaTitle="Usikker på om du er innenfor fristen?"
      primaryCtaText="Svar på noen spørsmål om bilkjøpet ditt og få en veiledende vurdering av om du fortsatt kan gjøre krav gjeldende."
      primaryCtaButton="Sjekk fristen din"
      secondaryCtaText="Sjekk saken din nå →"
    >
      <p className="text-xs text-slate-500 mb-10">
        Sist oppdatert: Februar 2026
      </p>

      {/* To typer frister */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          To frister du må holde deg innenfor
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            For å heve et bilkjøp må du overholde to separate frister. Bryter
            du én av dem, taper du retten til å gjøre mangelen gjeldende –
            uavhengig av hvor berettiget kravet ellers er. Begge fristene er
            absolutte i den forstand at de ikke kan «gjenopprettes» dersom de
            er oversittet.
          </p>
          <div className="space-y-3 mt-2">
            <div className="border-l-2 border-emerald-500/40 pl-4">
              <p className="font-medium text-white">
                Relativ reklamasjonsfrist
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Du må reklamere «innen rimelig tid» etter at du oppdaget eller
                burde oppdaget mangelen. Denne fristen løper fra
                oppdagelsestidspunktet og gjelder uavhengig av den absolutte
                fristen. I praksis bør du reklamere så raskt som mulig – helst
                innen noen uker.
              </p>
            </div>
            <div className="border-l-2 border-emerald-500/40 pl-4">
              <p className="font-medium text-white">
                Absolutt reklamasjonsfrist
              </p>
              <p className="text-sm text-slate-400 mt-1">
                En ytre ramme som setter en endelig grense for når du kan
                reklamere, uavhengig av når feilen ble oppdaget. Denne fristen
                løper fra overtakelsestidspunktet og er forskjellig avhengig av
                om du kjøpte privat eller fra forhandler.
              </p>
            </div>
          </div>
          <p className="text-slate-300 mt-4">
            Begge fristene må være oppfylt for at du skal kunne heve bilkjøpet.
            Du finner en grundig gjennomgang av hevingsvilkårene i vår{" "}
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

      {/* 2 år vs 5 år */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          2 år ved privatkjøp – 5 år ved forhandlerkjøp
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Den absolutte reklamasjonsfristen varierer med hvem du kjøpte bilen
            av. Forskjellen er betydelig og kan være avgjørende for om du
            fortsatt har mulighet til å heve bilkjøpet:
          </p>
          <div className="space-y-3 mt-2">
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                Privatkjøp: 2 år (kjøpsloven § 32)
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Ved kjøp mellom privatpersoner er den absolutte fristen 2 år
                fra overtakelse. Selger kan ikke avtale en kortere frist. Etter
                2 år er kravet foreldet uavhengig av feilens art. Les mer om{" "}
                <Link
                  href="/bilkjop/heving-privat"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
                >
                  heving ved privatkjøp
                </Link>
                .
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                Forhandlerkjøp: 5 år (forbrukerkjøpsloven § 27)
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Dersom tingen er ment å vare vesentlig lenger enn 2 år – noe
                biler normalt er – gjelder en absolutt frist på 5 år.
                Forhandler kan ikke avtale denne bort. Les mer om{" "}
                <Link
                  href="/bilkjop/heving-forhandler"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
                >
                  heving hos forhandler
                </Link>
                .
              </p>
            </div>
          </div>
          <p className="text-slate-300 mt-4">
            Merk at den absolutte fristen alene ikke er nok. Du må også ha
            reklamert innen rimelig tid etter at du oppdaget mangelen. Begge
            betingelsene må være oppfylt.
          </p>
        </div>
      </section>

      {/* Innen rimelig tid */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Hva betyr «innen rimelig tid»?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Verken kjøpsloven eller forbrukerkjøpsloven fastsetter et eksakt
            antall dager. Høyesterett har uttalt at 2 måneder normalt er
            innenfor ved forbrukerkjøp (Rt-2013-865). Ved privatkjøp er
            vurderingen strengere – her bør du reklamere enda raskere.
          </p>
          <p className="text-slate-300">
            Momenter som påvirker vurderingen av «rimelig tid»:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • <strong className="text-white">Feilens art:</strong> Noen feil
              krever undersøkelse før du kan reklamere. En motorlyd som gradvis
              tiltar gir deg noe mer tid enn en åpenbar feil.
            </li>
            <li>
              • <strong className="text-white">Behov for avklaring:</strong> Om
              du trengte tid til å avklare omfanget av mangelen gjennom
              verkstedundersøkelse.
            </li>
            <li>
              • <strong className="text-white">Dialog med selger:</strong> Om du
              har vært i aktiv dialog med selger om feilen – dette kan tyde på
              at du ikke har «sovet» på kravet.
            </li>
            <li>
              • <strong className="text-white">Praktiske hindringer:</strong>{" "}
              Ferie, sykdom eller andre unnskyldelige grunner kan gi noe ekstra
              tid, men ikke ubegrenset.
            </li>
          </ul>
          <p className="text-slate-300">
            Hovedregelen er enkel: reklamer så raskt du kan etter at du oppdager
            feilen. Jo lenger du venter, desto større risiko for at
            reklamasjonen anses for sen – og da mister du retten til å heve
            bilkjøpet uansett feilens alvorlighet.
          </p>
        </div>
      </section>

      {/* Foreldelse */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Foreldelse – en tredje tidsfrist
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            I tillegg til de to reklamasjonsfristene finnes det en tredje
            tidsbegrensning: foreldelsesfristen etter foreldelsesloven.
            Foreldelsesfristen er på 3 år fra du «fikk eller burde fått»
            kjennskap til kravet.
          </p>
          <p className="text-slate-300">
            I praksis har foreldelsesfristen størst betydning i tilfeller der:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • Du reklamerte i tide, men det tok lang tid å få avklart saken
            </li>
            <li>
              • Du krever erstatning i tillegg til heving – erstatningskravet
              har en egen foreldelsesfrist
            </li>
            <li>
              • Saken har gått så lang tid at foreldelse uansett er aktuelt
            </li>
          </ul>
          <p className="text-slate-300">
            Foreldelsesfristen kan avbrytes ved å ta rettslige skritt – for
            eksempel ved å sende forliksklage. Dersom du har en pågående sak
            som har trukket ut i tid, bør du være oppmerksom på denne fristen.
          </p>
        </div>
      </section>

      {/* Når begynner fristen å løpe */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Når begynner fristene å løpe?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Starttidspunktet for fristene er forskjellig, og det er viktig å
            forstå forskjellen:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              <strong className="text-white">Absolutt frist:</strong> Løper fra
              overtakelsestidspunktet – det vil si dagen du faktisk mottok
              bilen, ikke datoen kontrakten ble signert. Dersom du hentet bilen
              to dager etter signering, er det hentedagen som gjelder.
            </li>
            <li>
              <strong className="text-white">Relativ frist:</strong> Løper fra
              det tidspunktet du oppdaget eller burde oppdaget mangelen. En
              skjult feil som først viser seg etter 18 måneder starter den
              relative fristen på dette tidspunktet – men du må fortsatt være
              innenfor den absolutte fristen.
            </li>
            <li>
              <strong className="text-white">Foreldelse:</strong> Løper fra du
              fikk eller burde fått kjennskap til mangelen og hvem som er
              ansvarlig.
            </li>
          </ul>
          <p className="text-slate-300">
            Et praktisk råd: noter datoen du oppdaget feilen, og reklamer
            skriftlig så snart som mulig. Dokumentasjon av oppdagelsestidspunktet
            kan bli avgjørende dersom selger bestrider at reklamasjonen var
            rettidig.
          </p>
        </div>
      </section>

      {/* Slik sikrer du deg */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Slik sikrer du at fristen overholdes
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Mange taper sitt krav fordi de venter for lenge med å reklamere.
            Her er konkrete tiltak du bør gjøre umiddelbart etter at du
            oppdager en feil:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • Send reklamasjon til selger innen noen dager – ikke vent til du
              har full oversikt over feilen
            </li>
            <li>
              • Reklamer skriftlig (e-post eller SMS) slik at du kan dokumentere
              tidspunktet
            </li>
            <li>
              • Du trenger ikke vite årsaken til feilen – beskriv symptomene
            </li>
            <li>
              • Innhent verkstedrapport så snart det lar seg gjøre – men ikke
              vent med reklamasjonen til rapporten foreligger
            </li>
            <li>
              • Hold selger løpende orientert dersom det tar tid å avklare
              feilen
            </li>
          </ul>
          <p className="text-slate-300">
            Husk at tidsfrist for heving av bilkjøp aldri kan «repareres»
            etter at den er utløpt. Har du først forsinket reklamasjonen, hjelper
            det ikke at feilen er aldri så alvorlig.
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
                Eksempel 1: Feil oppdaget etter 3 uker – forhandlerkjøp
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Du kjøper bil fra forhandler og oppdager motorproblemer etter 3
                uker. Du reklamerer etter 5 dager. Begge frister er overholdt:
                godt innenfor 5-årsfristen og reklamert innen rimelig tid.
                Feil innen 6 måneder har dessuten bevispresumpsjon i din favør
                etter forbrukerkjøpsloven. Les mer om{" "}
                <Link
                  href="/bilkjop/heving-forhandler"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
                >
                  heving hos forhandler
                </Link>
                .
              </p>
            </div>
            <div className="border-l-2 border-emerald-500/40 pl-4">
              <p className="font-medium text-white">
                Eksempel 2: Feil oppdaget etter 1,5 år – privatkjøp
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Du kjøper bil privat og oppdager rust i bærende konstruksjon
                etter 1,5 år. Du reklamerer etter 3 uker. Du er innenfor
                2-årsfristen og har reklamert innen rimelig tid etter
                oppdagelsen. Men du må selv sannsynliggjøre at feilen forelå
                ved kjøpet – les mer om{" "}
                <Link
                  href="/bilkjop/heving-privat"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
                >
                  heving ved privatkjøp
                </Link>
                .
              </p>
            </div>
            <div className="border-l-2 border-red-500/40 pl-4">
              <p className="font-medium text-white">
                Eksempel 3: For sen reklamasjon
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Du oppdager en feil i juni, men reklamerer først i desember.
                Selv om du er innenfor den absolutte fristen, er 6 måneder
                normalt for lang tid. Selger kan avvise kravet som for sent
                fremsatt, og du mister retten til å heve bilkjøpet – uansett
                hvor alvorlig feilen er.
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
              • Du må overholde både den relative og den absolutte fristen
            </li>
            <li>• Privatkjøp: 2 års absolutt frist fra overtakelse</li>
            <li>• Forhandlerkjøp: 5 års absolutt frist fra overtakelse</li>
            <li>
              • Reklamer innen rimelig tid – normalt innen 2–3 måneder etter
              oppdagelse
            </li>
            <li>
              • Fristene løper fra overtakelse (absolutt) og oppdagelse
              (relativ)
            </li>
            <li>
              • For sen reklamasjon = tapt krav, uansett feilens alvorlighet
            </li>
            <li>
              • Foreldelsesfristen på 3 år kan også komme inn som en ekstra
              begrensning
            </li>
          </ul>
          <p className="text-slate-300 mt-4">
            For å forstå de øvrige vilkårene for{" "}
            <Link
              href="/bilkjop/heving"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              heving av bilkjøp
            </Link>
            , se vår hovedside. Usikker på om du kjøpte privat eller fra
            forhandler? Se forskjellene i guidene for{" "}
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
            Usikker på om fristen er utløpt?
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

      <p className="text-xs text-slate-500 text-center mt-8">
        Basert på kjøpsloven og forbrukerkjøpsloven. Innholdet er generell
        juridisk informasjon og ikke individuell rådgivning.
      </p>
    </BilSeoHero>
  );
}
