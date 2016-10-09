
var WindowsAzure = require('azure-mobile-apps-client');     
var client = new WindowsAzure.MobileServiceClient("http://myventure-table.azurewebsites.net");
var currlocation = '';
var timeRange = '';
var currActivities = '';
var currPriceRange = '';
var currRating = 0;
var map;
var locationArray = [];
var markerArr = [];

window.addInput = function (divName){
  var newdiv = document.createElement('div');
  newdiv.id = ("new-button");
  newdiv.innerHTML = divName;
  document.getElementById('price-button').removeChild(document.getElementById('new-button'));
  document.getElementById('price-button').appendChild(newdiv);
  currActivities = divName;
}

window.addInput2 = function (divName) {
  var newdiv = document.createElement('div');
  newdiv.id = ("new-button2");
  newdiv.innerHTML = divName;
  document.getElementById('price-button2').removeChild(document.getElementById('new-button2'));
  document.getElementById('price-button2').appendChild(newdiv);
  currPriceRange = divName;
}

window.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 10,
        mapTypeControl: false,
        streetViewControl: false,
        scrollwheel: false
    });
    
    // HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    var inputA = (document.getElementById('point0'));
    var autocompleteA = new google.maps.places.Autocomplete(inputA);
    autocompleteA.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var i;
    autocompleteA.addListener('place_changed', function() {
        var place = autocompleteA.getPlace();
        locationArray.push([place.geometry.location.lat(),place.geometry.location.lng()]);
        paint(place, locationArray);
    });

    function paint(place, locationArray){
        for (i = 0; i < locationArray.length; i++){

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(locationArray[i][0], locationArray[i][1]),
                map: map
            });

            markerArr.push(marker);

            marker.setIcon(/** @type {google.maps.Icon} */({
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35)
            }));

            // marker.setPosition(place.geometry.location);         // fix this shit
           // marker.setVisible(true);

            var address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }

            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
            infowindow.open(map, marker);
        }
    }
  }

$(
  function(){

  $('#findButton').click(function(){

      findLocation();
  });

  function findLocation() {
    var lat = locationArray[0][0];
    var lng = locationArray[0][1];
    var bounds = new google.maps.LatLng(lat,lng);
    map.setCenter(bounds);
    //map.panTo(markerArr[0].position);
    map.setZoom(13);
    $('#searchBoxes').append("<a href=\"http://maps.google.com/maps?q="+lat+","+lng+"&ll="+lat+0.1+","+lng+0.1+"&z=17\"+ target=\"_blank\"><button class=\"btn btn-success directionButton\" type=\"button\">Directions</button></a>")
    
    currlocation = document.getElementById('point0').value;
    currPriceRange = document.getElementById('point1').value;
     var item = { 
      Location: currlocation,
      Time: timeRange,
      Activities: currActivities,
      PriceRange: currPriceRange
    };
    client.getTable('myInfo').insert(item);
    
    var count = 0;
    var newdiv1 = document.createElement('label');
    newdiv1.id = ("new-label-amount");
    newdiv1.innerHTML = count + " people reviewed this location.";
    document.getElementById('amount-in-location').removeChild(document.getElementById('new-label-amount'));
    document.getElementById('amount-in-location').appendChild(newdiv);
  }

  var hidden = true;
  $('#rateE').click(function(){
    addRating();
  });
  
  function addRating(){

    hidden = !hidden;
    if(hidden) {
        document.getElementById('camera').style.display = 'none';
        document.getElementById('frame').style.display = 'none';
    } else {
        document.getElementById('camera').style.display = 'block';
        document.getElementById('frame').style.display = 'block';
    }
  }
  $(document).ready(initMap);
});
