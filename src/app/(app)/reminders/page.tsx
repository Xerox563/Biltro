import { createClient } from "@/lib/supabase/server";
import { Item, formatTimeLeft, getWarrantyStatus } from "@/lib/items";

export default async function RemindersPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("items")
    .select("*")
    .order("expiry_date", { ascending: true });

  const items = (data ?? []) as Item[];
  const upcoming = items.filter((item) => getWarrantyStatus(item.expiry_date) !== "active");

  return (
    <div>
      <h1 className="text-2xl font-bold">Reminders</h1>
      <p className="mt-1 text-sm text-black/60">Warranties expiring soon or already expired.</p>

      {upcoming.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-white p-10 text-center text-sm text-black/50 shadow-sm">
          Nothing needs your attention right now.
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {upcoming.map((item) => {
            const status = getWarrantyStatus(item.expiry_date);
            return (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm"
              >
                <div>
                  <p className="font-semibold">{item.product_name}</p>
                  <p className="text-xs text-black/50">{item.shop_name}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    status === "expired"
                      ? "bg-red-100 text-red-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {formatTimeLeft(item.expiry_date)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
