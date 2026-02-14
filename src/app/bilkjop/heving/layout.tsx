import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Heve bilkjøp? Sjekk om du kan få pengene tilbake (gratis) | Harjegkravpå.no",
  description:
    "Har bilen alvorlige feil eller skjulte mangler? Finn ut om du kan heve bilkjøpet (privat eller forhandler). Gratis vurdering på ca. 2 minutter.",
  alternates: {
    canonical: `${SITE_URL}/bilkjop/heving`,
  },
  openGraph: {
    title: "Heve bilkjøp? Sjekk om du kan få pengene tilbake (gratis) | Harjegkravpå.no",
    description:
      "Har bilen alvorlige feil eller skjulte mangler? Finn ut om du kan heve bilkjøpet (privat eller forhandler). Gratis vurdering på ca. 2 minutter.",
    url: `${SITE_URL}/bilkjop/heving`,
    siteName: "Harjegkravpå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heve bilkjøp? Sjekk om du kan få pengene tilbake (gratis) | Harjegkravpå.no",
    description:
      "Har bilen alvorlige feil eller skjulte mangler? Finn ut om du kan heve bilkjøpet (privat eller forhandler). Gratis vurdering på ca. 2 minutter.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Kan jeg heve hvis bilen har vært på verksted flere ganger?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Flere mislykkede reparasjonsforsøk kan styrke et hevingskrav. Hvor mye som kreves avhenger ofte av feiltype, bilens alder og hva som er rimelig tid og kostnad i saken.",
      },
    },
    {
      "@type": "Question",
      name: "Kan selger nekte heving?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Selger kan ofte forsøke retting først, men retten til å rette har grenser. Dersom retting ikke lykkes eller tar urimelig lang tid, kan heving være aktuelt.",
      },
    },
    {
      "@type": "Question",
      name: "Hvor lang tid har jeg på å heve bilkjøpet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Du må reklamere innen rimelig tid etter at du oppdaget feilen. Det finnes også absolutte frister som varierer med kjøpsform og bilens forventede levetid.",
      },
    },
    {
      "@type": "Question",
      name: "Hva koster det å heve et bilkjøp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mange starter med en tydelig skriftlig reklamasjon/krav til selger. Advokat kan bli dyrt, så det kan lønne seg å få struktur på saken før du eskalerer.",
      },
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const webPageSchema = buildWebPageSchema({
    title: "Heve bilkjøp? Sjekk om du kan få pengene tilbake (gratis)",
    description:
      "Har bilen alvorlige feil eller skjulte mangler? Finn ut om du kan heve bilkjøpet (privat eller forhandler). Gratis vurdering på ca. 2 minutter.",
    url: "/bilkjop/heving",
  });

  return (
    <>
      <SeoJsonLd data={webPageSchema} />
      <SeoJsonLd data={faqSchema} />
      {children}
    </>
  );
}
