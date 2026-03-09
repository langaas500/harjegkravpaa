import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Reklamasjon på bil – slik gjør du det riktig",
  description:
    "Reklamere på bil? Legg inn saken din og last opp dokumenter — AI vurderer om du har krav og lager ferdig kravbrev til selger. Rapport + kravbrev for 99 kr.",
  alternates: {
    canonical: `${SITE_URL}/bilkjop/reklamasjon`,
  },
  openGraph: {
    title: "Reklamasjon på bil – slik gjør du det riktig",
    description:
      "AI lager rapport + kravbrev til selger for 99 kr. Legg inn saken din.",
    url: `${SITE_URL}/bilkjop/reklamasjon`,
    siteName: "HarJegKravPå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reklamasjon på bil – slik gjør du det riktig",
    description:
      "AI-vurdering + kravbrev for 99 kr. Legg inn saken din.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebPageSchema({
    title: "Reklamasjon på bil – dine rettigheter",
    description:
      "Lær om reklamasjonsrett ved bilkjøp. Finn ut når du kan reklamere, hvilke frister som gjelder.",
    url: "/bilkjop/reklamasjon",
  });

  return (
    <>
      <SeoJsonLd data={schema} />
      {children}
    </>
  );
}
