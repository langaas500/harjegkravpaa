import Link from "next/link";
import { ArrowRight, Scale, ShieldCheck, Clock, ChevronRight } from "lucide-react";
import SeoJsonLd from "@/components/SeoJsonLd";
import SeoFloatingCTA from "@/components/SeoFloatingCTA";
import { SeoNode, getRelatedNodes, CAT_CONFIG } from "@/config/seo-matrix";
import { SITE_URL } from "@/lib/seo/jsonld";

interface Props {
  node: SeoNode;
}

/* ───────── content config per category ───────── */

const BODY_CONTENT: Record<SeoNode["cat"], {
  lawIntro: string;
  deadlineTitle: string;
  deadlineText: string;
  assessmentPoints: string[];
  contextParagraph: (pillarPath: string, pillarAnchor: string) => React.ReactNode;
}> = {
  bilkjop: {
    lawIntro:
      "Kjøpsloven og forbrukerkjøpsloven gir deg rett til å reklamere på feil som forelå ved kjøpstidspunktet. Dersom mangelen er vesentlig, kan du kreve heving — det vil si å levere bilen tilbake og få kjøpesummen refundert. Terskelen er lavere ved forhandlerkjøp (forbrukerkjøpsloven § 32: ikke uvesentlig) enn ved privatkjøp (kjøpsloven § 39: vesentlig mangel).",
    deadlineTitle: "Reklamasjonsfrister",
    deadlineText:
      "Du må reklamere innen rimelig tid etter at du oppdaget feilen — normalt 2–3 måneder. I tillegg gjelder en absolutt frist: 2 år ved privatkjøp og 5 år ved forhandlerkjøp, regnet fra overtakelse.",
    assessmentPoints: [
      "Feilens art, omfang og betydning for bilens bruk og verdi",
      "Reparasjonskostnaden sett opp mot kjøpesummen",
      "Om selger har gitt uriktige eller mangelfulle opplysninger",
      "Om selger har fått anledning til å rette feilen",
      "Om prisavslag er et rimelig alternativ til heving",
    ],
    contextParagraph: (pillarPath, pillarAnchor) => (
      <p className="text-slate-300">
        Dersom feilen er alvorlig nok til å utgjøre et vesentlig kontraktsbrudd, kan du ha rett til å{" "}
        <Link href={pillarPath} className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition">
          {pillarAnchor}
        </Link>
        . Dette innebærer at kjøpet gjøres om: du leverer bilen tilbake og selger betaler tilbake kjøpesummen, med eventuelt fradrag for nyttevederlag (typisk 1–3,50 kr per kjørte kilometer).
      </p>
    ),
  },
  flyreiser: {
    lawIntro:
      "EU-forordning 261/2004 gir passasjerer rett til standardkompensasjon ved kansellering, forsinkelse over 3 timer og nektet ombordstigning. Kompensasjonen er 250 €, 400 € eller 600 € avhengig av reisedistanse. Forordningen gjelder alle flygninger fra EU/EØS, og flygninger til EU/EØS med EU-basert flyselskap.",
    deadlineTitle: "Frister og foreldelse",
    deadlineText:
      "Du bør klage til flyselskapet så snart som mulig etter hendelsen. Krav etter EU 261/2004 foreldes etter 3 år i Norge. Flyselskapet plikter å informere deg om dine rettigheter på flyplassen.",
    assessmentPoints: [
      "Om forsinkelsen eller kanselleringen skyldtes ekstraordinære omstendigheter",
      "Reisedistansen (under 1 500 km, 1 500–3 500 km, over 3 500 km)",
      "Om flyselskapet tilbød omruting innen rimelig tid",
      "Om du fikk tilbud om forpleining (mat, drikke, hotell)",
      "Om du ble informert om kanselleringen minst 14 dager i forveien",
    ],
    contextParagraph: (pillarPath, pillarAnchor) => (
      <p className="text-slate-300">
        Regelverket om{" "}
        <Link href={pillarPath} className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition">
          {pillarAnchor}
        </Link>{" "}
        gir deg et sterkt vern som passasjer. Flyselskapet kan bare avslå kravet dersom hendelsen skyldtes ekstraordinære omstendigheter utenfor selskapets kontroll — som ekstremvær eller politisk uro. Tekniske feil og intern streik regnes normalt ikke som ekstraordinært.
      </p>
    ),
  },
  "mc-kjop": {
    lawIntro:
      "Kjøpsloven regulerer kjøp av motorsykkel mellom privatpersoner. Selger har opplysningsplikt om kjente feil, og kjøper har rett til å reklamere på mangler som forelå ved kjøpstidspunktet. Dersom mangelen er vesentlig, kan du kreve heving og få kjøpesummen tilbake.",
    deadlineTitle: "Reklamasjonsfrister",
    deadlineText:
      "Du må reklamere innen rimelig tid etter at du oppdaget feilen — normalt 2–3 måneder. Den absolutte fristen er 2 år ved privatkjøp. Ved kjøp fra forhandler gjelder forbrukerkjøpsloven med 5 års frist.",
    assessmentPoints: [
      "Feilens art og betydning for motorsykkelens funksjon og sikkerhet",
      "Om selger opplyste om feilen eller burde kjent til den",
      "Reparasjonskostnad sett opp mot kjøpesummen",
      "Om feilen forelå ved overtakelsestidspunktet",
      "Om prisavslag er tilstrekkelig kompensasjon",
    ],
    contextParagraph: (pillarPath, pillarAnchor) => (
      <p className="text-slate-300">
        Les mer om{" "}
        <Link href={pillarPath} className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition">
          {pillarAnchor}
        </Link>{" "}
        i vår hovedguide. Skjulte feil som var til stede ved kjøp gir deg reklamasjonsrett selv om motorsykkelen ble solgt «som den er» — forutsatt at feilen er vesentlig eller at selger holdt tilbake informasjon.
      </p>
    ),
  },
  handverkere: {
    lawIntro:
      "Håndverkertjenesteloven (HTL) beskytter deg når du bestiller arbeid på eiendom eller løsøre. Resultatet skal være fagmessig utført og i samsvar med avtalen. Dersom håndverkeren leverer et mangelfullt resultat, har du rett til utbedring, prisavslag eller heving — avhengig av mangelens omfang.",
    deadlineTitle: "Reklamasjonsfrister",
    deadlineText:
      "Du må reklamere innen rimelig tid etter at du oppdaget mangelen. Den absolutte reklamasjonsfristen er 5 år fra arbeidet ble avsluttet. For skjulte feil som viser seg senere, begynner «rimelig tid» å løpe fra oppdagelsestidspunktet.",
    assessmentPoints: [
      "Om resultatet er i samsvar med avtalen og fagmessig standard",
      "Om håndverkeren har brukt materialer av riktig kvalitet",
      "Om arbeidet er utført i samsvar med offentlige krav (samsvarserklæring, byggeforskrifter)",
      "Om håndverkeren varslet om overskridelse av prisestimat",
      "Omfanget av utbedringskostnadene sett opp mot totalprisen",
    ],
    contextParagraph: (pillarPath, pillarAnchor) => (
      <p className="text-slate-300">
        Har du fått et dårlig resultat? Du kan{" "}
        <Link href={pillarPath} className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition">
          {pillarAnchor}
        </Link>{" "}
        dersom resultatet ikke holder fagmessig standard. Håndverkertjenesteloven gir deg rett til å holde tilbake betaling til mangelen er utbedret, og du kan kreve erstatning for dokumenterte tap.
      </p>
    ),
  },
};

