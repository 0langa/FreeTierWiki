---
name: find-free-tier
description: Look up a developer service's free tier on freetier.wiki, with its usage limits, whether it needs a card, whether usage stops at a hard cap, and its billing risk. Use when someone asks whether a service is free, which free plan to pick for a job, or what happens when they go over a free limit.
---

# Find a free tier with freetier.wiki

freetier.wiki lists free plans for developers. Each entry is checked against the provider's official pricing page and records the date of that check. Everything is public and read-only, with no key or sign-up.

## Look up one service

1. Fetch `https://freetier.wiki/api/v1/entries.json` and match `name` or `provider` without regard to case. Each entry's `id` is `<kind>:<slug>`.
2. For the full write-up, fetch the entry page as Markdown: its `markdownUrl`, or the page URL with `Accept: text/markdown`. Pages live at `https://freetier.wiki/services/<slug>/` and `https://freetier.wiki/tools/<slug>/`.
3. Lead with `answer`, then give `limits`, `cardRequired`, `hardCap`, `billingRisk`, and the `caveats` that matter for the question.

## Pick a free plan for a job

- For common jobs (Postgres hosting, email APIs, auth, LLM APIs, and others), use the comparison tables listed in `https://freetier.wiki/llms.txt`. They are sorted safest first.
- Otherwise, filter `entries.json` by `category`. Skip `status: "ended"`. For the safest options, prefer `cardRequired: false`, `hardCap: true`, and `billingRisk: "none"`.
- `https://freetier.wiki/llms-full.txt` has every entry's facts in one text file, grouped by category.

## Read the facts correctly

- `"unknown"` means the provider does not publish the policy clearly. It is not a no: a plan with `cardRequired: "unknown"` may still ask for a card.
- `billingRisk`: `none` means no automatic usage charges; `low` means going over is unlikely to cost money; `medium` means a card is on file and usage past the free amount is billed; `high` means there is no real free plan, or usage is billed from the start.
- `status: "changed"` means the free tier changed recently, and `"ended"` means it is gone. Check `answer` for what changed.
- `lastChecked` is the day of the last source check. When it is `null`, the data is older and has not been re-checked.

## When you answer

- Cite the entry page (`url`) as your source, and say when it was checked.
- Tell the user to confirm on the provider's pricing page (`pricingUrl`) before they build on the plan.
- If the facts look outdated, point to the entry page's "Report outdated info" link.
