'use strict';
var app = angular.module('ckgsPWA').
controller('termsandconditionController', ['$rootScope','$scope', '$window', '$state', '$http', '$timeout','CONSTANTS','restServices','localStorageService','$sce', function($rootScope, $scope, $window, $state, $http, $timeout, CONSTANTS,restServices,localStorageService,$sce) {

	$scope.getTerms = function(){
		var data = {};
		var termsAndConditions= {};
		termsAndConditions.ValidationKey = CONSTANTS.testValidationKey;
		termsAndConditions.WebRefNo = localStorageService.get('WRF');
		termsAndConditions.DateOfBirth = localStorageService.get('DOB');
		termsAndConditions.Passport = localStorageService.get('PassNo');
		termsAndConditions.Purpose = "terms_and_conditions";
		data.CKGSDataRequest = termsAndConditions;
		var headers = restServices.getHeaders();
		var config = {};
    	config.headers = headers;
		var url = CONSTANTS.documentation;
		restServices.restPutType(url,data,config,function(status,res) {
			console.log(res);
			$scope.description = res.data.CKGSDataResponse.terms_and_conditions;
		});
	}

	$scope.renderHTML = function()
    {
        var decoded = angular.element('<textarea />').html($scope.description).text();
        return $sce.trustAsHtml(decoded);
    };

}]);