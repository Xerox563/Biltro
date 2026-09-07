"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

const links = [
  { label: "Home", href: "/dashboard", icon: "🏠" },
  { label: "Add New", href: "/add-new", icon: "➕" },
  { label: "All Products", href: "/all-products", icon: "📦" },
  { label: "Reminders", href: "/reminders", icon: "🔔" },
];

export default function Sidebar({
  email,
  itemsUsed,
  itemsLimit,
}: {
  email: string;
  itemsUsed: number;
  itemsLimit: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const percent = Math.min(100, (itemsUsed / itemsLimit) * 100);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <motion.aside
      initial={{ x: -24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-white/60 bg-white/70 p-5 backdrop-blur-xl"
    >
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center gap-2.5"
      >
        <motion.span
          whileHover={{ rotate: -10, scale: 1.08 }}
          className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30"
        >
          🔒
        </motion.span>
        <div className="leading-tight">
          <p className="font-bold text-ink">Biltro</p>
          <p className="text-[11px] text-ink-soft">Warranty Vault</p>
        </div>
      </motion.div>

      <nav className="flex flex-1 flex-col gap-1.5">
        {links.map((link, i) => {
          const active = pathname === link.href;
          return (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.06 * i }}
            >
              <Link href={link.href} className="relative block">
                {active && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-100 to-fuchsia-50 shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <motion.span
                  whileHover={{ x: 4 }}
                  className={`relative flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                    active ? "text-violet-700" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  <span>{link.icon}</span>
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="sidebar-dot"
                      className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-500"
                    />
                  )}
                </motion.span>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.015 }}
        className="mb-3 rounded-2xl border border-white/70 bg-gradient-to-br from-violet-50 to-fuchsia-50/60 p-4"
      >
        <p className="truncate text-xs font-semibold text-ink">{email}</p>
        <div className="mt-3 flex items-center justify-between text-[11px] font-medium text-ink-soft">
          <span>Free plan</span>
          <span>
            {itemsUsed}/{itemsLimit} items
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/80">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500"
          />
        </div>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.02, x: 2 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleLogout}
        className="rounded-2xl px-4 py-2.5 text-left text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
      >
        ⎋ Log out
      </motion.button>
    </motion.aside>
  );
}
