const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

/** 100 → "100 €" */
export function formatPrice(value: number) {
  return priceFormatter.format(value);
}
