# My First Service Worker

A Service Worker is a proxy that keeps on running on the user's system even when the user is not in your website, and EVEN when the user's browser is closed.

We use a Service Worker to implement offline interactions - such as:

1. Offline content or better cache

2. Push Notifications

3. Background sync

In this first tutorial we'll write a service worker and use the Notification API to send a push notification to a user. This will still not be a "true" push notification since the user will need to press the button in the browser to get notified.

## Our First Service Worker
A Service worker is saved in a different file than the main JS file. You can choose any name you like.

1. Create a new file called `sw.js` in the root directory of this project.

2. In `sw.js` Write the following content:

```
self.addEventListener('install', function(event) {
  console.log('Install');
});

self.addEventListener('activate', function(event) {
  console.log('Activate');
});
```

3. In the file `main.js` write the following content:

```
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

```

4. Start a local server on `http://localhost:8080` and visit index.html file.

5. Visit your browser's devtools and verify your new service worker is installed.

6. Modify the log messages in the service worker and reload the page. See if you can get the new service worker to work.

## A First Push Notification
Service Workers can send notifications using the "Notification API". Let's first use our main.js to send notifications from the app itself, before moving this functionality to the worker.

In file `main.js` Add the following code:

```
function showNotification() {
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('Vibration Sample', {
          body: 'Buzz! Buzz!',
        });
      });
    }
  });
}
```

We can only show notifications in response to a user's actions. So connect this function to the button in the HTML and verify that when you click on the button the browser shows the notification.

All the options of the constructor are available here:
https://developer.mozilla.org/en-US/docs/Web/API/notification/Notification

Play with the code and add more kinds of notifications, change the image, change the buttons text etc.

## Moving Our Notification To The Service Worker
One way to communicate with our service worker is the postMessage API.

1. In the service worker write the following code:

```
self.addEventListener('message', (event) => {
    console.log(`The client sent me a message: ${event.data}`);
});
```

Now open a console and use the following line to send a message to the service worker:

```
navigator.serviceWorker.controller.postMessage('Hello world'');
```

If all went well, in the console you should see the message "the client sent me a message: hello world".

2. Now You - Modify the service worker so it will pop up a notification every time it receives a message from the client (instead of console.log).

## A First Service Worker - Fin
Bravo! You have your first service worker running and accepting messages from its clients.
