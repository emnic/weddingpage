(function () {
    'use strict';

    angular
        .module('brollop')
        .config(config)
        .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home/church');
        $stateProvider
            .state("home", {
                'abstract': true,
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'homeController',
                controllerAs: 'vm'
            })
            .state("home.startpage", {
                url: '/startpage',
                templateUrl: 'templates/startpage.html',
                controller: 'startpageController',
                controllerAs: 'vm'
            })
            .state("home.church", {
                url: '/church',
                templateUrl: 'templates/church.html',
                controller: 'churchController',
                controllerAs: 'vm'
            })
            .state("home.party", {
                url: '/party',
                templateUrl: 'templates/party.html',
                controller: 'partyController',
                controllerAs: 'vm'
            })
            .state("home.living", {
                url: '/living',
                templateUrl: 'templates/living.html',
                controller: 'livingController',
                controllerAs: 'vm'
            })
            .state("home.contact", {
                url: '/contact',
                templateUrl: 'templates/contact.html',
                controller: 'contactController',
                controllerAs: 'vm'
            })
    }

    run.$inject = ['$rootScope', '$state', '$stateParams'];

    function run($rootScope, $state, $stateParams) {
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toStateParams, fromState, fromStateParams) {
                $rootScope.fromState = fromState;
                $rootScope.fromStateParams = fromStateParams;
                $rootScope.toState = toState;
                $rootScope.toStateParams = toStateParams;
            });

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    };
})();