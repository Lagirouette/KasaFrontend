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
    {
      url: absoluteUrl("/a-propos"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/inscription"),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: absoluteUrl("/connexion"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/conditions-generales"),
      changeFrequency: "yearly",
      priority: 0.1,
    },
    ...properties.map((property) => ({
      url: absoluteUrl(`/logements/${property.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
