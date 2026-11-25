import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import RegisterForm from "./RegisterForm";

vi.mock("@/app/actions/auth", () => ({
  register: vi.fn(async () => ({})),
}));

describe("RegisterForm", () => {
  it("affiche tous les champs de la maquette", () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText("Nom")).toHaveAttribute("autocomplete", "family-name");
    expect(screen.getByLabelText("Prénom")).toHaveAttribute("autocomplete", "given-name");
    expect(screen.getByLabelText("Adresse email")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Mot de passe")).toHaveAttribute("type", "password");
    expect(screen.getByRole("button", { name: "S'inscrire" })).toBeInTheDocument();
  });

  it("indique en direct les règles du mot de passe respectées", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);
    const rules = within(screen.getByRole("list", { name: "Le mot de passe doit contenir" }));

    expect(rules.getByText(/8 caractères minimum/)).toHaveTextContent("manquant");

    await user.type(screen.getByLabelText("Mot de passe"), "Kasa2025");

    for (const item of rules.getAllByRole("listitem")) {
      expect(item).toHaveTextContent("respecté");
    }
  });

  it("demande le consentement sans case pré-cochée", () => {
    render(<RegisterForm />);

    const checkbox = screen.getByRole("checkbox", { name: /conditions générales d'utilisation/ });
    expect(checkbox).not.toBeChecked();
    expect(screen.getByRole("link", { name: /conditions générales d'utilisation \(nouvel onglet\)/ })).toHaveAttribute(
      "href",
      "/conditions-generales"
    );
  });

  it("permet d'afficher le mot de passe saisi", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    await user.click(screen.getByRole("button", { name: "Afficher le mot de passe" }));

    expect(screen.getByLabelText("Mot de passe")).toHaveAttribute("type", "text");
  });
});
