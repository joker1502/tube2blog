import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { createOpenAI } from "@ai-sdk/openai";
import { customProvider } from "ai";

const opencodego = createOpenAICompatible({
  name: "opencodego",
  baseURL: process.env.OPENCODEGO_BASE_URL ?? "https://api.opencode.ai/v1",
  apiKey: process.env.OPENCODEGO_API_KEY,
});

const paidOpenAI = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const aiProvider = customProvider({
  languageModels: {
    "default": opencodego("deepseek-v4-flash"),
    "high-quality": opencodego("deepseek-v4-pro"),
  },
  fallbackProvider: opencodego,
});

export function getAIModel(tier: "default" | "high-quality" = "default") {
  return aiProvider.languageModel(tier);
}
