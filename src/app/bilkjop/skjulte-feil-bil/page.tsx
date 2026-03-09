import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

const faqs = [
  {
    q: "Hva er forskjellen på skjulte feil og vanlig slitasje?",
    a: "Skjulte feil er feil selger visste om eller burde visst om, men ikke opplyste deg om. Vanlig slitasje er forventet forringelse basert på bilens alder og kilometerstand. Skjulte feil gir deg rettigheter – normal slitasje gjør det normalt ikke.",
  },
  {
    q: "Kan selger si «du burde ha sett feilen»?",
    a: "Kjøper har begrenset undersøkelsesplikt. Du trenger ikke være bilmekaniker. Skjulte feil som ikke er synlige ved alminnelig prøvekjøring eller visuell inspeksjon er selgers risiko.",
  },
  {
    q: "Gjelder dette både privatkjøp og forhandlerkjøp?",
    a: "Ja, men reglene er litt forskjellige. Ved forhandlerkjøp gjelder forbrukerkjøpsloven med sterkere vern. Ved privatkjøp gjelder kjøpsloven. I begge tilfeller er skjulte feil en mangel dersom de påvirket kjøpsbeslutningen.",
  },
  {
    q: "Hva kan jeg kreve hvis bilen har skjulte feil?",
    a: "Du kan kreve retting, prisavslag, heving eller erstatning – avhengig av feilens alvorlighetsgrad. Ved alvorlige skjulte feil er heving det mest aktuelle kravet.",
  },
  {
    q: "Hvor lang tid har jeg på å reklamere?",
    a: "2 år ved privatkjøp, 5 år ved forhandlerkjøp. I tillegg må du reklamere innen rimelig tid (2–3 måneder) etter at du oppdaget feilen.",
  },
];

