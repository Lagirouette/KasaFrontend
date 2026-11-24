"use client";

import { useSyncExternalStore } from "react";
import { getFavorites, getServerFavorites, subscribeFavorites, toggleFavorite } from "@/lib/favorites";

export function useFavorites() {
  const favorites = useSyncExternalStore<string[] | null>(subscribeFavorites, getFavorites, getServerFavorites);

  return {
    favorites: favorites ?? [],
    ready: favorites !== null,
    isFavorite: (id: string) => favorites?.includes(id) ?? false,
    toggleFavorite,
  };
}
