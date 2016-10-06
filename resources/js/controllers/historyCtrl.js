'use strict';
var app = angular.module('ckgsPWA').
controller('historyController', ['$rootScope','$scope', '$window', '$state', '$http', '$timeout','CONSTANTS','restServices','localStorageService','$sce', function($rootScope, $scope, $window, $state, $http, $timeout, CONSTANTS,restServices,localStorageService,$sce) {

	$scope.list = localStorageService.get("appStatus");
	$scope.currentIndex = $rootScope.currentindex;

	$scope.change = function(position){
		if (position == -1) {
			$scope.currentIndex = (($scope.currentIndex - 1) >= 0) ? ($scope.currentIndex - 1) : $scope.currentIndex;
			var currentObject = ($scope.list != null) ? $scope.list[$scope.currentIndex] : null;
			if(currentObject != null && currentObject != undefined){
				$rootScope.statusReceived = currentObject.Status;
				$rootScope.dateReceived = new Date(currentObject.Date);
		    	$rootScope.statusMessage = currentObject.StatusMsg;
		        $rootScope.currentindex = $scope.currentIndex;
			}
		}

		if (position == 1) {
			$scope.currentIndex = (($scope.currentIndex + 1) <= Object.keys($scope.list).length) ? ($scope.currentIndex + 1) : $scope.currentIndex;
			var currentObject1 = ($scope.list != null) ? $scope.list[$scope.currentIndex] : null;
			if(currentObject1 != null && currentObject1 != undefined){
				$rootScope.statusReceived = currentObject1.Status;
				$rootScope.dateReceived = new Date(currentObject1.Date);
		    	$rootScope.statusMessage = currentObject1.StatusMsg;
		        $rootScope.currentindex = $scope.currentIndex;
			}
		}
	}

    $scope.render2HTML = function()
    {
        var decodedMsg = angular.element('<textarea />').html($rootScope.statusMessage).text();
        return $sce.trustAsHtml(decodedMsg);
    };


}]);