"use client";

import { useEffect } from "react";
import { Button } from "./Button";
import ErrorState from "./ErrorState";

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
