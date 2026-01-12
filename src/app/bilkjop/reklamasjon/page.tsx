"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, FileText, ChevronDown } from "lucide-react";
import SeoFloatingCTA from "@/components/SeoFloatingCTA";

export default function ReklamasjonPage() {
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
            <FileText className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Hvordan reklamere på bil
          </h1>
        </div>

        {/* Intro */}
        <p className="text-lg text-slate-300 mb-10">
          Har du oppdaget feil på bilen etter kjøpet? Da må du reklamere til selger. Reklamasjon er den formelle måten å melde fra om at noe er galt, og det er en forutsetning for å kunne kreve retting, prisavslag eller heving. Her forklarer vi hvordan du går frem.
        </p>

        {/* Section: Hva er reklamasjon */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Hva er reklamasjon?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Reklamasjon betyr å gi selger beskjed om at du mener det foreligger en mangel ved bilen. Det er ikke det samme som å kreve noe bestemt – det er rett og slett en melding om at noe er galt.
            </p>
            <p className="text-slate-300">
              Reklamasjonen er viktig fordi den starter prosessen. Uten en gyldig reklamasjon mister du retten til å gjøre mangelen gjeldende, uansett hvor alvorlig feilen er.
            </p>
            <p className="text-slate-300">
              Du trenger ikke bruke ordet «reklamasjon» eller juridisk språk. Det holder å forklare hva som er galt og at du holder selger ansvarlig.
            </p>
          </div>
        </section>

        {/* Section: Frister */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Reklamasjonsfrister
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Det er to typer frister du må forholde deg til: den relative fristen og den absolutte fristen.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <p className="font-medium text-white mb-2">Relativ frist</p>
                <p className="text-sm text-slate-400">
                  Du må reklamere innen «rimelig tid» etter at du oppdaget eller burde oppdaget feilen. I praksis betyr dette at du bør reklamere så snart som mulig – helst innen to til tre måneder.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <p className="font-medium text-white mb-2">Absolutt frist</p>
                <p className="text-sm text-slate-400">
                  Ved kjøp fra forhandler er fristen fem år fra du overtok bilen. Ved privatkjøp er fristen to år. Etter dette kan du ikke reklamere, selv om feilen fantes ved kjøpet.
                </p>
              </div>
            </div>

            <p className="text-slate-300 mt-4">
              Den relative fristen er den viktigste i praksis. Venter du for lenge med å si fra, kan du tape retten til å klage – selv om du er innenfor den absolutte fristen.
            </p>
          </div>
        </section>

        {/* Section: Rimelig tid */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Hva er «rimelig tid»?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Loven sier at du må reklamere innen rimelig tid, men definerer ikke hva dette betyr. Rettspraksis gir noen holdepunkter:
            </p>
            <ul className="text-slate-300 space-y-2 ml-4">
              <li>• Forbrukerkjøpsloven: Fristen er aldri kortere enn to måneder fra du oppdaget mangelen</li>
              <li>• Kjøpsloven (privatkjøp): Ingen minstegrense, men praksis tilsier at to til tre måneder normalt er greit</li>
              <li>• Kompliserte feil kan gi lengre frist hvis du trenger tid til å undersøke</li>
              <li>• Enkel, åpenbar feil gir kortere frist</li>
            </ul>
            <p className="text-slate-300">
              Hovedregelen er enkel: Jo raskere du reklamerer, jo tryggere er du. Vent ikke unødvendig.
            </p>
          </div>
        </section>

        {/* Section: Hvordan reklamere */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Slik reklamerer du riktig
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              En reklamasjon trenger ikke være komplisert. Her er stegene:
            </p>

            <div className="space-y-4 mt-4">
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">1. Skriv til selger</p>
                <p className="text-sm text-slate-400 mt-1">
                  Send e-post eller SMS – noe skriftlig du kan dokumentere senere. Muntlig reklamasjon gjelder, men er vanskelig å bevise.
                </p>
              </div>

              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">2. Beskriv feilen</p>
                <p className="text-sm text-slate-400 mt-1">
                  Forklar kort hva som er galt. Du trenger ikke vite årsaken – det holder å beskrive symptomene.
                </p>
              </div>

              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">3. Si at du holder selger ansvarlig</p>
                <p className="text-sm text-slate-400 mt-1">
                  Gjør det klart at du mener feilen er selgers ansvar. Du trenger ikke kreve noe konkret ennå.
                </p>
              </div>

              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">4. Be om tilbakemelding</p>
                <p className="text-sm text-slate-400 mt-1">
                  Gi selger en rimelig frist til å svare, for eksempel 14 dager.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Oppbygging */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Slik er en reklamasjon normalt bygget opp
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              En reklamasjon trenger ikke være juridisk komplisert. Det viktigste er at den inneholder riktige elementer, formulert på en måte som ikke svekker saken din.
            </p>
            <p className="text-slate-300">
              En typisk reklamasjon ved bilkjøp inneholder:
            </p>

            <div className="space-y-4 mt-4">
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Når og hvor bilen ble kjøpt</p>
                <p className="text-sm text-slate-400 mt-1">
                  Kjøpsdato og hvem som var selger.
                </p>
              </div>

              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Hva som er feil</p>
                <p className="text-sm text-slate-400 mt-1">
                  En kort og konkret beskrivelse av problemet slik det viser seg.
                </p>
              </div>

              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">At feilen anses som en mangel</p>
                <p className="text-sm text-slate-400 mt-1">
                  At du mener feilen var til stede ved kjøpet og at selger har ansvar.
                </p>
              </div>

              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Hva du forventer av selger</p>
                <p className="text-sm text-slate-400 mt-1">
                  For eksempel utbedring eller prisavslag.
                </p>
              </div>

              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Frist for tilbakemelding</p>
                <p className="text-sm text-slate-400 mt-1">
                  Vanligvis 14 dager.
                </p>
              </div>
            </div>

            <p className="text-slate-300 mt-4">
              Formuleringene er viktige. En reklamasjon som er for vag eller juridisk feil kan gjøre saken svakere senere.
            </p>
          </div>
        </section>

        {/* Section: Dokumentasjon */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Dokumentasjon
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              God dokumentasjon styrker saken din dersom det blir tvist. Her er hva du bør ta vare på:
            </p>
            <ul className="text-slate-300 space-y-2 ml-4">
              <li>• Kjøpekontrakten og eventuell annonse</li>
              <li>• All skriftlig kommunikasjon med selger</li>
              <li>• Bilder og video av feilen</li>
              <li>• Verkstedrapport med beskrivelse av feilen og kostnadsestimat</li>
              <li>• Kvitteringer for utgifter du har hatt</li>
            </ul>
            <p className="text-slate-300">
              En verkstedrapport fra et uavhengig verksted er særlig verdifull. Den dokumenterer hva som er galt, hva det koster å reparere, og ofte også om feilen sannsynligvis fantes ved kjøpet.
            </p>
          </div>
        </section>

        {/* Section: Etter reklamasjon */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Hva skjer etter reklamasjonen?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Etter at du har reklamert, vil selger normalt svare på en av disse måtene:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
                <p className="font-medium text-emerald-400 mb-2">Selger godtar</p>
                <p className="text-sm text-slate-300">
                  Selger tilbyr retting, prisavslag eller annen løsning. Sørg for å få tilbudet skriftlig.
                </p>
              </div>
              <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
                <p className="font-medium text-red-400 mb-2">Selger avviser</p>
                <p className="text-sm text-slate-300">
                  Selger mener det ikke foreligger mangel. Da bør du vurdere hva som er riktig neste steg før saken eventuelt tas videre.
                </p>
              </div>
            </div>

            <p className="text-slate-300 mt-4">
              Dersom selger avviser reklamasjonen, kan saken tas videre. Hva som er riktig neste steg avhenger blant annet av om du kjøpte av forhandler eller privatperson, og hvordan selger har begrunnet avslaget.
            </p>
          </div>
        </section>

        {/* Section: Vanlige feil */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Vanlige feil ved reklamasjon
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <div className="space-y-3">
              <div className="border-l-2 border-red-500/50 pl-4">
                <p className="font-medium text-white">Venter for lenge</p>
                <p className="text-sm text-slate-400 mt-1">
                  Den vanligste feilen. Jo lenger du venter, jo vanskeligere blir det å bevise at feilen fantes ved kjøpet.
                </p>
              </div>

              <div className="border-l-2 border-red-500/50 pl-4">
                <p className="font-medium text-white">Reklamerer bare muntlig</p>
                <p className="text-sm text-slate-400 mt-1">
                  En telefonsamtale er vanskelig å dokumentere. Send alltid en skriftlig bekreftelse i etterkant.
                </p>
              </div>

              <div className="border-l-2 border-red-500/50 pl-4">
                <p className="font-medium text-white">Reparerer før reklamasjon</p>
                <p className="text-sm text-slate-400 mt-1">
                  Dersom du reparerer bilen før reklamasjon, kan det bli vanskeligere å dokumentere hva som var galt og om selger har ansvar.
                </p>
              </div>

              <div className="border-l-2 border-red-500/50 pl-4">
                <p className="font-medium text-white">Uklar beskrivelse</p>
                <p className="text-sm text-slate-400 mt-1">
                  Vær konkret. «Bilen er dårlig» er ikke en reklamasjon. «Motoren rykker ved akselerasjon» er bedre.
                </p>
              </div>
            </div>

            <p className="text-slate-300 mt-4">
              Før du tar saken videre, kan det være avgjørende å få vurdert om reklamasjonen er riktig formulert og om neste steg er riktig for din situasjon. Sjekk saken din for en konkret vurdering basert på opplysningene du har gitt.
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
                <span className="font-medium">Må jeg bruke ordet «reklamasjon»?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Nei. Det viktigste er at du gjør det klart at du mener det er en feil, og at du holder selger ansvarlig. Ordvalget er ikke avgjørende.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Kan jeg reklamere på telefon?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Ja, muntlig reklamasjon er gyldig. Men det er vanskelig å bevise hva som ble sagt. Send alltid en skriftlig bekreftelse i etterkant.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Hva hvis selger ikke svarer?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Send en påminnelse etter fristen du satte. Dersom selger fortsatt ikke svarer, kan manglende svar tale i din favør dersom saken går videre.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Må jeg ha verkstedrapport før jeg reklamerer?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Nei. Du kan reklamere så snart du oppdager feilen. Verkstedrapporten kan du innhente etterpå for å dokumentere saken.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Gjelder andre frister ved privatkjøp?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Ja. Ved privatkjøp er den absolutte fristen to år (mot fem år ved forhandlerkjøp). Den relative fristen om å reklamere innen rimelig tid gjelder uansett.
              </div>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section data-final-cta="true" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <h2 className="text-xl font-bold mb-2">
            Usikker på om du har en sak?
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
