/**
 * Lecture des logements depuis l'API, mise en cache avec la directive `use cache`.
 * @module lib/properties
 */
import { cacheLife, cacheTag } from "next/cache";
import { ApiError, apiFetch } from "./api";
import type { Property, PropertyDetails } from "@/types/api";

/**
 * Récupère la liste de tous les logements.
 *
 * Le résultat est mis en cache quelques minutes avec le tag `properties`.
 *
 * @returns La liste des logements.
 * @throws {ApiError} Si l'API est injoignable ou renvoie une erreur.
 */
export async function getProperties() {
  "use cache";
  cacheLife("minutes");
  cacheTag("properties");
  return apiFetch<Property[]>("/api/properties");
}

/**
 * Récupère le détail d'un logement par son identifiant.
 *
 * @param id Identifiant du logement.
 * @returns Le détail du logement, ou `null` s'il n'existe pas.
 * @throws {ApiError} Pour toute autre erreur de l'API.
 */
export async function getProperty(id: string) {
  "use cache";
  cacheLife("minutes");
  cacheTag("properties", `property-${id}`);
  try {
    return await apiFetch<PropertyDetails>(`/api/properties/${encodeURIComponent(id)}`);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) return null;
    throw e;
  }
}

/**
 * Récupère le détail d'un logement à partir de son slug.
 *
 * L'API ne permet de chercher que par identifiant : le slug est d'abord retrouvé dans la liste des logements.
 *
 * @param slug Slug du logement, utilisé dans l'URL.
 * @returns Le détail du logement, ou `null` si aucun logement ne correspond.
 */
export async function getPropertyBySlug(slug: string) {
  const properties = await getProperties();
  const match = properties.find((property) => property.slug === slug);
  return match ? getProperty(match.id) : null;
}
