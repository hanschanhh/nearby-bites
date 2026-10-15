import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const jsonError = (error: string, status: number) =>
  NextResponse.json({ error }, { status, headers: { "cache-control": "no-store" } });

export async function POST(request: NextRequest) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return jsonError("The site owner must add the Google Places API key before live search can run.", 503);

  let input: { lat?: unknown; lng?: unknown; radius?: unknown };
  try {
    input = await request.json();
  } catch {
    return jsonError("Invalid search request.", 400);
  }

  const lat = Number(input.lat);
  const lng = Number(input.lng);
  const radius = Number(input.radius);
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || !Number.isFinite(radius) ||
      lat < 1.12 || lat > 1.48 || lng < 103.58 || lng > 104.1 || radius < 100 || radius > 5000) {
    return jsonError("Choose a valid location in Singapore and a search distance up to 5 km.", 400);
  }

  try {
    const response = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.googleMapsUri",
      },
      body: JSON.stringify({
        includedTypes: ["restaurant", "cafe"],
        maxResultCount: 20,
        rankPreference: "DISTANCE",
        locationRestriction: { circle: { center: { latitude: lat, longitude: lng }, radius } },
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) {
      return jsonError("Google Places could not complete the search. Check the API key, billing, and Places API access.", 502);
    }
    const result = await response.json();
    const places = (result.places || []).map((place: any) => ({
      name: place.displayName?.text || "Nearby eatery",
      address: place.formattedAddress || "Singapore",
      location: { lat: place.location?.latitude, lng: place.location?.longitude },
      rating: place.rating || null,
      count: place.userRatingCount || null,
    })).filter((place: any) => Number.isFinite(place.location.lat) && Number.isFinite(place.location.lng));
    return NextResponse.json({ places }, { headers: { "cache-control": "no-store" } });
  } catch {
    return jsonError("The nearby search timed out. Please try again.", 502);
  }
}
