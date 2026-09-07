"use client";

import { motion } from "framer-motion";
import AnimatedNumber from "@/components/ui/AnimatedNumber";

export default function StatCard({
  icon,
  value,
  label,
  gradient,
  glow,
  ring,
  index = 0,
}: {
  icon: string;
  value: number;
  label: string;
  gradient: string;
  glow: string;
  ring: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 220, damping: 22 }}
      whileHover={{ y: -6 }}
      className={`group relative overflow-hidden rounded-3xl bg-white/70 p-5 backdrop-blur-xl transition-shadow duration-500 ${ring}`}
    >
      <motion.div
        aria-hidden
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -right-8 -top-10 h-28 w-28 rounded-full blur-2xl ${glow}`}
      />

      <div className="relative flex items-center gap-3">
        <motion.span
          whileHover={{ rotate: -8, scale: 1.08 }}
          className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-lg shadow-lg ${gradient}`}
        >
          {icon}
        </motion.span>
        <div>
          <p className="text-2xl font-bold tracking-tight text-ink">
            <AnimatedNumber value={value} delay={index * 0.08} />
          </p>
          <p className="text-xs font-medium text-ink-soft">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}
