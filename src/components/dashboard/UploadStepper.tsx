"use client";

import { motion } from "framer-motion";

const steps = [
  { icon: "📷", title: "Upload bill", desc: "Snap a photo or drop the file in." },
  { icon: "🤖", title: "AI reads it", desc: "Product, shop, date and warranty period." },
  { icon: "💾", title: "We save it", desc: "Stored safely in your vault." },
  { icon: "🔔", title: "Get reminders", desc: "We warn you before it expires." },
];

export default function UploadStepper({ current, busy }: { current: number; busy: boolean }) {
  return (
    <div className="glow-cyan h-fit rounded-3xl bg-white/70 p-6 backdrop-blur-xl">
      <h2 className="font-bold text-ink">How it works</h2>
      <p className="mt-1 text-xs text-ink-soft">We&apos;ll walk through it together.</p>

      <div className="relative mt-6">
        <div className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-0.5 rounded-full bg-black/5" />
        <motion.div
          animate={{ height: `${(current / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute left-[19px] top-2 w-0.5 rounded-full bg-gradient-to-b from-violet-500 to-fuchsia-500"
        />

        <div className="space-y-6">
          {steps.map((step, i) => {
            const done = i < current;
            const active = i === current;

            return (
              <div key={step.title} className="relative flex gap-3">
                <div className="relative z-10">
                  {active && busy && (
                    <motion.span
                      animate={{ scale: [1, 1.45, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-2xl bg-violet-400"
                    />
                  )}
                  <motion.span
                    animate={{
                      scale: active ? 1.06 : 1,
                    }}
                    className={`relative flex h-10 w-10 items-center justify-center rounded-2xl text-lg transition-colors ${
                      done
                        ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-500/25"
                        : active
                          ? "bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30"
                          : "bg-black/5 text-ink-soft"
                    }`}
                  >
                    {done ? (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 16 }}>
                        ✓
                      </motion.span>
                    ) : (
                      step.icon
                    )}
                  </motion.span>
                </div>

                <div className="pt-0.5">
                  <p
                    className={`text-sm font-semibold transition-colors ${
                      active ? "text-violet-700" : done ? "text-ink" : "text-ink-soft"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-ink-soft">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
