"use strict"
/* psuedo
* weatherData holds most recent weathmap api call data
* */
// Initialize variables
mapboxgl.accessToken = MAPBOX_WEATHER_APP; // get api key from external keys.js
let lngLat = {lng: -122.872575, lat: 46.300395}; // initial coordinates of my home
let currentLocation = "";  // is updated by reverseGeocode
let weatherData = {};    // is updated by weatherAPICall
let weatherDataProxy = new Proxy(weatherData, {
    set: function (target, key, value){
        console.log(`${key} set to ${value}`);
        target[key] = value;
        return true;
    }
})



// initialize map
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: lngLat,
    zoom: 10
});

map.addControl(new mapboxgl.NavigationControl());


// Initialize weatherData and currentLocation
weatherAPICall();
reverseGeocode(lngLat, MAPBOX_WEATHER_APP).then(function(result){currentLocation = result})






// ----- Button Listeners -----
$(`#fiveDayLocalForecast`).click(renderFiveDays);





// ----- Five Day View -----


function renderFiveDays(){
    // ask api for data
    // build html string
    // render html string in #weatherDisplay

    $.get("http://api.openweathermap.org/data/2.5/onecall", {
        APPID: OPEN_WEATHER_APP,
        lat:    lngLat.lat,
        lon:   lngLat.lng,
        units: "imperial"
    }).done(renderFiveDayForecast);


}




/* ----- Refactor -----
* 1. five day view button => toggle between current and 5 day view
* 2. change location data from hard coded to user input
* 3. initial input is Castle Rock location
* 4. renderCurrentWeather(openweatherOneCallResponse) and renderFiveDayForecast(openweatherOneCallResponse)
* 5. initialize by calling renderCurrentWeather()*/


// ----- Drop Pin to Update 5-Day Forecast Location -----
/* 1. create button to spawn marker
*  2. create variable that holds marker coordinates
*  3. update coordinates on marker move
*  4. update weather on coordinate update*/

// ----- Functions -----

/**
 * calls openweather onecall api using lngLat data
 * stores returned data in weatherData*/
function weatherAPICall(){
    $.get("http://api.openweathermap.org/data/2.5/onecall", {
        APPID: OPEN_WEATHER_APP,
        lat:    lngLat.lat,
        lon:   lngLat.lng,
        units: "imperial"
    }).done(function(data){ weatherData = data});
}

/**
 * renders five-day forecast
 * @param {object} data weatherData object*/
function renderFiveDayForecast(data){
    //display date, temp, description, humidity, wind, and pressure
    let html = "";

    data.daily.forEach(function(day){
        let dateTime = new Date(day.dt * 1000);
        let date = dateTime.toUTCString().slice(0, 11);

        html +=`
                 <div class="card col">
                    <dl class="displayDay">
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
    $(`#weatherDisplayTitle>h3`).html(`Location: Castle Rock, WA: `)
}

/**
 * renders html of current weather data,
 * data is specified by open weather oncall api
 * sets #weatherDisplay html
 * @param {object} data return from openweather oncall api
 */
function renderCurrentWeather(data){
    //display date, temp, description, humidity, wind, and pressure
    console.log(data);
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
}