/***
CKGS AngularJS App Main Script
***/
/* CKGS App */
var ckgs = angular.module('ckgsPWA',[
  'ui.router',
  'ui.bootstrap',
  'ngSanitize',
  'oc.lazyLoad',
  'LocalStorageModule',
  'ckgsPWA.constants',
  'ckgsPWA.directives',
  '720kb.datepicker',
  'ngMap'
]);

ckgs.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/login");

  $stateProvider
  .state('login', {
      url: "/login",
      templateUrl: "views/mainpage.html",
      data: {pageTitle: 'Login'},
      controller: "LoginController",
      resolve: {
      deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: [
            'resources/js/controllers/ckgs-loginCtrl.js'
          ]
        });
      }]
    }
  })

  .state('home',{
    url: "/home",
    templateUrl: "views/home.html"
  })

  .state('track_application_status', {
      url: "/track_application_status",
      templateUrl: "views/track_application_status.html",
      data: {pageTitle: 'track_application_status'},
      controller: "track_applicationController",
      resolve: {
      deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: [
            'resources/js/controllers/ckgs-trackapplicationCtrl.js'
          ]
        });
      }]
    }
  })

  .state('track-shipping-status', {
      url: "/track-shipping-status",
      templateUrl: "views/track-shipping-status.html",
      data: {pageTitle: 'track-shipping-status'},
      controller: "track_shippingController",
      resolve: {
      deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: [
            'resources/js/controllers/ckgs-trackshippingCtrl.js'
          ]
        });
      }]
    }
  })

   .state('track-shipping-status-received',{
      url: "/track-shipping-status-received",
      templateUrl: "views/track-shipping-status-received.html",
      data: {pageTitle: 'track-shipping-status-received'},
      controller: "track_shippingController"
  })
  
  .state('faq', {
      url: "/faq",
      templateUrl: "views/faq.html",
      data: {pageTitle: 'faq'},
      controller: "faqController",
      resolve: {
      deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: [
            'resources/js/controllers/ckgs-faqCtrl.js'
          ]
        });
      }]
    }
  })

  .state('passport-service-guide',{
      url: "/passport-service-guide",
      templateUrl: "views/passport-service-guide.html",
      data: {pageTitle: 'passport-service-guide'},
      controller: "faqController"
  })

  .state('feedback', {
      url: "/feedback",
      templateUrl: "views/feedback.html",
      data: {pageTitle: 'feedback'},
      controller: "feedbackCtrl",
      resolve: {
      deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: [
            'resources/js/controllers/ckgs-feedbackCtrl.js'
          ]
        });
      }]
    }
  })

  .state('complaint', {
      url: "/complaint",
      templateUrl: "views/complaints.html",
      data: {pageTitle: 'complaint'},
      controller: "complaintCtrl",
      resolve: {
      deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: [
            'resources/js/controllers/ckgs-complaintCtrl.js'
          ]
        });
      }]
    }
  })

  .state('privacy-policy',{
    url: "/privacy-policy",
    templateUrl: "views/privacyPolicy.html",
    data: {pageTitle: 'privacy-policy'},
      controller: "privacy-policyController",
      resolve: {
      deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: [
            'resources/js/controllers/privacy-policyCtrl.js'
          ]
        });
      }]
    }
  })

  .state('terms-and-conditions',{
    url: "/terms-and-conditions",
    templateUrl: "views/terms-and-conditions.html",
    data: {pageTitle: 'terms-and-conditions'},
      controller: "termsandconditionController",
      resolve: {
      deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: [
            'resources/js/controllers/termsandconditionCtrl.js'
          ]
        });
      }]
    }
  })

  .state('holiday-list', {
      url: "/holiday-list",
      templateUrl: "views/holiday-list.html",
      data: {pageTitle: 'holiday-list'},
      controller: "holidayListController",
      resolve: {
      deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: [
            'resources/js/controllers/ckgs-holiday-listCtrl.js'
          ]
        });
      }]
    }
  })

  .state('ckgs-application-center', {
      url: "/ckgs-application-center",
      templateUrl: "views/ckgs-application-center.html",
      data: {pageTitle: 'ckgs-application-center'},
      controller: "appcenterController",
      resolve: {
      deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: [
            'resources/js/controllers/ckgs-application-centerCtrl.js'
          ]
        });
      }]
    }
  })

  .state('ckgs-application-location-map', {
      url: "/ckgs-application-location-map",
      templateUrl: "views/ckgs-application-location-map.html",
      data: {pageTitle: 'ckgs-application-location-map'},
      controller: "appcenterController"
  })

  .state('passport-status-history',{
    url: "/passport-status-history",
    templateUrl: "views/passport-status-history.html"
  })

  .state('passport-status-history-received',{
    url: "/passport-status-history-received",
    templateUrl: "views/passport-status-history-received.html"
  })

}]);

ckgs.run(function($rootScope, $templateCache,$state,localStorageService) {
    $rootScope.flag=false;
    $rootScope.$on('$stateChangeStart',
  function(event, toState, toParams, fromState, fromParams){
    var isLogin = toState.name === "login";
    var data=localStorage.getItem("login");
    if($rootScope.flag===true){
       $rootScope.flag=false;
       return; // no need to redirect
    }
    if(isLogin && data==null){
       return;// no need to redirect
    }else if(isLogin && data!=null){
      event.preventDefault();
      $state.go('home');
    }else if(isLogin===false && data!=null){
      $rootScope.flag=true;
      event.preventDefault();
      $state.go(toState.name);
    }else if(isLogin===false && data==null){
      event.preventDefault();
      $state.go('login');
    }else{
      $rootScope.flag=true;
      event.preventDefault(); // stop current execution
      $state.go('home');
    }
  })
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if (typeof(current) !== 'undefined'){
            $templateCache.remove(current.templateUrl);
        }
    });
});
