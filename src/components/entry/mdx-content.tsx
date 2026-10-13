import { MDXRemote } from "next-mdx-remote/rsc";
import type { ReactNode } from "react";

import { headingId } from "@/lib/entry-body";

export type MdxComponents = NonNullable<React.ComponentProps<typeof MDXRemote>["components"]>;

function text(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(text).join("");
  return "";
}

// Headings get the same ids the jump menu links to (see bodyOutline in src/lib/entry-body.ts).
const HEADINGS: MdxComponents = {
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 id={headingId(text(children))} className="scroll-mt-24">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 id={headingId(text(children))} className="scroll-mt-24">
      {children}
    </h3>
  ),
};

type Props = { source: string; components?: MdxComponents; className?: string };

export function MdxContent({ source, components, className = "reading" }: Props) {
  return (
    <div className={className}>
      <MDXRemote source={source} components={{ ...HEADINGS, ...components }} />
    </div>
  );
}
