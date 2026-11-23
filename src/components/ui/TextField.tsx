import type { ComponentProps } from "react";

type BaseProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
};

const FIELD =
  "border-line focus:border-primary aria-[invalid=true]:border-danger placeholder:text-muted w-full rounded-[5px] border bg-white px-3 text-sm outline-none";

/**
 * Champ avec libellé, aide optionnelle et message d'erreur reliés par aria-describedby.
 * Toutes les props natives de <input> sont acceptées : utilisable contrôlé (value/onChange)
 * ou non contrôlé (name/defaultValue, pratique avec les Server Actions).
 */
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

/** Variante multiligne (description d'un logement) */
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

function describedBy(id: string, hint?: string, error?: string) {
  return [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
}

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
