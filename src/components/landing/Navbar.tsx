"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const links = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQs", href: "#faqs" },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-500 text-white">
            🔒
          </span>
          <div className="leading-tight">
            <p className="font-semibold">Biltro</p>
            <p className="text-xs text-black/50">Warranty Vault</p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-black/70 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-black">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-black/70 hover:text-black">
            Sign in
          </Link>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/signup"
              className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20"
            >
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
