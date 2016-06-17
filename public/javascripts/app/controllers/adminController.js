(function () {
    'use strict';

    angular
        .module('brollop')
        .controller('adminController', adminController)
        .factory('admin', ['$http', function($http){
            var o = {
                applications: []
            };

            o.getApplications = function() {
                return $http.get('/admin/applications').success(function(data){
                    o.applications = angular.copy(data);
                });
            };

            return o;
        }]);

    adminController.$inject = ['admin', 'resolvedApplications'];

    function adminController(admin,resolvedApplications) {
        var vm = this;
        
        activate();
        vm.list_of_applications = resolvedApplications.data;
        vm.stats = _stats();

        function activate() { }

        vm.foodToStr = function(special_food) {

            var food_str = '';

            if (special_food.laktos)
                food_str = 'Laktos';
            if (special_food.glukose)
                food_str != ''?food_str += ', Gluten':food_str += 'Gluten';
            if (special_food.nuts)
                food_str != ''?food_str += ', Nötter':food_str += 'Nötter';    
            if (special_food.vegetarian)
                food_str != ''?food_str += ', Vegetarisk':food_str += 'Vegetarisk';    
            if (special_food.other)
                food_str != ''?food_str += ', ' + special_food.other:food_str += special_food.other;

            return food_str;
        };

        function _stats() {

            var _num_yes        = 0;
            var _num_no         = 0;
            var _num_transfer   = 0;
            var _num_laktos     = 0;
            var _num_glukose    = 0;
            var _num_nuts       = 0;
            var _num_vegetarian = 0;
            var _num_other      = 0;

            for (var attendee in vm.list_of_applications){         
                if (vm.list_of_applications[attendee].attend){
                    _num_yes += 1;

                    if (vm.list_of_applications[attendee].transfer)
                        _num_transfer += 1;
                    if (vm.list_of_applications[attendee].special_food.laktos)
                        _num_laktos += 1;
                    if (vm.list_of_applications[attendee].special_food.glukose)
                        _num_glukose += 1;
                    if (vm.list_of_applications[attendee].special_food.nuts)
                        _num_nuts += 1;
                    if (vm.list_of_applications[attendee].special_food.vegetarian)
                        _num_vegetarian += 1;
                    if (vm.list_of_applications[attendee].special_food.other)
                        _num_other += 1;                                
                }       
                if (!vm.list_of_applications[attendee].attend)
                    _num_no += 1;
            }

            var data = {num_total:      _num_yes  + _num_no,
                        num_yes:        _num_yes,
                        num_no:         _num_no,
                        num_transfer:   _num_transfer,
                        num_laktos:     _num_laktos,
                        num_glukose:    _num_glukose,
                        num_nuts:       _num_nuts,
                        num_vegetarian: _num_vegetarian,
                        num_other:      _num_other
            }

            return data
        };        
} 
})();