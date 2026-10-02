# Contributing to freetier.wiki

Thanks for helping keep the free-tier facts honest. The fastest help is a correction backed by an official source.

## Report a wrong or outdated entry

Use **Report outdated info** on the entry's page. It opens a short GitHub issue form with the entry's link filled in. Add a link to the official pricing page that shows the current terms.

## Fix an entry or add a new one

Entries are MDX files under `content/services/` and `content/tools/`. Copy a close, recent entry as a template.

Every change must come from the provider's **official** pricing page or docs, not a blog post or a list site:

1. Read the official pricing page and copy the free limits as written.
2. Set `pricingUrl` to that page and `lastVerified` to today's date (`YYYY-MM-DD`).
3. Set the risk fields:
   - `requiresCard`: true if the free plan needs a card on file.
   - `hasHardCap`: true if the service stops or throttles at the limit instead of billing.
   - `overageRisk`: `none` only with a hard cap or a truly unlimited plan, and no card. `high` if billing starts on its own.
4. For a changed or ended free plan, set `status: changed` or `status: ended` and add a `changes` item `{ date, kind, note }`.
5. For a new entry, add a `changes` item with `kind: new` so it shows in the changelog.
6. Give it real `tags` (for example `database`, `auth`, `email`). Tags feed search.

An entry stays only if developers can use it free: an always-free plan, a product-specific credit, or a trial. Paid-only, closed, off-topic, and duplicate entries are removed with `npm run verify:remove`, which adds a redirect and a changelog record.

## Run the checks

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

`npm test` parses every entry and checks that the risk fields agree with each other.

## Pull requests

Fill in the pull request check list. For content changes, include the source URL and a short quote from it for each entry you changed.
