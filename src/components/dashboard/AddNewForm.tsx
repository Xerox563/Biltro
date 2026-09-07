"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

type Extracted = {
  product_name: string;
  shop_name: string;
  purchase_date: string;
  warranty_months: number;
};

const steps = [
  { icon: "📷", title: "Upload bill", desc: "Add a photo, forward an email, or connect your inbox." },
  { icon: "🤖", title: "AI extracts details", desc: "We read product, shop, purchase date & warranty period." },
  { icon: "💾", title: "We save it", desc: "Everything is stored safely in your vault." },
  { icon: "🔔", title: "Get reminders", desc: "We'll notify you before your warranty expires." },
];

function addMonths(date: string, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
}

export default function AddNewForm() {
  const router = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [stage, setStage] = useState<"upload" | "extracting" | "confirm" | "saving">("upload");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
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
    setStage("extracting");

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setPreview(base64);

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
    };
    reader.readAsDataURL(selected);
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

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_320px]">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-white p-8 shadow-sm"
      >
        <h1 className="text-2xl font-bold">
          Let&apos;s add your{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
            first warranty
          </span>
        </h1>
        <p className="mt-1 text-sm text-black/60">Upload a bill and let AI take care of the rest.</p>

        <AnimatePresence mode="wait">
          {stage === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const dropped = e.dataTransfer.files[0];
                if (dropped) handleFile(dropped);
              }}
              className="mt-6 flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/40 p-12 text-center"
            >
              <span className="text-3xl">☁️</span>
              <p className="font-medium">Drag &amp; drop your bill here</p>
              <p className="text-sm text-indigo-600">or click to upload</p>
              <p className="text-xs text-black/40">Supports images (JPG, PNG)</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </motion.div>
          )}

          {stage === "extracting" && (
            <motion.div
              key="extracting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 flex flex-col items-center gap-4 rounded-2xl bg-indigo-50/40 p-12 text-center"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className="text-3xl"
              >
                🤖
              </motion.span>
              <p className="font-medium">Reading your bill...</p>
              <p className="text-sm text-black/50">This takes a few seconds.</p>
            </motion.div>
          )}

          {(stage === "confirm" || stage === "saving") && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 space-y-4"
            >
              {preview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="Bill preview" className="h-40 rounded-xl object-contain" />
              )}

              {error && <p className="text-sm text-orange-600">{error}</p>}

              <div>
                <label className="text-xs font-medium text-black/50">Product name</label>
                <input
                  value={form.product_name}
                  onChange={(e) => setForm({ ...form, product_name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-black/50">Shop name</label>
                <input
                  value={form.shop_name}
                  onChange={(e) => setForm({ ...form, shop_name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-black/50">Purchase date</label>
                  <input
                    type="date"
                    value={form.purchase_date}
                    onChange={(e) => setForm({ ...form, purchase_date: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-black/50">Warranty (months)</label>
                  <input
                    type="number"
                    min={1}
                    value={form.warranty_months}
                    onChange={(e) => setForm({ ...form, warranty_months: Number(e.target.value) })}
                    className="mt-1 w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                disabled={stage === "saving" || !form.product_name}
                className="w-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-60"
              >
                {stage === "saving" ? "Saving..." : "Save to my vault"}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        className="h-fit rounded-3xl bg-white p-6 shadow-sm"
      >
        <h2 className="font-semibold">How it works</h2>
        <div className="mt-4 space-y-5">
          {steps.map((step, i) => (
            <div key={step.title} className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-lg">
                {step.icon}
              </span>
              <div>
                <p className="text-sm font-medium">
                  {i + 1}. {step.title}
                </p>
                <p className="text-xs text-black/50">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
