import { createClient } from "@/lib/supabase/server";
import { FREE_ITEM_LIMIT } from "@/lib/plan";

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { count } = await supabase.from("items").select("*", { count: "exact", head: true });
  const used = count ?? 0;

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-xs font-medium text-black/50">Account</p>
        <p className="mt-1 font-semibold">{user?.email}</p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-xs font-medium text-black/50">Plan</p>
        <p className="mt-1 font-semibold">Free plan</p>
        <p className="mt-1 text-sm text-black/60">
          {used} of {FREE_ITEM_LIMIT} items used
        </p>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-black/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-500"
            style={{ width: `${Math.min(100, (used / FREE_ITEM_LIMIT) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
