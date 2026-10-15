const areas = {
  "Raffles Place": { lat: 1.2834, lng: 103.8515 },
  "Orchard": { lat: 1.3048, lng: 103.8318 },
  "Novena": { lat: 1.3201, lng: 103.8437 },
  "Tampines": { lat: 1.353, lng: 103.9451 },
  "Jurong East": { lat: 1.3331, lng: 103.7423 },
  "Paya Lebar": { lat: 1.3173, lng: 103.8926 },
  "Woodlands": { lat: 1.436, lng: 103.7865 },
};

const preferenceNotes = {
  all: "Build a balanced plate with a protein source and vegetables where available.",
  vegetarian: "Look for a clearly meat-free dish and confirm stocks or sauces with the eatery.",
  nonspicy: "Ask for a mild option and check whether chilli or spicy sauce can be left out.",
  nonfried: "Look for steamed, grilled, soup-based, or stir-fried options; confirm the cooking method.",
};

export const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f5f3eb">
  <title>Nearby Bites — Find a better meal nearby</title>
  <meta name="description" content="Choose a food preference and find nearby places to eat in Singapore.">
  <style>
    :root{--ink:#18352b;--muted:#6e7d74;--green:#245b45;--lime:#d9edbd;--paper:#f5f3eb;--card:#fffefa;--line:#dfe4d9;--orange:#e88759;--shadow:0 18px 48px rgba(24,53,43,.08)}
    *{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased}
    button,select{font:inherit}button{cursor:pointer}.shell{max-width:1180px;margin:auto;padding:0 28px}.topbar{height:76px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(24,53,43,.1)}
    .brand{display:flex;align-items:center;gap:11px;font-weight:800;letter-spacing:-.04em;font-size:19px}.brandmark{width:34px;height:34px;border-radius:11px;background:var(--green);color:white;display:grid;place-items:center;font-size:17px}.toplabel{font-size:12px;color:var(--muted);letter-spacing:.1em;text-transform:uppercase}
    .hero{padding:68px 0 30px;display:grid;grid-template-columns:1.2fr .8fr;gap:48px;align-items:end}.eyebrow{display:inline-flex;align-items:center;gap:8px;color:var(--green);font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}.eyedot{width:8px;height:8px;border-radius:50%;background:var(--orange)}h1{font-size:clamp(42px,6vw,72px);line-height:.99;letter-spacing:-.065em;max-width:690px;margin:20px 0 18px;font-weight:760}.hero p{max-width:520px;margin:0;color:#607168;font-size:17px;line-height:1.6}.hero-aside{padding:22px 24px;border-left:1px solid #cbd5ca;color:#596c61;font-size:14px;line-height:1.6}.hero-aside strong{color:var(--ink);display:block;margin-bottom:7px}
    .finder{background:var(--card);border:1px solid var(--line);border-radius:22px;padding:26px;box-shadow:var(--shadow)}.finder-head{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;margin-bottom:20px}.finder h2{font-size:20px;letter-spacing:-.03em;margin:0}.step{font-size:11px;color:var(--muted);letter-spacing:.12em;text-transform:uppercase;padding-top:5px}.label{display:block;font-size:12px;font-weight:750;letter-spacing:.05em;text-transform:uppercase;color:#506359;margin:0 0 11px}
    .chips{display:flex;flex-wrap:wrap;gap:9px;margin-bottom:23px}.chip{border:1px solid var(--line);background:#fffefa;color:#45594e;border-radius:999px;padding:10px 15px;font-size:14px;font-weight:650;transition:.18s}.chip:hover{border-color:#9ab49d}.chip[aria-pressed="true"]{background:var(--green);border-color:var(--green);color:white}.fields{display:grid;grid-template-columns:1fr 1fr;gap:18px}.field{min-width:0}.selectwrap{position:relative}.selectwrap select{width:100%;height:48px;border:1px solid var(--line);border-radius:12px;background:#fffefa;color:var(--ink);padding:0 14px;outline:none}.selectwrap select:focus{border-color:var(--green);box-shadow:0 0 0 3px rgba(36,91,69,.12)}.location-actions{display:flex;gap:8px}.location-actions button{height:48px;border-radius:12px;border:1px solid var(--line);background:white;color:var(--ink);padding:0 13px;font-weight:650;white-space:nowrap}.location-actions button.active{border-color:var(--green);background:#edf4e8}.loc-select{margin-top:8px;width:100%;height:42px;border:1px solid var(--line);border-radius:10px;padding:0 12px;background:white;color:var(--ink)}.go{margin-top:22px;display:flex;align-items:center;justify-content:space-between;gap:18px}.go small{color:var(--muted);font-size:12px;line-height:1.45}.primary{border:0;background:var(--orange);color:#241a14;font-weight:800;padding:14px 20px;border-radius:12px;min-width:178px;box-shadow:0 6px 16px rgba(232,135,89,.18)}.primary:hover{background:#f0996d;transform:translateY(-1px)}.primary:disabled{opacity:.6;cursor:wait;transform:none}
    .status{margin:17px 0 0;padding:12px 14px;border-radius:11px;background:#f1f4ed;color:#53665a;font-size:13px;line-height:1.45;display:none}.status.show{display:block}.status.error{background:#fff0e9;color:#8f422b}.status.info{background:#eff5e9;color:#465d4e}
    .results-head{display:flex;justify-content:space-between;align-items:end;margin:42px 0 16px;gap:15px}.results-head h2{font-size:25px;letter-spacing:-.04em;margin:0}.results-head p{margin:6px 0 0;color:var(--muted);font-size:13px}.rotate{border:1px solid #cbd5ca;background:transparent;border-radius:999px;padding:10px 14px;color:var(--green);font-size:13px;font-weight:750;display:none}.rotate.show{display:block}.cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px}.place{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:19px;min-height:225px;display:flex;flex-direction:column;box-shadow:0 8px 22px rgba(24,53,43,.04)}.place-top{display:flex;justify-content:space-between;gap:10px;align-items:flex-start}.place h3{margin:0;font-size:18px;line-height:1.25;letter-spacing:-.025em}.rank{font-size:11px;font-weight:800;color:#74877a;background:#edf2e8;border-radius:8px;padding:6px 8px;white-space:nowrap}.place-address{font-size:12px;color:var(--muted);line-height:1.45;margin:9px 0 13px}.stats{display:flex;gap:13px;align-items:center;font-size:12px;color:#506359}.stat strong{color:var(--ink)}.fit{margin-top:15px;padding:11px 12px;background:#f2f5ed;border-radius:10px;font-size:12px;line-height:1.5;color:#53665a}.fit b{color:var(--green)}.place-bottom{margin-top:auto;padding-top:15px;display:flex;justify-content:space-between;align-items:center;gap:12px}.unverified{color:#8c6a36;font-size:10px;font-weight:750;text-transform:uppercase;letter-spacing:.06em}.directions{color:var(--green);font-size:13px;font-weight:800;text-decoration:none}.directions:hover{text-decoration:underline}.empty{grid-column:1/-1;padding:30px;border:1px dashed #cbd5ca;border-radius:16px;text-align:center;color:var(--muted);background:rgba(255,254,250,.55);line-height:1.55}.footnote{margin:14px 0 44px;color:#718077;font-size:11px;line-height:1.55;max-width:800px}.footer{border-top:1px solid rgba(24,53,43,.12);padding:22px 0 30px;color:var(--muted);font-size:12px;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}.google-mark{font-weight:750;color:#586a60}.google-mark em{font-style:normal;color:#4285f4}.bottom-link{color:inherit;text-decoration:underline;text-underline-offset:3px}
    @media(max-width:760px){.shell{padding:0 17px}.topbar{height:64px}.toplabel{font-size:10px}.hero{padding:45px 0 24px;grid-template-columns:1fr;gap:18px}.hero-aside{border-left:0;border-top:1px solid #cbd5ca;padding:14px 0 0}.finder{padding:20px 17px}.fields{grid-template-columns:1fr}.location-actions button{flex:1}.go{align-items:flex-start;flex-direction:column}.primary{width:100%}.cards{grid-template-columns:1fr}.place{min-height:0}.results-head{align-items:flex-start;flex-direction:column}.rotate{align-self:flex-start}.footnote{margin-bottom:28px}}
  </style>
</head>
<body>
  <div class="shell">
    <header class="topbar"><div class="brand"><span class="brandmark">↗</span><span>nearby bites</span></div><div class="toplabel">Singapore · Eat well, nearby</div></header>
    <section class="hero"><div><div class="eyebrow"><span class="eyedot"></span> Less scrolling. Better choosing.</div><h1>Your next good meal is nearby.</h1><p>Pick what matters today. We’ll find places close to you and make the next step easier.</p></div><div class="hero-aside"><strong>A practical nudge, not a nutrition grade.</strong>Choose a preference, see nearby options, then check the menu for a dish that fits. Menu details are not verified by Google Places.</div></section>
    <main>
      <section class="finder" aria-labelledby="finder-title"><div class="finder-head"><h2 id="finder-title">What sounds right today?</h2><span class="step">01 / Choose · 02 / Find · 03 / Go</span></div>
        <div class="label">Food preference</div><div class="chips" role="group" aria-label="Food preference"><button class="chip" aria-pressed="true" data-pref="all">Anything</button><button class="chip" aria-pressed="false" data-pref="vegetarian">Vegetarian</button><button class="chip" aria-pressed="false" data-pref="nonspicy">Non-spicy</button><button class="chip" aria-pressed="false" data-pref="nonfried">Non-fried</button></div>
        <div class="fields"><div class="field"><span class="label">Your starting point</span><div class="location-actions"><button id="gps" class="active" type="button">◎ Use my location</button><button id="areaMode" type="button">Choose an area</button></div><select id="area" class="loc-select" aria-label="Choose a Singapore area" hidden><option value="Raffles Place">Raffles Place</option><option value="Orchard">Orchard</option><option value="Novena">Novena</option><option value="Tampines">Tampines</option><option value="Jurong East">Jurong East</option><option value="Paya Lebar">Paya Lebar</option><option value="Woodlands">Woodlands</option></select></div><div class="field"><label class="label" for="radius">How far are you willing to go?</label><div class="selectwrap"><select id="radius"><option value="800">A short walk · 800 m</option><option value="1500" selected>Nearby · 1.5 km</option><option value="2500">A little further · 2.5 km</option><option value="4000">Wider choice · 4 km</option></select></div></div></div>
        <div class="go"><small>Your location is used for this search and is not saved by this page.<br>Results are ranked by proximity and Google rating.</small><button id="proceed" class="primary" type="button">Find nearby food <span aria-hidden="true">→</span></button></div><div id="status" class="status" role="status" aria-live="polite"></div>
      </section>
      <section aria-labelledby="results-title"><div class="results-head"><div><h2 id="results-title">Your nearby shortlist</h2><p id="result-summary">Three clear options, once you search.</p></div><button class="rotate" id="rotate" type="button">Show three different places ↻</button></div><div class="cards" id="cards"><div class="empty">Choose a food preference and location to get started.</div></div><p class="footnote">Preference notes are general ordering prompts, not confirmation that a specific place serves a suitable dish. Check the current menu and ask the eatery about ingredients and preparation. This site does not provide medical or nutrition advice.</p></section>
    </main>
    <footer class="footer"><span class="google-mark"><em>G</em>oogle Maps place data</span><span><a class="bottom-link" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Privacy Policy</a> · Location is not retained by this site</span></footer>
  </div>
  <script>
    const areas = ${JSON.stringify(areas)};
    const notes = ${JSON.stringify(preferenceNotes)};
    let preference = "all", candidates = [], startIndex = 0, locationMode = "gps", currentOrigin = null;
    const cards = document.querySelector("#cards"), statusBox = document.querySelector("#status"), proceed = document.querySelector("#proceed"), rotate = document.querySelector("#rotate");
    document.querySelectorAll(".chip").forEach(button => button.addEventListener("click", () => { preference = button.dataset.pref; document.querySelectorAll(".chip").forEach(b => b.setAttribute("aria-pressed", String(b === button))); }));
    document.querySelector("#gps").addEventListener("click", () => { locationMode = "gps"; document.querySelector("#gps").classList.add("active"); document.querySelector("#areaMode").classList.remove("active"); document.querySelector("#area").hidden = true; });
    document.querySelector("#areaMode").addEventListener("click", () => { locationMode = "area"; document.querySelector("#areaMode").classList.add("active"); document.querySelector("#gps").classList.remove("active"); document.querySelector("#area").hidden = false; });
    function setStatus(message, type = "info") { statusBox.textContent = message; statusBox.className = "status show " + type; }
    function distanceKm(a,b) { const rad = x => x * Math.PI / 180; const dLat=rad(b.lat-a.lat), dLng=rad(b.lng-a.lng); const x=Math.sin(dLat/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLng/2)**2; return 6371*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x)); }
    function mapsLink(place) { const q = encodeURIComponent([place.name,place.address,"Singapore"].filter(Boolean).join(", ")); return "https://www.google.com/maps/dir/?api=1&destination="+q+"&travelmode=walking"; }
    function render() {
      if (!candidates.length) return;
      const shown = Array.from({length:Math.min(3,candidates.length)},(_,i)=>candidates[(startIndex+i)%candidates.length]);
      cards.innerHTML = shown.map((place,i) => { const rating = place.rating ? '<span class="stat">★ <strong>'+Number(place.rating).toFixed(1)+'</strong>'+(place.count ? ' <span>('+Number(place.count).toLocaleString()+')</span>' : '')+'</span>' : ''; return '<article class="place"><div class="place-top"><h3>'+escapeHtml(place.name)+'</h3><span class="rank">PICK 0'+(i+1)+'</span></div><p class="place-address">'+escapeHtml(place.address || 'Singapore')+'</p><div class="stats"><span class="stat"><strong>'+distanceKm(currentOrigin,place.location).toFixed(1)+' km</strong> away</span>'+rating+'</div><div class="fit"><b>For your preference:</b> '+escapeHtml(notes[preference])+'</div><div class="place-bottom"><span class="unverified">Menu not verified</span><a class="directions" href="'+mapsLink(place)+'" target="_blank" rel="noreferrer">Directions ↗</a></div></article>'; }).join("");
      document.querySelector("#result-summary").textContent = candidates.length+" places nearby · sorted by distance, then rating. Preference fit is not confirmed.";
      rotate.classList.toggle("show",candidates.length>3);
    }
    function escapeHtml(value) { return String(value ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
    async function runSearch() {
      proceed.disabled = true; proceed.textContent = "Finding nearby places…"; statusBox.className="status";
      try {
        if (locationMode === "area") currentOrigin = areas[document.querySelector("#area").value];
        else currentOrigin = await new Promise((resolve,reject)=>{ if(!navigator.geolocation) return reject(new Error("Location access is not available in this browser. Choose an area instead.")); navigator.geolocation.getCurrentPosition(p=>resolve({lat:p.coords.latitude,lng:p.coords.longitude}),()=>reject(new Error("We couldn't access your location. Choose an area instead.")),{enableHighAccuracy:false,timeout:10000,maximumAge:60000}); });
        const response = await fetch("/api/recommendations",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({lat:currentOrigin.lat,lng:currentOrigin.lng,radius:Number(document.querySelector("#radius").value)})});
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "The search could not be completed.");
        candidates = data.places || []; startIndex = 0;
        if (!candidates.length) { cards.innerHTML='<div class="empty">No places matched this radius. Increase the distance and try again.</div>'; rotate.classList.remove("show"); document.querySelector("#result-summary").textContent="No nearby places found."; setStatus("Try a wider search radius."); return; }
        render(); setStatus("Found nearby places. Check the menu before relying on a dietary preference match.");
        document.querySelector("#results-title").scrollIntoView({behavior:"smooth",block:"start"});
      } catch (error) { setStatus(error.message,"error"); if(error.message.includes("API key")) setStatus("The site owner must add the Google Places API key before live search can run.","error"); }
      finally { proceed.disabled=false; proceed.innerHTML='Find nearby food <span aria-hidden="true">→</span>'; }
    }
    proceed.addEventListener("click",runSearch); rotate.addEventListener("click",()=>{startIndex=(startIndex+3)%candidates.length;render();});
  </script>
</body>
</html>`;

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
});

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/recommendations" && request.method === "POST") {
      if (!env.GOOGLE_PLACES_API_KEY) return json({ error: "Google Places API key is not configured." }, 503);
      let input;
      try { input = await request.json(); } catch { return json({ error: "Invalid search request." }, 400); }
      const lat = Number(input.lat), lng = Number(input.lng), radius = Number(input.radius);
      if (!Number.isFinite(lat) || !Number.isFinite(lng) || !Number.isFinite(radius) || lat < -90 || lat > 90 || lng < -180 || lng > 180 || radius < 100 || radius > 5000) return json({ error: "Invalid location or search distance." }, 400);
      const response = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
        method: "POST",
        headers: { "content-type": "application/json", "X-Goog-Api-Key": env.GOOGLE_PLACES_API_KEY, "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.googleMapsUri" },
        body: JSON.stringify({ includedTypes:["restaurant","cafe"], maxResultCount:20, rankPreference:"DISTANCE", locationRestriction:{circle:{center:{latitude:lat,longitude:lng},radius}} }),
      });
      if (!response.ok) return json({ error: "Google Places could not complete the search. Check the API key, billing, and Places API access." }, 502);
      const result = await response.json();
      const places = (result.places || []).map(p=>({name:p.displayName?.text || "Nearby eatery",address:p.formattedAddress || "Singapore",location:{lat:p.location?.latitude,lng:p.location?.longitude},rating:p.rating || null,count:p.userRatingCount || null})).filter(p=>Number.isFinite(p.location.lat)&&Number.isFinite(p.location.lng));
      return json({places});
    }
    if (url.pathname !== "/") return new Response("Not found", { status:404 });
    return new Response(page,{headers:{"content-type":"text/html; charset=utf-8","cache-control":"no-store","x-content-type-options":"nosniff"}});
  },
};
