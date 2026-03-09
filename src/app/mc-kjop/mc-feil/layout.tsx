import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Feil på motorsykkelen? Sjekk hva du kan kreve – 99 kr",
  description:
    "Oppdaget feil på MC etter kjøpet? Legg inn saken din og last opp bilder — AI vurderer rettighetene dine og lager kravbrev for 99 kr.",
  alternates: {
    canonical: `${SITE_URL}/mc-kjop/mc-feil`,
  },
  openGraph: {
    title: "Feil på motorsykkelen? Sjekk hva du kan kreve – 99 kr",
    description:
      "Feil på MC etter kjøpet? Legg inn saken — AI vurderer rettighetene dine og lager kravbrev for 99 kr.",
    url: `${SITE_URL}/mc-kjop/mc-feil`,
    siteName: "HarJegKravPå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Feil på motorsykkelen? Sjekk hva du kan kreve – 99 kr",
    description:
      "Feil på MC etter kjøpet? Legg inn saken — AI vurderer rettighetene dine og lager kravbrev for 99 kr.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebPageSchema({
    title: "Feil på MC? Sjekk dine rettigheter",
    description:
      "Har du oppdaget feil på motorsykkelen etter kjøpet? Finn ut om du har krav på reklamasjon, prisavslag eller heving.",
    url: "/mc-kjop/mc-feil",
  });

  return (
    <>
      <SeoJsonLd data={schema} />
      {children}
    </>
  );
}
