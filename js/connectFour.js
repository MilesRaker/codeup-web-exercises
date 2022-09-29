"use strict";
// TODO:
// add opponent AI for 1 player mode
// timers
// animations

// ---- Initialize data arrays ----
let gameData = new Array(6).fill(0).map(() => new Array(7).fill(0));
let images = new Array(6).fill(0).map(() => new Array(7).fill(0));
let buttons = new Array(6).fill(0).map(() => new Array(7).fill(0));
let srcLocations = [`img/emptySquare.svg`, `img/diamond-svgrepo-com.svg`, `img/heart-svgrepo-com.svg`];
let diamondTurn;
let turnIcon = document.getElementById("turnIcon");
let freezeBoard = false;
let winP = document.getElementById("winner");
let newGameHolder = document.getElementById("newGame");
let numPlayersButton = document.getElementById("numPlayers");
let onePlayerMode = true;

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

newGameHolder.addEventListener("click", newGame);
numPlayersButton.addEventListener("click", numPlayersEvent);

// ---- Initialize Game Board ----
function newGame(){
    gameData = new Array(6).fill(0).map(() => new Array(7).fill(0));
    clearStyles();
    mapImages();
    diamondTurn = Math.random() > 0.5;
    displayTurnIcon();
    winP.innerHTML = "";
    freezeBoard = false;
}

newGame();


// ---- Functions ----
function clearStyles(){
    for(let i = 0; i < 6; i++){
        for(let j = 0; j < 7; j++){
            buttons[i][j].style = "";
        }
    }
}

function displayTurnIcon(){
    turnIcon.src = diamondTurn? srcLocations[1] : srcLocations[2];
}

function hover(event){
    if(!freezeBoard) {
        let j = parseInt(event.currentTarget.id.slice(-1), 10);

        for (let i = 0; i < 6; i++) {
            buttons[i][j].style = "background-color: #848487;";
        }
    }
}

function endHover(event){
    if(!freezeBoard) {
        let j = parseInt(event.currentTarget.id.slice(-1), 10);
        for (let i = 0; i < 6; i++) {
            buttons[i][j].style = "";
        }
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
    if(!freezeBoard) {
        let j = parseInt(event.currentTarget.id.slice(-1), 10);
        let i;
        [i, j] = placeInLowestRow(j);

        mapAndCheck(i, j);

        if(onePlayerMode && !freezeBoard){
            setTimeout(C4AITurn, 1000);
        }
    }
}

function C4AITurn(){
    let j = Math.floor(Math.random()*6);
    let i;
    [i, j] = placeInLowestRow(j);
    mapAndCheck(i, j);
}

function mapAndCheck(i, j){
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
}

function placeInLowestRow(j){
    for (let i = 5; i >= 0; i--) {
        if (gameData[i][j] === 0) {
            gameData[i][j] = diamondTurn ? 1 : 2;
            return [i, j];
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
    freezeBoard = true;
    winP.innerHTML = `${diamondTurn?"Diamond" : "Heart"} is the winner!`
    clearStyles();
    for(let x = 1; x < 5; x++){
        let i = winData[x][0];
        let j = winData[x][1];
        buttons[i][j].style = "border: red solid 2px"
    }


}

function checkDraw(){
    for(let i = 0; i < 6; i++){
        for(let j = 0; j < 7; j++){
            if(gameData[i][j] === 0){
                return false;
            }
        }
    }
    return true;
}

function celebrateDraw(){
    freezeBoard = true;
    winP.innerHTML = "All game squares are filled. Match ended in a DRAW."
}

function numPlayersEvent(){
    onePlayerMode = !onePlayerMode;
    displayPlayerMode();
    newGame();
}

function displayPlayerMode(){
    numPlayersButton.innerHTML = `Number of Players: ${onePlayerMode? "1" : "2"}`;
}