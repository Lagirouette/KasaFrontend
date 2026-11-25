"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { ApiError, apiFetch } from "@/lib/api";
import { readPropertyForm, validateProperty, type PropertyFormErrors } from "@/lib/property-form";
import { deleteSession, getToken } from "@/lib/session";
import type { PropertyDetails } from "@/types/api";

export type PropertyFormState = {
  error?: string;
  fieldErrors?: PropertyFormErrors;
};

export async function createProperty(_prev: PropertyFormState, formData: FormData): Promise<PropertyFormState> {
  const input = readPropertyForm(formData);
  const fieldErrors = validateProperty(input);
  if (Object.keys(fieldErrors).length > 0) {
    return { error: "Le formulaire contient des erreurs.", fieldErrors };
  }

  const token = await getToken();
  if (!token) redirect("/connexion?redirect=/logements/nouveau");

  let created: PropertyDetails;
  try {
    created = await apiFetch<PropertyDetails>("/api/properties", {
      method: "POST",
      token,
      body: {
        title: input.title,
        description: input.description,
        location: `${input.location} - ${input.postalCode}`,
        price_per_night: Number(input.price),
        cover: input.cover,
        pictures: [input.cover, ...input.pictures.filter((picture) => picture !== input.cover)],
        host: { name: input.hostName, ...(input.hostPicture && { picture: input.hostPicture }) },
        equipments: input.equipments,
        tags: input.tags,
      },
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      await deleteSession();
      redirect("/connexion?redirect=/logements/nouveau");
    }
    if (error instanceof ApiError && error.status === 403) {
      return { error: "Votre compte ne permet pas d'ajouter un logement : un compte propriétaire est nécessaire." };
    }
    if (error instanceof ApiError && error.status === 0) return { error: error.message };
    return { error: "La propriété n'a pas pu être enregistrée. Réessayez dans quelques instants." };
  }

  updateTag("properties");
  redirect(`/logements/${created.slug}`);
}
