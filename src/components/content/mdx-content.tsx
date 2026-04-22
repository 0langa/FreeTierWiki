"use client";

import { useMDXComponent } from "next-contentlayer/hooks";

import { cn } from "@/lib/utils";

type MdxContentProps = {
  code: string;
  className?: string;
};

export function MdxContent({ code, className }: MdxContentProps) {
  const Component = useMDXComponent(code);

  return (
    <article
      className={cn(
        "prose prose-neutral max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-primary",
        className,
      )}
    >
      <Component />
    </article>
  );
}