export default function SkjulteFeilBilPage() {
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
        name: "Skjulte feil på bil",
        item: "https://harjegkravpå.no/bilkjop/skjulte-feil-bil",
      },
    ],
  };

  return (
    <BilSeoHero
      eyebrow="Forbrukerrettigheter"
      h1Top="Kjøpt bil med skjulte feil"
      h1Accent="Hva har du krav på?"
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Skjulte feil er feil selger visste om men ikke opplyste deg om.
          Dette er et alvorlig kontraktsbrudd og gir deg sterke rettigheter –
          inkludert krav om full heving av kjøpet og pengene tilbake. Både
          kjøpsloven og forbrukerkjøpsloven gir deg vern mot skjulte feil.
        </p>
      }
      heroImageAlt="Kjøpt bil med skjulte feil – sjekk dine rettigheter"
      primaryCtaTitle="Har bilen skjulte feil?"
      primaryCtaText="Beskriv saken din og få en juridisk vurdering og ferdig kravbrev på minutter. Du betaler 99 kr for rapporten og kravbrevet – verdt tusenvis."
      primaryCtaButton="Sjekk saken din"
      secondaryCtaText="Beskriv saken – få rapport og kravbrev for 99 kr →"
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
        Sist oppdatert: Mars 2026 · Innholdet er utarbeidet med grunnlag i
        kjøpsloven, forbrukerkjøpsloven og relevant nemndpraksis
      </p>

      {/* Hva er skjulte feil */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Hva er skjulte feil på bil?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Skjulte feil er feil eller mangler ved bilen som selger kjente til
            eller burde ha kjent til, men som ikke ble opplyst om før
            kjøpet. Etter kjøpsloven og forbrukerkjøpsloven har selger en
            omfattende opplysningsplikt. Brytes denne, foreligger det en mangel
            – uavhengig av om bilen ble solgt «som den er».
          </p>
          <p className="text-slate-300">
            Skjulte feil skiller seg fra synlige feil og normal slitasje. Det
            avgjørende er at kjøper ikke kunne forventes å oppdage feilen ved
            vanlig undersøkelse, og at selger visste eller burde visst om
            forholdet.
          </p>
        </div>
      </section>

      {/* Eksempler på skjulte feil */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Eksempler på skjulte feil
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <div className="space-y-4">
            {[
              {
                title: "Kjent motorproblem ikke opplyst",
                desc: "Selger visste om gjentatte motorproblemer, feilkoder eller høyt oljeforbruk, men opplyste ikke om det. Motorskader er blant de vanligste grunnlagene for heving.",
              },
              {
                title: "Ulykkeshistorikk skjult",
                desc: "Bilen har vært i en alvorlig kollisjon, men dette ble ikke opplyst. Skjulte kollisjonsreparasjoner kan påvirke både sikkerhet og verdi vesentlig.",
              },
              {
                title: "Feil kilometerstand",
                desc: "Tilbakestilt eller manipulert kilometerstand er dokumentsvindel og gir alltid grunnlag for krav. Du kan kreve heving og erstatning.",
              },
              {
                title: "Kjent elektrisk feil ikke nevnt",
                desc: "Gjentatte elektriske problemer som feilkoder, sensorfeil eller problemer med styringselektronikk som selger kjente til.",
              },
              {
                title: "Rust som ble dekket over",
                desc: "Alvorlig rust i bærende konstruksjoner som ble lakket over eller skjult. Rust som truer bilens sikkerhet er en alvorlig mangel.",
              },
            ].map((item) => (
              <div key={item.title} className="border-l-2 border-emerald-500/30 pl-4">
                <p className="font-medium text-white">{item.title}</p>
                <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dine rettigheter */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Dine rettigheter ved skjulte feil
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Skjulte feil gir deg sterke rettigheter fordi selger har brutt
            opplysningsplikten. Det betyr at terskelen for å nå frem med krav
            er lavere enn ved andre typer mangler.
          </p>
          <div className="space-y-4 mt-2">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-1">Heving</p>
              <p className="text-sm text-slate-400">
                Du leverer bilen tilbake og får kjøpesummen igjen. Skjulte feil
                styrker et hevingskrav vesentlig fordi selgers illojale opptreden
                tillegges vekt i vurderingen. Les mer om{" "}
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
              <p className="font-medium text-white mb-1">Prisavslag</p>
              <p className="text-sm text-slate-400">
                Du beholder bilen og får kompensasjon for verdireduksjonen.
                Aktuelt når feilen ikke er alvorlig nok for heving.
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-1">Erstatning</p>
              <p className="text-sm text-slate-400">
                Du kan kreve dekket økonomisk tap som følge av den skjulte feilen,
                for eksempel verkstedkostnader og leiebil. Erstatning kan kreves
                i tillegg til heving eller prisavslag.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Selgers opplysningsplikt */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Selgers opplysningsplikt
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Både kjøpsloven og forbrukerkjøpsloven pålegger selger en plikt til
            å opplyse om forhold ved bilen som selger kjente eller måtte kjenne
            til, og som kjøper hadde grunn til å forvente å få vite om.
          </p>
          <p className="text-slate-300">
            Opplysningsplikten gjelder uavhengig av om bilen ble solgt «som den
            er». Et «som den er»-forbehold beskytter ikke selger mot ansvar for
            tilbakeholdt informasjon (kjøpsloven § 19, forbrukerkjøpsloven § 17).
          </p>
          <p className="text-slate-300">
            Typiske eksempler på brudd på opplysningsplikten:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>• Kjent feilhistorikk som ikke ble nevnt</li>
            <li>• Tidligere skader eller kollisjoner</li>
            <li>• Påbegynte, men ikke fullførte reparasjoner</li>
            <li>• Varsellys eller feilmeldinger som ble nullstilt før salget</li>
            <li>• Kjent behov for kostbare reparasjoner</li>
          </ul>
        </div>
      </section>

      {/* Slik går du frem */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Slik går du frem ved skjulte feil
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <div className="space-y-4">
            {[
              {
                n: 1,
                title: "Dokumenter feilen",
                desc: "Ta bilder og video. Beskriv symptomene så nøyaktig som mulig. Sammenlign med hva selger opplyste i annonsen eller muntlig.",
              },
              {
                n: 2,
                title: "Reklamer skriftlig",
                desc: "Send en skriftlig reklamasjon der du beskriver feilen og anfører at selger har holdt tilbake informasjon.",
              },
              {
                n: 3,
                title: "Innhent dokumentasjon",
                desc: "Få en uavhengig verkstedrapport. Be verkstedet vurdere om feilen sannsynligvis forelå ved kjøpstidspunktet.",
              },
              {
                n: 4,
                title: "Krev heving eller prisavslag",
                desc: "Basert på dokumentasjonen, send et formelt krav til selger med frist for svar.",
              },
            ].map((s) => (
              <div key={s.n} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold">
                  {s.n}
                </span>
                <div>
                  <p className="font-medium text-white">{s.title}</p>
                  <p className="text-sm text-slate-400 mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
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
            Har bilen skjulte feil?
          </h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Beskriv saken din – få juridisk rapport og ferdig kravbrev til
            selger for 99 kr. Klart på minutter.
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
