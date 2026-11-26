/**
 * Informations générales sur le site, utilisées pour le SEO.
 * @module lib/site
 */
/** URL publique du site, lue dans `SITE_URL`, sans slash final. */
export const SITE_URL = (process.env.SITE_URL ?? "http://localhost:3001").replace(/\/$/, "");

/** Nom du site. */
export const SITE_NAME = "Kasa";

/** Description par défaut du site. */
export const SITE_DESCRIPTION =
  "Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux, sélectionnés avec soin par nos hôtes.";

/**
 * Transforme un chemin en URL absolue sur le site.
 *
 * @param path Chemin, par exemple `/a-propos`.
 * @returns L'URL absolue.
 */
export function absoluteUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).toString();
}
