/**
 * Page d'inscription (`/inscription`).
 * @module app/inscription
 */
import type { Metadata } from "next";
import { Suspense } from "react";
import AuthCard from "@/components/auth/AuthCard";
import RegisterForm from "@/components/auth/RegisterForm";
import { safeRedirect } from "@/lib/redirect";

/** Métadonnées SEO de la page. */
export const metadata: Metadata = {
  title: "Inscription",
  description: "Créez votre compte Kasa pour réserver des logements uniques et partager vos propres lieux.",
  alternates: { canonical: "/inscription" },
};

/** Affiche le formulaire d'inscription. */
export default function RegisterPage({ searchParams }: PageProps<"/inscription">) {
  return (
    <AuthCard
      title={
        <>
          Rejoignez la <br className="sm:hidden" />
          communauté Kasa
        </>
      }
      intro="Créez votre compte et commencez à voyager autrement : réservez des logements uniques, découvrez de nouvelles destinations et partagez vos propres lieux avec d'autres voyageurs."
    >
      <Suspense fallback={<RegisterForm />}>
        <RegisterFormWithRedirect searchParams={searchParams} />
      </Suspense>
    </AuthCard>
  );
}

/** Lit le paramètre `redirect` de l'URL et le transmet au formulaire après validation. */
async function RegisterFormWithRedirect({ searchParams }: Pick<PageProps<"/inscription">, "searchParams">) {
  const { redirect } = await searchParams;
  return <RegisterForm redirectTo={safeRedirect(Array.isArray(redirect) ? redirect[0] : redirect)} />;
}
