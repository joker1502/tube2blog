"use server";

import { createClient } from "@/lib/supabase/server";
import crypto from "node:crypto";

export async function listMembers() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  return [];
}

export async function listInvitations() {
  return [];
}

export async function inviteMember(email: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const token = crypto.randomBytes(32).toString("hex");
  const origin = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const inviteLink = `${origin}/team/accept?token=${token}&email=${encodeURIComponent(email)}`;

  return { success: true, inviteLink };
}

export async function removeMember(userId: string) {
  return { success: true };
}

export async function cancelInvitation(id: string) {
  return { success: true };
}
