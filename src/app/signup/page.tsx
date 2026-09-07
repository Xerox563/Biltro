"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl"
      >
        <div className="mb-6 flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-500 text-white">
            🔒
          </span>
          <div className="leading-tight">
            <p className="font-semibold">Biltro</p>
            <p className="text-xs text-black/50">Warranty Vault</p>
          </div>
        </div>

        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="mt-1 text-sm text-black/60">Free for a few items. No credit card required.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-indigo-500"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-indigo-500"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Get Started Free"}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-black/60">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-indigo-600">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
