import { cacheLife, cacheTag } from "next/cache";
import { ApiError, apiFetch } from "./api";
import type { Property, PropertyDetails } from "@/types/api";

export async function getProperties() {
  "use cache";
  cacheLife("minutes");
  cacheTag("properties");
  return apiFetch<Property[]>("/api/properties");
}

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

export async function getPropertyBySlug(slug: string) {
  const properties = await getProperties();
  const match = properties.find((property) => property.slug === slug);
  return match ? getProperty(match.id) : null;
}
