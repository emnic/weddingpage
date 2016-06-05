(function () {
    'use strict';

    angular
        .module('brollop')
        .controller('applicationController', applicationController)
        .factory('application', ['$http', function($http){
            var o = {
                submitted: false,
                application: []
            };

            o.saveApplication = function(user, application) {
                return $http.put('/' + user._id + '/application', application).success(function(data){
                    o.application = data;
                });
            };
            o.submitApplication = function(user) {
                return $http.put('/' + user._id + '/application/submit', {submitStatus:user.submitted}).success(function(data){
                    o.submitted = data;
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
        vm.editMode = false;
        
        activate();

        function activate() { }
        
        vm.attendee = {};
        
        // Send data to server.
    vm.saveApplication = function(attendee) {
        attendee.editMode = !attendee.editMode;
        application.saveApplication(vm.user,vm.list_of_attendees);
    };
        
    vm.addAttendee = function () {
        var num_attendees = vm.list_of_attendees.length + 1
        var attendee = {firstname: "",
                        lastname: "",
                        email: "",
                        attend: false,
                        transfer: false,
                        editMode: true,
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
    vm.editAttendee = function (attendee){
        attendee.editMode = !attendee.editMode;
    };

    vm.removeAttendee = function (attendee) {
        var index = vm.list_of_attendees.indexOf(attendee)
        vm.list_of_attendees.splice(index, 1);
        vm.num_attendees -= 1;
        application.saveApplication(vm.user,vm.list_of_attendees);
    };

    vm.checkSpecialFood = function(attendee){
        var s = attendee.special_food;
        if (s.laktos || s.glukose || s.nuts || s.vegetarian || s.other)
            return true;
        else
            return false;
    };

    vm.submitApplication = function(){
        if (!vm.user.submitted)
            vm.user.submitted = true;

        application.submitApplication(vm.user);
    };
}
})();