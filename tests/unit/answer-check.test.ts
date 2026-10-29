import { describe, expect, it } from "vitest";

import { answerProblems, answerWordCount, catalogAnswerProblems } from "@/lib/answer-check";
import { listContentFiles, readEntryFile } from "@/lib/content-files";
import { makeEntry } from "../support/fixtures";

const VALID =
  "Neon gives you a small free Postgres database with a hard cap and no card, and it does not bill you when the allowance runs out.";

describe("answer checks", () => {
  it("accepts a sentence that matches the structured fields", () => {
    expect(answerWordCount(VALID)).toBeGreaterThanOrEqual(20);
    expect(answerWordCount(VALID)).toBeLessThanOrEqual(45);
    expect(answerProblems(makeEntry({ answer: VALID }))).toEqual([]);
  });

  it("rejects a missing, short, long, or two-sentence answer", () => {
    expect(answerProblems(makeEntry({ answer: "" }))).toContain("missing answer");
    expect(answerProblems(makeEntry({ answer: "Neon is free for a quick test only." }))).toEqual(expect.arrayContaining([expect.stringMatching(/words/)]));
    expect(answerProblems(makeEntry({ answer: "Neon is free. The cap is real and the rest of this answer keeps going past the minimum length." }))).toContain(
      "answer must be one sentence",
    );
    const long = `${VALID} ${VALID}`;
    expect(answerProblems(makeEntry({ answer: long }))).toEqual(expect.arrayContaining([expect.stringMatching(/words/), "answer must be one sentence"]));
  });

  it("rejects a card claim that contradicts the field", () => {
    const needsCard = makeEntry({
      answer: "Neon needs a card at signup before the free Postgres database, the hard cap, or the storage allowance can be used.",
      freeTierDetails: { ...makeEntry().freeTierDetails, requiresCard: true },
    });
    expect(answerProblems(needsCard)).toEqual([]);
    expect(answerProblems(makeEntry({ answer: needsCard.answer }))).toContain("card claim contradicts requiresCard false");

    const unknown = makeEntry({
      answer: "Neon offers a small Postgres database on a free plan, and whether a card is required is not confirmed in the published docs.",
      freeTierDetails: { ...makeEntry().freeTierDetails, requiresCard: "unknown" },
    });
    expect(answerProblems(unknown)).toEqual([]);
    expect(
      answerProblems(
        makeEntry({
          answer: "Neon needs a card at signup for the free Postgres database even though the rest of the allowance is still described as free.",
          freeTierDetails: { ...makeEntry().freeTierDetails, requiresCard: "unknown" },
        }),
      ),
    ).toContain("card claim contradicts requiresCard unknown");
  });

  it("rejects a hard-cap or billing claim that contradicts the field", () => {
    expect(answerProblems(makeEntry({ answer: "Neon has no hard cap on the free Postgres database, needs no card, and it does not bill you at the storage limit." }))).toContain(
      "cap claim contradicts hasHardCap true",
    );
    expect(
      answerProblems(
        makeEntry({
          answer: "Neon gives you a small free Postgres database with no card, and it can't bill you once the storage allowance is gone for the month.",
          freeTierDetails: { ...makeEntry().freeTierDetails, overageRisk: "low", hasHardCap: false },
        }),
      ),
    ).toContain("says it cannot bill you but overageRisk is low");
  });

  it("reads negated caps and keeps a card doubt out of the cap claim", () => {
    const uncapped = { ...makeEntry().freeTierDetails, hasHardCap: false, overageRisk: "medium" as const };
    // The doubt is about the card, so the cap claim is "no hard cap".
    expect(
      answerProblems(
        makeEntry({
          answer: "Neon makes 0.5 GB of Postgres storage free and bills usage past that at list rates with no hard cap, while the card rule is not confirmed.",
          freeTierDetails: { ...uncapped, requiresCard: "unknown" },
        }),
      ),
    ).toEqual([]);
    expect(
      answerProblems(
        makeEntry({
          answer: "Neon does not have a hard cap on the free Postgres database, so usage past the allowance is billed once a payment method is on file.",
          freeTierDetails: uncapped,
        }),
      ),
    ).toEqual([]);
    expect(
      answerProblems(makeEntry({ answer: "Neon's storage limit isn't a hard cap on the free Postgres database, so usage past the allowance can be billed to you later." })),
    ).toContain("cap claim contradicts hasHardCap true");
    expect(answerProblems(makeEntry({ answer: "Neon's free plan stops at its hard caps on storage and compute, needs no card, and it does not bill you when they run out." }))).toEqual(
      [],
    );
  });

  it("matches curly apostrophes and ignores abbreviation periods", () => {
    expect(
      answerProblems(
        makeEntry({
          answer: "Neon gives you a small free Postgres database with no card, and it can’t bill you once the storage allowance is gone for the month.",
          freeTierDetails: { ...makeEntry().freeTierDetails, overageRisk: "low", hasHardCap: false },
        }),
      ),
    ).toContain("says it cannot bill you but overageRisk is low");
    expect(
      answerProblems(makeEntry({ answer: "Neon's free plan covers small apps, e.g. a hobby API, with a hard cap and no card, and it does not bill you at the storage limit." })),
    ).toEqual([]);
  });

  it("requires ended entries to say so and leaves changed entries to the change notice", () => {
    expect(answerProblems(makeEntry({ status: "ended", answer: VALID }))).toContain("ended entry does not say so");
    expect(
      answerProblems(
        makeEntry({
          status: "ended",
          answer: "Neon ended its free Postgres database, so the old storage allowance and the no-card signup are no longer something you can open.",
        }),
      ),
    ).toEqual([]);
    // The change notice on the page covers a changed entry, so its answer only states the current terms.
    expect(answerProblems(makeEntry({ status: "changed", answer: VALID }))).toEqual([]);
    expect(answerProblems(makeEntry({ answer: "Neon no longer offers a free database, and the old plan has ended for every new account that signs up today." }))).toContain(
      "active entry says the free tier ended",
    );
  });
});

describe("catalog answers", () => {
  it("gives every entry one answer that agrees with its fields", async () => {
    const entries = [];
    for (const file of await listContentFiles()) entries.push((await readEntryFile(file)).entry);
    expect(entries.length).toBeGreaterThan(900);
    expect(catalogAnswerProblems(entries)).toEqual([]);
  }, 60_000);
});
