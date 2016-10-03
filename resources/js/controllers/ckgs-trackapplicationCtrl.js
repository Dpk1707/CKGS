'use strict';
var app = angular.module('ckgsPWA').
controller('track_applicationController', ['$rootScope','$scope', '$window', '$state', '$http', '$timeout','CONSTANTS','restServices','localStorageService', function($rootScope, $scope, $window, $state, $http, $timeout, CONSTANTS,restServices,localStorageService) {

	$scope.getApplicationStatus = function(){
		var dataReq = localStorageService.get("RequestObj");
		var url = CONSTANTS.trackApplicationStatus;
		var headers = restServices.getHeaders();
		var config = {};
    	config.headers = headers;
		restServices.restPutType(url,dataReq,config,function(status,data) {
			console.log(data);
			if (data == "" || data == undefined){
				return;
			}
			if (data.data.CKGSDataResponse.AvailableStatus == 0) 
			{
				alert("NO DATA Found");
				return;
			}
			else if(data.data.CKGSDataResponse.AvailableStatus == 1){
				$scope.wrf= localStorageService.get("WRF");
				$scope.latest = data.data.CKGSDataResponse.StatusDetails.Visa.slice(-1).pop();
				$scope.Date = $scope.latest.Date;
				$scope.StatusMsg = $scope.latest.StatusMsg;
			}
		})
	}

}]);