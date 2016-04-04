(function () {
    'use strict';

    angular
        .module('brollop')
        .controller('contactController', contactController)
        .factory('contact', ['$http', function($http){
            var o = {
              devices: []
            };

            return o;
        }]);

    contactController.$inject = ['contact'];

    function contactController(contact) {
        var vm = this;

        activate();

        function activate() { }
    }
})();