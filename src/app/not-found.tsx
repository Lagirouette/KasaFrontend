/**
 * Page 404.
 * @module app/not-found
 */
import type { Metadata } from "next";
import ErrorState from "@/components/ui/ErrorState";

/** Métadonnées SEO de la page. */
export const metadata: Metadata = { title: "Page introuvable" };

/** Affiche la page « Page introuvable » avec un lien vers l'accueil. */
export default function NotFound() {
  return (
    <ErrorState
      code="404"
      title="Page introuvable"
      message="Il semble que la page que vous cherchez ait pris des vacances… ou n'ait jamais existé."
    />
  );
}
