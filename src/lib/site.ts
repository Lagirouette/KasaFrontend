export const SITE_URL = (process.env.SITE_URL ?? "http://localhost:3001").replace(/\/$/, "");

export const SITE_NAME = "Kasa";

export const SITE_DESCRIPTION =
  "Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux, sélectionnés avec soin par nos hôtes.";

export function absoluteUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).toString();
}
