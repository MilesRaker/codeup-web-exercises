"use strict"

/*
1. ✅ Create a new HTML file called weather_map.html.
2. ✅ As you complete each step, commit your changes and push them to GitHub.
3. ✅ Using HTML, CSS, jQuery, AJAX, and the OpenWeatherMap API, start by showing the current conditions for city you live in on your page.
4. Update your layout and AJAX request(s) to display a five-day forecast for the city you live in that looks like the screenshot below.
5. If you want to add the icons the URLs for OpenWeatherMap's icons are formatted like: http://openweathermap.org/img/w/[icon].png where [icon] comes from the API response.
6. Refer to your Mapbox API exercise. Recreate the map below your five-day forecast. Read through the documentation for the Mapbox API and figure out how to allow the user to drop a pin on any place on the map. Once the user drops a pin, grab its coordinates and feed those into your OpenWeatherMap API. Update the five-day forecast with the information from those coordinates (you should also get rid of your input boxes at this point).
7. Add a Mapbox text input to search by location and have the forecast update when a new location is searched.
8. As a bonus make sure you can update the marker's position to the new search result.*/




// call the 5 day api
// what is the result from that call
// display that result to the html

/*
function display5Day(){
    $.get("http://api.openweathermap.org/data/2.5/forecast", {
        APPID: OPEN_WEATHER_APPID,
        lat:    29.423017,
        lon:   -98.48527,
        units: "imperial"
    }).done(function(data) {
        console.log('5 day forecast', data);
    });
}
*/



let weatherArray = [
    {time: "theres a whole bunch of stuff up front then time: 0900",
        temp: "50",
    weather: "rainy"},
    {time: "theres a whole bunch of stuff up front then time: 1200",
        temp: "50",
        weather: "rainy"},
    {time: "1600",
        temp: "50",
        weather: "rainy"},
    {time: "2000",
        temp: "50",
        weather: "rainy"},
    {time: "2400",
        temp: "50",
        weather: "rainy"},
    {time: "0900",
        temp: "50",
        weather: "rainy"},
    {time: "1200",
        temp: "70",
        weather: "rainy"},
    {time: "1600",
        temp: "50",
        weather: "rainy"},
    {time: "2000",
        temp: "50",
        weather: "rainy"},
    {time: "2400",
        temp: "50",
        weather: "rainy"},
    {time: "0900",
        temp: "50",
        weather: "rainy"},
    {time: "1200",
        temp: "55",
        weather: "rainy"},
    {time: "1600",
        temp: "50",
        weather: "rainy"},
    {time: "2000",
        temp: "50",
        weather: "rainy"},
    {time: "2400",
        temp: "50",
        weather: "rainy"},
]

let sortedArray = [];

function sortWeatherData(){
    weatherArray.forEach(function(weatherData){
        if(weatherData.time.slice(-4) === "1200"){
            sortedArray.push(weatherData);
        }
    })

    console.log(sortedArray);
    sortedArray.forEach(function(data){
        //build html
    })
}

