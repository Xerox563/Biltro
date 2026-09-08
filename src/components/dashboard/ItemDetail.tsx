"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Item, formatDate, formatTimeLeft, getWarrantyStatus } from "@/lib/items";

const statusStyles: Record<string, string> = {
  active: "bg-emerald-100/80 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
  expiring: "bg-amber-100/80 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
  expired: "bg-rose-100/80 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
};

export default function ItemDetail({ item, imageUrl }: { item: Item; imageUrl: string | null }) {
  const router = useRouter();
  const supabase = createClient();
  const [deleting, setDeleting] = useState(false);
  const status = getWarrantyStatus(item.expiry_date);

  async function handleDelete() {
    setDeleting(true);
    await supabase.from("items").delete().eq("id", item.id);
    router.push("/all-products");
    router.refresh();
  }

  const facts = [
    { label: "Purchase Date", value: formatDate(item.purchase_date), icon: "🗓️" },
    { label: "Warranty Period", value: `${item.warranty_months} months`, icon: "🛡️" },
    { label: "Expiry Date", value: formatDate(item.expiry_date), icon: "⌛" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-3xl"
    >
      <Link
        href="/all-products"
        className="text-sm font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-300"
      >
        ← Back to products
      </Link>

      <div className="mt-4 rounded-3xl border border-line bg-surface p-8 shadow-[0_10px_40px_-16px_rgba(76,29,149,0.25)] backdrop-blur-xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <motion.span
              whileHover={{ rotate: -6, scale: 1.05 }}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-500/25 dark:to-fuchsia-500/18 text-2xl"
            >
              📦
            </motion.span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-ink">{item.product_name}</h1>
              {item.shop_name && <p className="text-sm text-ink-soft">{item.shop_name}</p>}
            </div>
          </div>
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${statusStyles[status]}`}
          >
            {formatTimeLeft(item.expiry_date)}
          </motion.span>
        </div>

        {imageUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="relative mt-6 h-80 w-full overflow-hidden rounded-2xl bg-white shadow-inner"
          >
            <Image src={imageUrl} alt={item.product_name} fill className="object-contain" />
          </motion.div>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {facts.map((fact, i) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.07 }}
              whileHover={{ y: -3 }}
              className="rounded-2xl bg-gradient-to-br from-violet-50/80 to-fuchsia-50/50 dark:from-violet-500/12 dark:to-fuchsia-500/10 p-4"
            >
              <p className="text-xs font-medium text-ink-soft">
                {fact.icon} {fact.label}
              </p>
              <p className="mt-1.5 font-bold text-ink">{fact.value}</p>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDelete}
          disabled={deleting}
          className="mt-8 rounded-full border border-rose-200 px-5 py-2.5 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50 disabled:opacity-60"
        >
          {deleting ? "Removing..." : "Remove item"}
        </motion.button>
      </div>
    </motion.div>
  );
}
