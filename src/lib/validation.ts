/**
 * Validation du formulaire d'inscription.
 * @module lib/validation
 */
/** Format accepté pour une adresse email. */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Format accepté pour un nom ou un prénom : lettres, espaces, apostrophes et tirets. */
const NAME_PATTERN = /^\p{L}[\p{L}' -]*$/u;

/** Règles d'un mot de passe sécurisé, affichées en direct dans le formulaire. */
export const PASSWORD_RULES = [
  { id: "length", label: "8 caractères minimum", test: (value: string) => value.length >= 8 },
  { id: "lower", label: "Une lettre minuscule", test: (value: string) => /\p{Ll}/u.test(value) },
  { id: "upper", label: "Une lettre majuscule", test: (value: string) => /\p{Lu}/u.test(value) },
  { id: "digit", label: "Un chiffre", test: (value: string) => /\d/.test(value) },
] as const;

/** Valeurs du formulaire d'inscription. */
export type RegistrationInput = {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  terms: boolean;
};

/** Message d'erreur de chaque champ invalide. */
export type RegistrationErrors = Partial<Record<keyof RegistrationInput, string>>;

/**
 * Valide un nom ou un prénom.
 *
 * @param value Valeur saisie.
 * @param label Nom du champ dans le message, par exemple `prénom`.
 * @returns Le message d'erreur, ou `undefined` si la valeur est valide.
 */
function validateName(value: string, label: string) {
  if (!value) return `Saisissez votre ${label}.`;
  if (value.length > 50) return `Votre ${label} ne doit pas dépasser 50 caractères.`;
  if (!NAME_PATTERN.test(value)) return `Votre ${label} ne peut contenir que des lettres, espaces, apostrophes ou tirets.`;
  return undefined;
}

/**
 * Valide une adresse email.
 *
 * @param value Adresse saisie.
 * @returns Le message d'erreur, ou `undefined` si l'adresse est valide.
 */
export function validateEmail(value: string) {
  if (!value) return "Saisissez votre adresse email.";
  if (value.length > 254 || !EMAIL_PATTERN.test(value)) return "Saisissez une adresse email valide, par exemple nom@exemple.fr.";
  return undefined;
}

/**
 * Vérifie qu'un mot de passe respecte toutes les {@link PASSWORD_RULES}.
 *
 * @param value Mot de passe saisi.
 * @returns Le message listant les règles manquantes, ou `undefined` si le mot de passe est valide.
 */
export function validatePassword(value: string) {
  if (!value) return "Choisissez un mot de passe.";
  if (value.length > 128) return "Le mot de passe ne doit pas dépasser 128 caractères.";
  const missing = PASSWORD_RULES.filter((rule) => !rule.test(value));
  if (missing.length > 0) {
    return `Le mot de passe doit contenir : ${missing.map((rule) => rule.label.toLowerCase()).join(", ")}.`;
  }
  return undefined;
}

/**
 * Valide tout le formulaire d'inscription.
 *
 * @param input Valeurs du formulaire.
 * @returns Les erreurs par champ. L'objet est vide si tout est valide.
 */
export function validateRegistration(input: RegistrationInput): RegistrationErrors {
  const errors: RegistrationErrors = {
    lastName: validateName(input.lastName, "nom"),
    firstName: validateName(input.firstName, "prénom"),
    email: validateEmail(input.email),
    password: validatePassword(input.password),
    terms: input.terms ? undefined : "Vous devez accepter les conditions générales d'utilisation pour créer un compte.",
  };

  return Object.fromEntries(Object.entries(errors).filter(([, message]) => message)) as RegistrationErrors;
}
