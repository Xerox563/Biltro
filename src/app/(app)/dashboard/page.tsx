import { createClient } from "@/lib/supabase/server";
import { Item, getWarrantyStatus } from "@/lib/items";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import ProductGrid from "@/components/dashboard/ProductGrid";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("items")
    .select("*")
    .order("created_at", { ascending: false });

  const items = (data ?? []) as Item[];
  const expiring = items.filter((item) => getWarrantyStatus(item.expiry_date) === "expiring").length;
  const active = items.filter((item) => getWarrantyStatus(item.expiry_date) === "active").length;
  const expired = items.filter((item) => getWarrantyStatus(item.expiry_date) === "expired").length;

  const name = user?.email?.split("@")[0] ?? "there";

  return (
    <div className="mx-auto max-w-6xl">
      <DashboardHeader name={name} />

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard
          index={0}
          icon="📦"
          value={items.length}
          label="Total Products"
          gradient="from-violet-500 to-indigo-500"
          glow="bg-violet-400/40"
        />
        <StatCard
          index={1}
          icon="⏳"
          value={expiring}
          label="Expiring Soon"
          gradient="from-amber-400 to-orange-500"
          glow="bg-amber-400/40"
        />
        <StatCard
          index={2}
          icon="🛡️"
          value={active}
          label="Active Warranties"
          gradient="from-emerald-400 to-teal-500"
          glow="bg-emerald-400/40"
        />
        <StatCard
          index={3}
          icon="⌛"
          value={expired}
          label="Expired"
          gradient="from-rose-400 to-pink-500"
          glow="bg-rose-400/40"
        />
      </div>

      <ProductGrid items={items.slice(0, 8)} />
    </div>
  );
}
