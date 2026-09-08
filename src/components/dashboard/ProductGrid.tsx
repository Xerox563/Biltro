"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Item } from "@/lib/items";
import ProductCard from "@/components/dashboard/ProductCard";

export default function ProductGrid({
  items,
  heading = "Your Products",
  showViewAll = true,
}: {
  items: Item[];
  heading?: string;
  showViewAll?: boolean;
}) {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <motion.h2
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-lg font-bold text-ink"
        >
          {heading}
        </motion.h2>
        {showViewAll && (
          <Link href="/all-products" className="text-sm font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-300">
            View all →
          </Link>
        )}
      </div>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex flex-col items-center gap-3 rounded-3xl border border-line bg-surface p-14 text-center backdrop-blur-xl"
        >
          <motion.span
            animate={{ y: [0, -10, 0], rotate: [0, 4, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-4xl"
          >
            🧾
          </motion.span>
          <p className="font-semibold text-ink">Your vault is empty</p>
          <p className="max-w-xs text-sm text-ink-soft">
            Add your first bill and we&apos;ll track the warranty for you.
          </p>
          <Link
            href="/add-new"
            className="mt-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25"
          >
            Add your first bill
          </Link>
        </motion.div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <ProductCard key={item.id} item={item} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
