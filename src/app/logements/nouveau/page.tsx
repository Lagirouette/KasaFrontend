import type { Metadata } from "next";
import { Suspense } from "react";
import PropertyForm from "@/components/properties/form/PropertyForm";
import BackLink from "@/components/ui/BackLink";
import { ButtonLink } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { getSessionUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Ajouter une propriété",
  description: "Proposez votre logement sur Kasa : photos, équipements, catégories et prix par nuit.",
  robots: { index: false },
};

export default function NewPropertyPage() {
  return (
    <div className="mx-auto w-full max-w-[508px] px-4 pt-6 pb-16 md:max-w-[1000px] md:pt-10">
      <BackLink href="/#logements">Retour aux annonces</BackLink>
      <Suspense fallback={<PropertyForm />}>
        <PropertyFormForUser />
      </Suspense>
    </div>
  );
}

async function PropertyFormForUser() {
  const user = await getSessionUser();

  if (user && user.role === "client") {
    return (
      <Card className="mt-10 flex flex-col items-center gap-4 text-center">
        <h1 className="text-lg font-medium">Ajouter une propriété</h1>
        <p className="text-sm">
          Votre compte voyageur ne permet pas encore de publier un logement. Seuls les comptes propriétaires peuvent
          ajouter une propriété.
        </p>
        <ButtonLink href="/#logements" size="sm">
          Découvrir les logements
        </ButtonLink>
      </Card>
    );
  }

  return <PropertyForm defaultHostName={user?.name ?? ""} />;
}
