import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { FREE_ITEM_LIMIT } from "@/lib/plan";
import AddNewForm from "@/components/dashboard/AddNewForm";

export default async function AddNewPage() {
  const supabase = await createClient();

  const { count } = await supabase.from("items").select("*", { count: "exact", head: true });

  if ((count ?? 0) >= FREE_ITEM_LIMIT) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl bg-white p-10 text-center shadow-sm">
        <span className="text-3xl">🔒</span>
        <h1 className="mt-4 text-xl font-bold">You&apos;ve used all {FREE_ITEM_LIMIT} free items</h1>
        <p className="mt-2 text-sm text-black/60">
          You&apos;re on the free plan, which covers up to {FREE_ITEM_LIMIT} warranties. Remove an old
          item to add a new one, paid plans are coming soon.
        </p>
        <Link
          href="/all-products"
          className="mt-6 inline-block rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg"
        >
          Manage my items
        </Link>
      </div>
    );
  }

  return <AddNewForm />;
}
