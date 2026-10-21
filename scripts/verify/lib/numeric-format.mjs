// @ts-check
// Explicit source typography, not page language. Catalog prose uses en-US notation.
/** @typedef {"en-US" | "de-DE" | "mixed"} NumericLocale */

// Explicitly reviewed typography for this exact source, including fresh checkouts with no evidence cache.
// Other Open-Meteo pages and query variants do not inherit the hint. Explicit/stored evidence wins.
/** @type {Readonly<Record<string, NumericLocale>>} */
export const SOURCE_NUMERIC_LOCALES = Object.freeze({
  "https://open-meteo.com/en/pricing": "de-DE",
  "https://open-meteo.com/en/terms": "de-DE",
  "https://doczilla.app/pricing": "mixed",
});

/** @param {unknown} value @returns {NumericLocale | undefined} */
export function parseNumericLocale(value) {
  if (value === undefined || value === "en-US" || value === "de-DE" || value === "mixed") return value;
  throw new Error(`Unsupported numeric locale ${JSON.stringify(value)}; use en-US, de-DE or mixed`);
}

/**
 * Parse exactly one magnitude. Never supply alternative values for an ambiguous separator.
 * de-DE permits unambiguous dot decimals too: Open-Meteo mixes 5.000 limits with 1.5 call costs.
 * Invalid grouping stays unresolved rather than being stripped or split into supporting numbers.
 * @param {string} token
 * @param {NumericLocale} locale
 * @returns {number | undefined}
 */
export function numericValue(token, locale) {
  const scientific = token.match(/^(.+)e([+-]?\d+)$/i);
  if (scientific) {
    const base = numericValue(scientific[1], locale);
    return base === undefined ? undefined : base * 10 ** Number(scientific[2]);
  }
  const digits = token.replace(/[\u00a0\u202f]/g, " ");
  if (/^\d+$/.test(digits)) return Number(digits);

  if (digits.includes(" ")) {
    if (!/^[1-9]\d{0,2}(?: \d{3})+(?:[.,]\d+)?$/.test(digits)) return undefined;
    return Number(digits.replace(/ /g, "").replace(",", "."));
  }

  if (digits.includes(",") && digits.includes(".")) {
    const decimal = digits.lastIndexOf(",") > digits.lastIndexOf(".") ? "," : ".";
    const grouped = decimal === "," ? /^[1-9]\d{0,2}(?:\.\d{3})+,\d+$/ : /^[1-9]\d{0,2}(?:,\d{3})+\.\d+$/;
    if (!grouped.test(digits)) return undefined;
    return Number(decimal === "," ? digits.replace(/\./g, "").replace(",", ".") : digits.replace(/,/g, ""));
  }

  const separator = digits.includes(",") ? "," : ".";
  const count = digits.split(separator).length - 1;
  const grouped = separator === "," ? /^[1-9]\d{0,2}(?:,\d{3})+$/ : /^[1-9]\d{0,2}(?:\.\d{3})+$/;
  if (count > 1) return grouped.test(digits) ? Number(digits.split(separator).join("")) : undefined;
  if (separator === ",") {
    if (locale === "de-DE") return Number(digits.replace(",", "."));
    if (grouped.test(digits)) return Number(digits.replace(",", ""));
    // Explicit mixed pages use comma-grouped thousands, short comma decimals and dot decimals.
    // A three-digit comma group still has exactly one interpretation, never both magnitudes.
    return locale === "mixed" ? Number(digits.replace(",", ".")) : undefined;
  }
  return locale === "de-DE" && grouped.test(digits) ? Number(digits.replace(".", "")) : Number(digits);
}
