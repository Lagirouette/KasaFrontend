/**
 * Bouton de déconnexion, affiché seulement quand l'utilisateur est connecté.
 * @module components/auth/LogoutButton
 */
import { logout } from "@/app/actions/auth";
import { LogoutIcon } from "@/components/icons";
import { getToken } from "@/lib/session";

/** Apparence du bouton : icône dans l'en-tête desktop, ou ligne du menu mobile. */
export type LogoutVariant = "icon" | "menu";

/**
 * Formulaire de déconnexion, envoyé à l'action serveur `logout`.
 *
 * Un formulaire en `POST` est utilisé plutôt qu'un lien, pour qu'un site tiers ne puisse pas déconnecter l'utilisateur à son insu. Il fonctionne aussi sans JavaScript.
 *
 * @param props Propriétés du composant.
 * @param props.variant Apparence du bouton.
 */
export function LogoutForm({ variant }: { variant: LogoutVariant }) {
  if (variant === "menu") {
    return (
      <form action={logout} className="border-line border-t">
        <button
          type="submit"
          className="text-primary hover:bg-background flex w-full items-center gap-2 px-4 py-3 text-left text-sm"
        >
          <LogoutIcon />
          Se déconnecter
        </button>
      </form>
    );
  }

  return (
    <form action={logout} className="flex items-center gap-1">
      <span aria-hidden className="bg-line h-4 w-px" />
      <button type="submit" aria-label="Se déconnecter" title="Se déconnecter" className="p-1">
        <LogoutIcon />
      </button>
    </form>
  );
}

/**
 * Affiche le bouton de déconnexion si une session existe.
 *
 * Ce composant lit le cookie de session : il doit être placé dans un `Suspense`.
 *
 * @param props Propriétés du composant.
 * @param props.variant Apparence du bouton, icône par défaut.
 */
export default async function LogoutButton({ variant = "icon" }: { variant?: LogoutVariant }) {
  const token = await getToken();
  return token ? <LogoutForm variant={variant} /> : null;
}
