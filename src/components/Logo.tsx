/**
 * Logo de Kasa, en version complète ou réduite à la maison.
 * @module components/Logo
 */
/**
 * Logo réduit à la maison, utilisé en mobile et dans le pied de page.
 *
 * @param props Propriétés du composant.
 * @param props.className Classes CSS de taille et de couleur.
 * @returns Le logo en SVG, décoratif.
 */
export function LogoMark({ className = "w-8 text-brand" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 30" role="img" aria-label="Kasa" className={`h-auto ${className}`}>
      <HousePath />
    </svg>
  );
}

/**
 * Logo complet de Kasa, avec le texte.
 *
 * @param props Propriétés du composant.
 * @param props.className Classes CSS de taille et de couleur.
 * @returns Le logo en SVG, décoratif.
 */
export default function Logo({ className = "w-[100px] text-brand" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 32" role="img" aria-label="Kasa" className={`h-auto ${className}`}>
      <text x="0" y="27" fill="currentColor" fontSize="30" fontWeight="700" fontFamily="inherit">
        k
      </text>
      <g transform="translate(17 1)">
        <HousePath />
      </g>
      <text x="45" y="27" fill="currentColor" fontSize="30" fontWeight="700" fontFamily="inherit">
        sa
      </text>
    </svg>
  );
}

/** Tracé de la maison, partagé par les deux versions du logo. */
function HousePath() {
  return (
    <>
      <path fill="currentColor" d="M2 12 14 2l12 10v16H2V12Z" />
      <path fill="#000" opacity=".18" d="M14 2l12 10v16H14V2Z" />
      <path fill="#fff" d="M10 19h5v9h-5z" />
    </>
  );
}
