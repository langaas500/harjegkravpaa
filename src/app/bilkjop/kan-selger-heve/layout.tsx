import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Kan selger heve bilkjøpet? Regler du bør kjenne",
  description:
    "Kan selger heve bilkjøpet ditt? Les om betalingsmislighold og kontraktsbrudd. Usikker på dine rettigheter? AI lager rapport + kravbrev for 99 kr.",
  alternates: {
    canonical: `${SITE_URL}/bilkjop/kan-selger-heve`,
  },
  openGraph: {
    title: "Kan selger heve bilkjøpet? Regler du bør kjenne",
    description:
      "Les om betalingsmislighold og kontraktsbrudd. AI lager rapport + kravbrev for 99 kr.",
    url: `${SITE_URL}/bilkjop/kan-selger-heve`,
    siteName: "HarJegKravPå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kan selger heve bilkjøpet? Regler",
    description:
      "Les om selgers hevingsrett. Sjekk saken din for 99 kr.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Kan selger heve hvis kjøper betaler én dag for sent?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nei, én dags forsinkelse vil normalt ikke utgjøre vesentlig kontraktsbrudd. Selger må gi en rimelig tilleggsfrist, og forsinkelsen må være av en viss varighet og betydning.",
      },
    },
    {
      "@type": "Question",
      name: "Kan selger heve etter at bilen er levert?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, men bare dersom selger har tatt forbehold om dette (stansingsrett/salgspant), eller dersom kjøper ikke har betalt og det foreligger vesentlig betalingsmislighold.",
      },
    },
    {
      "@type": "Question",
      name: "Hva skjer med bilen hvis selger hever?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ved heving skal ytelsene tilbakeføres. Kjøper leverer tilbake bilen, og selger tilbakefører eventuelt mottatt betaling. Begge parter skal stilles som om avtalen ikke var inngått.",
      },
    },
    {
      "@type": "Question",
      name: "Kan selger heve hvis kjøper ikke henter bilen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, dersom kjøper uten gyldig grunn unnlater å medvirke til kjøpet, for eksempel ved ikke å hente bilen som avtalt, kan dette utgjøre et kontraktsbrudd som gir selger hevingsrett.",
      },
    },
    {
      "@type": "Question",
      name: "Gjelder samme regler for privatperson og forhandler som selger?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Selgers hevingsrett følger av kjøpsloven ved privatsalg og forbrukerkjøpsloven ved forhandlersalg. Vilkårene er i stor grad like: det kreves vesentlig kontraktsbrudd fra kjøpers side.",
      },
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const webPageSchema = buildWebPageSchema({
    title: "Kan selger heve bilkjøpet? Regler",
    description:
      "Kan selger heve kjøpet av bil? Les om betalingsmislighold, vesentlig kontraktsbrudd, tilbakeholdsrett og heving før levering.",
    url: "/bilkjop/kan-selger-heve",
  });

  return (
    <>
      <SeoJsonLd data={webPageSchema} />
      <SeoJsonLd data={faqSchema} />
      {children}
    </>
  );
}
