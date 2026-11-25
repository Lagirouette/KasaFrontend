"use client";

import { HeartIcon } from "@/components/icons";
import { useFavorites } from "@/hooks/useFavorites";

type Props = {
  propertyId: string;
  title: string;
  className?: string;
};

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
