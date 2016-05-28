(function () {
    'use strict';

    angular
        .module('brollop')
        .controller('mainController', mainController)
        .service('logged_in_service', function() {
          this.logged_in = false;
        })

    mainController.$inject = ['$rootScope', 'logged_in_service'];

    function mainController($rootScope, logged_in_service) {
        /* jshint validthis:true */
        var vm = this;
        activate();

        function activate() { }

    }
})();