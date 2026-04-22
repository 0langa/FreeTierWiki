# Adding Content

Add new entries by creating an `.mdx` file under one of these folders:

- `content/services`
- `content/tools`
- `content/resources`
- `content/guides`
- `content/playbooks`
- `content/comparisons`

## Required Frontmatter Fields

Every entry requires these fields:

- `title`
- `description`
- `provider`
- `category`
- `tags` (array)
- `pricingModel` (`free`, `freemium`, `trial`)
- `freeTierDetails` object
- `useCases` (array)
- `difficulty` (`beginner`, `intermediate`, `advanced`)
- `lastUpdated` (ISO date)
- `popularityScore` (number)
- `usefulnessScore` (number)

See `content/services/azure-functions.mdx` as a reference.

## Optional Fields

- `ratingBreakdown`
- `officialUrl`
- `docsUrl`
- `featured`

Additional per-type fields:

- guides: `estimatedTime`, `prerequisites`
- playbooks: `objective`
- comparisons: `comparedProviders`

## Workflow

1. Add MDX file in the correct category folder.
2. Run `npm run search:index` to refresh search records.
3. Run `npm run build:static` to validate type-safe build + export.
4. Open `/explorer` locally and confirm entry appears in filters/search.
