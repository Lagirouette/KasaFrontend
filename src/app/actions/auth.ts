"use server";

import { redirect } from "next/navigation";
import { ApiError, apiFetch } from "@/lib/api";
import { registrationConfirmationEmail } from "@/lib/emails";
import { sendMail } from "@/lib/mailer";
import { validateRegistration, type RegistrationErrors } from "@/lib/validation";
import { safeRedirect } from "@/lib/redirect";
import { createSession, deleteSession } from "@/lib/session";
import type { AuthPayload } from "@/types/api";

export type LoginFormState = {
  error?: string;
  fieldErrors?: Partial<Record<"email" | "password", string>>;
  email?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function login(_prev: LoginFormState, formData: FormData): Promise<LoginFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fieldErrors: LoginFormState["fieldErrors"] = {};

  if (!email) fieldErrors.email = "Saisissez votre adresse email.";
  else if (!EMAIL_PATTERN.test(email)) fieldErrors.email = "Saisissez une adresse email valide, par exemple nom@exemple.fr.";
  if (!password) fieldErrors.password = "Saisissez votre mot de passe.";

  if (Object.keys(fieldErrors).length > 0) return { fieldErrors, email };

  try {
    const { token } = await apiFetch<AuthPayload>("/auth/login", { method: "POST", body: { email, password } });
    await createSession(token);
  } catch (error) {
    if (error instanceof ApiError && (error.status === 401 || error.status === 400)) {
      return { error: "Adresse email ou mot de passe incorrect.", email };
    }
    if (error instanceof ApiError && error.status === 0) {
      return { error: error.message, email };
    }
    return { error: "Une erreur inattendue est survenue. Réessayez dans quelques instants.", email };
  }

  redirect(safeRedirect(formData.get("redirect")));
}

export type RegisterFormState = {
  error?: string;
  fieldErrors?: RegistrationErrors;
  values?: { lastName: string; firstName: string; email: string };
};

export async function register(_prev: RegisterFormState, formData: FormData): Promise<RegisterFormState> {
  const input = {
    lastName: String(formData.get("lastName") ?? "").trim(),
    firstName: String(formData.get("firstName") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    password: String(formData.get("password") ?? ""),
    terms: formData.get("terms") === "on",
  };
  const values = { lastName: input.lastName, firstName: input.firstName, email: input.email };

  const fieldErrors = validateRegistration(input);
  if (Object.keys(fieldErrors).length > 0) return { fieldErrors, values };

  try {
    const { token } = await apiFetch<AuthPayload>("/auth/register", {
      method: "POST",
      body: { name: `${input.firstName} ${input.lastName}`, email: input.email, password: input.password, role: "owner" },
    });
    await createSession(token);
  } catch (error) {
    if (error instanceof ApiError && error.status === 409) {
      return { fieldErrors: { email: "Un compte existe déjà avec cette adresse email." }, values };
    }
    if (error instanceof ApiError && error.status === 0) return { error: error.message, values };
    return { error: "Une erreur inattendue est survenue. Réessayez dans quelques instants.", values };
  }

  const siteUrl = (process.env.SITE_URL ?? "http://localhost:3001").replace(/\/$/, "");
  const mail = await sendMail({
    to: input.email,
    ...registrationConfirmationEmail({ firstName: input.firstName, siteUrl }),
  });

  const params = new URLSearchParams({ email: !mail.sent ? "echec" : mail.preview ? "apercu" : "envoye" });
  const target = safeRedirect(formData.get("redirect"));
  if (target !== "/") params.set("redirect", target);
  redirect(`/inscription/bienvenue?${params.toString()}`);
}

export async function logout() {
  await deleteSession();
  redirect("/connexion");
}
