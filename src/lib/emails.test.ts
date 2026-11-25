import { describe, expect, it } from "vitest";
import { registrationConfirmationEmail } from "./emails";

describe("registrationConfirmationEmail", () => {
  it("salue l'utilisateur et renvoie vers le site", () => {
    const email = registrationConfirmationEmail({ firstName: "Marie", siteUrl: "https://kasa.fr" });

    expect(email.subject).toMatch(/inscription est confirmée/);
    expect(email.text).toContain("Bonjour Marie,");
    expect(email.html).toContain('href="https://kasa.fr"');
    expect(email.text).toContain("https://kasa.fr/conditions-generales#donnees-personnelles");
  });

  it("échappe le HTML saisi par l'utilisateur", () => {
    const email = registrationConfirmationEmail({ firstName: "<b>Marie</b>", siteUrl: "https://kasa.fr" });

    expect(email.html).not.toContain("<b>Marie</b>");
    expect(email.html).toContain("&lt;b&gt;Marie&lt;/b&gt;");
  });
});
