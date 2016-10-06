'use strict';
var app = angular.module('ckgsPWA').
controller('navCtrl', ['$rootScope', '$scope', '$window', '$state', '$http', '$timeout', 'CONSTANTS', 'restServices', 'localStorageService','$uibModal', function($rootScope, $scope, $window, $state, $http, $timeout, CONSTANTS, restServices, localStorageService,$uibModal) {

    $scope.logout = function(){
    localStorage.removeItem("login");
		$state.go("login");
		$window.close();
    }

    $scope.app = function(size){
    	$uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/rateApp.html',
            size: size,
            controller: function($scope,$uibModalInstance){
                $scope.close = function(){
                    $uibModalInstance.dismiss('cancel');
                }
                $scope.rateCKGS = function(val){
                    if (val == "" || val == undefined) {
                        swal("Cancelled", "Please rate the app!", "error");
                        return;
                    }
                    else{
                        var data = {};
                        var rating= {};
                        rating.ValidationKey = CONSTANTS.testValidationKey;
                        rating.WebRefNo = localStorageService.get('WRF');
                        rating.DateOfBirth = localStorageService.get('DOB');
                        rating.Passport = localStorageService.get('PassNo');
                        rating.Rating = val;
                        data.CKGSDataRequest = rating;
                        var headers = restServices.getHeaders();
                        var config = {};
                        config.headers = headers;
                        var url = CONSTANTS.appRating;
                        restServices.restPutType(url,data,config,function(status,res) {
                            $uibModalInstance.dismiss('cancel');
                            swal("Success!", ""+res.data.CKGSDataResponse.StatusMsg+"", "success");
                        });
                    }
                }
            }
        });
    }
    
}]);
