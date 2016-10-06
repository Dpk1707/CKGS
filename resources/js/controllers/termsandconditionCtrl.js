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
		var online = navigator.onLine;
	if(online===true){
		var headers = restServices.getHeaders();
		var config = {};
    	config.headers = headers;
		var url = CONSTANTS.documentation;
		restServices.restPutType(url,data,config,function(status,res) {
			console.log(res);
			if(res.data!=null){
			localStorageService.set("terms",res);
			$scope.description = res.data.CKGSDataResponse.terms_and_conditions;
		}else{
			$scope.offlineTerms();
		}
		});
	}else{
   $scope.offlineTerms();
	}
	}
$scope.offlineTerms=function(){
	var res=localStorageService.get("terms");
		if(res!=null){
	$scope.description = res.data.CKGSDataResponse.terms_and_conditions;
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
