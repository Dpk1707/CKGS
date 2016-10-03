'use strict';
var app = angular.module('ckgsPWA').
controller('track_shippingController', ['$rootScope', '$scope', '$window', '$state', '$http', '$timeout', 'CONSTANTS', 'restServices', 'localStorageService', function($rootScope, $scope, $window, $state, $http, $timeout, CONSTANTS, restServices, localStorageService) {
    console.log("Im in track_shippingController!");
    $scope.isFedexTabActive = true;
    $scope.isOtherTabActive = false;
}]);
