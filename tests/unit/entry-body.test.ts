import { describe, expect, it } from "vitest";

import { bodyOutline, bodyQuestions, bodySections, headingId, plainText, splitFaq } from "@/lib/entry-body";

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

  it("splits the body into an intro and one part per section", () => {
    const { intro, sections } = bodySections(body);
    expect(intro).toBe("Intro.");
    expect(sections.map((section) => [section.id, section.title])).toEqual([
      ["what-the-free-plan-gives-you", "What the free plan gives you"],
      ["questions-people-ask", "Questions people ask"],
    ]);
    expect(sections[0].markdown).toBe("Text.");
    expect(sections[1].markdown.startsWith("### Is it free?")).toBe(true);
    expect(bodySections("One sentence.")).toEqual({ intro: "One sentence.", sections: [] });
  });

  it("splits a questions section into items with their answer Markdown", () => {
    const { lead, items } = splitFaq(bodySections(body).sections[1].markdown);
    expect(lead).toBe("");
    expect(items).toEqual([
      { id: "is-it-free", question: "Is it free?", markdown: "Yes. See [Neon](/services/neon/) for **more**." },
      { id: "does-it-pause", question: "Does it pause?", markdown: "No." },
    ]);
    expect(splitFaq("Lead text.\n\n### Q?\n\nA.")).toEqual({ lead: "Lead text.", items: [{ id: "q", question: "Q?", markdown: "A." }] });
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
