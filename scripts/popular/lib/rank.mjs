// @ts-check
// Pure helpers for the weekly "most visited" job. No network, no file writes: easy to test.

/** An entry page path: `/services/slug/` or `/tools/slug/`. Anything else (home, explorer, assets) is dropped. */
const ENTRY_PATH = /^\/(services|tools)\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/;

/**
 * Turns raw per-path counts into an ordered list of entry paths, most visited first.
 * Paths are normalised to a trailing slash and merged, so `/services/neon` and `/services/neon/` count as one.
 * @param {Array<{ path: string, count: number }>} rows
 * @param {{ limit?: number, exists?: (kind: string, slug: string) => boolean }} [options]
 * @returns {string[]}
 */
export function rankEntryPaths(rows, options = {}) {
  const { limit = 24, exists = () => true } = options;
  /** @type {Map<string, number>} */
  const totals = new Map();
  for (const row of rows) {
    const match = ENTRY_PATH.exec(row.path.trim().toLowerCase());
    if (!match || !Number.isFinite(row.count) || row.count <= 0) continue;
    const [, kind, slug] = match;
    if (!exists(kind, slug)) continue;
    const key = `/${kind}/${slug}/`;
    totals.set(key, (totals.get(key) ?? 0) + row.count);
  }
  return [...totals.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([key]) => key);
}

/**
 * The UTC day windows to query, newest first: `days` full days ending yesterday.
 * @param {Date} now
 * @param {number} days
 * @returns {Array<{ since: string, until: string }>}
 */
export function dayWindows(now, days) {
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const out = [];
  for (let i = 1; i <= days; i++) {
    const until = new Date(end.getTime() - (i - 1) * 86_400_000);
    const since = new Date(until.getTime() - 86_400_000);
    out.push({ since: since.toISOString(), until: until.toISOString() });
  }
  return out;
}

/**
 * The GraphQL query for one Web Analytics site and one time window: page loads from real browsers, grouped by path.
 * `rumPageloadEventsAdaptiveGroups` is the dataset behind the dashboard's Web Analytics page. Its beacon only runs
 * in real browsers and `bot: 0` is the dashboard's "Exclude bots" switch, so plain scrapers never count here.
 */
export const VIEWS_QUERY = `
query ($account: string!, $site: string!, $since: Time!, $until: Time!) {
  viewer {
    accounts(filter: { accountTag: $account }) {
      rumPageloadEventsAdaptiveGroups(
        limit: 5000
        filter: {
          datetime_geq: $since
          datetime_lt: $until
          siteTag: $site
          bot: 0
        }
      ) {
        count
        dimensions {
          requestPath
        }
      }
    }
  }
}`;

/**
 * Flattens one GraphQL response into `{ path, count }` rows.
 * @param {unknown} body
 * @returns {Array<{ path: string, count: number }>}
 */
export function rowsFromResponse(body) {
  const data = /** @type {{ errors?: Array<{ message: string }>, data?: { viewer?: { accounts?: Array<{ rumPageloadEventsAdaptiveGroups?: Array<{ count: number, dimensions: { requestPath: string } }> }> } } }} */ (body);
  if (data?.errors?.length) throw new Error(data.errors.map((error) => error.message).join("; "));
  const groups = data?.data?.viewer?.accounts?.[0]?.rumPageloadEventsAdaptiveGroups ?? [];
  return groups.map((group) => ({ path: group.dimensions.requestPath, count: group.count }));
}
