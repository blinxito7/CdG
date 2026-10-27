// Sustituye en la dirección antigua al service worker de la Libreta, por si alguna vez se instaló allí (F1-14).
// Al activarse borra la caché de la Libreta, se da de baja y recarga las pestañas abiertas, para que la dirección
// antigua solo muestre «La Libreta se ha mudado». No hace peticiones ni toca nada más.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k.startsWith('libreta-')).map(k => caches.delete(k))))
    .then(() => self.registration.unregister())
    .then(() => self.clients.matchAll({ type: 'window' }))
    .then(cs => Promise.all(cs.map(c => c.navigate(c.url)))));
});
