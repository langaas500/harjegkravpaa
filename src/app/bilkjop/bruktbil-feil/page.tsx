"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Car, ChevronDown } from "lucide-react";
import SeoFloatingCTA from "@/components/SeoFloatingCTA";

export default function BruktbilFeilPage() {
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
            <Car className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Feil på bruktbil – når har du krav?
          </h1>
        </div>

        {/* Intro */}
        <p className="text-lg text-slate-300 mb-10">
          Har du kjøpt en bruktbil som viser seg å ha feil? Da kan du ha krav mot selger. Men ikke alle feil gir rett til reklamasjon. Her forklarer vi hva som regnes som en mangel i juridisk forstand, og hva du kan forvente av en bruktbil.
        </p>

        {/* Section: Hva er en mangel */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Hva er en mangel?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              I juridisk forstand foreligger det en mangel når bilen ikke samsvarer med det som ble avtalt, eller når den er i vesentlig dårligere stand enn du hadde grunn til å forvente ut fra kjøpesummen og omstendighetene.
            </p>
            <p className="text-slate-300">
              Både kjøpsloven og forbrukerkjøpsloven bruker begrepet «mangel» som grunnlag for kjøpers rettigheter. En mangel kan være fysisk (teknisk feil), rettslig (heftelser) eller knyttet til opplysninger selger ga eller burde gitt.
            </p>
            <p className="text-slate-300">
              Det er ikke tilstrekkelig at du er misfornøyd med kjøpet. Mangelen må være reell og objektiv – det vil si at bilen faktisk avviker fra det du hadde grunn til å forvente.
            </p>
          </div>
        </section>

        {/* Section: Skjulte feil */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Skjulte feil
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              En skjult feil er en feil som ikke var synlig eller oppdagbar ved vanlig undersøkelse på kjøpstidspunktet. Dette skillet er viktig fordi åpenbare feil – feil du burde ha sett – normalt ikke gir grunnlag for reklamasjon.
            </p>
            <p className="text-slate-300">
              Typiske skjulte feil inkluderer:
            </p>
            <ul className="text-slate-300 space-y-2 ml-4">
              <li>• Motorproblemer som ikke ga symptomer ved prøvekjøring</li>
              <li>• Rust under bunnplater eller i hulrom</li>
              <li>• Feil i girkasse eller clutch som viser seg etter noe kjøring</li>
              <li>• Elektriske feil som oppstår sporadisk</li>
              <li>• Lekkasjer som ikke var synlige ved visning</li>
              <li>• Tidligere kollisjonsskader som er skjult med reparasjon</li>
            </ul>
            <p className="text-slate-300">
              Dersom feilen fantes på kjøpstidspunktet, men viste seg først senere, kan du fortsatt ha krav. Det avgjørende er om feilen var til stede ved overtakelsen – ikke når du oppdaget den.
            </p>
          </div>
        </section>

        {/* Section: Forventet tilstand */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Hva kan du forvente av en bruktbil?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              En bruktbil er ikke en ny bil. Det betyr at du må akseptere en viss grad av slitasje og aldersrelaterte svakheter. Forventningene justeres ut fra flere faktorer:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <p className="font-medium text-white mb-2">Alder</p>
                <p className="text-sm text-slate-400">
                  En 15 år gammel bil vil naturlig ha mer slitasje enn en 3 år gammel bil. Komponenter som drivrem, bremser og støtdempere har begrenset levetid.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <p className="font-medium text-white mb-2">Kilometerstand</p>
                <p className="text-sm text-slate-400">
                  En bil med 200 000 km vil ha større slitasje enn en med 50 000 km. Visse komponenter er forbruksvarer og må påregnes byttet.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <p className="font-medium text-white mb-2">Pris</p>
                <p className="text-sm text-slate-400">
                  En bil til 30 000 kr kan ikke sammenlignes med en til 300 000 kr. Lav pris kan indikere at selger har priset inn risiko for feil.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <p className="font-medium text-white mb-2">Opplysninger</p>
                <p className="text-sm text-slate-400">
                  Hva selger sa om bilen har betydning. Dersom selger fremhevet at bilen var i god stand, skjerpes forventningene.
                </p>
              </div>
            </div>
            <p className="text-slate-300 mt-4">
              Hovedregelen er at bilen skal være i den stand kjøperen hadde grunn til å forvente. Dette er en helhetsvurdering der alle relevante forhold tas i betraktning.
            </p>
          </div>
        </section>

        {/* Section: Typiske feil */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Typiske feil som oppstår etter kjøp
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Noen feiltyper går igjen i tvister om bruktbilkjøp. Her er de vanligste:
            </p>

            <div className="space-y-4 mt-4">
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Motor og drivverk</p>
                <p className="text-sm text-slate-400 mt-1">
                  Høyt oljeforbruk, røykutvikling, motorbråk, girkasseproblemer og defekt clutch. Disse feilene er ofte kostbare å utbedre og kan gi grunnlag for betydelige krav.
                </p>
              </div>

              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Rust</p>
                <p className="text-sm text-slate-400 mt-1">
                  Gjennomrusting i bærende konstruksjoner, rust i hjulbuer eller under bunnplater. Særlig alvorlig dersom det påvirker bilens sikkerhet eller medfører at den ikke kan EU-godkjennes.
                </p>
              </div>

              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Elektriske problemer</p>
                <p className="text-sm text-slate-400 mt-1">
                  Feil i styreenheter, sensorer, ladeproblemer på elbil/hybrid, eller defekte komponenter som ABS, ESP eller airbag. Kan være sikkerhetskritisk.
                </p>
              </div>

              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Tidligere skader</p>
                <p className="text-sm text-slate-400 mt-1">
                  Kollisjonsskader som ikke ble opplyst om, eller reparasjoner utført på en måte som påvirker bilens verdi eller sikkerhet. Kan også gjelde vannskader eller brannskader.
                </p>
              </div>

              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Feil kilometerstand</p>
                <p className="text-sm text-slate-400 mt-1">
                  Dersom kilometertelleren er manipulert, foreligger det en mangel uavhengig av bilens faktiske tilstand. Dette regnes som en alvorlig opplysningssvikt.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Mangel vs. slitasje */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Mangel eller normal slitasje?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Det er et viktig skille mellom feil som utgjør en mangel, og slitasje du må påregne på en bruktbil.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
                <p className="font-medium text-emerald-400 mb-2">Kan være mangel</p>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Motorhavari kort tid etter kjøp</li>
                  <li>• Skjult rust i bærende konstruksjon</li>
                  <li>• Feil som selger kjente til, men ikke opplyste om</li>
                  <li>• Vesentlig avvik fra det som ble avtalt</li>
                  <li>• Sikkerhetskritiske feil</li>
                </ul>
              </div>
              <div className="rounded-lg border border-slate-500/30 bg-slate-500/5 p-4">
                <p className="font-medium text-slate-400 mb-2">Normalt slitasje</p>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Slitte bremser på eldre bil</li>
                  <li>• Aldersrelatert falming av lakk</li>
                  <li>• Mindre steinsprut i frontrute</li>
                  <li>• Slitasje i interiør</li>
                  <li>• Komponenter som har nådd normal levetid</li>
                </ul>
              </div>
            </div>

            <p className="text-slate-300 mt-4">
              Grensen er ikke alltid klar, og mange saker havner i en gråsone. Det avgjørende er hva en kjøper med rimelig grunn kunne forvente ut fra de konkrete omstendighetene ved kjøpet.
            </p>
          </div>
        </section>

        {/* Section: Opplysningssvikt */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Opplysningssvikt fra selger
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              En mangel kan også foreligge dersom selger har holdt tilbake opplysninger som ville hatt betydning for kjøpet. Dette gjelder selv om bilen teknisk sett fungerer.
            </p>
            <p className="text-slate-300">
              Selger har plikt til å opplyse om forhold ved bilen som han kjente til eller måtte kjenne til, og som kjøperen hadde grunn til å regne med å få. Eksempler:
            </p>
            <ul className="text-slate-300 space-y-2 ml-4">
              <li>• Bilen har vært kollisjonsskadet</li>
              <li>• Bilen har vært brukt som drosje eller leiebil</li>
              <li>• Det er utført billige nødreparasjoner</li>
              <li>• Bilen har kjente feil som ikke er utbedret</li>
              <li>• Servicehistorikken er mangelfull eller ukjent</li>
            </ul>
            <p className="text-slate-300">
              Dersom selger bevisst har holdt tilbake slike opplysninger, står kjøper sterkere. Opplysningssvikt kan også påvirke vurderingen av «som den er»-forbehold.
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
                <span className="font-medium">Hva er forskjellen på feil og mangel?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                En feil er en teknisk svikt eller defekt. En mangel er et juridisk begrep som betyr at bilen avviker fra det som ble avtalt eller fra det kjøperen hadde grunn til å forvente. Alle mangler innebærer feil, men ikke alle feil utgjør en mangel i juridisk forstand.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Kan jeg klage på slitedeler?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Normalt ikke. Bremser, clutch, registerreim og lignende har begrenset levetid og må påregnes byttet. Men dersom selger opplyste at bremser var nye, eller dersom delene svikter unormalt tidlig, kan det likevel foreligge en mangel.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Hva hvis feilen oppstår etter noen måneder?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Det avgjørende er om feilen fantes på kjøpstidspunktet, ikke når den viste seg. En skjult defekt som gir symptomer først etter noen måneders bruk kan fortsatt være en mangel. Ved kjøp fra forhandler gjelder en formodning om at feil som viser seg innen ett år fantes ved levering.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Gjelder det samme ved privatkjøp og forhandlerkjøp?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Reglene for hva som utgjør en mangel er i hovedsak like. Forskjellen ligger i bevisbyrde, reklamasjonsfrister og hvilken lov som gjelder. Ved kjøp fra forhandler har du sterkere vern som forbruker.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Hva betyr «som den er»?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                «Som den er» er et forbehold som overfører risiko til kjøper. Men det beskytter ikke selger mot skjulte feil, opplysningssvikt eller vesentlige avvik. Fra 2024 er slike klausuler ugyldige ved kjøp fra forhandler.
              </div>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section data-final-cta="true" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <h2 className="text-xl font-bold mb-2">
            Lurer du på om du har en sak?
          </h2>
          <p className="text-slate-400 mb-5">
            Svar på noen spørsmål om ditt bilkjøp, så får du en vurdering av om du kan ha krav mot selger.
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
