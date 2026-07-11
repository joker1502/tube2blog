import type { Metadata } from "next";
import { AuthForm } from "@/components/features/auth-form";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function AuthPage() {
  return (
    <div className="mx-auto max-w-sm px-6 py-24">
      <h1 className="text-2xl font-bold tracking-tight">Get started</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Sign in or create an account to unlock Pro features.
      </p>
      <AuthForm />
    </div>
  );
}
