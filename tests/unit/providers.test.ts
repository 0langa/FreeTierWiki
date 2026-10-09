import { describe, expect, it } from "vitest";

import { providerGroups, providerHref, providerName, providerSlug } from "@/lib/providers";
import type { AtlasEntry } from "@/types/content";

const entry = (id: string, provider: string) => ({ id, provider }) as AtlasEntry;

describe("providers", () => {
  it("joins aliases and makes URL-safe slugs", () => {
    expect(providerName("Amazon Web Services")).toBe("AWS");
    expect(providerSlug("Google Cloud")).toBe("google-cloud");
    expect(providerSlug("Formsubmit.co")).toBe("formsubmit-co");
  });

  it("only groups providers with two or more entries, largest first", () => {
    const groups = providerGroups([entry("a", "AWS"), entry("b", "Amazon Web Services"), entry("c", "Solo"), entry("d", "Z"), entry("e", "Z"), entry("f", "AWS")]);
    expect(groups.map((group) => [group.slug, group.entries.length])).toEqual([
      ["aws", 3],
      ["z", 2],
    ]);
    expect(providerHref(entry("x", "Amazon Web Services"), groups)).toBe("/provider/aws/");
    expect(providerHref(entry("y", "Solo"), groups)).toBeUndefined();
  });
});
