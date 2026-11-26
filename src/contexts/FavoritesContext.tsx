/**
 * Contexte React qui partage les favoris dans toute l'application.
 * @module contexts/FavoritesContext
 */
"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import { getFavorites, getServerFavorites, subscribeFavorites, toggleFavorite } from "@/lib/favorites";

/** Valeur fournie par le contexte des favoris. */
type FavoritesContextValue = {
  /** Identifiants des logements favoris. */
  favorites: string[];
  /** `false` pendant le rendu serveur, tant que le localStorage n'a pas été lu. */
  ready: boolean;
  /** Indique si un logement est en favori. */
  isFavorite: (id: string) => boolean;
  /** Ajoute ou retire un logement des favoris. */
  toggleFavorite: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

/**
 * Fournit les favoris aux composants enfants et les synchronise avec le localStorage.
 *
 * @param props Propriétés du composant.
 * @param props.children Contenu de l'application.
 */
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

/**
 * Donne accès aux favoris.
 *
 * @returns Les favoris et les fonctions pour les lire et les modifier.
 * @throws {Error} Si le hook est utilisé hors d'un {@link FavoritesProvider}.
 */
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites doit être utilisé dans un FavoritesProvider");
  return context;
}
