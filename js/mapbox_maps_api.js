"use strict"

var currentMarkers = []; // stores pointers to all markers. Allows me to delete markers for challenge 4

// create map in map div
mapboxgl.accessToken = 'pk.eyJ1IjoibWlsZXNyYWtlciIsImEiOiJjbDk1cXJoN2QwMG83NDF0YjE1dTg0ZHE3In0.BlEt2KHrnzDjZ7QyUtzFvg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
});

// Set initial location to "The Pink Door"
geocode("1919 Post Alley, Seattle, WA 98101", mapboxgl.accessToken).then(function(result) {

    map.setCenter(result);
    map.setZoom(11);
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
        currentMarkers.push(pinkDoorMarker);
    })
}

// map markPinkDoor to button using that good ole JQuery
$(`#pinkBtn`).click(markPinkDoor);

function popupPinkDoor(){
    geocode("1919 Post Alley, Seattle, WA 98101", mapboxgl.accessToken).then(function(result){
        let pinkDoorMarker = new mapboxgl.Popup().setLngLat(result).setHTML(`<p><em>The Pink Door</em></p>`).addTo(map);
        currentMarkers.push(pinkDoorMarker);
    })
    requestAnimationFrame(animateMarker);
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
                currentMarkers.push(marker);
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
            currentMarkers.push(marker);
        });
}

// remove current markers

function removeAllMarkers(){
    if(currentMarkers !== null){
        for (let i = currentMarkers.length - 1; i >= 0; i--){
            currentMarkers[i].remove();
        }
    }
}

$(`#removeMarkers`).click(removeAllMarkers);


// Make marker bouncy

/*function animateMarker(timestamp){
    console.log(`hello from animate marker`);
    const radius = 20;

    if (currentMarkers[0] !== null){
        let marker = currentMarkers[0]

        marker.setLngLat([
            Math.cos(timestamp / 1000) * radius,
            Math.sin(timestamp / 1000) * radius
        ])
        marker.addTo(map);

        requestAnimationFrame(animateMarker)
    }
}*/

// requestAnimationFrame(animateMarker);
// Add a new Marker.



const marker = new mapboxgl.Marker({
    color: '#F84C4C', // color it red
});

let originalMarkerLocation = [];

geocode("1919 Post Alley, Seattle, WA 98101", mapboxgl.accessToken)
    .then(function(result){
        marker.setLngLat(result);
        console.log("setting marker location to: " + marker.getLngLat());
        originalMarkerLocation = [marker.getLngLat().lng, marker.getLngLat().lat];
        requestAnimationFrame(animateMarker);
    })

// Define the animation.
function animateMarker(timestamp) {

    console.log(`OGmarker: ${originalMarkerLocation}`);
    /*
    Update the data to a new position
    based on the animation timestamp.
    The divisor in the expression `timestamp / 1000`
    controls the animation speed.
    */

    if(timestamp < 2000){
        let currentCoords = marker.getLngLat();
        let zoom = map.getZoom();
        let amplitude;
        console.log(zoom);
        switch(true){
            case (zoom >= 20):
                amplitude = 0.00001;
                break;
            case (zoom >= 15):
                amplitude = 0.0002;
                break;
            case (zoom >= 10):
                amplitude = 0.003;
                break;
            case (zoom >= 5):
                amplitude = 0.04;
                break;
            case (zoom >= 1):
                amplitude = 0.5;
                break;
        }
        console.log(`in anmateMarker(): ${currentCoords.lng} , ${currentCoords.lat} and amplitude: ${amplitude}`);
        marker.setLngLat([
            currentCoords.lng , // change to currentLng + timestamp/1000 * zoomLevel*scalingFactor
            originalMarkerLocation[1] + Math.abs(Math.sin(timestamp / 200) * (amplitude)) // change to currentLng + timestamp/1000 * zoomLevel*scalingFactor
        ]);

        /*
        Ensure the marker is added to the map.
        This is safe to call if it's already added.
        */
        marker.addTo(map);


// Request the next frame of the animation.
        requestAnimationFrame(animateMarker);
    } else {
        marker.setLngLat(originalMarkerLocation);
    }

}

// Start the animation.

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