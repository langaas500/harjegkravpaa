import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Garanti på MC – hva dekkes? | Harjegkravpå.no",
  description:
    "Hva dekker garantien på motorsykkel? Les om forskjellen på garanti og reklamasjon, og hva du kan kreve. Gratis vurdering.",
  alternates: {
    canonical: `${SITE_URL}/mc-kjop/garanti`,
  },
  openGraph: {
    title: "Garanti på MC – hva dekkes? | Harjegkravpå.no",
    description:
      "Hva dekker garantien på motorsykkel? Les om forskjellen på garanti og reklamasjon, og hva du kan kreve. Gratis vurdering.",
    url: `${SITE_URL}/mc-kjop/garanti`,
    siteName: "Harjegkravpå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Garanti på MC – hva dekkes? | Harjegkravpå.no",
    description:
      "Hva dekker garantien på motorsykkel? Les om forskjellen på garanti og reklamasjon, og hva du kan kreve. Gratis vurdering.",
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
