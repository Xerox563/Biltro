import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Item, getWarrantyStatus } from "@/lib/items";
import StatCard from "@/components/dashboard/StatCard";
import ProductCard from "@/components/dashboard/ProductCard";

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
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {name}!</h1>
          <p className="mt-1 text-sm text-black/60">
            All your warranties in one place. Simple. Organized. Stress-free.
          </p>
        </div>
        <Link
          href="/add-new"
          className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg"
        >
          + Add New Bill
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard icon="📦" value={items.length} label="Total Products" tint="bg-indigo-100" />
        <StatCard icon="⏰" value={expiring} label="Expiring Soon" tint="bg-orange-100" />
        <StatCard icon="✅" value={active} label="Active Warranties" tint="bg-emerald-100" />
        <StatCard icon="⏳" value={expired} label="Expired" tint="bg-red-100" />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Your Products</h2>
        <Link href="/all-products" className="text-sm font-medium text-indigo-600">
          View all
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-4 rounded-2xl bg-white p-10 text-center text-sm text-black/50 shadow-sm">
          You haven&apos;t added any bills yet.{" "}
          <Link href="/add-new" className="font-medium text-indigo-600">
            Add your first one
          </Link>
          .
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.slice(0, 8).map((item, i) => (
            <ProductCard key={item.id} item={item} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
