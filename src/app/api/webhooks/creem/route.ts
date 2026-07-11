import { Webhook } from "@creem_io/nextjs";
import { prisma } from "@/lib/prisma";

export const POST = Webhook({
  webhookSecret: process.env.CREEM_WEBHOOK_SECRET!,
  onSubscriptionActive: async (data) => {
    const sub = data as unknown as {
      id: string;
      customer_id: string;
      product_id: string;
      status: string;
      current_period_end: string;
      metadata: { userId?: string };
    };

    await prisma.subscription.upsert({
      where: { creemSubscriptionId: sub.id },
      create: {
        userId: sub.metadata?.userId ?? sub.customer_id,
        creemSubscriptionId: sub.id,
        planId: sub.product_id,
        status: "ACTIVE",
        currentPeriodEnd: new Date(sub.current_period_end),
      },
      update: {
        status: "ACTIVE",
        currentPeriodEnd: new Date(sub.current_period_end),
      },
    });
  },

  onCheckoutCompleted: async (data) => {
    const checkout = data as unknown as {
      id: string;
      customer_id: string;
      product_id: string;
      metadata: { userId?: string };
    };

    await prisma.user.upsert({
      where: { id: checkout.metadata?.userId ?? checkout.customer_id },
      create: {
        id: checkout.metadata?.userId ?? checkout.customer_id,
        email: `${checkout.customer_id}@creem.io`,
        credits: 50,
      },
      update: {
        credits: { increment: 50 },
      },
    });
  },
});
