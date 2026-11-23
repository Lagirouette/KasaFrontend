import type { Metadata } from "next";
import ErrorState from "@/components/ui/ErrorState";

export const metadata: Metadata = { title: "Page introuvable" };

// URL qui ne correspond à aucune route (ou notFound() appelé par une page)
export default function NotFound() {
  return (
    <ErrorState
      code="404"
      title="Page introuvable"
      message="Il semble que la page que vous cherchez ait pris des vacances… ou n'ait jamais existé."
    />
  );
}
