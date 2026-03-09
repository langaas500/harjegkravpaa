import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "MC fra forhandler med feil? Sjekk rettighetene dine",
  description:
    "Kjøpt MC fra forhandler med feil? Du har sterkt forbrukervern. Legg inn saken — AI lager rapport + kravbrev for 99 kr.",
  alternates: {
    canonical: `${SITE_URL}/mc-kjop/forhandler`,
  },
  openGraph: {
    title: "MC fra forhandler med feil? Sjekk rettighetene dine",
    description:
      "Kjøpt MC fra forhandler med feil? Legg inn saken — AI lager rapport + kravbrev for 99 kr.",
    url: `${SITE_URL}/mc-kjop/forhandler`,
    siteName: "HarJegKravPå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MC fra forhandler med feil? Sjekk rettighetene dine",
    description:
      "Kjøpt MC fra forhandler med feil? Legg inn saken — AI lager rapport + kravbrev for 99 kr.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebPageSchema({
    title: "Kjøpt MC fra forhandler? Sterkt forbrukervern",
    description:
      "Kjøpt MC fra forhandler og oppdaget feil? Du har sterkt forbrukervern.",
    url: "/mc-kjop/forhandler",
  });

  return (
    <>
      <SeoJsonLd data={schema} />
      {children}
    </>
  );
}
