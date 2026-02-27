import { ChevronDown } from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

export default function McForhandlerPage() {
  return (
    <BilSeoHero
      heroImageUrl="/mc-hero.jpg"
      eyebrow="Motorsykkelrettigheter"
      h1Top="Kjøpt MC fra forhandler?"
      h1Accent="Sterkt forbrukervern."
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Ved kjøp av MC fra forhandler har du sterkt forbrukervern.
          Forbrukerkjøpsloven gir deg rettigheter som forhandler ikke kan avtale
          seg bort fra.
        </p>
      }
      heroImageAlt="Kjøpt MC fra forhandler – dine forbrukerrettigheter"
      primaryCtaTitle="Problemer med MC-en?"
      primaryCtaText="Svar på noen enkle spørsmål om ditt MC-kjøp, så finner vi ut om du har krav mot forhandler."
      primaryCtaButton="Sjekk saken din"
      secondaryCtaText="Sjekk saken din nå →"
      ctaHref="/bilkjop?vehicle=motorcycle"
    >
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Dine rettigheter</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <p className="font-medium text-emerald-400 mb-2">
                5 års reklamasjonsfrist
              </p>
              <p className="text-sm text-slate-300">
                For feil som forventes å vare, som motor, girkasse og ramme.
              </p>
            </div>
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <p className="font-medium text-emerald-400 mb-2">
                Omvendt bevisbyrde
              </p>
              <p className="text-sm text-slate-300">
                De første 12 månedene antas feil å ha vært der fra starten.
              </p>
            </div>
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <p className="font-medium text-emerald-400 mb-2">
                Ingen «som den er»
              </p>
              <p className="text-sm text-slate-300">
                Slike forbehold er ugyldige ved forbrukerkjøp.
              </p>
            </div>
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <p className="font-medium text-emerald-400 mb-2">
                Valg av sanksjon
              </p>
              <p className="text-sm text-slate-300">
                Du kan kreve retting, prisavslag, heving eller erstatning.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Hva kan du kreve?</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <div className="space-y-4">
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">Retting</p>
              <p className="text-sm text-slate-400 mt-1">
                Forhandler reparerer uten kostnad. Du kan velge dette fremfor
                prisavslag.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">Prisavslag</p>
              <p className="text-sm text-slate-400 mt-1">
                Kompensasjon for verdireduksjon. Aktuelt når retting ikke er
                ønskelig.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">Heving</p>
              <p className="text-sm text-slate-400 mt-1">
                Få pengene tilbake ved vesentlig mangel. MC-en leveres tilbake.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">Erstatning</p>
              <p className="text-sm text-slate-400 mt-1">
                Dekning av økonomisk tap, for eksempel leiebil eller tapt
                arbeidsinntekt.
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
                Hva hvis forhandler nekter å hjelpe?
              </span>
              <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-5 pb-5 text-slate-300 text-sm">
              Send skriftlig reklamasjon. Deretter kan du kontakte
              Forbrukerrådet eller ta saken til Forbrukerklageutvalget.
            </div>
          </details>

          <details className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition">
            <summary className="flex items-center justify-between p-5 cursor-pointer">
              <span className="font-medium">
                Gjelder garantien i tillegg til reklamasjonsretten?
              </span>
              <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-5 pb-5 text-slate-300 text-sm">
              Ja, garanti kommer i tillegg. Men reklamasjonsretten gjelder
              uansett og kan ikke begrenses av garantivilkår.
            </div>
          </details>
        </div>
      </section>
    </BilSeoHero>
  );
}
