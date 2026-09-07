"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Item, formatTimeLeft, getWarrantyStatus } from "@/lib/items";

export default function RemindersList({ items }: { items: Item[] }) {
  return (
    <div className="mx-auto max-w-4xl">
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-500"
      >
        Stay covered
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mt-2 text-3xl font-bold tracking-tight text-ink"
      >
        Reminders
      </motion.h1>
      <p className="mt-1 text-sm text-ink-soft">Warranties expiring soon or already expired.</p>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex flex-col items-center gap-3 rounded-3xl border border-white/60 bg-white/70 p-14 text-center backdrop-blur-xl"
        >
          <motion.span
            animate={{ rotate: [0, -12, 12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-4xl"
          >
            🔔
          </motion.span>
          <p className="font-semibold text-ink">Nothing needs your attention</p>
          <p className="text-sm text-ink-soft">All your warranties are comfortably active.</p>
        </motion.div>
      ) : (
        <div className="mt-8 space-y-3">
          {items.map((item, i) => {
            const status = getWarrantyStatus(item.expiry_date);
            const expired = status === "expired";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/60 bg-white/70 p-4 backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl text-lg ${
                      expired
                        ? "bg-gradient-to-br from-rose-100 to-pink-100"
                        : "bg-gradient-to-br from-amber-100 to-orange-100"
                    }`}
                  >
                    {expired ? "⌛" : "⏳"}
                  </span>
                  <div>
                    <Link
                      href={`/all-products/${item.id}`}
                      className="font-semibold text-ink hover:text-violet-700"
                    >
                      {item.product_name}
                    </Link>
                    <p className="text-xs text-ink-soft">{item.shop_name}</p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                    expired ? "bg-rose-100/80 text-rose-700" : "bg-amber-100/80 text-amber-700"
                  }`}
                >
                  {formatTimeLeft(item.expiry_date)}
                </span>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
