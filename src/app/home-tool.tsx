"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function HomeTool() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");

  async function handleSubmit() {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setContent("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to generate");
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setContent((prev) => prev + decoder.decode(value, { stream: true }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 mx-auto max-w-3xl space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube URL..."
          className="w-full sm:flex-1 rounded-lg border px-5 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-brand/50 bg-background"
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <Button
          onClick={handleSubmit}
          disabled={loading || !url.trim()}
          size="lg"
          className="w-full sm:w-auto shrink-0"
        >
          {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
          {loading ? "Processing" : "Convert"}
        </Button>
      </div>

      {error && (
        <div className="border border-destructive/50 bg-destructive/10 px-5 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {loading && (
        <div className="border px-5 py-4 text-sm text-muted-foreground">
          Extracting transcript and generating blog post...
        </div>
      )}

      {content && (
        <div className="border p-5 text-left">
          <pre className="text-sm whitespace-pre-wrap font-sans">{content}</pre>
        </div>
      )}
    </div>
  );
}
