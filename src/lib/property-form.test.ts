import { describe, expect, it } from "vitest";
import { IMAGE_MAX_SIZE, readPropertyForm, validateImageFile, validateProperty, type PropertyFormInput } from "./property-form";

const VALID: PropertyFormInput = {
  title: "Appartement cosy",
  description: "Un appartement lumineux au cœur de Paris, proche de tout.",
  postalCode: "75017",
  location: "Paris 17e",
  price: "120",
  cover: "http://localhost:3000/uploads/cover.jpg",
  pictures: ["http://localhost:3000/uploads/1.jpg"],
  hostName: "Marie Dupont",
  hostPicture: "",
  equipments: ["WIFI", "Frigo"],
  tags: ["Parc"],
};

describe("validateProperty", () => {
  it("accepte une propriété complète", () => {
    expect(validateProperty(VALID)).toEqual({});
  });

  it("exige titre, description, localisation, prix, photo et équipements", () => {
    const errors = validateProperty({
      ...VALID,
      title: "",
      description: "",
      postalCode: "",
      location: "",
      price: "",
      cover: "",
      equipments: [],
    });

    expect(Object.keys(errors).sort()).toEqual(
      ["cover", "description", "equipments", "location", "postalCode", "price", "title"].sort()
    );
  });

  it("refuse un prix non entier, nul ou excessif", () => {
    expect(validateProperty({ ...VALID, price: "12.5" }).price).toBeDefined();
    expect(validateProperty({ ...VALID, price: "0" }).price).toBeDefined();
    expect(validateProperty({ ...VALID, price: "20000" }).price).toBeDefined();
  });

  it("refuse un code postal mal formé", () => {
    expect(validateProperty({ ...VALID, postalCode: "7501" }).postalCode).toMatch(/5 chiffres/);
  });

  it("refuse un équipement hors de la liste prédéfinie", () => {
    expect(validateProperty({ ...VALID, equipments: ["Jacuzzi"] }).equipments).toMatch(/pas reconnu/);
  });

  it("limite le nombre d'images du logement", () => {
    const pictures = Array.from({ length: 11 }, (_, i) => `http://localhost:3000/uploads/${i}.jpg`);
    expect(validateProperty({ ...VALID, pictures }).pictures).toMatch(/10 images maximum/);
  });

  it("refuse une image qui n'est pas une adresse web", () => {
    expect(validateProperty({ ...VALID, cover: "javascript:alert(1)" }).cover).toBeDefined();
  });
});

describe("validateImageFile", () => {
  it("accepte une image JPEG légère", () => {
    expect(validateImageFile({ type: "image/jpeg", size: 1000 })).toBeUndefined();
  });

  it("refuse un fichier qui n'est pas une image", () => {
    expect(validateImageFile({ type: "application/pdf", size: 1000 })).toMatch(/Format non accepté/);
  });

  it("refuse une image de plus de 5 Mo", () => {
    expect(validateImageFile({ type: "image/png", size: IMAGE_MAX_SIZE + 1 })).toMatch(/5 Mo/);
  });
});

describe("readPropertyForm", () => {
  it("lit les champs, nettoie les espaces et retire les doublons", () => {
    const formData = new FormData();
    formData.set("title", "  Loft  ");
    formData.append("equipments", "WIFI");
    formData.append("equipments", "WIFI");
    formData.append("pictures", "");
    formData.append("tags", "Parc");

    const input = readPropertyForm(formData);

    expect(input.title).toBe("Loft");
    expect(input.equipments).toEqual(["WIFI"]);
    expect(input.pictures).toEqual([]);
    expect(input.tags).toEqual(["Parc"]);
  });
});
