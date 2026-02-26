import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

export default function BruktbilFeilPage() {
  return (
    <BilSeoHero
      eyebrow="Forbrukerrettigheter"
      h1Top="Kjøpt bil med feil?"
      h1Accent="Sjekk om du har krav."
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Har du kjøpt bil og oppdaget feil etter kjøpet? Enten du har
          <strong className="text-white"> kjøpt bruktbil privat</strong> eller
          fra forhandler, kan du ha rettigheter dersom bilen har skjulte eller
          vesentlige feil.
        </p>
      }
      heroImageAlt="Kjøpt bil med feil – sjekk dine rettigheter"
      primaryCtaTitle="Har du krav etter bilkjøpet?"
      primaryCtaText="Svar på noen spørsmål og få en veiledende vurdering av om du kan kreve prisavslag, retting eller heving."
      primaryCtaButton="Sjekk om du har krav"
      secondaryCtaText="Sjekk saken din nå →"
    >
      {/* Hva avgjør om du har krav */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Hva avgjør om du har krav?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Mange tror at «som den er» betyr ingen rettigheter. Det stemmer
            ikke. Ved skjulte feil eller feil opplysninger kan du ha krav
            uavhengig av kjøpsform.
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>• Skjult feil som dukket opp etter kjøpet</li>
            <li>• Selger har gitt uriktige opplysninger om bilen</li>
            <li>• Bilen er i vesentlig dårligere stand enn forventet</li>
          </ul>
        </div>
      </section>

      {/* Hvorfor mange får avslag */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Hvorfor mange får avslag</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <div className="space-y-3">
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                «Feilen er normal slitasje»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Vurderingen må ta hensyn til bilens alder, pris og hva som ble
                opplyst.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                «Bilen ble solgt som den er»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                «Som den er» beskytter ikke selger mot egne feil eller
                tilbakeholdt informasjon.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                «Du burde ha oppdaget feilen»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Skjulte feil kan ikke forventes oppdaget ved vanlig prøvekjøring.
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

      {/* Når feil kan gi grunnlag for heving */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Når kan feil på bruktbil gi grunnlag for heving?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Ikke alle feil gir rett til heving, men dersom feilen er vesentlig
            kan du ha krav på å levere bilen tilbake og få kjøpesummen igjen.
            Typiske eksempler er alvorlige motorskader, girkassefeil eller
            skjulte kollisjonsreparasjoner som ikke ble opplyst. Vurderingen
            avhenger av bilens pris, alder og hva selger opplyste ved
            kjøpstidspunktet.
          </p>
          <p className="text-slate-300">
            Se fullstendig oversikt over vilkår og frister i vår guide om{" "}
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
              q: "Kan jeg heve bilkjøpet ved feil?",
              a: "Ja, dersom feilen er vesentlig og ikke kan rettes innen rimelig tid. Terskelen er høy, men det er mulig.",
            },
            {
              q: "Hva kan jeg kreve ved feil på bil?",
              a: "Du kan kreve prisavslag, retting, heving eller erstatning – avhengig av feilen og kjøpsformen.",
            },
            {
              q: "Har jeg reklamasjonsrett ved privat bilkjøp?",
              a: "Ja. Ved privatkjøp har du normalt 2 års reklamasjonsrett dersom bilen har en mangel etter kjøpsloven.",
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
            Vil du sjekke om du har krav?
          </h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Svar på noen spørsmål om bilkjøpet ditt – få en vurdering av saken
            din på 2 minutter.
          </p>
          <Link
            href="/bilkjop"
            className="group inline-flex items-center gap-2 bg-emerald-500 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-400 transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Sjekk om du har krav
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
