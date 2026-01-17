"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
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
              Sjekk om du har krav →
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
            Kjøpt bil med feil? Sjekk om du har krav
          </h1>
        </div>

        {/* Intro */}
        <p className="text-lg text-slate-300 mb-6">
          Har du kjøpt bil og oppdaget feil etter kjøpet? Enten du har
          <strong className="text-white"> kjøpt bruktbil privat</strong> eller fra
          forhandler, kan du ha rettigheter dersom bilen har skjulte eller
          vesentlige feil.
        </p>

        {/* CTA */}
        <div className="mb-10">
          <button
            onClick={() => router.push("/bilkjop")}
            className="inline-flex items-center gap-2 bg-[#1F4F45] text-[#ECFDF5] px-6 py-3 rounded-xl font-semibold hover:bg-[#246457] transition"
          >
            Sjekk om du har krav
            <ArrowRight className="h-5 w-5" />
          </button>
          <p className="text-sm text-gray-500 mt-3">
            Gratis vurdering • Tar vanligvis noen få minutter • Ingen forpliktelser
          </p>
        </div>

        {/* Long-tail situasjoner */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Kjøpt bil med feil – vanlige situasjoner
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <ul className="text-slate-300 space-y-3">
              <li>• Kjøpt bil privat med feil som ikke ble opplyst</li>
              <li>• Kjøpt bruktbil med skjult feil som dukket opp etter kjøpet</li>
              <li>• Bil solgt «som den er», men med alvorlige mangler</li>
              <li>• Selger nekter reklamasjon selv om feilen er dokumentert</li>
              <li>• Store reparasjonskostnader kort tid etter kjøpet</li>
            </ul>
          </div>
        </section>

        {/* Privat vs forhandler */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Rettigheter ved feil bruktbil – privat eller forhandler?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p>
              Har du kjøpt bil fra forhandler, gjelder forbrukerkjøpsloven. Har du
              kjøpt bil privat, gjelder kjøpsloven – men du kan fortsatt ha krav
              ved feil på bilen.
            </p>
            <p>
              Mange tror at «som den er» betyr ingen rettigheter. Det stemmer ikke.
              Ved skjulte feil eller feil opplysninger kan du kreve prisavslag,
              heving eller erstatning – <Link href="/bilkjop" className="underline hover:text-white">sjekk om du har krav</Link>.
            </p>
          </div>
        </section>

        {/* FAQ – long-tail */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Spørsmål mange stiller etter å ha kjøpt bil med feil
          </h2>

          <div className="space-y-4">
            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span>Kan jeg heve bilkjøpet ved feil?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180" />
              </summary>
              <div className="px-4 pb-4 text-sm text-slate-300">
                Ja, dersom feilen er vesentlig og ikke kan rettes innen rimelig tid,
                kan du ha rett til å heve bilkjøpet.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span>Hva kan jeg kreve ved feil på bil?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180" />
              </summary>
              <div className="px-4 pb-4 text-sm text-slate-300">
                Du kan kreve prisavslag, retting, heving av kjøpet eller erstatning,
                avhengig av feilen og kjøpet.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span>Har jeg reklamasjonsrett ved privat bilkjøp?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180" />
              </summary>
              <div className="px-4 pb-4 text-sm text-slate-300">
                Ja. Ved privatkjøp har du normalt 2 års reklamasjonsrett dersom bilen
                har en mangel etter kjøpsloven.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span>Hva gjør jeg hvis selger nekter reklamasjon?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180" />
              </summary>
              <div className="px-4 pb-4 text-sm text-slate-300">
                Da bør du vurdere om avslaget er korrekt. Mange avslag gis uten
                juridisk grunnlag.
              </div>
            </details>
          </div>
        </section>

        {/* Final CTA */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <h2 className="text-xl font-bold mb-2">
            Vil du sjekke om du har krav?
          </h2>
          <p className="text-slate-400 mb-5">
            Svar på noen korte spørsmål og få en veiledende vurdering basert på
            din situasjon.
          </p>
          <button
            onClick={() => router.push("/bilkjop")}
            className="inline-flex items-center gap-2 bg-[#1F4F45] text-[#ECFDF5] px-6 py-3 rounded-xl font-semibold hover:bg-[#246457] transition"
          >
            Sjekk om du har krav
            <ArrowRight className="h-5 w-5" />
          </button>
        </section>

        <p className="text-xs text-slate-600 text-center mt-8">
          Innholdet er generell informasjon og ikke juridisk rådgivning.
        </p>
      </article>

      <SeoFloatingCTA href="/bilkjop" />
    </main>
  );
}
