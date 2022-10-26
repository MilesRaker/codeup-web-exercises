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
        $(`#fiveDayLocalForecast`).html(`Current Weather`)
    }
})


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
        <div class="card mx-auto">
    
            <dl id="initialWeatherData" class="d-flex flex-column flex-md-row align-items-center">
                <div class="row col-md">
                    <dt class="text-center">Temperature:</dt>
                    <dl class="text-center">${data.current.temp}<span>&#176;</span>F</dl>
                </div>
                <div class="row col-md">
                    <dt class="text-center">Description:</dt>
                    <dl class="text-center">${data.current.weather[0].description}</dl>           
                </div>
                <div class="row col-md">
                    <dt class="text-center">Humidity:</dt>
                    <dl class="text-center">${data.current.humidity}%</dl>       
                </div>
                <div class="row col-md">
                    <dt class="text-center">Wind:</dt>
                    <dl class="text-center">${data.current.wind_gust} mph</dl> 
                </div>
                <div class="row col-md">
                    <dt class="text-center">Pressure:</dt>
                    <dl class="text-center">${data.current.pressure} mmHg</dl>
                </div>

            </dl>
        </div>
        `

            $(`#weatherDisplay`).html(html);
        } else {
            let html = ``;
            let colCount = 0;
            data.daily.forEach(function(day){
                let dateTime = new Date(day.dt * 1000);
                let date = dateTime.toUTCString().slice(0, 11);
                colCount ++;

                html +=`

                     <div class="card col-xs-12 col-sm-6 col-md-4 col-lg-3">
                        <dl class="displayDay">
                            <dt class="row text-center d-block">Date:</dt>
                            <dd class="row text-center d-block">${date}</dd>
                            <dt class="row text-center d-block">High Temp:</dt>
                            <dd class="row text-center d-block">${day.temp.max}<span>&#176;</span>F</dd>
                            <dt class="row text-center d-block">Description:</dt>
                            <dd class="row text-center d-block">${day.weather[0].description} <img class="weatherIcon" src="http://openweathermap.org/img/w/${day.weather[0].icon}.png"</dd>
                            <dt class="row text-center d-block">Humidity:</dt>
                            <dd class="row text-center d-block">${day.humidity}%</dd>
                            <dt class="row text-center d-block">Wind:</dt>
                            <dd class="row text-center d-block">${day.wind_gust} mph</dd>
                            <dt class="row text-center d-block">Pressure:</dt>
                            <dd class="row text-center d-block">${day.pressure} mmHg</dd>
                        </dl>
                    </div>

            `
            })
            html += ``;
            $(`#weatherDisplay`).html(html);


        }
        reverseGeocode(lngLat, MAPBOX_WEATHER_APP).then(function(result){
            console.log(result)
            $(`#weatherDisplayTitle>p`).html(`${result}`)
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
        markerToggle.html(`Drop Pin`);      // change button text
        $(`#toggleInput`).toggleClass("d-none")  // change input visibility

    } else {
        markerToggle.html(`Search Address`);     // change button text
        $(`#toggleInput`).toggleClass("d-none")  // change input visibility

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