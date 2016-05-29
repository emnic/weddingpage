(function () {
    'use strict';

    angular
        .module('brollop')
        .controller('loginController', loginController)


    loginController.$inject = ['$rootScope', '$http', 'logged_in_service', '$location'];

    function loginController($rootScope, $http, logged_in_service, $location) {
        var vm = this;

        activate();

        function activate() { }
          // This object will be filled by the form
        vm.user = {};

        // Register the login() function
        vm.login = function(){
          $http.post('/login', {
            username: vm.user.username,
            password: vm.user.password,
          })
          .success(function(user){
            // No error: authentication OK
            $rootScope.logged_in = true;
            $rootScope.message = 'Hej ' + vm.user.firstname;
            $location.url('/startpage');
          })
          .error(function(){
            // Error: authentication failed
            $rootScope.logged_in = false;;
            $rootScope.message = 'Inloggningen misslyckades, felaktigt användarnamn eller lösenord';
            $location.url('/login');
          });
        };
    }
})();