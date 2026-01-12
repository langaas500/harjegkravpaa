"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, FileText, ChevronDown } from "lucide-react";
import SeoFloatingCTA from "@/components/SeoFloatingCTA";

export default function McReklamasjonPage() {
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
            <FileText className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Hvordan reklamere på motorsykkel?
          </h1>
        </div>

        <p className="text-lg text-slate-300 mb-10">
          Reklamasjon betyr å melde fra om en feil og kreve at selger tar ansvar. Det høres enkelt ut, men i praksis er det mye som kan gå galt. Frister, dokumentasjon og riktig fremgangsmåte kan være avgjørende for om du når frem.
        </p>

        {/* Sone 2: Tidlig beslutningsanker */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center mb-10">
          <h2 className="text-xl font-bold mb-2">
            Usikker på om du har reklamert riktig?
          </h2>
          <p className="text-slate-400 mb-5">
            Hva som er korrekt fremgangsmåte avhenger av din situasjon. Svar på noen spørsmål, så får du en vurdering av saken din.
          </p>
          <button
            onClick={() => router.push("/bilkjop")}
            className="inline-flex items-center gap-2 bg-white text-[#0c1220] px-6 py-3 rounded-full font-semibold hover:bg-slate-200 transition"
          >
            Sjekk saken din
            <ArrowRight className="h-5 w-5" />
          </button>
        </section>

        {/* Sone 3: Forklaring */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Hva er reklamasjon?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Reklamasjon er å gi selger beskjed om at du mener det foreligger en mangel, og at du vil gjøre krav gjeldende. Det er en formell melding som starter prosessen.
            </p>
            <p className="text-slate-300">
              Reklamasjonsretten følger av loven – enten kjøpsloven (privatkjøp) eller forbrukerkjøpsloven (kjøp fra forhandler). Den gir deg rett til å kreve retting, prisavslag eller i noen tilfeller heving.
            </p>
            <p className="text-slate-300">
              Men å ha rett til å reklamere er ikke det samme som å få medhold. Det avhenger av om det faktisk foreligger en mangel, og om du har gått frem på riktig måte.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Frister er viktige
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Du må reklamere innen rimelig tid etter at du oppdaget eller burde ha oppdaget feilen. Hva som er «rimelig tid» varierer, men det betyr at du ikke bør vente.
            </p>
            <p className="text-slate-300">
              I tillegg gjelder en absolutt frist: To år ved privatkjøp, fem år ved kjøp fra forhandler (for feil som kan forventes å vare over tid).
            </p>
            <p className="text-slate-300">
              Oversitter du fristene, kan du miste retten til å gjøre kravet gjeldende – selv om feilen i seg selv ville gitt deg rett til kompensasjon.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Dokumentasjon kan bli avgjørende
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Reklamasjon bør være skriftlig. Det sikrer at du kan dokumentere hva du har meldt fra om, og når du gjorde det.
            </p>
            <p className="text-slate-300">
              Hva som ble sagt ved kjøpet, annonsetekst, meldinger og tilstandsrapporter kan alle være relevante. Det samme gjelder verkstedrapporter som beskriver feilen.
            </p>
            <p className="text-slate-300">
              I mange MC-saker blir det ord mot ord. Da er det den som kan dokumentere sin versjon som står sterkest.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Vurderingen er ofte teknisk
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              MC-saker handler ofte om tekniske spørsmål: Skyldes feilen en produksjonsfeil? Var den til stede ved leveringen? Burde du ha oppdaget den tidligere?
            </p>
            <p className="text-slate-300">
              Slike spørsmål krever fagkunnskap. Derfor kan verksteduttalelser og tekniske vurderinger være viktige for å underbygge kravet ditt.
            </p>
            <p className="text-slate-300">
              Det betyr også at utfallet kan være vanskelig å forutsi uten en konkret gjennomgang av saken.
            </p>
          </div>
        </section>

        {/* Sone 4: Vanlige feil / avslag / misforståelser */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Vanlige fallgruver
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Mange opplever at reklamasjonen ikke fører frem. Noen ganger skyldes det at kravet ikke er berettiget, men ofte handler det om hvordan saken er håndtert.
            </p>
            <div className="space-y-3 mt-4">
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Venter for lenge</p>
                <p className="text-sm text-slate-400 mt-1">
                  Selv om du er innenfor den absolutte fristen, kan du tape på at du ikke reklamerte «innen rimelig tid».
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Muntlig reklamasjon</p>
                <p className="text-sm text-slate-400 mt-1">
                  Uten skriftlig dokumentasjon kan det bli vanskelig å bevise hva du har meldt fra om.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Uklar beskrivelse av feilen</p>
                <p className="text-sm text-slate-400 mt-1">
                  En vag reklamasjon kan svekke posisjonen din. Vær konkret om hva som er galt.
                </p>
              </div>
            </div>
            <p className="text-slate-300 mt-4">
              At selger avviser reklamasjonen, betyr ikke at du ikke har rett. Men det betyr at saken kan bli mer krevende.
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
                <span className="font-medium">Må jeg reklamere skriftlig?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Det er ikke et absolutt krav, men det anbefales sterkt. Skriftlig reklamasjon gir deg dokumentasjon på at du har meldt fra, og når det skjedde.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Hva er «rimelig tid» å reklamere innen?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Det finnes ingen fast regel, men noen uker etter at du oppdaget feilen regnes normalt som greit. Jo lenger du venter, desto større risiko for at du taper på det.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Kan jeg reklamere hvis jeg har brukt MC-en mye etter kjøpet?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Ja, men det kan påvirke vurderingen. Spørsmålet blir om feilen forelå ved leveringen, og om bruken har hatt betydning for skaden.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Hva gjør jeg hvis selger ikke svarer på reklamasjonen?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Send en påminnelse skriftlig. Hvis selger fortsatt ikke svarer, kan du vurdere å ta saken videre til Forbrukerklageutvalget eller forliksrådet.
              </div>
            </details>
          </div>
        </section>

        {/* Sone 5: Avslutning */}
        <section data-final-cta="true" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <h2 className="text-xl font-bold mb-2">
            Riktig reklamasjon avhenger av saken
          </h2>
          <p className="text-slate-400 mb-5">
            Frister, dokumentasjon og fremgangsmåte varierer fra sak til sak. Svar på noen spørsmål om ditt MC-kjøp, så får du en vurdering av hvordan du bør gå frem.
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
