import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Collapse from "./Collapse";

describe("Collapse", () => {
  it("est ouvert par défaut et affiche son contenu", () => {
    render(<Collapse title="Équipements">Wifi</Collapse>);

    expect(screen.getByRole("button", { name: "Équipements" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("region", { name: "Équipements" })).not.toHaveAttribute("inert");
  });

  it("se ferme puis se rouvre au clic", async () => {
    const user = userEvent.setup();
    render(<Collapse title="Équipements">Wifi</Collapse>);
    const button = screen.getByRole("button", { name: "Équipements" });

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(document.getElementById(button.getAttribute("aria-controls")!)).toHaveAttribute("inert");

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("region", { name: "Équipements" })).not.toHaveAttribute("inert");
  });

  it("peut être fermé par défaut", () => {
    render(
      <Collapse title="Description" defaultOpen={false}>
        Texte
      </Collapse>
    );

    expect(screen.getByRole("button", { name: "Description" })).toHaveAttribute("aria-expanded", "false");
  });

  it("s'ouvre et se ferme au clavier", async () => {
    const user = userEvent.setup();
    render(<Collapse title="Catégorie">Montmartre</Collapse>);

    await user.tab();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("button", { name: "Catégorie" })).toHaveAttribute("aria-expanded", "false");

    await user.keyboard(" ");
    expect(screen.getByRole("button", { name: "Catégorie" })).toHaveAttribute("aria-expanded", "true");
  });
});
