import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://xn--ob0b34v1qg.kr";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
