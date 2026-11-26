/**
 * Fichier `robots.txt`.
 * @module app/robots
 */
import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/**
 * Autorise l'indexation du site, sauf des pages privées, et indique le sitemap.
 *
 * @returns Les règles du fichier `robots.txt`.
 */
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
