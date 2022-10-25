"use strict"

// initialize variables
mapboxgl.accessToken = MAPBOX_WEATHER_APP; // get api key from external keys.js
let lngLat = {lng: -122.872575, lat: 46.300395}; // initial coordinates of my home
let currentWeather = true;
let addressMarker = true;
/************** Initial Page Load **************/

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: lngLat,
    zoom: 10
});

map.addControl(new mapboxgl.NavigationControl());

renderWeather(lngLat);

/************** Toggle Weather View ***************/
$(`#fiveDayLocalForecast`).click(function(){
    currentWeather = !currentWeather;
    renderWeather(lngLat)
    if(currentWeather){
        $(`#fiveDayLocalForecast`).html(`Five Day Forecast`)
    } else {
        $(`#fiveDayLocalForecast`).html(`Current Weather View`)
    }
})

/************** Toggle Search Mode ****************/

/************** Functions ***************/

function renderWeather(lngLat){
    // get location
    $.get("http://api.openweathermap.org/data/2.5/onecall", {
        APPID: OPEN_WEATHER_APP,
        lat:    lngLat.lat,
        lon:   lngLat.lng,
        units: "imperial"
    }).done(function(data){
        if(currentWeather) {
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
        } else {
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


        }
        reverseGeocode(lngLat, MAPBOX_WEATHER_APP).then(function(result){
            $(`#weatherDisplayTitle>h3`).html(`Location: ${result} `)
        })
    });

}


let markerToggle = $(`#markerTypeToggle`);
markerToggle.click(setLocation);
function setLocation(e){
    // create movable marker
    // get location data
    // get weather data
    // current? renderCurrentWeather : renderFiveDay
    e.preventDefault();
    addressMarker = !addressMarker;
    // remove markers
    map._markers.forEach(function(marker){marker.remove();});
    if(addressMarker){
        markerToggle.html(`Drop Movable Pin`);      // change button text
        $(`#toggleInput`).toggleClass("invisible")  // change input visibility

    } else {
        markerToggle.html(`Search by Address`);     // change button text
        $(`#toggleInput`).toggleClass("invisible")  // change input visibility

        // add marker to map at current lngLat
        const marker = new mapboxgl.Marker({
            draggable: true
        }).setLngLat([lngLat.lng, lngLat.lat]).addTo(map);

        marker.on('dragend', onDragEnd)
    }
}

function onDragEnd(marker){

    lngLat = {lat: marker.target._lngLat.lat, lng: marker.target._lngLat.lng}
    renderWeather(lngLat);
}

$(`#inputAddressSubmit`).click(setMarkerText);
function setMarkerText(e){
    // get input text
    // get location data
    // set marker
    // move map
    // current? renderCurrentWeather : renderFiveDay
    e.preventDefault();
    // remove markers
    map._markers.forEach(function(marker){marker.remove();});
    let inputAddress = $(`#inputAddress`)[0].value;

    geocode(inputAddress, MAPBOX_WEATHER_APP)
        .then(function(result){
            lngLat = {lng: result[0], lat: result[1] }
            let marker = new mapboxgl.Marker().setLngLat([lngLat.lng, lngLat.lat]).addTo(map);
            renderWeather(lngLat);
            map.flyTo({
                center: [lngLat.lng, lngLat.lat],
                zoom: 12,
                speed: 1
            });
        })

}