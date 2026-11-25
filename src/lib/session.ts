import { cookies } from "next/headers";
import type { Role } from "@/types/api";
import { SESSION_COOKIE } from "./constants";

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

export type SessionUser = {
  id: number;
  name: string;
  email: string | null;
  role: Role;
};

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

export async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

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

export async function getSessionUser() {
  return decodeToken(await getToken());
}
