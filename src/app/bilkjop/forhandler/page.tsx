import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

export default function ForhandlerPage() {
  return (
    <BilSeoHero
      eyebrow="Forbrukerrettigheter"
      h1Top="Kjøpt bil av forhandler?"
      h1Accent="Sjekk hvilke rettigheter du har."
      intro="Forbrukerkjøpsloven gir deg sterkere vern enn ved privatkjøp. Men det må likevel foreligge en mangel, og kravet må vurderes konkret."
      heroImageAlt="Kjøpt bil av forhandler – dine rettigheter"
      primaryCtaTitle="Usikker på hva du kan kreve?"
      primaryCtaText="Om du har et krav avhenger av feilen, hva som ble avtalt, og hvordan forhandler har håndtert saken. Det krever en konkret vurdering."
      primaryCtaButton="Sjekk saken din"
      secondaryCtaText="Sjekk saken din nå →"
    >
      {/* Sterkere vern */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Sterkere vern hos forhandler – men du må fortsatt ha en mangel
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Forbrukerkjøpsloven gjelder når du kjøper bil av en
            næringsdrivende. Loven kan ikke avtales bort, og gir deg et
            sterkere vern enn kjøpsloven mellom private.
          </p>
          <p className="text-slate-300">
            Men sterkere vern betyr ikke automatisk medhold. Hva du kan forvente
            avhenger av bilens pris, alder og hva som ble opplyst ved kjøpet.
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>• 5 års reklamasjonsfrist for feil som kan vare over tid</li>
            <li>
              • Feil innen 6 måneder antas å ha fantes ved levering –
              forhandler må bevise det motsatte
            </li>
            <li>
              • Forhandler kan ikke fraskrive seg ansvar gjennom
              kontraktsvilkår
            </li>
          </ul>
        </div>
      </section>

      {/* Hvorfor noen får avslag */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Hvorfor noen får avslag</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Et avslag fra forhandler er deres syn på saken – ikke en juridisk
            konklusjon.
          </p>
          <div className="space-y-3 mt-4">
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
                «Du har reklamert for sent»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Hva som er «rimelig tid» varierer – forhandlers påstand er ikke
                avgjørende.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                «Vi har tilbudt reparasjon»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Forhandler har rett til å forsøke retting, men retten er ikke
                ubegrenset.
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

      {/* Når forhandlerkjøp kan gi grunnlag for heving */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Når kan du heve et bilkjøp fra forhandler?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Forbrukerkjøpsloven gir deg rett til å heve dersom mangelen er
            vesentlig og forhandler ikke har klart å rette feilen innen rimelig
            tid. Den 6 måneder lange presumsjonsregelen styrker din posisjon
            ytterligere – forhandler må bevise at feilen ikke fantes ved
            levering. Heving innebærer at du leverer bilen tilbake og får
            kjøpesummen igjen, eventuelt med fradrag for faktisk bruk.
          </p>
          <p className="text-slate-300">
            Les om vilkår, frister og typiske utfall i vår guide om{" "}
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
              q: "Hvor lenge kan jeg reklamere på bil kjøpt av forhandler?",
              a: "Opptil 5 år for feil som kan vare over tid. Du må også reklamere innen rimelig tid etter at du oppdaget feilen.",
            },
            {
              q: "Hva betyr seks måneders-regelen?",
              a: "Feil som viser seg innen 6 måneder antas å ha fantes ved levering. Da er det forhandler som må bevise at den ikke gjorde det.",
            },
            {
              q: "Kan jeg kreve pengene tilbake hvis reparasjon ikke hjelper?",
              a: "Heving kan være aktuelt hvis retting ikke lykkes eller mangelen er vesentlig, men terskelen er høy.",
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
            Rettigheter må alltid vurderes konkret
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
