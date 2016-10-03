'use strict';
var app = angular.module('ckgsPWA').
controller('complaintCtrl', ['$rootScope','$scope', '$window', '$state', '$http', '$timeout','CONSTANTS','restServices','localStorageService', function($rootScope, $scope, $window, $state, $http, $timeout, CONSTANTS,restServices,localStorageService) {

	$scope.sendComplaint =function(complaint,isValid){
		if(isValid){
			var data = {};
			complaint.ValidationKey = CONSTANTS.testValidationKey;
			complaint.WebRefNo = localStorageService.get('WRF');
			complaint.DateOfBirth = localStorageService.get('DOB');
			complaint.Passport = localStorageService.get('PassNo');
			complaint.Purpose = "complain-about";
			data.CKGSDataRequest = complaint;
			console.log(data);
  			var headers = restServices.getHeaders();
			var config = {};
        	config.headers = headers;
			var url = CONSTANTS.updateStatus;
			restServices.restPutType(url,data,config,function(status,res) {
				console.log(res);
			})
		}
		else{
            $scope.$broadcast('show-error-event');
		}
	}

}]);