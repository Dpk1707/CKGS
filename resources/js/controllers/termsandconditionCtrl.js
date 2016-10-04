'use strict';
var app = angular.module('ckgsPWA').
controller('termsandconditionController', ['$rootScope','$scope', '$window', '$state', '$http', '$timeout','CONSTANTS','restServices','localStorageService','$sce', function($rootScope, $scope, $window, $state, $http, $timeout, CONSTANTS,restServices,localStorageService,$sce) {

	$scope.getTerms = function(){
		var data = {};
		var feedback= {};
		feedback.ValidationKey = CONSTANTS.testValidationKey;
		feedback.WebRefNo = localStorageService.get('WRF');
		feedback.DateOfBirth = localStorageService.get('DOB');
		feedback.Passport = localStorageService.get('PassNo');
		feedback.Purpose = "terms_and_conditions";
		data.CKGSDataRequest = feedback;
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