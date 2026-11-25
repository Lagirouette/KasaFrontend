import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { EQUIPMENTS } from "@/lib/property-form";
import PropertyForm from "./PropertyForm";

const createProperty = vi.hoisted(() => vi.fn(async () => ({})));

vi.mock("@/app/actions/properties", () => ({ createProperty }));

beforeEach(() => {
  createProperty.mockClear();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function imageFile(name: string, type: string, size: number) {
  const file = new File(["x"], name, { type });
  Object.defineProperty(file, "size", { value: size });
  return file;
}

describe("PropertyForm", () => {
  it("affiche une case à cocher pour chaque équipement prédéfini", () => {
    render(<PropertyForm />);

    const group = screen.getByRole("group", { name: /Équipements/ });
    expect(within(group).getAllByRole("checkbox")).toHaveLength(EQUIPMENTS.length);
    expect(within(group).getByRole("checkbox", { name: "WIFI" })).toHaveAttribute("value", "WIFI");
  });

  it("bloque l'envoi et liste les champs obligatoires manquants", async () => {
    const user = userEvent.setup();
    render(<PropertyForm />);

    await user.click(screen.getByRole("button", { name: "Ajouter" }));

    const summary = screen.getByRole("alert");
    for (const label of ["Titre de la propriété", "Description", "Localisation", "Prix par nuit", "Image de couverture", "Équipements"]) {
      expect(within(summary).getByRole("link", { name: new RegExp(`^${label} :`) })).toBeInTheDocument();
    }
    expect(screen.getByLabelText("Titre de la propriété *")).toHaveAttribute("aria-invalid", "true");
    expect(createProperty).not.toHaveBeenCalled();
  });

  it("retire l'erreur d'un champ dès qu'il est corrigé", async () => {
    const user = userEvent.setup();
    render(<PropertyForm />);

    await user.click(screen.getByRole("button", { name: "Ajouter" }));
    expect(screen.getByLabelText("Titre de la propriété *")).toHaveAttribute("aria-invalid", "true");

    await user.type(screen.getByLabelText("Titre de la propriété *"), "Loft");

    expect(screen.getByLabelText("Titre de la propriété *")).toHaveAttribute("aria-invalid", "false");
    expect(within(screen.getByRole("alert")).queryByRole("link", { name: /^Titre de la propriété/ })).not.toBeInTheDocument();
  });

  it("préremplit le nom de l'hôte avec celui du compte", () => {
    render(<PropertyForm defaultHostName="Marie Dupont" />);

    expect(screen.getByLabelText("Nom de l'hôte *")).toHaveValue("Marie Dupont");
  });

  it("ajoute un nouveau champ image avec le bouton « + Ajouter une image »", async () => {
    const user = userEvent.setup();
    render(<PropertyForm />);

    await user.click(screen.getByRole("button", { name: "+ Ajouter une image" }));

    expect(screen.getByLabelText("Image du logement 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Image du logement 2")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Retirer l'image : Image du logement 2" }));
    expect(screen.queryByLabelText("Image du logement 2")).not.toBeInTheDocument();
  });

  it("refuse une image trop lourde sans l'envoyer", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup({ applyAccept: false });
    const { container } = render(<PropertyForm />);
    const coverFileInput = container.querySelector<HTMLInputElement>('#cover ~ input[type="file"]')!;

    await user.upload(coverFileInput, imageFile("photo.jpg", "image/jpeg", 6 * 1024 * 1024));

    const rules = screen.getByText("JPEG, PNG, WebP ou AVIF, 5 Mo maximum.", { selector: "#cover-hint" });
    expect(rules).toHaveClass("text-danger");
    expect(rules).toHaveAttribute("role", "alert");
    expect(screen.getByLabelText("Image de couverture *")).toHaveAttribute("aria-invalid", "true");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("n'affiche les formats acceptés qu'en cas d'image refusée", () => {
    render(<PropertyForm />);

    const rules = screen.getByText("JPEG, PNG, WebP ou AVIF, 5 Mo maximum.", { selector: "#cover-hint" });
    expect(rules).toHaveClass("sr-only");
    expect(rules).not.toHaveClass("text-danger");
    expect(screen.getByLabelText("Image de couverture *")).not.toHaveAttribute("placeholder");
  });

  it("refuse un fichier qui n'est pas une image", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup({ applyAccept: false });
    const { container } = render(<PropertyForm />);
    const coverFileInput = container.querySelector<HTMLInputElement>('#cover ~ input[type="file"]')!;

    await user.upload(coverFileInput, imageFile("contrat.pdf", "application/pdf", 1000));

    expect(screen.getByText("JPEG, PNG, WebP ou AVIF, 5 Mo maximum.", { selector: "#cover-hint" })).toHaveClass("text-danger");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("envoie l'image choisie et affiche son aperçu", async () => {
    const fetchMock = vi.fn(async () =>
      new Response(JSON.stringify({ url: "http://localhost:3000/uploads/cover.jpg" }), { status: 201 })
    );
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    const { container } = render(<PropertyForm />);
    const coverFileInput = container.querySelector<HTMLInputElement>('#cover ~ input[type="file"]')!;

    await user.upload(coverFileInput, imageFile("photo.jpg", "image/jpeg", 1000));

    expect(fetchMock).toHaveBeenCalledWith("/api/uploads", expect.objectContaining({ method: "POST" }));
    expect(await screen.findByRole("img", { name: "Aperçu : Image de couverture *" })).toHaveAttribute(
      "src",
      "http://localhost:3000/uploads/cover.jpg"
    );
    expect(screen.getByLabelText("Image de couverture *")).toHaveValue("http://localhost:3000/uploads/cover.jpg");
  });

  it("sélectionne des catégories et en ajoute une personnalisée", async () => {
    const user = userEvent.setup();
    render(<PropertyForm />);

    await user.click(screen.getByRole("button", { name: "Parc" }));
    expect(screen.getByRole("button", { name: "Parc" })).toHaveAttribute("aria-pressed", "true");

    await user.type(screen.getByLabelText("Ajouter une catégorie personnalisée"), "Montagne{Enter}");
    expect(screen.getByRole("button", { name: "Montagne" })).toHaveAttribute("aria-pressed", "true");
  });

  it("envoie le formulaire quand tous les champs obligatoires sont valides", async () => {
    const user = userEvent.setup();
    render(<PropertyForm defaultHostName="Marie Dupont" />);

    await user.type(screen.getByLabelText("Titre de la propriété *"), "Appartement cosy");
    await user.type(screen.getByLabelText("Description *"), "Un appartement lumineux au cœur de Paris.");
    await user.type(screen.getByLabelText("Code postal *"), "75017");
    await user.type(screen.getByLabelText("Localisation *"), "Paris 17e");
    await user.type(screen.getByLabelText("Prix par nuit (€) *"), "120");
    await user.type(screen.getByLabelText("Image de couverture *"), "https://exemple.fr/cover.jpg");
    await user.click(screen.getByRole("checkbox", { name: "WIFI" }));
    await user.click(screen.getByRole("button", { name: "Ajouter" }));

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(createProperty).toHaveBeenCalledTimes(1);
    const formData = (createProperty.mock.calls[0] as unknown as [unknown, FormData])[1];
    expect(formData.getAll("equipments")).toEqual(["WIFI"]);
    expect(formData.get("price")).toBe("120");
  });
});
