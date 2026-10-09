import { describe, expect, it } from "vitest";

import { bodyOutline, bodyQuestions, headingId, plainText } from "@/lib/entry-body";

const body = `Intro.

## What the free plan gives you

Text.

## Questions people ask

### Is it free?

Yes. See [Neon](/services/neon/) for **more**.

### Does it pause?

No.`;

describe("entry body", () => {
  it("makes stable heading ids", () => {
    expect(headingId("When you hit a limit")).toBe("when-you-hit-a-limit");
    expect(headingId("  Is X free? ")).toBe("is-x-free");
  });

  it("lists the second-level headings in order", () => {
    expect(bodyOutline(body)).toEqual([
      { id: "what-the-free-plan-gives-you", title: "What the free plan gives you" },
      { id: "questions-people-ask", title: "Questions people ask" },
    ]);
    expect(bodyOutline("One sentence.")).toEqual([]);
  });

  it("reads the question and answer pairs as plain text", () => {
    expect(bodyQuestions(body)).toEqual([
      { question: "Is it free?", answer: "Yes. See Neon for more." },
      { question: "Does it pause?", answer: "No." },
    ]);
    expect(bodyQuestions("One sentence.")).toEqual([]);
    expect(plainText("a  [b](/c/)  `d`")).toBe("a b d");
  });
});
