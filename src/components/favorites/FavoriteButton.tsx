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
      className={`flex size-6 items-center justify-center rounded-[5px] transition ${
        active ? "bg-primary text-white" : "bg-surface text-dark hover:text-primary"
      } ${className}`}
    >
      <HeartIcon className="size-3" />
    </button>
  );
}
