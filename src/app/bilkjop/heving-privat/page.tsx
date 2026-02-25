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

export default function HevingPrivatPage() {
  return (
    <BilSeoHero
      eyebrow="Forbrukerrettigheter"
      h1Top="Heving av bilkjøp"
      h1Accent="mellom privatpersoner"
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Kjøpte du bil av en privatperson og oppdaget alvorlige feil? Da
          reguleres kjøpet av kjøpsloven. Heving er mulig, men terskelen er
          høyere enn ved kjøp fra forhandler.
        </p>
      }
      heroImageAlt="Heving av bilkjøp mellom privatpersoner – dine rettigheter"
      primaryCtaTitle="Kjøpte du bil privat med skjulte feil?"
      primaryCtaText="Svar på noen spørsmål om bilkjøpet ditt og få en veiledende vurdering av om du kan kreve heving, prisavslag eller retting."
      primaryCtaButton="Sjekk om du har krav"
      secondaryCtaText="Sjekk saken din nå →"
    >
      {/* Kjøpsloven, ikke avhendingsloven */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Kjøpsloven regulerer private bilkjøp
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Når to privatpersoner handler bil, er det kjøpsloven som gjelder –
            ikke avhendingsloven (som gjelder fast eiendom) og ikke
            forbrukerkjøpsloven (som gjelder kjøp fra næringsdrivende).
          </p>
          <p className="text-slate-300">
            Kjøpsloven gir begge parter avtalefrihet. Det betyr at selger kan ta
            forbehold, og partene kan avtale vilkår som fraviker loven. Det
            vanligste forbeholdet er «som den er».
          </p>
          <p className="text-slate-300">
            Selv om kjøpsloven gir et svakere vern enn forbrukerkjøpsloven, har
            du fortsatt rettigheter dersom bilen har en mangel.
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
            Mange tror dette fritar selger for alt ansvar. Det stemmer ikke.
          </p>
          <p className="text-slate-300">
            Etter kjøpsloven § 19 har bilen en mangel selv med «som den
            er»-forbehold dersom:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • Selger har gitt uriktige opplysninger om bilen som har virket
              inn på kjøpet
            </li>
            <li>
              • Selger har unnlatt å opplyse om vesentlige forhold ved bilen som
              han måtte kjenne til
            </li>
            <li>
              • Bilen er i vesentlig dårligere stand enn kjøper hadde grunn til
              å forvente ut fra kjøpesummen og forholdene ellers
            </li>
          </ul>
          <p className="text-slate-300">
            Det siste alternativet er det mest brukte ved{" "}
            <Link
              href="/bilkjop/heving"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              heving av bilkjøp
            </Link>
            . Vurderingen er konkret og tar hensyn til pris, alder,
            kilometerstand og hva som ble opplyst.
          </p>
        </div>
      </section>

      {/* Vesentlig mangel */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Kravet om vesentlig mangel ved heving
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Heving krever at mangelen er «vesentlig» etter kjøpsloven § 39.
            Terskelen er høy. Mangelen må være så alvorlig at det gir kjøper
            rimelig grunn til å si seg løst fra avtalen.
          </p>
          <p className="text-slate-300">
            Momenter som vektlegges i helhetsvurderingen:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>• Reparasjonskostnaden sett opp mot kjøpesummen</li>
            <li>• Om feilen påvirker bilens sikkerhet eller brukbarhet</li>
            <li>• Om mangelen kan avhjelpes ved retting eller prisavslag</li>
            <li>• Selgers skyldgrad – visste selger om feilen?</li>
            <li>• Om kjøper har fått et rimelig tilbud om kompensasjon</li>
          </ul>
          <p className="text-slate-300">
            Dersom reparasjonskostnaden utgjør en betydelig andel av
            kjøpesummen, og feilen ikke var opplyst, taler det for heving. Les
            mer i vår{" "}
            <Link
              href="/bilkjop/heving"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              hovedguide til heving
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
            Ved privatkjøp er det ingen presumsjonsregel slik det er ved
            forhandlerkjøp. Du som kjøper må sannsynliggjøre at mangelen forelå
            ved overtakelsestidspunktet.
          </p>
          <p className="text-slate-300">
            Praktisk betyr dette at du bør:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>• Få bilen undersøkt på verksted så raskt som mulig</li>
            <li>
              • Be verkstedet vurdere om feilen sannsynligvis forelå ved
              kjøpet
            </li>
            <li>• Ta vare på all kommunikasjon med selger</li>
            <li>
              • Dokumentere annonsen, kontrakten og eventuelle muntlige
              opplysninger
            </li>
          </ul>
          <p className="text-slate-300">
            Jo raskere du handler etter at feilen oppdages, desto sterkere står
            du.
          </p>
        </div>
      </section>

      {/* Praktisk eksempel */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Praktisk eksempel</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Du kjøper en bil privat for 180 000 kr. Selger opplyser at bilen er
            i god stand og at «alt fungerer». Etter tre uker oppdager du at
            girkassen er defekt. Verkstedet anslår reparasjonskostnad på
            55 000 kr og vurderer at skaden har utviklet seg over tid.
          </p>
          <p className="text-slate-300">
            Her foreligger sannsynligvis en mangel: bilen var i vesentlig
            dårligere stand enn forventet ut fra pris og opplysninger. Selger
            opplyste at «alt fungerer», noe som forsterker din posisjon.
            Reparasjonskostnaden utgjør ca. 30 % av kjøpesummen, som kan oppfylle
            vesentlighetskravet.
          </p>
          <p className="text-slate-300">
            Resultatet avhenger av en konkret helhetsvurdering –{" "}
            <Link
              href="/bilkjop"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              sjekk om du har krav i din situasjon
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Kort oppsummert */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Kort oppsummert</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>• Kjøpsloven gjelder – ikke avhendingsloven eller forbrukerkjøpsloven</li>
            <li>• «Som den er» fritar ikke selger ved uriktige/tilbakeholdte opplysninger eller vesentlig avvik</li>
            <li>• Heving krever vesentlig mangel – terskelen er høy</li>
            <li>• Bevisbyrden ligger hos kjøper ved privatkjøp</li>
            <li>• Dokumentasjon og rask handling er avgjørende</li>
            <li>• Prisavslag kan være et alternativ dersom mangelen ikke oppfyller vesentlighetskravet</li>
          </ul>
          <p className="text-slate-300 mt-4">
            For en grundigere gjennomgang av{" "}
            <Link
              href="/bilkjop/heving"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              hva som kreves for å heve kjøpet
            </Link>
            , se vår hovedside om heving.
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
    </BilSeoHero>
  );
}
