"use client";

import { motion } from "framer-motion";

const brands = ["SAMSUNG", "Apple", "LG", "boAt", "Dell", "HP", "Mi", "Haier", "Sony", "Bosch"];

export default function BrandStrip() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-surface py-6 sm:py-8">
      <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-soft">
        Works with all your favourite brands
      </p>

      <div className="relative">
        {/* fades the ends so the loop never shows a hard edge */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--background)] to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--background)] to-transparent sm:w-24" />

        <div className="flex overflow-hidden">
          {/* two identical runs, each sliding exactly its own width, so the loop is seamless */}
          {[0, 1].map((copy) => (
            <motion.div
              key={copy}
              aria-hidden={copy === 1}
              animate={{ x: ["0%", "-100%"] }}
              transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
              className="flex shrink-0 items-center gap-8 pr-8 sm:gap-14 sm:pr-14"
            >
              {brands.map((brand) => (
                <span
                  key={brand}
                  className="whitespace-nowrap text-sm font-bold tracking-wide text-ink-soft transition-colors hover:text-ink sm:text-base"
                >
                  {brand}
                </span>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
