import type { Metadata } from "next";
import { Suspense } from "react";
import FavoritesList from "@/components/favorites/FavoritesList";
import { PropertyGridSkeleton } from "@/components/properties/PropertyGrid";
import PageHeading from "@/components/ui/PageHeading";
import { getProperties } from "@/lib/properties";

export const metadata: Metadata = { title: "Vos favoris" };

export default function FavoritesPage() {
  return (
    <div className="mx-auto w-full max-w-[508px] px-4 pt-8 pb-16 md:max-w-[760px] md:pt-16">
      <PageHeading title="Vos favoris">
        <p>
          Retrouvez ici tous les logements que vous avez aimés. <br className="hidden md:inline" />
          Prêts à réserver ? Un simple clic et votre prochain séjour est en route.
        </p>
      </PageHeading>

      <section aria-label="Logements favoris" className="mt-10 md:mt-12">
        <Suspense fallback={<PropertyGridSkeleton count={3} />}>
          <Favorites />
        </Suspense>
      </section>
    </div>
  );
}

async function Favorites() {
  const properties = await getProperties();
  return <FavoritesList properties={properties} />;
}
