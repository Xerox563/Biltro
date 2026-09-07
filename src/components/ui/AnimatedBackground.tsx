"use client";

import { motion } from "framer-motion";

const orbs = [
  {
    className: "left-[-10%] top-[-15%] h-[38rem] w-[38rem] bg-[radial-gradient(circle_at_center,#a78bfa,transparent_65%)]",
    animate: { x: [0, 90, -40, 0], y: [0, 60, 30, 0], scale: [1, 1.12, 0.95, 1] },
    duration: 26,
  },
  {
    className: "right-[-12%] top-[5%] h-[32rem] w-[32rem] bg-[radial-gradient(circle_at_center,#f0abfc,transparent_65%)]",
    animate: { x: [0, -70, 40, 0], y: [0, 80, -30, 0], scale: [1, 0.92, 1.1, 1] },
    duration: 31,
  },
  {
    className: "bottom-[-20%] left-[25%] h-[34rem] w-[34rem] bg-[radial-gradient(circle_at_center,#67e8f9,transparent_65%)]",
    animate: { x: [0, 60, -60, 0], y: [0, -50, 20, 0], scale: [1, 1.08, 0.9, 1] },
    duration: 35,
  },
];

export default function AnimatedBackground({ intensity = 0.5 }: { intensity?: number }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#f8f7fd]" />

      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          animate={orb.animate}
          transition={{ duration: orb.duration, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: intensity }}
          className={`absolute rounded-full blur-3xl ${orb.className}`}
        />
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(124,58,237,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(124,58,237,0.045)_1px,transparent_1px)] bg-[size:56px_56px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60" />
    </div>
  );
}
