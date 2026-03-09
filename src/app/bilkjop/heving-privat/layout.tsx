import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Heve privat bilkjøp? Regler, vilkår og kravbrev for 99 kr",
  description:
    "Kjøpte du bil privat og vil heve? Les om kjøpsloven og «som den er»-forbehold. Legg inn saken din — AI lager rapport + kravbrev til selger for 99 kr.",
  alternates: {
    canonical: `${SITE_URL}/bilkjop/heving-privat`,
  },
  openGraph: {
    title: "Heve privat bilkjøp? Regler, vilkår og kravbrev for 99 kr",
    description:
      "Kjøpte du bil privat og vil heve? AI lager rapport + kravbrev til selger for 99 kr.",
    url: `${SITE_URL}/bilkjop/heving-privat`,
    siteName: "HarJegKravPå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heve privat bilkjøp? Regler og vilkår",
    description:
      "Kjøpte du bil privat og vil heve? Les om kjøpsloven. Sjekk saken din for 99 kr.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Gjelder kjøpsloven eller avhendingsloven ved privat bilsalg?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kjøpsloven gjelder ved salg av løsøre mellom privatpersoner, inkludert biler. Avhendingsloven gjelder fast eiendom og kommer ikke til anvendelse ved bilkjøp.",
      },
    },
    {
      "@type": "Question",
      name: "Kan jeg heve hvis bilen ble solgt «som den er»?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, dersom bilen er i vesentlig dårligere stand enn du hadde grunn til å forvente ut fra pris, alder og opplysninger gitt ved kjøpet. «Som den er» gir ikke selger fritt spillerom.",
      },
    },
    {
      "@type": "Question",
      name: "Hva er forskjellen på mangel og normal slitasje?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En mangel er en feil som gjør at bilen avviker fra det avtalte eller det du med rimelighet kunne forvente. Normal slitasje er forventet ut fra bilens alder og kilometerstand, og utgjør ikke en mangel.",
      },
    },
    {
      "@type": "Question",
      name: "Hvem har bevisbyrden ved privat bilkjøp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kjøper må sannsynliggjøre at mangelen forelå ved overtakelsestidspunktet. Det betyr at du bør innhente dokumentasjon som verkstedrapport eller sakkyndig vurdering.",
      },
    },
    {
      "@type": "Question",
      name: "Kan jeg kreve erstatning i tillegg til heving?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, dersom du har hatt dokumenterte utgifter som følge av mangelen, for eksempel verkstedkostnader eller leiebil. Kravet må stå i sammenheng med mangelen.",
      },
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const webPageSchema = buildWebPageSchema({
    title: "Heving av privat bilkjøp – regler",
    description:
      "Kjøpte du bil privat og vil heve? Les om kjøpsloven, «som den er»-forbehold, bevisbyrde og terskelen for heving mellom privatpersoner.",
    url: "/bilkjop/heving-privat",
  });

  return (
    <>
      <SeoJsonLd data={webPageSchema} />
      <SeoJsonLd data={faqSchema} />
      {children}
    </>
  );
}
