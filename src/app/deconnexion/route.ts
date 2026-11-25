import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/constants";

export function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/connexion", request.url));
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
