export type Item = {
  id: string;
  user_id: string;
  product_name: string;
  shop_name: string | null;
  purchase_date: string;
  warranty_months: number;
  expiry_date: string;
  bill_image_path: string | null;
  created_at: string;
};

export type WarrantyStatus = "active" | "expiring" | "expired";

export function getWarrantyStatus(expiryDate: string): WarrantyStatus {
  const daysLeft = getDaysLeft(expiryDate);
  if (daysLeft < 0) return "expired";
  if (daysLeft <= 30) return "expiring";
  return "active";
}

export function getDaysLeft(expiryDate: string): number {
  const diff = new Date(expiryDate).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function formatTimeLeft(expiryDate: string): string {
  const days = getDaysLeft(expiryDate);
  if (days < 0) return `Warranty ended on ${formatDate(expiryDate)}`;
  if (days === 0) return "Warranty ends today";
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} left`;
  if (days < 365) return `${Math.round(days / 30)} month${Math.round(days / 30) === 1 ? "" : "s"} left`;
  return `${Math.round(days / 365)} year${Math.round(days / 365) === 1 ? "" : "s"} left`;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
