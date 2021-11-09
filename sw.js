const staticCacheName = 'site-static';

const assets = [
    './index.html',
    './src/main.js',
    './src/main.css',

    'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css',
    'https://code.jquery.com/jquery-3.5.1.slim.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js',
    'https://cdn.plot.ly/plotly-2.4.2.min.js'
  ];
  

// install
self.addEventListener('install', event => {
    console.log('installing…');
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell asssets')
            return cache.addAll(assets);
        })
    );
});

// activate
self.addEventListener('activate', event => {
    console.log('now ready to handle fetches!');
});

// fetch
self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
      caches.match(event.request).then(response => {
          return response || fetch(event.request);
      }).catch(error => {
        console.log("error")
      })
    );
  });