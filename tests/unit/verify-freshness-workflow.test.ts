import fs from "node:fs";
import { expect, it } from "vitest";

const workflow = fs.readFileSync(new URL("../../.github/workflows/freshness.yml", import.meta.url), "utf8").replace(/\r\n/g, "\n");

it("publishes only a fast-forward from the same baseline commit the scanner read", () => {
  const steps = workflow.split("\n      - name: ");
  const read = steps.find((step) => step.startsWith("Load last week's hashes\n"));
  const write = steps.find((step) => step.startsWith("Save this week's hashes\n"));

  expect(read).toContain("id: baseline");
  expect(read).toContain("revision=$(git rev-parse FETCH_HEAD)");
  expect(read).toContain('git show "$revision:source-hashes.json" > data/source-hashes.json');
  expect(read).toContain("printf 'revision=%s\\n' \"$revision\" >> \"$GITHUB_OUTPUT\"");
  expect(read).toContain("printf 'revision=none\\n' >> \"$GITHUB_OUTPUT\"");

  expect(write).toContain('BASELINE_REVISION: ${{ steps.baseline.outputs.revision }}');
  expect(write).toContain('if [ "$BASELINE_REVISION" = "none" ]; then');
  expect(write).toContain("git switch --orphan freshness-data");
  expect(write).toContain('git switch --force -C freshness-data "$BASELINE_REVISION"');
  expect(write).not.toMatch(/\bgit\s+(?:fetch|pull|rebase)\b/);
  expect(write?.match(/^\s*git push.*$/gm)?.map((line) => line.trim())).toEqual(["git push origin freshness-data"]);
});
