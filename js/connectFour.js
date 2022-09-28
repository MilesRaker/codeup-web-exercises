"use strict";

/* initialize variables */
let diamondTurn;
let diamondSrc = `img/diamond-svgrepo-com.svg`;
let heartSrc = `img/heart-svgrepo-com.svg`;
let emptySquare = `img/emptySquare.svg`;


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
let imgColumn1 = document.getElementsByClassName("img-c-1");
let imgColumn2 = document.getElementsByClassName("img-c-2");
let imgColumn3 = document.getElementsByClassName("img-c-3");
let imgColumn4 = document.getElementsByClassName("img-c-4");
let imgColumn5 = document.getElementsByClassName("img-c-5");
let imgColumn6 = document.getElementsByClassName("img-c-6");
let imgColumn7 = document.getElementsByClassName("img-c-7");

/* Assign Event Listeners */
newGameButton.addEventListener("click", newGame);
for(let button of buttons){
    button.addEventListener("mouseover", highlightColumn);
    button.addEventListener("mouseleave", deHighlightColumn);
    button.addEventListener("click", clickColumn);
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
        image.marked = false;
        image.src = emptySquare;
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
        turnIcon.src = diamondSrc;
    } else {
        turnIcon.src = heartSrc;
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

function clickColumn(event){
//    place mark on lowest row of current column

    let currentColumnNumber = parseInt(event.currentTarget.id.slice(-1), 10);
    let currentImgColumn;

    switch(currentColumnNumber){
        case 1:
            currentImgColumn = imgColumn1;
            break;
        case 2:
            currentImgColumn = imgColumn2;
            break;
        case 3:
            currentImgColumn = imgColumn3;
            break;
        case 4:
            currentImgColumn = imgColumn4;
            break;
        case 5:
            currentImgColumn = imgColumn5;
            break;
        case 6:
            currentImgColumn = imgColumn6;
            break;
        case 7:
            currentImgColumn = imgColumn7;
            break;
    }

    for (let i = currentImgColumn.length - 1; i >= 0; i--){


        if(currentImgColumn[i].marked === false){
            currentImgColumn[i].src = diamondTurn ? diamondSrc : heartSrc; //location of current icon
            currentImgColumn[i].marked = true;
            diamondTurn = !diamondTurn;
            return;
        }
    }

}

function testFunc(event){
    console.log("hello from testFunc: " + event.currentTarget.id);
    return;
}

