/**
 * Grille de logements et son squelette de chargement.
 * @module components/properties/PropertyGrid
 */
import type { Property } from "@/types/api";
import PropertyCard from "./PropertyCard";

/** Classes de la grille, partagées avec le squelette. */
const GRID = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6";

/**
 * Affiche les logements dans une grille responsive.
 *
 * @param props Propriétés du composant.
 * @param props.properties Logements à afficher.
 * @param props.eagerCount Nombre de premières cartes dont l'image est chargée immédiatement, 3 par défaut. Mettre `0` quand une grande image occupe déjà le haut de la page.
 */
export default function PropertyGrid({ properties, eagerCount = 3 }: { properties: Property[]; eagerCount?: number }) {
  return (
    <ul className={GRID}>
      {properties.map((property, i) => (
        <li key={property.id} className="flex">
          <PropertyCard property={property} eager={i < eagerCount} />
        </li>
      ))}
    </ul>
  );
}

/**
 * Squelette affiché pendant le chargement des logements.
 *
 * @param props Propriétés du composant.
 * @param props.count Nombre de cartes à afficher, 6 par défaut.
 */
export function PropertyGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className={GRID} role="status" aria-label="Chargement des logements">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="bg-surface overflow-hidden rounded-[10px]">
          <div className="bg-line aspect-[355/376] animate-pulse" />
          <div className="space-y-2 p-3">
            <div className="bg-line h-3 w-2/3 animate-pulse rounded" />
            <div className="bg-line h-2 w-1/3 animate-pulse rounded" />
            <div className="bg-line mt-8 h-2 w-1/4 animate-pulse rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
