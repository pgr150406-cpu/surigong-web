import type { MetadataRoute } from "next";

import { locations, services } from "@/data/locations";
import { representativeDongs } from "@/data/representativeDongs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://surigong-web.vercel.app";

  const servicePages = services.map((service) => ({
    url: `${baseUrl}/service/${encodeURIComponent(service)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const districtServicePages = locations.flatMap((location) =>
    services.map((service) => ({
      url:
        `${baseUrl}/area/` +
        `${encodeURIComponent(location.city)}/` +
        `${encodeURIComponent(location.district)}/` +
        `${encodeURIComponent(service)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }))
  );

  const representativeDongPages = representativeDongs.flatMap((area) =>
    services.map((service) => ({
      url:
        `${baseUrl}/` +
        `${encodeURIComponent(area.city)}/` +
        `${encodeURIComponent(area.district)}/` +
        `${encodeURIComponent(area.name)}/` +
        `${encodeURIComponent(service)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }))
  );

  const localPages = locations.flatMap((location) =>
    location.dongs.flatMap((dong) =>
      services.map((service) => ({
        url:
          `${baseUrl}/` +
          `${encodeURIComponent(location.city)}/` +
          `${encodeURIComponent(location.district)}/` +
          `${encodeURIComponent(dong)}/` +
          `${encodeURIComponent(service)}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
    )
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    ...servicePages,
    ...districtServicePages,
    ...representativeDongPages,
    ...localPages,
  ];
}