/* ───────── component ───────── */

export default function UniversalSeoTemplate({ node }: Props) {
  const config = CAT_CONFIG[node.cat];
  const body = BODY_CONTENT[node.cat];
  const related = getRelatedNodes(node.cat, node.slug, 5);

  const canonicalUrl = `${SITE_URL}/${node.cat}/${node.slug}`;

  // JSON-LD schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hjem", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: config.label, item: `${SITE_URL}/${node.cat}` },
      { "@type": "ListItem", position: 3, name: node.title, item: canonicalUrl },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: node.title,
    description: `${node.desc} Få juridisk rapport og kravbrev for 99 kr.`,
    datePublished: "2026-03-01",
    dateModified: "2026-03-09",
    author: { "@type": "Organization", name: "Harjegkravpå.no", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Harjegkravpå.no", url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
  };

  const defaultFaqs = [
    {
      q: `Hva sier loven om ${node.title.toLowerCase()}?`,
      a: `${node.desc} Hjemmel: ${node.lawRef}. Legg inn saken din for en personlig vurdering basert på norsk lov.`,
    },
    {
      q: "Hva koster det å få vurdert saken?",
      a: "Du får juridisk rapport og ferdig kravbrev for 99 kr. Til sammenligning koster en advokat typisk 2 500 kr per time.",
    },
    {
      q: "Hvordan fungerer tjenesten?",
      a: "Beskriv saken din, last opp dokumenter, og AI-en analyserer saken mot norsk lov. Du får rapport og kravbrev som PDF — klart til bruk med en gang.",
    },
  ];

  const activeFaqs = node.faqs && node.faqs.length > 0 ? node.faqs : defaultFaqs;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: activeFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="bg-[#0a0f0d] text-white min-h-screen overflow-hidden" style={{ zoom: 0.88 }}>
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-600/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 pt-10 pb-16">
        {/* Breadcrumbs — visual */}
        <nav aria-label="Brødsmuler" className="flex items-center gap-1.5 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-300 transition">Hjem</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href={`/${node.cat}`} className="hover:text-slate-300 transition">{config.label}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-400 truncate">{node.title}</span>
        </nav>

        {/* Eyebrow + H1 */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-emerald-400/80 text-sm font-medium tracking-wide uppercase mb-4">
            <Scale className="h-4 w-4" />
            {node.lawRef}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
            {node.title}
          </h1>
          <p className="text-lg text-slate-300 mt-4 leading-relaxed max-w-2xl">
            {node.desc}
          </p>
        </div>

        {/* Primary CTA */}
        <section className="relative rounded-3xl overflow-hidden mb-14">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-transparent p-[1px]">
            <div className="h-full w-full rounded-3xl bg-[#0a0f0d]" />
          </div>
          <div className="relative p-8 md:p-10 text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-emerald-400 text-sm font-medium mb-5">
              <Clock className="h-3.5 w-3.5" />
              Tar ca. 2 minutter
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Få juridisk vurdering av din sak
            </h2>
            <p className="text-slate-400 mb-6 max-w-lg mx-auto">
              La vår AI lage ditt kravbrev på 2 minutter for 99 kr — juridisk korrekt og klart til sending.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-slate-500 mb-6">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-500/60" />
                Basert på norsk lov
              </span>
              <span className="text-slate-600">Ingen registrering</span>
            </div>
            <Link
              href={config.wizardPath}
              className="group inline-flex items-center gap-2 bg-emerald-500 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-400 transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Start vurdering — 99 kr
              <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <p className="text-xs text-slate-600 mt-4">
              Veiledende vurdering · Advokat koster typisk 2 500 kr/t
            </p>
          </div>
        </section>

        {/* Slik fungerer det */}
        <section className="mb-14">
          <h2 className="text-xl font-bold mb-4">Slik fungerer det</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { n: "1", title: "Beskriv saken din", desc: "Legg inn detaljer om kjøpet og problemet" },
              { n: "2", title: "Last opp dokumenter", desc: "Kvittering, bilder, kontrakt — det du har" },
              { n: "3", title: "AI analyserer din sak", desc: "Vurdert mot norsk forbrukerlov" },
              { n: "4", title: "Rapport + kravbrev", desc: "To PDF-er, klare til bruk med en gang" },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold mb-2">
                  {s.n}
                </span>
                <p className="font-semibold text-white/90 text-sm">{s.title}</p>
                <p className="text-xs text-slate-500 mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-400 mt-3">
            Alt i én pakke: <strong className="text-white">99 kr</strong> · Advokat koster typisk 2 500 kr/t
          </p>
        </section>

        {/* Juridisk vurdering */}
        <article>
          <section className="mb-14">
            <h2 className="text-2xl font-bold mb-6">Juridisk vurdering</h2>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
              <p className="text-slate-300">{body.lawIntro}</p>
              {body.contextParagraph(config.pillarPath, config.pillarAnchor)}
              <p className="text-slate-300">Sentrale momenter i vurderingen:</p>
              <ul className="text-slate-300 space-y-2 ml-4">
                {body.assessmentPoints.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Frister */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold mb-6">{body.deadlineTitle}</h2>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8">
              <p className="text-slate-300">{body.deadlineText}</p>
            </div>
          </section>
        </article>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">Ofte stilte spørsmål</h2>
          <div className="space-y-3">
            {activeFaqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer">
                  <span className="font-medium pr-4">{faq.q}</span>
                  <svg className="h-5 w-5 text-slate-500 group-open:rotate-180 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Relaterte saker */}
        {related.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xl font-bold mb-4">Relaterte saker</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/${r.cat}/${r.slug}`}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:bg-white/[0.04] transition"
                >
                  <p className="font-semibold text-white text-sm">{r.title}</p>
                  <p className="text-xs text-emerald-400/70 mt-1">{r.lawRef}</p>
                  <span className="inline-flex items-center gap-1 text-emerald-400 mt-3 text-sm">
                    Les mer <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section data-final-cta="true" className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-emerald-500/5" />
          <div className="absolute inset-0 rounded-3xl border border-emerald-500/15" />
          <div className="relative p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Få svar på din sak
            </h2>
            <p className="text-slate-400 mb-6 max-w-lg mx-auto">
              Svar på noen spørsmål — få juridisk rapport og kravbrev for 99 kr.
            </p>
            <Link
              href={config.wizardPath}
              className="group inline-flex items-center gap-2 bg-emerald-500 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-400 transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Start vurdering — 99 kr
              <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <p className="text-xs text-slate-600 mt-4">
              Tar ca. 2 minutter · Ingen registrering
            </p>
          </div>
        </section>

        <p className="text-xs text-slate-600 text-center mt-10">
          Innholdet er generell informasjon og ikke juridisk rådgivning.
        </p>
      </div>

      <SeoFloatingCTA href={config.wizardPath} />
      <SeoJsonLd data={[breadcrumbSchema, articleSchema, faqSchema]} />
    </main>
  );
}
