'use strict';
var app = angular.module('ckgsPWA').
controller('locationController', ['$rootScope','$scope', '$window', '$state', '$http', '$timeout','CONSTANTS','restServices','localStorageService', function($rootScope, $scope, $window, $state, $http, $timeout, CONSTANTS,restServices,localStorageService) {

	$scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyBicvxY9eNQi4mxgX6S11fVpttGWTIbcPY";

	$scope.address = "Toronto Canada";

}]);