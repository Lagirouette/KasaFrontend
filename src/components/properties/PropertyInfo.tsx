import { LocationIcon } from "@/components/icons";
import Card from "@/components/ui/Card";
import { TagList } from "@/components/ui/Tag";
import type { PropertyDetails } from "@/types/api";

export default function PropertyInfo({ property }: { property: PropertyDetails }) {
  return (
    <Card>
      <h1 className="text-xl font-medium">{property.title}</h1>
      {property.location && (
        <p className="text-muted mt-3 flex items-center gap-2 text-xs">
          <LocationIcon />
          {property.location}
        </p>
      )}
      {property.description && <p className="mt-6 text-sm leading-relaxed">{property.description}</p>}

      {property.equipments.length > 0 && (
        <section aria-labelledby="equipments-title" className="mt-8">
          <h2 id="equipments-title" className="mb-3 text-sm font-medium">
            Équipements
          </h2>
          <TagList items={property.equipments} />
        </section>
      )}

      {property.tags.length > 0 && (
        <section aria-labelledby="tags-title" className="mt-8">
          <h2 id="tags-title" className="mb-3 text-sm font-medium">
            Catégorie
          </h2>
          <TagList items={property.tags} />
        </section>
      )}
    </Card>
  );
}
