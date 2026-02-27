import { ChevronDown } from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

export default function McReklamasjonPage() {
  return (
    <BilSeoHero
      heroImageUrl="/mc-hero.jpg"
      eyebrow="Motorsykkelrettigheter"
      h1Top="Reklamasjon på MC"
      h1Accent="Slik går du frem."
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Har du kjøpt en motorsykkel med feil? Da har du rett til å reklamere.
          Her forklarer vi reglene for reklamasjon, frister og hva du kan kreve.
        </p>
      }
      heroImageAlt="Reklamasjon på MC – sjekk dine rettigheter"
      primaryCtaTitle="Problemer med MC-en?"
      primaryCtaText="Svar på noen enkle spørsmål om ditt MC-kjøp, så finner vi ut om du har krav mot selger."
      primaryCtaButton="Sjekk saken din"
      secondaryCtaText="Sjekk saken din nå →"
      ctaHref="/bilkjop?vehicle=motorcycle"
    >
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Reklamasjonsfrister</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-2">Fra forhandler</p>
              <p className="text-sm text-slate-400">
                5 års reklamasjonsfrist for feil som forventes å vare. 1 års
                omvendt bevisbyrde.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-2">Fra privatperson</p>
              <p className="text-sm text-slate-400">
                2 års reklamasjonsfrist. Du må selv bevise at feilen fantes ved
                kjøpet.
              </p>
            </div>
          </div>
          <p className="text-slate-300">
            Du må reklamere innen rimelig tid etter at du oppdaget eller burde
            oppdaget feilen. Som hovedregel bør du reklamere innen 2–3 måneder.
          </p>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Hva kan du kreve?</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <div className="space-y-4">
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">Retting</p>
              <p className="text-sm text-slate-400 mt-1">
                Selger reparerer feilen uten kostnad for deg.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">Prisavslag</p>
              <p className="text-sm text-slate-400 mt-1">
                Du beholder MC-en og får kompensasjon for verdireduksjonen.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">Heving</p>
              <p className="text-sm text-slate-400 mt-1">
                Kjøpet oppheves og du får pengene tilbake. Krever vesentlig
                mangel.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">Erstatning</p>
              <p className="text-sm text-slate-400 mt-1">
                Dekning av økonomisk tap som følge av mangelen.
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
                Må jeg reklamere skriftlig?
              </span>
              <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-5 pb-5 text-slate-300 text-sm">
              Det er ikke et krav, men skriftlig reklamasjon gir deg
              dokumentasjon på at du har reklamert i tide. Send e-post eller
              brev og behold kopi.
            </div>
          </details>

          <details className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition">
            <summary className="flex items-center justify-between p-5 cursor-pointer">
              <span className="font-medium">
                Hva hvis selger avviser reklamasjonen?
              </span>
              <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-5 pb-5 text-slate-300 text-sm">
              Du kan ta saken til Forbrukerrådet (ved forhandlerkjøp) eller
              bruke en megler. Siste utvei er domstolen.
            </div>
          </details>
        </div>
      </section>
    </BilSeoHero>
  );
}
