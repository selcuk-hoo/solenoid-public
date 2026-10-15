/* Servis çalışanı: uygulamayı cihaza yazar, kurulumdan sonra internet gerekmez.
   Sayfanın kendisi önce ağdan istenir (güncel sürüm), ağ yoksa önbellekten açılır.
   Yayından önce SURUM'u değiştirmek, eski önbelleğin silinmesini sağlar. */
const SURUM = "bobin-8";
const KABUK = ["./", "./index.html", "./manifest.json", "./ikon.svg", "./ikon-192.png", "./ikon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(SURUM).then(c => c.addAll(KABUK)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== SURUM).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // sayfa: önce ağ, yoksa önbellek
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(r => {
      const kopya = r.clone(); caches.open(SURUM).then(c => c.put("./index.html", kopya)); return r;
    }).catch(() => caches.match("./index.html")));
    return;
  }
  // kendi dosyalarımız ve Google yazı tipleri: önce önbellek, yoksa ağdan alıp sakla
  if (url.origin === location.origin || /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.match(req).then(h => h || fetch(req).then(r => {
      if (r.ok || r.type === "opaque") { const kopya = r.clone(); caches.open(SURUM).then(c => c.put(req, kopya)); }
      return r;
    })));
  }
});
