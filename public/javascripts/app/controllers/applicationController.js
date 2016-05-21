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

    applicationController.$inject = ['application'];

    function applicationController(application) {
        
        var vm = this;
        vm.list_of_users = [];
        vm.num_users = 0;
        
        activate();

        function activate() { }
        vm.addUser = function () {
          var num_users = vm.list_of_users.length + 1
          var user = {
                          allergies: {
                                      laktos: "false",
                                      glukose: "false",
                                      nuts: "false",
                                      other: "false",

                          },
                        firstname: "",
                        lastname: "",
                        attend: "",
                        id: num_users
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