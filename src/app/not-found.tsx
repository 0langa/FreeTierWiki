import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl space-y-4 py-20 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Entry not found</h1>
      <p className="text-muted-foreground">The requested page is missing or the content type is invalid.</p>
      <Link href="/explorer" className="inline-flex rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">
        Back to Explorer
      </Link>
    </div>
  );
}