(function () {
    'use strict';
    
    angular.module('brollop')
    .controller('loginController', ['$scope', '$http', function($scope, $http) {
      $scope.formData = [];
      $scope.text = 'hello';
      $scope.submit = function() {
        $http({
            method  : 'POST',
            url     : 'login',
            data    : $.param($scope.formData),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
        })
        .success(function(data) {
            console.log(data);

            if (!data.success) {
                // if not successful, bind errors to error variables
                $scope.errorName = data.errors.name;
                $scope.errorSuperhero = data.errors.superheroAlias;
            } else {
                // if successful, bind success message to message
                $scope.message = data.message;
            }
        });
    };
    }]);
})();

