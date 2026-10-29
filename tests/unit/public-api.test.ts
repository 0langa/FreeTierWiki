import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { GET as entriesRoute } from "@/app/api/v1/entries.json/route";
import { GET as openapiRoute } from "@/app/api/v1/openapi.json/route";
import { absoluteUrl } from "@/lib/links";
import { API_DOCS_URL, ENTRIES_PATH, OPENAPI, OPENAPI_PATH, publicCatalog, toPublicEntry, type PublicCatalog } from "@/lib/public-api";

import { makeEntry } from "../support/fixtures";

// A Windows checkout may have CRLF line endings; Pages builds on Linux.
const publicFile = (name: string) => fs.readFileSync(path.join(process.cwd(), "public", name), "utf8").replace(/\r\n/g, "\n");
const entrySchema = OPENAPI.components.schemas.Entry;

describe("public catalog API", () => {
  it("documents every field it ships, and ships every field it documents", () => {
    const row = toPublicEntry(makeEntry());
    expect(Object.keys(row).sort()).toEqual([...entrySchema.required].sort());
    expect(Object.keys(entrySchema.properties).sort()).toEqual([...entrySchema.required].sort());
  });

  it("links each entry to its page and its Markdown version", () => {
    const row = toPublicEntry(makeEntry({ url: "/services/neon/" }));
    expect(row.url).toBe("https://freetier.wiki/services/neon/");
    expect(row.markdownUrl).toBe("https://freetier.wiki/services/neon/index.md");
  });

  it("sorts entries by id and counts them", () => {
    const catalog = publicCatalog([makeEntry({ id: "tools:b" }), makeEntry({ id: "services:a" })], "2026-10-29");
    expect(catalog.entries.map((entry) => entry.id)).toEqual(["services:a", "tools:b"]);
    expect(catalog).toMatchObject({ version: 1, generated: "2026-10-29", count: 2, license: "MIT" });
  });

  it("exports the real catalog with values the schema allows", async () => {
    const catalog = (await (await entriesRoute()).json()) as PublicCatalog;
    expect(catalog.count).toBe(catalog.entries.length);
    expect(catalog.count).toBeGreaterThan(900);
    for (const [field, schema] of Object.entries(entrySchema.properties) as [string, { enum?: string[] }][]) {
      if (!schema.enum) continue;
      for (const entry of catalog.entries) expect(schema.enum, `${entry.id} ${field}`).toContain(entry[field as keyof typeof entry]);
    }
  }, 60_000);

  it("serves the OpenAPI document that describes the entries path", async () => {
    const spec = await (await openapiRoute()).json();
    expect(spec.openapi).toBe("3.1.0");
    expect(Object.keys(spec.paths)).toEqual([ENTRIES_PATH]);
  });
});

describe("API discovery", () => {
  it("lists the API in the RFC 9727 catalog", () => {
    const catalog = JSON.parse(publicFile(".well-known/api-catalog"));
    expect(catalog.linkset).toEqual([
      {
        anchor: absoluteUrl(ENTRIES_PATH),
        "service-desc": [{ href: absoluteUrl(OPENAPI_PATH), type: "application/json" }],
        "service-doc": [{ href: API_DOCS_URL, type: "text/html" }],
      },
    ]);
  });

  it("serves the catalog as a Linkset and links it from the home page", () => {
    const headers = publicFile("_headers");
    expect(headers).toContain('/.well-known/api-catalog\n  Content-Type: application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"\n');
    const home = headers.split(/\n\n/).find((block) => block.includes("\n/\n"))!;
    expect(home).toContain('</.well-known/api-catalog>; rel="api-catalog"');
    expect(home).toContain(`<${OPENAPI_PATH}>; rel="service-desc"`);
    expect(home).toContain(`<${API_DOCS_URL}>; rel="service-doc"`);
  });

  it("points the API guide at a file that exists", () => {
    expect(fs.existsSync(path.join(process.cwd(), API_DOCS_URL.split("/blob/main/")[1]))).toBe(true);
  });
});
