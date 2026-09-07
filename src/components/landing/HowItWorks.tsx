"use client";

import { motion } from "framer-motion";

const steps = [
  { icon: "📷", title: "Snap or forward", desc: "Take a photo of your bill or forward an e-receipt (email)." },
  { icon: "📄", title: "AI reads it", desc: "We extract product name, shop, purchase date and warranty period automatically." },
  { icon: "☁️", title: "We store it", desc: "Your bills are saved securely with expiry date calculated." },
  { icon: "🔔", title: "Get reminded", desc: "We notify you before it expires, so you can get it serviced if needed." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14 text-center"
      >
        <span className="rounded-full bg-violet-100 px-4 py-1 text-xs font-medium text-violet-700">
          Simple. Automatic. Magical.
        </span>
        <h2 className="mt-4 text-3xl font-bold md:text-4xl">How Biltro works</h2>
        <p className="mt-2 text-black/60">Go from a random bill to peace of mind in seconds.</p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-4">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            whileHover={{ y: -6 }}
            className="text-center"
          >
            <div
              className={`relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/85 text-2xl backdrop-blur transition-shadow duration-500 ${
                ["glow-violet", "glow-fuchsia", "glow-cyan", "glow-emerald"][i % 4]
              }`}
            >
              <span className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-xs font-bold text-white shadow-lg">
                {i + 1}
              </span>
              {step.icon}
            </div>
            <h3 className="mt-4 font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 text-sm text-ink-soft">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
