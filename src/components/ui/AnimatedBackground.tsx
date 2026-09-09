"use client";

import { motion } from "framer-motion";
import GlowGrid from "@/components/ui/GlowGrid";
import { useReducedMotionMobile } from "@/lib/useReducedMotionMobile";

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
  const reduced = useReducedMotionMobile();
  /* the huge blur-3xl orbs are the heaviest thing on the page: on phones with
     many backdrop-blur cards already fighting for GPU time, animating their
     scale as well as position was the main flicker source. Mobile keeps just
     one, drifting slowly, with no scale animation. Desktop is unchanged. */
  const activeOrbs = reduced ? orbs.slice(0, 1) : orbs;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--background)" }} />

      {activeOrbs.map((orb, i) => (
        <motion.div
          key={i}
          animate={reduced ? { x: orb.animate.x, y: orb.animate.y } : orb.animate}
          transition={{ duration: reduced ? orb.duration * 1.6 : orb.duration, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: intensity }}
          className={`absolute rounded-full blur-3xl ${orb.className}`}
        />
      ))}

      {!reduced && (
        <>
          {/* soft light bleeding in from both edges */}
          <motion.div
            animate={{ opacity: [0.45, 0.8, 0.45] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-y-0 left-0 w-56 bg-[linear-gradient(to_right,rgba(139,92,246,0.28),transparent)] blur-2xl"
          />
          <motion.div
            animate={{ opacity: [0.8, 0.45, 0.8] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-y-0 right-0 w-56 bg-[linear-gradient(to_left,rgba(217,70,239,0.26),transparent)] blur-2xl"
          />
          <motion.div
            animate={{ opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(to_top,rgba(6,182,212,0.22),transparent)] blur-2xl"
          />
        </>
      )}

      <GlowGrid intensity={intensity} />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--veil-top), transparent, var(--veil-bottom))",
        }}
      />
    </div>
  );
}
