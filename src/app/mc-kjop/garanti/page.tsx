import { ChevronDown } from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

export default function McGarantiPage() {
  return (
    <BilSeoHero
      heroImageUrl="/mc-hero.jpg"
      eyebrow="Motorsykkelrettigheter"
      h1Top="Garanti på MC"
      h1Accent="Hva dekkes?"
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Mange MC-er selges med garanti. Men hva betyr egentlig garantien, og
          hva er forskjellen på garanti og reklamasjonsrett? Her forklarer vi
          det du trenger å vite.
        </p>
      }
      heroImageAlt="Garanti på MC – hva dekkes og hva er dine rettigheter"
      primaryCtaTitle="Problemer med MC-en?"
      primaryCtaText="Svar på noen enkle spørsmål om ditt MC-kjøp, så finner vi ut om du har krav mot selger."
      primaryCtaButton="Sjekk saken din"
      secondaryCtaText="Sjekk saken din nå →"
      ctaHref="/bilkjop?vehicle=motorcycle"
    >
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Garanti vs. reklamasjon</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <p className="font-medium text-emerald-400 mb-2">
                Reklamasjonsrett
              </p>
              <p className="text-sm text-slate-300">
                Lovbestemt rett som gjelder uansett. 5 år fra forhandler, 2 år
                fra privat.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-2">Garanti</p>
              <p className="text-sm text-slate-400">
                Frivillig ordning fra selger. Kan gi bedre dekning, men
                erstatter ikke reklamasjonsretten.
              </p>
            </div>
          </div>
          <p className="text-slate-300">
            En garanti kan aldri begrense reklamasjonsretten din. Hvis garantien
            gir deg dårligere vilkår enn loven, er det loven som gjelder.
          </p>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Hva dekkes typisk av garanti?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <div className="space-y-4">
            <div className="border-l-2 border-emerald-500/50 pl-4">
              <p className="font-medium text-white">Dekkes ofte</p>
              <p className="text-sm text-slate-400 mt-1">
                Motor, girkasse, ramme, elektriske komponenter, og andre
                vesentlige deler.
              </p>
            </div>
            <div className="border-l-2 border-rose-500/50 pl-4">
              <p className="font-medium text-white">Dekkes sjelden</p>
              <p className="text-sm text-slate-400 mt-1">
                Slitedeler (bremser, clutch, kjede), skader fra feil bruk,
                kosmetiske skader.
              </p>
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
                Kan garantien falle bort?
              </span>
              <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-5 pb-5 text-slate-300 text-sm">
              Ja, typisk hvis du ikke følger serviceintervaller, bruker
              uautoriserte verksteder, eller har modifisert MC-en.
            </div>
          </details>

          <details className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition">
            <summary className="flex items-center justify-between p-5 cursor-pointer">
              <span className="font-medium">
                Hva hvis garantien er utgått?
              </span>
              <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-5 pb-5 text-slate-300 text-sm">
              Da kan du fortsatt ha reklamasjonsrett etter loven.
              Reklamasjonsfristen er ofte lenger enn garantitiden.
            </div>
          </details>
        </div>
      </section>
    </BilSeoHero>
  );
}
