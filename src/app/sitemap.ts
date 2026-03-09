import { MetadataRoute } from "next";
import { SEO_NODES } from "@/config/seo-matrix";

const BASE_URL = "https://harjegkravpå.no";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Main product pages (highest priority)
  const mainPages = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/bilkjop`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/flyreiser`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/handverkere`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // Bilkjop SEO content pages
  const bilkjopSeoPages = [
    "/bilkjop/heving",
    "/bilkjop/bruktbil-feil",
    "/bilkjop/reklamasjon",
    "/bilkjop/skjulte-feil-bil",
    "/bilkjop/garanti",
    "/bilkjop/heving-privat",
    "/bilkjop/heving-forhandler",
    "/bilkjop/heving-tidsfrist",
    "/bilkjop/kan-selger-heve",
    "/bilkjop/privat-kjop",
    "/bilkjop/forhandler",
  ];

  const bilkjopEntries = bilkjopSeoPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Fly SEO content pages
  const flySeoPages = [
    "/fly-forsinket",
    "/fly-kansellert",
    "/mistet-bagasje",
    "/nektet-ombordstigning",
  ];

  const flyEntries = flySeoPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // MC SEO content pages
  const mcSeoPages = [
    "/mc-kjop/mc-feil",
    "/mc-kjop/reklamasjon",
    "/mc-kjop/heving",
    "/mc-kjop/garanti",
    "/mc-kjop/forhandler",
    "/mc-kjop/privat-kjop",
  ];

  const mcEntries = mcSeoPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  // Utility pages
  const utilityPages = [
    { url: `${BASE_URL}/om-oss`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${BASE_URL}/personvern`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${BASE_URL}/kontakt`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${BASE_URL}/bruksvilkar`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.3 },
  ];

  // Programmatic SEO pages from seo-matrix
  const programmaticEntries = SEO_NODES.map((node) => ({
    url: `${BASE_URL}/${node.cat}/${node.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...mainPages, ...bilkjopEntries, ...flyEntries, ...mcEntries, ...programmaticEntries, ...utilityPages];
}
