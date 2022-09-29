"use strict";

// ---- Initialize data arrays ----
let gameData = new Array(6).fill(0).map(() => new Array(7).fill(0));
let images = new Array(6).fill(0).map(() => new Array(7).fill(0));
let buttons = new Array(6).fill(0).map(() => new Array(7).fill(0));
let srcLocations = [`img/emptySquare.svg`, `img/diamond-svgrepo-com.svg`, `img/heart-svgrepo-com.svg`];
let diamondTurn;
let turnIcon = document.getElementById("turnIcon");
let gameOver = false;

// ---- Assign Element Arrays and Event Listeners----
(function(){
    for (let i = 0; i < 6; i ++){
        for (let j = 0; j < 7; j ++){
            images[i][j] = document.getElementById(`img-${i}-${j}`);
            buttons[i][j] = document.getElementById(`btn-${i}-${j}`);
            buttons[i][j].addEventListener("mouseover", hover);
            buttons[i][j].addEventListener("mouseleave", endHover);
            buttons[i][j].addEventListener("click", placeToken);
        }
    }
})();

// ---- Initialize Game Board ----
function newGame(){
    gameData = new Array(6).fill(0).map(() => new Array(7).fill(0));
    mapImages();
    diamondTurn = Math.random() > 0.5;
    displayTurnIcon();
}

newGame();

// ---- Functions ----
function displayTurnIcon(){
    turnIcon.src = diamondTurn? srcLocations[1] : srcLocations[2];
}

function hover(event){
    let j = parseInt(event.currentTarget.id.slice(-1), 10);

    for(let i = 0; i < 6; i++){
        buttons[i][j].style = "background-color: #848487;";
    }
}

function endHover(event){
    let j = parseInt(event.currentTarget.id.slice(-1), 10);
    for(let i = 0; i < 6; i++){
        buttons[i][j].style = "";
    }
}

function mapImages(){
    for (let i = 0; i < 6; i ++){
        for (let j = 0; j < 7; j ++){
            images[i][j].src = srcLocations[gameData[i][j]];
        }
    }
}

function placeToken(event){
    if(!gameOver) {
        let j = parseInt(event.currentTarget.id.slice(-1), 10);
        for (let i = 5; i >= 0; i--) {
            if (gameData[i][j] === 0) {
                gameData[i][j] = diamondTurn ? 1 : 2;
                mapImages();
                let winCheck = checkWinner(i, j);

                if (winCheck[0]) {
                    celebrateWinner(winCheck);
                    return;
                }
                let drawCheck = checkDraw();
                if(drawCheck){
                    celebrateDraw();
                }
                nextTurn();
                return;
            }
        }
    }
}

function nextTurn(){
    diamondTurn = !diamondTurn;
    displayTurnIcon();
}

function checkWinner(iLast, jLast){
    // 1. get position of last mark
    // 2. check column
    // 3. check row
    // 4. check / diagonal
    // 5. check \ diagonal
    // 6. return location of winning squares
    // expected return from callback functions:
    // [true, [i, j], [i, j], [i, j], [i, j]] or [false, []]


    let lastMark = [iLast, jLast];
    let columnReturn = checkColumn(lastMark[1])
    if(columnReturn[0]){
        return columnReturn;
    }

    let rowReturn = checkRow(iLast);
    if(rowReturn[0]){
        return rowReturn;
    }

    let diagonal1Return = checkDiagonal1(iLast, jLast);
    if(diagonal1Return[0]){
        return diagonal1Return;
    }

    let diagonal2Return = checkDiagonal2(iLast, jLast);
    if(diagonal2Return[0]){
        return diagonal2Return;
    }

    return [false, [0, 0]]
}

function checkColumn(j){
    let winnerArray = [];
    for(let i = 0; i < 6; i++){
        if(gameData[i][j] === (diamondTurn ? 1 : 2)){
            winnerArray.push([i,j]);
        } else {
            winnerArray = [];
        }
        if(winnerArray.length === 4){
            winnerArray.unshift(true);
            return winnerArray;
        }
    }
    winnerArray.unshift(false);
    return winnerArray;
}

function checkRow(i){
    let winnerArray = [];
    for(let j = 0; j < 7; j++){
        if(gameData[i][j] === (diamondTurn ? 1 : 2)){
            winnerArray.push([i,j]);
        } else {
            winnerArray = [];
        }
        if(winnerArray.length === 4){
            winnerArray.unshift(true);
            return winnerArray;
        }
    }
    winnerArray.unshift(false);
    return winnerArray;
}

function checkDiagonal1(i, j){
    let winnerArray = [];
    // find start of diagonal

    while(i !== 0 && j !== 0){
        i--;
        j--;
    }

    while(i < 6 && j < 7){
        if(gameData[i][j] === (diamondTurn ? 1 : 2)){
            winnerArray.push([i, j]);
        } else {
            winnerArray = [];
        }
        if(winnerArray.length === 4){
            winnerArray.unshift(true);
            return winnerArray;
        }
        i++;
        j++;
    }
    winnerArray.unshift(false);
    return winnerArray;
}

function checkDiagonal2(i, j){
    let winnerArray = [];
    // find start of diagonal
    while(i < 5 && j > 0){
        i++;
        j--;
    }

    while(i >= 0 && j < 7){
        if(gameData[i][j] === (diamondTurn ? 1 : 2)){
            winnerArray.push([i, j]);
        } else {
            winnerArray = [];
        }
        if(winnerArray.length === 4){
            winnerArray.unshift(true);
            return winnerArray;
        }
        i--;
        j++;
    }
    winnerArray.unshift(false);
    return winnerArray;
}

