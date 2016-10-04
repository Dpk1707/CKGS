'use strict';
var app = angular.module('ckgsPWA').
controller('track_shippingController', ['$rootScope', '$scope', '$window', '$state', '$http', '$timeout', 'CONSTANTS', 'restServices', 'localStorageService', function($rootScope, $scope, $window, $state, $http, $timeout, CONSTANTS, restServices, localStorageService) {
    console.log("Im in track_shippingController!");
    $scope.isFedexTabActive = true;
    $scope.isOtherTabActive = false;

    
    $scope.getStatus =function(){
		var data = localStorageService.get("RequestObj");
		var headers = restServices.getHeaders();
		var config = {};
    	config.headers = headers;
		var url = CONSTANTS.trackShippingStatus;
		restServices.restPutType(url,data,config,function(status,res) {
			console.log(res);
			if (res.data.CKGSDataResponse.AvailableStatus == 0){
				swal("Error", ""+res.data.CKGSDataResponse.Error+"", "error");
				$state.go("home");
				return;
			}
			else if (res.data.CKGSDataResponse.AvailableStatus == 1){
				$scope.WebReferenceNo = res.data.CKGSDataResponse.WebReferenceNo;
				$scope.fromSource = res.data.CKGSDataResponse.ShippingDetails.YouToCKGS.source;
				$scope.fromAddress = res.data.CKGSDataResponse.ShippingDetails.YouToCKGS.shipAddress;
				$scope.toSource = res.data.CKGSDataResponse.ShippingDetails.CKGSToYou.source;
				$scope.toAddress = res.data.CKGSDataResponse.ShippingDetails.CKGSToYou.shipAddress;
			}
		});
	}

}]);
