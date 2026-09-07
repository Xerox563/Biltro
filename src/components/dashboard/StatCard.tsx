"use client";

import { motion } from "framer-motion";

export default function StatCard({
  icon,
  value,
  label,
  tint,
}: {
  icon: string;
  value: number;
  label: string;
  tint: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm"
    >
      <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${tint}`}>
        {icon}
      </span>
      <div>
        <p className="text-xl font-bold">{value}</p>
        <p className="text-xs text-black/50">{label}</p>
      </div>
    </motion.div>
  );
}
