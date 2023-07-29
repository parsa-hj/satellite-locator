// map.js
function initMap() {
    var issLocation = {
        lat: parseFloat(document.getElementById('map').getAttribute('data-lat')),
        lng: parseFloat(document.getElementById('map').getAttribute('data-long'))
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        center: issLocation,
        zoom: 4
    });
    var marker = new google.maps.Marker({
        position: issLocation,
        map: map
    });
}
  