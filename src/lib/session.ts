/**
 * Gestion de la session utilisateur dans un cookie httpOnly.
 * @module lib/session
 */
import { cookies } from "next/headers";
import type { Role } from "@/types/api";
import { SESSION_COOKIE } from "./constants";

/** Durée de vie du cookie de session : 7 jours. */
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

/** Utilisateur connecté, lu dans le jeton JWT. */
export type SessionUser = {
  id: number;
  name: string;
  email: string | null;
  role: Role;
};

/**
 * Enregistre le jeton JWT dans le cookie de session.
 *
 * @param token Jeton renvoyé par l'API à la connexion ou à l'inscription.
 */
export async function createSession(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + SESSION_DURATION_MS),
  });
}

/**
 * Lit le jeton JWT de la session.
 *
 * @returns Le jeton, ou `undefined` si l'utilisateur n'est pas connecté.
 */
export async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value;
}

/** Supprime le cookie de session. */
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

/**
 * Lit le contenu d'un jeton JWT, sans vérifier sa signature.
 *
 * La signature est vérifiée par l'API à chaque appel authentifié : ce décodage sert seulement à l'affichage.
 *
 * @param token Jeton JWT.
 * @returns L'utilisateur, ou `null` si le jeton est absent ou illisible.
 */
export function decodeToken(token: string | undefined): SessionUser | null {
  if (!token) return null;
  try {
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString("utf8"));
    if (typeof payload.id !== "number" || typeof payload.role !== "string") return null;
    return { id: payload.id, name: payload.name ?? "", email: payload.email ?? null, role: payload.role };
  } catch {
    return null;
  }
}

/**
 * Renvoie l'utilisateur connecté.
 *
 * @returns L'utilisateur, ou `null` si personne n'est connecté.
 */
export async function getSessionUser() {
  return decodeToken(await getToken());
}
