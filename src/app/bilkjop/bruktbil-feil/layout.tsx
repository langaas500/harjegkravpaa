import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Kjøpt bruktbil med feil? Sjekk saken din og få kravbrev – 99 kr",
  description:
    "Oppdaget feil på bruktbilen? Legg inn saken din og last opp dokumenter — AI vurderer om du har krav på prisavslag, heving eller erstatning, og lager ferdig kravbrev. 99 kr.",
  alternates: {
    canonical: `${SITE_URL}/bilkjop/bruktbil-feil`,
  },
  openGraph: {
    title: "Kjøpt bruktbil med feil? Sjekk saken din og få kravbrev – 99 kr",
    description:
      "Oppdaget feil på bruktbilen? AI vurderer saken og lager rapport + kravbrev. 99 kr.",
    url: `${SITE_URL}/bilkjop/bruktbil-feil`,
    siteName: "HarJegKravPå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kjøpt bruktbil med feil? Få AI-vurdering + kravbrev",
    description:
      "Legg inn saken og få rapport + kravbrev basert på norsk lov. 99 kr.",
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
