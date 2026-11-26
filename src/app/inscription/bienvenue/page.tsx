/**
 * Page de confirmation d'inscription (`/inscription/bienvenue`).
 * @module app/inscription/bienvenue
 */
import type { Metadata } from "next";
import { Suspense } from "react";
import AuthCard from "@/components/auth/AuthCard";
import { ButtonLink } from "@/components/ui/Button";
import { CONTACT_EMAIL } from "@/lib/constants";
import { safeRedirect } from "@/lib/redirect";
import { getSessionUser } from "@/lib/session";

/** Métadonnées SEO de la page. */
export const metadata: Metadata = {
  title: "Bienvenue",
  robots: { index: false },
};

/** Confirme la création du compte. */
export default function WelcomePage({ searchParams }: PageProps<"/inscription/bienvenue">) {
  return (
    <Suspense fallback={<AuthCard title="Bienvenue !" intro="Votre compte Kasa est créé.">{null}</AuthCard>}>
      <Welcome searchParams={searchParams} />
    </Suspense>
  );
}

/** Affiche un message selon l'état de l'envoi de l'email de confirmation, lu dans le paramètre `email`. */
async function Welcome({ searchParams }: Pick<PageProps<"/inscription/bienvenue">, "searchParams">) {
  const [user, params] = await Promise.all([getSessionUser(), searchParams]);
  const firstName = user?.name.split(" ")[0] ?? "";
  const emailSent = params.email === "envoye" || params.email === "apercu";
  const preview = params.email === "apercu";
  const redirect = safeRedirect(Array.isArray(params.redirect) ? params.redirect[0] : params.redirect);

  return (
    <AuthCard title={`Bienvenue${firstName ? ` ${firstName}` : ""} !`} intro="Votre compte Kasa est créé et vous êtes connecté.">
      <div className="flex flex-col items-center gap-6 text-center">
        {emailSent ? (
          <p role="status" className="rounded-[5px] bg-green-50 px-3 py-2 text-sm text-green-800">
            {preview ? "Un email de confirmation a été préparé pour " : "Un email de confirmation a été envoyé à "}
            <strong className="[overflow-wrap:anywhere]">{user?.email}</strong>.
            {preview && (
              <span className="mt-1 block text-xs">
                Mode développement : aucun serveur d&apos;envoi (SMTP) n&apos;est configuré, l&apos;email est affiché dans
                la console du serveur Next.
              </span>
            )}
          </p>
        ) : (
          <p role="alert" className="text-danger bg-danger/5 rounded-[5px] px-3 py-2 text-sm">
            Votre compte est bien créé, mais l&apos;email de confirmation n&apos;a pas pu être envoyé. Contactez-nous à{" "}
            {CONTACT_EMAIL} si besoin.
          </p>
        )}
        <ButtonLink href={redirect === "/" ? "/#logements" : redirect} className="w-full max-w-[240px]">
          {redirect === "/" ? "Découvrir les logements" : "Continuer"}
        </ButtonLink>
      </div>
    </AuthCard>
  );
}
