import { describe, expect, it } from "vitest";
import { getThumbnailIndexes, wrapIndex } from "./carousel";

describe("wrapIndex", () => {
  it("garde un index valide tel quel", () => {
    expect(wrapIndex(2, 5)).toBe(2);
  });

  it("revient au début après la dernière image", () => {
    expect(wrapIndex(5, 5)).toBe(0);
  });

  it("passe à la dernière image avant la première", () => {
    expect(wrapIndex(-1, 5)).toBe(4);
  });

  it("renvoie 0 quand il n'y a aucune image", () => {
    expect(wrapIndex(3, 0)).toBe(0);
  });
});

describe("getThumbnailIndexes", () => {
  it("n'affiche aucune miniature pour une seule image", () => {
    expect(getThumbnailIndexes(1, 0)).toEqual([]);
  });

  it("affiche les autres images quand il y en a peu", () => {
    expect(getThumbnailIndexes(3, 0)).toEqual([1, 2]);
  });

  it("affiche au maximum 4 miniatures", () => {
    expect(getThumbnailIndexes(8, 0)).toEqual([1, 2, 3, 4]);
  });

  it("affiche les images suivantes en bouclant", () => {
    expect(getThumbnailIndexes(5, 3)).toEqual([4, 0, 1, 2]);
  });
});
