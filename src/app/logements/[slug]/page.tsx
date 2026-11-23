import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Carousel from "@/components/properties/Carousel";
import HostCard from "@/components/properties/HostCard";
import PropertyInfo from "@/components/properties/PropertyInfo";
import BackLink from "@/components/ui/BackLink";
import { getPropertyBySlug } from "@/lib/properties";

export async function generateMetadata({ params }: PageProps<"/logements/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return { title: "Logement introuvable" };
  return {
    title: property.title,
    description: property.description ?? undefined,
  };
}

export default async function PropertyPage({ params }: PageProps<"/logements/[slug]">) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const pictures = property.pictures.length > 0 ? property.pictures : property.cover ? [property.cover] : [];

  return (
    <div className="mx-auto w-full max-w-[508px] px-4 pt-6 pb-16 md:max-w-[1000px] md:pt-16">
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
