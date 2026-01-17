import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Kjøpt bil med feil? Sjekk om du har krav | Harjegkravpå.no",
  description:
    "Kjøpt bruktbil med feil? Sjekk om du har krav på prisavslag, heving eller erstatning. Gratis vurdering.",
  alternates: {
    canonical: `${SITE_URL}/bilkjop/bruktbil-feil`,
  },
  openGraph: {
    title: "Kjøpt bil med feil? Sjekk om du har krav | Harjegkravpå.no",
    description:
      "Kjøpt bruktbil med feil? Sjekk om du har krav på prisavslag, heving eller erstatning. Gratis vurdering.",
    url: `${SITE_URL}/bilkjop/bruktbil-feil`,
    siteName: "Harjegkravpå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kjøpt bil med feil? Sjekk om du har krav | Harjegkravpå.no",
    description:
      "Kjøpt bruktbil med feil? Sjekk om du har krav på prisavslag, heving eller erstatning. Gratis vurdering.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebPageSchema({
    title: "Kjøpt bil med feil? Sjekk om du har krav",
    description:
      "Kjøpt bruktbil med feil? Sjekk om du har krav på prisavslag, heving eller erstatning.",
    url: "/bilkjop/bruktbil-feil",
  });

  return (
    <>
      <SeoJsonLd data={schema} />
      {children}
    </>
  );
}
