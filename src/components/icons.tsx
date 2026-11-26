/**
 * Icônes SVG décoratives, masquées pour les lecteurs d'écran.
 * @module components/icons
 */
/** Propriétés communes des icônes. */
type IconProps = { className?: string };

/** Classes appliquées à toutes les icônes. */
const base = "inline-block shrink-0";

/**
 * Cœur des favoris.
 *
 * @param props Propriétés de l'icône.
 * @param props.className Classes CSS de taille et de couleur.
 * @param props.outline `true` pour un cœur vide, `false` pour un cœur plein.
 */
export function HeartIcon({ className = "size-4", outline = false }: IconProps & { outline?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={outline ? "none" : "currentColor"}
      stroke={outline ? "currentColor" : "none"}
      strokeWidth="2"
      aria-hidden
      className={`${base} ${className}`}
    >
      <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.5 2.9 4.5 6.7 4.5c2.2 0 3.6 1.2 5.3 3.1 1.7-1.9 3.1-3.1 5.3-3.1 3.8 0 5.8 4 4.3 7.3C19.5 16.4 12 21 12 21Z" />
    </svg>
  );
}

/** Bulle de la messagerie. */
export function MessageIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className={`${base} ${className}`}>
      <path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" strokeLinejoin="round" />
    </svg>
  );
}

/** Bouton d'ouverture du menu mobile. */
export function MenuIcon({ className = "size-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className={`${base} ${className}`}>
      <path d="M4 7h16M8 12h12M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

/** Croix de fermeture. */
export function CloseIcon({ className = "size-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className={`${base} ${className}`}>
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}

/** Flèche vers la gauche. */
export function ChevronLeftIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className={`${base} ${className}`}>
      <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Flèche vers la droite. */
export function ChevronRightIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className={`${base} ${className}`}>
      <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Flèche vers le bas, utilisée par les sections repliables. */
export function ChevronDownIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className={`${base} ${className}`}>
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Repère de localisation. */
export function LocationIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className={`${base} ${className}`}>
      <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

/** Étoile de notation. */
export function StarIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={`${base} ${className}`}>
      <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z" />
    </svg>
  );
}
