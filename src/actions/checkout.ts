"use server";

import { createCheckoutSession } from "@/lib/creem/checkout";

export async function checkoutAction(formData: FormData) {
  const planId = formData.get("planId") as string;
  const userId = formData.get("userId") as string;

  if (!planId) throw new Error("planId is required");

  const session = await createCheckoutSession(userId, planId);
  return { url: session.url };
}
