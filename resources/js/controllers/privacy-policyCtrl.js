'use strict';
var app = angular.module('ckgsPWA').
controller('privacy-policyController', ['$rootScope','$scope', '$window', '$state', '$http', '$timeout','CONSTANTS','restServices','localStorageService','$sce', function($rootScope, $scope, $window, $state, $http, $timeout, CONSTANTS,restServices,localStorageService,$sce) {

	$scope.getPolicy = function(){
		var data = {};
		var policyDoc= {};
		policyDoc.ValidationKey = CONSTANTS.testValidationKey;
		policyDoc.WebRefNo = localStorageService.get('WRF');
		policyDoc.DateOfBirth = localStorageService.get('DOB');
		policyDoc.Passport = localStorageService.get('PassNo');
		policyDoc.Purpose = "privacy_policy";
		data.CKGSDataRequest = policyDoc;
		var online = navigator.onLine;
	if(online===true){
		var headers = restServices.getHeaders();
		var config = {};
    	config.headers = headers;
		var url = CONSTANTS.documentation;
		restServices.restPutType(url,data,config,function(status,res) {
			if(res.data!=null){
			localStorageService.set("policy",res);
			$scope.description = res.data.CKGSDataResponse.privacy_policy;
		}else{
			$scope.offlinePolicy();
		}
		});
	}else{
	 $scope.offlinePolicy();
	}

	},
	$scope.offlinePolicy=function(){
		var res=localStorageService.get("policy");
			if(res!=null){
		$scope.description = res.data.CKGSDataResponse.privacy_policy;
	}else{
		$state.go("home");
		setTimeout(function(){
					swal("No offline data avaiable.Please enable your mobile network!");
					return;
		}, 3000);
	}
	},

	$scope.renderHTML = function()
    {
        var decoded = angular.element('<textarea />').html($scope.description).text();
        return $sce.trustAsHtml(decoded);
    };

}]);
