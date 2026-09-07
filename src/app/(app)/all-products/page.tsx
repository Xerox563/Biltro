import { createClient } from "@/lib/supabase/server";
import { Item } from "@/lib/items";
import ProductGrid from "@/components/dashboard/ProductGrid";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default async function AllProductsPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("items")
    .select("*")
    .order("created_at", { ascending: false });

  const items = (data ?? []) as Item[];

  return (
    <div className="mx-auto max-w-6xl">
      <DashboardHeader
        eyebrow="Library"
        title="All Products"
        subtitle="Everything you've saved, newest first."
      />
      <ProductGrid items={items} heading="Saved bills" showViewAll={false} />
    </div>
  );
}
