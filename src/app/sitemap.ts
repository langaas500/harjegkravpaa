import { MetadataRoute } from "next";

const BASE_URL = "https://harjegkravpå.no";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static SEO pages
  const seoPages = [
    // Bilkjop SEO pages
    "/bilkjop/bruktbil-feil",
    "/bilkjop/reklamasjon",
    "/bilkjop/garanti",
    "/bilkjop/heving",
    "/bilkjop/privat-kjop",
    "/bilkjop/forhandler",
    // MC-kjop SEO pages
    "/mc-kjop/heving",
    "/mc-kjop/garanti",
    "/mc-kjop/mc-feil",
    "/mc-kjop/reklamasjon",
    "/mc-kjop/privat-kjop",
    "/mc-kjop/forhandler",
    // Fly SEO pages
    "/fly-forsinket",
    "/fly-kansellert",
    "/mistet-bagasje",
    "/nektet-ombordstigning",
  ];

  // Main pages
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
      url: `${BASE_URL}/mc-kjop`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/flyreiser`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  // SEO pages with lower priority
  const seoSitemapEntries = seoPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...mainPages, ...seoSitemapEntries];
}
