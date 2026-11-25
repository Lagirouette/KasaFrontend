import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/messages", "/logements/nouveau", "/inscription/bienvenue", "/deconnexion", "/api/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
