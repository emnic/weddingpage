(function () {
    'use strict';

    angular
        .module('brollop')
        .controller('applicationController', applicationController)
        .factory('application', ['$http', function($http){
            var o = {
              application: []
            };

            o.addApplication = function(user, application) {
              return $http.put('/' + user._id + '/application', application).success(function(data){
                //var index = o.application.indexOf(application);
                o.application = data;
              });
            };

            return o;
        }]);

    applicationController.$inject = ['$rootScope','application', '$http'];

    function applicationController($rootScope, application, $http) {
        
        var vm = this;
        vm.list_of_attendees = $rootScope.user.applications;
        vm.num_attendees = $rootScope.user.applications.length;
        vm.user = $rootScope.user
        activate();

        function activate() { }
        
        vm.attendee = {};
        
        // Send data to server.
        vm.submitApplication = function() {

        application.addApplication(vm.user,vm.list_of_attendees);
    };
        
    vm.addAttendee = function () {
        var num_attendees = vm.list_of_attendees.length + 1
        var attendee = {firstname: "",
                        lastname: "",
                        email: "",
                        attend: false,
                        transfer: false,
                        special_food: {laktos: false,
                                       glukose: false,
                                       nuts: false,
                                       vegetarian: false,
                                       other: ""
                        }
        };
        vm.num_attendees = num_attendees;
        vm.list_of_attendees.push(attendee)
    };

    vm.removeAttendee = function (attendee) {
        var num_attendees = vm.list_of_attendees.length - 1
        var index = vm.list_of_attendees.indexOf(attendee)
        vm.list_of_attendees.splice(index, 1);
        vm.num_attendees = num_attendees;
    };
}
})();