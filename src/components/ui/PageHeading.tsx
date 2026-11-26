/**
 * En-tête de page.
 * @module components/ui/PageHeading
 */
/**
 * Titre principal centré d'une page, suivi d'une introduction.
 *
 * @param props Propriétés du composant.
 * @param props.title Titre, rendu dans le `h1`.
 * @param props.children Texte d'introduction.
 */
export default function PageHeading({ title, children }: { title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="text-center">
      <h1 className="text-primary text-2xl font-bold md:text-3xl">{title}</h1>
      {children && <div className="mx-auto mt-3 max-w-[560px] space-y-3 text-sm">{children}</div>}
    </div>
  );
}
