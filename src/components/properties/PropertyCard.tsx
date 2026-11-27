/**
 * Carte d'un logement dans une grille.
 * @module components/properties/PropertyCard
 */
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/favorites/FavoriteButton";
import { formatPrice } from "@/lib/format";
import type { Property } from "@/types/api";

/** Propriétés de {@link PropertyCard}. */
type Props = {
  /** Logement à afficher. */
  property: Property;
  /** `true` pour charger l'image immédiatement, pour les cartes visibles au chargement de la page. */
  eager?: boolean;
};

/** Carte cliquable avec la photo, le titre, la localisation, le prix et le bouton favori d'un logement. */
export default function PropertyCard({ property, eager = false }: Props) {
  return (
    <article className="bg-surface relative flex w-full flex-col overflow-hidden rounded-[10px]">
      <div className="bg-line relative aspect-[355/376]">
        {property.cover && (
          <Image
            src={property.cover}
            alt={`Photo du logement « ${property.title} »${property.location ? `, ${property.location}` : ""}`}
            fill
            sizes="(min-width: 1147px) 355px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, calc(100vw - 32px)"
            loading={eager ? "eager" : "lazy"}
            className="object-cover"
          />
        )}
      </div>

      <FavoriteButton propertyId={property.id} title={property.title} className="absolute top-3 right-3 z-10" />

      <div className="flex flex-1 flex-col px-4 pt-4 pb-5 lg:px-6 lg:pt-6 lg:pb-6">
        <h3 className="text-base font-medium lg:text-lg">
          <Link href={`/logements/${property.slug}`} className="after:absolute after:inset-0">
            {property.title}
          </Link>
        </h3>
        {property.location && <p className="text-muted mt-1 text-sm">{property.location}</p>}
        <p className="mt-auto pt-8 text-sm">
          <span className="font-medium">{formatPrice(property.price_per_night)}</span>{" "}
          <span className="text-muted">par nuit</span>
        </p>
      </div>
    </article>
  );
}
