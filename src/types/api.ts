/**
 * Types des données échangées avec l'API Kasa.
 * @module types/api
 */
/** Corps d'une réponse d'erreur de l'API. */
export interface ApiErrorBody {
  error: string;
}

/** Rôle d'un utilisateur : voyageur, propriétaire ou administrateur. */
export type Role = "client" | "owner" | "admin";

/** Utilisateur complet, renvoyé à la connexion. */
export interface User {
  id: number;
  name: string;
  email: string | null;
  picture: string | null;
  role: Role;
}

/** Réponse de l'API à la connexion et à l'inscription. */
export interface AuthPayload {
  token: string;
  user: User;
}

/** Hôte d'un logement. */
export interface Host {
  id: number;
  name: string;
  picture: string | null;
}

/** Logement tel qu'il apparaît dans la liste. */
export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  cover: string | null;
  location: string | null;
  price_per_night: number;
  rating_avg: number | null;
  ratings_count: number | null;
  host?: Host;
}

/** Informations publiques d'un utilisateur. */
export interface UserPublic {
  id: number;
  name: string;
  picture: string | null;
}

/** Avis laissé sur un logement. */
export interface Rating {
  id: number;
  score: number;
  comment: string | null;
  created_at?: string;
  user: UserPublic;
}

/** Note moyenne et avis d'un logement. */
export interface RatingsSummary {
  rating_avg: number;
  ratings_count: number;
  ratings: Rating[];
}

/** Détail complet d'un logement. */
export interface PropertyDetails extends Property {
  pictures: string[];
  equipments: string[];
  tags: string[];
}
