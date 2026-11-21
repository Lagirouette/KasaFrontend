import type { ApiErrorBody } from "@/types/api";

// URL du backend Kasa. Les appels partent du serveur Next : pas de souci de CORS.
const API_URL = process.env.API_URL ?? "http://localhost:3000";

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = "ApiError";
  }
}

type FetchOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  /** JWT à envoyer dans l'en-tête Authorization (routes protégées) */
  token?: string;
};

/**
 * Appelle l'API Kasa et renvoie le JSON de la réponse.
 * Le backend renvoie directement les données, ou { error } en cas d'échec.
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
