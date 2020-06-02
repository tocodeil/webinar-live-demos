# Offline Web App with a Service Worker

## What
In this tutorial we'll build a web application with offline capabilities and handle updates.

## The App
Start the app by visiting index.html. It should display the text "Click to start", and after you click on the text it will display 10 squares, one of them is red. Click the red square to get some points, or any other square to just shuffle.

## Offline Version
Let's start by creating an offline version of them game. Visit:
https://serviceworke.rs/

And select the first recipe called "Network or Cache". You'll need to modify the list of assets to hold all the assets in our application.

Follow the instructions to create a service worker.

Then add the following 2 lines in the "fetch" event handler:

```
  console.log('The service worker is serving the asset');
  console.log(evt.request)
```

Reload the page and verify that in Chrome's console you see all outgoing requests printed.

## Verify Cache in Devtools
Now visit Chrome devtools, go to tab "Application" and "Caches" and verify your cache contains all the application's assets.

After everything's in place stop your local server and see that the page still loads and game still works.


## Bonus

Read about the 5 caching strategies in:
https://serviceworke.rs/

Can you explain the difference between them? When will you use each?


