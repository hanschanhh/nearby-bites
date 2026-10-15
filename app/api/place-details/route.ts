import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const errorJson = (error: string, status: number) =>
  NextResponse.json({ error }, { status, headers: { "cache-control": "no-store" } });

type ReviewAuthor = { displayName?: string; uri?: string };
type Review = {
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: ReviewAuthor;
  googleMapsUri?: string;
};

function extractDishMentions(reviews: Review[]) {
  const hits = new Map<string, { name: string; authors: Map<string, { name: string; uri?: string }> }>();
  const stop = new Set(["it","this","that","them","there","here","food","meal","dish","menu","service","everything","something","one","place","restaurant","their","our","the","a","an","good","great","nice","amazing","delicious","excellent","best","favorite","favourite","highly","very","really","to","for","with"]);
  const triggers = /(?:must[ -]?try|highly recommend(?:ed)?|recommend(?:ed)?|ordered|order(?:ed)?|we had|i had|we tried|i tried|signature (?:dish|item)|famous for|favorite (?:dish|item)|favourite (?:dish|item))\s+(?:the|a|an|their|our)?\s+([^.!?;,:]{2,70})/gi;
  for (const review of reviews) {
    const text = review.text?.text || review.originalText?.text || "";
    const authorName = review.authorAttribution?.displayName || "Google Maps reviewer";
    const authorUri = review.authorAttribution?.uri;
    for (const sentence of text.split(/[.!?\n]+/)) {
      triggers.lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = triggers.exec(sentence)) !== null) {
        let name = match[1]
          .replace(/\s+(?:at|from|because|which|that|it was|was|is|are|tastes|taste|and the service|and staff)\b.*$/i, "")
          .replace(/\s+(?:was|is|are|tasted|tastes|very|really|so|super|extremely|delicious|amazing|excellent|great|fantastic|good)$/i, "")
          .replace(/^["'‘’“”\s]+|["'‘’.,:;!?\s]+$/g, "")
          .replace(/\s+/g, " ")
          .split(" ").slice(0, 6).join(" ")
          .trim();
        if (name.length < 3 || name.length > 55 || name.split(" ").every(word => stop.has(word.toLowerCase()))) continue;
        const key = name.toLowerCase();
        if (!hits.has(key)) hits.set(key, { name, authors: new Map() });
        hits.get(key)!.authors.set(authorName, { name: authorName, uri: authorUri });
      }
    }
  }
  return [...hits.values()]
    .map(hit => ({ name: hit.name, mentions: hit.authors.size, authors: [...hit.authors.values()] }))
    .sort((a, b) => b.mentions - a.mentions || a.name.localeCompare(b.name))
    .slice(0, 3);
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return errorJson("The Google Places API key is not configured.", 503);

  let input: { placeId?: unknown };
  try { input = await request.json(); } catch { return errorJson("Invalid request.", 400); }
  const placeId = typeof input.placeId === "string" ? input.placeId : "";
  if (!/^[A-Za-z0-9_-]{5,255}$/.test(placeId)) return errorJson("Invalid Google place ID.", 400);

  try {
    const response = await fetch("https://places.googleapis.com/v1/places/" + encodeURIComponent(placeId), {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "reviews,googleMapsUri,googleMapsLinks.reviewsUri,websiteUri,primaryTypeDisplayName,editorialSummary",
      },
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) return errorJson("Google Places could not load reviews for this place.", 502);
    const place = await response.json();
    const reviews: Review[] = Array.isArray(place.reviews) ? place.reviews : [];
    return NextResponse.json({
      dishMentions: extractDishMentions(reviews),
      reviewsUri: place.googleMapsLinks?.reviewsUri || "",
      googleMapsUri: place.googleMapsUri || "",
      websiteUri: place.websiteUri || "",
      category: place.primaryTypeDisplayName?.text || "",
      editorialSummary: place.editorialSummary?.text || "",
      reviewCount: reviews.length,
    }, { headers: { "cache-control": "no-store" } });
  } catch {
    return errorJson("The review request timed out. Please try again.", 502);
  }
}
