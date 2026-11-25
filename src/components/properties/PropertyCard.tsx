import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/favorites/FavoriteButton";
import { formatPrice } from "@/lib/format";
import type { Property } from "@/types/api";

type Props = {
  property: Property;
  eager?: boolean;
};

export default function PropertyCard({ property, eager = false }: Props) {
  return (
    <article className="bg-surface relative flex w-full flex-col overflow-hidden rounded-[10px]">
      <div className="bg-line relative aspect-[4/3.5]">
        {property.cover && (
          <Image
            src={property.cover}
            alt={`Photo du logement « ${property.title} »${property.location ? `, ${property.location}` : ""}`}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
            loading={eager ? "eager" : "lazy"}
            className="object-cover"
          />
        )}
      </div>

      <FavoriteButton propertyId={property.id} title={property.title} className="absolute top-3 right-3 z-10" />

      <div className="flex flex-1 flex-col px-3 pt-3 pb-4">
        <h3 className="text-sm font-medium">
          <Link href={`/logements/${property.slug}`} className="after:absolute after:inset-0">
            {property.title}
          </Link>
        </h3>
        {property.location && <p className="text-muted mt-1 text-xs">{property.location}</p>}
        <p className="mt-auto pt-8 text-xs">
          <span className="font-medium">{formatPrice(property.price_per_night)}</span>{" "}
          <span className="text-muted">par nuit</span>
        </p>
      </div>
    </article>
  );
}
