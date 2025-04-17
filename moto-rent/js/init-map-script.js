new class {
  constructor() {
    this.initGoogleMapsScript();
  }

  initGoogleMapsScript() {
    document.write(`<script defer src="https://maps.googleapis.com/maps/api/js?key=${window.googleMapsApiKey}&libraries=places&v=weekly&language=en"></script>`)
  }
}
