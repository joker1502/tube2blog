"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Tab = "overview" | "users" | "conversions" | "subscriptions";

interface Stats {
  totalUsers: number;
  totalConversions: number;
  activeSubscriptions: number;
  conversionThisMonth: number;
}

export default function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("overview");
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const check = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth"); return; }

      const res = await fetch("/api/admin/check");
      if (!res.ok) { router.push("/"); return; }

      setIsAdmin(true);
      const dataRes = await fetch("/api/admin/data");
      const data = await dataRes.json();
      setStats(data.stats);
      setLoading(false);
    };
    check();
  }, [router]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-sm text-muted-foreground">Loading admin panel...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "users", label: "Users" },
    { id: "conversions", label: "Conversions" },
    { id: "subscriptions", label: "Subscriptions" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-2xl font-bold tracking-tight mb-8">Admin Panel</h1>

      <div className="mb-8 flex gap-1 border-b">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-5 py-2.5 text-xs font-medium transition-colors ${
              tab === t.id
                ? "border-b-2 border-foreground text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && stats && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Users" value={stats.totalUsers} />
          <StatCard label="Total Posts" value={stats.totalConversions} />
          <StatCard label="Active Subs" value={stats.activeSubscriptions} />
          <StatCard label="This Month" value={stats.conversionThisMonth} />
        </div>
      )}

      {tab !== "overview" && (
        <p className="text-sm text-muted-foreground py-8 text-center">
          Data view coming soon.
        </p>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border p-5">
      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
        {label}
      </p>
      <p className="mt-1 text-3xl font-bold">{value.toLocaleString()}</p>
    </div>
  );
}
