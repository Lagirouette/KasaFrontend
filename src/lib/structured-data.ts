/**
 * Données structurées schema.org au format JSON-LD.
 * @module lib/structured-data
 */
import type { Property, PropertyDetails } from "@/types/api";
import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "./site";

const CONTEXT = "https://schema.org";

/**
 * Décrit l'entreprise Kasa.
 *
 * @returns Un objet `Organization`.
 */
export function organizationSchema() {
  return {
    "@context": CONTEXT,
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo.png"),
    description: SITE_DESCRIPTION,
  };
}

/**
 * Décrit le site Kasa.
 *
 * @returns Un objet `WebSite`.
 */
export function websiteSchema() {
  return {
    "@context": CONTEXT,
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: SITE_NAME,
    url: absoluteUrl("/"),
    inLanguage: "fr-FR",
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

/**
 * Décrit la liste des logements de la page d'accueil.
 *
 * @param properties Logements affichés.
 * @returns Un objet `ItemList`.
 */
export function propertyListSchema(properties: Property[]) {
  return {
    "@context": CONTEXT,
    "@type": "ItemList",
    name: "Logements Kasa",
    itemListElement: properties.map((property, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/logements/${property.slug}`),
      name: property.title,
    })),
  };
}

/**
 * Décrit un logement avec son prix par nuit, ses équipements et sa note.
 *
 * @param property Détail du logement.
 * @returns Un objet `Product` de type `Accommodation`.
 */
export function propertySchema(property: PropertyDetails) {
  const url = absoluteUrl(`/logements/${property.slug}`);
  const images = property.pictures.length > 0 ? property.pictures : property.cover ? [property.cover] : [];

  return {
    "@context": CONTEXT,
    "@type": "Product",
    "@id": `${url}#logement`,
    additionalType: "https://schema.org/Accommodation",
    name: property.title,
    description: property.description ?? undefined,
    image: images,
    url,
    sku: property.id,
    category: "Location de logement",
    brand: { "@type": "Brand", name: SITE_NAME },
    ...(property.tags.length > 0 && { keywords: property.tags.join(", ") }),
    ...(property.equipments.length > 0 && {
      additionalProperty: property.equipments.map((equipment) => ({
        "@type": "PropertyValue",
        name: "Équipement",
        value: equipment,
      })),
    }),
    offers: {
      "@type": "Offer",
      url,
      price: property.price_per_night,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: property.price_per_night,
        priceCurrency: "EUR",
        unitCode: "DAY",
        unitText: "nuit",
      },
      ...(property.host && {
        seller: { "@type": "Person", name: property.host.name },
      }),
    },
    ...(property.rating_avg !== null &&
      (property.ratings_count ?? 0) > 0 && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: property.rating_avg,
          ratingCount: property.ratings_count,
          bestRating: 5,
          worstRating: 1,
        },
      }),
  };
}

/**
 * Décrit le fil d'Ariane d'une page.
 *
 * @param items Étapes du fil d'Ariane, de l'accueil à la page courante.
 * @returns Un objet `BreadcrumbList`.
 */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
