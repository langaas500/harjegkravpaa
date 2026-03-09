import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

const faqs = [
  {
    q: "Har jeg rettigheter ved privat bilkjøp?",
    a: "Ja. Kjøpsloven gjelder mellom private parter og gir deg rett til å reklamere dersom bilen har en mangel — selv om bilen er solgt «som den er».",
  },
  {
    q: "Hva betyr «som den er» ved privatkjøp?",
    a: "«Som den er» begrenser selgers ansvar, men fritar ikke selger fullstendig. Etter kjøpsloven § 19 har du fortsatt krav dersom selger har gitt uriktige opplysninger, holdt tilbake informasjon, eller bilen er i vesentlig dårligere stand enn forventet.",
  },
  {
    q: "Hvor lang tid har jeg på å reklamere ved privat bilkjøp?",
    a: "Den absolutte fristen er 2 år fra levering. I tillegg må du reklamere «innen rimelig tid» etter at du oppdaget eller burde oppdaget feilen — normalt 2–3 måneder.",
  },
  {
    q: "Kan jeg heve et privat bilkjøp?",
    a: "Ja, men mangelen må være vesentlig. Det betyr i praksis at feilen må være alvorlig nok til at du ikke ville gjennomført kjøpet dersom du kjente til den. Prisavslag er ofte mer realistisk enn heving.",
  },
  {
    q: "Hvem har bevisbyrden ved privatkjøp?",
    a: "Ved privatkjøp er det du som kjøper som har bevisbyrden for at mangelen fantes ved kjøpstidspunktet. Dette er en viktig forskjell fra forhandlerkjøp, der bevispresumsjonen hjelper deg de første 6 månedene.",
  },
  {
    q: "Hva gjør jeg hvis selger nekter å samarbeide?",
    a: "Send en skriftlig reklamasjon med frist for svar. Dokumenter alt. Svarer ikke selger, kan du ta saken til forliksrådet. Manglende svar fra selger kan tale i din favør.",
  },
];

export const metadata: Metadata = {
  description:
    "Kjøpt bil privat med feil? Legg inn saken — AI vurderer dine rettigheter etter kjøpsloven og lager kravbrev for 99 kr.",
};

