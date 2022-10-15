"use strict"
/* -------- MAPBOX EXERCISE README --------
* All exercise and challenge questions are complete
* */

// -------- Initialize variables --------

// ** Exercise 1: Generate Mapbox API Key:
mapboxgl.accessToken = 'pk.eyJ1IjoibWlsZXNyYWtlciIsImEiOiJjbDk1cXJoN2QwMG83NDF0YjE1dTg0ZHE3In0.BlEt2KHrnzDjZ7QyUtzFvg';

let currentMarkers = []; // stores pointers to all markers. Allows me to delete markers for challenge 4

// Use an array of addresses to set multiple restaurant locations
// array structure: [[address, name, description, popup image, map icon], [address, name, description, popup image, map icon]]
let restaurants = [[`1919 Post Alley, Seattle, WA 98101`, `The Pink Door`, `Italian food and a show`, `img/canCanEdit.jpg`, `img/DinnerIcon.png`],
    [`95 Pine St, Seattle, WA 98101`, `Can Can`, `Dinner and a show, elegant dates`, `img/pinkDoorEdit.jpg`, `img/BurlesqueIcon.png`],
    [`1912 Pike Pl, Seattle, WA 98101`, `Original Starbucks`, `Established 1971, Coffee`, `img/starbucksOGEdit.jpg`, `img/StarbucksIcon.png`]]

// stores marker location and initial timestamp
// used in challenge 5, Animate Marker
let originalMarkerLocation = [];
let startTimeStamp;

// -------- Set event listeners --------

// Zoom button listeners
$(`#zoom-5`).click(changeZoom);
$(`#zoom-10`).click(changeZoom);
$(`#zoom-15`).click(changeZoom);
$(`#zoom-20`).click(changeZoom);

// map markPinkDoor to button using that good ole JQuery
$(`#pinkBtn`).click(markPinkDoor);

// places popup after button click
$(`#pinkPop`).click(popupPinkDoor);

// listen for click to set multiple markers
$(`#multiMarker`).click(populateMarkers);

// creating zoom selector
$(`#zoomSelect`).on(`change`,changeZoomSelect);

// search for user input location
$(`#addressInput`).submit(searchForAddress);

// remove current markers
$(`#removeMarkers`).click(removeAllMarkers);

// set marker with clicky popup
$(`#pinkMarkerPop`).click(markPinkDoorWithPopup);

// set challenge 1 multiple markers
$(`#challengeMultiMarker`).click(challengePopulateMarkers);

// set challenge 5 Bouncy Marker
$(`#bouncyMarker`).click(bouncyMarkerDelegator)

// make the last marker placed bounce
$(`#lastMarkerBounce`).click(lastMarkerBounceDelegator)

// challenge 6: custom map icons
$(`#imageMarkerBtn`).click(setThreeMarkersWithImages)

// -------- Functions --------

// ** Exercise 4: Change zoom level and redraw map
// Four buttons with different dataset-zoom data use changeZoom as callback
function changeZoom(btn){
    // console.log(btn.currentTarget.dataset.zoom);
    map.setZoom(Number(btn.currentTarget.dataset.zoom));
}

// ** Exercise 5: Create marker at exact location of favorite restaurant and set appropriate zoom
// markPinkDoor() is callback of btn "To Pink Door"
function markPinkDoor(){
    geocode("1919 Post Alley, Seattle, WA 98101", mapboxgl.accessToken).then(function(result){
        let pinkDoorMarker = new mapboxgl.Marker().setLngLat(result).addTo(map);
        map.setCenter(result);
        map.setZoom(15);
        currentMarkers.push(pinkDoorMarker);
    })
}

// ** Exercise 6: create popup with name of favorite restaurant
function popupPinkDoor(){
    geocode("1919 Post Alley, Seattle, WA 98101", mapboxgl.accessToken).then(function(result){
        let pinkDoorMarker = new mapboxgl.Popup().setLngLat(result).setHTML(`<p><em>The Pink Door</em></p>`).addTo(map);
        currentMarkers.push(pinkDoorMarker);
    })
    requestAnimationFrame(animateMarker); // for challenge, refactor
}

// ** Exercise 7: Display popup on marker click
function markPinkDoorWithPopup(){
    geocode("1919 Post Alley, Seattle, WA 98101", mapboxgl.accessToken).then(function(result){
        let pinkDoorMarker = new mapboxgl.Marker().setLngLat(result).addTo(map);
        let pinkDoorPopup = new mapboxgl.Popup().setHTML(`<p>The <em>Pink</em> Door</p>`);
        pinkDoorMarker.setPopup(pinkDoorPopup); // popup occurs when marker is clicked
        map.setCenter(result);
        map.setZoom(15);
        currentMarkers.push(pinkDoorMarker);
    })
}

// ** Exercise 8: Display three restaurants, with popups

function populateMarkers(){
    restaurants.forEach(function(restaurant){
        geocode(restaurant[0], mapboxgl.accessToken)
            .then(function(result){
                let marker = new mapboxgl.Marker()
                    .setLngLat(result)
                    .addTo(map);
                let popup = new mapboxgl.Popup().setHTML(`
                    <div>
                        <h2>${restaurant[1]}</h2>
                    </div>
                `);
                marker.setPopup(popup);
                currentMarkers.push(marker);
            });
    });
}

