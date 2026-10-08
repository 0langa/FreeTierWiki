import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { parsePopular, readPopular } from "@/lib/popular-file";
import { mostVisited } from "@/lib/popular-view";
import { dayWindows, rankEntryPaths, rowsFromResponse } from "../../scripts/popular/lib/rank.mjs";
import { makeItem } from "../support/fixtures";

describe("rankEntryPaths", () => {
  it("keeps entry pages only, merges slash variants, and sorts by count", () => {
    const paths = rankEntryPaths([
      { path: "/", count: 900 },
      { path: "/explorer/", count: 300 },
      { path: "/services/neon/", count: 40 },
      { path: "/services/neon", count: 30 },
      { path: "/tools/figma/", count: 50 },
      { path: "/services/Clerk/", count: 50 },
      { path: "/services/x/favicon.ico", count: 99 },
      { path: "/services/zero/", count: 0 },
    ]);
    // neon merges to 70, clerk and figma tie at 50 and fall back to path order
    expect(paths).toEqual(["/services/neon/", "/services/clerk/", "/tools/figma/"]);
  });

  it("drops paths that have no content file and applies the limit", () => {
    const rows = [
      { path: "/services/a/", count: 3 },
      { path: "/services/gone/", count: 9 },
      { path: "/services/b/", count: 2 },
    ];
    expect(rankEntryPaths(rows, { limit: 1, exists: (_kind, slug) => slug !== "gone" })).toEqual(["/services/a/"]);
  });
});

describe("dayWindows", () => {
  it("gives full UTC days ending yesterday, newest first", () => {
    const windows = dayWindows(new Date("2026-10-13T09:30:00Z"), 2);
    expect(windows).toEqual([
      { since: "2026-10-12T00:00:00.000Z", until: "2026-10-13T00:00:00.000Z" },
      { since: "2026-10-11T00:00:00.000Z", until: "2026-10-12T00:00:00.000Z" },
    ]);
  });
});

describe("rowsFromResponse", () => {
  it("flattens the groups and surfaces API errors", () => {
    const body = { data: { viewer: { zones: [{ httpRequestsAdaptiveGroups: [{ count: 5, dimensions: { clientRequestPath: "/services/neon/" } }] }] } } };
    expect(rowsFromResponse(body)).toEqual([{ path: "/services/neon/", count: 5 }]);
    expect(rowsFromResponse({ data: { viewer: { zones: [] } } })).toEqual([]);
    expect(() => rowsFromResponse({ errors: [{ message: "nope" }] })).toThrow("nope");
  });
});

describe("parsePopular", () => {
  const good = { updated: "2026-10-13", days: 30, paths: ["/services/neon/", "/tools/figma/"] };

  it("accepts a valid file", () => {
    expect(parsePopular(good)).toEqual(good);
  });

  it.each([
    ["bad date", { ...good, updated: "yesterday" }, /updated/],
    ["bad days", { ...good, days: 0 }, /days/],
    ["bad path", { ...good, paths: ["/explorer/"] }, /paths\[0\]/],
    ["duplicate", { ...good, paths: ["/services/neon/", "/services/neon/"] }, /duplicate/],
  ])("rejects %s", (_name, input, message) => {
    expect(() => parsePopular(input)).toThrow(message);
  });
});

describe("readPopular", () => {
  it("returns undefined when the job has never run", async () => {
    expect(await readPopular(path.join(os.tmpdir(), "no-such-popular.json"))).toBeUndefined();
  });

  it("reads a written file", async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "popular-"));
    const file = path.join(dir, "popular.json");
    fs.writeFileSync(file, JSON.stringify({ updated: "2026-10-13", days: 7, paths: ["/services/neon/"] }));
    expect(await readPopular(file)).toEqual({ updated: "2026-10-13", days: 7, paths: ["/services/neon/"] });
  });
});

describe("mostVisited", () => {
  it("keeps visit order, skips ended and unknown entries, and stops at the limit", () => {
    const items = [
      makeItem({ id: "services:a", url: "/services/a/", title: "A" }),
      makeItem({ id: "services:b", url: "/services/b/", title: "B", status: "ended" }),
      makeItem({ id: "services:c", url: "/services/c/", title: "C" }),
      makeItem({ id: "services:d", url: "/services/d/", title: "D" }),
    ];
    const picked = mostVisited(["/services/b/", "/services/c/", "/services/nope/", "/services/a/", "/services/d/"], items, 2);
    expect(picked.map((item) => item.title)).toEqual(["C", "A"]);
  });
});
