import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

const faqs = [
  {
    q: "Gjelder kjøpsloven eller avhendingsloven ved privat bilsalg?",
    a: "Kjøpsloven gjelder ved salg av løsøre mellom privatpersoner, inkludert biler. Avhendingsloven gjelder fast eiendom og kommer ikke til anvendelse ved bilkjøp.",
  },
  {
    q: "Kan jeg heve hvis bilen ble solgt «som den er»?",
    a: "Ja, dersom bilen er i vesentlig dårligere stand enn du hadde grunn til å forvente ut fra pris, alder og opplysninger gitt ved kjøpet. «Som den er» gir ikke selger fritt spillerom.",
  },
  {
    q: "Hva er forskjellen på mangel og normal slitasje?",
    a: "En mangel er en feil som gjør at bilen avviker fra det avtalte eller det du med rimelighet kunne forvente. Normal slitasje er forventet ut fra bilens alder og kilometerstand, og utgjør ikke en mangel.",
  },
  {
    q: "Hvem har bevisbyrden ved privat bilkjøp?",
    a: "Kjøper må sannsynliggjøre at mangelen forelå ved overtakelsestidspunktet. Det betyr at du bør innhente dokumentasjon som verkstedrapport eller sakkyndig vurdering.",
  },
  {
    q: "Kan jeg kreve erstatning i tillegg til heving?",
    a: "Ja, dersom du har hatt dokumenterte utgifter som følge av mangelen, for eksempel verkstedkostnader eller leiebil. Kravet må stå i sammenheng med mangelen.",
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
      name: "Heving ved privatkjøp",
      item: "https://harjegkravpå.no/bilkjop/heving-privat",
    },
  ],
};

