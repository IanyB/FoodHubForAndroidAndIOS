//initialize the google map
function buildMap(e) {
      var map;                      
      var mapMarker;    
      var lat = app.SelectedItemLatitude;
      var lon = app.SelectedItemLongitude;
      var name = app.SelectedItemTitle;
      var mapElement = $("#map_canvas");
      var container = e.view.content;
    
      var latlng = new google.maps.LatLng(lat, lon);

      if(map) {                           
         map.panTo(latlng);
         mapMarker.setPosition(latlng);
      } else {                            
         var myOptions = {
            center: latlng,
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP
         };
         map = new google.maps.Map(mapElement[0], myOptions);

         mapMarker = new google.maps.Marker({
            position: latlng,
            title: name,
            clickable: true
         });
         mapMarker.setMap(map);
      }
}