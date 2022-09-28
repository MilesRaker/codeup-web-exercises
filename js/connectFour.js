"use strict";

/* initialize variables */
let diamondTurn;

/* get elements */
let turnIcon = document.getElementById("turnIcon");
let newGameButton = document.getElementById("newGame");
let buttons = document.getElementsByClassName("gameButton");
let column1 = document.getElementsByClassName("c-1");
let column2 = document.getElementsByClassName("c-2");
let column3 = document.getElementsByClassName("c-3");
let column4 = document.getElementsByClassName("c-4");
let column5 = document.getElementsByClassName("c-5");
let column6 = document.getElementsByClassName("c-6");
let column7 = document.getElementsByClassName("c-7");
let images = document.getElementsByClassName("button-img");
/* Assign Event Listeners */
newGameButton.addEventListener("click", newGame);
for(let button of buttons){
    button.addEventListener("mouseover", highlightColumn);
    button.addEventListener("mouseleave", deHighlightColumn);
}
/* Initialize Page */
newGame();

/* functions */

function newGame(){
    /* choose who goes first*/
    diamondTurn = diamondGoesFirst();
    displayTurnIcon();

    /* reset board */
    for(let image of images){
        image.src = "";
    }
}

function diamondGoesFirst(){
    if(Math.random()>= 0.5){
        return true;
    } else {
        return false;
    }
}

function displayTurnIcon(){
    if(diamondTurn){
        turnIcon.src = `img/diamond-svgrepo-com.svg`
    } else {
        turnIcon.src = `img/heart-svgrepo-com.svg`
    }
}

function selectActiveColumn(event){
    let currentColumnNumber = parseInt(event.currentTarget.id.slice(-1), 10);
    let currentColumn;

    switch(currentColumnNumber){
        case 1:
            currentColumn = column1;
            break;
        case 2:
            currentColumn = column2;
            break;
        case 3:
            currentColumn = column3;
            break;
        case 4:
            currentColumn = column4;
            break;
        case 5:
            currentColumn = column5;
            break;
        case 6:
            currentColumn = column6;
            break;
        case 7:
            currentColumn = column7;
            break;
    }
    return currentColumn
}

function highlightColumn(event){

    let currentColumn = selectActiveColumn(event);

    for(let square of currentColumn){
        square.style = "background-color: #848487;"
    }
}

function deHighlightColumn(event){
    let currentColumn = selectActiveColumn(event);

    for(let square of currentColumn){
        square.style = "";
    }
}

function testFunc(event){
    console.log("hello from testFunc: " + event.currentTarget.id);
    return;
}