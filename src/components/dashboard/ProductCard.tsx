"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Item, formatTimeLeft, getDaysLeft, getWarrantyStatus } from "@/lib/items";

const statusStyles: Record<string, string> = {
  active: "bg-emerald-100/80 text-emerald-700",
  expiring: "bg-amber-100/80 text-amber-700",
  expired: "bg-rose-100/80 text-rose-700",
};

const statusLabel: Record<string, string> = {
  active: "Active",
  expiring: "Expiring Soon",
  expired: "Expired",
};

const barColor: Record<string, string> = {
  active: "from-emerald-400 to-teal-500",
  expiring: "from-amber-400 to-orange-500",
  expired: "from-rose-400 to-rose-500",
};

const glowByStatus: Record<string, string> = {
  active: "glow-emerald",
  expiring: "glow-amber",
  expired: "glow-rose",
};

export default function ProductCard({ item, index }: { item: Item; index: number }) {
  const status = getWarrantyStatus(item.expiry_date);
  const total = item.warranty_months * 30;
  const left = Math.max(0, getDaysLeft(item.expiry_date));
  const percentLeft = Math.min(100, Math.max(0, (left / total) * 100));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, type: "spring", stiffness: 210, damping: 24 }}
      whileHover={{ y: -6 }}
      className={`group edge-sheen relative overflow-hidden rounded-3xl bg-white/70 p-5 backdrop-blur-xl transition-shadow duration-500 ${glowByStatus[status]}`}
    >

      <div className="flex items-start justify-between">
        <motion.div
          whileHover={{ rotate: -6, scale: 1.06 }}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-100 text-xl"
        >
          📦
        </motion.div>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyles[status]}`}>
          {statusLabel[status]}
        </span>
      </div>

      <h3 className="mt-4 line-clamp-1 font-semibold text-ink">{item.product_name}</h3>
      {item.shop_name && <p className="line-clamp-1 text-xs text-ink-soft">{item.shop_name}</p>}

      <div className="mt-4">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentLeft}%` }}
            transition={{ duration: 1, delay: 0.2 + index * 0.06, ease: "easeOut" }}
            className={`h-full rounded-full bg-gradient-to-r ${barColor[status]}`}
          />
        </div>
        <p className="mt-2 text-xs text-ink-soft">{formatTimeLeft(item.expiry_date)}</p>
      </div>

      <Link
        href={`/all-products/${item.id}`}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-violet-600 transition-all group-hover:gap-2"
      >
        View Details →
      </Link>
    </motion.div>
  );
}
