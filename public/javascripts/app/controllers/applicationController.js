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
                var body = {submitStatus:user.submitted,
                            numParticipants: user.num_participants};

                return $http.put('/' + user._id + '/application/submit', body).success(function(data){
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
        vm.activeEditMode = false;
        activate();

        function activate() { }
        
        vm.attendee = {};
        
        // Send data to server.
    vm.saveApplication = function(attendee) {
        attendee.editMode = !attendee.editMode;

        application.saveApplication(vm.user,vm.list_of_attendees);
        vm.handleActiveEditMode();
    };
        
    vm.addAttendee = function () {
        var attendee = {firstname: "",
                        lastname: "",
                        email: "",
                        attend: true,
                        transfer: false,
                        editMode: true,
                        notes: "",
                        special_food: {laktos: false,
                                       glukose: false,
                                       nuts: false,
                                       vegetarian: false,
                                       other: ""
                        }
        };
        vm.num_attendees += 1;
        vm.list_of_attendees.push(attendee)
        vm.handleActiveEditMode();
    };
    vm.editAttendee = function (attendee){
        
        if(attendee.editMode)
            vm.saveApplication(attendee);
        else
            attendee.editMode = !attendee.editMode;
        
        vm.handleActiveEditMode();
    };

    vm.removeAttendee = function (attendee) {
        var index = vm.list_of_attendees.indexOf(attendee)
        vm.list_of_attendees.splice(index, 1);
        vm.num_attendees -= 1;
        application.saveApplication(vm.user,vm.list_of_attendees);
        vm.handleActiveEditMode();
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

        var num_attendees = 0;
        for (var i = 0; i < vm.num_attendees; i++){
            
            if (vm.user.applications[i].attend){
                num_attendees += 1;
            }
        }

        vm.user.num_participants = num_attendees;
        application.submitApplication(vm.user);
    };
    vm.handleActiveEditMode = function(){

        for (var i = 0; i < vm.num_attendees; i++){
            
            if (vm.user.applications[i].editMode){
                vm.activeEditMode = true;
                break;
            }
            else
                vm.activeEditMode = false;
        }       
    }
}
})();