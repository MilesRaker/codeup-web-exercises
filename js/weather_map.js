"use strict"

// Initialize Mapbox Map
mapboxgl.accessToken = MAPBOX_WEATHER_APP;
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
});