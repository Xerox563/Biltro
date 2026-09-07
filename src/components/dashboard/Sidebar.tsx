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
  { label: "Settings", href: "/settings", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-black/5 bg-white p-5">
      <div className="mb-8 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-500 text-white">
          🔒
        </span>
        <div className="leading-tight">
          <p className="font-semibold">Biltro</p>
          <p className="text-xs text-black/50">Warranty Vault</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} className="relative">
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-indigo-50"
                  transition={{ type: "spring", duration: 0.4 }}
                />
              )}
              <span
                className={`relative flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium ${
                  active ? "text-indigo-700" : "text-black/60 hover:text-black"
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="mb-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-500 p-4 text-white"
      >
        <p className="text-sm font-semibold">Keep your warranties safe</p>
        <p className="mt-1 text-xs text-white/80">Upload bills, stay worry-free.</p>
      </motion.div>

      <button
        onClick={handleLogout}
        className="rounded-xl px-4 py-2.5 text-left text-sm font-medium text-black/50 hover:text-black"
      >
        ⎋ Log out
      </button>
    </aside>
  );
}
