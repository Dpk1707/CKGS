'use strict';
var app = angular.module('ckgsPWA').
controller('track_applicationController', ['$rootScope','$scope', '$window', '$state', '$http', '$timeout','CONSTANTS','restServices','localStorageService','$sce', function($rootScope, $scope, $window, $state, $http, $timeout, CONSTANTS,restServices,localStorageService,$sce) {

	$scope.getApplicationStatus = function(){
		var dataReq = localStorageService.get("RequestObj");
		var url = CONSTANTS.trackApplicationStatus;
		var headers = restServices.getHeaders();
		var config = {};
    	config.headers = headers;
		restServices.restPutType(url,dataReq,config,function(status,data) {
			if (data == "" || data == undefined){
				return;
			}
			if (data.data.CKGSDataResponse.AvailableStatus == 0) 
			{
				swal("NO DATA Found");
				return;
			}
			else if(data.data.CKGSDataResponse.AvailableStatus == 1){
				$scope.wrf= localStorageService.get("WRF");
				$scope.statusList = data.data.CKGSDataResponse.StatusDetails.Visa;
				localStorageService.set("appStatus",$scope.statusList);
				$scope.latest = data.data.CKGSDataResponse.StatusDetails.Visa[0];
				$scope.Date = new Date($scope.latest.Date);
				$scope.status = $scope.latest.Status;
				$scope.StatusMsg = $scope.latest.StatusMsg;
			}
		})
	}

	$scope.renderHTML = function()
    {
        var decoded = angular.element('<textarea />').html($scope.StatusMsg).text();
        return $sce.trustAsHtml(decoded);
    };


}]);