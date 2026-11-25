import type { Metadata } from "next";
import { Suspense } from "react";
import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";
import { safeRedirect } from "@/lib/redirect";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connectez-vous à Kasa pour retrouver vos réservations, vos annonces et vos séjours.",
  alternates: { canonical: "/connexion" },
};

export default function LoginPage({ searchParams }: PageProps<"/connexion">) {
  return (
    <AuthCard
      title="Heureux de vous revoir"
      intro="Connectez-vous pour retrouver vos réservations, vos annonces et tout ce qui rend vos séjours uniques."
    >
      <Suspense fallback={<LoginForm />}>
        <LoginFormWithRedirect searchParams={searchParams} />
      </Suspense>
    </AuthCard>
  );
}

async function LoginFormWithRedirect({ searchParams }: Pick<PageProps<"/connexion">, "searchParams">) {
  const { redirect } = await searchParams;
  return <LoginForm redirectTo={safeRedirect(Array.isArray(redirect) ? redirect[0] : redirect)} />;
}
