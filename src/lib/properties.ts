import { apiFetch } from "./api";
import type { Property } from "@/types/api";

export function getProperties() {
  return apiFetch<Property[]>("/api/properties");
}
