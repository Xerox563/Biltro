import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getDaysLeft } from "@/lib/items";

const REMINDER_DAYS = [15, 7, 1];

export async function GET(request: NextRequest) {
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { data: items } = await supabase.from("items").select("*");

  const dueItems = (items ?? []).filter((item) => REMINDER_DAYS.includes(getDaysLeft(item.expiry_date)));

  let sent = 0;

  for (const item of dueItems) {
    const { data: userData } = await supabase.auth.admin.getUserById(item.user_id);
    const email = userData?.user?.email;
    if (!email) continue;

    const daysLeft = getDaysLeft(item.expiry_date);

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Biltro <reminders@biltro.app>",
        to: email,
        subject: `Your ${item.product_name} warranty ends in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`,
        html: `<p>Hi,</p><p>Your warranty for <strong>${item.product_name}</strong> from ${item.shop_name ?? "your store"} ends in ${daysLeft} day${daysLeft === 1 ? "" : "s"}, on ${item.expiry_date}.</p><p>Get it serviced now if it needs any repairs.</p><p>— Biltro</p>`,
      }),
    });

    sent += 1;
  }

  return NextResponse.json({ checked: items?.length ?? 0, sent });
}
