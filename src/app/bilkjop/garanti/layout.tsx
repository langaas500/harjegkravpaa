import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Bilgaranti – hva gjelder egentlig? | Harjegkravpå.no",
  description:
    "Forstå forskjellen mellom garanti og reklamasjon ved bilkjøp. Lær hva garantien dekker og hva du har krav på uansett.",
  alternates: {
    canonical: `${SITE_URL}/bilkjop/garanti`,
  },
  openGraph: {
    title: "Bilgaranti – hva gjelder egentlig? | Harjegkravpå.no",
    description:
      "Forstå forskjellen mellom garanti og reklamasjon ved bilkjøp. Lær hva garantien dekker og hva du har krav på uansett.",
    url: `${SITE_URL}/bilkjop/garanti`,
    siteName: "Harjegkravpå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bilgaranti – hva gjelder egentlig? | Harjegkravpå.no",
    description:
      "Forstå forskjellen mellom garanti og reklamasjon ved bilkjøp. Lær hva garantien dekker og hva du har krav på uansett.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebPageSchema({
    title: "Bilgaranti – hva gjelder egentlig?",
    description:
      "Forstå forskjellen mellom garanti og reklamasjon ved bilkjøp.",
    url: "/bilkjop/garanti",
  });

  return (
    <>
      <SeoJsonLd data={schema} />
      {children}
    </>
  );
}
