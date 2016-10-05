'use strict';
var app = angular.module('ckgsPWA').
controller('navCtrl', ['$rootScope', '$scope', '$window', '$state', '$http', '$timeout', 'CONSTANTS', 'restServices', 'localStorageService','$uibModal', function($rootScope, $scope, $window, $state, $http, $timeout, CONSTANTS, restServices, localStorageService,$uibModal) {
    console.log("Im in logoutCtrl!");

    $scope.logout = function(){
    localStorage.removeItem("login");
		$state.go("login");
		$window.close();
    }

    $scope.app = function(size){
    	$uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/rateApp.html',
            size: size,
            controller: function($scope,$uibModalInstance){

            }
        });
    }
    
}]);
