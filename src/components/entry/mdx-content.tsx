import { MDXRemote } from "next-mdx-remote/rsc";
import type { ReactNode } from "react";

import { headingId } from "@/lib/entry-body";

function text(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(text).join("");
  return "";
}

// Headings get the same ids the jump menu links to (see bodyOutline in src/lib/entry-body.ts).
const components = {
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 id={headingId(text(children))} className="scroll-mt-20">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 id={headingId(text(children))} className="scroll-mt-20">
      {children}
    </h3>
  ),
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose-lite max-w-[70ch]">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
