import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";
import BruksfradragKalkulator from "@/components/bilkjop/BruksfradragKalkulator";

const CANONICAL_URL = "https://harjegkravpå.no/bilkjop/heving";

const faqs = [
  {
    q: "Kan jeg heve hvis bilen har vært på verksted flere ganger?",
    a: "Ja, flere mislykkede reparasjonsforsøk styrker et hevingskrav. Dersom selger har fått to eller flere forsøk på å rette samme feil uten å lykkes, tilsier det at mangelen ikke lar seg avhjelpe – et tungtveiende moment i vurderingen av om du kan heve bilkjøpet.",
  },
  {
    q: "Kan selger nekte heving og tilby prisavslag i stedet?",
    a: "Selger kan argumentere for prisavslag, men dersom mangelen er vesentlig og retting ikke har lykkes, har du rett til å velge heving av bilkjøpet. Prisavslag er et alternativ med lavere terskel som kan være aktuelt dersom vesentlighetskravet ikke er oppfylt.",
  },
  {
    q: "Hvor lang tid har jeg på å heve bilkjøpet?",
    a: "Du må reklamere innen rimelig tid etter at du oppdaget feilen – normalt 2–3 måneder. I tillegg gjelder en absolutt frist: 2 år ved privatkjøp og 5 år ved forhandlerkjøp, regnet fra overtakelse. Begge frister må overholdes for å heve bilkjøpet.",
  },
  {
    q: "Hva er forskjellen på heving og prisavslag?",
    a: "Ved heving leverer du bilen tilbake og får kjøpesummen refundert. Ved prisavslag beholder du bilen og får kompensasjon tilsvarende verdireduksjonen. Heving krever at mangelen er vesentlig (privat) eller ikke uvesentlig (forhandler), mens prisavslag bare krever at det foreligger en mangel.",
  },
  {
    q: "Kan jeg heve kjøp av bil som ble solgt «som den er»?",
    a: "Ja. Selv om bilen ble solgt «som den er», har du rettigheter etter kjøpsloven § 19. Du kan heve kjøp av bil dersom selger ga uriktige opplysninger, holdt tilbake vesentlig informasjon, eller bilen er i vesentlig dårligere stand enn du hadde grunn til å forvente ut fra prisen.",
  },
  {
    q: "Hvor mye får jeg tilbake ved heving av bilkjøpet?",
    a: "I utgangspunktet skal du få hele kjøpesummen tilbake. Selger kan imidlertid kreve nyttevederlag for den bruken du har hatt av bilen – typisk 1–3,50 kr per kjørte kilometer avhengig av bilens verdi og alder. Beløpet fastsettes konkret i hvert enkelt tilfelle.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Heving av bilkjøp – regler, frister og krav",
  description:
    "Komplett guide til heving av bilkjøp i Norge. Vesentlig mangel, frister, forskjellen på privat og forhandler, og steg-for-steg fremgangsmåte.",
  url: CANONICAL_URL,
  isPartOf: {
    "@type": "WebSite",
    name: "Harjegkravpå.no",
    url: "https://harjegkravpå.no",
  },
  publisher: {
    "@type": "Organization",
    name: "Harjegkravpå.no",
    url: "https://harjegkravpå.no",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Hjem", item: "https://harjegkravpå.no" },
    { "@type": "ListItem", position: 2, name: "Bilkjøp", item: "https://harjegkravpå.no/bilkjop" },
    { "@type": "ListItem", position: 3, name: "Heving av bilkjøp", item: CANONICAL_URL },
  ],
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Heving av bilkjøp – regler, frister og krav",
  description:
    "Komplett guide til heving av bilkjøp i Norge. Lær om vesentlig mangel, frister, forskjellen på privat og forhandler, og fremgangsmåten steg for steg.",
  datePublished: "2025-06-01",
  dateModified: "2026-02-26",
  author: {
    "@type": "Organization",
    name: "Harjegkravpå.no",
    url: "https://harjegkravpå.no",
  },
  publisher: {
    "@type": "Organization",
    name: "Harjegkravpå.no",
    url: "https://harjegkravpå.no",
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": CANONICAL_URL },
};

export const metadata: Metadata = {
  title: "Heving av bilkjøp – Kan du kreve pengene tilbake?",
  description:
    "Har bilen alvorlige feil? Sjekk om du kan kreve heving og få pengene tilbake etter forbrukerkjøpsloven. Regler, frister og fremgangsmåte. Tar 2 minutter.",
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    title: "Heving av bilkjøp – Kan du kreve pengene tilbake?",
    description:
      "Har bilen alvorlige feil? Sjekk om du kan kreve heving etter forbrukerkjøpsloven. Regler, frister og fremgangsmåte.",
    url: CANONICAL_URL,
    siteName: "Harjegkravpå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heving av bilkjøp – Kan du kreve pengene tilbake?",
    description:
      "Heving av bilkjøp: vesentlig mangel, frister, privat vs forhandler og steg-for-steg. Praktisk oversikt + kalkulator.",
  },
};

export default function HevingPage() {
  return (
    <BilSeoHero
      eyebrow="Forbrukerrettigheter"
      h1Top="Heving av bilkjøp"
      h1Accent="Sjekk om du kan kreve pengene tilbake."
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Har bilen alvorlige feil, eller fikk du uriktige eller skjulte
          opplysninger? Du kan ha krav på å heve bilkjøpet – det vil si levere
          bilen tilbake og få pengene igjen. Heving av bilkjøp er den mest
          inngripende sanksjonen i kjøpsretten, og forutsetter at feilen er
          alvorlig nok. Reglene følger av kjøpsloven ved privatkjøp og
          forbrukerkjøpsloven ved kjøp fra forhandler. Denne guiden gir deg en
          komplett oversikt over vilkårene, fristene og fremgangsmåten.
        </p>
      }
      heroImageAlt="Heving av bilkjøp – sjekk om du kan få pengene tilbake"
      primaryCtaTitle="Kan du heve bilkjøpet?"
      primaryCtaText="Svar på noen spørsmål og få en veiledende vurdering basert på hvem du kjøpte bilen fra og hva som har skjedd."
      primaryCtaButton="Se om du kan få pengene tilbake"
      secondaryCtaText="Sjekk saken din nå →"
    >
      <p className="text-xs text-slate-500 mb-10">
        Sist oppdatert: Februar 2026
      </p>

      {/* Relaterte guider */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Utforsk temaet: Heving av bilkjøp
        </h2>
        <p className="text-slate-400 text-sm mb-4">
          Denne siden er hovedguiden. Velg et undertema for å lese mer om din
          situasjon.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/bilkjop/heving-privat"
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] transition"
          >
            <p className="font-semibold text-white">Heving ved privatkjøp</p>
            <p className="text-slate-400 text-sm mt-1">
              Kjøpsloven, «som den er»-forbehold, bevisbyrde og terskel for
              heving mellom privatpersoner.
            </p>
            <span className="inline-flex items-center gap-2 text-emerald-400 mt-4 text-sm">
              Les guiden <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
          <Link
            href="/bilkjop/heving-forhandler"
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] transition"
          >
            <p className="font-semibold text-white">Heving hos forhandler</p>
            <p className="text-slate-400 text-sm mt-1">
              Forbrukerkjøpsloven, bevispresumpsjon, rettingsforsøk og hva du
              kan kreve.
            </p>
            <span className="inline-flex items-center gap-2 text-emerald-400 mt-4 text-sm">
              Les guiden <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
          <Link
            href="/bilkjop/heving-tidsfrist"
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] transition"
          >
            <p className="font-semibold text-white">Tidsfrist for heving</p>
            <p className="text-slate-400 text-sm mt-1">
              Reklamasjonsfrister, absolutte frister, og når «rimelig tid»
              begynner å løpe.
            </p>
            <span className="inline-flex items-center gap-2 text-emerald-400 mt-4 text-sm">
              Les guiden <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
          <Link
            href="/bilkjop/kan-selger-heve"
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] transition"
          >
            <p className="font-semibold text-white">Kan selger heve kjøpet?</p>
            <p className="text-slate-400 text-sm mt-1">
              Betalingsmislighold, kontraktsbrudd, stansingsrett og når selger
              kan heve bilkjøpet.
            </p>
            <span className="inline-flex items-center gap-2 text-emerald-400 mt-4 text-sm">
              Les guiden <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>

      {/* Kan jeg heve kjøp av bil? */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Kan jeg heve kjøp av bil?</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Du kan heve kjøp av bil dersom bilen har en mangel som er så
            alvorlig at den utgjør et vesentlig kontraktsbrudd. Det betyr at
            feilen må være av en slik karakter at du ikke ville inngått avtalen
            om du visste om den på forhånd. Heving av bilkjøp innebærer at
            kjøpet gjøres om: du leverer bilen tilbake, og selger betaler
            tilbake kjøpesummen.
          </p>
          <p className="text-slate-300">
            Retten til å heve kjøp av bil er regulert i to ulike lover, avhengig
            av hvem du kjøpte bilen fra. Ved{" "}
            <Link href="/bilkjop/heving-privat" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition">
              heving ved privatkjøp
            </Link>{" "}
            gjelder kjøpsloven, som krever at mangelen er «vesentlig». Ved{" "}
            <Link href="/bilkjop/heving-forhandler" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition">
              heving hos forhandler
            </Link>{" "}
            gjelder forbrukerkjøpsloven, som har en lavere terskel: mangelen
            skal ikke være «uvesentlig».
          </p>
          <p className="text-slate-300">
            For å heve kjøp av bil må du ha reklamert i tide, og selger må som
            hovedregel ha fått mulighet til å forsøke retting først. Dersom
            retting mislykkes, ikke tilbys, eller er uforholdsmessig, kan du
            heve kjøp av bil og kreve kjøpesummen tilbake. Det er viktig å
            forstå at heving er siste utvei – loven forutsetter at mildere
            sanksjoner som retting og prisavslag er vurdert først.
          </p>
          <p className="text-slate-300">Sentrale momenter i vurderingen:</p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>• Feilens art, omfang og betydning for bilens bruk og verdi</li>
            <li>• Reparasjonskostnaden sett opp mot kjøpesummen</li>
            <li>• Om selger har gitt deg uriktige eller mangelfulle opplysninger</li>
            <li>• Om selger har fått anledning til å rette feilen</li>
            <li>• Om det er praktisk mulig å kompensere med prisavslag i stedet</li>
          </ul>
        </div>
      </section>

      {/* Kravet om vesentlig mangel */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Kravet om vesentlig mangel</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            For å heve bilkjøpet må feilen være så alvorlig at den utgjør et
            vesentlig kontraktsbrudd. Hva som er «vesentlig» er en konkret
            helhetsvurdering som varierer fra sak til sak. Domstolene legger
            vekt på om kjøper har fått noe vesentlig annet enn det han eller hun
            hadde grunn til å forvente.
          </p>
          <p className="text-slate-300">
            Ved kjøp fra forhandler er terskelen lavere: forbrukerkjøpsloven
            § 32 krever bare at mangelen ikke er «uvesentlig». I praksis betyr
            det at de fleste feil av en viss økonomisk eller funksjonell
            betydning kan gi grunnlag for heving av bilkjøpet dersom retting
            ikke har lykkes.
          </p>
          <p className="text-slate-300">
            Ved privatkjøp etter kjøpsloven § 39 kreves det at mangelen er
            «vesentlig». Dette er en strengere terskel. Her må kjøper vise at
            kontraktsbruddet har gitt ham eller henne rimelig grunn til å si seg
            løst fra avtalen.
          </p>
          <p className="text-slate-300">Momenter i helhetsvurderingen:</p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>• Feilens betydning for bilens sikkerhet, funksjon og kjøretøytekniske tilstand</li>
            <li>• Reparasjonskostnaden sett i forhold til kjøpesummen – feil som utgjør mer enn 15–20 % av kjøpesummen taler ofte for vesentlighet</li>
            <li>• Om reparasjon er teknisk mulig eller om feilen er varig</li>
            <li>• Om selger har fått en reell og tilstrekkelig mulighet til å rette feilen</li>
            <li>• Selgers skyldgrad – visste selger om feilen, eller burde han visst?</li>
            <li>• Om prisavslag er et rimelig alternativ, eller om kjøper har saklig grunn til å ønske seg fri fra kontrakten</li>
          </ul>
          <p className="text-slate-300">
            Flere feil som hver for seg er mindre alvorlige kan samlet sett
            oppfylle vesentlighetskravet. En bil med tre–fire ulike feil som
            til sammen koster mye å utbedre, kan gi grunnlag for heving av
            bilkjøpet selv om ingen enkeltstående feil alene er tilstrekkelig.
          </p>
        </div>
      </section>

      {/* Rettspraksis */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Hva sier rettspraksis om heving av bilkjøp?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-6">
          <p className="text-slate-300">
            Norske domstoler og Forbrukertvilstutvalget (FTU) behandler
            jevnlig saker om heving av bilkjøp. Avgjørelsene gir konkrete
            holdepunkter for hva som skal til i praksis.
          </p>

          <div className="space-y-5">
            <div className="border-l-2 border-emerald-500/40 pl-5">
              <p className="text-sm font-semibold text-emerald-400 mb-1">
                Høyesterett – Rt. 2015 s. 321
              </p>
              <p className="font-medium text-white mb-1">
                «Ny bil» som ikke var ny – heving ble innvilget
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                En bil ble solgt som «ny», men hadde i realiteten trillet
                kilometre og manglet de garantivilkår som var forespeilet.
                Høyesterett kom til at prisavslag ikke var tilstrekkelig, og
                avsa dom på heving. Saken illustrerer at uriktige opplysninger
                om bilens status kan gi grunnlag for heving selv om den
                fysiske feilen isolert sett ikke er alvorlig.
              </p>
            </div>

            <div className="border-l-2 border-emerald-500/40 pl-5">
              <p className="text-sm font-semibold text-emerald-400 mb-1">
                Forbrukertvistutvalget – gjentatte motorproblemer
              </p>
              <p className="font-medium text-white mb-1">
                To mislykkede rettingsforsøk – heving innvilget
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Kjøper av bruktbil fra forhandler oppdaget gjentatte
                motorproblemer. Forhandleren forsøkte å utbedre feilen to
                ganger uten å lykkes. FTU kom til at rettingsretten var
                uttømt, og at mangelen ikke var uvesentlig etter
                forbrukerkjøpsloven § 32. Kjøper fikk heve kjøpet og
                kjøpesummen ble tilbakebetalt med fradrag for nyttevederlag.
              </p>
            </div>

            <div className="border-l-2 border-emerald-500/40 pl-5">
              <p className="text-sm font-semibold text-emerald-400 mb-1">
                Forbrukertvistutvalget – motorhavari privatkjøp
              </p>
              <p className="font-medium text-white mb-1">
                Selger vant – mangelen ble ikke bevist å foreligge ved kjøpet
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                To måneder og 10 000 km etter overtakelse oppstod det alvorlige
                motorproblemer. Kjøper krevde heving og mente reparasjonen
                ville koste like mye som kjøpesummen. FTU ga selger medhold.
                Den fremlagte sakkyndige rapporten tok ikke stilling til årsaken
                til feilen, og det ble ikke sannsynliggjort at mangelen forelå
                ved kjøpstidspunktet. Saken viser at dokumentasjon og
                årsakssammenheng er avgjørende – særlig ved privatkjøp.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 mt-2">
            <p className="text-sm text-slate-400">
              <strong className="text-white">Hva lærer vi av dette?</strong>{" "}
              Heving innvilges oftest når: (1) selger har gitt uriktige
              opplysninger, (2) retting har mislyktes to ganger, eller (3)
              feilen er av en art som gjør bilen uegnet til normal bruk.
              Dokumentasjon av feil og årsak ved kjøpstidspunktet er kritisk –
              særlig ved privatkjøp der bevisbyrden ligger hos kjøper.
            </p>
          </div>

          <Link
            href="/bilkjop"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm transition"
          >
            Sjekk om din sak ligner på disse – start vurdering →
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Slik går du frem */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Slik går du frem for å heve bilkjøpet
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Å heve bilkjøpet krever en strukturert fremgangsmåte. Følger du
            stegene nedenfor, står du sterkest juridisk og unngår de vanligste
            fallgruvene.
          </p>
          <div className="space-y-4 mt-2">
            {[
              {
                n: 1,
                title: "Dokumenter feilen",
                desc: "Ta bilder og video av feilen. Noter dato for når du oppdaget den, og beskriv symptomene så nøyaktig som mulig. Denne dokumentasjonen kan bli avgjørende dersom saken går videre.",
              },
              {
                n: 2,
                title: "Reklamer skriftlig til selger",
                desc: "Send en skriftlig reklamasjon (e-post, SMS eller brev) der du beskriver feilen og gjør det klart at du holder selger ansvarlig. Du trenger ikke kjenne årsaken – beskriv symptomene.",
              },
              {
                n: 3,
                title: "Gi selger mulighet til å rette",
                desc: "Selger har som regel rett til å forsøke å reparere feilen. Rettingen må skje innen rimelig tid og uten vesentlig ulempe for deg. Normalt aksepteres to rettingsforsøk på samme feil.",
              },
              {
                n: 4,
                title: "Innhent verkstedrapport",
                desc: "Få et uavhengig verksted til å vurdere feilen. Be dem ta stilling til om feilen sannsynligvis forelå ved overtakelsestidspunktet. En slik rapport styrker saken din vesentlig.",
              },
              {
                n: 5,
                title: "Vurder om mangelen er vesentlig",
                desc: "Basert på verkstedrapporten og kostnadsoverslaget: er feilen alvorlig nok til å kreve heving? Sammenlign reparasjonskostnaden med kjøpesummen.",
              },
              {
                n: 6,
                title: "Send hevingserklæring",
                desc: "Dersom du har grunnlag, sender du et skriftlig krav om heving av bilkjøpet til selger. Erklæringen bør inneholde begrunnelse, frist for tilbakemelding og referanse til dokumentasjonen.",
              },
              {
                n: 7,
                title: "Gjennomfør hevingsoppgjøret",
                desc: "Dersom selger aksepterer, avtales tidspunkt for tilbakelevering og tilbakebetaling. Dersom selger nekter, kan saken bringes inn for Forbrukertilsynet, Forbrukerrådet eller domstolene.",
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

      {/* Privat eller forhandler */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Privat eller forhandler – hva er forskjellen?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Hvilket regelverk som gjelder for heving av bilkjøp avhenger helt av
            hvem du kjøpte bilen fra. Forskjellene er betydelige – særlig når
            det gjelder bevisbyrde, reklamasjonsfrister og terskelen for heving.
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 pr-4 font-semibold text-white">Tema</th>
                  <th className="py-3 px-4 font-semibold text-white">Privat (kjøpsloven)</th>
                  <th className="py-3 pl-4 font-semibold text-white">Forhandler (forbrukerkjøpsloven)</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {[
                  ["Reklamasjonsfrist", "2 år fra overtakelse", "5 år fra overtakelse"],
                  ["Bevisbyrde", "Kjøper må sannsynliggjøre at feilen forelå ved kjøpet", "Feil innen 6 mnd antas å ha fantes ved levering"],
                  ["Terskel for heving", "Vesentlig mangel (§ 39)", "Ikke uvesentlig mangel (§ 32)"],
                  ["«Som den er»", "Tillatt, men begrenses av § 19", "Kan ikke avtales bort"],
                  ["Rettingsforsøk", "Etter avtale mellom partene", "Forhandler har lovfestet rett til å rette"],
                  ["Avtalefrihet", "Stor – mange vilkår kan avtales", "Begrenset – loven er ufravikelig"],
                ].map(([tema, privat, forhandler]) => (
                  <tr key={tema} className="border-b border-white/[0.04]">
                    <td className="py-3 pr-4 font-medium text-white">{tema}</td>
                    <td className="py-3 px-4">{privat}</td>
                    <td className="py-3 pl-4">{forhandler}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-300 mt-4">
            Les mer i våre detaljerte guider om{" "}
            <Link href="/bilkjop/heving-privat" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition">
              heving ved privatkjøp
            </Link>{" "}
            og{" "}
            <Link href="/bilkjop/heving-forhandler" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition">
              heving hos forhandler
            </Link>.
          </p>
        </div>
      </section>

      {/* Bruksfradrag-kalkulator */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-3">
          Hvor mye får du tilbake? Beregn bruksfradrag
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          Ved heving kan selger kreve fradrag for kilometerne du har kjørt.
          Bruk kalkulatoren for å estimere hva du faktisk får tilbake.
        </p>
        <BruksfradragKalkulator />
      </section>

      {/* Når får du avslag */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Når får du avslag på heving?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Mange som forsøker å heve bilkjøpet får avslag. Det betyr ikke
            nødvendigvis at kravet er ubegrunnet – men det er noen vanlige
            grunner til at selger avviser kravet.
          </p>
          <div className="space-y-3 mt-2">
            {[
              {
                title: "«Feilen er ikke alvorlig nok»",
                desc: "Selger hevder at feilen er for bagatellmessig til å utgjøre en vesentlig mangel. En reparasjonskostnad på 30 000 kr er mer vesentlig på en bil til 100 000 kr enn på en til 500 000 kr.",
              },
              {
                title: "«Vi har tilbudt retting»",
                desc: "Selger har rett til å forsøke å rette feilen, men retten er ikke ubegrenset. Normalt aksepteres to rettingsforsøk. Dersom rettingen ikke løser problemet, er rettingsretten uttømt.",
              },
              {
                title: "«Du har reklamert for sent»",
                desc: "For sen reklamasjon er en av de vanligste grunnene til tap av krav. Du må reklamere innen rimelig tid etter at du oppdaget feilen, og innenfor den absolutte fristen.",
              },
              {
                title: "«Feilen er normal slitasje»",
                desc: "Selger hevder at feilen skyldes normal slitasje. Hva som er «normal slitasje» avhenger av bilens alder, kilometerstand og hva som ble opplyst ved salget.",
              },
              {
                title: "«Du burde oppdaget feilen før kjøpet»",
                desc: "Kjøpers undersøkelsesplikt begrenser hva du kan klage på. Men plikten er begrenset – du trenger ikke være bilmekaniker. Skjulte feil som ikke er synlige ved alminnelig undersøkelse, er selgers risiko.",
              },
            ].map((item) => (
              <div key={item.title} className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">{item.title}</p>
                <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-300 mt-4">
            <Link href="/bilkjop" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition">
              Få en vurdering av saken din før du godtar avslaget →
            </Link>
          </p>
        </div>
      </section>

      {/* Hva skjer etter heving */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Hva skjer etter heving av bilkjøpet?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Når heving av bilkjøpet er gjennomført, skal begge parter stilles
            som om kjøpet aldri fant sted. Det innebærer et oppgjør der
            ytelsene tilbakeføres:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • <strong className="text-white">Kjøper</strong> leverer bilen
              tilbake i den stand den ble mottatt, med rimelig hensyn til normal
              bruk i mellomperioden
            </li>
            <li>
              • <strong className="text-white">Selger</strong> tilbakefører hele
              kjøpesummen til kjøper
            </li>
            <li>
              • <strong className="text-white">Nyttevederlag:</strong> Selger kan
              kreve kompensasjon for bruken du har hatt – typisk 1–3,50 kr per
              kjørte kilometer avhengig av bilens verdi
            </li>
            <li>
              • <strong className="text-white">Erstatning:</strong> I tillegg til
              heving kan du kreve erstatning for dokumenterte tap som
              verkstedkostnader og leiebil
            </li>
          </ul>
          <p className="text-slate-300">
            Hevingsoppgjøret bør avtales skriftlig. Dersom partene ikke blir
            enige, kan saken bringes inn for Forbrukertilsynet eller domstolene.
          </p>
        </div>
      </section>

      {/* Kan selger heve */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Kan selger heve bilkjøpet?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Ja, i noen tilfeller kan selger heve bilkjøpet. Det skjer oftest
            når kjøper ikke betaler i tide, eller ved andre vesentlige
            kontraktsbrudd fra kjøpers side. Selgers hevingsrett reguleres av
            kjøpsloven §§ 54–57 og forutsetter at kontraktsbruddet er vesentlig.
          </p>
          <p className="text-slate-300">
            Typiske situasjoner der selger kan heve bilkjøpet:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>• Kjøper betaler ikke kjøpesummen til avtalt tid</li>
            <li>• Kjøper henter ikke bilen som avtalt (medvirkningssvikt)</li>
            <li>• Det er klart at kjøper kommer til å misligholde vesentlig (antesipert mislighold)</li>
          </ul>
          <p className="text-slate-300">
            Les mer i vår detaljerte guide om{" "}
            <Link href="/bilkjop/kan-selger-heve" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition">
              når selger kan heve bilkjøpet
            </Link>.
          </p>
        </div>
      </section>

      {/* Kort oppsummert */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Kort oppsummert</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8">
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>• Du kan heve bilkjøpet dersom bilen har en vesentlig mangel</li>
            <li>• Terskelen er lavere ved forhandlerkjøp enn ved privatkjøp</li>
            <li>• Selger har normalt rett til å forsøke retting først</li>
            <li>• Du må reklamere innen rimelig tid – og innenfor den absolutte fristen</li>
            <li>• Heving innebærer at bilen leveres tilbake og kjøpesummen refunderes</li>
            <li>• Selger kan kreve nyttevederlag for bruken du har hatt – typisk 1–3,50 kr/km</li>
            <li>• Dokumentasjon og rask handling styrker saken din</li>
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
                <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      </section>

      {/* Final CTA */}
      <section data-final-cta="true" className="relative rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-emerald-500/5" />
        <div className="absolute inset-0 rounded-3xl border border-emerald-500/15" />
        <div className="relative p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Heving krever en konkret vurdering
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