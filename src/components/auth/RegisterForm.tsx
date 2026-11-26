/**
 * Formulaire d'inscription.
 * @module components/auth/RegisterForm
 */
"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { register, type RegisterFormState } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { PASSWORD_RULES } from "@/lib/validation";
import PasswordField from "./PasswordField";

/**
 * Formulaire d'inscription : nom, prénom, email, mot de passe et acceptation des conditions générales.
 *
 * Les règles du mot de passe sont vérifiées en direct. Le formulaire est envoyé à l'action serveur `register`.
 *
 * @param props Propriétés du composant.
 * @param props.redirectTo Page ouverte après l'inscription, `/` par défaut.
 */
export default function RegisterForm({ redirectTo = "/" }: { redirectTo?: string }) {
  const [state, formAction, pending] = useActionState<RegisterFormState, FormData>(register, {});
  const [password, setPassword] = useState("");
  const termsError = state.fieldErrors?.terms;
  const loginHref = redirectTo === "/" ? "/connexion" : `/connexion?redirect=${encodeURIComponent(redirectTo)}`;

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      <input type="hidden" name="redirect" value={redirectTo} />

      {state.error && (
        <p role="alert" className="text-danger bg-danger/5 rounded-[5px] px-3 py-2 text-center text-sm">
          {state.error}
        </p>
      )}

      <TextField
        id="lastName"
        name="lastName"
        label="Nom"
        autoComplete="family-name"
        required
        maxLength={50}
        defaultValue={state.values?.lastName}
        error={state.fieldErrors?.lastName}
      />
      <TextField
        id="firstName"
        name="firstName"
        label="Prénom"
        autoComplete="given-name"
        required
        maxLength={50}
        defaultValue={state.values?.firstName}
        error={state.fieldErrors?.firstName}
      />
      <TextField
        id="email"
        name="email"
        type="email"
        label="Adresse email"
        autoComplete="email"
        required
        maxLength={254}
        defaultValue={state.values?.email}
        error={state.fieldErrors?.email}
      />

      <div className="flex flex-col gap-2">
        <PasswordField
          id="password"
          name="password"
          label="Mot de passe"
          autoComplete="new-password"
          required
          maxLength={128}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-describedby={["password-rules", state.fieldErrors?.password && "password-error"].filter(Boolean).join(" ")}
          error={state.fieldErrors?.password}
        />
        <ul id="password-rules" aria-label="Le mot de passe doit contenir" className="grid grid-cols-2 gap-1 text-xs">
          {PASSWORD_RULES.map((rule) => {
            const valid = rule.test(password);
            return (
              <li key={rule.id} className={valid ? "text-green-800" : "text-muted"}>
                <span aria-hidden>{valid ? "✓" : "•"}</span> {rule.label}
                <span className="sr-only">{valid ? " : respecté" : " : manquant"}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-2">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            aria-invalid={!!termsError}
            aria-describedby={termsError ? "terms-error" : undefined}
            className="accent-primary mt-0.5 size-4 shrink-0"
          />
          <label htmlFor="terms" className="text-xs">
            J&apos;accepte les{" "}
            <Link href="/conditions-generales" target="_blank" className="underline underline-offset-2 hover:text-primary">
              conditions générales d&apos;utilisation <span className="sr-only">(nouvel onglet)</span>
            </Link>
          </label>
        </div>
        {termsError && (
          <p id="terms-error" className="text-danger text-xs">
            {termsError}
          </p>
        )}
      </div>

      <Button type="submit" disabled={pending} className="mx-auto mt-2 w-full max-w-[200px]">
        {pending ? "Inscription…" : "S'inscrire"}
      </Button>

      <p className="text-primary text-center text-sm">
        Déjà membre ?{" "}
        <Link href={loginHref} className="font-semibold hover:underline">
          Se connecter
        </Link>
      </p>
    </form>
  );
}
