/**
 * Liste des logements de la page d'accueil.
 * @module components/properties/PropertyList
 */
import JsonLd from "@/components/seo/JsonLd";
import { getProperties } from "@/lib/properties";
import { propertyListSchema } from "@/lib/structured-data";
import PropertyGrid from "./PropertyGrid";

/** Composant serveur qui charge tous les logements et les affiche avec leurs données structurées. */
export default async function PropertyList() {
  const properties = await getProperties();

  if (properties.length === 0) {
    return <p className="text-muted py-10 text-center text-sm">Aucun logement disponible pour le moment.</p>;
  }

  return (
    <>
      <JsonLd data={propertyListSchema(properties)} />
      <PropertyGrid properties={properties} />
    </>
  );
}
