(function () {
    'use strict';

    angular
        .module('brollop')
        .config(config)
        .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

    function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
            
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user){
                console.log(user)
                // Authenticated
                if (user !== '0'){

                  //$timeout(deferred.resolve, 0);
                  $rootScope.user = user;
                  deferred.resolve();
                    }
                // Not Authenticated
                else {
                  $rootScope.message = 'Du måste logga in';
                  //$timeout(function(){deferred.reject();}, 0);
                  deferred.reject();
                  $location.url('/login');
                }
            });

            return deferred.promise;
        };

        //================================================

        //================================================
        // Add an interceptor for AJAX errors
        //================================================
        $httpProvider.interceptors.push(function($q, $location) {
            return {
                response: function(response) {
                  // do something on success
                  return response;
                },
                responseError: function(response) {
                  if (response.status === 401)
                    $location.url('/login');
                  return $q.reject(response);
                }
            };
        });

        $urlRouterProvider.otherwise('login');

        $stateProvider
            .state("home", {
                //'abstract': true,
                url: '/',
                templateUrl: 'templates/main.html',
                controller: 'mainController',              
                controllerAs: 'vm'
            })
            .state("home.login", {
                url: 'login',
                templateUrl: 'templates/login.html',
                controller: 'loginController', 
                controllerAs: 'vm'
            })                        
            .state("home.startpage", {
                url: 'startpage',
                templateUrl: 'templates/startpage.html',
                controller: 'startpageController',
                resolve: {
                    loggedin: checkLoggedin
                },                
                controllerAs: 'vm'
            })
            .state("home.church", {
                url: 'church',
                templateUrl: 'templates/church.html',
                controller: 'churchController',
                resolve: {
                    loggedin: checkLoggedin
                },                
                controllerAs: 'vm'
            })
            .state("home.party", {
                url: '/party',
                templateUrl: 'templates/party.html',
                controller: 'partyController',
                resolve: {
                    loggedin: checkLoggedin
                },
                controllerAs: 'vm'
            })
            .state("home.living", {
                url: 'living',
                templateUrl: 'templates/living.html',
                controller: 'livingController',
                resolve: {
                    loggedin: checkLoggedin
                },
                controllerAs: 'vm'
            })
            .state("home.application", {
                url: 'application',
                templateUrl: 'templates/application.html',
                controller: 'applicationController',
                resolve: {
                    loggedin: checkLoggedin
                },                
                controllerAs: 'vm'
            })
            .state("home.contact", {
                url: 'contact',
                templateUrl: 'templates/contact.html',
                controller: 'contactController',
                resolve: {
                    loggedin: checkLoggedin
                },                
                controllerAs: 'vm'
            })
    }

    run.$inject = ['$rootScope', '$state', '$stateParams', '$http'];

    function run($rootScope, $state, $stateParams, $http) {
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toStateParams, fromState, fromStateParams) {
                $rootScope.fromState = fromState;
                $rootScope.fromStateParams = fromStateParams;
                $rootScope.toState = toState;
                $rootScope.toStateParams = toStateParams;
            });

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        // Logout function is available in any pages
        $rootScope.logout = function(){
            $rootScope.logged_in = false;
            $rootScope.message = '';
            $http.post('/logout');
        };
    };
})();