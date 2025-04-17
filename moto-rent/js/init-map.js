'use strict';

const LATITUDE = 33;
const LONGITUDE = 118;
const PLACE_ID = '';

class MapInitializer {
  constructor() {
    this.initMap();
    this.latitude = LATITUDE;
    this.longitude = LONGITUDE;
  }

  initMap() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
      this.latitude = parseFloat(mapElement.getAttribute('data-latitude')) || LATITUDE;
      this.longitude = parseFloat(mapElement.getAttribute('data-longitude')) || LONGITUDE;
      const { AdvancedMarkerElement, PinElement } = google.maps.importLibrary("marker");
      const map = this.createMap();
      this.setMapStyles(map);
      this.initInfoWindow(map);
    }
  }

  createMap() {
    return new google.maps.Map(document.getElementById('map'), {
      center: { lat: this.latitude, lng: this.longitude },
      zoom: 18,
      mapId: "DEMO_MAP_ID",
      disableDefaultUI: true,
    });
  }

  setMapStyles(map) {
    const styledMapType = new google.maps.StyledMapType([
      {
        featureType: "poi",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "landscape",
        stylers: [{color: "#fbfbfc" }]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{color: "#dcdee2" }]
      },
      {
        featureType: "water",
        stylers: [{color: "#b0b3bf" }]
      },
      {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [{color: "#6b5897" }]
      },
    ]);

    map.mapTypes.set("styled_map", styledMapType);
    map.setMapTypeId("styled_map");
  }

  createMarker(map) {
    const iconImage = document.createElement("img");
    iconImage.src = '/assets/images/marker.png';

    return new google.maps.marker.AdvancedMarkerElement({
      map,
      position: { lat: this.latitude, lng: this.longitude },
      content: iconImage,
    });
  }

  getAddressFromLatLng(lat, lng, callback) {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat, lng };
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          callback(results[0].formatted_address);
        } else {
          callback('No address found');
        }
      } else {
        callback('Geocoder failed due to: ' + status);
      }
    });
  }

  showInfoWindow(marker, infoWindow) {
    const position = marker.position;
    this.getAddressFromLatLng(position.lat, position.lng, (address) => {
      const contentWrapper = document.createElement("div");
      contentWrapper.innerHTML = `
        <p>${address}</p>
      `;
      infoWindow.setContent(contentWrapper);
      infoWindow.open(marker.map, marker);
    });
  }

  initInfoWindow(map) {
    const request = {
      placeId: PLACE_ID,
      fields: ["name", "formatted_address", "geometry"],
    };

    const infoWindow = new google.maps.InfoWindow();
    const service = new google.maps.places.PlacesService(map);

    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
        const marker = this.createMarker(map);
        google.maps.event.addListener(marker, "click", () => this.showInfoWindow(marker, infoWindow));
      }
    });
  }
}

window.initMap = () => {
  const mapInitializer = new MapInitializer();
  mapInitializer.initMap();
};

document.addEventListener('DOMContentLoaded', window.initMap());
