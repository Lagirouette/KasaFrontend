import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Carousel from "./Carousel";

const PICTURES = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/5.jpg"];

function mainImage() {
  return screen.getByRole("img", { name: /Appartement cosy/ });
}

describe("Carousel", () => {
  describe("avec une seule image", () => {
    it("affiche l'image sans flèches, compteur ni miniatures", () => {
      render(<Carousel pictures={["/seule.jpg"]} title="Appartement cosy" />);

      expect(mainImage()).toHaveAttribute("src", "/seule.jpg");
      expect(screen.queryByRole("button", { name: "Photo précédente" })).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "Photo suivante" })).not.toBeInTheDocument();
      expect(screen.queryByText("1/1")).not.toBeInTheDocument();
      expect(screen.queryByRole("list", { name: "Autres photos" })).not.toBeInTheDocument();
    });
  });

  describe("sans image", () => {
    it("affiche un message de remplacement", () => {
      render(<Carousel pictures={[]} title="Appartement cosy" />);

      expect(screen.getByText("Aucune photo disponible")).toBeInTheDocument();
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });

  describe("avec plusieurs images", () => {
    it("affiche la première image, le compteur et 4 miniatures", () => {
      render(<Carousel pictures={PICTURES} title="Appartement cosy" />);

      expect(mainImage()).toHaveAttribute("src", "/1.jpg");
      expect(screen.getByText("1/5")).toBeInTheDocument();
      expect(screen.getAllByRole("button", { name: /Afficher la photo/ })).toHaveLength(4);
    });

    it("passe à l'image suivante", async () => {
      const user = userEvent.setup();
      render(<Carousel pictures={PICTURES} title="Appartement cosy" />);

      await user.click(screen.getByRole("button", { name: "Photo suivante" }));

      expect(mainImage()).toHaveAttribute("src", "/2.jpg");
      expect(screen.getByText("2/5")).toBeInTheDocument();
    });

    it("revient à la dernière image depuis la première", async () => {
      const user = userEvent.setup();
      render(<Carousel pictures={PICTURES} title="Appartement cosy" />);

      await user.click(screen.getByRole("button", { name: "Photo précédente" }));

      expect(mainImage()).toHaveAttribute("src", "/5.jpg");
      expect(screen.getByText("5/5")).toBeInTheDocument();
    });

    it("revient à la première image depuis la dernière", async () => {
      const user = userEvent.setup();
      render(<Carousel pictures={PICTURES} title="Appartement cosy" />);

      await user.click(screen.getByRole("button", { name: "Photo précédente" }));
      await user.click(screen.getByRole("button", { name: "Photo suivante" }));

      expect(mainImage()).toHaveAttribute("src", "/1.jpg");
    });

    it("affiche l'image choisie en miniature", async () => {
      const user = userEvent.setup();
      render(<Carousel pictures={PICTURES} title="Appartement cosy" />);

      await user.click(screen.getByRole("button", { name: "Afficher la photo 4" }));

      expect(mainImage()).toHaveAttribute("src", "/4.jpg");
      expect(screen.getByText("4/5")).toBeInTheDocument();
    });

    it("se pilote avec les flèches du clavier", async () => {
      const user = userEvent.setup();
      render(<Carousel pictures={PICTURES} title="Appartement cosy" />);

      await user.click(screen.getByRole("button", { name: "Photo suivante" }));
      await user.keyboard("{ArrowRight}");
      expect(mainImage()).toHaveAttribute("src", "/3.jpg");

      await user.keyboard("{ArrowLeft}{ArrowLeft}{ArrowLeft}");
      expect(mainImage()).toHaveAttribute("src", "/5.jpg");
    });

    it("garde une hauteur fixe et recadre les images au centre", () => {
      render(<Carousel pictures={PICTURES} title="Appartement cosy" />);

      expect(screen.getByTestId("carousel-frame")).toHaveClass("h-[300px]", "md:h-[400px]");
      expect(mainImage()).toHaveClass("object-cover", "object-center");
    });

    it("affiche une seule miniature quand il y a deux images", () => {
      render(<Carousel pictures={["/1.jpg", "/2.jpg"]} title="Appartement cosy" />);

      expect(screen.getAllByRole("button", { name: /Afficher la photo/ })).toHaveLength(1);
      expect(screen.getByText("1/2")).toBeInTheDocument();
    });
  });
});
