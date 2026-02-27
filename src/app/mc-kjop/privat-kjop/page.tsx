import { ChevronDown } from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

export default function McPrivatKjopPage() {
  return (
    <BilSeoHero
      heroImageUrl="/mc-hero.jpg"
      eyebrow="Motorsykkelrettigheter"
      h1Top="Kjøpt MC privat?"
      h1Accent="Dine rettigheter."
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Ved kjøp av MC fra privatperson gjelder andre regler enn ved
          forhandlerkjøp. Du har fortsatt rettigheter, men vernet er svakere.
          Her forklarer vi hva som gjelder.
        </p>
      }
      heroImageAlt="Kjøpt MC privat – sjekk dine rettigheter"
      primaryCtaTitle="Problemer med MC-en?"
      primaryCtaText="Svar på noen enkle spørsmål om ditt MC-kjøp, så finner vi ut om du har krav mot selger."
      primaryCtaButton="Sjekk saken din"
      secondaryCtaText="Sjekk saken din nå →"
      ctaHref="/bilkjop?vehicle=motorcycle"
    >
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Forskjeller fra forhandlerkjøp
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-2">Reklamasjonsfrist</p>
              <p className="text-sm text-slate-400">
                2 år ved privatkjøp (mot 5 år fra forhandler).
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-2">Bevisbyrde</p>
              <p className="text-sm text-slate-400">
                Du må bevise at feilen fantes ved kjøpet. Ingen omvendt
                bevisbyrde.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-2">«Som den er»</p>
              <p className="text-sm text-slate-400">
                Forbeholdet er gyldig ved privatkjøp, men beskytter ikke mot
                alt.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-2">Lovverk</p>
              <p className="text-sm text-slate-400">
                Kjøpsloven gjelder, ikke forbrukerkjøpsloven.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Når har du likevel krav?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Selv ved «som den er»-salg har du krav hvis:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>• Selger har gitt uriktige opplysninger</li>
            <li>• Selger har holdt tilbake viktige opplysninger</li>
            <li>• MC-en er i vesentlig dårligere stand enn forventet</li>
          </ul>
          <p className="text-slate-300">
            Dokumentasjon er viktig. Ta vare på alle meldinger, annonsetekst og
            kontrakt.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Ofte stilte spørsmål</h2>
        <div className="space-y-3">
          <details className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition">
            <summary className="flex items-center justify-between p-5 cursor-pointer">
              <span className="font-medium">
                Hva hvis selger løy om kilometerstand?
              </span>
              <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-5 pb-5 text-slate-300 text-sm">
              Manipulert kilometerstand er en mangel uansett «som den
              er»-forbehold. Du kan kreve prisavslag eller heving.
            </div>
          </details>

          <details className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition">
            <summary className="flex items-center justify-between p-5 cursor-pointer">
              <span className="font-medium">Bør jeg skrive kontrakt?</span>
              <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-5 pb-5 text-slate-300 text-sm">
              Ja, alltid. En skriftlig kontrakt dokumenterer hva som ble avtalt
              og gir bedre beskyttelse ved tvist.
            </div>
          </details>
        </div>
      </section>
    </BilSeoHero>
  );
}