export default function PrivatKjopPage() {
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
        name: "Privat bilkjøp",
        item: "https://harjegkravpå.no/bilkjop/privat-kjop",
      },
    ],
  };

  return (
    <BilSeoHero
      eyebrow="Forbrukerrettigheter"
      h1Top="Privat bilkjøp"
      h1Accent="Har du rettigheter?"
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Mange tror at kjøp fra privatperson betyr null rettigheter. Det
          stemmer ikke. Kjøpsloven gjelder også mellom private, og gir deg
          rettigheter selv om bilen er solgt «som den er». Her forklarer vi
          hva loven sier, hva du kan kreve, og hvordan du går frem dersom du
          har kjøpt en bil privat med skjulte feil.
        </p>
      }
      heroImageAlt="Privat bilkjøp – dine rettigheter etter kjøpsloven"
      primaryCtaTitle="Usikker på om du har en sak?"
      primaryCtaText="Om du har rettigheter avhenger av hva selger visste, hva som ble sagt, og hva som faktisk var galt med bilen."
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
        kjøpsloven og relevant rettspraksis
      </p>

      {/* Hva sier kjøpsloven */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Hva sier kjøpsloven om privat bilkjøp?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Kjøpsloven regulerer alle kjøp mellom private parter — inkludert
            bilkjøp. Loven gir deg rett til å gjøre mangelskrav gjeldende
            dersom bilen avviker fra det som er avtalt, eller har feil som
            selger kjente til eller burde kjent til.
          </p>
          <p className="text-slate-300">
            I motsetning til forbrukerkjøpsloven (som gjelder ved kjøp fra
            forhandler), kan kjøpsloven i noen grad fravikes ved avtale. Men
            selv med «som den er»-forbehold har du viktige rettigheter:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • <strong className="text-white">Opplysningssvikt</strong> —
              Selger har holdt tilbake informasjon du burde fått
              (kjøpsloven § 19 første ledd bokstav b)
            </li>
            <li>
              • <strong className="text-white">Uriktige opplysninger</strong>{" "}
              — Selger har gitt feil informasjon som har innvirket på kjøpet
              (kjøpsloven § 18)
            </li>
            <li>
              • <strong className="text-white">
                Vesentlig dårligere stand
              </strong>{" "}
              — Bilen er i vesentlig dårligere stand enn du hadde grunn til å
              forvente ut fra kjøpesum og forholdene ellers
              (kjøpsloven § 19 første ledd bokstav c)
            </li>
          </ul>
          <p className="text-slate-300">
            Les mer om hva som utgjør en mangel i vår guide om{" "}
            <Link
              href="/bilkjop/bruktbil-feil"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              feil på bruktbil
            </Link>
            .
          </p>
        </div>
      </section>

      {/* «Som den er» ved privatkjøp */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          «Som den er» ved privatkjøp — hva betyr det egentlig?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            De fleste privatsolgte biler selges «som den er» eller «som
            besiktiget». Mange kjøpere tror dette betyr at de ikke har noen
            rettigheter. Det er feil.
          </p>
          <p className="text-slate-300">
            Kjøpsloven § 19 begrenser virkningen av «som den er»-forbehold.
            Forbeholdet beskytter selger mot kjente og synlige feil, men ikke
            mot:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • Feil selger visste om men unnlot å opplyse
            </li>
            <li>
              • Feil informasjon selger ga om bilen (for eksempel om
              kilometerstand, servicehistorikk eller skader)
            </li>
            <li>
              • Feil som gjør bilen i vesentlig dårligere stand enn forventet
            </li>
          </ul>
          <p className="text-slate-300">
            Eksempel: Du kjøper en bil til 150 000 kr der selger sier «alt
            fungerer fint». Etter to uker viser det seg at girkassen er
            defekt — reparasjon koster 45 000 kr. Selv om bilen ble solgt
            «som den er», kan dette utgjøre en mangel fordi bilen er i
            vesentlig dårligere stand enn du hadde grunn til å forvente, og
            selgers opplysning om at «alt fungerer fint» var uriktig.
          </p>
        </div>
      </section>

      {/* Bevisbyrde */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Bevisbyrden — den største utfordringen ved privatkjøp
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Ved privatkjøp er det du som kjøper som må sannsynliggjøre at
            mangelen fantes ved kjøpstidspunktet. Dette er den viktigste
            forskjellen fra{" "}
            <Link
              href="/bilkjop/forhandler"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              forhandlerkjøp
            </Link>
            , der feil innen 6 måneder presumeres å ha eksistert ved levering.
          </p>
          <p className="text-slate-300">
            Beviskravet er «alminnelig sannsynlighetsovervekt» — det vil si at
            det er mer sannsynlig enn ikke at feilen fantes ved kjøpet. Du
            trenger ikke bevise det med 100 % sikkerhet.
          </p>
          <p className="text-slate-300">
            Viktig dokumentasjon som styrker bevissituasjonen:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • <strong className="text-white">Annonsetekst</strong> — Ta
              skjermbilde av Finn-annonsen før den slettes. Opplysninger om
              «feilfri», «nylig service» eller «ingen feil» kan være avgjørende
            </li>
            <li>
              • <strong className="text-white">Meldinger og SMS</strong> — All
              kommunikasjon med selger før og etter kjøpet
            </li>
            <li>
              • <strong className="text-white">Verkstedrapport</strong> — En
              uavhengig rapport som dokumenterer feilens art og sannsynlige
              tidspunkt for oppstandelse
            </li>
            <li>
              • <strong className="text-white">Tilstandsrapport</strong> — Hvis
              bilen hadde tilstandsrapport fra NAF eller lignende
            </li>
            <li>
              • <strong className="text-white">Servicehistorikk</strong> — Kan
              vise at problemer forelå eller ble ignorert før salget
            </li>
          </ul>
        </div>
      </section>

      {/* Frister og reklamasjon */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Frister ved privat bilkjøp
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Ved privatkjøp er fristene kortere enn ved forhandlerkjøp:
          </p>
          <div className="space-y-5">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-1">
                Absolutt frist: 2 år
              </p>
              <p className="text-sm text-slate-400">
                Du kan ikke reklamere senere enn 2 år etter at du overtok
                bilen (kjøpsloven § 32 annet ledd). Etter dette er kravet
                foreldet — uavhengig av når feilen ble oppdaget.
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-1">
                Relativ frist: «innen rimelig tid»
              </p>
              <p className="text-sm text-slate-400">
                Du må reklamere innen rimelig tid etter at du oppdaget eller
                burde oppdaget feilen. I praksis betyr dette normalt 2–3
                måneder. Jo raskere du reklamerer, jo sterkere står saken din.
              </p>
            </div>
          </div>
          <p className="text-slate-300">
            Les mer om alle frister og unntak i vår guide om{" "}
            <Link
              href="/bilkjop/heving-tidsfrist"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              tidsfrister ved heving av bilkjøp
            </Link>
            . For detaljer om hvordan du reklamerer riktig, se vår guide om{" "}
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

      {/* Dine krav ved privatkjøp */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Hva kan du kreve ved privat bilkjøp?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Dersom mangelen er dokumentert og reklamasjonen er rettidig, har du
            flere mulige krav:
          </p>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-1">Prisavslag</p>
              <p className="text-sm text-slate-400">
                Det vanligste kravet ved privatkjøp. Du beholder bilen og får
                kompensasjon for verdireduksjonen mangelen medfører.
                Prisavslaget skal gjenspeile forskjellen mellom bilens verdi
                med og uten mangel.
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-1">Retting</p>
              <p className="text-sm text-slate-400">
                Selger utbedrer feilen uten kostnad for deg. Ved privatkjøp
                har selger rett til å tilby retting, men plikten er mer
                begrenset enn ved forhandlerkjøp.
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-1">Heving</p>
              <p className="text-sm text-slate-400">
                Du leverer bilen tilbake og får kjøpesummen igjen. Krever at
                mangelen er <em>vesentlig</em>. Terskelen er høyere enn for
                prisavslag, men alvorlige skjulte feil kan gi grunnlag. Les
                mer i vår guide om{" "}
                <Link
                  href="/bilkjop/heving-privat"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
                >
                  heving av privat bilkjøp
                </Link>
                .
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-1">Erstatning</p>
              <p className="text-sm text-slate-400">
                Dekning av økonomisk tap utover selve mangelen — for eksempel
                utgifter til feildiagnostisering, leiebil eller transport.
                Kan kreves i tillegg til andre krav.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hvorfor mange gir opp for tidlig */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Hvorfor mange gir opp for tidlig
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Mange kjøpere gir opp når selger avviser kravet. Her er de vanligste
            grunnene — og hvorfor de ofte ikke holder:
          </p>
          <div className="space-y-3">
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                «Selger sa at bilen var solgt som den er»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Det fritar ikke selger fra ansvar for tilbakeholdte eller
                uriktige opplysninger. «Som den er» har begrenset virkning
                etter kjøpsloven § 19.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                «Selger sier han ikke visste om feilen»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Bilen kan likevel være i vesentlig dårligere stand enn
                forventet. Selgers kunnskap er bare ett av vurderingsmomentene.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                «Jeg har ikke råd til advokat»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Forliksrådet behandler saker uten krav om advokat, og gebyret
                er lavt. Du kan fremme saken selv.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                «Det er privatkjøp — da har jeg ingen rettigheter»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Feil. Kjøpsloven gir deg rettigheter også ved privatkjøp.
                Rettighetene er noe svakere enn ved forhandlerkjøp, men de
                finnes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privatkjøp vs forhandlerkjøp */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Privatkjøp vs forhandlerkjøp — de viktigste forskjellene
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-2 text-slate-400 font-medium">
                    &nbsp;
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
                  <td className="py-3 px-2 font-medium text-white">Lov</td>
                  <td className="py-3 px-2">Kjøpsloven</td>
                  <td className="py-3 px-2">Forbrukerkjøpsloven</td>
                </tr>
                <tr className="border-b border-white/[0.06]">
                  <td className="py-3 px-2 font-medium text-white">
                    Reklamasjonsfrist
                  </td>
                  <td className="py-3 px-2">2 år</td>
                  <td className="py-3 px-2">5 år</td>
                </tr>
                <tr className="border-b border-white/[0.06]">
                  <td className="py-3 px-2 font-medium text-white">
                    Bevispresumpsjon
                  </td>
                  <td className="py-3 px-2">Nei</td>
                  <td className="py-3 px-2">Ja (6 mnd)</td>
                </tr>
                <tr className="border-b border-white/[0.06]">
                  <td className="py-3 px-2 font-medium text-white">
                    «Som den er»
                  </td>
                  <td className="py-3 px-2">Begrenset virkning (§ 19)</td>
                  <td className="py-3 px-2">Begrenset virkning (§ 17)</td>
                </tr>
                <tr className="border-b border-white/[0.06]">
                  <td className="py-3 px-2 font-medium text-white">
                    Rettingsforsøk
                  </td>
                  <td className="py-3 px-2">Selger kan tilby</td>
                  <td className="py-3 px-2">Normalt maks 2 forsøk</td>
                </tr>
                <tr className="border-b border-white/[0.06]">
                  <td className="py-3 px-2 font-medium text-white">
                    Tvisteorgan
                  </td>
                  <td className="py-3 px-2">Forliksrådet</td>
                  <td className="py-3 px-2">Forbrukerklageutvalget</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-300">
            Les mer om dine rettigheter ved{" "}
            <Link
              href="/bilkjop/forhandler"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              kjøp fra forhandler
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Slik går du frem */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Slik går du frem ved feil etter privat bilkjøp
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <ol className="text-slate-300 space-y-4 ml-4">
            <li>
              <strong className="text-white">
                1. Sikre bevis med en gang
              </strong>
              <p className="text-sm text-slate-400 mt-1">
                Ta skjermbilde av annonsen, lagre SMS-er og meldinger, ta
                bilder av feilen. Beviser er avgjørende ved privatkjøp.
              </p>
            </li>
            <li>
              <strong className="text-white">
                2. Reklamer skriftlig til selger
              </strong>
              <p className="text-sm text-slate-400 mt-1">
                Send en{" "}
                <Link
                  href="/bilkjop/reklamasjon"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
                >
                  skriftlig reklamasjon
                </Link>{" "}
                innen rimelig tid. Beskriv feilen, hold selger ansvarlig, og
                sett en svarfrist.
              </p>
            </li>
            <li>
              <strong className="text-white">
                3. Innhent verkstedrapport
              </strong>
              <p className="text-sm text-slate-400 mt-1">
                En uavhengig verkstedvurdering styrker bevisene for at feilen
                fantes ved kjøpet.
              </p>
            </li>
            <li>
              <strong className="text-white">
                4. Forsøk dialog med selger
              </strong>
              <p className="text-sm text-slate-400 mt-1">
                Mange saker løses gjennom forhandling. Foreslå en konkret
                løsning — prisavslag, deling av utbedringskostnad, eller
                heving.
              </p>
            </li>
            <li>
              <strong className="text-white">
                5. Forliksrådet som siste utvei
              </strong>
              <p className="text-sm text-slate-400 mt-1">
                Kommer dere ikke til enighet, kan du sende klage til
                forliksrådet i selgers kommune. Du trenger ikke advokat, og
                gebyret er lavt.
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

      {/* Final CTA */}
      <section
        data-final-cta="true"
        className="relative rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-emerald-500/5" />
        <div className="absolute inset-0 rounded-3xl border border-emerald-500/15" />
        <div className="relative p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Privatkjøp er mer usikkert – men ikke uten vern
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
