import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/app/actions/auth", () => ({ logout: vi.fn() }));

import { LogoutForm } from "./LogoutButton";

describe("LogoutForm", () => {
  it("affiche une icône avec un nom accessible dans l'en-tête", () => {
    render(<LogoutForm variant="icon" />);

    const button = screen.getByRole("button", { name: "Se déconnecter" });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).not.toHaveTextContent("Se déconnecter");
  });

  it("affiche le texte du bouton dans le menu mobile", () => {
    render(<LogoutForm variant="menu" />);

    expect(screen.getByRole("button", { name: "Se déconnecter" })).toHaveTextContent("Se déconnecter");
  });
});
