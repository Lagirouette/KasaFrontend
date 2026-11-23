import type { ComponentProps } from "react";

type Props = ComponentProps<"div"> & {
  /** Balise rendue : section/article quand le bloc a un sens propre */
  as?: "div" | "section" | "article" | "aside";
};

/** Bloc blanc arrondi : "Comment ça marche", fiche logement, hôte, formulaires… */
export default function Card({ as: Tag = "div", className = "", ...props }: Props) {
  return <Tag className={`bg-surface rounded-[10px] p-5 sm:p-6 ${className}`} {...props} />;
}
