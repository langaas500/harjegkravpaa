import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/bilkjop/rapport",
        "/bilkjop/betalt",
        "/bilkjop/kravbrev",
        "/bilkjop/dokumenter",
        "/flyreiser/rapport",
        "/flyreiser/betalt",
        "/handverkere/rapport",
        "/handverkere/betalt",
        "/handverkere/kravbrev",
      ],
    },
    sitemap: "https://harjegkravpå.no/sitemap.xml",
  };
}
