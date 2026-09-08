"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import ThemeToggle from "@/components/ui/ThemeToggle";

const links = [
  { label: "Home", href: "/dashboard", icon: "🏠" },
  { label: "Add New", href: "/add-new", icon: "➕" },
  { label: "All Products", href: "/all-products", icon: "📦" },
  { label: "Reminders", href: "/reminders", icon: "🔔" },
];

export default function MobileNav({
  email,
  itemsUsed,
  itemsLimit,
}: {
  email: string;
  itemsUsed: number;
  itemsLimit: number;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const percent = Math.min(100, (itemsUsed / itemsLimit) * 100);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-line bg-surface px-4 py-3 backdrop-blur-xl lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30">
            🔒
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-ink">Biltro</p>
            <p className="text-[10px] text-ink-soft">Warranty Vault</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-xl border border-line bg-surface"
          >
            <span className="block h-0.5 w-4 rounded-full bg-ink" />
            <span className="block h-0.5 w-4 rounded-full bg-ink" />
            <span className="block h-0.5 w-4 rounded-full bg-ink" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-[#160c2e]/60 backdrop-blur-sm lg:hidden"
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-y-0 right-0 flex w-72 max-w-[85%] flex-col border-l border-line bg-[var(--background)] p-5"
            >
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm font-bold text-ink">Menu</p>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="rounded-full bg-surface-muted px-3 py-1.5 text-sm font-semibold text-ink-soft"
                >
                  ✕
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-1.5">
                {links.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 * i }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                          active
                            ? "bg-gradient-to-r from-violet-100 to-fuchsia-50 text-violet-700 dark:from-violet-500/25 dark:to-fuchsia-500/12 dark:text-violet-300"
                            : "text-ink-soft hover:text-ink"
                        }`}
                      >
                        <span>{link.icon}</span>
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mb-3 rounded-2xl border border-line bg-gradient-to-br from-violet-50 to-fuchsia-50/60 p-4 dark:from-violet-500/14 dark:to-fuchsia-500/8">
                <p className="truncate text-xs font-semibold text-ink">{email}</p>
                <div className="mt-3 flex items-center justify-between text-[11px] font-medium text-ink-soft">
                  <span>Free plan</span>
                  <span>
                    {itemsUsed}/{itemsLimit} items
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500"
                  />
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="rounded-2xl px-4 py-3 text-left text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
              >
                ⎋ Log out
              </button>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
