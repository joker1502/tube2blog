"use client";

import { useState } from "react";
import { signInWithEmail, signInWithOAuth } from "@/actions/auth";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const formData = new FormData();
    formData.set("email", email);
    const result = await signInWithEmail(formData);
    if (result.error) setError(result.error);
    else setSent(true);
  }

  async function handleOAuth(provider: "google") {
    setOauthLoading(provider);
    setError("");
    const result = await signInWithOAuth(provider);
    if (result.error) setError(result.error);
    if (result.url) window.location.href = result.url;
    setOauthLoading(null);
  }

  if (sent) {
    return (
      <div className="mt-8 border px-5 py-4 text-sm text-muted-foreground">
        Magic link sent. Check your inbox.
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="space-y-3">
        <button
          onClick={() => handleOAuth("google")}
          disabled={oauthLoading !== null}
          className="flex w-full items-center justify-center gap-3 border px-4 py-3 text-sm font-medium transition-colors hover:border-muted-foreground disabled:opacity-40"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          {oauthLoading === "google" ? "Redirecting..." : "Continue with Google"}
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs text-muted-foreground">
          <span className="bg-background px-3">or via email</span>
        </div>
      </div>

      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-muted-foreground mb-2">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full border px-4 py-3 text-sm outline-none transition-colors focus:border-foreground bg-background"
          />
        </div>
        <button
          type="submit"
          className="w-full border bg-foreground px-4 py-3 text-sm font-medium text-background transition-colors hover:opacity-90"
        >
          Send Magic Link
        </button>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </form>
    </div>
  );
}
