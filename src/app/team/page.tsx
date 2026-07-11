"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { listMembers, listInvitations, inviteMember, removeMember, cancelInvitation } from "@/actions/team";
import type { User } from "@supabase/supabase-js";

interface TeamMember {
  id: string;
  user_id: string;
  role: string;
  joined_at: string;
  email: string;
}

interface TeamInvitation {
  id: string;
  email: string;
  created_at: string;
  expires_at: string;
}

export default function TeamPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [invitations, setInvitations] = useState<TeamInvitation[]>([]);
  const [email, setEmail] = useState("");
  const [inviting, setInviting] = useState(false);
  const [inviteResult, setInviteResult] = useState<{ inviteLink?: string; error?: string } | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { router.push("/auth"); return; }
      setUser(user);
      const [m, i] = await Promise.all([listMembers(), listInvitations()]);
      setMembers(m as TeamMember[]);
      setInvitations(i as TeamInvitation[]);
      setLoading(false);
    });
  }, [router]);

  async function handleInvite(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setInviting(true);
    setInviteResult(null);
    const result = await inviteMember(email.trim());
    setInviteResult(result);
    if (result.success) setEmail("");
    setInviting(false);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-sm text-muted-foreground">Loading team...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 space-y-10">
      <h1 className="text-2xl font-semibold tracking-tight">Team Management</h1>

      <section>
        <h2 className="mb-4 text-lg font-medium">Invite Member</h2>
        <form onSubmit={handleInvite} className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="colleague@example.com"
            required
            className="flex-1 border px-4 py-2 text-sm outline-none focus:border-foreground bg-background"
          />
          <button
            type="submit"
            disabled={inviting}
            className="bg-foreground px-6 py-2 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50"
          >
            {inviting ? "Sending..." : "Invite"}
          </button>
        </form>
        {inviteResult?.inviteLink && (
          <div className="mt-3 border p-4 text-sm">
            <p className="font-medium">Invitation created!</p>
            <p className="mt-1 break-all font-mono text-xs">{inviteResult.inviteLink}</p>
          </div>
        )}
        {inviteResult?.error && (
          <p className="mt-2 text-sm text-destructive">{inviteResult.error}</p>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-lg font-medium">Team Members ({members.length})</h2>
        {members.length === 0 ? (
          <div className="border p-6 text-center text-sm text-muted-foreground">No team members yet.</div>
        ) : (
          <div className="border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Role</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.id} className="border-b last:border-0">
                    <td className="px-4 py-3">{m.email}</td>
                    <td className="px-4 py-3 capitalize">{m.role}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => removeMember(m.user_id)}
                        className="text-xs text-destructive hover:opacity-80"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-lg font-medium">Pending Invitations ({invitations.length})</h2>
        {invitations.length === 0 ? (
          <div className="border p-6 text-center text-sm text-muted-foreground">No pending invitations.</div>
        ) : (
          <div className="border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Sent</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invitations.map((inv) => (
                  <tr key={inv.id} className="border-b last:border-0">
                    <td className="px-4 py-3">{inv.email}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(inv.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => cancelInvitation(inv.id)}
                        className="text-xs text-destructive hover:opacity-80"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
