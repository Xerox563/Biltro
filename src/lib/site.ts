/* single source of truth for the site's public URL, used by metadata, sitemap, robots and JSON-LD */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  // Vercel sets this automatically for every deployment (preview + production),
  // so the .vercel.app URL still gets correct absolute/canonical URLs with zero config.
  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = "Biltro";

export const SITE_DESCRIPTION =
  "Biltro is the AI warranty vault that reads your bills for you. Snap a photo of any receipt, and Biltro automatically pulls out the product, shop, purchase date and warranty period, then reminds you before it expires.";

export const SITE_KEYWORDS = [
  "warranty tracker",
  "warranty tracking app",
  "bill scanner",
  "receipt scanner AI",
  "warranty reminder app",
  "digital warranty vault",
  "track product warranties",
  "extended warranty tracker",
  "receipt organizer app",
  "AI bill reader",
];
