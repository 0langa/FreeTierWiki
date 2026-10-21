import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";

const root = fileURLToPath(new URL("../../", import.meta.url));
const cli = path.join(root, "scripts/verify/acknowledge-freshness.mjs");
function fixture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "freetier-ack-"));
  fs.mkdirSync(path.join(dir, "content/services"), { recursive: true });
  const entry = "---\ntitle: A\nlastVerified: 2026-10-21\n---\nA\n";
  fs.writeFileSync(path.join(dir, "content/services/a.mdx"), entry);
  fs.writeFileSync(path.join(dir, "content/services/b.mdx"), entry);
  const source = { state: "ok", hash: "h1", hashVersion: 2, markupHash: "m1", url: "https://a.test/pricing", checkedAt: "2026-10-21T20:00:00Z", changedAt: "2026-10-21T20:00:00Z", failures: 0, flaps: 0 };
  const baseline = { updatedAt: source.checkedAt, entries: { "services/a": source, "services/b": source } };
  fs.writeFileSync(path.join(dir, "hashes.json"), JSON.stringify(baseline));
  return { dir, baseline, source, entry };
}
function run(dir: string, ...args: string[]) {
  return spawnSync(process.execPath, [cli, "--hashes", "hashes.json", ...args], { cwd: dir, encoding: "utf8" });
}
it("acknowledges only explicitly selected current readable sources and leaves content untouched", () => {
  const f = fixture();
  try {
    const result = run(f.dir, "--ids", "services/a");
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).toBe("");
    const after = JSON.parse(fs.readFileSync(path.join(f.dir, "hashes.json"), "utf8"));
    expect(after.entries["services/a"].reviewedFingerprint).toMatchObject({ hash: "h1", hashVersion: 2, markupHash: "m1", url: "a.test/pricing", verificationDate: "2026-10-21", acknowledgedAt: expect.any(String) });
    expect(after.entries["services/b"]).toEqual(f.source);
    expect(fs.readFileSync(path.join(f.dir, "content/services/a.mdx"), "utf8")).toBe(f.entry);
  } finally { fs.rmSync(f.dir, { recursive: true, force: true }); }
});
it("accepts explicit JSON ID and review-result arrays", () => {
  const f = fixture();
  try {
    for (const ids of [["services/a"], [{ id: "services/a", resolution: "qualified" }]]) {
      fs.writeFileSync(path.join(f.dir, "ids.json"), JSON.stringify(ids));
      const result = run(f.dir, "--ids-file", "ids.json");
      expect(result.status, result.stderr).toBe(0);
    }
  } finally { fs.rmSync(f.dir, { recursive: true, force: true }); }
});
it("rejects missing, empty or invalid IDs and invalidates no other record on a failed batch", () => {
  const f = fixture();
  try {
    for (const args of [[], ["--ids", ""], ["--ids", "services/a,services/missing"], ["--ids", "../a"]]) {
      const before = fs.readFileSync(path.join(f.dir, "hashes.json"), "utf8");
      const result = run(f.dir, ...args);
      expect(result.status).not.toBe(0);
      expect(fs.readFileSync(path.join(f.dir, "hashes.json"), "utf8")).toBe(before);
    }
  } finally { fs.rmSync(f.dir, { recursive: true, force: true }); }
});
it("rejects unreadable, incomplete, legacy or unreviewed revisions before writing", () => {
  const f = fixture();
  try {
    for (const change of [{ state: "blocked" }, { hash: undefined }, { hash: 12 }, { markupHash: undefined }, { markupHash: {} }, { hashVersion: 1 }, { url: undefined }, { url: "https://" }, { changedAt: "2026-10-22T12:00:00Z" }]) {
      const baseline = { ...f.baseline, entries: { ...f.baseline.entries, "services/a": { ...f.source, ...change } } };
      const file = path.join(f.dir, "hashes.json");
      fs.writeFileSync(file, JSON.stringify(baseline));
      const before = fs.readFileSync(file, "utf8");
      const result = run(f.dir, "--ids", "services/a");
      expect(result.status).not.toBe(0);
      expect(result.stderr).toContain("changedAt" in change ? "lastVerified must record" : "acknowledgement needs");
      expect(fs.readFileSync(file, "utf8")).toBe(before);
    }
  } finally { fs.rmSync(f.dir, { recursive: true, force: true }); }
});
it("requires a recorded source-comparison date and rejects malformed JSON ID batches", () => {
  const f = fixture();
  try {
    const file = path.join(f.dir, "hashes.json"), before = fs.readFileSync(file, "utf8");
    for (const value of [[], {}, [null], [{ noId: "services/a" }]]) {
      fs.writeFileSync(path.join(f.dir, "ids.json"), JSON.stringify(value));
      expect(run(f.dir, "--ids-file", "ids.json").status).not.toBe(0);
      expect(fs.readFileSync(file, "utf8")).toBe(before);
    }
    fs.writeFileSync(path.join(f.dir, "content/services/a.mdx"), "---\ntitle: A\n---\nA\n");
    const result = run(f.dir, "--ids", "services/a");
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain("lastVerified must record");
    expect(fs.readFileSync(file, "utf8")).toBe(before);
  } finally { fs.rmSync(f.dir, { recursive: true, force: true }); }
});
