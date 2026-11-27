/**
 * Logo de Kasa, en version complète ou réduite à la maison.
 *
 * Les logos sont des fichiers SVG statiques du dossier `public/` : le navigateur les met en cache et leurs tracés ne
 * sont pas répétés dans le HTML de chaque page.
 * @module components/Logo
 */
import Image from "next/image";

/**
 * Logo réduit à la maison, utilisé en mobile et dans le pied de page.
 *
 * @param props Propriétés du composant.
 * @param props.className Classes CSS de taille.
 * @param props.eager `true` pour charger le logo immédiatement, quand il est visible dès l'arrivée sur la page.
 * @returns L'image du logo, avec le texte alternatif « Kasa ».
 */
export function LogoMark({ className = "w-8", eager = false }: { className?: string; eager?: boolean }) {
  return (
    <Image
      src="/logo-mark.svg"
      alt="Kasa"
      width={47}
      height={54}
      unoptimized
      loading={eager ? "eager" : "lazy"}
      className={`h-auto ${className}`}
    />
  );
}

/**
 * Logo complet de Kasa, avec le texte.
 *
 * @param props Propriétés du composant.
 * @param props.className Classes CSS de taille.
 * @returns L'image du logo, avec le texte alternatif « Kasa ».
 */
export default function Logo({ className = "w-[114px]" }: { className?: string }) {
  return (
    <Image src="/logo.svg" alt="Kasa" width={163} height={58} unoptimized loading="eager" className={`h-auto ${className}`} />
  );
}
