'use strict';
var app = angular.module('ckgsPWA').
controller('feedbackCtrl', ['$rootScope','$scope', '$window', '$state', '$http', '$timeout','CONSTANTS','restServices','localStorageService', function($rootScope, $scope, $window, $state, $http, $timeout, CONSTANTS,restServices,localStorageService) {

	$scope.sendfeedback =function(feedback,isValid){
		if(isValid){
			var data = {};
			feedback.ValidationKey = CONSTANTS.testValidationKey;
			feedback.WebRefNo = localStorageService.get('WRF');
			feedback.DateOfBirth = localStorageService.get('DOB');
			feedback.Passport = localStorageService.get('PassNo');
			feedback.Purpose = "enquire-about";
			data.CKGSDataRequest = feedback;
  			var headers = restServices.getHeaders();
			var config = {};
        	config.headers = headers;
			var url = CONSTANTS.updateStatus;
			restServices.restPutType(url,data,config,function(status,res) {
				if (res.data.CKGSDataResponse.UpdateStatus == 0) {
					swal("Cancelled", ""+res.data.CKGSDataResponse.StatusMsg+"", "error");
				}
				else if (res.data.CKGSDataResponse.UpdateStatus == 1)
				{
					swal("Success!", ""+res.data.CKGSDataResponse.StatusMsg+"", "success");
					$scope.CKGSDataRequest = {};
				}
			})
		}
		else{
            $scope.$broadcast('show-error-event');
		}
	}

}]);