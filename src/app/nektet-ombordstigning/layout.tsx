import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Nektet ombordstigning? Sjekk kompensasjonskravet – 99 kr",
  description:
    "Nektet ombordstigning ved overbooking? Du kan ha krav på opptil 600 euro. Legg inn saken — AI lager rapport + kravbrev for 99 kr.",
  alternates: {
    canonical: `${SITE_URL}/nektet-ombordstigning`,
  },
  openGraph: {
    title: "Nektet ombordstigning? Sjekk kompensasjonskravet – 99 kr",
    description:
      "AI lager rapport + kravbrev til flyselskapet for 99 kr.",
    url: `${SITE_URL}/nektet-ombordstigning`,
    siteName: "HarJegKravPå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nektet ombordstigning? Rapport + kravbrev for 99 kr",
    description:
      "Opptil 600 euro i kompensasjon. Sjekk saken for 99 kr.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebPageSchema({
    title: "Nektet ombordstigning? Sjekk dine rettigheter",
    description:
      "Ble du nektet ombordstigning på grunn av overbooking? Du kan ha krav på opptil 600 euro.",
    url: "/nektet-ombordstigning",
  });

  return (
    <>
      <SeoJsonLd data={schema} />
      {children}
    </>
  );
}
