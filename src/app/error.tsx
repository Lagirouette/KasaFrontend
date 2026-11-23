"use client"; // Les error boundaries sont forcément des Client Components

import ErrorView from "@/components/ui/ErrorView";

// Rendue dans le layout racine : header et footer restent affichés.
export default function RootError({ error, retry }: { error: unknown; retry: () => void }) {
  return <ErrorView error={error} retry={retry} />;
}
