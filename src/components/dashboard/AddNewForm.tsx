"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import UploadStepper from "@/components/dashboard/UploadStepper";

type Extracted = {
  product_name: string;
  shop_name: string;
  purchase_date: string;
  warranty_months: number;
};

type Stage = "upload" | "uploading" | "extracting" | "confirm" | "saving" | "done";

const stepForStage: Record<Stage, number> = {
  upload: 0,
  uploading: 0,
  extracting: 1,
  confirm: 2,
  saving: 2,
  done: 3,
};

const busyStages: Stage[] = ["uploading", "extracting", "saving"];

function addMonths(date: string, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AddNewForm() {
  const router = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [stage, setStage] = useState<Stage>("upload");
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [form, setForm] = useState<Extracted>({
    product_name: "",
    shop_name: "",
    purchase_date: new Date().toISOString().slice(0, 10),
    warranty_months: 12,
  });

  async function handleFile(selected: File) {
    setFile(selected);
    setError("");
    setDragging(false);
    setPreview(URL.createObjectURL(selected));
    setStage("uploading");
    setProgress(0);

    const tick = setInterval(() => {
      setProgress((p) => Math.min(p + 11, 92));
    }, 100);

    const base64 = await fileToBase64(selected);

    clearInterval(tick);
    setProgress(100);
    await new Promise((r) => setTimeout(r, 420));

    setStage("extracting");

    const res = await fetch("/api/extract-bill", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64: base64 }),
    });

    const data = await res.json();

    if (data.error) {
      setError("We couldn't read this bill automatically. Please fill the details in.");
    } else {
      setForm({
        product_name: data.product_name ?? "",
        shop_name: data.shop_name ?? "",
        purchase_date: data.purchase_date ?? new Date().toISOString().slice(0, 10),
        warranty_months: data.warranty_months ?? 12,
      });
    }

    setStage("confirm");
  }

  async function handleSave() {
    setStage("saving");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    let bill_image_path: string | null = null;

    if (file) {
      const path = `${user.id}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from("bills").upload(path, file);
      if (!uploadError) bill_image_path = path;
    }

    const expiry_date = addMonths(form.purchase_date, Number(form.warranty_months));

    const { error: insertError } = await supabase.from("items").insert({
      user_id: user.id,
      product_name: form.product_name,
      shop_name: form.shop_name || null,
      purchase_date: form.purchase_date,
      warranty_months: Number(form.warranty_months),
      expiry_date,
      bill_image_path,
    });

    if (insertError) {
      setError(insertError.message);
      setStage("confirm");
      return;
    }

    setStage("done");
    await new Promise((r) => setTimeout(r, 1100));

    router.push("/dashboard");
    router.refresh();
  }

  function reset() {
    setStage("upload");
    setPreview("");
    setFile(null);
    setError("");
    setProgress(0);
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_330px]">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="glow-violet rounded-3xl bg-white/70 p-8 backdrop-blur-xl"
      >
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-500"
        >
          Add to vault
        </motion.p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">
          Let&apos;s add your <span className="text-gradient">warranty</span>
        </h1>
        <p className="mt-1 text-sm text-ink-soft">Upload a bill and let AI take care of the rest.</p>

        <AnimatePresence mode="wait">
          {stage === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                const dropped = e.dataTransfer.files[0];
                if (dropped) handleFile(dropped);
              }}
              className={`relative mt-8 cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed p-14 text-center transition-colors ${
                dragging
                  ? "border-fuchsia-400 bg-fuchsia-50/60"
                  : "border-violet-200 bg-gradient-to-b from-violet-50/60 to-fuchsia-50/30"
              }`}
            >
              <motion.div
                aria-hidden
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              />

              <div className="relative flex flex-col items-center gap-3">
                <motion.span
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-2xl text-white shadow-xl shadow-violet-500/30"
                >
                  ☁️
                </motion.span>
                <p className="mt-2 font-semibold text-ink">Drag &amp; drop your bill here</p>
                <p className="text-sm font-medium text-violet-600">or click to upload</p>
                <p className="text-xs text-ink-soft">Supports JPG and PNG images</p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </motion.div>
          )}

          {stage === "uploading" && (
            <motion.div
              key="uploading"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mt-8 flex flex-col items-center gap-5 rounded-3xl bg-gradient-to-b from-violet-50/70 to-white/40 p-12 text-center"
            >
              {preview && (
                <motion.img
                  initial={{ scale: 0.9, opacity: 0, rotate: -3 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  src={preview}
                  alt="Bill preview"
                  className="h-36 rounded-2xl object-contain shadow-xl"
                />
              )}
              <p className="font-semibold text-ink">Uploading your bill...</p>
              <div className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-white shadow-inner">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500"
                />
              </div>
              <p className="text-xs font-semibold tabular-nums text-violet-600">{progress}%</p>
            </motion.div>
          )}

          {stage === "extracting" && (
            <motion.div
              key="extracting"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mt-8 flex flex-col items-center gap-5 rounded-3xl bg-gradient-to-b from-violet-50/70 to-white/40 p-12 text-center"
            >
              {preview && (
                <div className="relative h-48 w-full max-w-xs overflow-hidden rounded-2xl bg-white shadow-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview} alt="Bill preview" className="h-full w-full object-contain" />

                  <motion.div
                    initial={{ top: "-15%" }}
                    animate={{ top: "115%" }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-0 h-16 w-full bg-gradient-to-b from-transparent via-violet-400/45 to-transparent"
                  />
                  <motion.div
                    initial={{ top: "-15%" }}
                    animate={{ top: "115%" }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-0 h-0.5 w-full bg-violet-500/80 shadow-[0_0_12px_2px_rgba(139,92,246,0.7)]"
                  />
                </div>
              )}

              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                  className="text-xl"
                >
                  🤖
                </motion.span>
                <motion.p
                  animate={{ opacity: [0.55, 1, 0.55] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  className="font-semibold text-ink"
                >
                  Reading your bill...
                </motion.p>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {["Product", "Shop", "Purchase date", "Warranty"].map((chip, i) => (
                  <motion.span
                    key={chip}
                    animate={{ opacity: [0.35, 1, 0.35], y: [0, -3, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.25 }}
                    className="rounded-full bg-white px-3 py-1 text-xs font-medium text-violet-600 shadow-sm"
                  >
                    {chip}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {stage === "confirm" && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mt-8 space-y-5"
            >
              <div className="flex items-start gap-4">
                {preview && (
                  <motion.img
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    src={preview}
                    alt="Bill preview"
                    className="h-32 w-32 rounded-2xl object-contain shadow-lg"
                  />
                )}
                <div className="flex-1">
                  <p className="text-sm font-semibold text-ink">
                    {error ? "Couldn't read it automatically" : "Here's what we found"}
                  </p>
                  <p className="mt-1 text-xs text-ink-soft">
                    {error
                      ? "No problem, just fill the details in yourself."
                      : "Double check the details and fix anything we got wrong."}
                  </p>
                  <button
                    onClick={reset}
                    className="mt-3 text-xs font-semibold text-violet-600 hover:text-violet-700"
                  >
                    ← Upload a different bill
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-2xl bg-amber-50 p-3 text-sm text-amber-700">{error}</div>
              )}

              {[
                { key: "product_name", label: "Product name" },
                { key: "shop_name", label: "Shop name" },
              ].map((field, i) => (
                <motion.div
                  key={field.key}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.09 }}
                >
                  <label className="text-xs font-semibold text-ink-soft">{field.label}</label>
                  <input
                    value={form[field.key as keyof Extracted] as string}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="mt-1.5 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.28 }}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <label className="text-xs font-semibold text-ink-soft">Purchase date</label>
                  <input
                    type="date"
                    value={form.purchase_date}
                    onChange={(e) => setForm({ ...form, purchase_date: e.target.value })}
                    className="mt-1.5 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-ink-soft">Warranty (months)</label>
                  <input
                    type="number"
                    min={1}
                    value={form.warranty_months}
                    onChange={(e) => setForm({ ...form, warranty_months: Number(e.target.value) })}
                    className="mt-1.5 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                  />
                </div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                disabled={!form.product_name}
                className="relative w-full overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 disabled:opacity-50"
              >
                <motion.span
                  aria-hidden
                  animate={{ x: ["-120%", "220%"] }}
                  transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.2 }}
                  className="absolute inset-y-0 w-1/3 bg-white/25 blur-md"
                />
                <span className="relative">Save to my vault</span>
              </motion.button>
            </motion.div>
          )}

          {stage === "saving" && (
            <motion.div
              key="saving"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 flex flex-col items-center gap-5 rounded-3xl bg-gradient-to-b from-violet-50/70 to-white/40 p-16 text-center"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-violet-200 border-t-violet-600"
              />
              <p className="font-semibold text-ink">Saving to your vault...</p>
              <p className="text-xs text-ink-soft">Storing your bill securely.</p>
            </motion.div>
          )}

          {stage === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 flex flex-col items-center gap-4 rounded-3xl bg-gradient-to-b from-emerald-50 to-white/40 p-16 text-center"
            >
              <motion.span
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 14 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-3xl text-white shadow-xl shadow-emerald-500/30"
              >
                ✓
              </motion.span>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-lg font-bold text-emerald-700"
              >
                Saved to your vault!
              </motion.p>
              <p className="text-sm text-ink-soft">We&apos;ll remind you before it expires.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }}>
        <UploadStepper current={stepForStage[stage]} busy={busyStages.includes(stage)} />
      </motion.div>
    </div>
  );
}
