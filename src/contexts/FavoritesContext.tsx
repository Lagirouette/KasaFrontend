"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import { getFavorites, getServerFavorites, subscribeFavorites, toggleFavorite } from "@/lib/favorites";

type FavoritesContextValue = {
  favorites: string[];
  ready: boolean;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const stored = useSyncExternalStore<string[] | null>(subscribeFavorites, getFavorites, getServerFavorites);
  const favorites = useMemo(() => stored ?? [], [stored]);
  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const value = useMemo(
    () => ({ favorites, ready: stored !== null, isFavorite, toggleFavorite }),
    [favorites, stored, isFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites doit être utilisé dans un FavoritesProvider");
  return context;
}
