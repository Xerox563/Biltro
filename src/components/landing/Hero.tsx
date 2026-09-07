"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const items = [
  { name: "LG AC", meta: "2 Year Warranty · 8 months left", warn: false },
  { name: "Warranty expires in 15 days", meta: "", warn: true },
  { name: "Samsung TV", meta: "2 Year Warranty · 8 months left", warn: false },
  { name: "iPhone 15", meta: "1 Year Warranty · 4 months left", warn: false },
  { name: "Dell Laptop", meta: "3 Year Warranty · 1 year left", warn: false },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-1.5 text-xs font-semibold text-violet-700 backdrop-blur"
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-violet-500"
            />
            Your purchases. Always protected.
          </motion.span>

          <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl">
            Buy. Store.{" "}
            <span className="text-gradient">Relax.</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            Snap a bill. Our AI reads it, stores it, and reminds you before your warranty expires. All in one place.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/signup"
                className="relative inline-flex overflow-hidden rounded-full bg-gradient-to-r from-[#2e1065] to-[#5b21b6] px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-violet-900/25"
              >
                <motion.span
                  aria-hidden
                  animate={{ x: ["-120%", "220%"] }}
                  transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.5 }}
                  className="absolute inset-y-0 w-1/3 bg-white/20 blur-md"
                />
                <span className="relative">Get Started Free →</span>
              </Link>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-6 py-4 text-sm font-semibold text-ink backdrop-blur"
            >
              ▶ Watch 1 min video
            </motion.button>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm font-medium text-ink-soft">
            <span>⚡ AI-powered extraction</span>
            <span>🔔 Smart reminders</span>
            <span>🛡️ Safe &amp; secure</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative flex justify-center"
        >
          <motion.div
            aria-hidden
            animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.75, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-80 w-80 rounded-full bg-gradient-to-br from-violet-400/50 to-fuchsia-400/40 blur-3xl"
          />

          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-72 rounded-[2.5rem] border-8 border-[#1a1033] bg-white p-4 shadow-2xl"
          >
            <div className="mb-4 flex items-center gap-2 text-sm font-bold text-ink">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 text-xs text-white">
                🔒
              </span>
              Biltro
            </div>
            <div className="space-y-2">
              {items.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.12 }}
                  className={`rounded-xl p-3 text-xs ${
                    item.warn ? "bg-amber-50 text-amber-700" : "bg-violet-50/70 text-ink"
                  }`}
                >
                  <p className="font-semibold">{item.name}</p>
                  {item.meta && <p className="mt-0.5 text-ink-soft">{item.meta}</p>}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
            transition={{ opacity: { delay: 1 }, scale: { delay: 1 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute -right-2 top-8 hidden rounded-2xl border border-white/70 bg-white/90 p-3 text-xs font-medium shadow-xl backdrop-blur md:block"
          >
            Never miss a<br />warranty again!
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
