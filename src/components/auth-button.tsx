"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/actions/auth";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { User } from "@supabase/supabase-js";

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!user) {
    return (
      <Link href="/auth" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
        Sign In
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-4 text-sm">
      <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
        Dashboard
      </Link>
      <Link href="/pricing" className={cn(buttonVariants({ size: "sm" }))}>Upgrade</Link>
      <button
        onClick={signOut}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
}
