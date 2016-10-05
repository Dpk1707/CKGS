var cacheName = 'CKGS-PWA';
var dataCacheName = 'Ckgs-data';
var filesToCache = [
  "/",
  "index.html",
  "manifest.json",
  "views/mainpage.html",
  "views/home.html",
  "views/navbar.html",
  "views/track_application_status.html",
  "views/passport-status-history.html",
  "views/passport-status-history-received.html",
  "views/track-shipping-status.html",
  "views/feedback.html",
  "views/complaints.html",
  "views/faq.html",
  "views/globalHeader.html",
  "views/commonfooter.html",
  "views/privacyPolicy.html",
  "views/terms-and-conditions.html",
  "views/holiday-list.html",
  "views/passport-status-history.html",
  "views/passport-status-history-received.html",
  "views/ckgs-application-center.html",
  "views/ckgs-application-location-map.html",
  "resources/css/style.css",
  "resources/css/media.css",
  "resources/css/plugin.css",
  "resources/js/main.js",
  "resources/js/app.js",
  "resources/js/constants.js",
  "resources/js/directives.js",
  "resources/js/restservices.js",
  "resources/js/controllers/ckgs-loginCtrl.js",
  "resources/js/controllers/ckgs-trackapplicationCtrl.js",
  "resources/js/controllers/status-historyCtrl.js",
  "resources/js/controllers/historyCtrl.js",
  "resources/js/controllers/ckgs-application-centerCtrl.js",
  "resources/images/parking-map.jpg",
  "resources/images/rate-our-app.jpg",
  "resources/images/view-map.jpg",
  "resources/images/common/ckgs-logo.png",
  "resources/images/common/ckgs-logo-sm copy.png",
  "resources/images/common/ckgs-logo-sm.png",
  "resources/images/common/ckgs-logo-sm_1.png",
  "resources/images/common/ckgs-logo-sm-bkp.png",
  "resources/images/common/ckgs-white-logo.png",
  "resources/images/common/close-btn.png",
  "resources/images/common/custom-back.png",
  "resources/images/common/custom-comment.png",
  "resources/images/common/feedback-icon.png",
  "resources/images/common/feedback-icon-btm.png",
  "resources/images/common/fedex-img.jpg",
  "resources/images/common/fedex-img-1.jpg",
  "resources/images/common/feedback-icon-hov.png",
  "resources/images/common/feedback-icon-sm.png",
  "resources/images/common/holiday-list-icon.png",
  "resources/images/common/icon-history-steps.png",
  "resources/images/common/logout-icon.png",
  "resources/images/common/Untitled-1.png",
  "resources/images/common/retina/ckgs-white-logo.png",
  "resources/images/common/retina/close-btn.png",
  "resources/images/common/retina/custom-back.png",
  "resources/images/common/retina/feedback-icon.png",
  "resources/images/common/retina/feedback-icon-btm.png",
  "resources/images/common/retina/feedback-icon-lg.png",
  "resources/images/common/retina/holiday-list-icon.png",
  "resources/images/common/retina/icon-history-steps.png",
  "resources/images/common/retina/logout-icon.png",
  "resources/images/icons/icon-72x72.png",
  "resources/images/icons/icon-96x96.png",
  "resources/images/icons/icon-128x128.png",
  "resources/images/icons/icon-144x144.png",
  "resources/images/icons/icon-152x152.png",
  "resources/images/icons/icon-192x192.png",
  "resources/images/icons/icon-384x384.png",
  "resources/images/icons/icon-512x512.png"
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          // console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});


//Adding `fetch` event listener
self.addEventListener('fetch', function (event) {
  console.info('Event: Fetch');

  var request = event.request;

  //Tell the browser to wait for newtwork request and respond with below
  event.respondWith(
    //If request is already in cache, return it
    caches.match(request).then(function(response) {
      if (response) {
        // console.log(response);
        return response;
      }

      //if request is not cached, add it to cache
      return fetch(request).then(function(response) {
        var responseToCache = response.clone();
        caches.open(cacheName).then(
          function(cache) {
            cache.put(request, responseToCache).catch(function(err) {
              console.warn(request.url + ': ' + err.message);
            });
          });

        return response;
      });
    })
  );
});


// self.addEventListener('fetch', function(e) {
//   console.log('[Service Worker] Fetch', e.request.url);
//   var dataUrl = e.request.url;
//   console.log("ffgfghf"+e.request.url);
//   if (e.request.url.indexOf(dataUrl) > -1) {
//     console.log("ffgghhhhhhhhhhhhhfghf"+dataUrl);
    
//     e.respondWith(
//       caches.open(dataCacheName).then(function(cache) {
//         return fetch(e.request).then(function(response){
//           cache.put(e.request.url, response.clone());
//           return response;
//         });
//       })
//     );
//   } else {
//     console.log("bcwwwwwwwwwwwwwww"+dataUrl);
//     e.respondWith(
//       caches.match(e.request).then(function(response) {
//         return response || fetch(e.request);
//       })
//     );
//   }
// });
