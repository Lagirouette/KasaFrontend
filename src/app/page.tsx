/**
 * Page d'accueil (`/`).
 * @module app/page
 */
import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import HowItWorks from "@/components/home/HowItWorks";
import { PropertyGridSkeleton } from "@/components/properties/PropertyGrid";
import PropertyList from "@/components/properties/PropertyList";
import JsonLd from "@/components/seo/JsonLd";
import PageHeading from "@/components/ui/PageHeading";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";

/** Image de la bannière. */
const HERO_IMAGE = "/images/accueil-maison-dunes.webp";

/** Métadonnées SEO de la page. */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/", images: [HERO_IMAGE] },
};

/** Affiche la bannière, la liste des logements et la section « Comment ça marche ? ». */
export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-[508px] px-4 pt-8 pb-16 md:max-w-[1147px] md:pt-10">
      <JsonLd data={[organizationSchema(), websiteSchema()]} />

      <PageHeading
        title={
          <>
            Chez vous, <br className="md:hidden" />
            partout et ailleurs
          </>
        }
      >
        Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux, sélectionnés avec soin par nos hôtes.
      </PageHeading>

      <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-[20px] md:aspect-[1115/458]">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          preload
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1147px) 1115px, calc(100vw - 32px)"
          className="object-cover"
        />
      </div>

      <section id="logements" aria-labelledby="logements-title" className="mt-4 scroll-mt-4">
        <h2 id="logements-title" className="sr-only">
          Nos logements
        </h2>
        <Suspense fallback={<PropertyGridSkeleton />}>
          <PropertyList />
        </Suspense>
      </section>

      <div className="mt-8">
        <HowItWorks />
      </div>
    </div>
  );
}
