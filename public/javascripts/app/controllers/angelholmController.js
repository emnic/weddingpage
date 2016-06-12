(function () {
    'use strict';

    angular
        .module('brollop')
        .controller('angelholmController', angelholmController)
        .factory('angelholm', ['$http', function($http){
            var o = {
              devices: []
            };

            return o;
        }]);

    angelholmController.$inject = ['angelholm'];

    function angelholmController(angelholm) {
        var vm = this;

        activate();

        function activate() { }
    }
})();