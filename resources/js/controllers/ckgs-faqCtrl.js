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
		}else{
			var wrf= localStorageService.get("WRF");
			var faqs='faqs'+wrf;
			var faqList=localStorageService.get(faqs);
			$scope.faqData = faqList;

		}
	}

	$scope.viewDetails = function(data,index){
		// $rootScope.snippet ='It is very important that you apply on the <span style="color: rgb(255, 0, 0);"><span style="font-weight: bold;">CKGS website</span></span> and follow the process as defined.<br /><span style="color: rgb(255, 0, 0);"><span style="font-weight: bold;">Do not go<span style="text-decoration: underline;"><span style="font-style: italic;"> directly</span></span></span></span> to the Government of India website to fill the online application. You must go via the links on the <span style="font-weight: bold;">CKGS website</span> provided below. <br /><br />For USA applicants, the<span style="font-weight: bold;"> CKGS website</span> has been customized so that the <span style="font-weight: bold;">supplementary documents, forms and letters</span> requirements are as per the instructions of the Embassy of India in USA. Simply fill in the widget and it will guide you through the entire application process.<br /><br /> <div align="center"> <table width="589" cellspacing="0" cellpadding="0" border="1"> <tbody> <tr> <td width="230" nowrap=""><span style="font-weight: bold;"> <div align="left">Visa Application &ndash; How to Apply?</div> </span></td> <td width="230" nowrap=""> <div align="left"><a href="https://www.in.ckgs.us/visa/howtoapply" target="_blank">www.in.ckgs.us/visa/howtoapply</a></div> </td> </tr> <tr> <td width="230" nowrap=""><span style="font-weight: bold;"> <div align="left">Visa Application &ndash; Get Started</div> </span></td> <td width="230" nowrap=""> <div align="left"><a href="https://www.in.ckgs.us/visa/" target="_blank">www.in.ckgs.us/visa/</a></div> </td> </tr> </tbody> </table> </div> <br /><br /><br />The rules on the CKGS website will identify your visa category, type, duration, fees and help avoid errors. Further to assist you, many forms and letters that have repetitive information will get auto populated and you only have to fill in the missing fields.<br /><br />There will be a Document checklist which lists the document requirements for your application.<br /><span style="text-decoration: underline;"><span style="font-weight: bold;"><br /></span></span> <ul> <li><span style="text-decoration: underline;"><span style="font-weight: bold;">Read</span></span> the document checklist carefully which lists the documents, letters, whether originals / or copies are required, whether they need to be self-attested or notarized and the number of documents needed to complete your Visa application before submission. </li> <li><span style="text-decoration: underline;"><span style="font-weight: bold;">Review</span></span> and check the <span style="font-weight: bold;">forms</span> and<span style="font-weight: bold;"> letters.</span> </li> <li><span style="text-decoration: underline;"><span style="font-weight: bold;">Print</span></span> the forms as per your Document Checklist or you can print them later from the <a href="https://www.in.ckgs.us/myaccount/" target="_blank">&lsquo;My Account</a>&rsquo; page. </li> <li><span style="text-decoration: underline;"><span style="font-weight: bold;">Sign</span></span> the forms / letters where indicated.</li> <li><span style="font-weight: bold;"><span style="text-decoration: underline;">Print</span> 1 copy</span> of the <span style="font-weight: bold;">Document Checklist.</span></li> </ul> <br />At the appropriate step you will be guided to fill your online form/s on the <span style="font-weight: bold;">Government of India website</span> via the <span style="font-weight: bold;">CKGS website.</span><br /> <img width="600px" alt="" src="/resources/images/howtoapplyvisa.jpg" /> <br />After being redirected to the <span style="font-weight: bold;">Government website</span>, you must select <span style="color: rgb(255, 0, 0);"><span style="font-weight: bold;">Regular Visa Application</span></span> to continue your online Visa application process.<br /> <img width="600px" alt="" src="/resources/images/howtoapplyvisa1.jpg" /> <br />Once you complete and print the <span style="font-weight: bold;">Government VISA form</span>, on the last page of the Government&rsquo;s website, you must click on the<span style="font-weight: bold;"> &lsquo;Appointment and Payment&rsquo;</span> option so that you are <span style="font-weight: bold;">redirected</span> to the <span style="font-weight: bold;">CKGS website</span> where you need to complete the rest of the process. <img width="600px" alt="" src="/resources/images/howtoapplyvisa2.jpg" />';

		$rootScope.snippet ="It is very important that you apply on the <span style='color: rgb(255, 0, 0);'><span style='font-weight: bold;'>CKGS website</span></span>and follow the process as defined. click <a href='www.w3schools.com'>Click here</a>";

		$rootScope.question = data[index].question;
		$rootScope.Answer = data[index].answer;
		var nxt = $rootScope.Answer;
		console.log($rootScope.Answer);
		$state.go('passport-service-guide');
	}

}]);
