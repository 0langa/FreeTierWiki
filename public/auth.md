# freetier.wiki auth.md

freetier.wiki needs no authentication. There are no accounts, API keys, tokens, OAuth flows, or agent registration, so there is nothing to sign up for and no credentials to send.

## For agents

Any agent or client can read everything with plain `GET` requests:

- Every page, as HTML or as Markdown. Send `Accept: text/markdown`, or add `index.md` to the page URL.
- The catalog API: <https://freetier.wiki/api/v1/entries.json>, described by <https://freetier.wiki/api/v1/openapi.json>.
- The API catalog: <https://freetier.wiki/.well-known/api-catalog>.
- The changelog feed: <https://freetier.wiki/changelog/feed.xml>.

The site is read-only. Don't send an `Authorization` header; it is ignored. Cloudflare's standard abuse protection applies.

More: <https://github.com/0langa/FreeTierWiki/blob/main/docs/api.md>
