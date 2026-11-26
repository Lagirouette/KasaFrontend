/**
 * Limite d'erreur des pages.
 * @module app/error
 */
"use client";

import ErrorView from "@/components/ui/ErrorView";

/** Affiche une erreur de rendu d'une page, avec un bouton pour réessayer. */
export default function RootError({ error, retry }: { error: unknown; retry: () => void }) {
  return <ErrorView error={error} retry={retry} />;
}
