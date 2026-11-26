/**
 * Validation des URL de redirection.
 * @module lib/redirect
 */
/**
 * Renvoie la cible de redirection seulement si c'est un chemin interne au site, pour éviter les redirections ouvertes.
 *
 * @param target Cible reçue, par exemple le paramètre `redirect` de l'URL.
 * @param fallback Chemin utilisé si la cible est refusée, `/` par défaut.
 * @returns Un chemin interne sûr.
 * @example
 * safeRedirect("//evil.com"); // "/"
 */
export function safeRedirect(target: unknown, fallback = "/") {
  if (typeof target !== "string") return fallback;
  if (!target.startsWith("/") || target.startsWith("//") || target.startsWith("/\\")) return fallback;
  return target;
}
