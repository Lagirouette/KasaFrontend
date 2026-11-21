// Types calqués sur les réponses de l'API Kasa (Express + SQLite), voir public/openapi.json du backend.

export interface ApiErrorBody {
  error: string;
}

export type Role = "client" | "owner" | "admin";

export interface Host {
  id: number;
  name: string;
  picture: string | null;
}

/** Élément de GET /api/properties */
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

/** GET /api/properties/:id */
export interface PropertyDetails extends Property {
  pictures: string[];
  equipments: string[];
  tags: string[];
}
