'use strict';
var app = angular.module('ckgsPWA').
controller('holidayListController', ['$rootScope','$scope', '$window', '$state', '$http', '$timeout','CONSTANTS','restServices','localStorageService', function($rootScope, $scope, $window, $state, $http, $timeout, CONSTANTS,restServices,localStorageService) {

	$scope.getHolidayList =function(){
		var data = localStorageService.get("RequestObj");
		var online = navigator.onLine;
	    if(online===true){
		var headers = restServices.getHeaders();
		var config = {};
    	config.headers = headers;
		var url = CONSTANTS.getHolidayList;
		restServices.restPutType(url,data,config,function(status,res) {
			if(res.data!=null){
		    localStorageService.set("holiday",res);
			$scope.holidayList = res.data.CKGSDataResponse.Jurisdiction;
			}else{
			$scope.offlineHolidayList();
		    }
		});
		}else{
		 $scope.offlineHolidayList();
		}
	},
	$scope.offlineHolidayList=function(){
		var res=localStorageService.get("holiday");
	    if(res!=null){
		$scope.holidayList = res.data.CKGSDataResponse.Jurisdiction;
	}else{
		$state.go("home");
		setTimeout(function(){
					swal("No offline data avaiable.Please enable your mobile network!");
					return;
		}, 3000);
	}
	}

}]);