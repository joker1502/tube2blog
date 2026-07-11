import Link from "next/link";

export default async function TeamAcceptPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; email?: string }>;
}) {
  const { token, email } = await searchParams;

  return (
    <div className="mx-auto max-w-sm px-6 py-24 text-center">
      <h1 className="text-2xl font-bold tracking-tight">Team Invitation</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {email
          ? `You've been invited as ${email}`
          : "Invalid invitation link."}
      </p>
      <Link
        href="/auth"
        className="mt-8 inline-block border px-5 py-3 text-xs font-medium transition-colors hover:border-foreground"
      >
        Sign in to accept
      </Link>
    </div>
  );
}
