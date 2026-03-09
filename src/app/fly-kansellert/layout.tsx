import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Fly kansellert? Sjekk kompensasjonskravet ditt – 99 kr",
  description:
    "Kansellert fly? Du kan ha krav på opptil 600 euro + refusjon. Legg inn flyreisen — AI lager rapport + kravbrev for 99 kr.",
  alternates: {
    canonical: `${SITE_URL}/fly-kansellert`,
  },
  openGraph: {
    title: "Fly kansellert? Sjekk kompensasjonskravet ditt – 99 kr",
    description:
      "AI lager rapport + kravbrev til flyselskapet for 99 kr.",
    url: `${SITE_URL}/fly-kansellert`,
    siteName: "HarJegKravPå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fly kansellert? Rapport + kravbrev for 99 kr",
    description:
      "Opptil 600 euro i kompensasjon. Sjekk saken for 99 kr.",
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
