import { Badge } from "@/components/ui/badge";
import type { AtlasEntry } from "@/types/content";

export function ContentMeta({ entry }: { entry: AtlasEntry }) {
  return (
    <div className="grid gap-4 rounded-lg border bg-card p-4 sm:grid-cols-2 xl:grid-cols-4">
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Provider</p>
        <p className="mt-1 text-sm font-medium">{entry.provider}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Category</p>
        <p className="mt-1 text-sm font-medium">{entry.category}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Pricing</p>
        <p className="mt-1 text-sm font-medium capitalize">{entry.pricingModel}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Difficulty</p>
        <p className="mt-1 text-sm font-medium capitalize">{entry.difficulty}</p>
      </div>
      <div className="sm:col-span-2 xl:col-span-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Tags</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {entry.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
