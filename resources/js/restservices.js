angular.module('ckgsPWA').service('restServices', function($http){
  var rs = {};

  rs.restPostType = function(url, data,config,cb) {
    $http.post(url, data,config).then(function(response){
      cb(true,response);
    },
    function(response){
      cb(false,response);
    })
  }

  rs.restGetType = function(url,headers,cb){
    $http.get(url,headers).then(function(response){
      cb(true,response);
    },
    function(response){
      cb(false,response);
    })
  }


  rs.getHeaders=function(){
  return {
      "content-type" : "application/json"
    };
  }

  rs.restPutType = function(url,data,config,cb){
    $http.put(url, data, config).then(function(response){
      cb(true,response);
    }, 
    function(response){
      cb(false,response);
    });
  }

  return rs;
})