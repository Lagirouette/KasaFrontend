import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { FAVORITES_KEY } from "@/lib/favorites";
import FavoriteButton from "./FavoriteButton";

beforeEach(() => {
  window.localStorage.clear();
});

describe("FavoriteButton", () => {
  it("n'est pas actif par défaut", () => {
    render(<FavoriteButton propertyId="c67ab8a7" title="Appartement cosy" />);

    const button = screen.getByRole("button", { name: "Ajouter « Appartement cosy » aux favoris" });
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("ajoute puis retire le logement des favoris au clic", async () => {
    const user = userEvent.setup();
    render(<FavoriteButton propertyId="c67ab8a7" title="Appartement cosy" />);

    await user.click(screen.getByRole("button", { name: /Ajouter/ }));

    const button = screen.getByRole("button", { name: "Retirer « Appartement cosy » des favoris" });
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(window.localStorage.getItem(FAVORITES_KEY)).toBe('["c67ab8a7"]');

    await user.click(button);

    expect(screen.getByRole("button", { name: /Ajouter/ })).toHaveAttribute("aria-pressed", "false");
    expect(window.localStorage.getItem(FAVORITES_KEY)).toBe("[]");
  });

  it("affiche un favori enregistré lors d'une visite précédente", () => {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(["c67ab8a7"]));

    render(<FavoriteButton propertyId="c67ab8a7" title="Appartement cosy" />);

    expect(screen.getByRole("button", { name: /Retirer/ })).toHaveAttribute("aria-pressed", "true");
  });

  it("reste en favori après avoir quitté puis rouvert la page", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<FavoriteButton propertyId="c67ab8a7" title="Appartement cosy" />);
    await user.click(screen.getByRole("button", { name: /Ajouter/ }));
    unmount();

    render(<FavoriteButton propertyId="c67ab8a7" title="Appartement cosy" />);

    expect(screen.getByRole("button", { name: /Retirer/ })).toHaveAttribute("aria-pressed", "true");
  });

  it("synchronise tous les boutons d'un même logement", async () => {
    const user = userEvent.setup();
    render(
      <>
        <FavoriteButton propertyId="c67ab8a7" title="Appartement cosy" />
        <FavoriteButton propertyId="c67ab8a7" title="Appartement cosy" />
        <FavoriteButton propertyId="b9123946" title="Magnifique appartement" />
      </>
    );

    await user.click(screen.getAllByRole("button", { name: /Appartement cosy/ })[0]);

    screen.getAllByRole("button", { name: /Appartement cosy/ }).forEach((button) => {
      expect(button).toHaveAttribute("aria-pressed", "true");
    });
    expect(screen.getByRole("button", { name: /Magnifique appartement/ })).toHaveAttribute("aria-pressed", "false");
  });
});
