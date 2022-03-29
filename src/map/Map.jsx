import React, { useRef, useState, useEffect } from "react";

let markers = [];

const Map = ({ getGeolocation, getLatLng }) => {

  const ref = useRef(null);
  const [map, setMap] = useState();
  const [searchBox, setSearchBox] = useState();


  const style = { height: "100vh" }

  useEffect(() => {
    const google = window.google;
    const geocoder = new google.maps.Geocoder();
    const infowindow = new google.maps.InfoWindow();

    let clicks = 0;
    const selectLocation = (event) => {
      clicks++

      if (clicks === 1) {
        // wait to see if user double clicks
        setTimeout(function(){
          if(clicks === 1) {
            placeMarker(map, event.latLng, geocoder, infowindow);
          }
          clicks = 0;
        }, 300);
      }
    }

    const detectDoubleClick = () => {
      clicks ++
    }

    function placeMarker(map, position, geocoder, infowindow) {
      const latLng = position.toJSON()
      if (markers[0]) {
        markers[0].setMap(null);
      }
      markers = [];
      const marker = new google.maps.Marker({
          position: position,
          map: map
      });
      geocodeLatLng(geocoder, map, infowindow, latLng);
      getLatLng(latLng)
      markers.push(marker)
      map.panTo(position);
    }

    function geocodeLatLng(geocoder, map, infowindow, latLng) {

      geocoder
        .geocode({ location: latLng })
        .then((response) => {
          if (response.results[0]) {
            map.setZoom(11);
            getGeolocation(response.results[0])
          } else {
            infowindow.setContent("No results found");
          }
        })
        .catch((e) => console.log("Geocoder failed due to: " + e));
    }

    if (map && searchBox) {
      ["click", "dblClick"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );
      map.addListener("click", selectLocation);
      map.addListener("dblclick", detectDoubleClick);
      // Bias the SearchBox results towards current map's viewport.
      map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
      });

      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length === 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach((marker) => {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();

        places.forEach((place) => {
          const latLng = place.geometry.location.toJSON();
          getLatLng(latLng);
          getGeolocation(place);
          if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
          }

          const icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25),
          };

          // Create a marker for each place.
          markers.push(
            new google.maps.Marker({
              map,
              icon,
              title: place.name,
              position: place.geometry.location,
            })
          );
          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    }

    }, [getGeolocation, getLatLng, map, searchBox]);

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {
        mapId: "978f12ebfc817024",
        zoom: 4.5,
        center: { lat: 37.090, lng: -95.712 },
        //disable most map controls
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        controlSize: 20,
      }));
    }
    if (map) {
      const input = document.getElementById("pac-input");
      setSearchBox(new window.google.maps.places.SearchBox(input));
      map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(input);
    }
  }, [ref, map]);

  return (
    <div className="map-container">
      <input
        id="pac-input"
        className="controls"
        type="text"
        placeholder="Search Box"
      />
      <div ref={ref} 
        style={style} 
        id="map" 
      >
      </div>
    </div>
  );
}
 
export default Map;