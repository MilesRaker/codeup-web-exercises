"use strict"

// create map in map div
mapboxgl.accessToken = 'pk.eyJ1IjoibWlsZXNyYWtlciIsImEiOiJjbDk1cXJoN2QwMG83NDF0YjE1dTg0ZHE3In0.BlEt2KHrnzDjZ7QyUtzFvg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
});

// Set initial location to "The Pink Door"
geocode("1919 Post Alley, Seattle, WA 98101", mapboxgl.accessToken).then(function(result) {
    console.log(result);
    map.setCenter(result);
    map.setZoom(20);
});

// Zoom function and zoom button mapping
function changeZoom(btn){
    // console.log(btn.currentTarget.dataset.zoom);
    map.setZoom(Number(btn.currentTarget.dataset.zoom));
}

$(`#zoom-5`).click(changeZoom);
$(`#zoom-10`).click(changeZoom);
$(`#zoom-15`).click(changeZoom);
$(`#zoom-20`).click(changeZoom);

// set marker at The Pink Door
function markPinkDoor(){
    geocode("1919 Post Alley, Seattle, WA 98101", mapboxgl.accessToken).then(function(result){
        let pinkDoorMarker = new mapboxgl.Marker().setLngLat(result).addTo(map);
        let pinkDoorPopup = new mapboxgl.Popup().setHTML(`<p>The <em>Pink</em> Door</p>`);
        pinkDoorMarker.setPopup(pinkDoorPopup); // popup occurs when marker is clicked
        map.setCenter(result);
        map.setZoom(15);
    })
}

// map markPinkDoor to button using that good ole JQuery
$(`#pinkBtn`).click(markPinkDoor);

function popupPinkDoor(){
    geocode("1919 Post Alley, Seattle, WA 98101", mapboxgl.accessToken).then(function(result){
        let pinkDoorMarker = new mapboxgl.Popup().setLngLat(result).setHTML(`<p><em>The Pink Door</em></p>`).addTo(map);
    })
}

$(`#pinkPop`).click(popupPinkDoor); // places popup after button click


// Use an array of addresses to set multiple restaurant locations
// array structure: [[address, name, description], [address, name, description]]
let restaurants = [[`1919 Post Alley, Seattle, WA 98101`, `The Pink Door`, `Italian food and a show`, `img/canCanEdit.jpg`],
    [`95 Pine St, Seattle, WA 98101`, `Can Can`, `Dinner and a show, elegant dates`, `img/pinkDoorEdit.jpg`],
    [`1912 Pike Pl, Seattle, WA 98101`, `Original Starbucks`, `Established 1971, Coffee`, `img/starbucksOGEdit.jpg`]]


$(`#multiMarker`).click(populateMarkers);

function populateMarkers(){
    restaurants.forEach(function(restaurant){
        geocode(restaurant[0], mapboxgl.accessToken)
            .then(function(result){
                let marker = new mapboxgl.Marker().setLngLat(result).addTo(map);
                let popup = new mapboxgl.Popup().setHTML(`
                    <div>
                        <h2>${restaurant[1]}</h2>
                        <hr>
                        <div style="display:flex">
                            <img src=${restaurant[3]} style="height: 50px; width: 50px"> 
                            <p style="display: inline; max-width:75px; height: 75px border: black solid 1px; margin-left: 10px;">${restaurant[2]}</p>
                        </div>
                        
                    </div>
                `);
                marker.setPopup(popup);
        });
    });
}


// creating zoom selector

$(`#zoomSelect`).on(`change`,changeZoomSelect);

function changeZoomSelect(){
    map.setZoom($(`#zoomSelect`).val());
}

// search for user input location

$(`#addressInput`).submit(searchForAddress);

function searchForAddress(input){
    input.preventDefault();
    let searchString = input.target[0].value; // user input address string

    geocode(searchString, mapboxgl.accessToken)
        .then(function(result){
            let marker = new mapboxgl.Marker().setLngLat(result).addTo(map);
            let popup = new mapboxgl.Popup().setHTML(`
                <h1>User Defined Marker</h1>
                <p>${searchString}</p>
            `);
            marker.setPopup(popup);
            map.setCenter(result);
            map.setZoom(15);
        });

}

// Helper functions supplied by Codeup:
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