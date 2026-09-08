"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [resent, setResent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setNeedsConfirmation(false);
    setResent(false);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      if (error.message.toLowerCase().includes("email not confirmed")) {
        setNeedsConfirmation(true);
      } else {
        setError(error.message);
      }
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function handleResend() {
    setResent(false);
    await supabase.auth.resend({ type: "signup", email });
    setResent(true);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm rounded-3xl border border-line bg-surface-solid p-8 shadow-xl"
      >
        <div className="mb-6 flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white">
            🔒
          </span>
          <div className="leading-tight">
            <p className="font-semibold">Biltro</p>
            <p className="text-xs text-ink-soft">Warranty Vault</p>
          </div>
        </div>

        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="mt-1 text-sm text-ink-soft">Sign in to see your warranties.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-field-border px-4 py-3 text-sm outline-none focus:border-violet-500"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-field-border px-4 py-3 text-sm outline-none focus:border-violet-500"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          {needsConfirmation && (
            <div className="rounded-xl bg-orange-50 p-3 text-sm text-orange-700">
              <p>Please confirm your email before signing in, check your inbox for the link.</p>
              <button
                type="button"
                onClick={handleResend}
                className="mt-2 font-medium underline underline-offset-2"
              >
                Resend confirmation email
              </button>
              {resent && <p className="mt-1 text-xs">Sent! Check your inbox.</p>}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-soft">
          New to Biltro?{" "}
          <Link href="/signup" className="font-medium text-violet-600">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
