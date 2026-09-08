"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import AnimatedNumber from "@/components/ui/AnimatedNumber";

/* where each bill starts out before the section pulls it into line */
const bills = [
  { label: "Fridge bill", sub: "Aug 2024", x: -150, y: -46, rotate: -17, tint: "from-violet-100 to-fuchsia-100 dark:from-violet-500/25 dark:to-fuchsia-500/15" },
  { label: "AC warranty card", sub: "Mar 2024", x: 138, y: 18, rotate: 15, tint: "from-cyan-100 to-sky-100 dark:from-cyan-500/25 dark:to-sky-500/15" },
  { label: "Laptop invoice", sub: "Jan 2024", x: -104, y: 96, rotate: 10, tint: "from-emerald-100 to-teal-100 dark:from-emerald-500/25 dark:to-teal-500/15" },
  { label: "Phone receipt", sub: "Jul 2024", x: 158, y: -96, rotate: -9, tint: "from-amber-100 to-orange-100 dark:from-amber-500/25 dark:to-orange-500/15" },
];

const problems = [
  "The bill is in a drawer somewhere",
  "Nobody remembers the expiry date",
  "No proof means no free repair",
];

const solutions = [
  "Snapped once, saved forever",
  "We count the days down for you",
  "Proof ready in two seconds",
];

function BillCard({
  bill,
  index,
  progress,
}: {
  bill: (typeof bills)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  /* each card lands slightly after the one before it */
  const start = index * 0.08;
  const end = 0.72 + index * 0.06;

  const x = useTransform(progress, [start, end], [bill.x, 0]);
  const y = useTransform(progress, [start, end], [bill.y, index * 62 - 93]);
  const rotate = useTransform(progress, [start, end], [bill.rotate, 0]);
  const saturate = useTransform(progress, [start, end], [0.15, 1]);
  const filter = useTransform(saturate, (s) => `saturate(${s})`);
  const checkOpacity = useTransform(progress, [end - 0.12, end], [0, 1]);
  const checkScale = useTransform(progress, [end - 0.12, end], [0.4, 1]);

  return (
    <motion.div
      style={{ x, y, rotate, filter }}
      className="absolute left-1/2 top-1/2 -ml-[105px] w-[210px] rounded-2xl border border-line bg-surface p-3.5 shadow-xl backdrop-blur-xl"
    >
      <div className="flex items-center gap-2.5">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-base ${bill.tint}`}
        >
          🧾
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-bold text-ink">{bill.label}</p>
          <p className="font-mono text-[10px] text-ink-soft">{bill.sub}</p>
        </div>
        <motion.span
          style={{ opacity: checkOpacity, scale: checkScale }}
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-[10px] text-white"
        >
          ✓
        </motion.span>
      </div>
    </motion.div>
  );
}

export default function ProblemSolution() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 26 });

  const chaosOpacity = useTransform(progress, [0, 0.45], [1, 0]);
  const orderOpacity = useTransform(progress, [0.55, 1], [0, 1]);

  return (
    <section className="relative mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
      {/* heading, three type styles on purpose: mono label, sans weight, serif italic */}
      <div className="mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-violet-500"
        >
          The real problem
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl md:text-5xl"
        >
          You already paid for the warranty.
          <br />
          <span className="font-serif text-gradient text-4xl italic sm:text-5xl md:text-6xl">
            You just can&apos;t prove it.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-ink-soft sm:text-base"
        >
          Every appliance you own came with free repairs for years. Almost nobody claims them,
          because by the time something breaks the paperwork is long gone.
        </motion.p>
      </div>

      {/* the same bills, scattered at first, pulled into line as you scroll */}
      <div ref={ref} className="relative mt-12 h-[420px] sm:mt-16 sm:h-[440px]">
        <motion.p
          style={{ opacity: chaosOpacity }}
          className="absolute inset-x-0 top-0 text-center font-serif text-lg italic text-ink-soft sm:text-xl"
        >
          Somewhere in a drawer...
        </motion.p>

        <motion.p
          style={{ opacity: orderOpacity }}
          className="absolute inset-x-0 top-0 text-center font-serif text-lg italic text-violet-600 sm:text-xl dark:text-violet-300"
        >
          ...all in one place.
        </motion.p>

        <div className="relative h-full">
          {bills.map((bill, i) => (
            <BillCard key={bill.label} bill={bill} index={i} progress={progress} />
          ))}
        </div>
      </div>

      {/* the money people quietly lose, counts up when it comes into view */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glow-amber mx-auto mt-4 max-w-md rounded-3xl bg-surface p-6 text-center backdrop-blur-xl"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-soft">
          Paid out of pocket, on average
        </p>
        <p className="mt-2 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          ₹<AnimatedNumber value={8000} duration={1.6} format={(n) => n.toLocaleString("en-IN")} />
        </p>
        <p className="mt-1 text-xs text-ink-soft">
          on a repair that was <span className="font-serif italic">already covered</span>
        </p>
      </motion.div>

      {/* before and after, side by side */}
      <div className="mt-12 grid gap-4 sm:gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-line bg-surface p-6 backdrop-blur-xl sm:p-7"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-soft">Without Biltro</p>
          <h3 className="mt-2 text-xl font-bold text-ink">
            You <span className="font-serif italic text-rose-500">lose</span> the claim
          </h3>

          <ul className="mt-5 space-y-3.5">
            {problems.map((problem, i) => (
              <motion.li
                key={problem}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.12 }}
                className="flex items-start gap-3 text-sm text-ink-soft"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-[10px] text-rose-600 dark:bg-rose-500/20 dark:text-rose-300">
                  ✕
                </span>
                <span className="relative">
                  {problem}
                  {/* the line strikes itself through */}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.12, duration: 0.5, ease: "easeInOut" }}
                    className="absolute left-0 top-1/2 h-px w-full origin-left bg-rose-400/70"
                  />
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glow-emerald rounded-3xl bg-surface p-6 backdrop-blur-xl sm:p-7"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-600 dark:text-emerald-400">
            With Biltro
          </p>
          <h3 className="mt-2 text-xl font-bold text-ink">
            You <span className="font-serif italic text-gradient">keep</span> what you paid for
          </h3>

          <ul className="mt-5 space-y-3.5">
            {solutions.map((solution, i) => (
              <motion.li
                key={solution}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.12 }}
                className="flex items-start gap-3 text-sm text-ink"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 400, damping: 15 }}
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-[10px] text-white"
                >
                  ✓
                </motion.span>
                {solution}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
