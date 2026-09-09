"use client";

import { motion } from "framer-motion";
import { useReducedMotionMobile } from "@/lib/useReducedMotionMobile";

const CELL = 56;

/* keeps only the 1px grid lines, so whatever sits behind it
   reads as the lines themselves rather than a block of colour */
const gridMask = {
  WebkitMaskImage:
    "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
  maskImage:
    "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
  WebkitMaskSize: `${CELL}px ${CELL}px, ${CELL}px ${CELL}px`,
  maskSize: `${CELL}px ${CELL}px, ${CELL}px ${CELL}px`,
} as const;

/* two identical halves, so translating by exactly half the width loops with no jump */
const flowGradient =
  "linear-gradient(to right, #7c3aed 0%, #d946ef 12.5%, #06b6d4 25%, #d946ef 37.5%, #7c3aed 50%, #d946ef 62.5%, #06b6d4 75%, #d946ef 87.5%, #7c3aed 100%)";

const beams = [
  { axis: "v", offset: 3 * CELL, from: "left", color: "#a78bfa", duration: 9, delay: 0 },
  { axis: "v", offset: 11 * CELL, from: "left", color: "#67e8f9", duration: 12, delay: 3.5 },
  { axis: "v", offset: 5 * CELL, from: "right", color: "#f0abfc", duration: 11, delay: 6 },
  { axis: "h", offset: 4 * CELL, from: "top", color: "#c084fc", duration: 13, delay: 1.5 },
  { axis: "h", offset: 9 * CELL, from: "bottom", color: "#22d3ee", duration: 15, delay: 7 },
] as const;

/* the mask sits on the static parent, the colour slides underneath on the GPU,
   so the lines stay put while the light moves through them */
function FlowLayer({
  opacity,
  blur,
  duration,
  gradient,
}: {
  opacity: number;
  blur?: number;
  duration: number;
  gradient: string;
}) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ ...gridMask, opacity, filter: blur ? `blur(${blur}px)` : undefined }}
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        style={{ backgroundImage: gradient, width: "300%" }}
        className="absolute inset-y-0 left-0"
      />
    </div>
  );
}

export default function GlowGrid({ intensity = 0.5 }: { intensity?: number }) {
  const reduced = useReducedMotionMobile();

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* the plain grid, barely there, colour comes from the var so it flips with the theme */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: `${CELL}px ${CELL}px`,
        }}
      />

      {/* the lines themselves (dropped the separate blurred bloom layer underneath;
          it doubled the animated full-viewport repaint cost for a bloom that was
          barely visible, and was the main source of flicker on Android) */}
      <FlowLayer opacity={0.3 * intensity} duration={40} gradient={flowGradient} />

      {/* phones with many backdrop-blur cards on screen at once can't keep up with
          these extra full-viewport animated layers underneath them, so they're
          skipped there; desktop keeps the full effect */}
      {!reduced && (
        <>
          {/* uneven brightness drifting across, so the glow is stronger here and softer there */}
          <div className="absolute inset-0 overflow-hidden" style={{ ...gridMask, opacity: 0.3 * intensity }}>
            <motion.div
              animate={{ x: ["-10%", "10%", "-10%"], y: ["-8%", "8%", "-8%"], opacity: [0.4, 0.85, 0.4] }}
              transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-1/4"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 40%, #d946ef 0%, transparent 42%), radial-gradient(circle at 72% 68%, #06b6d4 0%, transparent 42%)",
              }}
            />
          </div>

          {beams.map((beam, i) => {
        const vertical = beam.axis === "v";
        const position = vertical
          ? { [beam.from]: beam.offset, top: 0, bottom: 0, width: 1 }
          : { [beam.from]: beam.offset, left: 0, right: 0, height: 1 };

        return (
          <motion.div
            key={i}
            initial={vertical ? { y: "-35%" } : { x: "-35%" }}
            animate={vertical ? { y: "135%" } : { x: "135%" }}
            transition={{
              duration: beam.duration,
              delay: beam.delay,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut",
            }}
            style={{ ...position, position: "absolute", opacity: 0.45 * intensity }}
          >
            <div
              style={{
                background: vertical
                  ? `linear-gradient(to bottom, transparent, ${beam.color}, transparent)`
                  : `linear-gradient(to right, transparent, ${beam.color}, transparent)`,
                boxShadow: `0 0 12px 2px ${beam.color}`,
                width: vertical ? 1 : "34%",
                height: vertical ? "34%" : 1,
              }}
            />
          </motion.div>
            );
          })}
        </>
      )}
    </div>
  );
}
