'use strict';
var app = angular.module('ckgsPWA').
controller('track_applicationController', ['$rootScope','$scope', '$window', '$state', '$http', '$timeout','CONSTANTS','restServices','localStorageService','$sce', function($rootScope, $scope, $window, $state, $http, $timeout, CONSTANTS,restServices,localStorageService,$sce) {

 $scope.getApplicationStatus = function(){
  var dataReq = localStorageService.get("RequestObj");
  var online = navigator.onLine;
  if(online===true){
  var url = CONSTANTS.trackApplicationStatus;
  var headers = restServices.getHeaders();
  var config = {};
     config.headers = headers;
  restServices.restPutType(url,dataReq,config,function(status,data) {
    $scope.currentStatus = data.data.CKGSDataResponse.AvailableStatus;
   if (data == "" || data == undefined || data.data==null){
    $scope.offlineTrackStatus();
   }
    if ($scope.currentStatus == 0)
   {
    swal("NO DATA Found");
    return;
   }
   else if($scope.currentStatus == 1){
    $scope.wrf= localStorageService.get("WRF");
    var wrf= localStorageService.get("WRF");
    var track='track'+wrf;
     localStorageService.set(track,data);
    $scope.statusList = data.data.CKGSDataResponse.StatusDetails.Visa;
    localStorageService.set("appStatus",$scope.statusList);
    $scope.latest = data.data.CKGSDataResponse.StatusDetails.Visa[0];
    $scope.Date = new Date($scope.latest.Date);
    $scope.status = $scope.latest.Status;
    $scope.StatusMsg = $scope.latest.StatusMsg;
   }
  })
 }else{
      $scope.offlineTrackStatus();
 }
 }
$scope.offlineTrackStatus=function(){
 var wrf= localStorageService.get("WRF");
 var track='track'+wrf;
 var data=localStorageService.get(track);
 if(data!=null){
 $scope.statusList = data.data.CKGSDataResponse.StatusDetails.Visa;
  $scope.currentStatus = data.data.CKGSDataResponse.AvailableStatus;
 localStorageService.set("appStatus",$scope.statusList);
 $scope.latest = data.data.CKGSDataResponse.StatusDetails.Visa[0];
 $scope.Date = new Date($scope.latest.Date);
 $scope.status = $scope.latest.Status;
 $scope.StatusMsg = $scope.latest.StatusMsg;
}else{
 $state.go("home");
 setTimeout(function(){
    swal("No offline data avaiable.Please enable your mobile network!");
    return;
 }, 3000);
}
}
 $scope.renderHTML = function()
    {
        var decoded = angular.element('<textarea />').html($scope.StatusMsg).text();
        return $sce.trustAsHtml(decoded);
    };


}]);