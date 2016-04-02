'use strict';

/* Controllers Module for studentDetailApp application*/
var weddingpageControllerModule =  angular.module('weddingpageApp.controllers', []);

/*WeddingpageController: controller for  weddingpage*/
weddingpageControllerModule.controller('WeddingpageController', function($rootScope, $scope, $location,$routeParams) {

    $scope.appName="Weddingpage Application";
    $scope.authorName = "Emil"  ;

});