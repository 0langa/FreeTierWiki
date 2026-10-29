# Catalog API

freetier.wiki publishes its whole catalog as one read-only JSON file. There is no key, no sign-up, and no rate limit beyond Cloudflare's. The file is rebuilt every time the site deploys, so it matches the pages.

| What | URL |
| --- | --- |
| Catalog | [`https://freetier.wiki/api/v1/entries.json`](https://freetier.wiki/api/v1/entries.json) |
| OpenAPI 3.1 description | [`https://freetier.wiki/api/v1/openapi.json`](https://freetier.wiki/api/v1/openapi.json) |
| API catalog ([RFC 9727](https://www.rfc-editor.org/rfc/rfc9727)) | [`https://freetier.wiki/.well-known/api-catalog`](https://freetier.wiki/.well-known/api-catalog) |

```sh
curl -s https://freetier.wiki/api/v1/entries.json | jq '.entries[] | select(.cardRequired == false and .hardCap == true) | .name'
```

## The file

The top level has `version` (1), `generated` (the build day), `count`, `license`, `source`, and `entries`. Entries are sorted by `id`. Filter them on your side; the API has no query parameters.

Each entry has the facts shown on its page:

| Field | Meaning |
| --- | --- |
| `id` | Stable id, for example `services:supabase` |
| `name`, `provider`, `description` | What the product is and who makes it |
| `category`, `categoryName` | Category slug and label, for example `database` and `Database` |
| `url`, `markdownUrl` | The entry page, as HTML and as Markdown |
| `answer` | One sentence: is it free, what you get, and whether it can bill you |
| `status` | `active`, `changed` (the free tier changed recently), or `ended` |
| `planType` | `always-free`, `credit`, `trial`, or `time-limited` |
| `cardRequired`, `hardCap` | `true`, `false`, or `"unknown"` when the provider does not publish it clearly |
| `billingRisk` | `none`, `low`, `medium`, or `high`; see [How we rate](https://freetier.wiki/about/) |
| `resets`, `trialDays`, `monthlyCredit` | Allowance period, trial length, and credit amount, or `null` |
| `limits`, `caveats`, `billingNotes` | The free allowance and its watch-out notes; `**bold**` marks numbers |
| `productionReadiness` | `prototype`, `side-project`, `production-light`, or `production-ready` |
| `lastChecked` | Day the entry was last compared with official sources, or `null` |
| `lastUpdated` | Day the entry data last changed |
| `pricingUrl`, `officialUrl`, `docsUrl`, `sources` | Official pages |

"Unknown" is not "no". An entry with `cardRequired: "unknown"` may still ask for a card.

## Compatibility

Field names in `/api/v1/` stay as they are. New fields can appear at any time, so ignore fields you don't know. A rename or removal would ship as `/api/v2/`, with `/api/v1/` kept for a while.

The files under `/data/` feed the site's own Explorer and search. Their format changes without notice; use the catalog API instead.

## Report data

The [2026 changes report](https://freetier.wiki/reports/free-tier-changes-2026/) ships its rows as files too:

| What | URL |
| --- | --- |
| Events as CSV | [`https://freetier.wiki/api/v1/reports/free-tier-changes-2026.csv`](https://freetier.wiki/api/v1/reports/free-tier-changes-2026.csv) |
| Events and the hard cap table as JSON | [`https://freetier.wiki/api/v1/reports/free-tier-changes-2026.json`](https://freetier.wiki/api/v1/reports/free-tier-changes-2026.json) |

Each event has `date` (`YYYY-MM-DD`, or `YYYY-MM` when the vendor gives only the month), `service`, `provider`, `kind` (`ended` or `changed`), `change`, `source` (the vendor's own page) and `scheduled`. The CSV's `section` column is `2026` or `earlier`.

## Pages as Markdown

Every page is also available as Markdown. Send `Accept: text/markdown`, or add `index.md` to the page URL:

```sh
curl -H "Accept: text/markdown" https://freetier.wiki/services/supabase/
```

## For language models

- [`/llms.txt`](https://freetier.wiki/llms.txt) is an index of the site's comparisons, categories, and lists, linking their Markdown versions.
- [`/llms-full.txt`](https://freetier.wiki/llms-full.txt) has every entry's facts in one text file.
- The [`find-free-tier` agent skill](https://freetier.wiki/.well-known/agent-skills/find-free-tier/SKILL.md) explains how to look up, read, and cite entries.

## License and corrections

The data is MIT-licensed, like the [repository](https://github.com/0langa/FreeTierWiki). Always confirm a plan on the provider's pricing page before you build on it. To report outdated facts, use the "Report outdated info" link on the entry page.
