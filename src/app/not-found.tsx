import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ErrorState from "@/components/ui/ErrorState";

export const metadata: Metadata = { title: "Page introuvable" };

// URL qui ne correspond à aucune route
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <ErrorState
          code="404"
          title="Page introuvable"
          message="L'adresse demandée n'existe pas. Vérifiez le lien ou revenez à l'accueil."
        />
      </main>
      <Footer />
    </>
  );
}
