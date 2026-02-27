import { ChevronDown } from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

export default function McHevingPage() {
  return (
    <BilSeoHero
      heroImageUrl="/mc-hero.jpg"
      eyebrow="Motorsykkelrettigheter"
      h1Top="Heving av MC-kjøp"
      h1Accent="Når kan du heve?"
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Heving betyr at kjøpet oppheves og du får pengene tilbake. Men heving
          krever en vesentlig mangel. Her forklarer vi når du kan kreve heving av
          et MC-kjøp.
        </p>
      }
      heroImageAlt="Heving av MC-kjøp – når kan du heve kjøpet"
      primaryCtaTitle="Vil du vite om du kan heve?"
      primaryCtaText="Svar på noen enkle spørsmål om ditt MC-kjøp, så finner vi ut om du har grunnlag for heving."
      primaryCtaButton="Sjekk saken din"
      secondaryCtaText="Sjekk saken din nå →"
      ctaHref="/bilkjop?vehicle=motorcycle"
    >
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Vilkår for heving</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            For å heve et kjøp må det foreligge en{" "}
            <strong className="text-white">vesentlig mangel</strong>. Dette
            vurderes ut fra:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>• Mangelens betydning for deg som kjøper</li>
            <li>• Om mangelen kan utbedres</li>
            <li>
              • Kostnadene ved utbedring sammenlignet med kjøpesummen
            </li>
            <li>• Om selger har fått mulighet til å rette</li>
            <li>• Hvor lang tid det har gått siden kjøpet</li>
          </ul>
          <p className="text-slate-300">
            Heving er den mest inngripende sanksjonen og krever at de andre
            alternativene (retting, prisavslag) ikke er tilstrekkelige.
          </p>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Eksempler på hevingsgrunnlag
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <div className="space-y-4">
            <div className="border-l-2 border-emerald-500/50 pl-4">
              <p className="font-medium text-white">Kan gi heving</p>
              <ul className="text-sm text-slate-400 mt-1 space-y-1">
                <li>• Alvorlig motorhavari kort tid etter kjøp</li>
                <li>• Skjult kollisjonsskade som påvirker sikkerheten</li>
                <li>• Manipulert kilometerstand</li>
                <li>• Gjentatte feil som ikke lar seg rette</li>
              </ul>
            </div>
            <div className="border-l-2 border-slate-500/50 pl-4">
              <p className="font-medium text-white">Gir normalt ikke heving</p>
              <ul className="text-sm text-slate-400 mt-1 space-y-1">
                <li>• Mindre feil som enkelt kan rettes</li>
                <li>• Normal slitasje</li>
                <li>• Kosmetiske mangler</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Ofte stilte spørsmål</h2>
        <div className="space-y-3">
          <details className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition">
            <summary className="flex items-center justify-between p-5 cursor-pointer">
              <span className="font-medium">
                Får jeg alle pengene tilbake?
              </span>
              <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-5 pb-5 text-slate-300 text-sm">
              I utgangspunktet ja. Men selger kan kreve fradrag for den nytten du
              har hatt av MC-en, typisk basert på kjørte kilometer.
            </div>
          </details>

          <details className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition">
            <summary className="flex items-center justify-between p-5 cursor-pointer">
              <span className="font-medium">
                Hva hvis selger nekter å ta MC-en tilbake?
              </span>
              <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-5 pb-5 text-slate-300 text-sm">
              Du kan ta saken til Forbrukertilsynet, Forbrukerrådet eller
              domstolen. Dokumenter alt skriftlig.
            </div>
          </details>
        </div>
      </section>
    </BilSeoHero>
  );
}
