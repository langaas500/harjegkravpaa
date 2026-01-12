"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Shield, ChevronDown } from "lucide-react";
import SeoFloatingCTA from "@/components/SeoFloatingCTA";

export default function GarantiPage() {
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
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Garanti på bil – hva gjelder egentlig?
          </h1>
        </div>

        {/* Intro */}
        <p className="text-lg text-slate-300 mb-10">
          Mange tror at garanti og reklamasjon er det samme. Det er det ikke. Garanti er noe selger tilbyr frivillig, mens reklamasjonsretten følger av loven. Her forklarer vi hva garanti faktisk innebærer, og hvorfor det ikke alltid gir deg de rettighetene du kanskje tror.
        </p>

        {/* CTA section */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center mb-10">
          <h2 className="text-xl font-bold mb-2">
            Gjelder garantien egentlig din situasjon?
          </h2>
          <p className="text-slate-400 mb-5">
            Mange får avslag fordi garantien har begrensninger, selv om de fortsatt kan ha rettigheter etter loven. Det avgjørende er ikke bare hva garantien sier, men hvordan feilen oppstod og hva som ble avtalt ved kjøpet.
          </p>
          <button
            onClick={() => router.push("/bilkjop")}
            className="inline-flex items-center gap-2 bg-white text-[#0c1220] px-6 py-3 rounded-full font-semibold hover:bg-slate-200 transition"
          >
            Sjekk saken din
            <ArrowRight className="h-5 w-5" />
          </button>
        </section>

        {/* Section: Hva er garanti */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Hva er garanti?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Garanti er en frivillig forpliktelse fra selger eller produsent. Det er et løfte om at bilen skal fungere i en bestemt periode, og at visse feil vil bli utbedret uten kostnad for deg.
            </p>
            <p className="text-slate-300">
              Det viktige å forstå er at garanti kommer i tillegg til dine lovfestede rettigheter – den erstatter dem ikke. Du kan altså ha rettigheter selv om garantien har utløpt eller ikke dekker feilen.
            </p>
            <p className="text-slate-300">
              Garantien gjelder på de vilkårene selger har satt. Det betyr at den kan ha begrensninger som ikke finnes i reklamasjonsretten.
            </p>
          </div>
        </section>

        {/* Section: Garanti vs reklamasjon */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Garanti er ikke det samme som reklamasjon
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Dette er et vanlig misforståelse. Mange opplever at selger avviser krav med begrunnelsen «garantien er utløpt». Men reklamasjonsretten gjelder uavhengig av garantien.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <p className="font-medium text-white mb-2">Garanti</p>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• Frivillig fra selger</li>
                  <li>• Egne vilkår og unntak</li>
                  <li>• Ofte tidsbegrenset</li>
                  <li>• Kan kreve service hos bestemt verksted</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <p className="font-medium text-white mb-2">Reklamasjon</p>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• Lovfestet rett</li>
                  <li>• Gjelder mangler ved kjøpet</li>
                  <li>• 2 år (privat) / 5 år (forhandler)</li>
                  <li>• Kan ikke avtales bort</li>
                </ul>
              </div>
            </div>
            <p className="text-slate-300 mt-4">
              Dersom garantien avslår kravet ditt, betyr det ikke nødvendigvis at du står uten rettigheter. Det kan fortsatt foreligge en mangel som gir grunnlag for reklamasjon.
            </p>
            <p className="text-slate-300 mt-4">
              I praksis er det ofte helhetsvurderingen av kjøpet som avgjør om du har et krav – ikke garantien alene.
            </p>
          </div>
        </section>

        {/* Section: Vilkår og begrensninger */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Vilkår og begrensninger i garantien
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Garantier har ofte vilkår som begrenser hva som dekkes. Det er viktig å kjenne til disse før du antar at feilen er dekket.
            </p>
            <p className="text-slate-300">
              Typiske begrensninger kan være:
            </p>
            <ul className="text-slate-300 space-y-2 ml-4">
              <li>• Krav om at service er utført hos godkjent verksted</li>
              <li>• Unntak for slitedeler som bremser, clutch og batterier</li>
              <li>• Krav om at feil meldes innen en viss tid</li>
              <li>• Geografiske begrensninger</li>
              <li>• Egenandel ved garantireparasjoner</li>
            </ul>
            <p className="text-slate-300">
              Noen garantier dekker bare bestemte komponenter, som motor og drivverk, mens andre deler faller utenfor. Les alltid garantivilkårene nøye.
            </p>
          </div>
        </section>

        {/* Section: Når garantien ikke hjelper */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Når garantien ikke hjelper
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Det er flere situasjoner der garantien ikke gir deg den hjelpen du trenger:
            </p>
            <div className="space-y-3 mt-4">
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Garantien har utløpt</p>
                <p className="text-sm text-slate-400 mt-1">
                  Mange nybilgarantier varer 3–5 år. Bruktbilgarantier kan være kortere. Men reklamasjonsretten kan fortsatt gjelde.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Feilen faller utenfor dekningen</p>
                <p className="text-sm text-slate-400 mt-1">
                  Garantien kan ekskludere visse komponenter eller feiltyper. Det betyr ikke at feilen er din risiko.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Vilkårene er ikke oppfylt</p>
                <p className="text-sm text-slate-400 mt-1">
                  Dersom du ikke har fulgt serviceintervallene hos godkjent verksted, kan garantien bortfalle. Reklamasjonsretten har ikke slike krav.
                </p>
              </div>
            </div>
            <p className="text-slate-300 mt-4">
              Poenget er at garantiavslag ikke er det samme som at du ikke har en sak. Det er to forskjellige vurderinger.
            </p>
          </div>
        </section>

        {/* Section: Hva bør du gjøre */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Hva bør du gjøre?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Hvis du oppdager en feil på bilen, bør du ikke automatisk godta at «garantien ikke dekker». Tenk gjennom følgende:
            </p>
            <ul className="text-slate-300 space-y-2 ml-4">
              <li>• Fantes feilen ved kjøpet, eller er det noe som har oppstått etterpå?</li>
              <li>• Er feilen noe du burde forvente ut fra bilens alder og pris?</li>
              <li>• Ga selger opplysninger som påvirket forventningene dine?</li>
              <li>• Har du reklamert innen rimelig tid?</li>
            </ul>
            <p className="text-slate-300">
              Svarene på disse spørsmålene kan være viktigere enn hva garantien sier. Det er helheten som avgjør om du har et krav.
            </p>
          </div>
        </section>

        {/* FAQ intro */}
        <p className="text-slate-300 mb-6">
          Mange av spørsmålene under har ikke ett ja- eller nei-svar. De avhenger av kjøpet, bilen og dokumentasjonen – ikke bare garantivilkårene.
        </p>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Ofte stilte spørsmål
          </h2>
          <div className="space-y-4">
            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Kan jeg reklamere selv om garantien har utløpt?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Ja. Reklamasjonsretten gjelder uavhengig av garantien. Du kan ha krav i inntil fem år etter kjøp fra forhandler, selv om garantien bare varte i tre år.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Hva hvis selger sier at garantien ikke dekker feilen?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Da bør du vurdere om feilen likevel utgjør en mangel etter kjøpsloven eller forbrukerkjøpsloven. Garantiavslag er ikke det samme som at du ikke har rettigheter.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Må jeg bruke merkeverksted for å beholde garantien?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Garantivilkårene kan kreve dette. Men reklamasjonsretten har ingen slike krav. Du kan fritt velge verksted uten å miste retten til å reklamere.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Er bruktbilgaranti like god som nybilgaranti?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Det varierer. Bruktbilgarantier har ofte kortere varighet og flere unntak. Les vilkårene nøye. Husk at reklamasjonsretten gjelder uansett.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Kan selger nekte reklamasjon fordi jeg ikke har fulgt serviceintervallene?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Manglende service kan påvirke garantien, men det er ikke automatisk grunnlag for å avvise en reklamasjon. Det avgjørende er om mangelen skyldes manglende vedlikehold.
              </div>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section data-final-cta="true" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <h2 className="text-xl font-bold mb-2">
            Usikker på hva som gjelder i din situasjon?
          </h2>
          <p className="text-slate-400 mb-5">
            Vurderingen avhenger ofte av de konkrete omstendighetene. Svar på noen spørsmål om ditt bilkjøp, så får du en vurdering av om du kan ha krav.
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
