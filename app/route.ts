import { page } from "../worker.js";

export const dynamic = "force-dynamic";

export async function GET() {
  const html = page.replaceAll("__GOOGLE_MAPS_BROWSER_API_KEY__", process.env.GOOGLE_MAPS_BROWSER_API_KEY || "");
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}
