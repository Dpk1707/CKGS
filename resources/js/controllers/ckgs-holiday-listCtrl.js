'use strict';
var app = angular.module('ckgsPWA').
controller('holidayListController', ['$rootScope','$scope', '$window', '$state', '$http', '$timeout','CONSTANTS','restServices','localStorageService', function($rootScope, $scope, $window, $state, $http, $timeout, CONSTANTS,restServices,localStorageService) {

	$scope.getHolidayList =function(){
		var data = localStorageService.get("RequestObj");
		var headers = restServices.getHeaders();
		var config = {};
    	config.headers = headers;
		var url = CONSTANTS.getHolidayList;
		restServices.restPutType(url,data,config,function(status,res) {
			$scope.holidayList = res.data.CKGSDataResponse.Jurisdiction;
		});
	}

}]);