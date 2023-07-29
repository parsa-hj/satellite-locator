// Move the initMap function outside the showMap function
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
  
function showMap() {

  console.log('Button clicked.');
  // Remove the "hidden" class to show latitude, longitude, and map
  const latLongContainer = document.querySelector('.long-lat');
  const mapContainer = document.querySelector('.google-map');
  latLongContainer.classList.remove('hidden');
  mapContainer.classList.remove('hidden');

  // Hide the button after it's clicked
  const showButton = document.getElementById('showButton');
  showButton.classList.add('hidden');

  // Call the initMap function when the button is clicked
  initMap();
}
  
document.addEventListener('DOMContentLoaded', () => {
   const showButton = document.getElementById('showButton');
   showButton.addEventListener('click', showMap);
   console.log('Button element:', showButton);
});