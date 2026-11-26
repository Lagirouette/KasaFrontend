/**
 * Client HTTP de l'API Express Kasa.
 * @module lib/api
 */
import type { ApiErrorBody } from "@/types/api";

/** URL de base de l'API, lue dans la variable d'environnement `API_URL`, sans slash final. */
export const API_URL = (process.env.API_URL ?? "http://localhost:3000").replace(/\/$/, "");

/** Erreur levée quand l'API répond avec un statut d'erreur ou est injoignable. */
export class ApiError extends Error {
  /**
   * @param message Message d'erreur renvoyé par l'API ou message générique.
   * @param status Statut HTTP de la réponse, `0` si le serveur est injoignable.
   */
  constructor(message: string, public status: number) {
    super(message);
    this.name = "ApiError";
  }
}

/** Options d'un appel à l'API. */
type FetchOptions = {
  /** Méthode HTTP, `GET` par défaut. */
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  /** Corps de la requête, sérialisé en JSON. */
  body?: unknown;
  /** Jeton JWT envoyé dans l'en-tête `Authorization`. */
  token?: string;
};

/**
 * Appelle l'API Kasa et renvoie le corps JSON de la réponse.
 *
 * @typeParam T Type attendu du corps de la réponse.
 * @param path Chemin de la ressource, par exemple `/api/properties`.
 * @param options Méthode, corps et jeton d'authentification.
 * @returns Le corps de la réponse désérialisé.
 * @throws {ApiError} Si le serveur est injoignable ou répond avec un statut d'erreur.
 * @example
 * const properties = await apiFetch<Property[]>("/api/properties");
 */
export async function apiFetch<T>(
  path: string,
  { method = "GET", body, token }: FetchOptions = {}
): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch {
    throw new ApiError(
      "Impossible de joindre le serveur. Vérifiez que le backend est démarré.",
      0
    );
  }

  const json = (await res.json().catch(() => null)) as T | ApiErrorBody | null;

  if (!res.ok) {
    const message = (json as ApiErrorBody | null)?.error ?? "Une erreur est survenue";
    throw new ApiError(message, res.status);
  }

  return json as T;
}
