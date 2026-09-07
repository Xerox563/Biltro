import { createClient } from "@/lib/supabase/server";
import { Item, getWarrantyStatus } from "@/lib/items";
import RemindersList from "@/components/dashboard/RemindersList";

export default async function RemindersPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("items")
    .select("*")
    .order("expiry_date", { ascending: true });

  const items = (data ?? []) as Item[];
  const upcoming = items.filter((item) => getWarrantyStatus(item.expiry_date) !== "active");

  return <RemindersList items={upcoming} />;
}
