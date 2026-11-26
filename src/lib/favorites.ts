/**
 * Store des logements favoris, persisté dans le localStorage et compatible avec `useSyncExternalStore`.
 * @module lib/favorites
 */
/** Clé du localStorage où sont enregistrés les identifiants des favoris. */
export const FAVORITES_KEY = "kasa:favorites";

/** Fonction appelée à chaque modification des favoris. */
type Listener = () => void;

const listeners = new Set<Listener>();
let cachedRaw: string | null | undefined;
let cachedIds: string[] = [];
let storageAvailable = true;

/**
 * Lit la valeur brute du localStorage et en extrait une liste d'identifiants sans doublon.
 *
 * @param raw Valeur JSON enregistrée, ou `null`.
 * @returns Les identifiants valides, ou une liste vide si la valeur est absente ou corrompue.
 */
export function parseFavorites(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    return [...new Set(value.filter((id): id is string => typeof id === "string"))];
  } catch {
    return [];
  }
}

/**
 * Lit la valeur brute des favoris et marque le stockage comme indisponible en cas d'erreur.
 *
 * @returns La valeur enregistrée, ou `null`.
 */
function readRaw(): string | null {
  try {
    return window.localStorage.getItem(FAVORITES_KEY);
  } catch {
    storageAvailable = false;
    return null;
  }
}

/**
 * Renvoie les identifiants des favoris.
 *
 * La même référence de tableau est renvoyée tant que le contenu ne change pas, comme l'exige `useSyncExternalStore`.
 *
 * @returns Les identifiants des logements favoris.
 */
export function getFavorites(): string[] {
  if (!storageAvailable) return cachedIds;
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedIds = parseFavorites(raw);
  }
  return cachedIds;
}

/**
 * Instantané utilisé pendant le rendu serveur, où le localStorage n'existe pas.
 *
 * @returns `null`, pour indiquer que les favoris ne sont pas encore chargés.
 */
export function getServerFavorites(): string[] | null {
  return null;
}

/**
 * Enregistre les favoris et prévient tous les abonnés.
 *
 * @param ids Nouvelle liste d'identifiants.
 */
function save(ids: string[]) {
  cachedIds = ids;
  try {
    const raw = JSON.stringify(ids);
    window.localStorage.setItem(FAVORITES_KEY, raw);
    cachedRaw = raw;
  } catch {
    storageAvailable = false;
  }
  listeners.forEach((listener) => listener());
}

/**
 * Indique si un logement fait partie des favoris.
 *
 * @param id Identifiant du logement.
 * @returns `true` si le logement est en favori.
 */
export function isFavorite(id: string) {
  return getFavorites().includes(id);
}

/**
 * Ajoute le logement aux favoris, ou l'en retire s'il y est déjà.
 *
 * @param id Identifiant du logement.
 */
export function toggleFavorite(id: string) {
  const ids = getFavorites();
  save(ids.includes(id) ? ids.filter((favorite) => favorite !== id) : [...ids, id]);
}

/**
 * Abonne une fonction aux modifications des favoris, y compris celles faites dans un autre onglet.
 *
 * @param listener Fonction appelée à chaque modification.
 * @returns Une fonction qui annule l'abonnement.
 */
export function subscribeFavorites(listener: Listener) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === FAVORITES_KEY || e.key === null) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}
