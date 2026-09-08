"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import DemoModal from "@/components/landing/DemoModal";
import { WordReveal } from "@/components/ui/Reveal";

const items = [
  { name: "LG AC", meta: "2 Year Warranty · 8 months left", warn: false },
  { name: "Warranty expires in 15 days", meta: "", warn: true },
  { name: "Samsung TV", meta: "2 Year Warranty · 8 months left", warn: false },
  { name: "iPhone 15", meta: "1 Year Warranty · 4 months left", warn: false },
  { name: "Dell Laptop", meta: "3 Year Warranty · 1 year left", warn: false },
];

const badges = ["⚡ AI-powered extraction", "🔔 Smart reminders", "🛡️ Safe & secure"];

export default function Hero() {
  const [demoOpen, setDemoOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const phoneY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -90]), {
    stiffness: 90,
    damping: 24,
  });
  const copyY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 60]), {
    stiffness: 90,
    damping: 24,
  });
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-5 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28"
    >
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />

      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-14">
        <motion.div style={{ y: copyY, opacity: fade }}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[11px] font-semibold text-violet-700 backdrop-blur sm:px-4 sm:text-xs dark:text-violet-300"
          >
            <motion.span
              animate={{ scale: [1, 1.35, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-violet-500"
            />
            Your purchases. Always protected.
          </motion.span>

          <h1 className="mt-4 text-[2.6rem] font-bold leading-[1.05] tracking-tight text-ink sm:mt-5 sm:text-5xl lg:text-6xl">
            <WordReveal text="Buy. Store." delay={0.15} />{" "}
            <span className="text-gradient">
              <WordReveal text="Relax." delay={0.45} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mt-5 max-w-md text-base leading-relaxed text-ink-soft sm:mt-6 sm:text-lg"
          >
            Snap a bill. Our AI reads it, stores it, and reminds you before your warranty expires. All
            in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/signup"
                className="relative flex w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#2e1065] to-[#5b21b6] px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-900/25 sm:w-auto sm:py-4"
              >
                <motion.span
                  aria-hidden
                  animate={{ x: ["-120%", "220%"] }}
                  transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.5 }}
                  className="absolute inset-y-0 w-1/3 bg-white/20 blur-md"
                />
                <span className="relative">Get Started Free →</span>
              </Link>
            </motion.div>

            <motion.button
              onClick={() => setDemoOpen(true)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="glow-hover flex w-full items-center justify-center gap-2.5 rounded-full border border-line bg-surface px-6 py-3.5 text-sm font-semibold text-ink backdrop-blur sm:w-auto sm:py-4"
            >
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-[10px] text-white"
              >
                ▶
              </motion.span>
              Watch how it works
            </motion.button>
          </motion.div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-ink-soft sm:mt-10 sm:gap-6 sm:text-sm">
            {badges.map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.05 + i * 0.1 }}
              >
                {badge}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div style={{ y: phoneY }} className="relative flex justify-center">
          <motion.div
            aria-hidden
            animate={{ scale: [1, 1.1, 1], opacity: [0.45, 0.7, 0.45] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-64 w-64 rounded-full bg-gradient-to-br from-violet-400/50 to-fuchsia-400/40 blur-3xl sm:h-80 sm:w-80"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-60 rounded-[2.2rem] border-[7px] border-[#1a1033] bg-surface-solid p-3.5 shadow-2xl sm:w-72 sm:rounded-[2.5rem] sm:border-8 sm:p-4"
            >
              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-ink sm:mb-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 text-xs text-white">
                  🔒
                </span>
                Biltro
              </div>
              <div className="space-y-2">
                {items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className={`rounded-xl p-2.5 text-[11px] sm:p-3 sm:text-xs ${
                      item.warn
                        ? "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
                        : "bg-violet-50/70 text-ink dark:bg-violet-500/12"
                    }`}
                  >
                    <p className="font-semibold">{item.name}</p>
                    {item.meta && <p className="mt-0.5 text-ink-soft">{item.meta}</p>}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { delay: 1.1 },
              scale: { delay: 1.1 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute -right-2 top-8 hidden rounded-2xl border border-line bg-surface p-3 text-xs font-medium shadow-xl backdrop-blur lg:block"
          >
            Never miss a<br />warranty again!
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
