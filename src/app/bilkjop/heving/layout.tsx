import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Heving av bilkjøp – når kan du heve? | Harjegkravpå.no",
  description:
    "Finn ut når du kan heve et bilkjøp og få pengene tilbake. Lær om vilkårene for heving og hvordan du går frem.",
  alternates: {
    canonical: `${SITE_URL}/bilkjop/heving`,
  },
  openGraph: {
    title: "Heving av bilkjøp – når kan du heve? | Harjegkravpå.no",
    description:
      "Finn ut når du kan heve et bilkjøp og få pengene tilbake. Lær om vilkårene for heving og hvordan du går frem.",
    url: `${SITE_URL}/bilkjop/heving`,
    siteName: "Harjegkravpå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heving av bilkjøp – når kan du heve? | Harjegkravpå.no",
    description:
      "Finn ut når du kan heve et bilkjøp og få pengene tilbake. Lær om vilkårene for heving og hvordan du går frem.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebPageSchema({
    title: "Heving av bilkjøp – når kan du heve?",
    description:
      "Finn ut når du kan heve et bilkjøp og få pengene tilbake.",
    url: "/bilkjop/heving",
  });

  return (
    <>
      <SeoJsonLd data={schema} />
      {children}
    </>
  );
}
