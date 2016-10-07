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
  "views/passport-service-guide.html",
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
  "bower_components/bootstrap/dist/css/bootstrap.min.css",
  "bower_components/font-awesome/css/font-awesome.min.css",
  "bower_components/angularjs-datepicker/src/css/angular-datepicker.css",
  "bower_components/sweetalert/dist/sweetalert.css",
  "resources/css/style.css",
  "resources/css/media.css",
  "resources/css/plugin.css",
  "resources/css/custom.css",
  "bower_components/jquery/dist/jquery.min.js",
  "resources/js/modernizr-2.6.2.min.js",
  "bower_components/angular/angular.min.js",
  "bower_components/angular-ui-router/release/angular-ui-router.min.js",
  "bower_components/angular-sanitize/angular-sanitize.min.js",
  "bower_components/oclazyload/dist/ocLazyLoad.min.js",
  "bower_components/bootstrap/dist/js/bootstrap.min.js",
  "bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
  "bower_components/angular-local-storage/dist/angular-local-storage.min.js",
  "bower_components/angularjs-datepicker/src/js/angular-datepicker.js",
  "bower_components/ngmap/build/scripts/ng-map.min.js",
  "bower_components/sweetalert/dist/sweetalert.min.js",
  "resources/js/plugins.js",
  "resources/js/main.js",
  "resources/js/app.js",
  "resources/js/constants.js",
  "resources/js/directives.js",
  "resources/js/restservices.js",
  "resources/js/controllers/ckgs-loginCtrl.js",
  "resources/js/controllers/ckgs-trackapplicationCtrl.js",
  "resources/js/controllers/status-historyCtrl.js",
  "resources/js/controllers/historyCtrl.js",
  "resources/js/controllers/ckgs-trackshippingCtrl.js",
  "resources/js/controllers/ckgs-application-centerCtrl.js",
  "resources/js/controllers/termsandconditionCtrl.js",
  "resources/js/controllers/privacy-policyCtrl.js",
  "resources/js/controllers/ckgs-holiday-listCtrl.js",
  "resources/js/controllers/ckgs-complaintCtrl.js",
  "resources/js/controllers/ckgs-feedbackCtrl.js",
  "resources/js/controllers/ckgs-faqCtrl.js",
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
  "resources/images/icons/icon-512x512.png",
  "resources/fonts/opensans-light-webfont.ttf"
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
self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
