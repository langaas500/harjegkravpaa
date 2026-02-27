import { MetadataRoute } from "next";

const BASE_URL = "https://harjegkravpå.no";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // High-priority SEO pages (bilkjop heving cluster)
  const hevingPages = [
    {
      url: `${BASE_URL}/bilkjop/heving`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
  ];

  // Static SEO pages
  const seoPages = [
    // Bilkjop SEO pages
    "/bilkjop/reklamasjon",
    "/bilkjop/garanti",
    "/bilkjop/heving-privat",
    "/bilkjop/heving-forhandler",
    "/bilkjop/heving-tidsfrist",
    "/bilkjop/kan-selger-heve",
    "/bilkjop/privat-kjop",
    "/bilkjop/forhandler",
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
      url: `${BASE_URL}/bilkjop/bruktbil-feil`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // SEO pages with lower priority
  const seoSitemapEntries = seoPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Priority 0.3 — utility-sider
  const utilityPages = [
    { url: `${BASE_URL}/om-oss`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${BASE_URL}/personvern`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${BASE_URL}/kontakt`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${BASE_URL}/bruksvilkar`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.3 },
  ];

  return [...mainPages, ...hevingPages, ...seoSitemapEntries, ...utilityPages];
}