export const FAVORITES_KEY = "kasa:favorites";

type Listener = () => void;

const listeners = new Set<Listener>();
let cachedRaw: string | null | undefined;
let cachedIds: string[] = [];
let storageAvailable = true;

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

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(FAVORITES_KEY);
  } catch {
    storageAvailable = false;
    return null;
  }
}

export function getFavorites(): string[] {
  if (!storageAvailable) return cachedIds;
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedIds = parseFavorites(raw);
  }
  return cachedIds;
}

export function getServerFavorites(): string[] | null {
  return null;
}

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

export function isFavorite(id: string) {
  return getFavorites().includes(id);
}

export function toggleFavorite(id: string) {
  const ids = getFavorites();
  save(ids.includes(id) ? ids.filter((favorite) => favorite !== id) : [...ids, id]);
}

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
