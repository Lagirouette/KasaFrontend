export const EQUIPMENTS = [
  "Micro-Ondes",
  "Douche italienne",
  "Frigo",
  "WIFI",
  "Parking",
  "Sèche Cheveux",
  "Machine à laver",
  "Cuisine équipée",
  "Télévision",
  "Chambre Séparée",
  "Climatisation",
  "Frigo Américain",
  "Clic-clac",
  "Four",
  "Rangements",
  "Lit",
  "Bouilloire",
  "SDB",
  "Toilettes sèches",
  "Cintres",
  "Baie vitrée",
  "Hotte",
  "Baignoire",
  "Vue Parc",
] as const;

export const CATEGORIES = [
  "Parc",
  "Night Life",
  "Culture",
  "Nature",
  "Touristique",
  "Vue sur mer",
  "Pour les couples",
  "Famille",
  "Forêt",
] as const;

export const IMAGE_MAX_SIZE = 5 * 1024 * 1024;
export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
export const IMAGE_RULES = "JPEG, PNG, WebP ou AVIF, 5 Mo maximum.";
export const MAX_PICTURES = 10;
export const MAX_TAGS = 12;

export type PropertyFormInput = {
  title: string;
  description: string;
  postalCode: string;
  location: string;
  price: string;
  cover: string;
  pictures: string[];
  hostName: string;
  hostPicture: string;
  equipments: string[];
  tags: string[];
};

export type PropertyFormErrors = Partial<Record<keyof PropertyFormInput, string>>;

export const FIELD_ORDER: (keyof PropertyFormInput)[] = [
  "title",
  "description",
  "postalCode",
  "location",
  "price",
  "cover",
  "pictures",
  "hostName",
  "hostPicture",
  "equipments",
  "tags",
];

function isImageUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateImageFile(file: { type: string; size: number }) {
  if (!IMAGE_TYPES.includes(file.type)) return "Format non accepté : choisissez une image JPEG, PNG, WebP ou AVIF.";
  if (file.size > IMAGE_MAX_SIZE) return "Image trop lourde : 5 Mo maximum.";
  return undefined;
}

export function validateProperty(input: PropertyFormInput): PropertyFormErrors {
  const errors: PropertyFormErrors = {};
  const price = Number(input.price);
  const equipments = new Set<string>(EQUIPMENTS);

  if (input.title.length < 3) errors.title = "Saisissez un titre d'au moins 3 caractères.";
  else if (input.title.length > 100) errors.title = "Le titre ne doit pas dépasser 100 caractères.";

  if (input.description.length < 20) errors.description = "Décrivez votre propriété en au moins 20 caractères.";
  else if (input.description.length > 2000) errors.description = "La description ne doit pas dépasser 2000 caractères.";

  if (!/^\d{5}$/.test(input.postalCode)) errors.postalCode = "Saisissez un code postal à 5 chiffres, par exemple 75017.";

  if (input.location.length < 2) errors.location = "Saisissez la ville ou le quartier du logement.";
  else if (input.location.length > 100) errors.location = "La localisation ne doit pas dépasser 100 caractères.";

  if (!input.price) errors.price = "Indiquez le prix par nuit.";
  else if (!Number.isInteger(price) || price < 1 || price > 10000)
    errors.price = "Le prix doit être un nombre entier entre 1 et 10 000 €.";

  if (!input.cover) errors.cover = "Ajoutez une image de couverture.";
  else if (!isImageUrl(input.cover)) errors.cover = "L'image de couverture doit être une adresse web valide.";

  if (input.pictures.length > MAX_PICTURES) errors.pictures = `Vous pouvez ajouter ${MAX_PICTURES} images maximum.`;
  else if (input.pictures.some((picture) => !isImageUrl(picture)))
    errors.pictures = "Chaque image du logement doit être une adresse web valide.";

  if (input.hostName.length < 2) errors.hostName = "Saisissez le nom de l'hôte.";
  else if (input.hostName.length > 60) errors.hostName = "Le nom de l'hôte ne doit pas dépasser 60 caractères.";

  if (input.hostPicture && !isImageUrl(input.hostPicture))
    errors.hostPicture = "La photo de profil doit être une adresse web valide.";

  if (input.equipments.length === 0) errors.equipments = "Cochez au moins un équipement.";
  else if (input.equipments.some((equipment) => !equipments.has(equipment)))
    errors.equipments = "Un équipement sélectionné n'est pas reconnu.";

  if (input.tags.length > MAX_TAGS) errors.tags = `Vous pouvez choisir ${MAX_TAGS} catégories maximum.`;
  else if (input.tags.some((tag) => tag.length > 30)) errors.tags = "Une catégorie ne doit pas dépasser 30 caractères.";

  return errors;
}

export function readPropertyForm(formData: FormData): PropertyFormInput {
  const text = (name: string) => String(formData.get(name) ?? "").trim();
  const list = (name: string) =>
    [...new Set(formData.getAll(name).map((value) => String(value).trim()).filter(Boolean))];

  return {
    title: text("title"),
    description: text("description"),
    postalCode: text("postalCode"),
    location: text("location"),
    price: text("price"),
    cover: text("cover"),
    pictures: list("pictures"),
    hostName: text("hostName"),
    hostPicture: text("hostPicture"),
    equipments: list("equipments"),
    tags: list("tags"),
  };
}
