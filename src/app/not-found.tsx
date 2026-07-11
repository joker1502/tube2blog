import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-sm px-6 py-24 text-center">
      <h1 className="text-5xl font-bold tracking-tight">404</h1>
      <p className="mt-4 text-sm text-muted-foreground">Page not found.</p>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "mt-8 inline-flex",
        )}
      >
        Go Home
      </Link>
    </div>
  );
}
