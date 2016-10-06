'use strict';
var app = angular.module('ckgsPWA').
controller('faqController', ['$rootScope','$scope','$compile','$parse','$interpolate', '$window', '$state', '$http', '$timeout','CONSTANTS','restServices','localStorageService','$sce', function($rootScope, $scope,$compile,$parse,$interpolate, $window, $state, $http, $timeout, CONSTANTS,restServices,localStorageService,$sce) {

	$scope.parent = true;
	$scope.child1 = true;
	$scope.child2 = true;


	$scope.getFaqList =function(){
		var data = localStorageService.get("RequestObj");
		var headers = restServices.getHeaders();
		var config = {};
    	config.headers = headers;
		var url = CONSTANTS.getFaqs;
		var online = navigator.onLine;
			if(online===true){
			restServices.restPutType(url,data,config,function(status,res) {
				$scope.faqData = res.data.CKGSDataResponse.FAQList;
				var wrf= localStorageService.get("WRF");
				var faqs='faqs'+wrf;
				localStorageService.set(faqs,$scope.faqData);
			});
		} else{
			   var wrf= localStorageService.get("WRF");
			   var faqs='faqs'+wrf;
			   var faqList=localStorageService.get(faqs);
			   if(faqList!=null){
			   $scope.faqData = faqList;
			  }else{
			   $state.go("home");
			   setTimeout(function(){
			         swal("No offline data avaiable.Please enable your mobile network!");
			      return;
			   }, 3000);
			  }
			}
 
	}

	$scope.viewDetails = function(data,index){
		$rootScope.question = data[index].question;
		$rootScope.Answer = data[index].answer;
		var nxt = $rootScope.Answer;
		$state.go('passport-service-guide');
	}

	$scope.renderHTML = function()
    {
        var decoded = angular.element('<textarea />').html($rootScope.Answer).text();
        return $sce.trustAsHtml(decoded);
    };

}]);
