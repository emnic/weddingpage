'use strict';

angular.module('weddingpageApp', [ 'weddingpageApp.controllers']).

  config(['$routeProvider', function($routeProvider,WeddingpageController) {

    $routeProvider.when('/', { controller: 'WeddingpageController'});

    $routeProvider.otherwise({redirectTo: '/'});
}]);