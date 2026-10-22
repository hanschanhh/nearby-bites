export const dynamic = "force-dynamic";

export async function GET() {
  return new Response(`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Nearby Bites — Temporarily unavailable</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f5f3eb;color:#18352b;font-family:system-ui,sans-serif}main{max-width:32rem;padding:2rem}h1{font-size:2rem;letter-spacing:-.04em}p{line-height:1.6;color:#53665a}</style></head>
<body><main><h1>Nearby Bites is temporarily unavailable.</h1><p>The service has been disabled.</p></main></body></html>`,
    { status: 503, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-content-type-options": "nosniff" } },
  );
}
