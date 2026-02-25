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
          feilen.
        </p>
      }
      heroImageAlt="Tidsfrist for å heve bilkjøp – reklamasjonsfrist og absolutte frister"
      primaryCtaTitle="Usikker på om du er innenfor fristen?"
      primaryCtaText="Svar på noen spørsmål om bilkjøpet ditt og få en veiledende vurdering av om du fortsatt kan gjøre krav gjeldende."
      primaryCtaButton="Sjekk fristen din"
      secondaryCtaText="Sjekk saken din nå →"
    >
      {/* To typer frister */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          To frister du må holde deg innenfor
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            For å heve et bilkjøp må du overholde to separate frister. Bryter
            du én av dem, taper du retten til å gjøre mangelen gjeldende –
            uavhengig av hvor berettiget kravet ellers er.
          </p>
          <div className="space-y-3 mt-2">
            <div className="border-l-2 border-emerald-500/40 pl-4">
              <p className="font-medium text-white">Relativ reklamasjonsfrist</p>
              <p className="text-sm text-slate-400 mt-1">
                Du må reklamere «innen rimelig tid» etter at du oppdaget eller
                burde oppdaget mangelen. Denne fristen løper fra
                oppdagelsestidspunktet.
              </p>
            </div>
            <div className="border-l-2 border-emerald-500/40 pl-4">
              <p className="font-medium text-white">Absolutt reklamasjonsfrist</p>
              <p className="text-sm text-slate-400 mt-1">
                En ytre ramme som setter en endelig grense for når du kan
                reklamere, uavhengig av når feilen ble oppdaget.
              </p>
            </div>
          </div>
          <p className="text-slate-300 mt-4">
            Begge fristene må være oppfylt. Du finner en grundig gjennomgang av
            hevingsvilkårene i vår{" "}
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
            av:
          </p>
          <div className="space-y-3 mt-2">
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                Privatkjøp: 2 år (kjøpsloven § 32)
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Ved kjøp mellom privatpersoner er den absolutte fristen 2 år
                fra overtakelse. Selger kan ikke avtale en kortere frist.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                Forhandlerkjøp: 5 år (forbrukerkjøpsloven § 27)
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Dersom tingen er ment å vare vesentlig lenger enn 2 år – noe
                biler normalt er – gjelder en absolutt frist på 5 år.
                Forhandler kan ikke avtale denne bort.
              </p>
            </div>
          </div>
          <p className="text-slate-300 mt-4">
            Merk at den absolutte fristen alene ikke er nok. Du må også ha
            reklamert innen rimelig tid etter at du oppdaget mangelen.
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
            antall dager. Høyesterett har uttalt at 2 måneder normalt er innenfor
            ved forbrukerkjøp (Rt-2013-865). Ved privatkjøp er vurderingen
            strengere.
          </p>
          <p className="text-slate-300">
            Momenter som påvirker vurderingen:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>• Feilens art – noen feil krever undersøkelse før du kan reklamere</li>
            <li>• Om du trengte tid til å avklare omfanget av mangelen</li>
            <li>• Om du har vært i dialog med selger om feilen</li>
            <li>• Ferien eller andre praktiske hindringer</li>
          </ul>
          <p className="text-slate-300">
            Hovedregelen er enkel: reklamer så raskt du kan etter at du oppdager
            feilen. Jo lenger du venter, desto større risiko for at reklamasjonen
            anses for sen.
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
            Starttidspunktet for fristene er forskjellig:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              <strong className="text-white">Absolutt frist:</strong> Løper fra
              overtakelsestidspunktet – det vil si dagen du faktisk mottok
              bilen, ikke datoen kontrakten ble signert.
            </li>
            <li>
              <strong className="text-white">Relativ frist:</strong> Løper fra
              det tidspunktet du oppdaget eller burde oppdaget mangelen. En
              skjult feil som viser seg etter 18 måneder starter den relative
              fristen på dette tidspunktet.
            </li>
          </ul>
          <p className="text-slate-300">
            Et praktisk råd: noter datoen du oppdaget feilen, og reklamer
            skriftlig så snart som mulig. Dokumentasjon av tidspunktet kan bli
            avgjørende dersom selger bestrider at reklamasjonen var rettidig.
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
                Feil innen 6 måneder har dessuten bevispresumpsjon i din favør.
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
                ved kjøpet.
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
                fremsatt.
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
            <li>• Du må overholde både den relative og den absolutte fristen</li>
            <li>• Privatkjøp: 2 års absolutt frist fra overtakelse</li>
            <li>• Forhandlerkjøp: 5 års absolutt frist fra overtakelse</li>
            <li>• Reklamer innen rimelig tid – normalt innen 2–3 måneder etter oppdagelse</li>
            <li>• Fristene løper fra overtakelse (absolutt) og oppdagelse (relativ)</li>
            <li>• For sen reklamasjon = tapt krav, uansett feilens alvorlighet</li>
          </ul>
          <p className="text-slate-300 mt-4">
            For å forstå de øvrige vilkårene for{" "}
            <Link
              href="/bilkjop/heving"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              heving av bilkjøp
            </Link>
            , se vår hovedside.
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
    </BilSeoHero>
  );
}
