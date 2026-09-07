"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Item, formatTimeLeft, getWarrantyStatus } from "@/lib/items";

const statusStyles: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700",
  expiring: "bg-orange-100 text-orange-700",
  expired: "bg-red-100 text-red-700",
};

const statusLabel: Record<string, string> = {
  active: "Active",
  expiring: "Expiring Soon",
  expired: "Expired",
};

export default function ProductCard({ item, index }: { item: Item; index: number }) {
  const status = getWarrantyStatus(item.expiry_date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="rounded-2xl bg-white p-5 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-xl">
          📦
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}>
          {statusLabel[status]}
        </span>
      </div>

      <h3 className="mt-4 font-semibold">{item.product_name}</h3>
      {item.shop_name && <p className="text-xs text-black/50">{item.shop_name}</p>}

      <p className="mt-3 flex items-center gap-1.5 text-xs text-black/60">
        📅 {formatTimeLeft(item.expiry_date)}
      </p>

      <Link
        href={`/all-products/${item.id}`}
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-600"
      >
        View Details →
      </Link>
    </motion.div>
  );
}
