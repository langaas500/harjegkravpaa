import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Fly forsinket? Sjekk kravet ditt og få kravbrev – 99 kr",
  description:
    "Forsinket fly over 3 timer? Du kan ha krav på opptil 600 euro. Legg inn flyreisen og last opp dokumentasjon — AI lager rapport + kravbrev for 99 kr.",
  alternates: {
    canonical: `${SITE_URL}/fly-forsinket`,
  },
  openGraph: {
    title: "Fly forsinket? Sjekk kravet ditt og få kravbrev – 99 kr",
    description:
      "AI lager rapport + kravbrev til flyselskapet for 99 kr.",
    url: `${SITE_URL}/fly-forsinket`,
    siteName: "HarJegKravPå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fly forsinket? AI lager rapport + kravbrev",
    description:
      "Opptil 600 euro i kompensasjon. Sjekk saken din for 99 kr.",
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
