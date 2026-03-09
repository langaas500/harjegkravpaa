import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

const faqs = [
  {
    q: "Hva betyr «innen rimelig tid»?",
    a: "Det finnes ingen fast definisjon, men 2–3 måneder etter at du oppdaget feilen regnes normalt som innenfor. Jo lengre du venter, desto større risiko for at reklamasjonen anses for sen. Reklamer alltid så snart du kan.",
  },
  {
    q: "Må jeg bruke ordet «reklamasjon» i meldingen?",
    a: "Nei. Det viktigste er at selger forstår at du mener det er en feil, og at du holder selger ansvarlig. Bruk gjerne ordet «reklamasjon» for tydelighet, men det er ikke et formkrav.",
  },
  {
    q: "Kan jeg reklamere muntlig?",
    a: "Ja, loven stiller ingen formkrav. Men muntlig reklamasjon er vanskelig å bevise i etterkant. Send alltid en skriftlig bekreftelse på SMS, e-post eller brev — også dersom du allerede har ringt selger.",
  },
  {
    q: "Må jeg ha verkstedrapport før jeg reklamerer?",
    a: "Nei. Reklamer først — innhent dokumentasjon etterpå. Venter du med å reklamere til verkstedrapporten er klar, risikerer du å oversitte fristen for «rimelig tid».",
  },
  {
    q: "Hva gjør jeg hvis selger ikke svarer på reklamasjonen?",
    a: "Send en påminnelse med ny frist. Dokumenter alle forsøk på kontakt. Manglende svar kan tale i din favør dersom saken tas videre til Forbrukerklageutvalget eller forliksrådet.",
  },
  {
    q: "Kan reklamasjon føre til heving av bilkjøpet?",
    a: "Ja. Reklamasjonen er første steg. Dersom mangelen viser seg å være vesentlig og retting mislykkes eller ikke tilbys, kan du kreve heving — altså å få kjøpesummen tilbake mot å levere bilen.",
  },
];

export const metadata: Metadata = {
  description:
    "Slik reklamerer du på bil. Legg inn saken din og last opp dokumenter — AI lager rapport + kravbrev til selger for 99 kr.",
};

