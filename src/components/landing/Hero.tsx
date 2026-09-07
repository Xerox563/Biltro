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
    <section className="relative overflow-hidden px-6 pt-16 pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block rounded-full bg-indigo-100 px-4 py-1 text-xs font-medium text-indigo-700"
          >
            Your purchases. Always protected.
          </motion.span>

          <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-6xl">
            Buy. Store.{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
              Relax.
            </span>
          </h1>

          <p className="mt-5 max-w-md text-lg text-black/60">
            Snap a bill. Our AI reads it, stores it, and reminds you before your warranty expires. All in one place.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/signup"
                className="rounded-full bg-gradient-to-r from-indigo-950 to-indigo-800 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-indigo-900/20"
              >
                Get Started Free →
              </Link>
            </motion.div>
            <button className="flex items-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-medium shadow-sm">
              ▶ Watch 1 min video
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-black/60">
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
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="w-72 rounded-[2.5rem] border-8 border-black bg-white p-4 shadow-2xl"
          >
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
              <span>🔒</span> Biltro
            </div>
            <div className="space-y-2">
              {items.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.12 }}
                  className={`rounded-xl p-3 text-xs ${
                    item.warn ? "bg-orange-50 text-orange-700" : "bg-black/5"
                  }`}
                >
                  <p className="font-semibold">{item.name}</p>
                  {item.meta && <p className="mt-0.5 text-black/50">{item.meta}</p>}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="absolute -right-4 top-6 hidden rounded-2xl bg-white p-3 text-xs shadow-xl md:block"
          >
            Never miss a<br />warranty again!
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
