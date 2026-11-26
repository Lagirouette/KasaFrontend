/**
 * Route d'envoi d'images (`POST /api/uploads`).
 * @module app/api/uploads
 */
import { NextResponse, type NextRequest } from "next/server";
import { API_URL } from "@/lib/api";
import { SESSION_COOKIE } from "@/lib/constants";
import { validateImageFile } from "@/lib/property-form";

/** Usages d'image acceptés par l'API. */
const PURPOSES = ["property-cover", "property-picture", "user-picture"];

/**
 * Vérifie l'image reçue puis la transmet à l'API avec le jeton de la session.
 *
 * @param request Requête multipart avec les champs `file` et `purpose`.
 * @returns `{ url }` avec l'URL absolue de l'image, ou `{ error }` avec un statut d'erreur.
 */
export async function POST(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ error: "Votre session a expiré. Reconnectez-vous pour ajouter des images." }, { status: 401 });
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Aucune image reçue." }, { status: 400 });
  }

  const invalid = validateImageFile(file);
  if (invalid) return NextResponse.json({ error: invalid }, { status: 400 });

  const purpose = String(formData?.get("purpose") ?? "");
  const upload = new FormData();
  upload.set("file", file, file.name);
  if (PURPOSES.includes(purpose)) upload.set("purpose", purpose);

  let response: Response;
  try {
    response = await fetch(`${API_URL}/api/uploads/image`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: upload,
    });
  } catch {
    return NextResponse.json({ error: "Impossible de joindre le serveur. Réessayez dans quelques instants." }, { status: 502 });
  }

  const json = (await response.json().catch(() => null)) as { url?: string; error?: string } | null;

  if (response.status === 401) {
    return NextResponse.json({ error: "Votre session a expiré. Reconnectez-vous pour ajouter des images." }, { status: 401 });
  }
  if (response.status === 403) {
    return NextResponse.json({ error: "Seuls les comptes propriétaires peuvent ajouter des images." }, { status: 403 });
  }
  if (!response.ok || !json?.url) {
    return NextResponse.json({ error: "L'envoi de l'image a échoué. Réessayez." }, { status: 502 });
  }

  return NextResponse.json({ url: `${API_URL}${json.url}` }, { status: 201 });
}
