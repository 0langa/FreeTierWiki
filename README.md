# FreeTierWiki

**Choose free tiers with real constraints, not wishful thinking.**

[freetier.wiki](https://freetier.wiki) lists free plans for developers — services, tools, and learning resources — and shows what each one actually gives you: the limits, whether it needs a card, the billing risk, and how fresh that information is.

---

## How to use the site

### Home

The home page gives a quick overview: content coverage by category, low-risk picks (no card, no overage risk), and a link into the explorer.

### Explorer

Open **Explorer** to filter and search every entry. Every filter — search text, category, type, risk, and sort — lives in the URL, so a link or the back button always returns the same view. Results are paged 50 at a time.

### Category pages

Each category (Hosting, Database, AI, and so on) has its own page listing just its entries.

### Detail pages

Each entry has a detail page with a "Free tier facts" label: the plan type, whether a card is required, the billing risk, and the limits, styled like a nutrition label. Below it: when to use it, when not to, a quickstart, and links to the official site and pricing page.

Every detail page also has a **freshness label**:
- A green date with a check mark means someone compared the entry with the official pricing page on that date.
- A gray date means the entry has not been re-checked since it was first written; it may be out of date.
- `Changed` or `Ended` pills mark offers that stopped being what they used to be.

If you spot something wrong, use **Report outdated info** on the entry — it opens a short GitHub issue form with the entry's link pre-filled.

### Changelog

The `/changelog/` page lists every entry that changed or ended, newest first.

---

## Ratings & labels

See [`/about/`](https://freetier.wiki/about/) for the full explanation. Summary:

**Billing risk**
| Level | Meaning |
|---|---|
| **None** | The plan is unlimited, or going over the limit stops or throttles the service. You should not get a bill by accident. |
| **Low** | Going over is unlikely to cost money, but read the watch-out notes. |
| **Medium** | A card is on file and usage above the free amount is billed. Set a spending limit. |
| **High** | No real free plan, or usage is billed from the start. |

**Plan types**
- **Always free** — the free amount renews and does not expire.
- **Credit** — a money amount you spend down.
- **Trial** — free for a limited time.
- **Time-limited** — free for a set period after sign-up, then it changes.

**Freshness labels**
- Checked (date with a check mark) — compared against the official pricing page on that date; turns stale after 180 days.
- Imported (gray date) — the entry's data is from that date and has not been re-checked since.

**Status**
- `active` — the free tier is as described.
- `changed` — the free tier changed; see the entry's changelog notes.
- `ended` — the free tier no longer exists.

---

## Tech stack

- Next.js 16 (App Router), static export (`output: "export"`)
- TypeScript, strict mode
- Tailwind CSS 3.4
- Base UI `Dialog` (search)
- FlexSearch, loaded lazily only when someone searches
- Frontmatter + MDX content pipeline
- Vitest (unit tests) and Playwright (end-to-end tests)

---

## Local development

```bash
npm ci
npm run dev
```

Before pushing, run the same checks CI runs:

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm run check:budget
npx playwright install chromium
npm run test:e2e
```

On a low-memory machine, the default build can run out of memory. Limit build workers instead:

```bash
NEXT_BUILD_CPUS=2 npm run build
```

---

## Content

Entries live under `content/services/`, `content/tools/`, and `content/resources/` as MDX files with frontmatter. Key fields:

- `lastVerified` — ISO date (`2026-09-25`) someone last checked the entry against the official pricing page. Drives the freshness label; stale after 180 days (`STALE_AFTER_DAYS`).
- `status` — `active`, `changed`, or `ended`.
- `pricingUrl` — link to the provider's current pricing page.
- `changes` — a list of `{ date, kind, note }` entries, where `kind` is `ended`, `changed`, or `new`. Feeds the changelog.

**Rule:** an entry with `status: changed` or `status: ended` must have at least one `changes` item and a `lastVerified` date. This is enforced by the content parser and covered by unit tests (`npm test`).

---

## Deploy

Cloudflare Pages builds the `main` branch with `npm run build`, serving the `out/` directory, using the Node version pinned in `.nvmrc`. `public/_redirects` holds the 301 redirects for URLs removed or moved during the redesign.

GitHub Actions (`.github/workflows/ci.yml`) runs lint, typecheck, unit tests, the build, the size budget check, and end-to-end tests on every push to `main` and every pull request. It only checks — it does not deploy.

---

## License

MIT — see the GitHub repository for details.

---

*FreeTierWiki is a living catalog. Entries are updated as providers change their free-tier terms. Always verify current pricing and limits on the provider's official website before making architectural decisions.*
