(function () {
    'use strict';

    angular
        .module('brollop')
        .controller('startpageController', startpageController)
        .factory('startpage', ['$http', function($http){
            var o = {
              devices: []
            };

            return o;
        }]);

    startpageController.$inject = ['startpage'];

    function startpageController(startpage) {
        var vm = this;

        activate();

        function activate() { }
    }
})();