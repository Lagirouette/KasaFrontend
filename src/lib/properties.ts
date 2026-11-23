import { cache } from "react";
import { ApiError, apiFetch } from "./api";
import type { Property, PropertyDetails, Rating } from "@/types/api";

export function getProperties() {
  return apiFetch<Property[]>("/api/properties");
}

export async function getProperty(id: string) {
  try {
    return await apiFetch<PropertyDetails>(`/api/properties/${encodeURIComponent(id)}`);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) return null;
    throw e;
  }
}

export const getPropertyBySlug = cache(async (slug: string) => {
  const properties = await getProperties();
  const match = properties.find((property) => property.slug === slug);
  return match ? getProperty(match.id) : null;
});

export function getPropertyRatings(id: string) {
  return apiFetch<Rating[]>(`/api/properties/${encodeURIComponent(id)}/ratings`);
}
