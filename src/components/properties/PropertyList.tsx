import { getProperties } from "@/lib/properties";
import PropertyGrid from "./PropertyGrid";

export default async function PropertyList() {
  const properties = await getProperties();

  if (properties.length === 0) {
    return <p className="text-muted py-10 text-center text-sm">Aucun logement disponible pour le moment.</p>;
  }

  return <PropertyGrid properties={properties} />;
}
