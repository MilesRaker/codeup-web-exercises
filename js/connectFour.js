"use strict";

/* TODO:
*   - check if winner after each move
*   - highlight winning squares
*   - computer opponent
*/

/* initialize variables */
let diamondTurn;
let diamondSrc = `img/diamond-svgrepo-com.svg`;
let heartSrc = `img/heart-svgrepo-com.svg`;
let emptySquare = `img/emptySquare.svg`;
let gameGrid = []


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
    gameGrid = [
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty",],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty",],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty",],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty",],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty",],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty",]
]
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

    let rowCol = [parseInt(event.currentTarget.id.slice(-3), 10), parseInt(event.currentTarget.id.slice(-1), 10) ];
    console.log("You clicked on square: " + rowCol[0] + " " + rowCol[1]);

    console.log("returned grid image: " + returnGridImage(rowCol).id);
    // console.log(currentImg.id);

    // switch(currentColumnNumber){
    //     case 1:
    //         currentImgColumn = imgColumn1;
    //         break;
    //     case 2:
    //         currentImgColumn = imgColumn2;
    //         break;
    //     case 3:
    //         currentImgColumn = imgColumn3;
    //         break;
    //     case 4:
    //         currentImgColumn = imgColumn4;
    //         break;
    //     case 5:
    //         currentImgColumn = imgColumn5;
    //         break;
    //     case 6:
    //         currentImgColumn = imgColumn6;
    //         break;
    //     case 7:
    //         currentImgColumn = imgColumn7;
    //         break;
    // }
    //
    // for (let i = currentImgColumn.length - 1; i >= 0; i--){
    //     if(currentImgColumn[i].marked === false){
    //         currentImgColumn[i].src = diamondTurn ? diamondSrc : heartSrc; //location of current icon
    //         currentImgColumn[i].marked = true;
    //         diamondTurn = !diamondTurn;
    //         displayTurnIcon();
    //         return;
    //     }
    // }


}

function returnGridImage(xy){

    switch(xy[0]){
        case 1 :
            switch(xy[1]){
                case 1 : return images[0];
                case 2 : return images[1];
                case 3 : return images[2];
                case 4 : return images[3];
                case 5 : return images[4];
                case 6 : return images[5];
                case 7 : return images[6];
            }
            break;
        case 2 :
            switch(xy[1]){
                case 1 : return images[7];
                case 2 : return images[8];
                case 3 : return images[9];
                case 4 : return images[10];
                case 5 : return images[11];
                case 6 : return images[12];
                case 7 : return images[13];
            }
            break;
        case 3 :
            switch(xy[1]){
                case 1 : return images[14];
                case 2 : return images[15];
                case 3 : return images[16];
                case 4 : return images[17];
                case 5 : return images[18];
                case 6 : return images[19];
                case 7 : return images[20];
            }
            break;

        case 4 :
            switch(xy[1]){
                case 1 : return images[21];
                case 2 : return images[22];
                case 3 : return images[23];
                case 4 : return images[24];
                case 5 : return images[25];
                case 6 : return images[26];
                case 7 : return images[27];
            }
            break;

        case 5 :
            switch(xy[1]){
                case 1 : return images[28];
                case 2 : return images[29];
                case 3 : return images[30];
                case 4 : return images[31];
                case 5 : return images[32];
                case 6 : return images[33];
                case 7 : return images[34];
            }
            break;

        case 6:
            switch(xy[1]){
                case 1 : return images[35];
                case 2 : return images[36];
                case 3 : return images[37];
                case 4 : return images[38];
                case 5 : return images[39];
                case 6 : return images[40];
                case 7 : return images[41];
            }
            break;
    }
}

function checkForWinner(lastImgPlaced){
/* Win Conditions:
*  */
}

function testFunc(event){
    console.log("hello from testFunc: " + event.currentTarget.id);
    return;
}

