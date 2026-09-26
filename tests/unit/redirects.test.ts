import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { kindAndSlug, listContentFiles } from "@/lib/content-files";

const rules = fs
  .readFileSync(path.join(process.cwd(), "public", "_redirects"), "utf8")
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#"))
  .map((line) => line.split(/\s+/));

async function livePaths(): Promise<Set<string>> {
  const files = await listContentFiles();
  return new Set(
    files.map((file) => {
      const { kind, slug } = kindAndSlug(file);
      return `/${kind}/${slug}`;
    }),
  );
}

describe("public/_redirects", () => {
  it("has well-formed 301 rules", () => {
    expect(rules.length).toBeGreaterThan(0);
    for (const rule of rules) {
      expect(rule).toHaveLength(3);
      expect(rule[0]).toMatch(/^\//);
      expect(rule[2]).toBe("301");
    }
  });

  it("never redirects a page that still exists", async () => {
    const live = await livePaths();
    for (const [from] of rules) expect(live.has(from.replace(/\/$/, ""))).toBe(false);
  });

  it("only points at pages that exist", async () => {
    const live = await livePaths();
    for (const [, to] of rules) {
      if (to === "/explorer/") continue;
      expect(live.has(to.replace(/\/$/, ""))).toBe(true);
    }
  });

  it("keeps the resources catch-all last", () => {
    expect(rules.at(-1)).toEqual(["/resources/*", "/explorer/", "301"]);
  });
});
