"use client";

import { motion } from "framer-motion";

const features = [
  { icon: "📄", title: "Automatic data extraction", desc: "Our AI reads bills, e-receipts and emails. No manual typing." },
  { icon: "🔔", title: "Smart reminders", desc: "Get notified days or weeks before your warranty expires." },
  { icon: "📁", title: "All your bills in one place", desc: "Find any bill instantly when something breaks." },
  { icon: "👨‍👩‍👧", title: "Family sharing", desc: "Add family members and manage all warranties together." },
  { icon: "✉️", title: "Email integration", desc: "Just forward your e-receipts. We'll take care of the rest." },
  { icon: "📦", title: "Works for everything", desc: "Phones, laptops, home appliances, watches, and more." },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14 text-center"
      >
        <span className="rounded-full bg-violet-100 px-4 py-1 text-xs font-medium text-violet-700">
          Everything you need
        </span>
        <h2 className="mt-4 text-3xl font-bold md:text-4xl">A smarter way to manage warranties</h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-xl">
              {f.icon}
            </span>
            <div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-black/60">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
