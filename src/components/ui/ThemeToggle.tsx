"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";

type Theme = "light" | "dark";

/* the <html> class is the single source of truth, set by the inline script
   in the layout before first paint. every toggle on the page subscribes to it. */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/* the server always renders the light markup, react swaps it right after hydration */
function getServerSnapshot(): Theme {
  return "light";
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const dark = theme === "dark";

  function toggle() {
    const next: Theme = dark ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("biltro-theme", next);
    } catch {
      // storage can be blocked, the toggle still works for this visit
    }
    listeners.forEach((notify) => notify());
  }

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.92 }}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative flex h-9 w-16 shrink-0 items-center rounded-full border border-line bg-surface px-1 backdrop-blur transition-colors ${className}`}
    >
      <motion.span
        animate={{ x: dark ? 28 : 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs shadow-lg ${
          dark
            ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-violet-500/40"
            : "bg-gradient-to-br from-amber-300 to-orange-400 shadow-amber-500/40"
        }`}
      >
        {dark ? "🌙" : "☀️"}
      </motion.span>
    </motion.button>
  );
}
