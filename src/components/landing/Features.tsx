"use client";

import { motion } from "framer-motion";
import Reveal, { RevealGroup, revealItem } from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";

const features = [
  { icon: "📄", title: "Automatic data extraction", desc: "Our AI reads bills, e-receipts and emails. No manual typing." },
  { icon: "🔔", title: "Smart reminders", desc: "Get notified days or weeks before your warranty expires." },
  { icon: "📁", title: "All your bills in one place", desc: "Find any bill instantly when something breaks." },
  { icon: "👨‍👩‍👧", title: "Family sharing", desc: "Add family members and manage all warranties together." },
  { icon: "✉️", title: "Email integration", desc: "Just forward your e-receipts. We'll take care of the rest." },
  { icon: "📦", title: "Works for everything", desc: "Phones, laptops, home appliances, watches, and more." },
];

const glows = ["glow-violet", "glow-fuchsia", "glow-cyan", "glow-emerald", "glow-amber", "glow-rose"];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
      <Reveal className="mb-10 text-center sm:mb-14">
        <span className="rounded-full bg-violet-100 px-4 py-1 text-xs font-medium text-violet-700 dark:bg-violet-500/18 dark:text-violet-200">
          Everything you need
        </span>
        <h2 className="mt-4 text-2xl font-bold text-ink sm:text-3xl md:text-4xl">
          A smarter way to manage warranties
        </h2>
      </Reveal>

      <RevealGroup className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {features.map((f, i) => (
          <motion.div key={f.title} variants={revealItem}>
            <TiltCard
              className={`edge-sheen relative flex h-full items-start gap-4 overflow-hidden rounded-2xl bg-surface p-5 backdrop-blur transition-shadow duration-500 ${glows[i % glows.length]}`}
            >
              <motion.span
                whileHover={{ rotate: -8, scale: 1.12 }}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-50 to-fuchsia-50 text-xl dark:from-violet-500/20 dark:to-fuchsia-500/15"
              >
                {f.icon}
              </motion.span>
              <div>
                <h3 className="font-semibold text-ink">{f.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{f.desc}</p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </RevealGroup>
    </section>
  );
}
