import { createClient } from "@/lib/supabase/server";
import { FREE_ITEM_LIMIT } from "@/lib/plan";
import Sidebar from "@/components/dashboard/Sidebar";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { count } = await supabase.from("items").select("*", { count: "exact", head: true });

  return (
    <div className="flex min-h-screen">
      <AnimatedBackground intensity={0.35} />
      <Sidebar email={user?.email ?? ""} itemsUsed={count ?? 0} itemsLimit={FREE_ITEM_LIMIT} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
