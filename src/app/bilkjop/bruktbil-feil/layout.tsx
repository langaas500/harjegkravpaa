import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Feil på bruktbil? Sjekk dine rettigheter | Harjegkravpå.no",
  description:
    "Har du oppdaget feil på bruktbilen etter kjøpet? Finn ut om du har krav på reklamasjon, prisavslag eller heving. Gratis vurdering.",
  alternates: {
    canonical: `${SITE_URL}/bilkjop/bruktbil-feil`,
  },
  openGraph: {
    title: "Feil på bruktbil? Sjekk dine rettigheter | Harjegkravpå.no",
    description:
      "Har du oppdaget feil på bruktbilen etter kjøpet? Finn ut om du har krav på reklamasjon, prisavslag eller heving. Gratis vurdering.",
    url: `${SITE_URL}/bilkjop/bruktbil-feil`,
    siteName: "Harjegkravpå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Feil på bruktbil? Sjekk dine rettigheter | Harjegkravpå.no",
    description:
      "Har du oppdaget feil på bruktbilen etter kjøpet? Finn ut om du har krav på reklamasjon, prisavslag eller heving. Gratis vurdering.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebPageSchema({
    title: "Feil på bruktbil? Sjekk dine rettigheter",
    description:
      "Har du oppdaget feil på bruktbilen etter kjøpet? Finn ut om du har krav på reklamasjon, prisavslag eller heving.",
    url: "/bilkjop/bruktbil-feil",
  });

  return (
    <>
      <SeoJsonLd data={schema} />
      {children}
    </>
  );
}
