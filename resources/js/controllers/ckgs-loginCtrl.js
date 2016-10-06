'use strict';
var app = angular.module('ckgsPWA').
controller('LoginController', ['$rootScope','$scope', '$window', '$state', '$http', '$timeout','CONSTANTS','restServices','localStorageService',function($rootScope, $scope, $window, $state, $http, $timeout, CONSTANTS,restServices,localStorageService) {
$scope.date = new Date();
	$scope.login = function(loginForm,isValid){
		if(isValid){
			var data = {};
			loginForm.ValidationKey = CONSTANTS.testValidationKey;
			data.CKGSDataRequest = loginForm;
      		localStorageService.set("RequestObj",data);
			localStorageService.set("WRF",data.CKGSDataRequest.WebRefNo);
			localStorageService.set("PassNo",data.CKGSDataRequest.Passport);
			localStorageService.set("DOB",data.CKGSDataRequest.DateOfBirth);
			var online = navigator.onLine;
			if(online===true){
			var headers = restServices.getHeaders();
			var config = {};
        	config.headers = headers;
			var url = CONSTANTS.getMobAppStatus;
			restServices.restPutType(url,data,config,function(status,res) {
				if (res.data == "" || res.data == undefined){
					swal("NO DATA Found");
					return;
				}
				if (res.data.CKGSDataResponse.AvailableStatus == 0)
				{
					swal("Invalid Credentials!");
					return;
				}
				else if (res.data.CKGSDataResponse.AvailableStatus == 1){
					var loginStatus={};
					loginStatus.status=true;
					localStorage.setItem("login",loginStatus);
			  		var wrf= localStorageService.get("WRF");
					localStorageService.set(wrf,res);
					$state.go("home");
				}
			})
		}else{
			    var res="";
				var wrf= localStorageService.get("WRF");
			    res=localStorageService.get(wrf);
				if(res!=null){
			      if (res.data == "" || res.data == undefined){
			       swal("NO DATA Found");
			       return;
			      }
			      if (res.data.CKGSDataResponse.AvailableStatus == 0)
			      {
			       swal("Invalid Credentials!");
			       return;
			      }
			      else if (res.data.CKGSDataResponse.AvailableStatus == 1 && loginForm.WebRefNo==wrf){
					var loginStatus={};
					loginStatus.status=true;
					localStorage.setItem("login",loginStatus);
			        $state.go("home");
			      }
			     }else{
			      swal("please login online atleast once!");
		   }
        }
	}
		else
            $scope.$broadcast('show-error-event');
	}

}]);
