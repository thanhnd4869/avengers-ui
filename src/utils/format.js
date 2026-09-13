/**
 * Formats a price range the way the storefront displays it.
 *
 * A game key is sold per platform at different prices, so a product often shows
 * a range rather than a single value.
 */
export function formatPriceRange(min, max, currency = "USD", locale = "en-US") {
  const format = (value) =>
    new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);

  return min === max ? format(min) : `${format(min)} - ${format(max)}`;
}

/**
 * Formats a date using the browser locale.
 */
export function formatDate(value, locale = undefined) {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(date);
}

/**
 * Joins truthy class names into a single string.
 */
export function classNames(...values) {
  return values.filter(Boolean).join(" ");
}
