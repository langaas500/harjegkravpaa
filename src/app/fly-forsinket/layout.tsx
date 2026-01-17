import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Fly forsinket? Sjekk om du har krav på kompensasjon | Harjegkravpå.no",
  description:
    "Ble flyet ditt forsinket mer enn 3 timer? Du kan ha krav på opptil 600 euro i kompensasjon. Sjekk dine rettigheter gratis.",
  alternates: {
    canonical: `${SITE_URL}/fly-forsinket`,
  },
  openGraph: {
    title: "Fly forsinket? Sjekk om du har krav på kompensasjon | Harjegkravpå.no",
    description:
      "Ble flyet ditt forsinket mer enn 3 timer? Du kan ha krav på opptil 600 euro i kompensasjon. Sjekk dine rettigheter gratis.",
    url: `${SITE_URL}/fly-forsinket`,
    siteName: "Harjegkravpå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fly forsinket? Sjekk om du har krav på kompensasjon | Harjegkravpå.no",
    description:
      "Ble flyet ditt forsinket mer enn 3 timer? Du kan ha krav på opptil 600 euro i kompensasjon. Sjekk dine rettigheter gratis.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebPageSchema({
    title: "Fly forsinket? Sjekk om du har krav på kompensasjon",
    description:
      "Ble flyet ditt forsinket mer enn 3 timer? Du kan ha krav på opptil 600 euro.",
    url: "/fly-forsinket",
  });

  return (
    <>
      <SeoJsonLd data={schema} />
      {children}
    </>
  );
}
