// JSON-LD Schema Builders for SEO
// This file is server-only and produces invisible structured data

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const SITE_URL = "https://harjegkravpå.no";
const BASE_URL = SITE_URL;

export function buildWebPageSchema({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${BASE_URL}${url}`,
    isPartOf: {
      "@type": "WebSite",
      name: "Harjegkravpå.no",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Harjegkravpå.no",
      url: BASE_URL,
    },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

export function buildFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Harjegkravpå.no",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: "Finn ut om du har krav ved bilkjøp, MC-kjøp eller flyreiser",
    sameAs: [],
  };
}
