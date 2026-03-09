import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Reklamasjon på MC – slik går du frem",
  description:
    "Vil du reklamere på motorsykkel? Legg inn saken — AI lager rapport + kravbrev til selger for 99 kr.",
  alternates: {
    canonical: `${SITE_URL}/mc-kjop/reklamasjon`,
  },
  openGraph: {
    title: "Reklamasjon på MC – slik går du frem",
    description:
      "Reklamere på MC? Legg inn saken — AI lager rapport + kravbrev til selger for 99 kr.",
    url: `${SITE_URL}/mc-kjop/reklamasjon`,
    siteName: "HarJegKravPå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reklamasjon på MC – slik går du frem",
    description:
      "Reklamere på MC? Legg inn saken — AI lager rapport + kravbrev til selger for 99 kr.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebPageSchema({
    title: "Reklamasjon på MC – dine rettigheter",
    description:
      "Vil du reklamere på motorsykkel? Les om reklamasjonsfrister, hva du kan kreve og hvordan du går frem.",
    url: "/mc-kjop/reklamasjon",
  });

  return (
    <>
      <SeoJsonLd data={schema} />
      {children}
    </>
  );
}
