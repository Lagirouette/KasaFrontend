/**
 * Page d'un logement (`/logements/[slug]`).
 * @module app/logements/[slug]
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Carousel from "@/components/properties/Carousel";
import HostCard from "@/components/properties/HostCard";
import PropertyInfo from "@/components/properties/PropertyInfo";
import JsonLd from "@/components/seo/JsonLd";
import BackLink from "@/components/ui/BackLink";
import { getProperties, getPropertyBySlug } from "@/lib/properties";
import { breadcrumbSchema, propertySchema } from "@/lib/structured-data";

/**
 * Liste les slugs des logements à pré-rendre au build.
 *
 * @returns Les paramètres de chaque logement, ou un slug factice si l'API n'en renvoie aucun.
 */
export async function generateStaticParams() {
  const properties = await getProperties();
  if (properties.length === 0) return [{ slug: "__aucun-logement__" }];
  return properties.map((property) => ({ slug: property.slug }));
}

/** Génère le titre, la description, l'URL canonique et l'image de partage du logement. */
export async function generateMetadata({ params }: PageProps<"/logements/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return { title: "Logement introuvable", robots: { index: false } };

  const description =
    property.description ?? `${property.title}${property.location ? `, ${property.location}` : ""} sur Kasa.`;
  const path = `/logements/${property.slug}`;

  return {
    title: property.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title: property.title,
      description,
      images: property.cover ? [property.cover] : undefined,
    },
  };
}

/**
 * Affiche le carrousel, les informations et l'hôte du logement, avec ses données structurées.
 *
 * Renvoie une page 404 si le logement n'existe pas.
 */
export default async function PropertyPage({ params }: PageProps<"/logements/[slug]">) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const pictures = property.pictures.length > 0 ? property.pictures : property.cover ? [property.cover] : [];

  return (
    <div className="mx-auto w-full max-w-[508px] px-4 pt-6 pb-16 md:max-w-[1000px] md:pt-16">
      <JsonLd
        data={[
          propertySchema(property),
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: property.title, path: `/logements/${property.slug}` },
          ]),
        ]}
      />

      <BackLink href="/#logements">Retour aux annonces</BackLink>

      <div className="mt-4 grid items-start gap-4 md:mt-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="flex flex-col gap-4">
          <Carousel pictures={pictures} title={property.title} />
          <PropertyInfo property={property} />
        </div>
        <HostCard host={property.host} rating={property.rating_avg} />
      </div>
    </div>
  );
}
