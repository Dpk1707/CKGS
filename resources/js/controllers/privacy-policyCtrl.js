'use strict';
var app = angular.module('ckgsPWA').
controller('privacy-policyController', ['$rootScope','$scope', '$window', '$state', '$http', '$timeout','CONSTANTS','restServices','localStorageService','$sce', function($rootScope, $scope, $window, $state, $http, $timeout, CONSTANTS,restServices,localStorageService,$sce) {

	$scope.getPolicy = function(){
		var data = {};
		var feedback= {};
		feedback.ValidationKey = CONSTANTS.testValidationKey;
		feedback.WebRefNo = localStorageService.get('WRF');
		feedback.DateOfBirth = localStorageService.get('DOB');
		feedback.Passport = localStorageService.get('PassNo');
		feedback.Purpose = "privacy_policy";
		data.CKGSDataRequest = feedback;
		var headers = restServices.getHeaders();
		var config = {};
    	config.headers = headers;
		var url = CONSTANTS.documentation;
		restServices.restPutType(url,data,config,function(status,res) {
			console.log(res);
			$scope.description = res.data.CKGSDataResponse.privacy_policy;
		});
	}

	$scope.renderHTML = function()
    {
        var decoded = angular.element('<textarea />').html($scope.description).text();
        return $sce.trustAsHtml(decoded);
    };

}]);