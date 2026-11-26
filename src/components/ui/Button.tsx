/**
 * Boutons et liens stylés comme des boutons.
 * @module components/ui/Button
 */
import Link from "next/link";
import type { ComponentProps } from "react";

/** Style du bouton. */
type Variant = "primary" | "secondary";
/** Taille du bouton. */
type Size = "sm" | "md";

/** Classes de chaque style. */
const VARIANTS: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-chip text-dark hover:bg-line",
};

/** Classes de chaque taille. */
const SIZES: Record<Size, string> = {
  sm: "h-8 px-4 text-xs",
  md: "h-10 px-6 text-sm",
};

/**
 * Construit les classes CSS d'un bouton.
 *
 * @param options Style, taille et classes supplémentaires.
 * @returns Les classes à appliquer.
 */
export function buttonClasses({
  variant = "primary",
  size = "md",
  className = "",
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return `inline-flex items-center justify-center gap-2 rounded-[8px] font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
}

/** Options de style communes à {@link Button} et {@link ButtonLink}. */
type Style = { variant?: Variant; size?: Size };

/** Bouton stylé, de type `button` par défaut. */
export function Button({ variant, size, className, type = "button", ...props }: ComponentProps<"button"> & Style) {
  return <button type={type} className={buttonClasses({ variant, size, className })} {...props} />;
}

/** Lien Next.js qui a l'apparence d'un bouton. */
export function ButtonLink({ variant, size, className, ...props }: ComponentProps<typeof Link> & Style) {
  return <Link className={buttonClasses({ variant, size, className })} {...props} />;
}
