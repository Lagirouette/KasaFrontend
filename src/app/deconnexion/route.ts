/**
 * Route de déconnexion (`GET /deconnexion`).
 * @module app/deconnexion
 */
import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/constants";

/**
 * Supprime le cookie de session et redirige vers la page de connexion.
 *
 * @param request Requête entrante.
 * @returns Une redirection vers `/connexion`.
 */
export function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/connexion", request.url));
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
