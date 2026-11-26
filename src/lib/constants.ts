/**
 * Constantes partagées par l'application.
 * @module lib/constants
 */
/** Nom du cookie httpOnly qui contient le jeton JWT de la session. */
export const SESSION_COOKIE = "kasa_token";

/** Routes réservées aux utilisateurs connectés, ainsi que leurs sous-routes. */
export const PROTECTED_ROUTES = ["/logements/nouveau", "/messages", "/inscription/bienvenue"];

/** Routes réservées aux visiteurs non connectés. */
export const GUEST_ONLY_ROUTES = ["/connexion", "/inscription"];

/** Adresse de contact affichée dans les conditions générales. */
export const CONTACT_EMAIL = "contact@kasa.example";
