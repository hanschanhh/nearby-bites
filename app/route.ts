import { page } from "../worker.js";

export const dynamic = "force-dynamic";

export async function GET() {
  return new Response(page, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}
