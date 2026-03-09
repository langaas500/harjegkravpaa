import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Heve MC-kjøp? Sjekk vilkårene og få kravbrev",
  description:
    "Vil du heve MC-kjøpet? Les om vilkårene. Legg inn saken — AI lager rapport + kravbrev til selger for 99 kr.",
  alternates: {
    canonical: `${SITE_URL}/mc-kjop/heving`,
  },
  openGraph: {
    title: "Heve MC-kjøp? Sjekk vilkårene og få kravbrev",
    description:
      "Vil du heve MC-kjøpet? Legg inn saken — AI lager rapport + kravbrev til selger for 99 kr.",
    url: `${SITE_URL}/mc-kjop/heving`,
    siteName: "HarJegKravPå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heve MC-kjøp? Sjekk vilkårene og få kravbrev",
    description:
      "Vil du heve MC-kjøpet? Legg inn saken — AI lager rapport + kravbrev til selger for 99 kr.",
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
