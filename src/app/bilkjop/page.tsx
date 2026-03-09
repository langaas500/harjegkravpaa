import { Suspense } from "react";
import Link from "next/link";
import BilkjopWizard from "./wizard/BilkjopWizard";

const SITE_URL = "https://harjegkravpå.no";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Hjem",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Bilkjøp",
      item: `${SITE_URL}/bilkjop`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hva kan jeg kreve hvis bilen har feil?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Du kan kreve retting (reparasjon), prisavslag, heving av bilkjøpet eller erstatning, avhengig av feilens alvorlighetsgrad og om du kjøpte fra privatperson eller forhandler.",
      },
    },
    {
      "@type": "Question",
      name: "Hva er forskjellen på heving og prisavslag?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ved heving av bilkjøp leverer du bilen tilbake og får kjøpesummen refundert. Ved prisavslag beholder du bilen og får kompensasjon for verdireduksjonen. Heving krever en mer alvorlig feil enn prisavslag.",
      },
    },
    {
      "@type": "Question",
      name: "Hvor lenge kan jeg reklamere på bruktbil?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ved kjøp fra privatperson er fristen 2 år. Ved kjøp fra forhandler er fristen 5 år. I begge tilfeller må du reklamere innen rimelig tid etter at du oppdaget feilen.",
      },
    },
  ],
};

export default function BilkjopPage() {
  return (
    <>
      <Suspense fallback={<div className="bg-[#0a0f0d] min-h-screen" />}>
        <BilkjopWizard />
      </Suspense>

      <nav
        aria-label="Relaterte guider om bilkjøp"
        className="bg-[#0a0f0d] text-white border-t border-white/[0.06] px-4 py-10"
      >
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-lg font-semibold text-slate-300">
            Les mer om dine rettigheter ved bilkjøp
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link
              href="/bilkjop/heving"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              Heving av bilkjøp
            </Link>
            <Link
              href="/bilkjop/reklamasjon"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              Reklamasjon på bil
            </Link>
            <Link
              href="/bilkjop/bruktbil-feil"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              Kjøpt bil med feil?
            </Link>
            <Link
              href="/bilkjop/garanti"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              Garanti på bil
            </Link>
            <Link
              href="/bilkjop/skjulte-feil-bil"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              Skjulte feil på bil
            </Link>
          </div>
          <p className="text-sm text-slate-400">
            Vil du{" "}
            <Link
              href="/bilkjop/heving"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              kreve heving
            </Link>
            ? Les vår komplette guide om regler, frister og fremgangsmåte for
            heving av bilkjøp.
          </p>
        </div>
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
