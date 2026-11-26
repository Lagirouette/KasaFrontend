/**
 * Conteneur en forme de carte.
 * @module components/ui/Card
 */
import type { ComponentProps } from "react";

/** Propriétés de {@link Card}, en plus de celles d'un `div`. */
type Props = ComponentProps<"div"> & {
  /** Élément HTML à utiliser, `div` par défaut. */
  as?: "div" | "section" | "article" | "aside";
};

/** Carte blanche à coins arrondis. */
export default function Card({ as: Tag = "div", className = "", ...props }: Props) {
  return <Tag className={`bg-surface rounded-[10px] p-5 sm:p-6 ${className}`} {...props} />;
}
