'use strict';
var app = angular.module('ckgsPWA').
controller('status-historyController', ['$rootScope','$scope', '$window', '$state', '$http', '$timeout','CONSTANTS','restServices','localStorageService','$sce', function($rootScope, $scope, $window, $state, $http, $timeout, CONSTANTS,restServices,localStorageService,$sce) {

    $scope.StrToDate = function (str) {
        return new Date(str);
    }

    $scope.history = function(date){
    	$scope.historyList = localStorageService.get("appStatus");
        console.log("...........history...........");
        console.log($scope.historyList);
        return new Date(date);
    }

    $scope.viewHistory = function(data){
        console.log(data);
    	$state.go('passport-status-history-received');
    	$rootScope.dateReceived = new Date(data.Date);
    	$rootScope.statusReceived = data.Status;
    	$rootScope.statusMessage = data.StatusMsg;
    }


}]);