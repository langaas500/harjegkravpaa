import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Tidsfrist for heving av bilkjøp | Harjegkravpå.no",
  description:
    "Hvor lang tid har du på å heve et bilkjøp? Les om reklamasjonsfrist, absolutt frist, 2 vs 5 år og når fristene begynner å løpe.",
  alternates: {
    canonical: `${SITE_URL}/bilkjop/heving-tidsfrist`,
  },
  openGraph: {
    title: "Tidsfrist for heving av bilkjøp | Harjegkravpå.no",
    description:
      "Hvor lang tid har du på å heve et bilkjøp? Les om reklamasjonsfrist, absolutt frist, 2 vs 5 år og når fristene begynner å løpe.",
    url: `${SITE_URL}/bilkjop/heving-tidsfrist`,
    siteName: "Harjegkravpå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tidsfrist for heving av bilkjøp | Harjegkravpå.no",
    description:
      "Hvor lang tid har du på å heve et bilkjøp? Les om reklamasjonsfrist, absolutt frist, 2 vs 5 år og når fristene begynner å løpe.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hva betyr «innen rimelig tid»?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Det finnes ingen fast definisjon, men 2–3 måneder etter at du oppdaget feilen regnes normalt som innenfor. Jo lengre tid som går, desto større risiko for at reklamasjonen anses for sen.",
      },
    },
    {
      "@type": "Question",
      name: "Kan jeg heve etter 5 år?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ved forhandlerkjøp er den absolutte fristen 5 år. Du må likevel reklamere innen rimelig tid etter at feilen ble oppdaget. Etter 5 år er kravet foreldet uavhengig av når feilen viste seg.",
      },
    },
    {
      "@type": "Question",
      name: "Begynner fristen å løpe fra kjøpsdato eller leveringsdato?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fristene begynner normalt å løpe fra det tidspunktet du overtok bilen (leveringstidspunktet), ikke fra kontraktsdato.",
      },
    },
    {
      "@type": "Question",
      name: "Hva hvis jeg oppdager feilen lenge etter kjøpet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Du kan fortsatt reklamere dersom du er innenfor den absolutte fristen (2 eller 5 år) og reklamerer innen rimelig tid etter oppdagelsen. Skjulte feil som viser seg sent kan gi grunnlag for krav.",
      },
    },
    {
      "@type": "Question",
      name: "Mister jeg retten til heving hvis jeg reklamerer for sent?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. For sen reklamasjon medfører at du taper retten til å gjøre mangelen gjeldende – uavhengig av hvor alvorlig feilen er.",
      },
    },
    {
      "@type": "Question",
      name: "Gjelder andre frister for erstatningskrav?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Erstatningskrav følger de alminnelige foreldelsesreglene i foreldelsesloven, med en hovedregel på 3 år fra du fikk eller burde fått kjennskap til kravet.",
      },
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const webPageSchema = buildWebPageSchema({
    title: "Tidsfrist for heving av bilkjøp",
    description:
      "Hvor lang tid har du på å heve et bilkjøp? Les om reklamasjonsfrist, absolutt frist, 2 vs 5 år og når fristene begynner å løpe.",
    url: "/bilkjop/heving-tidsfrist",
  });

  return (
    <>
      <SeoJsonLd data={webPageSchema} />
      <SeoJsonLd data={faqSchema} />
      {children}
    </>
  );
}
