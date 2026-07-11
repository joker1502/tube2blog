import crypto from "node:crypto";

export function verifyCreemSignature(
  payload: string,
  signature: string,
): boolean {
  const secret = process.env.CREEM_WEBHOOK_SECRET;
  if (!secret) throw new Error("CREEM_WEBHOOK_SECRET is not set");

  const expectedSig = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  if (signature.length !== expectedSig.length) return false;

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSig),
  );
}
