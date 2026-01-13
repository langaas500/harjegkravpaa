"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Users, ChevronDown } from "lucide-react";
import SeoFloatingCTA from "@/components/SeoFloatingCTA";

export default function PrivatKjopPage() {
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

        {/* Sone 1: Rask avklaring */}
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <Users className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Privat bilkjøp – har jeg noen rettigheter?
          </h1>
        </div>

        <p className="text-lg text-slate-300 mb-10">
          Mange tror at kjøp fra privatperson betyr null rettigheter. Det stemmer ikke. Kjøpsloven gjelder også mellom private, og den gir deg rettigheter selv om bilen er solgt «som den er».
        </p>

        {/* Sone 2: Tidlig beslutningsanker */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center mb-10">
          <h2 className="text-xl font-bold mb-2">
            Usikker på om du har en sak?
          </h2>
          <p className="text-slate-400 mb-5">
            Om du har rettigheter avhenger av hva selger visste, hva som ble sagt, og hva som faktisk var galt med bilen. Det er en helhetsvurdering.
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
            Kjøpsloven gjelder mellom private
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Når du kjøper bil av en privatperson, er det kjøpsloven som regulerer forholdet. Den gir deg rett til å reklamere dersom bilen har en mangel.
            </p>
            <p className="text-slate-300">
              En mangel kan foreligge selv om selger ikke visste om feilen. Det avgjørende er om bilen avviker fra det du med rimelighet kunne forvente ut fra avtalen, prisen og omstendighetene.
            </p>
            <p className="text-slate-300">
              Reklamasjonsfristen ved privatkjøp er to år. Du må også reklamere innen rimelig tid etter at du oppdaget eller burde ha oppdaget feilen.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            «Som den er» stopper ikke alle krav
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              De fleste private selgere skriver at bilen selges «som den er» eller «som besiktiget». Mange kjøpere tror da at de ikke har noen rettigheter. Det er feil.
            </p>
            <p className="text-slate-300">
              Kjøpsloven sier at bilen likevel har en mangel hvis:
            </p>
            <ul className="text-slate-300 space-y-2 ml-4">
              <li>• Selger har holdt tilbake opplysninger som du burde fått</li>
              <li>• Selger har gitt uriktige opplysninger</li>
              <li>• Bilen er i vesentlig dårligere stand enn du hadde grunn til å forvente</li>
            </ul>
            <p className="text-slate-300">
              Med andre ord: «som den er» beskytter ikke selger mot egne feil eller tilbakeholdt informasjon.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Opplysningssvikt er ofte avgjørende
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Ved privatkjøp handler mange saker om hva selger visste eller burde visst. Hvis selger kjente til en feil og ikke opplyste om den, kan det være grunnlag for krav.
            </p>
            <p className="text-slate-300">
              Dette gjelder også indirekte – for eksempel hvis selger beskrev bilen som «feilfri» eller «velholdt» uten at dette stemte.
            </p>
            <p className="text-slate-300">
              Hva som faktisk ble sagt før kjøpet, og hva som kan dokumenteres, blir derfor sentralt i vurderingen.
            </p>
          </div>
        </section>

        {/* Sone 4: Vanlige feil / avslag / misforståelser */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Hvorfor mange gir opp for tidlig
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Mange kjøpere gir opp fordi de tror privatkjøp betyr «kjøpers risiko». Men det at selger er privatperson, betyr ikke at du står uten vern.
            </p>
            <div className="space-y-3 mt-4">
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">«Selger sa at bilen var solgt som den er»</p>
                <p className="text-sm text-slate-400 mt-1">
                  Det fritar ikke selger fra ansvar for tilbakeholdte eller uriktige opplysninger.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">«Selger sier han ikke visste om feilen»</p>
                <p className="text-sm text-slate-400 mt-1">
                  Selv om selger ikke visste, kan bilen likevel være i vesentlig dårligere stand enn forventet.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">«Jeg har ikke bevis»</p>
                <p className="text-sm text-slate-400 mt-1">
                  Annonsetekst, meldinger og tilstandsrapporter kan være viktig dokumentasjon.
                </p>
              </div>
            </div>
            <p className="text-slate-300 mt-4">
              At selger avviser kravet, betyr ikke at du ikke har rett. Det betyr bare at saken må vurderes nærmere.
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
                <span className="font-medium">Har jeg kortere reklamasjonsfrist ved privatkjøp?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Ja, ved privatkjøp er den absolutte reklamasjonsfristen to år, mot fem år ved kjøp fra forhandler. Du må uansett reklamere innen rimelig tid.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Kan jeg kreve heving ved privatkjøp?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Ja, men terskelen er høy. Mangelen må være vesentlig. Prisavslag eller erstatning er ofte mer realistisk.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Hva hvis selger nekter å svare?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Du kan sende skriftlig reklamasjon for å sikre dokumentasjon. Hvis selger ikke svarer, kan saken tas videre til Forbrukerklageutvalget eller forliksrådet.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Er det vanskeligere å vinne frem mot privatperson?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Bevisvurderingen kan være mer krevende, og du har ikke de samme fordelene som ved forbrukerkjøp. Men loven gir deg likevel rettigheter.
              </div>
            </details>
          </div>
        </section>

        {/* Sone 5: Avslutning */}
        <section data-final-cta="true" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <h2 className="text-xl font-bold mb-2">
            Privatkjøp er mer usikkert – men ikke uten vern
          </h2>
          <p className="text-slate-400 mb-5">
            Utfallet avhenger av hva som ble sagt, hva selger visste, og hva som faktisk var galt. Svar på noen spørsmål, så får du en vurdering av saken din.
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
          Innholdet er generell informasjon og ikke juridisk rådgivning. Reglene følger av kjøpsloven.
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
