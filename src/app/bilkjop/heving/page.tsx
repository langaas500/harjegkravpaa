"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, XOctagon, ChevronDown } from "lucide-react";
import SeoFloatingCTA from "@/components/SeoFloatingCTA";

export default function HevingPage() {
  const router = useRouter();

  return (
    <main className="bg-nordic text-white min-h-screen">

      {/* Sub-header navigation */}
      <nav className="border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex justify-end">
          <div className="flex items-center gap-8 text-base">
            <button
              onClick={() => router.push("/bilkjop")}
              className="text-white font-medium hover:text-slate-300 transition"
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

        {/* H1 */}
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <XOctagon className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Kan jeg heve bilkjøpet?
          </h1>
        </div>

        {/* Intro */}
        <p className="text-lg text-slate-300 mb-10">
          Heving betyr at kjøpet annulleres – du leverer tilbake bilen og får pengene igjen. Det høres enkelt ut, men i praksis er terskelen høy. Heving er den mest inngripende formen for misligholdsbeføyelse, og loven stiller strenge krav.
        </p>

        {/* CTA section */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center mb-10">
          <h2 className="text-xl font-bold mb-2">
            Lurer du på om du kan heve?
          </h2>
          <p className="text-slate-400 mb-5">
            Vurderingen avhenger av flere faktorer. Svar på noen spørsmål om ditt bilkjøp, så får du en vurdering av om heving kan være aktuelt i din sak.
          </p>
          <button
            onClick={() => router.push("/bilkjop")}
            className="inline-flex items-center gap-2 bg-white text-[#0c1220] px-6 py-3 rounded-full font-semibold hover:bg-slate-200 transition"
          >
            Sjekk saken din
            <ArrowRight className="h-5 w-5" />
          </button>
        </section>

        {/* Section: Hva er heving */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Hva betyr heving?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Heving innebærer at kjøpsavtalen oppheves. Bilen skal tilbake til selger, og du skal få tilbake det du betalte. I teorien stilles partene som om kjøpet aldri skjedde.
            </p>
            <p className="text-slate-300">
              Dette skiller seg fra andre krav som prisavslag eller retting. Ved heving er det ikke snakk om kompensasjon – det er snakk om å reversere hele transaksjonen.
            </p>
            <p className="text-slate-300">
              Nettopp fordi konsekvensene er så store, er vilkårene for heving strengere enn for andre krav.
            </p>
          </div>
        </section>

        {/* Section: Vesentlig mangel */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Kravet om vesentlig mangel
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              For å kunne heve må mangelen være vesentlig. Det holder ikke at bilen har en feil – feilen må være så alvorlig at det gir deg god grunn til å si deg løs fra avtalen.
            </p>
            <p className="text-slate-300">
              Hva som er «vesentlig» er en helhetsvurdering. Det finnes ingen fast grense, men noen momenter går igjen:
            </p>
            <ul className="text-slate-300 space-y-2 ml-4">
              <li>• Hvor alvorlig er feilen for bilens bruk og verdi?</li>
              <li>• Kan feilen utbedres, og hva vil det koste?</li>
              <li>• Har selger fått mulighet til å rette feilen?</li>
              <li>• Ville du kjøpt bilen hvis du visste om feilen?</li>
            </ul>
            <p className="text-slate-300">
              I praksis betyr dette at en enkelt feil sjelden er nok. Det er summen av mangler, eller en særlig alvorlig mangel, som kan gi grunnlag for heving.
            </p>
          </div>
        </section>

        {/* Section: Terskelen er høy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Terskelen er høy
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Det er viktig å forstå at heving ikke er førstevalget. Loven legger opp til at andre løsninger skal forsøkes først.
            </p>
            <div className="space-y-3 mt-4">
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Retting</p>
                <p className="text-sm text-slate-400 mt-1">
                  Selger har ofte rett til å forsøke å reparere feilen før du kan kreve heving.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Prisavslag</p>
                <p className="text-sm text-slate-400 mt-1">
                  Hvis feilen ikke er alvorlig nok til heving, kan du ha krav på prisavslag i stedet.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Omlevering</p>
                <p className="text-sm text-slate-400 mt-1">
                  Ved kjøp fra forhandler kan omlevering til en annen bil være et alternativ, selv om dette sjelden er praktisk ved bruktbil.
                </p>
              </div>
            </div>
            <p className="text-slate-300 mt-4">
              Heving kommer først på tale når disse alternativene ikke er tilstrekkelige eller ikke lar seg gjennomføre.
            </p>
          </div>
        </section>

        {/* Section: Når heving kan være aktuelt */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Når kan heving være aktuelt?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Selv om terskelen er høy, finnes det situasjoner der heving kan være riktig løsning:
            </p>
            <ul className="text-slate-300 space-y-2 ml-4">
              <li>• Bilen har gjentatte feil som ikke lar seg reparere</li>
              <li>• Feilen er så omfattende at bilen ikke kan brukes som forutsatt</li>
              <li>• Selger har gitt uriktige opplysninger om vesentlige forhold</li>
              <li>• Reparasjonsforsøk har mislyktes flere ganger</li>
            </ul>
            <p className="text-slate-300">
              Men selv i disse tilfellene er utfallet ikke gitt. Det avhenger alltid av en konkret vurdering av alle omstendighetene.
            </p>
          </div>
        </section>

        {/* Section: Praktiske konsekvenser */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Praktiske konsekvenser av heving
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Heving er ikke bare et juridisk spørsmål – det har også praktiske sider som må håndteres:
            </p>
            <ul className="text-slate-300 space-y-2 ml-4">
              <li>• Du må kunne levere tilbake bilen i vesentlig samme stand</li>
              <li>• Selger skal tilbakebetale kjøpesummen</li>
              <li>• Det kan oppstå spørsmål om bruksfradrag hvis du har kjørt bilen lenge</li>
              <li>• Eventuelle påkostninger du har gjort kan komplisere oppgjøret</li>
            </ul>
            <p className="text-slate-300">
              Dette er forhold som må avklares i den konkrete saken, og som kan påvirke hva du faktisk får tilbake.
            </p>
          </div>
        </section>

        {/* FAQ intro */}
        <p className="text-slate-300 mb-6">
          Spørsmålene under har ikke enkle svar. Heving er alltid en konkret vurdering, og utfallet avhenger av omstendighetene i din sak.
        </p>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Ofte stilte spørsmål
          </h2>
          <div className="space-y-4">
            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Kan jeg heve hvis bilen har vært på verksted flere ganger?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Gjentatte reparasjonsforsøk kan styrke et hevingskrav, men det er ikke automatisk nok. Det avhenger av hva som har vært forsøkt og om feilen faktisk lar seg utbedre.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Hvor lang tid har jeg på å kreve heving?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Du må reklamere innen rimelig tid etter at du oppdaget eller burde ha oppdaget mangelen. Jo lenger du venter, desto vanskeligere kan det bli å nå frem med hevingskravet.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Kan selger nekte heving og tilby reparasjon i stedet?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Ja, i mange tilfeller har selger rett til å forsøke retting først. Men denne retten er ikke ubegrenset – særlig hvis reparasjonsforsøk allerede har mislyktes.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Får jeg tilbake alt jeg betalte ved heving?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                I utgangspunktet ja, men det kan gjøres fradrag for den bruken du har hatt av bilen. Dette varierer og må vurderes konkret.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Er det lettere å heve ved kjøp fra forhandler enn privat?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Forbrukerkjøpsloven gir noe sterkere vern ved kjøp fra forhandler, men kravet om vesentlig mangel gjelder uansett. Terskelen for heving er høy i begge tilfeller.
              </div>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section data-final-cta="true" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <h2 className="text-xl font-bold mb-2">
            Usikker på om du kan heve?
          </h2>
          <p className="text-slate-400 mb-5">
            Heving må alltid vurderes konkret ut fra din situasjon. Svar på noen spørsmål om ditt bilkjøp, så får du en vurdering av hvilke krav du kan ha.
          </p>
          <button
            onClick={() => router.push("/bilkjop")}
            className="inline-flex items-center gap-2 bg-white text-[#0c1220] px-6 py-3 rounded-full font-semibold hover:bg-slate-200 transition"
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
