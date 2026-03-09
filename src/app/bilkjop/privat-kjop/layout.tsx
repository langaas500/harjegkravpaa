import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Kjøpt bil privat med feil? Sjekk hva du kan kreve",
  description:
    "Feil på bil kjøpt privat? Legg inn din sak og last opp dokumenter — AI vurderer rettighetene dine etter kjøpsloven og lager kravbrev til selger. 99 kr.",
  alternates: {
    canonical: `${SITE_URL}/bilkjop/privat-kjop`,
  },
  openGraph: {
    title: "Kjøpt bil privat med feil? Sjekk hva du kan kreve",
    description:
      "AI vurderer saken din etter kjøpsloven og lager kravbrev til selger. 99 kr.",
    url: `${SITE_URL}/bilkjop/privat-kjop`,
    siteName: "HarJegKravPå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Feil på bil kjøpt privat? Sjekk om du har krav",
    description:
      "Legg inn saken, få AI-vurdering + kravbrev. 99 kr – klar på minutter.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebPageSchema({
    title: "Privat bilkjøp – dine rettigheter",
    description:
      "Kjøpte du bil privat og oppdaget feil? Finn ut hvilke rettigheter du har.",
    url: "/bilkjop/privat-kjop",
  });

  return (
    <>
      <SeoJsonLd data={schema} />
      {children}
    </>
  );
}
