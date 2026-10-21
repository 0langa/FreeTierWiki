import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { expect, it } from "vitest";

import { sourceSnapshot } from "../../scripts/verify/lib/source-snapshot.mjs";

it("writes an actionable queue and workflow flag for a blocked source without any changed or dead page", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "freetier-freshness-"));
  const root = fileURLToPath(new URL("../../", import.meta.url));
  const hashes = path.join(dir, "hashes.json");
  const report = path.join(dir, "report.md");
  const queue = path.join(dir, "queue.json");
  const output = path.join(dir, "output.txt");
  const runner = path.join(dir, "run.mjs");
  const script = pathToFileURL(path.join(root, "scripts/verify/check-freshness.mjs")).href;
  fs.writeFileSync(runner, `globalThis.fetch = async () => new Response("", { status: 403 }); await import(${JSON.stringify(script)});`);
  try {
    const result = spawnSync(process.execPath, [runner, "--ids", "services/open-meteo", "--hashes", hashes, "--report", report, "--review-json", queue], {
      cwd: root, encoding: "utf8", env: { ...process.env, GITHUB_OUTPUT: output },
    });
    expect(result.status, result.stderr).toBe(0);
    expect(JSON.parse(fs.readFileSync(queue, "utf8")).entries).toEqual([{ id: "services/open-meteo", reason: "blocked", url: expect.any(String) }]);
    expect(fs.readFileSync(report, "utf8")).toContain("`services/open-meteo`");
    expect(fs.readFileSync(output, "utf8")).toContain("flagged=1");
  } finally {
    // dir is created by mkdtemp under the system temp directory, never a caller-supplied target.
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
  const reviewedFingerprint = { hash: snapshot.hash, hashVersion: snapshot.hashVersion, markupHash: snapshot.markupHash, url: "example.com", verificationDate: "2026-10-18", acknowledgedAt: "2026-10-18T22:00:00Z" };
  const stored = { ...snapshot, reviewedFingerprint, url: "https://example.com/", checkedAt: "2026-10-18", failures: 0, flaps: 0, state: "ok" };
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
    expect(stored).toMatchObject({ state: 'ok', url: 'https://example.com/free-plan', hash: sourceSnapshot(pricing).hash });
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
