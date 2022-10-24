"use strict"

// Initialize Mapbox Map
mapboxgl.accessToken = MAPBOX_WEATHER_APP;
let homeLngLat = [-122.872575, 46.300395]
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: homeLngLat,
    zoom: 10
});

map.addControl(new mapboxgl.NavigationControl());


// Initialize Open Weather
$.get("http://api.openweathermap.org/data/2.5/onecall", {
    APPID: OPEN_WEATHER_APP,
    lat:    46.300395,
    lon:   -122.872575,
    units: "imperial"
}).done(function(data) {
    console.log("data: ", data);
    //display date, temp, description, humidity, wind, and pressure
    let html = `
    <div class="card">
    <h3>Current Weather in Castle Rock, WA: </h3>
        <dl id="initialWeatherData">
            <dt>Temperature:</dt>
            <dl>${data.current.temp}<span>&#176;</span>F</dl>
            <dt>Description:</dt>
            <dl>${data.current.weather[0].description}</dl>
            <dt>Humidity:</dt>
            <dl>${data.current.humidity}%</dl>
            <dt>Wind:</dt>
            <dl>${data.current.wind_gust} mph</dl>
            <dt>Pressure:</dt>
            <dl>${data.current.pressure} mmHg</dl>
        </dl>
    </div>
    `

    $(`#currentWeather`).html(html);
});


