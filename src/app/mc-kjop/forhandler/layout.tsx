import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Kjøpt MC fra forhandler? Sterkt forbrukervern | Harjegkravpå.no",
  description:
    "Kjøpt MC fra forhandler og oppdaget feil? Du har sterkt forbrukervern. Les om dine rettigheter. Gratis vurdering.",
  alternates: {
    canonical: `${SITE_URL}/mc-kjop/forhandler`,
  },
  openGraph: {
    title: "Kjøpt MC fra forhandler? Sterkt forbrukervern | Harjegkravpå.no",
    description:
      "Kjøpt MC fra forhandler og oppdaget feil? Du har sterkt forbrukervern. Les om dine rettigheter. Gratis vurdering.",
    url: `${SITE_URL}/mc-kjop/forhandler`,
    siteName: "Harjegkravpå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kjøpt MC fra forhandler? Sterkt forbrukervern | Harjegkravpå.no",
    description:
      "Kjøpt MC fra forhandler og oppdaget feil? Du har sterkt forbrukervern. Les om dine rettigheter. Gratis vurdering.",
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
