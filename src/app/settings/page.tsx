"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import type { User } from "@supabase/supabase-js";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/auth");
        return;
      }
      setUser(user);
      setLoading(false);
    });
  }, [router]);

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-sm text-muted-foreground">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 space-y-8">
      <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Account</h2>
        <div className="rounded-lg border p-4 space-y-3">
          <div className="text-sm">
            <span className="text-muted-foreground">Email: </span>
            {user?.email}
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">User ID: </span>
            <code className="text-xs">{user?.id}</code>
          </div>
        </div>
      </section>

      <section>
        <Button variant="destructive" onClick={handleSignOut}>
          Sign Out
        </Button>
      </section>
    </div>
  );
}
