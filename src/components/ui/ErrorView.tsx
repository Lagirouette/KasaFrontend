"use client";

import { useEffect } from "react";
import ErrorState from "./ErrorState";

/**
 * Contenu des fichiers error.tsx (Next 16 : props `error` et `retry`).
 * En production, le message des erreurs serveur est masqué par Next.js :
 * on affiche donc un texte générique, et l'identifiant `digest` pour les logs.
 */
export default function ErrorView({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const digest = error instanceof Error && "digest" in error ? String(error.digest) : undefined;
  const devMessage = process.env.NODE_ENV === "development" && error instanceof Error ? error.message : undefined;

  return (
    <ErrorState
      code="Oups"
      title="Une erreur est survenue"
      message={
        devMessage ??
        "La page n'a pas pu être chargée. Vérifiez votre connexion puis réessayez dans quelques instants."
      }
      action={
        <button
          type="button"
          onClick={() => retry()}
          className="bg-primary h-[50px] rounded-[10px] px-6 text-sm text-white transition hover:opacity-90"
        >
          Réessayer
        </button>
      }
      details={digest ? `Référence de l'erreur : ${digest}` : undefined}
    />
  );
}
