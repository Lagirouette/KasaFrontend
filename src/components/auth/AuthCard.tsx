/**
 * Carte qui encadre les formulaires de connexion et d'inscription.
 * @module components/auth/AuthCard
 */
import Card from "@/components/ui/Card";

/** Propriétés de {@link AuthCard}. */
type Props = {
  /** Titre principal de la page. */
  title: React.ReactNode;
  /** Texte d'introduction sous le titre. */
  intro: React.ReactNode;
  /** Formulaire affiché dans la carte. */
  children: React.ReactNode;
};

/** Affiche le titre, l'introduction et le formulaire d'une page d'authentification. */
export default function AuthCard({ title, intro, children }: Props) {
  return (
    <div className="mx-auto w-full max-w-[772px] px-4 pt-10 pb-16 md:pt-[72px]">
      <Card className="px-4 py-10 sm:px-10 md:py-14">
        <div className="mx-auto max-w-[480px] text-center">
          <h1 className="text-primary text-2xl font-bold md:text-3xl">{title}</h1>
          <p className="mt-3 text-sm">{intro}</p>
        </div>
        <div className="mx-auto mt-8 max-w-[360px]">{children}</div>
      </Card>
    </div>
  );
}
