import { createClient } from "@/lib/supabase/server";
import { FREE_ITEM_LIMIT } from "@/lib/plan";
import Sidebar from "@/components/dashboard/Sidebar";
import MobileNav from "@/components/dashboard/MobileNav";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { count } = await supabase.from("items").select("*", { count: "exact", head: true });

  const email = user?.email ?? "";
  const itemsUsed = count ?? 0;

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AnimatedBackground intensity={0.35} />

      {/* drawer on phones and tablets, permanent rail from lg up */}
      <MobileNav email={email} itemsUsed={itemsUsed} itemsLimit={FREE_ITEM_LIMIT} />
      <div className="hidden lg:block">
        <Sidebar email={email} itemsUsed={itemsUsed} itemsLimit={FREE_ITEM_LIMIT} />
      </div>

      <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</main>
    </div>
  );
}
