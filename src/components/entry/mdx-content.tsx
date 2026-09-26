import { MDXRemote } from "next-mdx-remote/rsc";

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose-lite max-w-[70ch]">
      <MDXRemote source={source} />
    </div>
  );
}
