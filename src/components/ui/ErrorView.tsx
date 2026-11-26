/**
 * Vue d'erreur des limites d'erreur Next.js.
 * @module components/ui/ErrorView
 */
"use client";

import { useEffect } from "react";
import { Button } from "./Button";
import ErrorState from "./ErrorState";

/**
 * Affiche une erreur de rendu avec un bouton pour réessayer.
 *
 * Le message technique n'est affiché qu'en développement. En production, seule la référence de l'erreur est montrée.
 *
 * @param props Propriétés du composant.
 * @param props.error Erreur levée.
 * @param props.retry Relance le rendu de la page.
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
        <Button size="sm" onClick={() => retry()}>
          Réessayer
        </Button>
      }
      details={digest ? `Référence de l'erreur : ${digest}` : undefined}
    />
  );
}
