# Nearby Bites

A small Singapore-focused site that helps someone find nearby eateries and open walking directions. Search is served by Google Places API (New). The Google API key stays on the server in `GOOGLE_PLACES_API_KEY`.

## Deploy on Vercel

1. Import `hanschanhh/nearby-bites` from GitHub and leave the root directory as `./`.
2. Framework should be detected as **Next.js**. Use `npm run build` as the build command and keep the output directory default.
3. Add `GOOGLE_PLACES_API_KEY` in **Project → Settings → Environment Variables** for Production, Preview, and Development. Paste the key directly into Vercel; do not commit it or place it in browser code.
4. Deploy. A push to `main` will trigger a production deployment; other branches get preview deployments.

## Google Cloud key setup

1. In Google Cloud Console, create or choose a project and enable billing and **Places API (New)**.
2. Create an API key. Restrict the key to **Places API (New)** and use a server-side/IP restriction if you have a stable outbound IP. Do not use an HTTP referrer restriction for this server-side request.
3. Set budget alerts and API quotas in Google Cloud. Alerts help you monitor usage; they do not automatically cap charges.
4. Add the key only as the encrypted Vercel environment variable above, then redeploy after changing it.

## Product limits to be clear about

- Dietary preference options are prompts for what to look for or ask the eatery. Places data does not confirm that a menu item is vegetarian, non-spicy, or non-fried.
- Nearby results are ranked by distance and include ratings when Google provides them. The rotating shortlist cycles through the returned places.
- Browser location is used for the current request and is not stored by this app. Search is bounded to Singapore.
- This is a discovery aid, not medical or nutrition advice. Confirm current menus, ingredients, and preparation with the restaurant.

## Local development

```bash
npm install
copy .env.example .env.local
```

Put your test key in `.env.local`, then run `npm run dev`. Never commit `.env.local`.
