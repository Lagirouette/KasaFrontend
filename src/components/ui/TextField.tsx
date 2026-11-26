/**
 * Champs de saisie avec libellé, aide et message d'erreur.
 * @module components/ui/TextField
 */
import type { ComponentProps } from "react";

/** Propriétés communes aux champs. */
type BaseProps = {
  /** Identifiant du champ, relié au libellé, à l'aide et à l'erreur. */
  id: string;
  /** Libellé du champ. */
  label: string;
  /** Message d'erreur affiché sous le champ. */
  error?: string;
  /** Texte d'aide affiché sous le champ. */
  hint?: string;
};

/** Classes communes aux champs. */
const FIELD =
  "border-field focus:border-primary aria-[invalid=true]:border-danger placeholder:text-muted w-full rounded-[5px] border bg-white px-3 text-sm outline-none";

/** Champ de saisie sur une ligne. */
export default function TextField({ id, label, error, hint, className = "", ...props }: BaseProps & ComponentProps<"input">) {
  return (
    <Field id={id} label={label} error={error} hint={hint}>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={describedBy(id, hint, error)}
        className={`${FIELD} h-10 ${className}`}
        {...props}
      />
    </Field>
  );
}

/** Champ de saisie sur plusieurs lignes. */
export function TextArea({ id, label, error, hint, className = "", ...props }: BaseProps & ComponentProps<"textarea">) {
  return (
    <Field id={id} label={label} error={error} hint={hint}>
      <textarea
        id={id}
        aria-invalid={!!error}
        aria-describedby={describedBy(id, hint, error)}
        className={`${FIELD} min-h-[110px] resize-y py-2 ${className}`}
        {...props}
      />
    </Field>
  );
}

/**
 * Construit la valeur de `aria-describedby` à partir de l'aide et de l'erreur.
 *
 * @param id Identifiant du champ.
 * @param hint Texte d'aide.
 * @param error Message d'erreur.
 * @returns Les identifiants à référencer, ou `undefined`.
 */
function describedBy(id: string, hint?: string, error?: string) {
  return [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
}

/** Enveloppe un champ avec son libellé, son aide et son message d'erreur. */
function Field({ id, label, error, hint, children }: BaseProps & { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="text-muted text-xs">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-danger text-xs">
          {error}
        </p>
      )}
    </div>
  );
}
