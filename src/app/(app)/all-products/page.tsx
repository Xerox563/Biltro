import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Item } from "@/lib/items";
import ProductCard from "@/components/dashboard/ProductCard";

export default async function AllProductsPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("items")
    .select("*")
    .order("created_at", { ascending: false });

  const items = (data ?? []) as Item[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Products</h1>
        <Link
          href="/add-new"
          className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg"
        >
          + Add New Bill
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-white p-10 text-center text-sm text-black/50 shadow-sm">
          You haven&apos;t added any bills yet.{" "}
          <Link href="/add-new" className="font-medium text-indigo-600">
            Add your first one
          </Link>
          .
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.map((item, i) => (
            <ProductCard key={item.id} item={item} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
