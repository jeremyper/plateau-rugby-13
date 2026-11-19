// Service worker : notifications sur Android et ouverture de l'appli sans réseau.
// Changer VERSION à chaque mise en ligne : les téléphones rechargent alors tous les fichiers.
const VERSION='plateau13-2026-11-19b';
const APP=['./','index.html','guide.html','manifest.webmanifest','icon-192.png','icon-512.png'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(VERSION)
    .then(c=>c.addAll(APP.map(u=>new Request(u,{cache:'reload'}))))
    .then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys()
    .then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim()));
});

// Fichiers de l'appli et polices : réponse immédiate depuis le téléphone, mise à jour en arrière-plan
// (une nouvelle version s'affiche donc à l'ouverture suivante).
// La météo (Open-Meteo) ne passe pas par ici : l'appli garde elle-même la dernière prévision.
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET')return;
  const u=new URL(r.url),same=u.origin===self.location.origin;
  if(!same&&!/^fonts\.(googleapis|gstatic)\.com$/.test(u.hostname))return;
  e.respondWith((async()=>{
    const c=await caches.open(VERSION);
    const hit=await c.match(r,{ignoreSearch:same});
    const net=fetch(r).then(res=>{
      if(res&&(res.ok||res.type==='opaque'))c.put(r,res.clone()).catch(()=>{});
      return res;
    }).catch(()=>null);
    if(hit){e.waitUntil(net);return hit}
    const res=await net;
    if(res)return res;
    if(r.mode==='navigate'){const home=await c.match('./');if(home)return home}
    return Response.error();
  })());
});

self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{
    for(const c of cs){if('focus' in c)return c.focus()}
    return self.clients.openWindow('./');
  }));
});
