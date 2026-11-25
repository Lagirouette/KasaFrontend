import { LocationIcon } from "@/components/icons";
import Card from "@/components/ui/Card";
import Collapse from "@/components/ui/Collapse";
import { TagList } from "@/components/ui/Tag";
import { formatPrice } from "@/lib/format";
import type { PropertyDetails } from "@/types/api";

export default function PropertyInfo({ property }: { property: PropertyDetails }) {
  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div>
          <h1 className="text-xl font-medium">{property.title}</h1>
          {property.location && (
            <p className="text-muted mt-3 flex items-center gap-2 text-xs">
              <LocationIcon />
              {property.location}
            </p>
          )}
        </div>
        <p className="bg-chip rounded-[5px] px-3 py-1.5 text-sm whitespace-nowrap">
          <span className="font-semibold">{formatPrice(property.price_per_night)}</span>{" "}
          <span className="text-muted text-xs">par nuit</span>
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {property.description && (
          <Collapse title="Description">
            <p className="text-sm leading-relaxed">{property.description}</p>
          </Collapse>
        )}
        {property.equipments.length > 0 && (
          <Collapse title="Équipements">
            <TagList items={property.equipments} />
          </Collapse>
        )}
        {property.tags.length > 0 && (
          <Collapse title="Catégorie">
            <TagList items={property.tags} />
          </Collapse>
        )}
      </div>
    </Card>
  );
}
