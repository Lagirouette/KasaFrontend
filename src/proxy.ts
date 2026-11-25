import { NextResponse, type NextRequest } from "next/server";
import { GUEST_ONLY_ROUTES, PROTECTED_ROUTES, SESSION_COOKIE } from "@/lib/constants";

function isProtected(pathname: string) {
  return PROTECTED_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

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

export const config = {
  matcher: ["/logements/nouveau", "/messages/:path*", "/connexion", "/inscription/:path*"],
};
