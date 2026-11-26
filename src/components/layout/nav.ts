/**
 * Liens de navigation de l'en-tête.
 * @module components/layout/nav
 */
/** Liens principaux : Accueil et À propos. */
export const MAIN_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
];

/** Lien vers l'ajout d'un logement. */
export const ADD_PROPERTY_LINK = { href: "/logements/nouveau", label: "+Ajouter un logement" };

/** Liens affichés sous forme d'icônes : favoris et messagerie. */
export const ICON_LINKS = [
  { href: "/favoris", label: "Mes favoris", icon: "heart" },
  { href: "/messages", label: "Messagerie", icon: "message" },
] as const;
