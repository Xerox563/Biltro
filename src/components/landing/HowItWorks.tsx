"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

const steps = [
  { icon: "📷", title: "Snap or forward", desc: "Take a photo of your bill or forward an e-receipt (email)." },
  { icon: "📄", title: "AI reads it", desc: "We extract product name, shop, purchase date and warranty period automatically." },
  { icon: "☁️", title: "We store it", desc: "Your bills are saved securely with expiry date calculated." },
  { icon: "🔔", title: "Get reminded", desc: "We notify you before it expires, so you can get it serviced if needed." },
];

const glows = ["glow-violet", "glow-fuchsia", "glow-cyan", "glow-emerald"];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 26 });
  const lineWidth = useTransform(progress, [0, 1], ["0%", "100%"]);
  const lineHeight = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
      <Reveal className="mb-10 text-center sm:mb-14">
        <span className="rounded-full bg-violet-100 px-4 py-1 text-xs font-medium text-violet-700 dark:bg-violet-500/18 dark:text-violet-200">
          Simple. Automatic. Magical.
        </span>
        <h2 className="mt-4 text-2xl font-bold text-ink sm:text-3xl md:text-4xl">How Biltro works</h2>
        <p className="mt-2 text-sm text-ink-soft sm:text-base">
          Go from a random bill to peace of mind in seconds.
        </p>
      </Reveal>

      <div ref={ref} className="relative">
        {/* the track fills as you scroll, vertical on phones, horizontal from md up */}
        <div className="absolute bottom-8 left-8 top-8 w-0.5 rounded-full bg-surface-muted md:hidden" />
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-8 top-8 w-0.5 origin-top rounded-full bg-gradient-to-b from-violet-500 via-fuchsia-500 to-cyan-400 md:hidden"
        />

        <div className="absolute inset-x-[12%] top-8 hidden h-0.5 rounded-full bg-surface-muted md:block" />
        <motion.div
          style={{ width: lineWidth }}
          className="absolute left-[12%] top-8 hidden h-0.5 origin-left rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 md:block"
        />

        <div className="relative grid gap-7 sm:gap-8 md:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="flex items-start gap-4 text-left md:block md:text-center"
            >
              <div
                className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-surface text-2xl backdrop-blur transition-shadow duration-500 md:mx-auto ${glows[i % 4]}`}
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.12, type: "spring", stiffness: 400, damping: 16 }}
                  className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-xs font-bold text-white shadow-lg"
                >
                  {i + 1}
                </motion.span>
                {step.icon}
              </div>
              <div className="md:mt-4">
                <h3 className="font-semibold text-ink">{step.title}</h3>
                <p className="mt-1.5 text-sm text-ink-soft md:mt-2">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
