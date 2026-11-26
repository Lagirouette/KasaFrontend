/**
 * Lien de retour.
 * @module components/ui/BackLink
 */
import Link from "next/link";

/**
 * Lien de retour précédé d'une flèche.
 *
 * @param props Propriétés du composant.
 * @param props.href Destination du lien, `/` par défaut.
 * @param props.children Texte du lien, « Retour » par défaut.
 */
export default function BackLink({ href = "/", children = "Retour" }: { href?: string; children?: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="bg-chip hover:bg-line inline-flex h-8 items-center gap-1 rounded-[5px] px-3 text-xs transition"
    >
      <span aria-hidden>←</span> {children}
    </Link>
  );
}
