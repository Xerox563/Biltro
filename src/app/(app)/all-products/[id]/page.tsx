import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Item } from "@/lib/items";
import ItemDetail from "@/components/dashboard/ItemDetail";

export default async function ItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data } = await supabase.from("items").select("*").eq("id", id).single();

  if (!data) notFound();

  const item = data as Item;
  let imageUrl: string | null = null;

  if (item.bill_image_path) {
    const { data: signed } = await supabase.storage
      .from("bills")
      .createSignedUrl(item.bill_image_path, 3600);
    imageUrl = signed?.signedUrl ?? null;
  }

  return <ItemDetail item={item} imageUrl={imageUrl} />;
}
