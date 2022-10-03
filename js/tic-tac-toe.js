"use strict"

// ----------- Initialize variables
let gameData = new Array(3).fill(0).map(() => new Array(3).fill(0));
let gameSquares = new Array(3).fill(0).map(() => new Array(3).fill(0));
let gameButtons = new Array(3).fill(0).map(() => new Array(3).fill(0));
let gameImages = new Array(3).fill(0).map(() => new Array(3).fill(0));
let xTurn = randomBool();
let onePlayer = true;
let freezeBoard = false;
let imageArray = ["img/emptySquare.svg", "img/X.svg", "img/O.svg"]

// ----------- Link html elements -----------

for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
        gameSquares[i][j] = document.getElementById(`gs-${i}-${j}`);
        gameButtons[i][j] = document.getElementById(`btn-${i}-${j}`);
        gameImages[i][j] = document.getElementById(`img-${i}-${j}`);
    }
}

let startButton = document.getElementById("startButton");
let numPlayersButton = document.getElementById("numPlayers");
let textOutput = document.getElementById("textOutput");

// ----------- Event Listeners -----------

for(let i = 0; i < 3; i ++){
    for(let j = 0; j < 3; j++){
        gameButtons[i][j].addEventListener("click", placeMark);
    }
}

// ----------- Create Initial State -----------
newGame();


// ----------- Functions -----------
function newGame(){
    gameData = new Array(3).fill(0).map(() => new Array(3).fill(0));
    for(let square of gameSquares){
        square.style = "";
    }
    xTurn = randomBool();
    renderText(`Turn: ${xTurn? "X" : "O"}`)
    renderGameState();
}

function randomBool(){
    return Math.random() > 0.50;
}

function renderText(input){
    textOutput.innerHTML = input;
}

function placeMark(event){
    if(!freezeBoard) {

        let i = event.target.id.slice(-3,-2);
        let j = event.target.id.slice(-1);

        gameData[i][j] = xTurn ? 1 : 2;
        renderGameState();
        console.log(gameData);
        xTurn = !xTurn;
        renderText(`Turn: ${xTurn? "X" : "O"}`);
        if (onePlayer) {
            //freezeBoard = true;
        }
    }
}

