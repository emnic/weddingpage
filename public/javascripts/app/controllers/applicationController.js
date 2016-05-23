(function () {
    'use strict';

    angular
        .module('brollop')
        .controller('applicationController', applicationController)
        .factory('application', ['$http', function($http){
            var o = {
              devices: []
            };

            return o;
        }]);

    applicationController.$inject = ['application', '$http'];

    function applicationController(application, $http) {
        
        var vm = this;
        vm.list_of_users = [];
        vm.num_users = 0;
        
        activate();
        
        function activate() { }
        
        vm.user = {};
        
        // Send data to server.
        vm.submitApplication = function() {

        $http({
          method  : 'POST',
          url     : '/application',
          data    : vm.list_of_users, //forms user object
          headers : {'Content-Type': 'application/json'}
        })
        .success(function(data) {
            if (data.errors) {
                // Showing errors.
                vm.errorName = data.errors.name;
                vm.errorUserName = data.errors.username;
                vm.errorEmail = data.errors.email;
            }
            else {
                vm.message = data.message;
            }
        });
    };
        
    vm.addUser = function () {
        var num_users = vm.list_of_users.length + 1
        var user = {firstname: "",
                    lastname: "",
                    email: "",
                    attend: false,
                    transfer: false,
                    special_food: {laktos: false,
                                   glukose: false,
                                   nuts: false,
                                   vegetarian: false,
                                   other: ""
                    }
        };
        vm.num_users = num_users;
        vm.list_of_users.push(user)
    };

    vm.removeUser = function (user) {
        var num_users = vm.list_of_users.length - 1
        var index = vm.list_of_users.indexOf(user)
        vm.list_of_users.splice(index, 1);
        vm.num_users = num_users;
    };
}
})();