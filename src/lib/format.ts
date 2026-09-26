const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function utcDate(isoDate: string): Date {
  return new Date(`${isoDate.slice(0, 10)}T00:00:00Z`);
}

/** "2024-06-09" → "Jun 2024". Uses UTC so the label never shifts a day. */
export function formatMonth(isoDate: string): string {
  const date = utcDate(isoDate);
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

/** "2026-09-25" → "25 Sep 2026". */
export function formatDay(isoDate: string): string {
  const date = utcDate(isoDate);
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export type TextSegment = { text: string; strong: boolean };

const NUMBER_WITH_UNIT = /(?<![\w$])(\$?\d+(?:[.,]\d+)*(?:\s?(?:GB|MB|TB|KB|ms|K|M)\b)?)/g;

/** Splits text so numbers (with an optional unit) can be shown in bold. */
export function emphasizeNumbers(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  let last = 0;
  for (const match of text.matchAll(NUMBER_WITH_UNIT)) {
    const start = match.index ?? 0;
    if (start > last) segments.push({ text: text.slice(last, start), strong: false });
    segments.push({ text: match[0], strong: true });
    last = start + match[0].length;
  }
  if (last < text.length) segments.push({ text: text.slice(last), strong: false });
  return segments;
}

/** "https://www.supabase.com/pricing/" → "supabase.com/pricing". */
export function shortUrl(url: string): string {
  try {
    const parsed = new URL(url);
    return `${parsed.hostname.replace(/^www\./, "")}${parsed.pathname}`.replace(/\/$/, "");
  } catch {
    return url;
  }
}
