"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-6xl px-5 pb-8 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl bg-gradient-to-r from-[#2e1065] via-[#4c1d95] to-[#701a75] p-7 text-center text-white sm:p-10 md:flex-row md:text-left"
        >
          <motion.div
            aria-hidden
            animate={{ x: ["-30%", "130%"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-y-0 w-1/3 bg-white/10 blur-2xl"
          />
          <div className="relative">
            <h2 className="text-xl font-bold sm:text-2xl">A more organized tomorrow starts today.</h2>
            <p className="mt-1 text-sm text-white/60 sm:text-base">
              Join Biltro and never lose a warranty again.
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="relative w-full md:w-auto">
            <Link
              href="/signup"
              className="block whitespace-nowrap rounded-full bg-white px-6 py-3.5 text-center text-sm font-semibold text-violet-950"
            >
              Get Started Free →
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-ink-soft sm:px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white">
            🔒
          </span>
          <span className="font-semibold text-ink">Biltro</span>
        </div>
        <p>Built with ❤️ for everyday people</p>
      </div>
    </footer>
  );
}
