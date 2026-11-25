import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HostCard from "./HostCard";

const HOST = { id: 7, name: "Nathalie Jean", picture: null };

describe("HostCard", () => {
  it("renvoie vers la messagerie avec l'hôte concerné", () => {
    render(<HostCard host={HOST} rating={4.6} />);

    expect(screen.getByRole("link", { name: "Envoyer un message à Nathalie Jean" })).toHaveAttribute(
      "href",
      "/messages?hote=7"
    );
    expect(screen.getByRole("link", { name: "Contacter l'hôte Nathalie Jean" })).toHaveAttribute(
      "href",
      "/messages?hote=7"
    );
  });

  it("affiche la note arrondie de l'hôte", () => {
    render(<HostCard host={HOST} rating={4.6} />);

    expect(screen.getByText(/Note :/).parentElement).toHaveTextContent("Note : 5 sur 5");
  });

  it("renvoie vers la messagerie même sans hôte connu", () => {
    render(<HostCard rating={null} />);

    expect(screen.getByRole("link", { name: /Envoyer un message/ })).toHaveAttribute("href", "/messages");
  });
});
