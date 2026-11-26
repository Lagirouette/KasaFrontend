/**
 * Liste des logements favoris.
 * @module components/favorites/FavoritesList
 */
"use client";

import PropertyGrid, { PropertyGridSkeleton } from "@/components/properties/PropertyGrid";
import { ButtonLink } from "@/components/ui/Button";
import { useFavorites } from "@/hooks/useFavorites";
import type { Property } from "@/types/api";

/**
 * Affiche les logements enregistrés en favoris, ou un message s'il n'y en a aucun.
 *
 * @param props Propriétés du composant.
 * @param props.properties Tous les logements, filtrés ensuite selon les favoris.
 */
export default function FavoritesList({ properties }: { properties: Property[] }) {
  const { favorites, ready } = useFavorites();

  if (!ready) return <PropertyGridSkeleton count={3} />;

  const favoriteProperties = properties.filter((property) => favorites.includes(property.id));

  if (favoriteProperties.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 py-10 text-center">
        <p className="text-sm">Vous n&apos;avez pas encore de favoris.</p>
        <ButtonLink href="/#logements" size="sm">
          Découvrir les logements
        </ButtonLink>
      </div>
    );
  }

  const count = favoriteProperties.length;

  return (
    <>
      <p role="status" className="text-muted mb-4 text-sm">
        {count} logement{count > 1 ? "s" : ""} dans vos favoris
      </p>
      <PropertyGrid properties={favoriteProperties} />
    </>
  );
}