function renderGameState(){
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            gameImages[i][j].src = imageArray[gameData[i][j]];
        }
    }
}
/*

// TODO: Multiple AI levels

// ----------- Initialize variables
let icon_X = "X" //'<i className="fa-solid fa-x"></i>';
let icon_O = "O" //'<i className="fa-solid fa-o"></i>';
let nextIconX = null;
let turnsPlayed = 0;
let onePlayer = true;
let freezeBoard = false;

// ----------- Link html elements -----------
let gameGridButtons = document.getElementsByClassName("grid-button");
let startButton = document.getElementById("startButton");
let textOutput = document.getElementById("textOutput");
let gameType = document.getElementById("gameType");
let turnCounter = document.getElementById("turnCounter");

// ----------- Create Initial State -----------
window.onload = startNewGame;
turnCounter.innerHTML = turnsPlayed.toString();

// ----------- Event Listeners -----------
// add event listeners for all gameGridButtons
for (let gameGridButton of gameGridButtons) {
    gameGridButton.addEventListener('click', placeMark);
}

startButton.addEventListener('click', startNewGame);
gameType.addEventListener("click", setGameType);

// ----------- Functions -----------

function placeMark(){

    if(this.innerHTML == "" && !freezeBoard){
        if(nextIconX){
            this.innerHTML = icon_X;
        } else {
            this.innerHTML = icon_O;
        }

        if(startButton.innerHTML == "Start"){
            startButton.innerHTML = "Restart";
        }

        let winnerData = turnLogic();

        if(onePlayer && !winnerData[0]){
            AITurn();
        }
    }
}

function AITurn(){
    let currentState = gameState();
    let markPlaced = false;
    setTimeout(function(){

        // choose random unoccupied space
        do{
            let randomSquare = Math.floor(Math.random()*8);
            if(currentState[randomSquare] == ""){
                if(nextIconX){
                    gameGridButtons[randomSquare].innerHTML = icon_X;
                } else {
                    gameGridButtons[randomSquare].innerHTML = icon_O;
                }
                markPlaced = true;
            }
        } while(!markPlaced)

        turnLogic()
    }, 1000);

}

function turnLogic(){
    nextIconX = !nextIconX;
    turnCounter.innerHTML = ((++turnsPlayed).toString());
    let winnerData = determineWinner();
    if(winnerData[0]){
        setTextOutput(`The winner is: ` + winnerData[1])
        freezeBoard = true;
    } else if(turnsPlayed === 9){
        setTextOutput(`Draw`)
        freezeBoard = true;
    } else {
        setTextOutput(`Turn: ${nextIconX?"X":"O"}`);
    }
    return winnerData;
}
// Game Control Buttons

function setGameType(){

    if(gameType.innerHTML === "1-Player"){
        gameType.innerHTML = "2-Player";
        onePlayer = false;
    } else if(gameType.innerHTML === "2-Player"){
        gameType.innerHTML = "1-Player";
        onePlayer = true;
    }
    startNewGame();
}

function startNewGame(){
    for(let gameGridButton of gameGridButtons){
        gameGridButton.innerHTML = "";
    }
    freezeBoard = false;
    turnsPlayed = 0;
    turnCounter.innerHTML = turnsPlayed;
    startButton.innerHTML = "Start";
    nextIconX = randTrueFalse();
    setTextOutput((nextIconX? "X" : "Y") + " starts the game")
}

// Text Output p

function setTextOutput(outputText){
    textOutput.innerHTML=outputText;
}

// Helper functions

function randTrueFalse(){
    return (Math.random() >= 0.5 )? true:false;
}

function gameState(){
    let gameMatrix = [];
    for (let i = 0; i < gameGridButtons.length; i++) {
        gameMatrix[i] = gameGridButtons[i].innerHTML;
    }
    return gameMatrix;
}

function determineWinner(){
    let gameMatrix = gameState()
    let winnerExists = false;
    let winner = "";
    // gameGridButtons.forEach((button, index ) => function(){
    //     gameMatrix[index] = button.innerHTML == "X"? true : false;
    // })

    console.log(gameMatrix);
    // TODO: Refactor if else section
    if( gameMatrix[0] == "X" && gameMatrix[1] == "X" && gameMatrix[2] == "X") {
        winnerExists = true;
        winner = "X";
    } else if( gameMatrix[0] == "O" && gameMatrix[1] == "O" && gameMatrix[2] == "O"){
        winnerExists = true;
        winner = "Y";
    } else if(gameMatrix[3] == "X" && gameMatrix[4] == "X" && gameMatrix[5] == "X"){
        winnerExists = true;
        winner = "X";
    } else if(gameMatrix[3] == "O" && gameMatrix[4] == "O" && gameMatrix[5] == "O"){
        winnerExists = true;
        winner = "Y";
    } else if(gameMatrix[6] == "X" && gameMatrix[7] == "X" && gameMatrix[8] == "X"){
        winnerExists = true;
        winner = "X";
    } else if(gameMatrix[6] == "O" && gameMatrix[7] == "O" && gameMatrix[8] == "O"){
        winnerExists = true;
        winner = "Y";
    } else if(gameMatrix[0] == "X" && gameMatrix[3] == "X" && gameMatrix[6] == "X"){
        winnerExists = true;
        winner = "X";
    } else if(gameMatrix[0] == "O" && gameMatrix[3] == "O" && gameMatrix[6] == "O"){
        winnerExists = true;
        winner = "Y";
    } else if(gameMatrix[1] == "X" && gameMatrix[4] == "X" && gameMatrix[7] == "X"){
        winnerExists = true;
        winner = "X";
    } else if(gameMatrix[1] == "O" && gameMatrix[4] == "O" && gameMatrix[7] == "O"){
        winnerExists = true;
        winner = "Y";
    } else if(gameMatrix[2] == "X" && gameMatrix[5] == "X" && gameMatrix[8] == "X"){
        winnerExists = true;
        winner = "X";
    } else if(gameMatrix[2] == "O" && gameMatrix[5] == "O" && gameMatrix[8] == "O"){
        winnerExists = true;
        winner = "Y";
    } else if(gameMatrix[0] == "X" && gameMatrix[4] == "X" && gameMatrix[8] == "X"){
        winnerExists = true;
        winner = "X";
    } else if(gameMatrix[0] == "O" && gameMatrix[4] == "O" && gameMatrix[8] == "O"){
        winnerExists = true;
        winner = "Y";
    } else if(gameMatrix[2] == "X" && gameMatrix[4] == "X" && gameMatrix[6] == "X"){
        winnerExists = true;
        winner = "X";
    } else if(gameMatrix[2] == "O" && gameMatrix[4] == "O" && gameMatrix[6] == "O"){
        winnerExists = true;
        winner = "Y";
    } else {
        winnerExists = false;
        winner = "";
    }

    return [winnerExists, winner]
}*/
