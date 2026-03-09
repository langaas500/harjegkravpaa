import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Feil på bil fra forhandler? Sjekk rettighetene dine og få kravbrev",
  description:
    "Kjøpt bil fra forhandler med feil? Du har sterkt forbrukervern. Legg inn saken, last opp dokumenter — AI lager rapport + kravbrev til forhandler. 99 kr.",
  alternates: {
    canonical: `${SITE_URL}/bilkjop/forhandler`,
  },
  openGraph: {
    title: "Feil på bil fra forhandler? Sjekk rettighetene dine og få kravbrev",
    description:
      "Du har sterkt forbrukervern. AI lager rapport + kravbrev for 99 kr.",
    url: `${SITE_URL}/bilkjop/forhandler`,
    siteName: "HarJegKravPå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Feil på bil fra forhandler? Sjekk hva du kan kreve",
    description:
      "AI vurderer saken din og lager rapport + kravbrev. 99 kr – klar på minutter.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebPageSchema({
    title: "Bil fra forhandler – dine rettigheter",
    description:
      "Kjøpte du bil fra forhandler og oppdaget feil? Finn ut om dine rettigheter.",
    url: "/bilkjop/forhandler",
  });

  return (
    <>
      <SeoJsonLd data={schema} />
      {children}
    </>
  );
}
