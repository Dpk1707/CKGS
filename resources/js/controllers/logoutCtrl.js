'use strict';
var app = angular.module('ckgsPWA').
controller('navCtrl', ['$rootScope', '$scope', '$window', '$state', '$http', '$timeout', 'CONSTANTS', 'restServices', 'localStorageService', function($rootScope, $scope, $window, $state, $http, $timeout, CONSTANTS, restServices, localStorageService) {
    console.log("Im in logoutCtrl!");

    $scope.logout = function(){
    localStorage.removeItem("login");
		$state.go("login");
		$window.close();
    }
}]);
