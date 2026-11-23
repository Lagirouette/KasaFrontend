export interface ApiErrorBody {
  error: string;
}

export type Role = "client" | "owner" | "admin";

export interface Host {
  id: number;
  name: string;
  picture: string | null;
}

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

export interface UserPublic {
  id: number;
  name: string;
  picture: string | null;
}

export interface Rating {
  id: number;
  score: number;
  comment: string | null;
  created_at?: string;
  user: UserPublic;
}

export interface RatingsSummary {
  rating_avg: number;
  ratings_count: number;
  ratings: Rating[];
}

export interface PropertyDetails extends Property {
  pictures: string[];
  equipments: string[];
  tags: string[];
}
