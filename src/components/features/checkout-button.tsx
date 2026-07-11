"use client";

import { CreemCheckout } from "@creem_io/nextjs";

export function CheckoutButton({ planId }: { planId: string }) {
  return (
    <CreemCheckout
      productId={planId}
      checkoutPath="/checkout"
      successUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/dashboard?payment=success`}
    >
      Get Started
    </CreemCheckout>
  );
}
