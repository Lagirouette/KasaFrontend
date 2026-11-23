import { getProperties } from "@/lib/properties";
import PropertyCard from "./PropertyCard";

const GRID = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";

export default async function PropertyList() {
  const properties = await getProperties();

  if (properties.length === 0) {
    return <p className="text-muted py-10 text-center text-sm">Aucun logement disponible pour le moment.</p>;
  }

  return (
    <ul className={GRID}>
      {properties.map((property, i) => (
        <li key={property.id} className="flex">
          <PropertyCard property={property} eager={i < 3} />
        </li>
      ))}
    </ul>
  );
}

export function PropertyListSkeleton() {
  return (
    <div className={GRID} role="status" aria-label="Chargement des logements">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="bg-surface overflow-hidden rounded-[10px]">
          <div className="bg-line aspect-[4/3.5] animate-pulse" />
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
