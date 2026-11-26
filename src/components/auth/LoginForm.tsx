/**
 * Formulaire de connexion.
 * @module components/auth/LoginForm
 */
"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, type LoginFormState } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import PasswordField from "./PasswordField";

/**
 * Formulaire de connexion par email et mot de passe, envoyé à l'action serveur `login`.
 *
 * Affiche un message d'erreur en cas d'identifiants incorrects.
 *
 * @param props Propriétés du composant.
 * @param props.redirectTo Page ouverte après la connexion, `/` par défaut.
 */
export default function LoginForm({ redirectTo = "/" }: { redirectTo?: string }) {
  const [state, formAction, pending] = useActionState<LoginFormState, FormData>(login, {});

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      <input type="hidden" name="redirect" value={redirectTo} />

      {state.error && (
        <p role="alert" className="text-danger bg-danger/5 rounded-[5px] px-3 py-2 text-center text-sm">
          {state.error}
        </p>
      )}

      <TextField
        id="email"
        name="email"
        type="email"
        label="Adresse email"
        autoComplete="email"
        required
        defaultValue={state.email}
        error={state.fieldErrors?.email}
      />
      <PasswordField
        id="password"
        name="password"
        label="Mot de passe"
        autoComplete="current-password"
        required
        error={state.fieldErrors?.password}
      />

      <Button type="submit" disabled={pending} className="mx-auto mt-4 w-full max-w-[200px]">
        {pending ? "Connexion…" : "Se connecter"}
      </Button>

      <div className="flex flex-col items-center gap-3 text-sm">
        <Link href="/mot-de-passe-oublie" prefetch={false} className="text-primary hover:underline">
          Mot de passe oublié
        </Link>
        <p className="text-primary">
          Pas encore de compte ?{" "}
          <Link
            href={redirectTo === "/" ? "/inscription" : `/inscription?redirect=${encodeURIComponent(redirectTo)}`}
            className="font-semibold hover:underline"
          >
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </form>
  );
}
