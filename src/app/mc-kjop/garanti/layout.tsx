import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Garanti på MC – hva dekkes og hva kan du kreve?",
  description:
    "Garanti vs. reklamasjon for motorsykkel: hva gjelder? Legg inn saken og få AI-vurdering + kravbrev for 99 kr.",
  alternates: {
    canonical: `${SITE_URL}/mc-kjop/garanti`,
  },
  openGraph: {
    title: "Garanti på MC – hva dekkes og hva kan du kreve?",
    description:
      "Garanti vs. reklamasjon for MC: Legg inn saken og få AI-vurdering + kravbrev for 99 kr.",
    url: `${SITE_URL}/mc-kjop/garanti`,
    siteName: "HarJegKravPå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Garanti på MC – hva dekkes og hva kan du kreve?",
    description:
      "Garanti vs. reklamasjon for MC: Legg inn saken og få AI-vurdering + kravbrev for 99 kr.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebPageSchema({
    title: "Garanti på MC – hva dekkes?",
    description:
      "Hva dekker garantien på motorsykkel? Les om forskjellen på garanti og reklamasjon.",
    url: "/mc-kjop/garanti",
  });

  return (
    <>
      <SeoJsonLd data={schema} />
      {children}
    </>
  );
}
