'use strict';
var app = angular.module('ckgsPWA').
controller('track_shippingController', ['$rootScope', '$scope', '$window', '$state', '$http', '$timeout', 'CONSTANTS', 'restServices', 'localStorageService', function($rootScope, $scope, $window, $state, $http, $timeout, CONSTANTS, restServices, localStorageService) {
    
    $scope.getStatus =function(){
		var data = localStorageService.get("RequestObj");
		var headers = restServices.getHeaders();
		var config = {};
    	config.headers = headers;
		var url = CONSTANTS.trackShippingStatus;
		restServices.restPutType(url,data,config,function(status,res) {
			console.log(res);
			$scope.status = res.data.CKGSDataResponse.AvailableStatus;
			if ($scope.status == 0){
				$scope.message = res.data.CKGSDataResponse.Error;
			}
			else if ($scope.status == 1){
				$scope.WebReferenceNo = res.data.CKGSDataResponse.WebReferenceNo;
				$scope.fromSource = res.data.CKGSDataResponse.ShippingDetails.YouToCKGS.source;
				$scope.fromAddress = res.data.CKGSDataResponse.ShippingDetails.YouToCKGS.shipAddress;
				$scope.toSource = res.data.CKGSDataResponse.ShippingDetails.CKGSToYou.source;
				$scope.toAddress = res.data.CKGSDataResponse.ShippingDetails.CKGSToYou.shipAddress;
			}
		});
	}

}]);