export default function ReklamasjonPage() {
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
        name: "Reklamasjon på bil",
        item: "https://harjegkravpå.no/bilkjop/reklamasjon",
      },
    ],
  };

  return (
    <BilSeoHero
      eyebrow="Forbrukerrettigheter"
      h1Top="Hvordan reklamere på bil"
      h1Accent="Gjør det riktig fra starten."
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Har du oppdaget feil på bilen etter kjøpet? Da må du reklamere til
          selger. Reklamasjon er en forutsetning for å kunne kreve retting,
          prisavslag eller heving — og gjør du det feil, risikerer du å tape
          rettighetene dine. Her forklarer vi hva en reklamasjon er, hvilke
          frister som gjelder, og hvordan du skriver en reklamasjon som holder.
        </p>
      }
      heroImageAlt="Hvordan reklamere på bil – steg for steg guide"
      primaryCtaTitle="Usikker på om du har en sak?"
      primaryCtaText="Svar på noen spørsmål om ditt bilkjøp, så får du en vurdering av om du kan ha krav mot selger."
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
        kjøpsloven, forbrukerkjøpsloven og relevant nemndpraksis
      </p>

      {/* Hva er reklamasjon */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Hva er reklamasjon på bil?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Reklamasjon betyr å gi selger beskjed om at du mener det foreligger
            en mangel ved bilen, og at du holder selger ansvarlig. Det er et
            rettslig krav — uten en gyldig reklamasjon mister du retten til å
            gjøre mangelen gjeldende, uansett hvor alvorlig feilen er.
          </p>
          <p className="text-slate-300">
            Reklamasjonen trenger ikke være et formelt juridisk dokument. Det
            viktigste er at du gir selger beskjed om feilen, og at du gjør det
            klart at du mener selger er ansvarlig. Du trenger ikke kjenne
            årsaken til feilen — det holder å beskrive symptomene.
          </p>
          <p className="text-slate-300">
            En reklamasjon er ikke det samme som en klage. Mens en klage er en
            generell misnøye, er en reklamasjon et rettslig steg som utløser
            selgers plikt til å ta stilling til kravet. Reklamasjonen er
            startpunktet for alle videre krav — enten det gjelder retting,
            prisavslag, heving eller erstatning.
          </p>
        </div>
      </section>

      {/* Reklamasjonsfrister */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Reklamasjonsfrister — 2 eller 5 år?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Det gjelder to typer frister ved reklamasjon på bil: en absolutt
            frist og en relativ frist. Begge må overholdes for at
            reklamasjonen skal være gyldig.
          </p>

          <div className="space-y-5">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-1">
                Absolutt reklamasjonsfrist
              </p>
              <p className="text-sm text-slate-400">
                Ved kjøp fra{" "}
                <Link
                  href="/bilkjop/forhandler"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
                >
                  forhandler
                </Link>{" "}
                er den absolutte fristen <strong>5 år</strong> fra leveringsdato
                (forbrukerkjøpsloven § 27). Ved{" "}
                <Link
                  href="/bilkjop/privat-kjop"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
                >
                  privatkjøp
                </Link>{" "}
                er fristen <strong>2 år</strong> (kjøpsloven § 32). Etter
                utløpet av den absolutte fristen kan du ikke lenger gjøre
                mangelen gjeldende — uavhengig av når feilen ble oppdaget.
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-1">
                Relativ reklamasjonsfrist — «rimelig tid»
              </p>
              <p className="text-sm text-slate-400">
                Du må reklamere «innen rimelig tid» etter at du oppdaget eller
                burde ha oppdaget feilen. I praksis betyr dette normalt 2–3
                måneder. Venter du lenger, risikerer du at reklamasjonen
                avvises som for sen — selv om du er innenfor den absolutte
                fristen.
              </p>
            </div>
          </div>

          <p className="text-slate-300">
            Fristen begynner å løpe fra det tidspunktet du overtok bilen
            (leveringsdato), ikke fra kontraktsdato. Les mer om alle frister og
            unntak i vår detaljerte guide om{" "}
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

      {/* Hva må reklamasjonen inneholde */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Hva må reklamasjonen inneholde?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Loven stiller ikke strenge formkrav til reklamasjonen, men den bør
            inneholde nok informasjon til at selger forstår hva du klager på
            og at du holder selger ansvarlig. En god reklamasjon inneholder
            følgende:
          </p>
          <ol className="text-slate-300 space-y-3 ml-4">
            <li>
              <strong className="text-white">1. Identifiser kjøpet</strong>
              <p className="text-sm text-slate-400 mt-1">
                Bil (merke, modell, registreringsnummer), kjøpsdato og
                kjøpesum.
              </p>
            </li>
            <li>
              <strong className="text-white">2. Beskriv feilen</strong>
              <p className="text-sm text-slate-400 mt-1">
                Hva er symptomene? Når oppstod de? Du trenger ikke vite
                årsaken — beskriv det du observerer.
              </p>
            </li>
            <li>
              <strong className="text-white">3. Hold selger ansvarlig</strong>
              <p className="text-sm text-slate-400 mt-1">
                Gjør det klart at du mener feilen utgjør en mangel og at du
                holder selger ansvarlig etter kjøpsloven/forbrukerkjøpsloven.
              </p>
            </li>
            <li>
              <strong className="text-white">4. Angi hva du krever</strong>
              <p className="text-sm text-slate-400 mt-1">
                Krever du retting, prisavslag eller heving? Det er lurt å
                formulere kravet, men du er ikke bundet — du kan endre krav
                dersom det viser seg at mangelen er mer alvorlig enn antatt.
              </p>
            </li>
            <li>
              <strong className="text-white">5. Sett en svarfrist</strong>
              <p className="text-sm text-slate-400 mt-1">
                Be om svar innen en rimelig frist, for eksempel 14 dager.
                Dette dokumenterer at selger har fått mulighet til å ta
                stilling.
              </p>
            </li>
          </ol>
          <p className="text-slate-300 mt-2">
            Send reklamasjonen skriftlig — per e-post, SMS eller brev. Ta vare
            på en kopi og eventuell leveringsbekreftelse.
          </p>
        </div>
      </section>

      {/* Nøytral vs spesifisert reklamasjon */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Nøytral og spesifisert reklamasjon
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Juridisk skiller man mellom nøytral og spesifisert reklamasjon.
            Forstår du forskjellen, unngår du vanlige tabber:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-2">
                Nøytral reklamasjon
              </p>
              <p className="text-sm text-slate-400">
                Du gir selger beskjed om at det er en feil og at du holder
                selger ansvarlig. Du trenger ikke spesifisere hvilket krav du
                fremmer. Dette er det første steget, og det er denne fristen
                som er mest kritisk å overholde.
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-2">
                Spesifisert reklamasjon
              </p>
              <p className="text-sm text-slate-400">
                Du angir konkret hvilket krav du fremmer — for eksempel heving.
                Denne kan komme senere, for eksempel etter at du har fått
                verkstedrapport og vet omfanget av feilen.
              </p>
            </div>
          </div>
          <p className="text-slate-300">
            Regelen er: send en nøytral reklamasjon med en gang du oppdager
            feilen. Spesifiser kravet når du har bedre oversikt over situasjonen.
          </p>
        </div>
      </section>

      {/* Vanlige feil ved reklamasjon */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Vanlige feil som svekker reklamasjonen
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Mange taper rettigheter de egentlig har, fordi de gjør feil i
            reklamasjonsprosessen. Her er de vanligste tabbene:
          </p>

          <div className="space-y-3">
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">Venter for lenge</p>
              <p className="text-sm text-slate-400 mt-1">
                Jo lenger du venter etter at du oppdager feilen, desto
                vanskeligere blir det å overholde kravet om «rimelig tid».
                Reklamer så snart du kan — helst innen noen dager.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                Reklamerer bare muntlig
              </p>
              <p className="text-sm text-slate-400 mt-1">
                En telefonsamtale er vanskelig å dokumentere. Selger kan
                benekte at du reklamerte. Send alltid skriftlig bekreftelse —
                også etter muntlig kontakt.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                Reparerer bilen selv først
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Reparerer du feilen før du reklamerer, kan det bli vanskeligere
                å dokumentere mangelen og selgers ansvar. Gi selger mulighet
                til å ta stilling først.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                Godtar avslaget uten videre
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Et avslag fra selger er ikke en juridisk avgjørelse. Selger har
                en egeninteresse i å avvise kravet. Vurder saken selv eller
                søk uavhengig veiledning før du gir opp.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                Bruker bilen utover det nødvendige
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Omfattende bruk etter oppdaget mangel kan påvirke
                hevingskravet. Bruk bilen kun til nødvendig transport, og
                dokumenter kilometerstand ved reklamasjonstidspunktet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Når reklamasjon kan føre til heving */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Når kan reklamasjon føre til heving?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Reklamasjonen er første steg i en prosess som kan ende med heving
            av bilkjøpet. Men ikke alle reklamasjoner gir grunnlag for heving.
            For at heving skal være aktuelt, må følgende vilkår normalt være
            oppfylt:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • <strong className="text-white">Mangelen er vesentlig</strong> —
              Feilen må være alvorlig nok til at du ikke ville gjennomført
              kjøpet dersom du kjente til den
            </li>
            <li>
              • <strong className="text-white">Retting har mislyktes</strong> —
              Selger har hatt mulighet til å rette, men har ikke klart det
              innen rimelig tid, eller retting er ikke mulig
            </li>
            <li>
              • <strong className="text-white">
                Reklamasjonen er rettidig
              </strong>{" "}
              — Du har reklamert innen fristene (absolutt og relativ frist)
            </li>
          </ul>
          <p className="text-slate-300">
            Typiske eksempler på mangler som kan gi grunnlag for heving er
            alvorlige motorskader, girkassefeil, skjulte
            kollisjonsreparasjoner, tilbakestilt kilometerstand eller
            omfattende rust i bærende konstruksjoner. Les vår fullstendige
            guide om{" "}
            <Link
              href="/bilkjop/heving"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              heving av bilkjøp
            </Link>{" "}
            for en detaljert gjennomgang av vilkår og fremgangsmåte.
          </p>
        </div>
      </section>

      {/* Bevisbyrde og dokumentasjon */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Bevisbyrde og dokumentasjon
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Hvem som har bevisbyrden avhenger av om du kjøpte bilen privat
            eller fra forhandler:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              •{" "}
              <strong className="text-white">Forhandlerkjøp (fkjl.)</strong>:
              Feil som viser seg innen 6 måneder etter levering antas å ha
              eksistert ved levering. Forhandler må bevise det motsatte.
            </li>
            <li>
              •{" "}
              <strong className="text-white">Privatkjøp (kjøpsloven)</strong>:
              Du har selv bevisbyrden for at feilen fantes ved
              kjøpstidspunktet. Dokumentasjon er derfor avgjørende.
            </li>
          </ul>
          <p className="text-slate-300">
            God dokumentasjon styrker saken uansett kjøpsform:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>• Annonsetekst (ta skjermbilde før den slettes)</li>
            <li>• All kommunikasjon med selger (SMS, e-post, meldinger)</li>
            <li>• Kjøpekontrakt og eventuell tilstandsrapport</li>
            <li>• Verkstedrapport med feilbeskrivelse og kostnadsestimat</li>
            <li>• Bilder og video av feilen</li>
            <li>• Kvitteringer for utgifter knyttet til mangelen</li>
          </ul>
          <p className="text-slate-300">
            Les mer om{" "}
            <Link
              href="/bilkjop/bruktbil-feil"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              vanlige feil på bruktbil
            </Link>{" "}
            og hva som utgjør en mangel.
          </p>
        </div>
      </section>

      {/* Hva skjer etter reklamasjonen */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Hva skjer etter at du har reklamert?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Etter en gyldig reklamasjon har selger plikt til å ta stilling til
            kravet. Her er de vanligste utfallene:
          </p>
          <ol className="text-slate-300 space-y-3 ml-4">
            <li>
              <strong className="text-white">1. Selger aksepterer kravet</strong>
              <p className="text-sm text-slate-400 mt-1">
                Selger tilbyr retting, prisavslag eller heving. Sørg for å få
                avtalen skriftlig.
              </p>
            </li>
            <li>
              <strong className="text-white">2. Selger tilbyr retting</strong>
              <p className="text-sm text-slate-400 mt-1">
                Selger har som hovedregel rett til å forsøke retting. Ved
                forhandlerkjøp har selger normalt to forsøk. Dersom retting
                mislykkes, kan du kreve prisavslag eller heving.
              </p>
            </li>
            <li>
              <strong className="text-white">3. Selger avviser kravet</strong>
              <p className="text-sm text-slate-400 mt-1">
                Et avslag er ikke endelig. Du kan ta saken videre til
                Forbrukerklageutvalget (forhandlerkjøp) eller forliksrådet
                (privatkjøp).
              </p>
            </li>
            <li>
              <strong className="text-white">4. Selger svarer ikke</strong>
              <p className="text-sm text-slate-400 mt-1">
                Send en påminnelse med ny frist. Dokumenter alle forsøk.
                Manglende svar kan tale i din favør i en eventuell
                tvistebehandling.
              </p>
            </li>
          </ol>
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
            href="/bilkjop/skjulte-feil-bil"
            className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
          >
            Skjulte feil på bil
          </Link>
          <Link
            href="/bilkjop/bruktbil-feil"
            className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
          >
            Kjøpt bruktbil med feil?
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
            Usikker på om du har en sak?
          </h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Svar på noen spørsmål om bilkjøpet ditt – få juridisk rapport og
            kravbrev til selger for 99 kr.
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
