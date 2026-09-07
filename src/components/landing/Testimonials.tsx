"use client";

import { motion } from "framer-motion";

const testimonials = [
  { quote: "Saved me ₹8,000! I had completely lost the bill for my laptop. Biltro had it saved and I could claim the warranty easily.", name: "Rohan Mehta" },
  { quote: "Super convenient. I just forward my Amazon emails and it automatically adds the warranty. No manual work at all.", name: "Priya Sharma" },
  { quote: "Never miss again. The reminders are a game changer. Got my AC serviced just in time before the warranty expired.", name: "Amit Verma" },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14 text-center"
      >
        <span className="rounded-full bg-violet-100 px-4 py-1 text-xs font-medium text-violet-700">
          Loved by users
        </span>
        <h2 className="mt-4 text-3xl font-bold md:text-4xl">Real people. Real peace of mind.</h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className={`edge-sheen relative overflow-hidden rounded-2xl bg-white/80 p-6 backdrop-blur transition-shadow duration-500 ${["glow-violet", "glow-cyan", "glow-fuchsia"][i % 3]}`}
          >
            <p className="text-sm leading-relaxed text-ink/80">&ldquo;{t.quote}&rdquo;</p>
            <p className="mt-4 text-sm font-semibold text-ink">{t.name}</p>
            <p className="text-xs text-ink-soft">Verified User</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
