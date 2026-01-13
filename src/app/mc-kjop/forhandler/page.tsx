"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Store, ChevronDown } from "lucide-react";
import SeoFloatingCTA from "@/components/SeoFloatingCTA";

export default function McForhandlerPage() {
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
            <Store className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            MC fra forhandler – dine rettigheter
          </h1>
        </div>

        <p className="text-lg text-slate-300 mb-10">
          Kjøp av motorsykkel fra forhandler gir deg sterkere vern enn privatkjøp. Forbrukerkjøpsloven gjelder, og den stiller krav til selger som ikke kan avtales bort. Men det betyr ikke at alle krav fører frem – også her må det foreligge en reell mangel.
        </p>

        {/* Sone 2: Tidlig beslutningsanker */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center mb-10">
          <h2 className="text-xl font-bold mb-2">
            Kjøpte du MC hos forhandler og oppdaget feil?
          </h2>
          <p className="text-slate-400 mb-5">
            Du har et sterkere utgangspunkt enn ved privatkjøp, men utfallet avhenger av hva feilen er, når den oppstod, og hvordan saken håndteres.
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
            Forbrukerkjøpsloven gjelder
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Når du kjøper motorsykkel av en forhandler som ledd i næringsvirksomhet, er det forbrukerkjøpsloven som regulerer forholdet. Denne loven gir deg som forbruker et særskilt vern.
            </p>
            <p className="text-slate-300">
              Forhandler kan ikke avtale seg bort fra dine rettigheter. Klausuler som begrenser ansvaret utover det loven tillater, er ikke bindende for deg.
            </p>
            <p className="text-slate-300">
              Det betyr at du har et bedre utgangspunkt enn ved kjøp fra privatperson – men det betyr ikke at alle krav automatisk fører frem.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Sterkere vern enn privatkjøp
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Forbrukerkjøpsloven gir deg flere fordeler sammenlignet med kjøpsloven som gjelder ved privatkjøp.
            </p>
            <p className="text-slate-300">
              En viktig forskjell er bevisregelen: Hvis en feil viser seg innen seks måneder etter leveringen, antas det at feilen forelå ved kjøpet. Da må forhandler bevise at den ikke gjorde det.
            </p>
            <p className="text-slate-300">
              Du har også lengre reklamasjonsfrist – fem år for feil som er ment å vare vesentlig lenger enn to år. Dette gjelder typisk for større tekniske feil på en MC.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Forhandler har ansvar
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Forhandler er ansvarlig for at motorsykkelen er i samsvar med det som ble avtalt, og at den ikke har mangler. Dette gjelder uavhengig av om feilen skyldes forhandler, importør eller produsent.
            </p>
            <p className="text-slate-300">
              Du trenger ikke forholde deg til produsenten – det er forhandler som er din kontraktsmotpart og som må håndtere reklamasjonen.
            </p>
            <p className="text-slate-300">
              Men forhandlers ansvar betyr ikke at alle feil er mangler. Det må fortsatt vurderes konkret om feilen utgjør et avvik fra det du kunne forvente.
            </p>
          </div>
        </section>

        {/* Sone 4: Vanlige feil / avslag / misforståelser */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Når forhandler avviser kravet
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Selv om du har kjøpt fra forhandler, kan kravet bli avvist. Det betyr ikke nødvendigvis at avvisningen er riktig.
            </p>
            <div className="space-y-3 mt-4">
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">«Det er normal slitasje»</p>
                <p className="text-sm text-slate-400 mt-1">
                  En vanlig avvisning, men vurderingen må ta hensyn til MC-ens alder, kilometerstand og pris.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">«Feilen skyldes din bruk»</p>
                <p className="text-sm text-slate-400 mt-1">
                  Innen seks måneder er det forhandler som må bevise dette. Etter seks måneder kan bevisbyrden være annerledes.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">«Garantien dekker ikke dette»</p>
                <p className="text-sm text-slate-400 mt-1">
                  Garanti og reklamasjon er to forskjellige ting. At garantien ikke dekker feilen, betyr ikke at du mangler rettigheter.
                </p>
              </div>
            </div>
            <p className="text-slate-300 mt-4">
              En avvisning fra forhandler er ikke siste ord. Du kan ta saken videre til Forbrukerklageutvalget eller domstolene.
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
                <span className="font-medium">Hva er forskjellen på forhandlerkjøp og privatkjøp?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Ved forhandlerkjøp gjelder forbrukerkjøpsloven med sterkere vern: bevisregel innen seks måneder, lengre reklamasjonsfrist, og forhandler kan ikke avtale seg bort fra ansvaret.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Hvor lenge kan jeg reklamere?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Den absolutte fristen er fem år for feil som forventes å vare over tid. I tillegg må du reklamere innen rimelig tid etter at du oppdaget feilen.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Hva betyr seks måneders-regelen?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Hvis en feil viser seg innen seks måneder, antas det at feilen forelå ved leveringen. Da må forhandler bevise at den ikke gjorde det, ikke du.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Kan forhandler nekte å ta imot reklamasjon?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Forhandler kan avvise kravet, men det betyr ikke at avvisningen er riktig. Du kan ta saken videre til Forbrukerklageutvalget hvis dere ikke blir enige.
              </div>
            </details>
          </div>
        </section>

        {/* Sone 5: Avslutning */}
        <section data-final-cta="true" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <h2 className="text-xl font-bold mb-2">
            Også MC-saker vurderes konkret
          </h2>
          <p className="text-slate-400 mb-5">
            Selv om du har sterkere vern ved forhandlerkjøp, avhenger utfallet av de konkrete omstendighetene. Svar på noen spørsmål om ditt kjøp, så får du en vurdering av saken din.
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
          Innholdet er generell informasjon og ikke juridisk rådgivning. Reglene følger av forbrukerkjøpsloven.
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
