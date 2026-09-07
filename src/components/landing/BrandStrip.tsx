"use client";

import { motion } from "framer-motion";

const brands = ["SAMSUNG", "Apple", "LG", "boAt", "Dell", "HP", "Mi", "Haier"];

export default function BrandStrip() {
  return (
    <section className="border-y border-black/5 bg-white/60 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 text-sm font-semibold tracking-wide text-black/40"
      >
        {brands.map((brand) => (
          <span key={brand}>{brand}</span>
        ))}
        <span>and more...</span>
      </motion.div>
    </section>
  );
}
