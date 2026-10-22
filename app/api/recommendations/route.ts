export const dynamic = "force-dynamic";

function disabled() {
  return Response.json(
    { error: "Nearby Bites is temporarily disabled." },
    { status: 503, headers: { "cache-control": "no-store" } },
  );
}

export const GET = disabled;
export const POST = disabled;
