# Contributing to FreeTierWiki

Corrections, new listings, and improvements to the site are welcome.

## Report outdated information

Use **Report outdated info** on the entry, or [open an issue](https://github.com/0langa/FreeTierWiki/issues/new?template=outdated-info.yml). Include the entry URL, the incorrect detail, and a link to the provider's official pricing page or documentation supporting the correction.

## Add or update a listing

Entries are MDX files in `content/services/` and `content/tools/`. Start with a similar existing entry and follow the [content maintenance guide](docs/content-maintenance.md).

- List services or tools developers can use free: an ongoing free plan, credit allowance, or trial. Identify which kind it is. Paid-only, closed, off-topic, and duplicate listings do not qualify for new entries.
- Support limits, card requirements, and billing behavior with official provider sources. Cite the pages in `pricingUrl` and `sourceUrls`.
- Explain the constraints and what happens at the limit. Keep the wording factual, including when you are contributing your own product; disclose that relationship in the PR.
- Set `lastVerified` only after checking the entry against the sources. Update `lastUpdated` when the published information changes; a verification-only refresh should preserve it.
- Add a `changes` item for a new listing or a changed or ended offer. Entries marked `changed` or `ended` require a change note and verification date.
- Write the required `answer`: one sentence of 20 to 45 words that says whether the offer is free, what you get, and whether it can bill you. The build fails without it. See [direct answers](docs/content-maintenance.md#direct-answers) and run `npm run check:answers`.
- Keep the entry body's required sections: what the free plan gives you, when you hit a limit, gotchas, alternatives, and questions people ask.

If a source is unavailable or unclear, record the uncertainty in the PR. Do not infer current terms from missing page text.

## Before opening a PR

Follow the [development checks](docs/development.md#checks) and complete the [PR template](.github/pull_request_template.md), including official source links and supporting excerpts for content changes. The entry-body check is `npm run check:depth`; it validates structure, length, and internal links. Source evidence still needs review.

For a correction, describe the incorrect information and its replacement. For a new listing, explain the free offer and any card or overage conditions. Update `content/comparisons.json` only when the listing fits the comparison's topic.

For changes limited to documentation, check the wording, links, and any commands you change. The full application checks remain part of CI.
