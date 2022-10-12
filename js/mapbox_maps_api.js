"use strict"

mapboxgl.accessToken = 'pk.eyJ1IjoibWlsZXNyYWtlciIsImEiOiJjbDk1cXJoN2QwMG83NDF0YjE1dTg0ZHE3In0.BlEt2KHrnzDjZ7QyUtzFvg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
});

geocode("1919 Post Alley, Seattle, WA 98101", mapboxgl.accessToken).then(function(result) {
    console.log(result);
    map.setCenter(result);
    map.setZoom(20);
});

function changeZoom(btn){
    console.log(btn.currentTarget.dataset.zoom);
    map.setZoom(Number(btn.currentTarget.dataset.zoom));
}

$(`#zoom-5`).click(changeZoom);
$(`#zoom-10`).click(changeZoom);
$(`#zoom-15`).click(changeZoom);
$(`#zoom-20`).click(changeZoom);


function geocode(search, token) {
    var baseUrl = 'https://api.mapbox.com';
    var endPoint = '/geocoding/v5/mapbox.places/';
    return fetch(baseUrl + endPoint + encodeURIComponent(search) + '.json' + "?" + 'access_token=' + token)
        .then(function(res) {
            return res.json();
            // to get all the data from the request, comment out the following three lines...
        }).then(function(data) {
            return data.features[0].center;
        });
}

function reverseGeocode(coordinates, token) {
    var baseUrl = 'https://api.mapbox.com';
    var endPoint = '/geocoding/v5/mapbox.places/';
    return fetch(baseUrl + endPoint + coordinates.lng + "," + coordinates.lat + '.json' + "?" + 'access_token=' + token)
        .then(function(res) {
            return res.json();
        })
        // to get all the data from the request, comment out the following three lines...
        .then(function(data) {
            return data.features[0].place_name;
        });
}