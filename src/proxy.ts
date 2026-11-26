/**
 * Proxy Next.js qui protège les pages selon l'état de connexion.
 * @module proxy
 */
import { NextResponse, type NextRequest } from "next/server";
import { GUEST_ONLY_ROUTES, PROTECTED_ROUTES, SESSION_COOKIE } from "@/lib/constants";

/**
 * Indique si un chemin fait partie des routes protégées.
 *
 * @param pathname Chemin demandé.
 * @returns `true` si la page exige une connexion.
 */
function isProtected(pathname: string) {
  return PROTECTED_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

/**
 * Redirige vers la connexion les visiteurs qui demandent une page protégée, en gardant la page demandée dans le paramètre `redirect`.
 * Redirige vers l'accueil les utilisateurs connectés qui ouvrent la connexion ou l'inscription.
 *
 * @param request Requête entrante.
 * @returns Une redirection, ou la poursuite normale de la requête.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasSession = request.cookies.has(SESSION_COOKIE);

  if (!hasSession && isProtected(pathname)) {
    const url = new URL("/connexion", request.url);
    url.searchParams.set("redirect", pathname + search);
    return NextResponse.redirect(url);
  }

  if (hasSession && GUEST_ONLY_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

/** Routes sur lesquelles le proxy s'exécute. */
export const config = {
  matcher: ["/logements/nouveau", "/messages/:path*", "/connexion", "/inscription/:path*"],
};
