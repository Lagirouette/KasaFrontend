import type { MetadataRoute } from "next";
import { getProperties } from "@/lib/properties";
import { absoluteUrl } from "@/lib/site";
import type { Property } from "@/types/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let properties: Property[] = [];
  try {
    properties = await getProperties();
  } catch {
    properties = [];
  }

  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: absoluteUrl("/favoris"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...properties.map((property) => ({
      url: absoluteUrl(`/logements/${property.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
