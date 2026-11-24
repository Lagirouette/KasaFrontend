import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { FAVORITES_KEY } from "@/lib/favorites";
import type { Property } from "@/types/api";
import FavoritesList from "./FavoritesList";

function makeProperty(id: string, title: string): Property {
  return {
    id,
    slug: title.toLowerCase().replace(/\s+/g, "-"),
    title,
    description: null,
    cover: `/${id}.jpg`,
    location: "Ile de France - Paris 17e",
    price_per_night: 100,
    rating_avg: 4,
    ratings_count: 1,
  };
}

const PROPERTIES = [
  makeProperty("a", "Appartement cosy"),
  makeProperty("b", "Studio de charme"),
  makeProperty("c", "Loft de luxe"),
];

beforeEach(() => {
  window.localStorage.clear();
});

describe("FavoritesList", () => {
  it("affiche un message quand il n'y a aucun favori", () => {
    render(<FavoritesList properties={PROPERTIES} />);

    expect(screen.getByText("Vous n'avez pas encore de favoris.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Découvrir les logements" })).toHaveAttribute("href", "/#logements");
  });

  it("n'affiche que les logements en favori", () => {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(["a", "c"]));

    render(<FavoritesList properties={PROPERTIES} />);

    expect(screen.getByRole("heading", { name: "Appartement cosy" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Loft de luxe" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Studio de charme" })).not.toBeInTheDocument();
  });

  it("ignore un favori dont le logement n'existe plus", () => {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(["supprime"]));

    render(<FavoritesList properties={PROPERTIES} />);

    expect(screen.getByText("Vous n'avez pas encore de favoris.")).toBeInTheDocument();
  });

  it("retire la carte quand on enlève le logement des favoris", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(["a", "b"]));
    render(<FavoritesList properties={PROPERTIES} />);

    await user.click(screen.getByRole("button", { name: "Retirer « Appartement cosy » des favoris" }));

    expect(screen.queryByRole("heading", { name: "Appartement cosy" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Studio de charme" })).toBeInTheDocument();
  });
});
