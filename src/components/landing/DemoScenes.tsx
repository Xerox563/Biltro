"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

function Chrome({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/70 bg-white/85 shadow-2xl backdrop-blur">
      <div className="flex items-center gap-2 border-b border-black/5 bg-white/70 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 truncate text-[11px] font-medium text-ink-soft">{label}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export function SceneSignIn() {
  return (
    <Chrome label="biltro.app/login">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white">
          🔒
        </span>
        <div className="leading-tight">
          <p className="text-sm font-bold text-ink">Biltro</p>
          <p className="text-[10px] text-ink-soft">Warranty Vault</p>
        </div>
      </div>

      <p className="mt-4 text-lg font-bold text-ink">Welcome back</p>

      <div className="mt-4 space-y-2.5">
        <div className="rounded-xl border border-black/10 px-3 py-2.5 text-xs text-ink">
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            transition={{ duration: 1.1, ease: "linear" }}
            className="inline-block overflow-hidden whitespace-nowrap align-middle"
          >
            amit@gmail.com
          </motion.span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="ml-0.5 inline-block h-3.5 w-px align-middle bg-violet-500"
          />
        </div>

        <motion.div
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="rounded-xl border border-black/10 px-3 py-2.5 text-xs tracking-widest text-ink"
        >
          ••••••••
        </motion.div>

        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 0.96, 1] }}
          transition={{ delay: 2.1, duration: 0.4 }}
          className="relative overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 py-2.5 text-center text-xs font-semibold text-white shadow-lg shadow-violet-500/30"
        >
          <motion.span
            animate={{ x: ["-120%", "220%"] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="absolute inset-y-0 w-1/3 bg-white/25 blur-md"
          />
          <span className="relative">Sign in</span>
        </motion.div>
      </div>
    </Chrome>
  );
}

export function SceneUpload() {
  return (
    <Chrome label="biltro.app/add-new">
      <p className="text-sm font-bold text-ink">Add your warranty</p>
      <p className="text-[11px] text-ink-soft">Drop the bill, we handle the rest.</p>

      <div className="relative mt-4 overflow-hidden rounded-2xl border-2 border-dashed border-violet-300 bg-gradient-to-b from-violet-50/70 to-fuchsia-50/40 p-6">
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        />

        <motion.div
          initial={{ y: -70, x: 40, rotate: -18, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, x: 0, rotate: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease }}
          className="relative mx-auto w-28 rounded-lg bg-white p-2 shadow-xl"
        >
          <div className="h-1.5 w-3/4 rounded bg-ink/70" />
          <div className="mt-1.5 h-1 w-full rounded bg-black/10" />
          <div className="mt-1 h-1 w-5/6 rounded bg-black/10" />
          <div className="mt-2 h-1 w-2/3 rounded bg-violet-300" />
          <div className="mt-1 h-1 w-1/2 rounded bg-black/10" />
        </motion.div>

        <div className="relative mt-4">
          <div className="mx-auto h-1.5 w-40 overflow-hidden rounded-full bg-white shadow-inner">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 1.6, ease: "easeInOut" }}
              className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500"
            />
          </div>
          <p className="mt-2 text-center text-[10px] font-semibold text-violet-600">Uploading bill...</p>
        </div>
      </div>
    </Chrome>
  );
}

const fields = [
  { label: "Product", value: "Samsung 55\" 4K TV" },
  { label: "Shop", value: "Lifestyle Electronics" },
  { label: "Purchased", value: "15 Mar 2024" },
  { label: "Warranty", value: "24 months" },
];

