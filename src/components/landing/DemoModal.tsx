"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  SceneDashboard,
  SceneExtract,
  SceneReminder,
  SceneSaved,
  SceneSignIn,
  SceneUpload,
} from "@/components/landing/DemoScenes";

const scenes = [
  { key: "signin", title: "Sign in", caption: "Create your free vault in seconds.", ms: 3600, Scene: SceneSignIn },
  { key: "upload", title: "Upload the bill", caption: "Snap a photo or drop the file in.", ms: 3800, Scene: SceneUpload },
  { key: "extract", title: "AI reads it", caption: "Product, shop, date and warranty, pulled out automatically.", ms: 4200, Scene: SceneExtract },
  { key: "saved", title: "Saved safely", caption: "We work out the exact expiry date for you.", ms: 2600, Scene: SceneSaved },
  { key: "dashboard", title: "Your vault", caption: "Everything you own, with time left on each warranty.", ms: 4400, Scene: SceneDashboard },
  { key: "reminder", title: "Get reminded", caption: "We warn you before a warranty runs out.", ms: 4000, Scene: SceneReminder },
];

const totalSeconds = Math.round(scenes.reduce((sum, scene) => sum + scene.ms, 0) / 1000);

/* state lives here so it resets every time the player mounts */
function DemoPlayer({ onClose }: { onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const goTo = useCallback((i: number) => {
    setIndex(((i % scenes.length) + scenes.length) % scenes.length);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => goTo(index + 1), scenes[index].ms);
    return () => clearTimeout(timer);
  }, [playing, index, goTo]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goTo(index + 1);
      if (e.key === "ArrowLeft") goTo(index - 1);
      if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, goTo, index]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const active = scenes[index];
  const ActiveScene = active.Scene;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 10 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-b from-[#2a1a52] to-[#1a1033] p-6 shadow-2xl sm:p-8"
    >
      <motion.div
        aria-hidden
        animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.15, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet-500/40 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.7, 0.35, 0.7], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-fuchsia-500/35 blur-3xl"
      />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300">
            How Biltro works
          </p>
          <motion.h2
            key={active.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-xl font-bold text-white sm:text-2xl"
          >
            {index + 1}. {active.title}
          </motion.h2>
          <motion.p
            key={active.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-1 text-sm text-white/60"
          >
            {active.caption}
          </motion.p>
        </div>

        <button
          onClick={onClose}
          aria-label="Close"
          className="shrink-0 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-white/80 transition-colors hover:bg-white/20 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="relative mt-6 flex min-h-[19rem] items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.key}
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full justify-center"
          >
            <ActiveScene />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative mt-6 flex items-center gap-3">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="shrink-0 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80 transition-colors hover:bg-white/20"
        >
          {playing ? "❚❚ Pause" : "▶ Play"}
        </button>

        <div className="flex flex-1 gap-1.5">
          {scenes.map((scene, i) => (
            <button
              key={scene.key}
              onClick={() => goTo(i)}
              aria-label={scene.title}
              className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15"
            >
              <motion.div
                key={`${scene.key}-${index}-${playing}`}
                initial={{ width: i < index ? "100%" : "0%" }}
                animate={{ width: i <= index ? "100%" : "0%" }}
                transition={
                  i === index && playing
                    ? { duration: scene.ms / 1000, ease: "linear" }
                    : { duration: 0.3 }
                }
                className="h-full rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"
              />
            </button>
          ))}
        </div>

        <span className="shrink-0 text-[11px] font-medium tabular-nums text-white/50">
          ~{totalSeconds}s
        </span>
      </div>
    </motion.div>
  );
}

export default function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#160c2e]/70 p-4 backdrop-blur-md"
        >
          <DemoPlayer onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
