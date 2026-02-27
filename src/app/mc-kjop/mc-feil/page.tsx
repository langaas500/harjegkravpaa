import { ChevronDown } from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

export default function McFeilPage() {
  return (
    <BilSeoHero
      heroImageUrl="/mc-hero.jpg"
      eyebrow="Motorsykkelrettigheter"
      h1Top="Feil på MC"
      h1Accent="Når har du krav?"
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Har du kjøpt en motorsykkel som viser seg å ha feil? Da kan du ha krav
          mot selger. Men ikke alle feil gir rett til reklamasjon. Her forklarer
          vi hva som regnes som en mangel i juridisk forstand, og hva du kan
          forvente av en brukt MC.
        </p>
      }
      heroImageAlt="Feil på MC – sjekk om du har krav mot selger"
      primaryCtaTitle="Lurer du på om du har en sak?"
      primaryCtaText="Svar på noen enkle spørsmål om ditt MC-kjøp, så får du en vurdering av om du kan ha krav mot selger."
      primaryCtaButton="Sjekk saken din"
      secondaryCtaText="Sjekk saken din nå →"
      ctaHref="/bilkjop?vehicle=motorcycle"
    >
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Hva er en mangel på MC?</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            I juridisk forstand foreligger det en mangel når motorsykkelen ikke
            samsvarer med det som ble avtalt, eller når den er i vesentlig
            dårligere stand enn du hadde grunn til å forvente ut fra kjøpesummen
            og omstendighetene.
          </p>
          <p className="text-slate-300">
            Både kjøpsloven og forbrukerkjøpsloven bruker begrepet «mangel» som
            grunnlag for kjøpers rettigheter. En mangel kan være fysisk (teknisk
            feil), rettslig (heftelser) eller knyttet til opplysninger selger ga
            eller burde gitt.
          </p>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Typiske feil på motorsykkel
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Noen feiltyper går igjen i tvister om MC-kjøp:
          </p>
          <div className="space-y-4 mt-4">
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">Motor og drivverk</p>
              <p className="text-sm text-slate-400 mt-1">
                Motorproblemer, girkassesvikt, clutchfeil og kjededrift. Disse
                feilene er ofte kostbare å utbedre.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">Elektriske problemer</p>
              <p className="text-sm text-slate-400 mt-1">
                Feil i tenning, ladesystem, lys eller instrumentpanel. Kan være
                vanskelig å feilsøke.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">Ramme og chassis</p>
              <p className="text-sm text-slate-400 mt-1">
                Skjulte kollisjonsskader, rust eller sprekker i rammen. Kan være
                sikkerhetskritisk.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">Tidligere skader</p>
              <p className="text-sm text-slate-400 mt-1">
                Velting eller kollisjoner som ikke ble opplyst om ved salg.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Hva kan du forvente av en brukt MC?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            En brukt motorsykkel er ikke en ny MC. Det betyr at du må akseptere
            en viss grad av slitasje. Forventningene justeres ut fra:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-2">Alder og årsmodell</p>
              <p className="text-sm text-slate-400">
                En 15 år gammel MC vil naturlig ha mer slitasje enn en 3 år
                gammel.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-2">Kilometerstand</p>
              <p className="text-sm text-slate-400">
                Høy kilometerstand betyr mer slitasje på motor, drivverk og
                slitedeler.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-2">Pris</p>
              <p className="text-sm text-slate-400">
                Lav pris kan indikere at selger har priset inn risiko for feil.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-2">
                Opplysninger fra selger
              </p>
              <p className="text-sm text-slate-400">
                Hva selger sa om MC-en har betydning for hva du kan forvente.
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
                Gjelder samme regler for MC som for bil?
              </span>
              <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-5 pb-5 text-slate-300 text-sm">
              Ja, kjøpsloven og forbrukerkjøpsloven gjelder likt for
              motorsykler, scootere og biler. De samme prinsippene for mangel,
              reklamasjon og heving gjelder.
            </div>
          </details>

          <details className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition">
            <summary className="flex items-center justify-between p-5 cursor-pointer">
              <span className="font-medium">
                Hva med scooter og moped?
              </span>
              <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-5 pb-5 text-slate-300 text-sm">
              Samme regler gjelder for scooter og moped. Alle motoriserte
              kjøretøy reguleres av de samme lovene.
            </div>
          </details>

          <details className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition">
            <summary className="flex items-center justify-between p-5 cursor-pointer">
              <span className="font-medium">
                Hvor lenge kan jeg reklamere?
              </span>
              <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-5 pb-5 text-slate-300 text-sm">
              Ved kjøp fra forhandler er fristen 5 år for feil som forventes å
              vare. Ved privatkjøp er fristen 2 år. Du må reklamere innen
              rimelig tid etter at du oppdaget feilen.
            </div>
          </details>
        </div>
      </section>
    </BilSeoHero>
  );
}
