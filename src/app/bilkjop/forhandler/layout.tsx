import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Bil fra forhandler – dine rettigheter | Harjegkravpå.no",
  description:
    "Kjøpte du bil fra forhandler og oppdaget feil? Finn ut om dine rettigheter etter forbrukerkjøpsloven.",
  alternates: {
    canonical: `${SITE_URL}/bilkjop/forhandler`,
  },
  openGraph: {
    title: "Bil fra forhandler – dine rettigheter | Harjegkravpå.no",
    description:
      "Kjøpte du bil fra forhandler og oppdaget feil? Finn ut om dine rettigheter etter forbrukerkjøpsloven.",
    url: `${SITE_URL}/bilkjop/forhandler`,
    siteName: "Harjegkravpå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bil fra forhandler – dine rettigheter | Harjegkravpå.no",
    description:
      "Kjøpte du bil fra forhandler og oppdaget feil? Finn ut om dine rettigheter etter forbrukerkjøpsloven.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebPageSchema({
    title: "Bil fra forhandler – dine rettigheter",
    description:
      "Kjøpte du bil fra forhandler og oppdaget feil? Finn ut om dine rettigheter.",
    url: "/bilkjop/forhandler",
  });

  return (
    <>
      <SeoJsonLd data={schema} />
      {children}
    </>
  );
}
