/**
 * Actions serveur d'authentification : connexion, inscription et déconnexion.
 * @module app/actions/auth
 */
"use server";

import { redirect } from "next/navigation";
import { ApiError, apiFetch } from "@/lib/api";
import { registrationConfirmationEmail } from "@/lib/emails";
import { sendMail } from "@/lib/mailer";
import { validateRegistration, type RegistrationErrors } from "@/lib/validation";
import { safeRedirect } from "@/lib/redirect";
import { createSession, deleteSession } from "@/lib/session";
import type { AuthPayload } from "@/types/api";

/** État du formulaire de connexion renvoyé par {@link login}. */
export type LoginFormState = {
  /** Message d'erreur général. */
  error?: string;
  /** Erreurs par champ. */
  fieldErrors?: Partial<Record<"email" | "password", string>>;
  /** Email saisi, pour le réafficher après une erreur. */
  email?: string;
};

/** Format minimal d'une adresse email. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Connecte l'utilisateur auprès de l'API puis enregistre le jeton dans le cookie de session.
 *
 * @param _prev État précédent du formulaire, non utilisé.
 * @param formData Email, mot de passe et page de redirection.
 * @returns L'état du formulaire en cas d'erreur. En cas de succès, redirige vers la page demandée.
 */
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

/** État du formulaire d'inscription renvoyé par {@link register}. */
export type RegisterFormState = {
  error?: string;
  fieldErrors?: RegistrationErrors;
  /** Valeurs saisies, pour les réafficher après une erreur. */
  values?: { lastName: string; firstName: string; email: string };
};

/**
 * Crée un compte propriétaire, ouvre la session et envoie l'email de confirmation.
 *
 * Redirige ensuite vers `/inscription/bienvenue` avec l'état de l'envoi de l'email : `envoye`, `apercu` ou `echec`.
 *
 * @param _prev État précédent du formulaire, non utilisé.
 * @param formData Nom, prénom, email, mot de passe, acceptation des conditions et page de redirection.
 * @returns L'état du formulaire en cas d'erreur, par exemple si l'email est déjà utilisé.
 */
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

/** Supprime la session et redirige vers la page de connexion. */
export async function logout() {
  await deleteSession();
  redirect("/connexion");
}