// ** Challenge 1: add more to popups
function challengePopulateMarkers(){
    restaurants.forEach(function(restaurant){
        geocode(restaurant[0], mapboxgl.accessToken)
            .then(function(result){
                let marker = new mapboxgl.Marker()
                    .setLngLat(result)
                    .addTo(map);
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

// ** Challenge 2: Zoom select box
function changeZoomSelect(){
    map.setZoom($(`#zoomSelect`).val());
}

// ** Challenge 3: Address Lookup
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

// ** Challenge 4: Remove all markers button
// created global variable markers to hold pointers to each marker
// refactored each method that places markers to also markers.push(marker)
function removeAllMarkers(){
    if(currentMarkers !== null){
        for (let i = currentMarkers.length - 1; i >= 0; i--){
            currentMarkers[i].remove();
        }
    }
}

// ** Challenge 5: Animate Marker
// animateMarker() makes most recently placed marker bounce for two seconds

// This function will be easier to make after I learn about async and promises
// for now, I'm making it work with setTimeout()
function bouncyMarkerDelegator(){
    startTimeStamp = undefined; // reset timestamp tracker, so button can be reused.
    placeMarkerAtHome() // sets a marker at my home
    // using setTimeout to allow placeMarkerAtHome() to populate currentMarkers before moving on
    setTimeout(function(){
        // store marker original location
        originalMarkerLocation = [currentMarkers[currentMarkers.length - 1]._lngLat.lng, currentMarkers[currentMarkers.length - 1]._lngLat.lat];
        // animate the marker
        requestAnimationFrame(animateMarker);
    },20)
}

function placeMarkerAtHome(){
    geocode("198 Timberline Drive Castle Rock WA 98611", mapboxgl.accessToken)
        .then(function(result){
            let marker = new mapboxgl.Marker().setLngLat(result).addTo(map);
            let popup = new mapboxgl.Popup().setHTML(`
                <h1>Miles' Home</h1>
                <p>198 Timberline Drive Castle Rock WA 98611</p>
            `);
            marker.setPopup(popup);
            map.setCenter(result);
            map.setZoom(15);
            currentMarkers.push(marker);
        });
}

// Define the animation.
function animateMarker(timestamp) {

    // set animation start time
    if( startTimeStamp === undefined){
        startTimeStamp = timestamp;
    }
    // choose the most recent marker placed
    let marker = currentMarkers[currentMarkers.length - 1];

    // Update the data to a new position based on the animation timestamp.
    // The divisor in the expression `timestamp / 1000` controls the animation speed.

    if(timestamp - startTimeStamp < 2000){
        let currentCoords = marker.getLngLat();
        let zoom = map.getZoom();

        // set amplitude of the bouncing based on zoom level
        // values determined by trail and error
        let amplitude;
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

        // set animation's next coordinates
        marker.setLngLat([
            currentCoords.lng,
            originalMarkerLocation[1] + Math.abs(Math.sin(timestamp / 200) * (amplitude))
        ]);

        // Ensure the marker is added to the map.
        marker.addTo(map);

        // Request the next frame of the animation.
        requestAnimationFrame(animateMarker);
    } else {
        // if time has elapsed, set marker to original location
        marker.setLngLat(originalMarkerLocation);
    }
}

function lastMarkerBounceDelegator(){
    startTimeStamp = undefined; // reset timestamp tracker, so button can be reused.
    // store marker original location
    originalMarkerLocation = [currentMarkers[currentMarkers.length - 1]._lngLat.lng, currentMarkers[currentMarkers.length - 1]._lngLat.lat];
    // animate the marker
    requestAnimationFrame(animateMarker);
}

// ** Challenge 6: Custom Map Icons
// added custom image src locations to restaurants array
function setThreeMarkersWithImages(){
    restaurants.forEach(function(location){
        let marker = new mapboxgl.Marker();

        geocode(location[0], mapboxgl.accessToken)
            .then(function(result){
                marker.setLngLat(result);
                marker._element.innerHTML = `
                    <div class="container">
                        <img class="mapIcon" id="${location[1]}-icon" src=${location[4]}>
                        <label for="${location[1]}-icon">${location[1]}</label>
                    </div>`
                marker.addTo(map);
                currentMarkers.push(marker);
                map.setCenter(result);
                map.setZoom(18);
            })
    });
}
// -------- Initialize Map --------
// ** Exercise 2: Add a map to mapbox_maps_api.html
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
});

// ** Exercise 3: Initialize map at favorite restaurant
geocode("1919 Post Alley, Seattle, WA 98101", mapboxgl.accessToken).then(function(result) {
    map.setCenter(result);
    map.setZoom(11);
});


/***********************************************************************************************************************/
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

// dinner icon found at: <a href="https://www.flaticon.com/free-icons/dinner" title="dinner icons">Dinner icons created by Freepik - Flaticon</a>