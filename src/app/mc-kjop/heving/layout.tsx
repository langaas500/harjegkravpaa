import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Heving av MC-kjøp – når kan du heve? | Harjegkravpå.no",
  description:
    "Når kan du heve et MC-kjøp og få pengene tilbake? Les om vilkårene for heving og hvordan du går frem. Gratis vurdering.",
  alternates: {
    canonical: `${SITE_URL}/mc-kjop/heving`,
  },
  openGraph: {
    title: "Heving av MC-kjøp – når kan du heve? | Harjegkravpå.no",
    description:
      "Når kan du heve et MC-kjøp og få pengene tilbake? Les om vilkårene for heving og hvordan du går frem. Gratis vurdering.",
    url: `${SITE_URL}/mc-kjop/heving`,
    siteName: "Harjegkravpå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heving av MC-kjøp – når kan du heve? | Harjegkravpå.no",
    description:
      "Når kan du heve et MC-kjøp og få pengene tilbake? Les om vilkårene for heving og hvordan du går frem. Gratis vurdering.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebPageSchema({
    title: "Heving av MC-kjøp – når kan du heve?",
    description:
      "Når kan du heve et MC-kjøp og få pengene tilbake? Les om vilkårene for heving.",
    url: "/mc-kjop/heving",
  });

  return (
    <>
      <SeoJsonLd data={schema} />
      {children}
    </>
  );
}
