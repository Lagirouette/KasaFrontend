export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const NAME_PATTERN = /^\p{L}[\p{L}' -]*$/u;

export const PASSWORD_RULES = [
  { id: "length", label: "8 caractères minimum", test: (value: string) => value.length >= 8 },
  { id: "lower", label: "Une lettre minuscule", test: (value: string) => /\p{Ll}/u.test(value) },
  { id: "upper", label: "Une lettre majuscule", test: (value: string) => /\p{Lu}/u.test(value) },
  { id: "digit", label: "Un chiffre", test: (value: string) => /\d/.test(value) },
] as const;

export type RegistrationInput = {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  terms: boolean;
};

export type RegistrationErrors = Partial<Record<keyof RegistrationInput, string>>;

function validateName(value: string, label: string) {
  if (!value) return `Saisissez votre ${label}.`;
  if (value.length > 50) return `Votre ${label} ne doit pas dépasser 50 caractères.`;
  if (!NAME_PATTERN.test(value)) return `Votre ${label} ne peut contenir que des lettres, espaces, apostrophes ou tirets.`;
  return undefined;
}

export function validateEmail(value: string) {
  if (!value) return "Saisissez votre adresse email.";
  if (value.length > 254 || !EMAIL_PATTERN.test(value)) return "Saisissez une adresse email valide, par exemple nom@exemple.fr.";
  return undefined;
}

export function validatePassword(value: string) {
  if (!value) return "Choisissez un mot de passe.";
  if (value.length > 128) return "Le mot de passe ne doit pas dépasser 128 caractères.";
  const missing = PASSWORD_RULES.filter((rule) => !rule.test(value));
  if (missing.length > 0) {
    return `Le mot de passe doit contenir : ${missing.map((rule) => rule.label.toLowerCase()).join(", ")}.`;
  }
  return undefined;
}

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