export function SceneExtract() {
  return (
    <Chrome label="Reading your bill">
      <div className="flex gap-4">
        <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-lg bg-white p-2 shadow-lg">
          <div className="h-1.5 w-3/4 rounded bg-ink/70" />
          <div className="mt-1.5 h-1 w-full rounded bg-black/10" />
          <div className="mt-1 h-1 w-5/6 rounded bg-black/10" />
          <div className="mt-2 h-1 w-2/3 rounded bg-violet-300" />
          <div className="mt-1 h-1 w-1/2 rounded bg-black/10" />
          <div className="mt-2 h-1 w-3/4 rounded bg-black/10" />

          <motion.div
            initial={{ top: "-20%" }}
            animate={{ top: "120%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 h-10 w-full bg-gradient-to-b from-transparent via-violet-400/50 to-transparent"
          />
          <motion.div
            initial={{ top: "-20%" }}
            animate={{ top: "120%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 h-0.5 w-full bg-violet-500 shadow-[0_0_10px_2px_rgba(139,92,246,0.8)]"
          />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-1.5">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
              className="text-sm"
            >
              🤖
            </motion.span>
            <p className="text-[11px] font-semibold text-ink">AI is reading it...</p>
          </div>

          {fields.map((field, i) => (
            <motion.div
              key={field.label}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.55, ease }}
              className="rounded-lg bg-gradient-to-r from-violet-50 to-fuchsia-50/60 px-2.5 py-1.5"
            >
              <p className="text-[9px] font-medium text-ink-soft">{field.label}</p>
              <p className="text-[11px] font-bold text-ink">{field.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Chrome>
  );
}

export function SceneSaved() {
  return (
    <Chrome label="Saved">
      <div className="flex flex-col items-center gap-3 py-6">
        <motion.span
          initial={{ scale: 0, rotate: -40 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 14 }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-3xl text-white shadow-xl shadow-emerald-500/40"
        >
          ✓
        </motion.span>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-base font-bold text-emerald-700"
        >
          Saved to your vault
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[11px] text-ink-soft"
        >
          Bill stored. Expiry date calculated.
        </motion.p>
      </div>
    </Chrome>
  );
}

const stats = [
  { icon: "📦", value: "8", label: "Total", glow: "glow-violet" },
  { icon: "⏳", value: "2", label: "Expiring", glow: "glow-amber" },
  { icon: "🛡️", value: "5", label: "Active", glow: "glow-emerald" },
  { icon: "⌛", value: "1", label: "Expired", glow: "glow-rose" },
];

const products = [
  { name: "Samsung TV", left: "2 years left", tone: "bg-emerald-100 text-emerald-700", bar: "from-emerald-400 to-teal-500", w: "78%" },
  { name: "LG 1.5T AC", left: "15 days left", tone: "bg-amber-100 text-amber-700", bar: "from-amber-400 to-orange-500", w: "12%" },
  { name: "iPhone 15", left: "4 months left", tone: "bg-emerald-100 text-emerald-700", bar: "from-emerald-400 to-teal-500", w: "34%" },
];

export function SceneDashboard() {
  return (
    <Chrome label="biltro.app/dashboard">
      <p className="text-sm font-bold text-ink">
        Welcome back, <span className="text-gradient">amit</span>
      </p>

      <div className="mt-3 grid grid-cols-4 gap-1.5">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 14, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.12, type: "spring", stiffness: 260, damping: 20 }}
            className={`rounded-xl bg-white/80 p-2 text-center ${stat.glow}`}
          >
            <p className="text-sm">{stat.icon}</p>
            <p className="text-sm font-bold text-ink">{stat.value}</p>
            <p className="text-[8px] text-ink-soft">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-3 space-y-1.5">
        {products.map((product, i) => (
          <motion.div
            key={product.name}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.18, ease }}
            className="rounded-xl border border-white/70 bg-white/80 p-2.5"
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold text-ink">{product.name}</p>
              <span className={`rounded-full px-2 py-0.5 text-[8px] font-semibold ${product.tone}`}>
                {product.left}
              </span>
            </div>
            <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-black/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: product.w }}
                transition={{ delay: 0.9 + i * 0.18, duration: 0.9, ease: "easeOut" }}
                className={`h-full rounded-full bg-gradient-to-r ${product.bar}`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Chrome>
  );
}

export function SceneReminder() {
  return (
    <Chrome label="Reminder sent">
      <div className="py-3">
        <motion.div
          initial={{ opacity: 0, y: -24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 20 }}
          className="glow-amber flex items-start gap-3 rounded-2xl bg-white p-3.5"
        >
          <motion.span
            animate={{ rotate: [0, -18, 18, -10, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1 }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 text-lg"
          >
            🔔
          </motion.span>
          <div>
            <p className="text-[11px] font-bold text-ink">Your LG AC warranty ends in 15 days</p>
            <p className="mt-0.5 text-[10px] text-ink-soft">
              Get it serviced now while repairs are still free.
            </p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 text-center text-[11px] font-medium text-ink-soft"
        >
          We email you before every warranty runs out.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-1 text-center text-base font-bold text-gradient"
        >
          Never miss a warranty again.
        </motion.p>
      </div>
    </Chrome>
  );
}
