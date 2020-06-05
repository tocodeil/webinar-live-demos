var CACHE = 'network-or-cache';

self.addEventListener('install', function(evt) {
  console.log('Install');
  evt.waitUntil(precache());
});

self.addEventListener('activate', function(evt) {
  console.log('Activate');
});

self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset');
  console.log(evt.request)

  evt.respondWith(fromNetwork(evt.request, 400).catch(function () {
    return fromCache(evt.request);
  }));  
});

function precache() {
  console.log("Prepare cache");
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
      '/',
      './index.html',
      './game.css',
      './game.js',
    ]);
  });
}

function fromNetwork(request, timeout) {
  return new Promise(function (fulfill, reject) {
    var timeoutId = setTimeout(reject, timeout);
    fetch(request).then(function (response) {
      clearTimeout(timeoutId);
      fulfill(response);
    }, reject);
  });
}

function fromCache(request) {
  console.log('Searching in cache for ', request);
  return caches.open(CACHE).then(function (cache) {
    console.log('Cache open: ', cache);
    return cache.match(request).then(function (matching) {
      console.log('matching = ', matching);
      return matching || Promise.reject('no-match');
    });
  });
}
