"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export function BlogGenerator() {
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError("");
    setContent("");

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Generation failed");
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
      if (err instanceof Error && err.name === "AbortError") return;
      setError((err as Error).message);
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }

  function handleStop() {
    abortRef.current?.abort();
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="url">YouTube URL</Label>
        <div className="flex gap-2">
          <Input
            id="url"
            placeholder="https://youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
          />
          {loading ? (
            <Button variant="destructive" onClick={handleStop}>
              Stop
            </Button>
          ) : (
            <Button onClick={handleGenerate} disabled={!url}>
              Generate
            </Button>
          )}
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {loading && (
        <p className="text-sm text-muted-foreground animate-pulse">
          Generating blog post...
        </p>
      )}

      {content && (
        <div className="space-y-2">
          <Label htmlFor="content">Blog Post</Label>
          <Textarea
            id="content"
            value={content}
            readOnly
            className="min-h-[400px] font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
}
