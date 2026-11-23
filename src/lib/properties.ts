import { ApiError, apiFetch } from "./api";
import type { Property, PropertyDetails, Rating } from "@/types/api";

/**
 * Service "propriétés" : seul endroit qui connaît les routes /api/properties.
 * Les composants appellent ces fonctions, jamais fetch directement.
 */

/** GET /api/properties : tous les logements (triés par titre côté API) */
export function getProperties() {
  return apiFetch<Property[]>("/api/properties");
}

/** GET /api/properties/:id : détail d'un logement, ou null s'il n'existe pas */
export async function getProperty(id: string) {
  try {
    return await apiFetch<PropertyDetails>(`/api/properties/${encodeURIComponent(id)}`);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) return null;
    throw e;
  }
}

/** GET /api/properties/:id/ratings : notes d'un logement */
export function getPropertyRatings(id: string) {
  return apiFetch<Rating[]>(`/api/properties/${encodeURIComponent(id)}/ratings`);
}
