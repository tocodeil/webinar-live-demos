self.addEventListener('install', function(event) {
  console.log('Install');
});

self.addEventListener('activate', function(event) {
  console.log('Activate');
});

console.log('1');
self.addEventListener('message', (event) => {
    console.log(`The client sent me a message: ${event.data}`);
  self.registration.showNotification('ServiceWorker Cookbook', {
    body: event.data,
  });  
});