function celebrateWinner(winData){
    gameOver = true;
    console.log(`${diamondTurn?"Diamond" : "Heart"} is the winner!`);
}

function checkDraw(){
    for(let i = 0; i < 6; i++){
        for(let j = 0; j < 7; j++){
            console.log(`checking data of gameData: ${gameData[i][j]}`);
            if(gameData[i][j] === 0){
                return false;
            }
        }
    }
    return true;
}

function celebrateDraw(){
    gameOver = true;
    console.log("All game squares are filled. Match ended in a DRAW.")
}
/*
"use strict";

/!* TODO:
*   - check if winner after each move
*   - highlight winning squares
*   - computer opponent
*!/

/!* Key:
*  gameGrid: 0 => empty, 1 => diamond, 2 => heart
* *!/
/!* initialize variables *!/
let diamondTurn;
let diamondSrc = `img/diamond-svgrepo-com.svg`;
let heartSrc = `img/heart-svgrepo-com.svg`;
let emptySquare = `img/emptySquare.svg`;
let gameGrid = new Array(7).fill(0).map(() => new Array(6).fill(0));


/!* get elements *!/
let turnIcon = document.getElementById("turnIcon");
let newGameButton = document.getElementById("newGame");
let buttons = document.getElementsByClassName("gameButton");
// let images = document.getElementsByClassName("button-img");

let images = initializeImages();


console.log("images: " + images);

/!* Assign Event Listeners *!/
newGameButton.addEventListener("click", newGame);
for(let button of buttons){
    // button.addEventListener("mouseover", highlightColumn);
    // button.addEventListener("mouseleave", deHighlightColumn);
    button.addEventListener("click", clickColumn);
}
/!* Initialize Page *!/
newGame();

/!* functions *!/

function newGame(){
    /!* choose who goes first*!/
    diamondTurn = diamondGoesFirst();
    displayTurnIcon();

    /!* reset board *!/
    gameGrid = new Array(6).fill(0).map(() => new Array(7).fill(0));
    // for(let image of images){
    //     image.marked = false;
    //     image.src = emptySquare;
    // }
    mapGameGridToImages();
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
function mapGameGridToImages(){

    console.log(gameGrid);
    let x = 0; // iterator for images
    for(let i = 0; i < 6; i++){
        for(let j = 0; j < 7; j++){
            switch(gameGrid[i][j]){
                case 0:
                    images[x].src = emptySquare;
                    break;
                case 1:
                    images[x].src = diamondSrc;
                    break;
                case 2:
                    images[x].src = heartSrc;
                    break;
            }
            console.log(gameGrid[j][i]);
            x++;
        }
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

    let row = parseInt(event.currentTarget.id.slice(-3), 10);
    let col = parseInt(event.currentTarget.id.slice(-1), 10);

    console.log("rowCol: " + row + " " + col);

    for (let row = 5; row >= 0; row--){

        if(gameGrid[row][col - 1] == 0){
            gameGrid[row][col - 1]  = diamondTurn ? 1 : 2;
            break;
        }
    }
    mapGameGridToImages();
    console.log("testing gameGrid after: " + gameGrid);
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
/!* Win Conditions:
*  *!/
}

function initializeImages(){
    let images = [];
    // column 1
    images.push(document.getElementById("img-1-1"));
    images.push(document.getElementById("img-2-1"));
    images.push(document.getElementById("img-3-1"));
    images.push(document.getElementById("img-4-1"));
    images.push(document.getElementById("img-5-1"));
    images.push(document.getElementById("img-6-1"));

    // column 2
    images.push(document.getElementById("img-1-2"));
    images.push(document.getElementById("img-2-2"));
    images.push(document.getElementById("img-3-2"));
    images.push(document.getElementById("img-4-2"));
    images.push(document.getElementById("img-5-2"));
    images.push(document.getElementById("img-6-2"));

    // column 3
    images.push(document.getElementById("img-1-3"));
    images.push(document.getElementById("img-2-3"));
    images.push(document.getElementById("img-3-3"));
    images.push(document.getElementById("img-4-3"));
    images.push(document.getElementById("img-5-3"));
    images.push(document.getElementById("img-6-3"));


    // column 4
    images.push(document.getElementById("img-1-4"));
    images.push(document.getElementById("img-2-4"));
    images.push(document.getElementById("img-3-4"));
    images.push(document.getElementById("img-4-4"));
    images.push(document.getElementById("img-5-4"));
    images.push(document.getElementById("img-6-4"));


    // column 5
    images.push(document.getElementById("img-1-5"));
    images.push(document.getElementById("img-2-5"));
    images.push(document.getElementById("img-3-5"));
    images.push(document.getElementById("img-4-5"));
    images.push(document.getElementById("img-5-5"));
    images.push(document.getElementById("img-6-5"));


    // column 6
    images.push(document.getElementById("img-1-6"));
    images.push(document.getElementById("img-2-6"));
    images.push(document.getElementById("img-3-6"));
    images.push(document.getElementById("img-4-6"));
    images.push(document.getElementById("img-5-6"));
    images.push(document.getElementById("img-6-6"));

}
function testFunc(event){
    console.log("hello from testFunc: " + event.currentTarget.id);
    return;
}

*/





