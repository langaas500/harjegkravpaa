import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

export default function ReklamasjonPage() {
  return (
    <BilSeoHero
      eyebrow="Forbrukerrettigheter"
      h1Top="Hvordan reklamere på bil"
      h1Accent="Gjør det riktig fra starten."
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Har du oppdaget feil på bilen etter kjøpet? Da må du reklamere til
          selger. Reklamasjon er en forutsetning for å kunne kreve retting,
          prisavslag eller heving.
        </p>
      }
      heroImageAlt="Hvordan reklamere på bil – steg for steg"
      primaryCtaTitle="Usikker på om du har en sak?"
      primaryCtaText="Svar på noen spørsmål om ditt bilkjøp, så får du en vurdering av om du kan ha krav mot selger."
      primaryCtaButton="Sjekk saken din"
      secondaryCtaText="Sjekk saken din nå →"
    >
      {/* Hva er reklamasjon + frister */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Reklamasjon – hva du må vite
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Reklamasjon betyr å gi selger beskjed om at du mener det foreligger
            en mangel ved bilen. Uten en gyldig reklamasjon mister du retten til
            å gjøre mangelen gjeldende.
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • Reklamer skriftlig – muntlig reklamasjon er vanskelig å bevise
            </li>
            <li>
              • Frist: 5 år (forhandler) / 2 år (privat), pluss «rimelig tid»
              etter oppdagelse
            </li>
            <li>
              • Du trenger ikke vite årsaken – beskriv symptomene og hold selger
              ansvarlig
            </li>
          </ul>
        </div>
      </section>

      {/* Vanlige feil */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Vanlige feil ved reklamasjon</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <div className="space-y-3">
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">Venter for lenge</p>
              <p className="text-sm text-slate-400 mt-1">
                Jo lenger du venter, jo vanskeligere blir det å bevise at feilen
                fantes ved kjøpet.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                Reklamerer bare muntlig
              </p>
              <p className="text-sm text-slate-400 mt-1">
                En telefonsamtale er vanskelig å dokumentere – send alltid
                skriftlig bekreftelse.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                Reparerer før reklamasjon
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Da kan det bli vanskeligere å dokumentere hva som var galt og om
                selger har ansvar.
              </p>
            </div>
          </div>
          <p className="text-slate-300 mt-4">
            <Link
              href="/bilkjop"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              Få en vurdering av saken din før du godtar avslaget →
            </Link>
          </p>
        </div>
      </section>

      {/* Når reklamasjon kan gi grunnlag for heving */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Når kan reklamasjon føre til heving?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            En reklamasjon er første steg i prosessen. Dersom mangelen viser seg
            å være vesentlig – for eksempel en alvorlig motorfeil, skjult
            rustskade eller tilbakeholdte opplysninger – kan reklamasjonen danne
            grunnlag for å kreve heving. Selger har som regel rett til å forsøke
            retting først, men dersom retting mislykkes eller ikke tilbys innen
            rimelig tid, kan du ha rett til å heve kjøpet og få pengene
            tilbake.
          </p>
          <p className="text-slate-300">
            Les mer om vilkårene og terskelen i vår guide om{" "}
            <Link
              href="/bilkjop/heving"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              heving av bilkjøp
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Ofte stilte spørsmål</h2>
        <div className="space-y-3">
          {[
            {
              q: "Må jeg bruke ordet «reklamasjon»?",
              a: "Nei. Det viktigste er at du gjør det klart at du mener det er en feil, og at du holder selger ansvarlig.",
            },
            {
              q: "Må jeg ha verkstedrapport før jeg reklamerer?",
              a: "Nei. Du kan reklamere så snart du oppdager feilen. Verkstedrapporten kan innhentes etterpå.",
            },
            {
              q: "Hva hvis selger ikke svarer?",
              a: "Send en påminnelse etter fristen du satte. Manglende svar kan tale i din favør dersom saken går videre.",
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer">
                <span className="font-medium pr-4">{faq.q}</span>
                <ChevronDown className="h-5 w-5 text-slate-500 group-open:rotate-180 transition-transform shrink-0" />
              </summary>
              <div className="px-5 pb-5">
                <p className="text-slate-400 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section
        data-final-cta="true"
        className="relative rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-emerald-500/5" />
        <div className="absolute inset-0 rounded-3xl border border-emerald-500/15" />
        <div className="relative p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Usikker på om du har en sak?
          </h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Svar på noen spørsmål om bilkjøpet ditt – få en vurdering av saken
            din på 2 minutter.
          </p>
          <Link
            href="/bilkjop"
            className="group inline-flex items-center gap-2 bg-emerald-500 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-400 transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Sjekk saken din
            <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <p className="text-xs text-slate-600 mt-4">
            Tar ca. 2 minutter · Ingen registrering
          </p>
        </div>
      </section>
    </BilSeoHero>
  );
}
