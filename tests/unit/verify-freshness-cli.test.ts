import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { expect, it } from "vitest";

import { sourceSnapshot } from "../../scripts/verify/lib/source-snapshot.mjs";
import { summarizeSources } from "../../scripts/verify/lib/scan-sources.mjs";

it("writes an actionable queue and workflow flag for a blocked source without any changed or dead page", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "freetier-freshness-"));
  const root = fileURLToPath(new URL("../../", import.meta.url));
  const hashes = path.join(dir, "hashes.json");
  const report = path.join(dir, "report.md");
  const queue = path.join(dir, "queue.json");
  const output = path.join(dir, "output.txt");
  const runner = path.join(dir, "run.mjs");
  const script = pathToFileURL(path.join(root, "scripts/verify/check-freshness.mjs")).href;
  fs.writeFileSync(runner, `
    globalThis.fetch = async (url) => {
      if (String(url).endsWith("/en/docs")) throw new DOMException("Request timed out", "TimeoutError");
      return new Response("", { status: 403 });
    };
    await import(${JSON.stringify(script)});
  `);
  try {
    const result = spawnSync(process.execPath, [runner, "--ids", "services/open-meteo", "--hashes", hashes, "--report", report, "--review-json", queue], {
      cwd: root, encoding: "utf8", env: { ...process.env, GITHUB_OUTPUT: output },
    });
    expect(result.status, result.stderr).toBe(0);
    const timeoutSource = { url: "https://open-meteo.com/en/docs", state: "blocked", status: 0, error: "TimeoutError" };
    expect(JSON.parse(fs.readFileSync(hashes, "utf8")).entries["services/open-meteo"].sourceDocuments).toEqual(expect.arrayContaining([
      expect.objectContaining({ requestedUrl: timeoutSource.url, error: timeoutSource.error }),
    ]));
    expect(JSON.parse(fs.readFileSync(queue, "utf8")).entries).toMatchObject([{
      id: "services/open-meteo", reason: "blocked", url: expect.any(String), sourceIssues: expect.arrayContaining([timeoutSource]),
    }]);
    expect(fs.readFileSync(report, "utf8")).toContain("`services/open-meteo`");
    expect(fs.readFileSync(report, "utf8")).toContain("`TimeoutError`");
    expect(fs.readFileSync(output, "utf8")).toContain("flagged=1");
  } finally {
    // dir is created by mkdtemp under the system temp directory, never a caller-supplied target.
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

it("reports the first not-found result without a removal recommendation", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "freetier-freshness-not-found-"));
  const script = new URL("../../scripts/verify/check-freshness.mjs", import.meta.url).href;
  const runner = path.join(dir, "run.mjs");
  const report = path.join(dir, "report.md");
  const source = "https://example.com/pricing";
  fs.mkdirSync(path.join(dir, "content/services"), { recursive: true });
  fs.writeFileSync(path.join(dir, "content/services/a.mdx"), `---\ntitle: Example\nofficialUrl: ${source}\n---\nExample.\n`);
  fs.writeFileSync(runner, `globalThis.fetch = async () => new Response("", { status: 404 }); await import(${JSON.stringify(script)});`);

  try {
    const result = spawnSync(process.execPath, [runner, "--report", report], { cwd: dir, encoding: "utf8" });
    expect(result.status, result.stderr).toBe(0);
    const { entries } = JSON.parse(fs.readFileSync(path.join(dir, "freshness-review.json"), "utf8"));
    expect(entries).toEqual([{
      id: "services/a", reason: "source-not-found", url: source,
      sourceIssues: [{ url: source, state: "dead", status: 404 }],
    }]);
    const markdown = fs.readFileSync(report, "utf8");
    expect(markdown).toContain("Source not found: recheck the cited URL");
    expect(markdown).not.toContain("remove the entry");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

it("leaves an existing baseline intact when validation or atomic publication fails", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "freetier-freshness-baseline-"));
  const script = new URL("../../scripts/verify/check-freshness.mjs", import.meta.url).href;
  const baseline = path.join(dir, "hashes.json");
  const report = path.join(dir, "report.md");
  const runner = path.join(dir, "run.mjs");
  fs.mkdirSync(path.join(dir, "content/services"), { recursive: true });
  fs.writeFileSync(path.join(dir, "content/services/a.mdx"), "---\ntitle: Example\nofficialUrl: https://example.com/\n---\nExample.\n");
  fs.writeFileSync(runner, `
    import fs from "node:fs";
    fs.renameSync = () => { throw new Error("Simulated baseline publication failure"); };
    globalThis.fetch = async () => {
      fs.writeFileSync("fetched.txt", "yes");
      return new Response("Free plan includes 5 GB monthly. ".repeat(30), { status: 200 });
    };
    await import(${JSON.stringify(script)});
  `);
  const run = () => spawnSync(process.execPath, [runner, "--hashes", baseline, "--report", report], { cwd: dir, encoding: "utf8" });

  try {
    for (const invalid of ["{}", '{"entries":[]}', '{"entries":"discarded reviews"}']) {
      fs.writeFileSync(baseline, invalid);
      const failed = run();
      expect(failed.status).not.toBe(0);
      expect(failed.stderr).toContain("Invalid source baseline");
      expect(fs.readFileSync(baseline, "utf8")).toBe(invalid);
      expect(fs.existsSync(path.join(dir, "fetched.txt"))).toBe(false);
      expect(fs.existsSync(report)).toBe(false);
    }

    const valid = '{"entries":{"services/a":{"hash":"prior-reviewed-fingerprint"}}}';
    fs.writeFileSync(baseline, valid);
    const failed = run();
    expect(failed.status).not.toBe(0);
    expect(failed.stderr).toContain("Simulated baseline publication failure");
    expect(fs.readFileSync(baseline, "utf8")).toBe(valid);
    expect(fs.readdirSync(dir).some((name) => name.endsWith(".tmp"))).toBe(false);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

it("leaves entry dates untouched on normal full and subset scans, even for acknowledged unchanged sources", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "freetier-freshness-subset-"));
  const root = fileURLToPath(new URL("../../", import.meta.url));
  const script = pathToFileURL(path.join(root, "scripts/verify/check-freshness.mjs")).href;
  const html = "<p>Free plan $0 includes 1 GB per month.</p>".repeat(30);
  const snapshot = sourceSnapshot(html);
  fs.mkdirSync(path.join(dir, "content/services"), { recursive: true });
  const content = "---\ntitle: Example\nofficialUrl: https://example.com/\nlastUpdated: 2026-10-01\nlastVerified: 2026-10-18\n---\nExample.\n";
  const fileA = path.join(dir, "content/services/a.mdx");
  const fileB = path.join(dir, "content/services/b.mdx");
  fs.writeFileSync(fileA, content);
  fs.writeFileSync(fileB, content);
  const aggregate = summarizeSources("services/a", [{...snapshot,url:"https://example.com/",requestedUrl:"https://example.com/",status:200}]);
  const reviewedFingerprint = { hash: aggregate.hash, hashVersion: aggregate.hashVersion, markupHash: aggregate.markupHash, coverageVersion: aggregate.coverageVersion, url: "example.com", verificationDate: "2026-10-18", acknowledgedAt: "2026-10-18T22:00:00Z" };
  const stored = { ...aggregate, reviewedFingerprint, url: "https://example.com/", checkedAt: "2026-10-18", failures: 0, flaps: 0, state: "ok" };
  fs.writeFileSync(path.join(dir, "hashes.json"), JSON.stringify({ entries: { "services/a": stored, "services/b": stored } }));
  const runner = path.join(dir, "run.mjs");
  fs.writeFileSync(runner, `globalThis.fetch = async () => new Response(${JSON.stringify(html)}, { status: 200 }); await import(${JSON.stringify(script)});`);
  try {
    for (const selection of [["--ids", "services/a"], []]) {
      const result = spawnSync(process.execPath, [runner, ...selection, "--hashes", "hashes.json", "--report", "report.md"], {
        cwd: dir, encoding: "utf8", env: { ...process.env, GITHUB_OUTPUT: path.join(dir, "output.txt") },
      });
      expect(result.status, result.stderr).toBe(0);
      expect(fs.readFileSync(fileA, "utf8")).toBe(content);
      expect(fs.readFileSync(fileB, "utf8")).toBe(content);
      expect(result.stdout).toBe("");
    }
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

it("rejects deprecated automatic verification before fetching or writing reports and hashes", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "freetier-no-auto-verify-"));
  const root = fileURLToPath(new URL("../../", import.meta.url));
  const script = pathToFileURL(path.join(root, "scripts/verify/check-freshness.mjs")).href;
  fs.mkdirSync(path.join(dir, "content/services"), { recursive: true });
  fs.writeFileSync(path.join(dir, "content/services/a.mdx"), '---\ntitle: Example\nofficialUrl: https://example.com/\nlastVerified: 2026-10-18\n---\nExample.\n');
  const runner = path.join(dir, "run.mjs");
  fs.writeFileSync(runner, `import fs from 'node:fs'; globalThis.fetch = async () => { fs.writeFileSync('fetched.txt','yes'); return new Response('Free plan', { status:200 }); }; await import(${JSON.stringify(script)});`);
  try {
    const result = spawnSync(process.execPath, [runner, "--mark-verified", "--hashes", "hashes.json", "--report", "report.md"], { cwd: dir, encoding: "utf8" });
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain("--mark-verified is no longer supported");
    expect(fs.existsSync(path.join(dir, "fetched.txt"))).toBe(false);
    expect(fs.existsSync(path.join(dir, "hashes.json"))).toBe(false);
    expect(fs.existsSync(path.join(dir, "report.md"))).toBe(false);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

it("chooses a readable alternate over a longer HTTP 200 maintenance page", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "freetier-freshness-maintenance-"));
  const root = fileURLToPath(new URL("../../", import.meta.url));
  const script = pathToFileURL(path.join(root, "scripts/verify/check-freshness.mjs")).href;
  const maintenance = '<title>Security maintenance</title><h1>Our apps are offline today</h1>' + '<p>Free pricing plans unavailable during maintenance.</p>'.repeat(100);
  const pricing = '<title>Pricing</title><p>Free plan includes 5 GB per month.</p>'.repeat(30);
  fs.mkdirSync(path.join(dir, "content/services"), { recursive: true });
  fs.writeFileSync(path.join(dir, "content/services/a.mdx"), '---\ntitle: Example\npricingUrl: https://example.com/pricing\nsourceUrls:\n  - https://example.com/free-plan\nlastUpdated: 2026-10-01\nlastVerified: 2026-10-18\n---\nExample.\n');
  const runner = path.join(dir, "run.mjs");
  fs.writeFileSync(runner, `globalThis.fetch = async (url) => new Response(String(url).endsWith('/pricing') ? ${JSON.stringify(maintenance)} : ${JSON.stringify(pricing)}, { status: 200 }); await import(${JSON.stringify(script)});`);
  try {
    const result = spawnSync(process.execPath, [runner, '--hashes', 'hashes.json', '--report', 'report.md'], { cwd: dir, encoding: 'utf8' });
    expect(result.status, result.stderr).toBe(0);
    const stored = JSON.parse(fs.readFileSync(path.join(dir, 'hashes.json'), 'utf8')).entries['services/a'];
    expect(stored).toMatchObject({ state: 'ok', url: 'https://example.com/pricing', sourceDocuments: expect.arrayContaining([{ requestedUrl: 'https://example.com/free-plan', url:'https://example.com/free-plan', state:'ok',status:200, hash:sourceSnapshot(pricing).hash, markupHash:sourceSnapshot(pricing).markupHash, hashVersion:sourceSnapshot(pricing).hashVersion }]) });
    expect(JSON.parse(fs.readFileSync(path.join(dir, 'freshness-review.json'), 'utf8')).entries[0].sourceIssues).toEqual([{url:'https://example.com/pricing',state:'blocked',status:200,accessIssue:'maintenance'}]);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
