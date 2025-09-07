(function(){
  // Standard signal (lokalt). Når du har tunnel: bytt til wss://din.tunnel.tld/signal (eller legg i QR/lenke).
  const DEFAULT_SIGNAL = "wss://din.tunnel.tld/signal";

  function makeShareUrl() {
    // I Cordova er origin ofte file:// – bruk relativ sti til webrtc.html
    const base = (location.href.replace(/index\.html.*/,'') || './');
    const url = base + "webrtc.html?room=test&signal=" + encodeURIComponent(DEFAULT_SIGNAL);
    return url;
  }

  function shareUrl() {
    const url = makeShareUrl();
    const data = {title:"Bli med i Ravn", text:"Åpne denne for å prate i Ravn.", url};
    try{
      if (navigator.share) { return navigator.share(data); }
    }catch(e){}
    // Fallback: enkel prompt (bruker kan kopiere)
    prompt("Kopier lenke:", url);
  }

  // Eksponer for knappen
  window.__ravnShare = shareUrl;
})();
