import fs from "node:fs";
import vm from "node:vm";
import { expect, it } from "vitest";

const html = fs.readFileSync(new URL("../../deployment/github-pages/index.html", import.meta.url), "utf8");
const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];

it.each([
  ["/FreeTierWiki/", "", "", "https://freetier.wiki/"],
  ["/FreeTierWiki/services/neon/", "?ref=old-link", "#limits", "https://freetier.wiki/services/neon/?ref=old-link#limits"],
  ["/FreeTierWiki//evil.example/", "?next=https://evil.example", "", "https://freetier.wiki/evil.example/?next=https://evil.example"],
  ["/FreeTierWiki/\\evil.example/", "", "", "https://freetier.wiki/evil.example/"],
  ["/unrelated/path", "", "", "https://freetier.wiki/"],
])("redirects legacy path %s to the fixed canonical site", (pathname, search, hash, expected) => {
  let destination;
  const link = { href: "", textContent: "" };
  const canonical = { href: "" };
  expect(script).toBeDefined();
  vm.runInNewContext(script!, {
    URL,
    window: { location: { pathname, search, hash, replace: (url: string) => { destination = url; } } },
    document: { getElementById: () => link, querySelector: () => canonical },
  });
  expect(destination).toBe(expected);
  expect(link.href).toBe(expected);
  expect(new URL(canonical.href).origin).toBe("https://freetier.wiki");
});
