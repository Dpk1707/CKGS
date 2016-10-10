'use strict';
var app = angular.module('ckgsPWA').
controller('appcenterController', ['$rootScope', '$scope', '$window', '$state', '$http', '$timeout', 'CONSTANTS', 'restServices', 'localStorageService','NgMap','$sce', function($rootScope, $scope, $window, $state, $http, $timeout, CONSTANTS, restServices, localStorageService,NgMap,$sce) {

    $scope.appCenterList = function(){
      var wrf= localStorageService.get("WRF");
    	$scope.res= localStorageService.get(wrf).data.CKGSDataResponse.AppCenterList;
    	$scope.locationCenters = [];
        var temp;
		angular.forEach($scope.res, function(value, key){
			$scope.locationCenters.push(value);
            if (key == "0") {
                temp = value;
            }
		});
        if (temp!= undefined) {
            $scope.selectedName = temp.Jurisdiction.location;
            $scope.address = temp.Address;
            $scope.StateList = temp.StateList;
            $scope.info = temp.ImportantRemarks;
            $scope.operation = temp.HoursofOperation;
            $scope.ParkingInfo = temp.ParkingInfo;
            $scope.WorkingHours = temp.WorkingHours;
            $scope.initMap('foo',$scope.address);
        }
    }

    $scope.change = function(location){
        $scope.selectedName = location.Jurisdiction.location;
        $scope.address = location.Address;
        $scope.StateList = location.StateList;
     	$scope.info = location.ImportantRemarks;
        $scope.operation = location.HoursofOperation;
        $scope.ParkingInfo = location.ParkingInfo;
        $scope.WorkingHours = location.WorkingHours;
        $scope.initMap('foo',$scope.address);
    }

    $scope.getLocation = function(mapId,address){
        var online = navigator.onLine;
        if(online===true){
        $scope.mymap = mapId;
        $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyBicvxY9eNQi4mxgX6S11fVpttGWTIbcPY";
        $rootScope.getAddress = ""+address.Address1+''+address.Address2+''+address.Country+''+address.State+''+address.City+''+address.Zipcode+"";
        $rootScope.newAddress = ""+address.Address1+''+address.Address2+''+address.City+','+address.State+','+address.Zipcode+"";
        $state.go("ckgs-application-location-map");
        }
        else{

        }
    }

    $scope.renderHTML = function()
    {
        var decoded = angular.element('<textarea />').html($scope.info).text();
        return $sce.trustAsHtml(decoded);
    };

    $scope.renderData = function()
    {
        var decode = angular.element('<textarea />').html($scope.WorkingHours).text();
        return $sce.trustAsHtml(decode);
    };

    $scope.initMap = function(mapId,address) {
        var online = navigator.onLine;
        if(online===true){
            $scope.map = "";
      $scope.map = NgMap.initMap(mapId);
      $scope.parkingSlots = ""+address.Address1+''+address.Address2+''+address.City+','+address.State+','+address.Zipcode+"";
        var headers = restServices.getHeaders();
        var config = {};
        config.headers = headers;
        var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+$scope.parkingSlots+"&key=AIzaSyBicvxY9eNQi4mxgX6S11fVpttGWTIbcPY";
        restServices.restGetType(url, config, function(status, res) {
            $scope.parkingArea = res.data.results[0].geometry.location;
            $scope.lat = $scope.parkingArea.lat;
            $scope.lon = $scope.parkingArea.lng;
        });
    }
    else{
        
    }
}

}]);