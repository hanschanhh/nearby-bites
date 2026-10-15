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
    .chips{display:flex;flex-wrap:wrap;gap:9px;margin-bottom:8px}.preference-hint{margin:0 0 20px;color:var(--muted);font-size:12px;line-height:1.45}.chip{border:1px solid var(--line);background:#fffefa;color:#45594e;border-radius:999px;padding:10px 15px;font-size:14px;font-weight:650;transition:.18s}.chip:hover{border-color:#9ab49d}.chip[aria-pressed="true"]{background:var(--green);border-color:var(--green);color:white}.fields{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.field{min-width:0}.selectwrap{position:relative}.selectwrap select{width:100%;height:48px;border:1px solid var(--line);border-radius:12px;background:#fffefa;color:var(--ink);padding:0 14px;outline:none}.selectwrap select:focus{border-color:var(--green);box-shadow:0 0 0 3px rgba(36,91,69,.12)}.location-actions{display:flex;gap:8px}.location-actions button{height:48px;border-radius:12px;border:1px solid var(--line);background:white;color:var(--ink);padding:0 13px;font-weight:650;white-space:nowrap}.location-actions button.active{border-color:var(--green);background:#edf4e8}.loc-select{margin-top:8px;width:100%;height:42px;border:1px solid var(--line);border-radius:10px;padding:0 12px;background:white;color:var(--ink)}.go{margin-top:22px;display:flex;align-items:center;justify-content:space-between;gap:18px}.go small{color:var(--muted);font-size:12px;line-height:1.45}.primary{border:0;background:var(--orange);color:#241a14;font-weight:800;padding:14px 20px;border-radius:12px;min-width:178px;box-shadow:0 6px 16px rgba(232,135,89,.18)}.primary:hover{background:#f0996d;transform:translateY(-1px)}.primary:disabled{opacity:.6;cursor:wait;transform:none}
    .status{margin:17px 0 0;padding:12px 14px;border-radius:11px;background:#f1f4ed;color:#53665a;font-size:13px;line-height:1.45;display:none}.status.show{display:block}.status.error{background:#fff0e9;color:#8f422b}.status.info{background:#eff5e9;color:#465d4e}
    .results-head{display:flex;justify-content:space-between;align-items:end;margin:42px 0 16px;gap:15px}.results-head h2{font-size:25px;letter-spacing:-.04em;margin:0}.results-head p{margin:6px 0 0;color:var(--muted);font-size:13px}.rotate{border:1px solid #cbd5ca;background:transparent;border-radius:999px;padding:10px 14px;color:var(--green);font-size:13px;font-weight:750;display:none}.rotate.show{display:block}.cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px}.place{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:19px;min-height:225px;display:flex;flex-direction:column;box-shadow:0 8px 22px rgba(24,53,43,.04)}.place-top{display:flex;justify-content:space-between;gap:10px;align-items:flex-start}.place h3{margin:0;font-size:18px;line-height:1.25;letter-spacing:-.025em}.rank{font-size:11px;font-weight:800;color:#74877a;background:#edf2e8;border-radius:8px;padding:6px 8px;white-space:nowrap}.place-address{font-size:12px;color:var(--muted);line-height:1.45;margin:9px 0 13px}.stats{display:flex;gap:13px;align-items:center;font-size:12px;color:#506359}.stat strong{color:var(--ink)}.fit{margin-top:15px;padding:11px 12px;background:#f2f5ed;border-radius:10px;font-size:12px;line-height:1.5;color:#53665a}.fit b{color:var(--green)}.place-bottom{margin-top:auto;padding-top:15px;display:flex;justify-content:space-between;align-items:center;gap:12px}.unverified{color:#8c6a36;font-size:10px;font-weight:750;text-transform:uppercase;letter-spacing:.06em}.directions{color:var(--green);font-size:13px;font-weight:800;text-decoration:none}.directions:hover{text-decoration:underline}.empty{grid-column:1/-1;padding:30px;border:1px dashed #cbd5ca;border-radius:16px;text-align:center;color:var(--muted);background:rgba(255,254,250,.55);line-height:1.55}.footnote{margin:14px 0 44px;color:#718077;font-size:11px;line-height:1.55;max-width:800px}.footer{border-top:1px solid rgba(24,53,43,.12);padding:22px 0 30px;color:var(--muted);font-size:12px;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}.google-mark{font-weight:750;color:#586a60}.google-mark em{font-style:normal;color:#4285f4}.bottom-link{color:inherit;text-decoration:underline;text-underline-offset:3px}
    .map-section{margin-top:22px;background:var(--card);border:1px solid var(--line);border-radius:18px;padding:18px;box-shadow:0 8px 22px rgba(24,53,43,.04)}.map-head{display:flex;justify-content:space-between;align-items:start;gap:15px;margin-bottom:12px}.map-head h2{font-size:19px;letter-spacing:-.03em;margin:0}.map-head p{font-size:12px;color:var(--muted);margin:4px 0 0;line-height:1.45}.map-canvas{height:350px;border-radius:13px;overflow:hidden;background:#edf1e9}.map-fallback{padding:16px;color:#586a60;font-size:13px;line-height:1.5}.map-fallback select{display:block;margin-top:10px;max-width:320px;width:100%;height:42px;border:1px solid var(--line);border-radius:10px;background:#fff;padding:0 10px}.map-note{font-size:11px;color:var(--muted);margin:9px 2px 0}.location-hint{margin:9px 0 0;color:var(--muted);font-size:12px;line-height:1.45}.dish-results{margin-top:10px;padding:10px 11px;background:#f7f7f0;border-radius:10px;font-size:11px;color:#53665a;line-height:1.5}.dish-results ul{margin:5px 0 0;padding-left:17px}.dish-results a{color:var(--green)}.review-results{margin-top:10px;padding:10px 11px;background:#fff;border:1px solid var(--line);border-radius:10px;font-size:11px;color:#53665a;line-height:1.5}.review-heading{font-weight:800;color:var(--ink);margin-bottom:8px}.review-card{padding:8px 0;border-top:1px solid var(--line)}.review-meta{display:flex;flex-wrap:wrap;gap:8px;align-items:center;color:var(--muted)}.review-stars{font-weight:800;color:#9b6a14}.review-text{margin:5px 0;white-space:pre-wrap}.review-card a,.review-results a{color:var(--green)}.review-comparison{margin-top:9px;padding:9px;background:#fff2ec;border-radius:8px}.review-policy{margin-top:8px;font-size:10px;color:var(--muted)}.spend-note{font-size:10px;color:#718077;margin-top:3px}.dish-results ul{margin:5px 0 0;padding-left:17px}.dish-results a{color:var(--green)}.category{display:inline-flex;background:#edf2e8;color:#486451;border-radius:999px;padding:5px 8px;font-size:10px;font-weight:750;letter-spacing:.02em;margin-top:9px}.food-context{margin-top:10px;padding:10px 11px;background:#f2f5ed;border-radius:10px;font-size:12px;line-height:1.45;color:#53665a}.food-context b{color:var(--green)}
    @media(max-width:760px){.map-section{padding:13px}.map-canvas{height:310px}.map-head{flex-direction:column}}
    @media(max-width:760px){.shell{padding:0 17px}.topbar{height:64px}.toplabel{font-size:10px}.hero{padding:45px 0 24px;grid-template-columns:1fr;gap:18px}.hero-aside{border-left:0;border-top:1px solid #cbd5ca;padding:14px 0 0}.finder{padding:20px 17px}.fields{grid-template-columns:1fr}.location-actions button{flex:1}.go{align-items:flex-start;flex-direction:column}.primary{width:100%}.cards{grid-template-columns:1fr}.place{min-height:0}.results-head{align-items:flex-start;flex-direction:column}.rotate{align-self:flex-start}.footnote{margin-bottom:28px}}
  </style>
</head>
<body>
  <div class="shell">
    <header class="topbar"><div class="brand"><span class="brandmark">↗</span><span>nearby bites</span></div><div class="toplabel">Singapore · Eat well, nearby</div></header>
    <section class="hero"><div><div class="eyebrow"><span class="eyedot"></span> Less scrolling. Better choosing.</div><h1>Your next good meal is nearby.</h1><p>Pick what matters today. We’ll find places close to you and make the next step easier.</p></div><div class="hero-aside"><strong>A practical nudge, not a nutrition grade.</strong>Choose a preference, set your price level, then compare Google listing details and dish mentions from reviews. Confirm current menu items with the eatery.</div></section>
    <main>
      <section class="finder" aria-labelledby="finder-title"><div class="finder-head"><h2 id="finder-title">What sounds right today?</h2><span class="step">01 / Choose · 02 / Find · 03 / Go</span></div>
        <div class="label">Food preference</div><div class="chips" role="group" aria-label="Food preference"><button class="chip" aria-pressed="true" data-pref="all">Anything</button><button class="chip" aria-pressed="false" data-pref="vegetarian">Vegetarian</button><button class="chip" aria-pressed="false" data-pref="nonspicy">Non-spicy</button><button class="chip" aria-pressed="false" data-pref="nonfried">Non-fried</button></div><p class="preference-hint" id="preferenceHelp" aria-live="polite">Anything: no dietary filtering.</p>
        <div class="fields"><div class="field"><span class="label">Location</span><div class="location-actions"><button id="gps" class="active" type="button">◎ Use my location</button><button id="areaMode" type="button">Select an area</button></div><p class="location-hint" id="locationHint">Use your current position, or select an area and drop a pin on the map.</p></div><div class="field"><label class="label" for="radius">How far are you willing to go?</label><div class="selectwrap"><select id="radius"><option value="800">A short walk · 800 m</option><option value="1500" selected>Nearby · 1.5 km</option><option value="2500">A little further · 2.5 km</option><option value="4000">Wider choice · 4 km</option></select></div></div><div class="field"><label class="label" for="priceLevel">Price</label><div class="selectwrap"><select id="priceLevel"><option value="">Any price</option><option value="$">$</option><option value="$$">$$</option><option value="$$$">$$$</option></select></div><p class="location-hint">Choose a price band for your shortlist.</p></div></div>
        <div class="go"><small>Your location is used for this search and is not saved by this page.<br>Results are ranked by proximity and Google rating.</small><button id="proceed" class="primary" type="button">Find nearby food <span aria-hidden="true">→</span></button></div><div id="status" class="status" role="status" aria-live="polite"></div>
      </section>
      <section class="map-section" aria-labelledby="map-title"><div class="map-head"><div><h2 id="map-title">Map</h2><p id="mapHelp">Choose an area to place a pin, or search to see nearby places.</p></div></div><div id="mapCanvas" class="map-canvas"></div><div id="mapFallback" class="map-fallback" hidden>Google Maps needs a browser key restricted to Maps JavaScript API for this website. Until configured, choose one of these preset areas:<select id="areaFallback" aria-label="Choose a Singapore area"><option value="">Choose an area</option><option value="Raffles Place">Raffles Place</option><option value="Orchard">Orchard</option><option value="Novena">Novena</option><option value="Tampines">Tampines</option><option value="Jurong East">Jurong East</option><option value="Paya Lebar">Paya Lebar</option><option value="Woodlands">Woodlands</option></select></div><p class="map-note">Place markers open Google Maps details. Your search location is shown separately.</p></section>
      <section aria-labelledby="results-title"><div class="results-head"><div><h2 id="results-title">Your nearby shortlist</h2><p id="result-summary">Three clear options, once you search.</p></div><button class="rotate" id="rotate" type="button">Show three different places ↻</button></div><div class="cards" id="cards"><div class="empty">Choose a food preference and location to get started.</div></div><p class="footnote">Preference notes are general ordering prompts, not confirmation that a specific place serves a suitable dish. Check the current menu and ask the eatery about ingredients and preparation. This site does not provide medical or nutrition advice.</p></section>
    </main>
    <footer class="footer"><span class="google-mark"><em>G</em>oogle Maps place data</span><span><a class="bottom-link" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Privacy Policy</a> · Location is not retained by this site</span></footer>
  </div>
  <script>
    const MAPS_KEY = "__GOOGLE_MAPS_BROWSER_API_KEY__";
    const areas = {
      "Raffles Place": {lat:1.2834,lng:103.8515}, "Orchard": {lat:1.3048,lng:103.8318},
      "Novena": {lat:1.3201,lng:103.8437}, "Tampines": {lat:1.353,lng:103.9451},
      "Jurong East": {lat:1.3331,lng:103.7423}, "Paya Lebar": {lat:1.3173,lng:103.8926},
      "Woodlands": {lat:1.436,lng:103.7865}
    };
    const notes = {
      all:"Use the food category, price and review dish mentions as clues; check the current menu before ordering.",
      vegetarian:"Google marks this place as serving vegetarian food. Confirm that the specific dish, stocks and sauces meet your needs.",
      nonspicy:"Google does not verify spice level. Check the menu or ask for a mild preparation.",
      nonfried:"Google does not verify cooking method. Check the menu or ask how the dish is prepared."
    };
    let preference="all", candidates=[], ranked=[], shortlist=[], seenIds=new Set(), locationMode="gps";
    let currentOrigin=null, mapInstance=null, mapPromise=null, originMarker=null, radiusCircle=null, placeMarkers=[];
    const cards=document.querySelector("#cards"), statusBox=document.querySelector("#status"), proceed=document.querySelector("#proceed"), rotate=document.querySelector("#rotate");
    const fallback=document.querySelector("#mapFallback"), mapHelp=document.querySelector("#mapHelp");
    const preferenceHelp=document.querySelector("#preferenceHelp");
    const preferenceHelpText={all:"Anything: no dietary filtering.",vegetarian:"Vegetarian: only places Google marks as serving vegetarian food are included.",nonspicy:"Non-spicy: Google has no spice field; this changes the ordering reminder only.",nonfried:"Non-fried: Google has no cooking-method field; this changes the ordering reminder only."};
    document.querySelectorAll(".chip").forEach(button=>button.addEventListener("click",()=>{preference=button.dataset.pref;document.querySelectorAll(".chip").forEach(b=>b.setAttribute("aria-pressed",String(b===button)));preferenceHelp.textContent=preferenceHelpText[preference];}));
    function setStatus(message,type="info"){statusBox.textContent=message;statusBox.className="status show "+type;}
    function escapeHtml(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
    function distanceKm(a,b){const rad=x=>x*Math.PI/180,dLat=rad(b.lat-a.lat),dLng=rad(b.lng-a.lng),v=Math.sin(dLat/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLng/2)**2;return 6371*2*Math.atan2(Math.sqrt(v),Math.sqrt(1-v));}
    function priceText(level){return ({PRICE_LEVEL_FREE:"$",PRICE_LEVEL_INEXPENSIVE:"$",PRICE_LEVEL_MODERATE:"$$",PRICE_LEVEL_EXPENSIVE:"$$$",PRICE_LEVEL_VERY_EXPENSIVE:"$$$"})[level]||"";}
    function moneyText(money){if(!money||!money.currencyCode)return "";const value=Number(money.units||0)+Number(money.nanos||0)/1e9;try{return new Intl.NumberFormat("en-SG",{style:"currency",currency:money.currencyCode,maximumFractionDigits:0}).format(value);}catch{return money.currencyCode+" "+Math.round(value);}}
    function spendEstimate(range){if(!range?.startPrice)return "";const low=moneyText(range.startPrice),high=moneyText(range.endPrice);if(!low)return "";if(!high)return low+"+";const lowValue=Number(range.startPrice.units||0)+Number(range.startPrice.nanos||0)/1e9,highValue=Number(range.endPrice.units||0)+Number(range.endPrice.nanos||0)/1e9;return moneyText({currencyCode:range.startPrice.currencyCode,units:Math.round((lowValue+highValue)/2)});}
    function mapUnavailable(){document.querySelector("#mapCanvas").hidden=true;fallback.hidden=false;mapHelp.textContent="Add the browser Maps key in Vercel to use the map pin and map markers.";}
    function updateOriginMarker(){if(!mapInstance||!currentOrigin)return;if(originMarker)originMarker.setMap(null);originMarker=new google.maps.Marker({map:mapInstance,position:currentOrigin,draggable:locationMode==="area",title:locationMode==="gps"?"Your location":"Selected location",icon:{path:google.maps.SymbolPath.CIRCLE,scale:8,fillColor:"#4285f4",fillOpacity:1,strokeColor:"#fff",strokeWeight:2}});if(locationMode==="area")originMarker.addListener("dragend",event=>{if(event.latLng)setSelectedLocation({lat:event.latLng.lat(),lng:event.latLng.lng()});});}
    function setSelectedLocation(point){currentOrigin=point;updateOriginMarker();mapHelp.textContent="Pin selected. Drag it or tap elsewhere on the map to move it.";document.querySelector("#locationHint").textContent="Selected map pin will be used for this search.";}
    function initializeMap(){
      mapInstance=new google.maps.Map(document.querySelector("#mapCanvas"),{center:{lat:1.3521,lng:103.8198},zoom:12,mapTypeControl:false,streetViewControl:false,fullscreenControl:true});
      mapInstance.addListener("click",event=>{if(locationMode!=="area"||!event.latLng)return;setSelectedLocation({lat:event.latLng.lat(),lng:event.latLng.lng()});});
    }
    window.nearbyBitesMapReady=function(){initializeMap();if(window.__nearbyBitesMapResolve)window.__nearbyBitesMapResolve(true);};
    function ensureMap(){
      if(mapInstance)return Promise.resolve(true);
      if(!MAPS_KEY){mapUnavailable();return Promise.resolve(false);}
      if(!mapPromise){
        mapPromise=new Promise((resolve,reject)=>{
          window.__nearbyBitesMapResolve=resolve;
          const script=document.createElement("script");
          script.src="https://maps.googleapis.com/maps/api/js?key="+encodeURIComponent(MAPS_KEY)+"&callback=nearbyBitesMapReady";
          script.async=true;script.defer=true;
          script.onerror=()=>{mapUnavailable();reject(new Error("Google Maps could not load. Check the Maps JavaScript API key and website restriction."));};
          document.head.appendChild(script);
        });
      }
      return mapPromise;
    }
    function setMode(mode){
      locationMode=mode;
      document.querySelector("#gps").classList.toggle("active",mode==="gps");
      document.querySelector("#areaMode").classList.toggle("active",mode==="area");
      if(mode==="gps"){document.querySelector("#locationHint").textContent="Your browser location will be used for the search.";mapHelp.textContent="Your current location will appear here after search.";}
      else{
        document.querySelector("#locationHint").textContent="Tap the map to drop a pin. You can drag the pin to fine-tune it.";
        ensureMap().then(ok=>{if(ok){if(currentOrigin)mapInstance.setCenter(currentOrigin);mapHelp.textContent="Tap the map to drop a pin. Drag it to adjust."; }});
      }
    }
    document.querySelector("#gps").addEventListener("click",()=>setMode("gps"));
    document.querySelector("#areaMode").addEventListener("click",()=>setMode("area"));
    document.querySelector("#areaFallback").addEventListener("change",event=>{const point=areas[event.target.value];if(point){locationMode="area";setSelectedLocation(point);document.querySelector("#locationHint").textContent=event.target.value+" selected. Add the Maps key to place a custom pin.";}});

    function clearPlaceMarkers(){placeMarkers.forEach(marker=>marker.setMap(null));placeMarkers=[];if(radiusCircle)radiusCircle.setMap(null);}
    function renderMap(){
      ensureMap().then(ok=>{
        if(!ok||!mapInstance)return;
        clearPlaceMarkers();updateOriginMarker();
        const bounds=new google.maps.LatLngBounds();
        if(currentOrigin){bounds.extend(currentOrigin);radiusCircle=new google.maps.Circle({map:mapInstance,center:currentOrigin,radius:Number(document.querySelector("#radius").value),fillColor:"#4285f4",fillOpacity:.06,strokeColor:"#4285f4",strokeOpacity:.35,strokeWeight:1});}
        shortlist.forEach((place,index)=>{
          const marker=new google.maps.Marker({map:mapInstance,position:place.location,label:String(index+1),title:place.name});
          const info=new google.maps.InfoWindow();
          const link=place.googleMapsUri||"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(place.name+" "+place.address);
          const type=place.category?'<div>'+escapeHtml(place.category)+'</div>':"";
          const rating=place.rating?'<div>★ '+Number(place.rating).toFixed(1)+(place.count?" ("+Number(place.count).toLocaleString()+")":"")+"</div>":"";
          info.setContent('<div style="font:13px Arial,sans-serif;max-width:230px"><strong>'+escapeHtml(place.name)+'</strong>'+type+'<div>'+escapeHtml(place.address||"")+"</div>"+rating+'<div><a href="'+escapeHtml(link)+'" target="_blank" rel="noreferrer">Open in Google Maps</a></div></div>');
          marker.addListener("click",()=>info.open({map:mapInstance,anchor:marker}));
          placeMarkers.push(marker);bounds.extend(place.location);
        });
        if(currentOrigin){bounds.extend(currentOrigin);mapInstance.fitBounds(bounds,48);}else if(shortlist.length){mapInstance.fitBounds(bounds,48);}
        mapHelp.textContent=locationMode==="area"?"Tap or drag the blue pin to change the search location.":"Blue pin is your search location; numbered markers are the shortlist.";
      });
    }
    function weightedPick(pool,count){
      const left=pool.slice(),picked=[];
      while(left.length&&picked.length<count){
        const weights=left.map(place=>{const index=ranked.findIndex(item=>item.id===place.id);return Math.pow(Math.max(1,ranked.length-index),.72);});
        let needle=Math.random()*weights.reduce((a,b)=>a+b,0),idx=0;
        while(idx<weights.length-1&&needle>weights[idx]){needle-=weights[idx];idx++;}
        picked.push(left.splice(idx,1)[0]);
      }
      return picked;
    }
    function chooseShortlist(){
      let remaining=ranked.filter(place=>!seenIds.has(place.id));
      if(remaining.length<Math.min(3,ranked.length)){seenIds.clear();remaining=ranked.slice();}
      const pool=remaining.slice(0,Math.min(12,remaining.length));
      shortlist=weightedPick(pool,Math.min(3,ranked.length)).sort((a,b)=>(b.rating||0)-(a.rating||0)||a.distanceKm-b.distanceKm);
      shortlist.forEach(place=>seenIds.add(place.id));
      render();renderMap();
    }
    function render(){
      if(!shortlist.length)return;
      cards.innerHTML=shortlist.map((place,index)=>{
        const rating=place.rating?'<span class="stat">★ <strong>'+Number(place.rating).toFixed(1)+'</strong>'+(place.count?' <span>('+Number(place.count).toLocaleString()+')</span>':'')+'</span>':'';
        const category=place.category?'<span class="category">'+escapeHtml(place.category)+'</span>':'';
        const price=priceText(place.priceLevel);
        const spend=spendEstimate(place.priceRange);
        const profile=[place.category,price].filter(Boolean).join(" · ");
        const gmaps=place.googleMapsUri||"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(place.name+" "+place.address);
        return '<article class="place"><div class="place-top"><h3>'+escapeHtml(place.name)+'</h3><span class="rank">PICK 0'+(index+1)+'</span></div>'+category+'<p class="place-address">'+escapeHtml(place.address||"Singapore")+'</p><div class="stats"><span class="stat"><strong>'+place.distanceKm.toFixed(1)+' km</strong> away</span>'+rating+(price?'<span class="stat"><strong>'+price+'</strong></span>':'')+'</div><div class="food-context"><b>Google listing:</b> '+escapeHtml(profile||"Food venue")+'. '+escapeHtml(notes[preference])+'</div>'+(spend?'<div class="food-context"><b>Approx. spend:</b> '+escapeHtml(spend)+' <span class="spend-note">(midpoint of Google’s listed price range)</span></div>':'<div class="food-context"><b>Approx. spend:</b> amount not listed by Google; price level '+escapeHtml(price||"unavailable")+'</div>')+'<div class="dish-results" id="dish-'+escapeHtml(place.id)+'">Loading Google review dish mentions…</div><div class="place-bottom">'+(place.websiteUri?'<a class="directions" href="'+escapeHtml(place.websiteUri)+'" target="_blank" rel="noreferrer">Website ↗</a>':'<span class="unverified">Google review insights</span>')+'<a class="directions" href="'+escapeHtml(gmaps)+'" target="_blank" rel="noreferrer">Google Maps ↗</a></div></article>';
      }).join("");
      shortlist.forEach(place=>loadDishIdeas(place.id));
      document.querySelector("#result-summary").textContent="Ranked by rating, then distance. The shortlist samples from the strongest nearby candidates; rotate for alternatives.";
      rotate.classList.toggle("show",ranked.length>3);
    }
    const dishCache=new Map();
    async function loadDishIdeas(placeId){
      const target=document.querySelector("#dish-"+CSS.escape(placeId));
      if(!target)return;
      target.textContent="Loading Google review dish mentions…";
      try{
        let result=dishCache.get(placeId);
        if(!result){const response=await fetch("/api/place-details",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({placeId})});result=await response.json();if(!response.ok)throw new Error(result.error||"Could not load review mentions.");dishCache.set(placeId,result);}
        if(result.dishMentions&&result.dishMentions.length){
          target.innerHTML="<b>Review dish mentions</b><ul>"+result.dishMentions.map(item=>{const authors=(item.authors||[]).map(author=>author.uri?'<a href="'+escapeHtml(author.uri)+'" target="_blank" rel="noreferrer">'+escapeHtml(author.name)+'</a>':escapeHtml(author.name)).join(", ");return "<li><b>"+escapeHtml(item.name)+"</b> · "+item.mentions+" mention"+(item.mentions===1?"":"s")+(authors?" · "+authors:"")+"</li>";}).join("")+"</ul><div>Names are extracted from up to five Google reviews, not verified menu items. <a href='"+escapeHtml(result.reviewsUri||result.googleMapsUri||"#")+"' target='_blank' rel='noreferrer'>View Google reviews</a></div>"+(result.editorialSummary?'<div style="margin-top:6px"><b>About this place:</b> '+escapeHtml(result.editorialSummary)+'</div>':"");
        }else{
          target.innerHTML="No clear dish names were found in the available reviews. <a href='"+escapeHtml(result.reviewsUri||result.googleMapsUri||"#")+"' target='_blank' rel='noreferrer'>Read Google reviews</a>"+(result.editorialSummary?'<div style="margin-top:6px"><b>About this place:</b> '+escapeHtml(result.editorialSummary)+'</div>':"");
        }
      }catch(error){target.textContent="Review details could not be loaded: "+error.message;}
    }
    async function runSearch(){
      proceed.disabled=true;proceed.textContent="Finding nearby places…";statusBox.className="status";
      try{
        if(locationMode==="area"){
          if(!currentOrigin)throw new Error("Tap the map to choose a search pin.");
        }else{
          currentOrigin=await new Promise((resolve,reject)=>{if(!navigator.geolocation)return reject(new Error("Location access is not available. Select an area and place a pin instead."));navigator.geolocation.getCurrentPosition(p=>resolve({lat:p.coords.latitude,lng:p.coords.longitude}),()=>reject(new Error("We couldn't access your location. Select an area and place a pin instead.")),{enableHighAccuracy:false,timeout:10000,maximumAge:60000});});
        }
        const response=await fetch("/api/recommendations",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({lat:currentOrigin.lat,lng:currentOrigin.lng,radius:Number(document.querySelector("#radius").value),preference})});
        const data=await response.json();if(!response.ok)throw new Error(data.error||"The search could not be completed.");
        candidates=data.places||[];seenIds.clear();
        if(!candidates.length){cards.innerHTML='<div class="empty">No places matched this radius. Increase the distance and try again.</div>';rotate.classList.remove("show");document.querySelector("#result-summary").textContent="No nearby places found.";setStatus("Try a wider search radius.");renderMap();return;}
        const selectedLevel=document.querySelector("#priceLevel").value;
        ranked=candidates.map(place=>({...place,distanceKm:distanceKm(currentOrigin,place.location)})).filter(place=>(preference!=="vegetarian"||place.servesVegetarianFood===true)&&(!selectedLevel||priceText(place.priceLevel)===selectedLevel)).sort((a,b)=>(b.rating||0)-(a.rating||0)||a.distanceKm-b.distanceKm);
        if(!ranked.length){const message=preference==="vegetarian"?"Google returned no places marked as serving vegetarian food that match this price. Try another price or Anything.":"No nearby places matched this price. Choose another price or Any price.";cards.innerHTML='<div class="empty">'+escapeHtml(message)+'</div>';rotate.classList.remove("show");document.querySelector("#result-summary").textContent="No places found for these filters.";setStatus(preference==="vegetarian"?"Google’s vegetarian listing data may be incomplete.":"Google may not provide price data for every place.");renderMap();return;}
        chooseShortlist();const prefMessage=preference==="vegetarian"?"Filtered to places Google marks as serving vegetarian food. Confirm the specific dish with the eatery.":preference==="nonspicy"?"Non-spicy is an ordering reminder only; Google does not provide a spice filter.":preference==="nonfried"?"Non-fried is an ordering reminder only; Google does not provide a cooking-method filter.":"No dietary filter applied.";setStatus("Nearby options found. "+prefMessage+" Review mentions are clues, not a current menu.");
        document.querySelector("#results-title").scrollIntoView({behavior:"smooth",block:"start"});
      }catch(error){setStatus(error.message,"error");}
      finally{proceed.disabled=false;proceed.innerHTML='Find nearby food <span aria-hidden="true">→</span>';}
    }
    proceed.addEventListener("click",runSearch);
    rotate.addEventListener("click",()=>{chooseShortlist();});
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
