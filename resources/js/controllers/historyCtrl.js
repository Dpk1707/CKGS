'use strict';
var app = angular.module('ckgsPWA').
controller('historyController', ['$rootScope','$scope', '$window', '$state', '$http', '$timeout','CONSTANTS','restServices','localStorageService','$sce', function($rootScope, $scope, $window, $state, $http, $timeout, CONSTANTS,restServices,localStorageService,$sce) {

	$scope.change = function(data){
		console.log(data);
	}

    $scope.render2HTML = function()
    {
        var decodedMsg = angular.element('<textarea />').html($rootScope.statusMessage).text();
        return $sce.trustAsHtml(decodedMsg);
    };


}]);