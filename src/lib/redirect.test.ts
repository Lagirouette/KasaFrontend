import { describe, expect, it } from "vitest";
import { safeRedirect } from "./redirect";

describe("safeRedirect", () => {
  it("accepte un chemin interne", () => {
    expect(safeRedirect("/messages?hote=3")).toBe("/messages?hote=3");
  });

  it("refuse une URL externe", () => {
    expect(safeRedirect("https://site-malveillant.fr")).toBe("/");
    expect(safeRedirect("//site-malveillant.fr")).toBe("/");
    expect(safeRedirect("/\\site-malveillant.fr")).toBe("/");
  });

  it("revient à la valeur par défaut sans cible", () => {
    expect(safeRedirect(null)).toBe("/");
    expect(safeRedirect(undefined, "/favoris")).toBe("/favoris");
  });
});
