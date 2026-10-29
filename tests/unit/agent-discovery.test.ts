import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { GET as llmsFullRoute } from "@/app/llms-full.txt/route";
import { GET as llmsRoute } from "@/app/llms.txt/route";
import { llmsFullTxt } from "@/lib/llms-txt";

import { makeEntry } from "../support/fixtures";

// A Windows checkout may have CRLF line endings; Pages builds on Linux, so hash and compare LF text.
const publicFile = (name: string) => fs.readFileSync(path.join(process.cwd(), "public", name), "utf8").replace(/\r\n/g, "\n");

describe("robots.txt", () => {
  it("declares Content Signals for every crawler", () => {
    const [everyone] = publicFile("robots.txt").split("\n\n");
    expect(everyone).toContain("User-Agent: *\nContent-Signal: search=yes, ai-input=yes, ai-train=yes\nAllow: /\n");
  });
});

describe("llms.txt", () => {
  it("starts with the site name and a summary, and links Markdown pages", async () => {
    const text = await (await llmsRoute()).text();
    expect(text).toMatch(/^# freetier\.wiki\n\n> Free plans for developers/);
    expect(text).toContain("](https://freetier.wiki/llms-full.txt)");
    expect(text).toContain("](https://freetier.wiki/compare/postgres-hosting/index.md)");
    expect(text).toContain("](https://freetier.wiki/category/database/index.md)");
  }, 60_000);

  it("puts every entry in llms-full.txt", async () => {
    const text = await (await llmsFullRoute()).text();
    expect(text).toContain("### Supabase\n");
    expect(text).toContain("Details: https://freetier.wiki/services/supabase/");
  }, 60_000);

  it("spells out unknown policies and ended plans", () => {
    const entry = makeEntry({ title: "Gone", status: "ended" });
    entry.freeTierDetails = { ...entry.freeTierDetails, requiresCard: "unknown", hasHardCap: true };
    const text = llmsFullTxt([entry], "2026-10-29");
    expect(text).toContain("card rule not confirmed · hard cap");
    expect(text).toContain("**The free tier has ended.**");
  });
});

describe("agent skills index", () => {
  const index = JSON.parse(publicFile(".well-known/agent-skills/index.json"));

  it("uses the v0.2.0 discovery schema", () => {
    expect(index.$schema).toBe("https://schemas.agentskills.io/discovery/0.2.0/schema.json");
  });

  it("lists each skill with the digest and description of its SKILL.md", () => {
    for (const skill of index.skills) {
      expect(skill.name).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(skill.type).toBe("skill-md");
      const body = publicFile(skill.url.slice(1));
      expect(skill.digest, `${skill.name}: rerun the digest after editing SKILL.md`).toBe(
        `sha256:${crypto.createHash("sha256").update(body).digest("hex")}`,
      );
      expect(body).toContain(`\nname: ${skill.name}\n`);
      expect(body).toContain(`\ndescription: ${skill.description}\n`);
    }
  });
});
