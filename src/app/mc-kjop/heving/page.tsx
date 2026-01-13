"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, RotateCcw, ChevronDown } from "lucide-react";
import SeoFloatingCTA from "@/components/SeoFloatingCTA";

export default function McHevingPage() {
  const router = useRouter();

  return (
    <main className="bg-nordic text-white min-h-screen">

      {/* Sub-header navigation */}
      <nav className="border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex justify-end">
          <div className="flex items-center gap-8 text-base">
            <button
              onClick={() => router.push("/bilkjop")}
              className="text-slate-400 hover:text-white transition"
            >
              Bilkjøp
            </button>
            <button
              onClick={() => router.push("/flyreiser")}
              className="text-slate-400 hover:text-white transition"
            >
              Flyreiser
            </button>
            <button
              onClick={() => router.push("/bilkjop")}
              className="text-white hover:text-slate-300 transition"
            >
              Sjekk saken din →
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 py-12">

        {/* Sone 1: Rask avklaring */}
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <RotateCcw className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Heving av MC-kjøp – når kan du kreve å levere tilbake motorsykkelen?
          </h1>
        </div>

        <p className="text-lg text-slate-300 mb-10">
          Heving betyr at kjøpet går tilbake – du leverer motorsykkelen, og selger tilbakebetaler kjøpesummen. Det høres enkelt ut, men terskelen er høy. Heving krever at mangelen er vesentlig, og vurderingen er den samme enten det gjelder MC eller bil.
        </p>

        {/* Sone 2: Tidlig beslutningsanker */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center mb-10">
          <h2 className="text-xl font-bold mb-2">
            Lurer du på om du kan heve MC-kjøpet?
          </h2>
          <p className="text-slate-400 mb-5">
            Om heving er aktuelt avhenger av feilens art, omfang og hvordan saken har utviklet seg. Det krever en konkret vurdering.
          </p>
          <button
            onClick={() => router.push("/bilkjop")}
            className="inline-flex items-center gap-2 bg-[#1F4F45] text-[#ECFDF5] px-6 py-3 rounded-xl font-semibold hover:bg-[#246457] transition"
          >
            Sjekk saken din
            <ArrowRight className="h-5 w-5" />
          </button>
        </section>

        {/* Sone 3: Forklaring */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Hva betyr heving i juridisk forstand?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Heving innebærer at kjøpsavtalen oppheves. Begge parter leverer tilbake det de har mottatt: Du gir tilbake motorsykkelen, og selger tilbakebetaler kjøpesummen.
            </p>
            <p className="text-slate-300">
              Heving er det sterkeste kravet du kan fremme ved et kjøp som har gått galt. Derfor stilles det strenge krav – mangelen må være vesentlig for at heving skal være aktuelt.
            </p>
            <p className="text-slate-300">
              Det er ikke tilstrekkelig at du er misfornøyd eller at det foreligger en feil. Spørsmålet er om feilen er så alvorlig at det gir grunn til å oppheve hele avtalen.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Når kan du ha krav på heving av MC-kjøp?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Heving forutsetter at det foreligger en mangel, og at mangelen er vesentlig. Det kan være tilfellet ved:
            </p>
            <ul className="text-slate-300 space-y-2 ml-4">
              <li>• Alvorlige tekniske feil som påvirker sikkerhet eller bruk</li>
              <li>• Gjentatte reparasjonsforsøk uten at feilen blir løst</li>
              <li>• Skjulte feil av betydelig omfang</li>
              <li>• Opplysningssvikt om vesentlige forhold ved MC-en</li>
              <li>• Feil kilometerstand eller skjult ulykkeshistorikk</li>
            </ul>
            <p className="text-slate-300 mt-4">
              I vurderingen ser man på feilens betydning for deg som kjøper, reparasjonskostnader, og om selger har fått rimelig mulighet til å rette feilen.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Når er heving som regel ikke aktuelt?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Heving er forbeholdt de alvorligste tilfellene. Mange feil gir rett til andre krav, men ikke heving.
            </p>
            <div className="space-y-3 mt-4">
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Mindre feil</p>
                <p className="text-sm text-slate-400 mt-1">
                  Feil som kan utbedres uten urimelig kostnad eller ulempe gir normalt ikke grunnlag for heving.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Normal slitasje</p>
                <p className="text-sm text-slate-400 mt-1">
                  Slitasje som må påregnes på en brukt MC er ikke en mangel, og gir dermed ikke grunnlag for heving.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Forhold som kan løses med prisavslag</p>
                <p className="text-sm text-slate-400 mt-1">
                  Hvis mangelen kan kompenseres med et forholdsmessig prisavslag, vil det ofte være den riktige løsningen.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Privatkjøp vs. kjøp fra forhandler
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Reglene om heving gjelder både ved kjøp fra forhandler og fra privatperson, men det er forskjeller i vernet.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <p className="font-medium text-white mb-2">Fra forhandler</p>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• Forbrukerkjøpsloven gjelder</li>
                  <li>• Bevisregel innen seks måneder</li>
                  <li>• Lengre reklamasjonsfrist (5 år)</li>
                  <li>• Sterkere vern som forbruker</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <p className="font-medium text-white mb-2">Fra privatperson</p>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• Kjøpsloven gjelder</li>
                  <li>• Du må bevise at feilen fantes</li>
                  <li>• Kortere frist (2 år)</li>
                  <li>• Bevisbyrden ligger på deg</li>
                </ul>
              </div>
            </div>
            <p className="text-slate-300 mt-4">
              Kravet om vesentlig mangel gjelder uansett, men ved privatkjøp kan det være vanskeligere å nå frem med hevingskrav.
            </p>
          </div>
        </section>

        {/* Sone 4: Vanlige feil / avslag / misforståelser */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Hvorfor får mange avslag på krav om heving?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Heving er et strengt krav, og mange som krever det får avslag. Det skyldes ofte at vilkårene ikke er oppfylt.
            </p>
            <div className="space-y-3 mt-4">
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Terskelen er høy</p>
                <p className="text-sm text-slate-400 mt-1">
                  Mange feil som oppleves som alvorlige, vurderes likevel ikke som vesentlige nok til heving.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Manglende dokumentasjon</p>
                <p className="text-sm text-slate-400 mt-1">
                  Uten verkstedrapporter eller annen dokumentasjon kan det være vanskelig å bevise feilens omfang.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Selger har ikke fått rette</p>
                <p className="text-sm text-slate-400 mt-1">
                  Hvis du ikke har gitt selger mulighet til å reparere, kan hevingskravet bli avvist.
                </p>
              </div>
            </div>
            <p className="text-slate-300 mt-4">
              At du får avslag på heving betyr ikke at du er uten rettigheter. Prisavslag eller erstatning kan fortsatt være aktuelt.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Ofte stilte spørsmål
          </h2>
          <div className="space-y-4">
            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Kan jeg heve kjøpet hvis motoren ryker?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Det kan du ha krav på, men det avhenger av MC-ens alder, pris, kilometerstand og hva som ble opplyst ved kjøpet. Motorhavari kort tid etter kjøp kan tale for heving, men det må vurderes konkret.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Hvor lang tid har jeg på å kreve heving?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Du må reklamere innen rimelig tid etter at du oppdaget feilen. Den absolutte fristen er to år ved privatkjøp og fem år ved kjøp fra forhandler for feil som forventes å vare.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Må selger få forsøke å reparere først?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Som hovedregel ja. Selger har rett til å forsøke å rette mangelen før du kan kreve heving. Unntak kan gjelde hvis reparasjon er umulig eller medfører vesentlig ulempe for deg.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Gjelder heving ved privat MC-kjøp?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Ja, kjøpsloven gir deg rett til å heve også ved privatkjøp. Men bevisbyrden er strengere, og det kan være vanskeligere å nå frem enn ved kjøp fra forhandler.
              </div>
            </details>
          </div>
        </section>

        {/* Sone 5: Avslutning */}
        <section data-final-cta="true" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <h2 className="text-xl font-bold mb-2">
            Heving vurderes alltid konkret
          </h2>
          <p className="text-slate-400 mb-5">
            Om du har grunnlag for å kreve heving avhenger av de faktiske omstendighetene i din sak. Svar på noen spørsmål om ditt MC-kjøp, så får du en vurdering.
          </p>
          <button
            onClick={() => router.push("/bilkjop")}
            className="inline-flex items-center gap-2 bg-[#1F4F45] text-[#ECFDF5] px-6 py-3 rounded-xl font-semibold hover:bg-[#246457] transition"
          >
            Sjekk saken din
            <ArrowRight className="h-5 w-5" />
          </button>
        </section>

        {/* Legal disclaimer */}
        <p className="text-xs text-slate-600 text-center mt-8">
          Innholdet er generell informasjon og ikke juridisk rådgivning. Reglene følger av kjøpsloven og forbrukerkjøpsloven.
        </p>
      </article>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 px-4 mt-10">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-slate-500">
          <span>© 2025 harjegkravpå.no</span>
          <span>Veiledende informasjon, ikke juridisk rådgivning</span>
        </div>
      </footer>

      <SeoFloatingCTA href="/bilkjop" />
    </main>
  );
}
