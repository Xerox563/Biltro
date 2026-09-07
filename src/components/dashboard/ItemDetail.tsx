"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Item, formatDate, formatTimeLeft, getWarrantyStatus } from "@/lib/items";

const statusStyles: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700",
  expiring: "bg-orange-100 text-orange-700",
  expired: "bg-red-100 text-red-700",
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{item.product_name}</h1>
          {item.shop_name && <p className="mt-1 text-sm text-black/50">{item.shop_name}</p>}
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]}`}>
          {formatTimeLeft(item.expiry_date)}
        </span>
      </div>

      {imageUrl && (
        <div className="relative mt-6 h-72 w-full overflow-hidden rounded-2xl bg-black/5">
          <Image src={imageUrl} alt={item.product_name} fill className="object-contain" />
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div className="rounded-xl bg-black/5 p-4">
          <p className="text-black/50">Purchase Date</p>
          <p className="mt-1 font-semibold">{formatDate(item.purchase_date)}</p>
        </div>
        <div className="rounded-xl bg-black/5 p-4">
          <p className="text-black/50">Warranty Period</p>
          <p className="mt-1 font-semibold">{item.warranty_months} months</p>
        </div>
        <div className="rounded-xl bg-black/5 p-4">
          <p className="text-black/50">Expiry Date</p>
          <p className="mt-1 font-semibold">{formatDate(item.expiry_date)}</p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleDelete}
        disabled={deleting}
        className="mt-8 rounded-full border border-red-200 px-5 py-2.5 text-sm font-medium text-red-600 disabled:opacity-60"
      >
        {deleting ? "Removing..." : "Remove item"}
      </motion.button>
    </motion.div>
  );
}
