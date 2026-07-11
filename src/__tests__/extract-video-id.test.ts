import { describe, it, expect } from "vitest";
import { extractVideoId } from "@/lib/youtube/transcript";

describe("extractVideoId", () => {
  it("extracts from standard watch URL", () => {
    expect(extractVideoId("https://youtube.com/watch?v=dQw4w9WgXcQ")).toBe(
      "dQw4w9WgXcQ",
    );
  });

  it("extracts from short URL", () => {
    expect(extractVideoId("https://youtu.be/dQw4w9WgXcQ")).toBe(
      "dQw4w9WgXcQ",
    );
  });

  it("extracts from embed URL", () => {
    expect(
      extractVideoId("https://youtube.com/embed/dQw4w9WgXcQ"),
    ).toBe("dQw4w9WgXcQ");
  });

  it("extracts from shorts URL", () => {
    expect(
      extractVideoId("https://youtube.com/shorts/dQw4w9WgXcQ"),
    ).toBe("dQw4w9WgXcQ");
  });

  it("throws on invalid URL", () => {
    expect(() => extractVideoId("https://example.com")).toThrow(
      "INVALID_YOUTUBE_URL",
    );
  });

  it("throws on empty string", () => {
    expect(() => extractVideoId("")).toThrow("INVALID_YOUTUBE_URL");
  });
});
