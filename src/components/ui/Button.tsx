import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * Boutons de la maquette : fond rouge brique, texte blanc, coins arrondis.
 * - Button : action (submit, clic) ; ButtonLink : navigation (rendu en <a>).
 * Même apparence, mais le bon élément HTML pour l'accessibilité.
 */
type Variant = "primary" | "secondary";
type Size = "sm" | "md";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-chip text-dark hover:bg-line",
};

const SIZES: Record<Size, string> = {
  sm: "h-8 px-4 text-xs",
  md: "h-10 px-6 text-sm",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className = "",
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return `inline-flex items-center justify-center gap-2 rounded-[8px] font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
}

type Style = { variant?: Variant; size?: Size };

export function Button({ variant, size, className, type = "button", ...props }: ComponentProps<"button"> & Style) {
  return <button type={type} className={buttonClasses({ variant, size, className })} {...props} />;
}

export function ButtonLink({ variant, size, className, ...props }: ComponentProps<typeof Link> & Style) {
  return <Link className={buttonClasses({ variant, size, className })} {...props} />;
}
