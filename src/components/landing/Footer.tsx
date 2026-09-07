"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-6xl px-6 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-gradient-to-r from-[#2e1065] via-[#4c1d95] to-[#701a75] p-10 text-white md:flex-row"
        >
          <div>
            <h2 className="text-2xl font-bold">A more organized tomorrow starts today.</h2>
            <p className="mt-1 text-white/60">Join Biltro and never lose a warranty again.</p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/signup"
              className="whitespace-nowrap rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-violet-950"
            >
              Get Started Free →
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-black/50 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white">
            🔒
          </span>
          <span className="font-semibold text-black/70">Biltro</span>
        </div>
        <p>Built with ❤️ for everyday people</p>
      </div>
    </footer>
  );
}
