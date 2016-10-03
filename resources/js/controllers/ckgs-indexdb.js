'use strict';
var app = angular.module('ckgsPWA').
    .controller('myControllerDB', function($scope, $rootScope, $indexedDB) {
        $rootScope.getValues = function() {
            $scope.objects = [];

            var OBJECT_STORE_NAME = 'storageSession';

            /**
             * @type {ObjectStore}
             */
            var myObjectStore = $indexedDB.objectStore(OBJECT_STORE_NAME);

            myObjectStore.insert({
                "ckgs": "444-444-222-111",
                "centers": "Newyork"
            }).then(function(e) {...
            });

            myObjectStore.getAll().then(function(results) {
                // Update scope
                $scope.objects = results;
            });

            /**
             * execute a query:
             * presuming we've an index on 'age' field called 'age_idx'
             * find all persons older than 40 years
             */

            var myQuery = $indexedDB.queryBuilder().$index('centers_idx').compile();
            myObjectStore.each(myQuery).then(function(cursor) {
                console.log(cursor.key);
                console.log(cursor.value);

            });
        }
    });
