import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const jsonError = (error: string, status: number) =>
  NextResponse.json({ error }, { status, headers: { "cache-control": "no-store" } });

export async function POST(request: NextRequest) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return jsonError("The Google Places API key is not configured.", 503);

  let input: { photoName?: unknown };
  try {
    input = await request.json();
  } catch {
    return jsonError("Invalid photo request.", 400);
  }

  const photoName = typeof input.photoName === "string" ? input.photoName : "";
  if (!/^places\/[A-Za-z0-9_-]{5,255}\/photos\/[A-Za-z0-9_-]{5,512}$/.test(photoName)) {
    return jsonError("Invalid Google photo reference.", 400);
  }

  try {
    const resourcePath = photoName.split("/").map(encodeURIComponent).join("/");
    const url = new URL("https://places.googleapis.com/v1/" + resourcePath + "/media");
    url.searchParams.set("maxWidthPx", "720");
    url.searchParams.set("skipHttpRedirect", "true");

    const response = await fetch(url, {
      headers: { "X-Goog-Api-Key": apiKey },
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    if (!response.ok) return jsonError("Google Places could not load this photo.", 502);

    const result = await response.json();
    if (typeof result.photoUri !== "string" || !result.photoUri.startsWith("https://")) {
      return jsonError("Google did not return a usable photo.", 502);
    }

    return NextResponse.json({ photoUri: result.photoUri }, {
      headers: { "cache-control": "no-store" },
    });
  } catch {
    return jsonError("The Google photo request timed out. Please try again.", 502);
  }
}
