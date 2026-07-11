import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [totalUsers, totalPosts, subscriptions, activeSubscriptions] =
    await Promise.all([
      prisma.user.count(),
      prisma.blogPost.count(),
      prisma.subscription.count(),
      prisma.subscription.count({ where: { status: "ACTIVE" } }),
    ]);

  return NextResponse.json({
    stats: {
      totalUsers,
      totalConversions: totalPosts,
      activeSubscriptions,
      conversionThisMonth: 0,
    },
    users: [],
    conversions: [],
    subscriptions,
  });
}
