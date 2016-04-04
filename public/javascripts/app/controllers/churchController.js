(function () {
    'use strict';

    angular
        .module('brollop')
        .controller('churchController', churchController)
        .factory('church', ['$http', function($http){
            var o = {
              devices: []
            };

            return o;
        }]);

    churchController.$inject = ['church'];

    function churchController(church) {
        var vm = this;

        activate();

        function activate() { }
    }
    
    function initMap() {
        var myLatLng = {lat: 56.243424, lng: 12.860100};

          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: myLatLng
          });

          var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Ängelholms Kyrka'
            });
  
          var parking1 = {lat: 56.244017, lng: 12.861458};
            var parking_marker1 = new google.maps.Marker({
            position: parking1,
            map: map,
            title: 'Parkering'
            });
          
      }
})();