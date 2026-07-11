import { describe, it, expect, beforeAll } from "vitest";
import crypto from "node:crypto";

beforeAll(() => {
  process.env.CREEM_WEBHOOK_SECRET = "test_secret_key_12345";
});

async function verifyCreemSignature(
  payload: string,
  signature: string,
): Promise<boolean> {
  const mod = await import("@/lib/creem/verify-signature");
  return mod.verifyCreemSignature(payload, signature);
}

describe("verifyCreemSignature", () => {
  it("verifies valid signature", async () => {
    const payload = JSON.stringify({
      event: "subscription.created",
      object: { id: "sub_123" },
    });

    const expectedSig = crypto
      .createHmac("sha256", "test_secret_key_12345")
      .update(payload)
      .digest("hex");

    await expect(verifyCreemSignature(payload, expectedSig)).resolves.toBe(
      true,
    );
  });

  it("rejects invalid signature", async () => {
    const payload = JSON.stringify({ event: "test" });
    await expect(
      verifyCreemSignature(payload, "invalid_signature"),
    ).resolves.toBe(false);
  });

  it("throws when secret is not set", async () => {
    delete process.env.CREEM_WEBHOOK_SECRET;
    await expect(
      verifyCreemSignature("{}", "sig"),
    ).rejects.toThrow("CREEM_WEBHOOK_SECRET is not set");
  });
});
