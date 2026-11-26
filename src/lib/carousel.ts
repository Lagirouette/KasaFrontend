/**
 * Calculs d'index du carrousel d'images.
 * @module lib/carousel
 */
/**
 * Ramène un index dans l'intervalle `[0, count[` en bouclant dans les deux sens.
 *
 * @param index Index à normaliser, éventuellement négatif ou supérieur au nombre d'éléments.
 * @param count Nombre d'éléments.
 * @returns L'index normalisé, ou `0` si la liste est vide.
 * @example
 * wrapIndex(-1, 5); // 4
 */
export function wrapIndex(index: number, count: number) {
  if (count <= 0) return 0;
  return ((index % count) + count) % count;
}

/**
 * Renvoie les index des miniatures à afficher après l'image courante.
 *
 * @param count Nombre total d'images.
 * @param current Index de l'image affichée.
 * @param max Nombre maximal de miniatures, 4 par défaut.
 * @returns Les index des images suivantes, dans l'ordre, sans l'image courante.
 */
export function getThumbnailIndexes(count: number, current: number, max = 4) {
  const visible = Math.min(max, Math.max(count - 1, 0));
  return Array.from({ length: visible }, (_, k) => wrapIndex(current + k + 1, count));
}
