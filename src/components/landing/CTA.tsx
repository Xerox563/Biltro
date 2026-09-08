"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-5 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-violet-50 p-7 dark:bg-violet-500/10 sm:p-10 md:flex-row"
      >
        <div>
          <h2 className="text-xl font-bold text-ink sm:text-2xl">Stop losing bills. Start staying covered.</h2>
          <p className="mt-1 text-ink-soft">Join thousands of smart buyers who never miss a warranty.</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Link
            href="/signup"
            className="whitespace-nowrap rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg"
          >
            Get Started Free →
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
