(function () {
    'use strict';

    angular
        .module('brollop')
        .controller('partyController', partyController)
        .factory('party', ['$http', function($http){
            var o = {
              devices: []
            };

            return o;
        }]);

    partyController.$inject = ['party'];

    function partyController(party) {
        var vm = this;

        activate();

        function activate() { }
    }
})();