"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";

export default function AnimatedNumber({
  value,
  delay = 0,
  duration = 1.1,
  format,
}: {
  value: number;
  delay?: number;
  duration?: number;
  format?: (n: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const count = useMotionValue(0);
  const text = useTransform(count, (v) =>
    format ? format(Math.round(v)) : String(Math.round(v))
  );

  /* drives a motion value, not react state, so it stays off the render path */
  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration, delay, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, count, value, delay, duration]);

  return (
    <span ref={ref}>
      <motion.span>{text}</motion.span>
    </span>
  );
}