export default function HevingPrivatPage() {
  return (
    <BilSeoHero
      eyebrow="Forbrukerrettigheter"
      h1Top="Heving av bilkjøp"
      h1Accent="mellom privatpersoner"
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Kjøpte du bil av en privatperson og oppdaget alvorlige feil? Da
          reguleres kjøpet av kjøpsloven. Heving av bilkjøp mellom
          privatpersoner er mulig, men terskelen er høyere enn ved kjøp fra
          forhandler. Denne guiden forklarer vilkårene, bevisbyrden og
          fremgangsmåten for å heve bil privat.
        </p>
      }
      heroImageAlt="Heving av bilkjøp mellom privatpersoner – regler etter kjøpsloven"
      primaryCtaTitle="Kjøpte du bil privat med skjulte feil?"
      primaryCtaText="Svar på noen spørsmål om bilkjøpet ditt og få en veiledende vurdering av om du kan kreve heving, prisavslag eller retting."
      primaryCtaButton="Sjekk om du har krav"
      secondaryCtaText="Sjekk saken din nå →"
    >
      <p className="text-xs text-slate-500 mb-10">
        Sist oppdatert: Februar 2026
      </p>

      {/* Kjøpsloven regulerer */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Kjøpsloven regulerer private bilkjøp
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Når to privatpersoner handler bil, er det kjøpsloven som gjelder –
            ikke avhendingsloven (som gjelder fast eiendom) og ikke
            forbrukerkjøpsloven (som gjelder kjøp fra næringsdrivende). Dette
            har stor praktisk betydning for muligheten til å heve bil privat.
          </p>
          <p className="text-slate-300">
            Kjøpsloven gir begge parter avtalefrihet. Det betyr at selger kan ta
            forbehold, og partene kan avtale vilkår som fraviker loven. Det
            vanligste forbeholdet er «som den er», som innebærer at selger
            forsøker å begrense sitt ansvar for skjulte feil. Mange tror dette
            betyr at selger er fritatt for alt ansvar – men det stemmer ikke.
          </p>
          <p className="text-slate-300">
            Sammenlignet med{" "}
            <Link
              href="/bilkjop/heving-forhandler"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              heving hos forhandler
            </Link>
            , gir kjøpsloven et svakere vern. Bevisbyrden ligger hos kjøper,
            reklamasjonsfristen er kortere, og terskelen for heving er høyere.
            Men du har fortsatt reelle rettigheter dersom bilen har en mangel
            som gjør at den avviker vesentlig fra det du hadde grunn til å
            forvente.
          </p>
        </div>
      </section>

      {/* «Som den er»-forbeholdet */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Hva betyr «som den er»-forbeholdet?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            De fleste private bilsalg gjennomføres med «som den er»-forbehold.
            Det er viktig å forstå hva dette faktisk betyr – og hva det ikke
            betyr – for muligheten til å heve bilkjøpet.
          </p>
          <p className="text-slate-300">
            Etter kjøpsloven § 19 har bilen en mangel selv med «som den
            er»-forbehold dersom:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • <strong className="text-white">Uriktige opplysninger:</strong>{" "}
              Selger har gitt uriktige opplysninger om bilen som har virket inn
              på kjøpet. Eksempel: selger hevder bilen har kjørt 120 000 km, men
              den faktiske kilometerstanden er 180 000.
            </li>
            <li>
              • <strong className="text-white">Tilbakeholdte opplysninger:</strong>{" "}
              Selger har unnlatt å opplyse om vesentlige forhold ved bilen som
              han måtte kjenne til. Eksempel: selger vet at bilen har en
              oljelekkasje, men nevner det ikke.
            </li>
            <li>
              • <strong className="text-white">Vesentlig dårligere stand:</strong>{" "}
              Bilen er i vesentlig dårligere stand enn du hadde grunn til å
              forvente ut fra kjøpesummen og forholdene ellers. Dette er det
              mest brukte grunnlaget ved heving av bilkjøp mellom
              privatpersoner.
            </li>
          </ul>
          <p className="text-slate-300">
            Det siste alternativet er en helhetsvurdering der prisen er sentral.
            Jo høyere pris, desto mer kan du forvente. En bil kjøpt for 200 000
            kr skal gi vesentlig mer trygghet enn en til 30 000 kr. Men også en
            billig bil må fungere – en total motorfeil etter to uker kan gi
            grunnlag for heving selv om prisen var lav.
          </p>
        </div>
      </section>

      {/* Kravet om vesentlig mangel */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Kravet om vesentlig mangel ved heving
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Heving ved privatkjøp krever at mangelen er «vesentlig» etter
            kjøpsloven § 39. Terskelen er høy. Mangelen må være så alvorlig at
            det gir kjøper rimelig grunn til å si seg løst fra avtalen. Det er
            ikke nok at bilen har en feil – feilen må være av en slik karakter
            at kontraktsforholdet er vesentlig forrykket.
          </p>
          <p className="text-slate-300">
            Momenter som vektlegges i helhetsvurderingen:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • Reparasjonskostnaden sett opp mot kjøpesummen – feil som utgjør
              mer enn 15–20 % av prisen taler for heving
            </li>
            <li>
              • Om feilen påvirker bilens sikkerhet eller gjør den ubrukelig
            </li>
            <li>
              • Om mangelen kan avhjelpes ved retting eller prisavslag – dersom
              prisavslag er et rimelig alternativ, svekkes grunnlaget for heving
            </li>
            <li>
              • Selgers skyldgrad – visste selger om feilen, eller burde han
              ha visst?
            </li>
            <li>
              • Om kjøper har fått et rimelig tilbud om kompensasjon fra selger
            </li>
            <li>
              • Om det dreier seg om flere feil som samlet utgjør en vesentlig
              mangel
            </li>
          </ul>
          <p className="text-slate-300">
            Den konkrete vurderingen er avgjørende. Les mer om vilkårene i vår{" "}
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

      {/* Bevisbyrde */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Bevisbyrden ligger hos kjøper
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Ved privatkjøp er det ingen presumsjonsregel slik det er ved{" "}
            <Link
              href="/bilkjop/heving-forhandler"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              heving hos forhandler
            </Link>
            . Du som kjøper må sannsynliggjøre at mangelen forelå ved
            overtakelsestidspunktet – altså at feilen ikke oppsto etter at du
            tok over bilen.
          </p>
          <p className="text-slate-300">
            Praktisk betyr dette at du bør gjøre følgende så raskt som mulig
            etter at feilen er oppdaget:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • Få bilen undersøkt på et uavhengig verksted – helst ikke
              selgers eget
            </li>
            <li>
              • Be verkstedet vurdere om feilen sannsynligvis forelå ved
              overtakelsestidspunktet, basert på slitasje, korrosjon eller
              feilens art
            </li>
            <li>
              • Ta vare på all kommunikasjon med selger – skriftlig er best
            </li>
            <li>
              • Dokumenter salgsannonsen, kontrakten og eventuelle muntlige
              løfter fra selger
            </li>
            <li>
              • Fotografer feilen og noter datoen for oppdagelsen
            </li>
          </ul>
          <p className="text-slate-300">
            Jo raskere du handler etter at feilen oppdages, desto sterkere står
            du. En verkstedrapport innhentet kort tid etter oppdagelsen veier
            tyngre enn en som kommer måneder senere. Tidsmomentet er også
            viktig for{" "}
            <Link
              href="/bilkjop/heving-tidsfrist"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              tidsfrist for heving
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Retting og prisavslag */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Retting og prisavslag som alternativ
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Heving er den mest inngripende sanksjonen. Dersom mangelen ikke er
            vesentlig nok til heving, kan du likevel ha krav på retting eller
            prisavslag. Disse alternativene har lavere terskel og kan i mange
            tilfeller gi et godt resultat.
          </p>
          <div className="space-y-3 mt-2">
            <div className="border-l-2 border-emerald-500/40 pl-4">
              <p className="font-medium text-white">Retting</p>
              <p className="text-sm text-slate-400 mt-1">
                Selger reparerer feilen uten kostnad for deg. Ved privatkjøp er
                retting ikke en lovfestet rettighet for selger, men partene kan
                avtale det. Dersom selger tilbyr retting, bør du som regel
                akseptere – det styrker din posisjon dersom rettingen mislykkes
                og du senere krever heving.
              </p>
            </div>
            <div className="border-l-2 border-emerald-500/40 pl-4">
              <p className="font-medium text-white">Prisavslag</p>
              <p className="text-sm text-slate-400 mt-1">
                Du beholder bilen og får kompensasjon tilsvarende
                verdireduksjonen. Prisavslag krever bare at det foreligger en
                mangel – ingen krav om vesentlighet. Prisavslaget tilsvarer
                normalt reparasjonskostnaden.
              </p>
            </div>
          </div>
          <p className="text-slate-300 mt-4">
            Dersom prisavslag ikke kompenserer tilstrekkelig – for eksempel fordi
            feilen gjør bilen usikker å kjøre – har du sterkere grunn til å
            kreve heving av bilkjøpet.
          </p>
        </div>
      </section>

      {/* Reklamasjonsfrist */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Reklamasjonsfrister ved privatkjøp
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Ved heving bil privat gjelder strengere frister enn ved kjøp fra
            forhandler:
          </p>
          <div className="space-y-3 mt-2">
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                Absolutt frist: 2 år (kjøpsloven § 32)
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Du kan ikke gjøre mangler gjeldende senere enn 2 år etter at du
                overtok bilen. Fristen løper fra overtakelsestidspunktet, ikke
                fra kontraktsdato.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                Relativ frist: «Innen rimelig tid»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Du må reklamere innen rimelig tid etter at du oppdaget eller
                burde ha oppdaget feilen. Ved privatkjøp tolkes «rimelig tid»
                strengere enn ved forbrukerkjøp. 2–3 måneder er normalt
                innenfor, men raskere er bedre.
              </p>
            </div>
          </div>
          <p className="text-slate-300 mt-4">
            Les mer om{" "}
            <Link
              href="/bilkjop/heving-tidsfrist"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              tidsfrist for heving av bilkjøp
            </Link>{" "}
            i vår detaljerte guide.
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
                Eksempel 1: Girkassedefekt etter 3 uker
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Du kjøper en bil privat for 180 000 kr. Selger opplyser at
                bilen er i god stand og at «alt fungerer». Etter tre uker
                oppdager du at girkassen er defekt. Verkstedet anslår
                reparasjonskostnad på 55 000 kr og vurderer at skaden har
                utviklet seg over tid. Reparasjonskostnaden utgjør ca. 30 % av
                kjøpesummen, selger ga uriktige opplysninger, og du reagerte
                raskt. Her er sannsynligheten god for at du kan heve bilkjøpet.
              </p>
            </div>
            <div className="border-l-2 border-emerald-500/40 pl-4">
              <p className="font-medium text-white">
                Eksempel 2: Motorproblemer på billig bil
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Du kjøper en eldre bil privat for 45 000 kr. Etter to måneder
                stopper motoren. Verkstedet konstaterer at toppakningen er
                ødelagt – reparasjonskostnad ca. 25 000 kr. Selv om bilen var
                billig og eldre, utgjør reparasjonskostnaden over 50 % av
                kjøpesummen. Feilen er alvorlig nok til at heving kan være
                aktuelt, men du må sannsynliggjøre at feilen forelå ved
                kjøpstidspunktet.
              </p>
            </div>
            <div className="border-l-2 border-red-500/40 pl-4">
              <p className="font-medium text-white">
                Eksempel 3: Kjøper venter for lenge
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Du oppdager en oljelekkasje i mars, men reklamerer først i
                september. Selv om lekkasjen sannsynligvis forelå ved kjøpet,
                har du ventet for lenge. 6 måneder er normalt utenfor «rimelig
                tid» ved privatkjøp, og selger kan avvise kravet.
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
              • Kjøpsloven gjelder ved heving bil privat – ikke avhendingsloven
              eller forbrukerkjøpsloven
            </li>
            <li>
              • «Som den er» fritar ikke selger ved uriktige eller tilbakeholdte
              opplysninger, eller vesentlig avvik fra forventet stand
            </li>
            <li>
              • Heving krever vesentlig mangel etter § 39 – terskelen er høy
            </li>
            <li>
              • Bevisbyrden ligger hos kjøper – du må sannsynliggjøre at feilen
              forelå ved overtakelsen
            </li>
            <li>
              • Absolutt reklamasjonsfrist er 2 år fra overtakelse
            </li>
            <li>
              • Rask handling og god dokumentasjon er avgjørende
            </li>
            <li>
              • Prisavslag er et alternativ dersom vesentlighetskravet ikke er
              oppfylt
            </li>
          </ul>
          <p className="text-slate-300 mt-4">
            For en grundig gjennomgang av alle vilkårene, se vår{" "}
            <Link
              href="/bilkjop/heving"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              hovedguide til heving av bilkjøp
            </Link>
            . Kjøpte du bilen fra forhandler i stedet? Se{" "}
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
            Kjøpte bil privat med feil?
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
