/**
 * Bouton d'ajout aux favoris.
 * @module components/favorites/FavoriteButton
 */
"use client";

import { HeartIcon } from "@/components/icons";
import { useFavorites } from "@/hooks/useFavorites";

/** Propriétés de {@link FavoriteButton}. */
type Props = {
  /** Identifiant du logement. */
  propertyId: string;
  /** Titre du logement, utilisé dans le libellé accessible. */
  title: string;
  /** Classes CSS supplémentaires. */
  className?: string;
};

/**
 * Bouton cœur qui ajoute ou retire un logement des favoris.
 *
 * Le cœur est rouge et plein quand le logement est en favori. L'état est annoncé avec `aria-pressed`.
 */
export default function FavoriteButton({ propertyId, title, className = "" }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(propertyId);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(propertyId)}
      aria-pressed={active}
      aria-label={active ? `Retirer « ${title} » des favoris` : `Ajouter « ${title} » aux favoris`}
      className={`bg-surface flex size-7 items-center justify-center rounded-[5px] shadow-sm transition ${
        active ? "text-[#d62d20]" : "text-dark hover:text-[#d62d20]"
      } ${className}`}
    >
      <HeartIcon outline={!active} className={`size-3.5 transition-transform duration-200 ${active ? "scale-110" : ""}`} />
    </button>
  );
}
