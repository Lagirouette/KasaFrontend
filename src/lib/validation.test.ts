import { describe, expect, it } from "vitest";
import { validateEmail, validatePassword, validateRegistration } from "./validation";

const VALID = {
  lastName: "Dupont",
  firstName: "Marie-Hélène",
  email: "marie@exemple.fr",
  password: "Kasa2025",
  terms: true,
};

describe("validateRegistration", () => {
  it("accepte une inscription complète", () => {
    expect(validateRegistration(VALID)).toEqual({});
  });

  it("signale chaque champ manquant", () => {
    const errors = validateRegistration({ lastName: "", firstName: "", email: "", password: "", terms: false });

    expect(Object.keys(errors).sort()).toEqual(["email", "firstName", "lastName", "password", "terms"]);
  });

  it("refuse un nom avec des chiffres ou des symboles", () => {
    expect(validateRegistration({ ...VALID, lastName: "Dupont3" }).lastName).toMatch(/lettres/);
    expect(validateRegistration({ ...VALID, firstName: "<script>" }).firstName).toMatch(/lettres/);
  });

  it("accepte les noms composés et accentués", () => {
    expect(validateRegistration({ ...VALID, lastName: "N'Diaye de la Tour", firstName: "Zoé" })).toEqual({});
  });

  it("refuse une inscription sans accepter les conditions", () => {
    expect(validateRegistration({ ...VALID, terms: false }).terms).toMatch(/conditions générales/);
  });
});

describe("validateEmail", () => {
  it.each(["marie", "marie@", "marie@exemple", "marie @exemple.fr"])("refuse %s", (email) => {
    expect(validateEmail(email)).toBeDefined();
  });

  it("accepte une adresse valide", () => {
    expect(validateEmail("marie.dupont@exemple.fr")).toBeUndefined();
  });
});

describe("validatePassword", () => {
  it("exige 8 caractères, une minuscule, une majuscule et un chiffre", () => {
    expect(validatePassword("kasa")).toMatch(/8 caractères minimum.*majuscule.*chiffre/);
    expect(validatePassword("kasakasa")).toMatch(/majuscule, un chiffre/);
    expect(validatePassword("KASAKASA1")).toMatch(/minuscule/);
  });

  it("accepte un mot de passe robuste", () => {
    expect(validatePassword("Kasa2025")).toBeUndefined();
  });
});
