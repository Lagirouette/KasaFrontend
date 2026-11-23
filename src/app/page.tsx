import Image from "next/image";
import { Suspense } from "react";
import HowItWorks from "@/components/home/HowItWorks";
import PropertyList, { PropertyListSkeleton } from "@/components/properties/PropertyList";
import PageHeading from "@/components/ui/PageHeading";

const HERO_IMAGE =
  "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-19-1.jpg";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-[508px] px-4 pt-8 pb-16 md:max-w-[1000px] md:pt-10">
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

      <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-[20px] md:aspect-[25/10]">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1000px) 968px, 100vw"
          className="object-cover"
        />
      </div>

      <section id="logements" aria-label="Logements" className="mt-4 scroll-mt-4">
        <Suspense fallback={<PropertyListSkeleton />}>
          <PropertyList />
        </Suspense>
      </section>

      <div className="mt-8">
        <HowItWorks />
      </div>
    </div>
  );
}
