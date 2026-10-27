# Site guide

## Home and Explorer

The [home page](https://freetier.wiki/) offers search, quick filters, browsing by category, and comparison guides under **Pick by job**. **Most visited** uses the previous 30 days of available Cloudflare entry-view data. When that data is unavailable, **Common first picks** provides a curated starting point. Recent changed or ended offers appear near the bottom.

[Explorer](https://freetier.wiki/explorer/) searches the full catalog and filters by category, type, and billing risk. Search text, filters, and sort order live in the URL, so shared links and the back button preserve the view. Results are paged 50 at a time. Category pages offer a narrower list for areas such as hosting, databases, or AI.

## Comparisons

[Comparison pages](https://freetier.wiki/compare/) group options for a particular job, such as free Postgres hosting. Each table uses the catalog entries' allowances, card requirements, billing risks, and freshness labels. The topics and entry references live in `content/comparisons.json`.

## Entry pages

Each entry includes a **Free tier facts** panel with plan type, card requirements, billing risk, and limits. It appears below the title on phones and alongside the entry on desktop. Links lead to official pricing and documentation, related comparisons, and alternatives.

The main sections explain what is included, what happens at the limit, gotchas, alternatives, and common questions. **Good fit** and **Not a fit** summaries help readers narrow their options. Sign-up steps and other entries in the category provide next steps.

## Plan types, freshness, and status

| Plan type | Meaning |
| --- | --- |
| Always free | The free allowance renews and does not expire. |
| Credit | A balance that can be spent down. |
| Trial | Free access for a limited time. |
| Time-limited | An offer that changes after a set period from sign-up. |

A checked date means the entry was compared with official sources. Source scans do not advance it automatically. It becomes stale after 180 days. An imported date marks information that has not been re-checked. See the [label guide](https://freetier.wiki/about/) for billing-risk definitions and the catalog's source history.

Entries can be `active`, `changed`, or `ended`. Changed and ended offers carry change notes. Use **Report outdated info** on an entry to open a GitHub issue with its URL pre-filled.

## Changelog and RSS

The [changelog](https://freetier.wiki/changelog/) lists new, changed, ended, and removed entries, newest first, with 100 changes per page. The filters apply to the full history, and filters and page links work without JavaScript. Subscribe to the [RSS feed](https://freetier.wiki/changelog/feed.xml) to follow updates.
