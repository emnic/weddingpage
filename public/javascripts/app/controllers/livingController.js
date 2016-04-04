(function () {
    'use strict';

    angular
        .module('brollop')
        .controller('livingController', livingController)
        .factory('living', ['$http', function($http){
            var o = {
              devices: []
            };

            return o;
        }]);

    livingController.$inject = ['living'];

    function livingController(living) {
        var vm = this;

        activate();

        function activate() { }
    }
})();