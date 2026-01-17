import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Fly kansellert? Sjekk dine rettigheter | Harjegkravpå.no",
  description:
    "Ble flyet ditt kansellert? Du kan ha krav på opptil 600 euro i kompensasjon pluss refusjon. Sjekk dine rettigheter.",
  alternates: {
    canonical: `${SITE_URL}/fly-kansellert`,
  },
  openGraph: {
    title: "Fly kansellert? Sjekk dine rettigheter | Harjegkravpå.no",
    description:
      "Ble flyet ditt kansellert? Du kan ha krav på opptil 600 euro i kompensasjon pluss refusjon. Sjekk dine rettigheter.",
    url: `${SITE_URL}/fly-kansellert`,
    siteName: "Harjegkravpå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fly kansellert? Sjekk dine rettigheter | Harjegkravpå.no",
    description:
      "Ble flyet ditt kansellert? Du kan ha krav på opptil 600 euro i kompensasjon pluss refusjon. Sjekk dine rettigheter.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebPageSchema({
    title: "Fly kansellert? Sjekk dine rettigheter",
    description:
      "Ble flyet ditt kansellert? Du kan ha krav på opptil 600 euro i kompensasjon.",
    url: "/fly-kansellert",
  });

  return (
    <>
      <SeoJsonLd data={schema} />
      {children}
    </>
  );
}
