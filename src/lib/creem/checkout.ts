export async function createCheckoutSession(
  userId: string,
  planId: string,
) {
  const res = await fetch("https://api.creem.io/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.CREEM_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      plan_id: planId,
      metadata: { userId },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?payment=canceled`,
    }),
  });

  if (!res.ok) throw new Error(`Creem API error: ${await res.text()}`);
  return res.json() as Promise<{ url: string }>;
}
