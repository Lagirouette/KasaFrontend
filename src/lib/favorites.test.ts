import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  FAVORITES_KEY,
  getFavorites,
  isFavorite,
  parseFavorites,
  subscribeFavorites,
  toggleFavorite,
} from "./favorites";

beforeEach(() => {
  window.localStorage.clear();
});

describe("parseFavorites", () => {
  it("renvoie une liste vide sans valeur enregistrée", () => {
    expect(parseFavorites(null)).toEqual([]);
  });

  it("ignore une valeur qui n'est pas du JSON valide", () => {
    expect(parseFavorites("pas du json")).toEqual([]);
  });

  it("ignore une valeur qui n'est pas un tableau", () => {
    expect(parseFavorites('{"id":"a"}')).toEqual([]);
  });

  it("ne garde que les identifiants texte, sans doublon", () => {
    expect(parseFavorites('["a", 2, "b", "a", null]')).toEqual(["a", "b"]);
  });
});

describe("toggleFavorite", () => {
  it("ajoute un logement aux favoris et l'enregistre dans le localStorage", () => {
    toggleFavorite("c67ab8a7");

    expect(getFavorites()).toEqual(["c67ab8a7"]);
    expect(isFavorite("c67ab8a7")).toBe(true);
    expect(JSON.parse(window.localStorage.getItem(FAVORITES_KEY) ?? "[]")).toEqual(["c67ab8a7"]);
  });

  it("retire un logement déjà en favori", () => {
    toggleFavorite("c67ab8a7");
    toggleFavorite("c67ab8a7");

    expect(getFavorites()).toEqual([]);
    expect(isFavorite("c67ab8a7")).toBe(false);
    expect(window.localStorage.getItem(FAVORITES_KEY)).toBe("[]");
  });

  it("garde l'ordre d'ajout de plusieurs favoris", () => {
    toggleFavorite("a");
    toggleFavorite("b");
    toggleFavorite("c");
    toggleFavorite("b");

    expect(getFavorites()).toEqual(["a", "c"]);
  });
});

describe("getFavorites", () => {
  it("retrouve les favoris enregistrés lors d'une visite précédente", () => {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(["a", "b"]));

    expect(getFavorites()).toEqual(["a", "b"]);
  });

  it("renvoie la même référence tant que rien ne change", () => {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(["a"]));

    expect(getFavorites()).toBe(getFavorites());
  });
});

describe("subscribeFavorites", () => {
  it("prévient les abonnés quand un favori change", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeFavorites(listener);

    toggleFavorite("a");
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
    toggleFavorite("b");
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("prévient les abonnés quand les favoris changent dans un autre onglet", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeFavorites(listener);

    window.dispatchEvent(new StorageEvent("storage", { key: FAVORITES_KEY }));
    window.dispatchEvent(new StorageEvent("storage", { key: "autre-cle" }));

    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
  });
});
