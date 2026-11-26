/**
 * Affichage d'une page d'erreur.
 * @module components/ui/ErrorState
 */
import { ButtonLink } from "./Button";

/** Propriétés de {@link ErrorState}. */
type Props = {
  /** Code ou mot affiché en grand, par exemple `404`. */
  code: string;
  /** Titre de l'erreur. */
  title: string;
  /** Explication pour l'utilisateur. */
  message: string;
  /** Bouton ou lien proposé à l'utilisateur. */
  action?: React.ReactNode;
  /** Information technique, par exemple la référence de l'erreur. */
  details?: string;
};

/** Affiche une erreur avec un titre, une explication et une action. */
export default function ErrorState({ code, title, message, action, details }: Props) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1>
        <span aria-hidden className="text-primary block text-8xl font-black tracking-tight sm:text-9xl">
          {code}
        </span>
        <span className="sr-only">{title}</span>
      </h1>
      <p className="mt-4 max-w-[300px] text-xs sm:max-w-[360px] sm:text-sm">{message}</p>
      {details && <p className="text-muted mt-2 text-xs">{details}</p>}
      <div className="mt-6 flex w-[220px] flex-col gap-3">
        {action}
        <ButtonLink href="/" size="sm">
          Accueil
        </ButtonLink>
        <ButtonLink href="/#logements" size="sm">
          Logements
        </ButtonLink>
      </div>
    </div>
  );
}
