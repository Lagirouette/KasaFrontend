/**
 * Fonctions de formatage pour l'affichage.
 * @module lib/format
 */
const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

/**
 * Formate un montant en euros, sans décimales, au format français.
 *
 * @param value Montant en euros.
 * @returns Le montant formaté, par exemple `120 €`.
 */
export function formatPrice(value: number) {
  return priceFormatter.format(value);
}
