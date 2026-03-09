import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Garanti på bil – hva dekkes og hva kan du kreve?",
  description:
    "Garanti vs. reklamasjon ved bilkjøp: hva gjelder? Legg inn din sak og få AI-vurdering med rapport + kravbrev for 99 kr. Advokat koster typisk 2 500 kr/t.",
  alternates: {
    canonical: `${SITE_URL}/bilkjop/garanti`,
  },
  openGraph: {
    title: "Garanti på bil – hva dekkes og hva kan du kreve?",
    description:
      "Garanti vs. reklamasjon ved bilkjøp: hva gjelder? Få AI-vurdering + kravbrev for 99 kr.",
    url: `${SITE_URL}/bilkjop/garanti`,
    siteName: "HarJegKravPå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Garanti på bil – hva dekkes?",
    description:
      "Forstå forskjellen mellom garanti og reklamasjon. Sjekk din sak med AI-verktøy for 99 kr.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebPageSchema({
    title: "Bilgaranti – hva gjelder egentlig?",
    description:
      "Forstå forskjellen mellom garanti og reklamasjon ved bilkjøp.",
    url: "/bilkjop/garanti",
  });

  return (
    <>
      <SeoJsonLd data={schema} />
      {children}
    </>
  );
}
