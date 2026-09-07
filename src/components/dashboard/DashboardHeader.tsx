"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardHeader({
  name,
  title,
  subtitle,
  eyebrow = "Your vault",
}: {
  name?: string;
  title?: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-500"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-2 text-3xl font-bold tracking-tight text-ink"
        >
          {title ?? (
            <>
              Welcome back, <span className="text-gradient">{name}</span>
            </>
          )}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-1 text-sm text-ink-soft"
        >
          {subtitle ?? "All your warranties in one place. Simple. Organized. Stress-free."}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        <Link
          href="/add-new"
          className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30"
        >
          <motion.span
            aria-hidden
            animate={{ x: ["-120%", "220%"] }}
            transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
            className="absolute inset-y-0 w-1/3 bg-white/25 blur-md"
          />
          <span className="relative">+ Add New Bill</span>
        </Link>
      </motion.div>
    </div>
  );
}
