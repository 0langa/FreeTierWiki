import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

import { readEvidence, writeEvidence } from "../../scripts/verify/lib/evidence.mjs";

const script = fileURLToPath(new URL("../../scripts/verify/fetch-evidence.mjs", import.meta.url));
const temporary: string[] = [];
function workspace() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "freetier-evidence-"));
  temporary.push(dir);
  return dir;
}
afterEach(() => {
  for (const dir of temporary.splice(0)) fs.rmSync(dir, { recursive: true, force: true });
});

describe("numeric locale evidence metadata", () => {
  it("replaces equivalent URL aliases when a current refetch fails, without merging distinct documents", () => {
    const dir = workspace();
    const old = { url: 'https://example.com/pricing', status: 200, fetchedAt: '2026-10-20T00:00:00Z', via: 'fetch', text: 'Free 5 GB', numericLocale: 'de-DE' as const };
    writeEvidence('services/example', [old], dir);
    const failed = { url: 'https://www.example.com/pricing/', status: 403, fetchedAt: '2026-10-21T00:00:00Z', via: 'fetch', text: '' };
    writeEvidence('services/example', [failed], dir);
    expect(readEvidence('services/example', dir)).toEqual([{...failed, numericLocale: 'de-DE'}]);
    writeEvidence('services/example', [{...old, url: 'https://example.com/pricing?topic=other'}], dir);
    expect(readEvidence('services/example', dir)).toHaveLength(2);
  });

  it("deduplicates older caches by normalized identity and actual fetch time", () => {
    const dir = workspace();
    const failed = { url: 'https://www.example.com/pricing/', status: 403, fetchedAt: '2026-10-21T00:00:00Z', via: 'fetch', text: '' };
    const old = { url: 'https://example.com/pricing', status: 200, fetchedAt: '2026-10-20T00:00:00Z', via: 'fetch', text: 'Free 5 GB', numericLocale: 'de-DE' as const };
    fs.writeFileSync(path.join(dir, 'services__example.json'), JSON.stringify({pages:[failed, old]}));
    expect(readEvidence('services/example', dir)).toEqual([{...failed, numericLocale:'de-DE'}]);
  });
  it("invalidates an older usable page when a refetch reaches an HTTP 200 maintenance screen", () => {
    const dir = workspace();
    const evidenceDir = path.join(dir, "development/verify/deepen/evidence");
    const url = "https://example.com/pricing";
    writeEvidence("services/example", [{ url, status: 200, fetchedAt: "2026-10-18T00:00:00Z", via: "fetch", text: "Free 5 GB" }], evidenceDir);
    const runner = path.join(dir, "run.mjs");
    const html = "<title>Security maintenance</title><h1>Our apps are offline today.</h1><p>" + "Free pricing plan is temporarily unavailable. ".repeat(30) + "</p>";
    fs.writeFileSync(runner, `globalThis.fetch = async () => new Response(${JSON.stringify(html)}, { status: 200 }); await import(${JSON.stringify(pathToFileURL(script).href)});`);
    const result = spawnSync(process.execPath, [runner, "--add", "services/example", "--url", url], { cwd: dir, encoding: "utf8" });
    expect(result.status).toBe(1);
    expect(readEvidence("services/example", evidenceDir)?.[0].accessIssue).toBe("maintenance");
    expect(readEvidence("services/example", evidenceDir)?.[0].text).not.toBe("Free 5 GB");
  });
  it("uses tracked source typography on a fresh checkout, with explicit hints taking precedence", () => {
    const dir = workspace();
    const url = "https://open-meteo.com/en/pricing";
    const page = { url, status: 200, fetchedAt: "2026-10-21T00:00:00Z", via: "fetch", text: "5.000 calls" };
    writeEvidence("services/open-meteo", [page], dir);
    expect(readEvidence("services/open-meteo", dir)?.[0].numericLocale).toBe("de-DE");
    writeEvidence("services/open-meteo", [{ ...page, numericLocale: "en-US" }], dir);
    writeEvidence("services/open-meteo", [page], dir);
    expect(readEvidence("services/open-meteo", dir)?.[0].numericLocale).toBe("en-US");
    writeEvidence("services/other", [{ ...page, url: `${url}?other=1` }], dir);
    expect(readEvidence("services/other", dir)?.[0].numericLocale).toBeUndefined();
  });

  it("applies tracked typography to an older evidence file without changing its fetch date", () => {
    const dir = workspace();
    const page = { url: "https://open-meteo.com/en/pricing", status: 200, fetchedAt: "2026-10-20T00:00:00Z", via: "fetch", text: "5.000 calls" };
    fs.writeFileSync(path.join(dir, "services__open-meteo.json"), JSON.stringify({ pages: [page] }));
    expect(readEvidence("services/open-meteo", dir)).toEqual([{ ...page, numericLocale: "de-DE" }]);
  });

  it("tracks Doczilla's mixed typography without rewriting the observed source", () => {
    const dir=workspace();
    const page={url:'https://doczilla.app/pricing',status:200,fetchedAt:'2026-10-21T00:00:00Z',via:'fetch',text:'€4,99/mo; 2,000 requests; €0.00372'};
    writeEvidence('services/doczilla',[page],dir);
    expect(readEvidence('services/doczilla',dir)).toEqual([{...page,numericLocale:'mixed'}]);
  });
  it("preserves an explicit URL hint while replacing fetched content and metadata", () => {
    const dir = workspace();
    const page = { url: "https://example.com/pricing", status: 200, fetchedAt: "2026-10-20T00:00:00Z", via: "manual", text: "5.000 calls", numericLocale: "de-DE" as const };
    writeEvidence("services/example", [page], dir);
    writeEvidence("services/example", [{ url: page.url, status: 200, fetchedAt: "2026-10-21T00:00:00Z", via: "fetch", text: "10.000 calls" }], dir);
    expect(readEvidence("services/example", dir)).toEqual([{ url: page.url, status: 200, fetchedAt: "2026-10-21T00:00:00Z", via: "fetch", text: "10.000 calls", numericLocale: "de-DE" }]);
  });

  it("does not copy another URL's locale and permits an explicit replacement", () => {
    const dir = workspace();
    const page = { url: "https://example.com/pricing", status: 200, fetchedAt: "2026-10-21T00:00:00Z", via: "fetch", text: "1.234", numericLocale: "de-DE" as const };
    writeEvidence("services/example", [page], dir);
    writeEvidence("services/example", [{ ...page, numericLocale: "en-US" }, { url: "https://example.com/limits", status: 200, fetchedAt: page.fetchedAt, via: "fetch", text: "1.234" }], dir);
    expect(readEvidence("services/example", dir)?.map((p) => [p.url, p.numericLocale])).toEqual([[page.url, "en-US"], ["https://example.com/limits", undefined]]);
  });

  it("stores the CLI locale with manually obtained evidence", () => {
    const dir = workspace();
    const input = path.join(dir, "source.txt");
    fs.writeFileSync(input, "5.000 calls");
    const result = spawnSync(process.execPath, [script, "--add", "services/example", "--url", "https://example.com/pricing", "--file", input, "--numeric-locale", "de-DE"], { cwd: dir, encoding: "utf8" });
    expect(result.status, result.stderr).toBe(0);
    expect(readEvidence("services/example", path.join(dir, "development/verify/deepen/evidence"))?.[0].numericLocale).toBe("de-DE");
  });

  it.each(["not-a-locale", ""])("rejects an invalid or missing CLI locale before storing (%s)", (locale) => {
    const dir = workspace();
    const input = path.join(dir, "source.txt");
    fs.writeFileSync(input, "5.000 calls");
    const args = [script, "--add", "services/example", "--url", "https://example.com/pricing", "--file", input, "--numeric-locale", ...(locale ? [locale] : [])];
    const result = spawnSync(process.execPath, args, { cwd: dir, encoding: "utf8" });
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain("numeric locale");
    expect(fs.existsSync(path.join(dir, "development"))).toBe(false);
  });
});
