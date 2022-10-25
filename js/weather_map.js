"use strict"

// Initialize Mapbox Map
mapboxgl.accessToken = MAPBOX_WEATHER_APP;
let homeLngLat = {lon: -122.872575,lat: 46.300395};
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: homeLngLat,
    zoom: 10
});

map.addControl(new mapboxgl.NavigationControl());


// Initialize Open Weather
$.get("http://api.openweathermap.org/data/2.5/onecall", {
    APPID: OPEN_WEATHER_APP,
    lat:    homeLngLat.lat,
    lon:   homeLngLat.lon,
    units: "imperial"
}).done(function(data) {
    //display date, temp, description, humidity, wind, and pressure
    let html = `
    <div class="card">

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

    $(`#weatherDisplay`).html(html);
});


// ----- Five Day View -----

$(`#fiveDayLocalForecast`).click(renderFiveDays);
function renderFiveDays(){
    // ask api for data
    // built html string
    // render html string in #weatherDisplay

    let html = "";
    $.get("http://api.openweathermap.org/data/2.5/onecall", {
        APPID: OPEN_WEATHER_APP,
        lat:    homeLngLat.lat,
        lon:   homeLngLat.lon,
        units: "imperial"
    }).done(function(data) {
        console.log(data);
        let location = "";
        reverseGeocode(homeLngLat, MAPBOX_WEATHER_APP).then(function(result){location = result}).then(function(){console.log(`location call: ${location}`)});
        //display date, temp, description, humidity, wind, and pressure
        data.daily.forEach(function(day){
            let dateTime = new Date(day.dt * 1000);
            let date = dateTime.toUTCString().slice(0, 11);
console.log(`day: `, day.weather[0].icon);
            html +=`
                 <div class="card col">
                    <dl class="displayDay">
                        <dt>Location:</dt>
                        <dt>${location}</dt>
                        <dt>Date:</dt>
                        <dl>${date}</dl>
                        <dt>High Temp:</dt>
                        <dl>${day.temp.max}<span>&#176;</span>F</dl>
                        <dt>Description:</dt>
                        <dl>${day.weather[0].description} <img src="http://openweathermap.org/img/w/${day.weather[0].icon}.png"</dl>
                        <dt>Humidity:</dt>
                        <dl>${day.humidity}%</dl>
                        <dt>Wind:</dt>
                        <dl>${day.wind_gust} mph</dl>
                        <dt>Pressure:</dt>
                        <dl>${day.pressure} mmHg</dl>
                    </dl>
                </div>
            `
        })
        $(`#weatherDisplay`).html(html);

    });
}

// ----- reverseGeoCode -----

reverseGeocode(homeLngLat, MAPBOX_WEATHER_APP).then(function(result){
    console.log(`testing ReverseGeocode: `, result);
})

geocode(`128 timberline drive castle rock wa 98611`, MAPBOX_WEATHER_APP).then(function(result){
    console.log(`testing Geocode: `, result);
})