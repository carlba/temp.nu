var geocoder;
var map;

$(document).ready(function () {
   initialize();

});


function initialize() {

   navigator.geolocation.getCurrentPosition(foundLocation);

   function foundLocation(position) {
       geocoder = new google.maps.Geocoder();
       var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
       var myOptions = {
           zoom: 15,
           center: latlng,
           mapTypeId: google.maps.MapTypeId.ROADMAP
       }
       map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
   }


}

function codeAddress() {
   var address = document.getElementById("address").value;
   geocoder.geocode({'address': address}, function (results, status) {
       if (status == google.maps.GeocoderStatus.OK) {
           map.setCenter(results[0].geometry.location);
           var marker = new google.maps.Marker({
               map: map,
               position: results[0].geometry.location
           });
       } else {
           alert("Geocode was not successful for the following reason: " + status);
       }
   });
}