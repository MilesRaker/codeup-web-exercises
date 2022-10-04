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
numPlayersButton.addEventListener("click", numPlayerEvent);
startButton.addEventListener("click", newGame);
// ----------- Create Initial State -----------
newGame();


// ----------- Functions -----------
function numPlayerEvent(){
    onePlayer = !onePlayer;
    numPlayersButton.innerHTML = `${onePlayer? "1" : "2"}-Player Mode`;
    newGame();
}

function newGame(){
    freezeBoard = false;
    gameData = new Array(3).fill(0).map(() => new Array(3).fill(0));
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            gameSquares[i][j].style = "";
        }
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
        let playerMarked = false;

        while(!playerMarked){
            // if a mark already exists in selected spot, return our put placeMark, still on player's turn
            if(gameData[i][j] !== 0){
                return;
            } else {
                // if a mark does not exist in selected spot, place player's mark in that spot
                gameData[i][j] = xTurn ? 1 : 2;
                playerMarked = true;
            }
        }

        renderGameState();
        let winData = checkForWinner(i, j);
        if(winData[0]){
            celebrateWin(winData);
            return;
        } else {
            let draw = checkForDraw()
            if(draw){
                celebrateDraw();
                return;
            }
        }
        xTurn = !xTurn;
        renderText(`Turn: ${xTurn? "X" : "O"}`);
        if (onePlayer) {
            freezeBoard = true;
            setTimeout(fancyAITurn, 1000);
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

function checkForDraw(){
    // must call after checkForWinner, only if winData[0] === false
    for(let i = 0; i < 3; i ++){
        for(let j = 0; j < 3; j++){
            if (gameData[i][j] === 0){
                return false;
            }
        }
    }
    return true;
}

function celebrateDraw(){
    renderText(`Game Ended in Draw!`);
    freezeBoard = true;
}

function checkForWinner(i, j){
    let currentData = gameData[i][j];

    let winData = checkRow(i, currentData); // boolean
    if(winData[0]){
        return winData;
    }
    winData = checkColumn(j, currentData); // boolean
    if(winData[0]){
        return winData;
    }
    winData = checkDiagonal1(currentData); // boolean
    if(winData[0]){
        return winData;
    }
    winData = checkDiagonal2(currentData); // boolean
    if(winData[0]){
        return winData;
    }

    return [false, [0, 0], [0, 0], [0, 0]];
}

function checkRow(i, currentData){
    if(currentData === gameData[i][0] && currentData === gameData[i][1] && currentData === gameData[i][2]){
        return [true, [i, 0], [i, 1], [i, 2]];
    }
    return false;
}

function checkColumn(j, currentData){
    if(currentData === gameData[0][j] && currentData === gameData[1][j] && currentData === gameData[2][j]){
        return [true, [0, j], [1, j], [2, j]];
    }
    return false;
}

function checkDiagonal1(currentData){
    if(currentData === gameData[2][0] && currentData === gameData[1][1] && currentData === gameData[0][2]){
        return [true, [2, 0], [1, 1], [0, 2]];
    }
    return false;
}

function checkDiagonal2(currentData){
    if(currentData === gameData[0][0] && currentData === gameData[1][1] && currentData === gameData[2][2]){
        return [true, [0, 0], [1, 1], [2, 2]];
    }
    return false;
}

function celebrateWin(winData){
    freezeBoard = true;
    renderText(`${gameData[winData[1][0]][winData[1][1]] === 1? "X" : "O"} Wins!`);
    for(let x = 1; x < 4; x ++) {
        gameSquares[winData[x][0]][winData[x][1]].style = "border: solid red 1px";
    }
}

/*function randomAITurn(){
// randomAITurn was original AI. Replaced by fancyAITurn
// randomAITurn may be used for testing
    let i;
    let j;
    do{
        i = Math.floor(Math.random() * 3);
        j = Math.floor(Math.random() * 3);
    } while(gameData[i][j] !== 0)
    gameData[i][j] = xTurn ? 1 : 2;
    renderGameState();
    let winData = checkForWinner(i, j);
    if(winData[0]){
        celebrateWin(winData);
    } else {
        freezeBoard = false;
        xTurn = !xTurn;
        renderText(`Turn: ${xTurn? "X" : "O"}`);
    }
}*/

function fancyAITurn(){
    let aiMark = xTurn ? 1 : 2;
    let playerMark = xTurn ? 2 : 1;
    let aiMarkPlaced = false;
    let count = 0;
    let ii, jj;
    let firstMark = [];

    for(let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if(gameData[i][j] !== 0){
                count ++
                firstMark.push(i);
                firstMark.push(j);
            }
        }
    }

    // if count === 1 && first mark is a corner: place in opposite corner
    if(count === 1){
        switch(firstMark[0]){
            case 0:
                switch(firstMark[1]){
                    case 0:
                        gameData[2][2] = aiMark;
                        ii = 2;
                        jj = 2;
                        aiMarkPlaced = true;
                        break;
                    case 2:
                        gameData[2][0] = aiMark;
                        ii = 2;
                        jj = 0;
                        aiMarkPlaced = true;
                        break;
                }
                break;
            case 2:
                switch(firstMark[1]){
                    case 0:
                        gameData[0][2] = aiMark;
                        ii = 0;
                        jj = 2;
                        aiMarkPlaced = true;
                        break;
                    case 2:
                        gameData[0][0] = aiMark;
                        ii = 0;
                        jj = 0;
                        aiMarkPlaced = true;
                        break;
                }
                break;
            default:
                break;
        }
    }

    // check columns for potential winning move
    for(let i = 0; i < 3; i ++){
        if(gameData[i][0] === aiMark && gameData[i][1] === aiMark && gameData[i][2] === 0){
            gameData[i][2] = aiMark;
            ii = i;
            jj = 2;
            aiMarkPlaced = true;
            // render, check for win
        } else if(gameData[i][0] === aiMark && gameData[i][1] === 0 && gameData[i][2] === aiMark){
            gameData[i][1] = aiMark;
            ii = i;
            jj = 1;
            aiMarkPlaced = true;
            // render, check for win
        } else if(gameData[i][0] === 0 && gameData[i][1] === aiMark && gameData[i][2] === aiMark){
            gameData[i][0] = aiMark;
            ii = i;
            jj = 0;
            aiMarkPlaced = true;
            // render, check for win
        }
    }

    // check rows for potential winning move
    if(!aiMarkPlaced){
        for(let j = 0; j < 3; j ++){
            if(gameData[0][j] === aiMark && gameData[1][j] === aiMark && gameData[2][j] === 0){
                gameData[2][j] = aiMark;
                ii = 2;
                jj = j;
                aiMarkPlaced = true;
                // render, check for win
            } else if(gameData[0][j] === aiMark && gameData[1][j] === 0 && gameData[2][j] === aiMark){
                gameData[1][j] = aiMark;
                ii = 1;
                jj = j;
                aiMarkPlaced = true;
                // render, check for win
            } else if(gameData[0][j] === 0 && gameData[1][j] === aiMark && gameData[2][j] === aiMark){
                gameData[0][j] = aiMark;
                ii = 0;
                jj = j;
                aiMarkPlaced = true;
                // render, check for win
            }
        }
    }

    // check diagonal 1 for potential winning move
    if(!aiMarkPlaced){
        if(gameData[0][0] === aiMark && gameData[1][1] === aiMark && gameData[2][2] === 0){
            gameData[2][2] = aiMark;
            ii = 2;
            jj = 2;
            aiMarkPlaced = true;
        } else if(gameData[0][0] === aiMark && gameData[1][1] === 0 && gameData[2][2] === aiMark){
            gameData[1][1] = aiMark;
            ii = 1;
            jj = 1;
            aiMarkPlaced = true;
        } else if(gameData[0][0] === 0 && gameData[1][1] === aiMark && gameData[2][2] === aiMark){
            gameData[0][0] = aiMark;
            ii = 0;
            jj = 0;
            aiMarkPlaced = true;
        }
    }

    // check diagonal 2 for potential winning move
    if(!aiMarkPlaced){
        if(gameData[2][0] === aiMark && gameData[1][1] === aiMark && gameData[0][2] === 0){
            gameData[0][2] = aiMark;
            ii = 0;
            jj = 2;
            aiMarkPlaced = true;
        } else if(gameData[2][0] === aiMark && gameData[1][1] === 0 && gameData[0][2] === aiMark){
            gameData[1][1] = aiMark;
            ii = 1;
            jj = 1;
            aiMarkPlaced = true;
        } else if(gameData[2][0] === 0 && gameData[1][1] === aiMark && gameData[0][2] === aiMark){
            gameData[2][0] = aiMark;
            ii = 2;
            jj = 0;
            aiMarkPlaced = true;
        }
    }

    // check for potential blocking move
    // check columns for potential blocking move
    if(!aiMarkPlaced){
        for(let i = 0; i < 3; i ++){
            if(gameData[i][0] === playerMark && gameData[i][1] === playerMark && gameData[i][2] === 0){
                gameData[i][2] = aiMark;
                ii = i;
                jj = 2;
                aiMarkPlaced = true;
                // render, check for win
            } else if(gameData[i][0] === playerMark && gameData[i][1] === 0 && gameData[i][2] === playerMark){
                gameData[i][1] = aiMark;
                ii = i;
                jj = 1;
                aiMarkPlaced = true;
                // render, check for win
            } else if(gameData[i][0] === 0 && gameData[i][1] === playerMark && gameData[i][2] === playerMark){
                gameData[i][0] = aiMark;
                ii = i;
                jj = 0;
                aiMarkPlaced = true;
                // render, check for win
            }
        }
    }

    // check rows for potential blocking move
    if(!aiMarkPlaced){
        for(let j = 0; j < 3; j ++){
            if(gameData[0][j] === playerMark && gameData[1][j] === playerMark && gameData[2][j] === 0){
                gameData[2][j] = aiMark;
                ii = 2;
                jj = j;
                aiMarkPlaced = true;
                // render, check for win
            } else if(gameData[0][j] === playerMark && gameData[1][j] === 0 && gameData[2][j] === playerMark){
                gameData[1][j] = aiMark;
                ii = 1;
                jj = j;
                aiMarkPlaced = true;
                // render, check for win
            } else if(gameData[0][j] === 0 && gameData[1][j] === playerMark && gameData[2][j] === playerMark){
                gameData[0][j] = aiMark;
                ii = 0;
                jj = j;
                aiMarkPlaced = true;
                // render, check for win
            }
        }
    }

    // check diagonal 1 for potential blocking move
    if(!aiMarkPlaced){
        if(gameData[0][0] === playerMark && gameData[1][1] === playerMark && gameData[2][2] === 0){
            gameData[2][2] = aiMark;
            ii = 2;
            jj = 2;
            aiMarkPlaced = true;
        } else if(gameData[0][0] === playerMark && gameData[1][1] === 0 && gameData[2][2] === playerMark){
            gameData[1][1] = aiMark;
            ii = 1;
            jj = 1;
            aiMarkPlaced = true;
        } else if(gameData[0][0] === 0 && gameData[1][1] === playerMark && gameData[2][2] === playerMark){
            gameData[0][0] = aiMark;
            ii = 0;
            jj = 0;
            aiMarkPlaced = true;
        }
    }

    // check diagonal 2 for potential blocking move
    if(!aiMarkPlaced){
        if(gameData[2][0] === playerMark && gameData[1][1] === playerMark && gameData[0][2] === 0){
            gameData[0][2] = aiMark;
            ii = 0;
            jj = 2;
            aiMarkPlaced = true;
        } else if(gameData[2][0] === playerMark && gameData[1][1] === 0 && gameData[0][2] === playerMark){
            gameData[1][1] = aiMark;
            ii = 1;
            jj = 1;
            aiMarkPlaced = true;
        } else if(gameData[2][0] === 0 && gameData[1][1] === playerMark && gameData[0][2] === playerMark){
            gameData[2][0] = aiMark;
            ii = 2;
            jj = 0;
            aiMarkPlaced = true;
        }
    }

    // winning move > blocking move > middle > corner > edges

    if(!aiMarkPlaced){
        [ii, jj] = placeCenterCornersSides();
    }

    renderGameState();
    let winData = checkForWinner(ii, jj)
    if(winData[0]){
        celebrateWin(winData);
    }else if(checkForDraw()){
        celebrateDraw();
    } else {
        xTurn = !xTurn;
        renderText(`Turn: ${xTurn === 1? "X" : "O"}`);
        freezeBoard = false;
    }
}

function placeCenterCornersSides() {
    let aiMark = xTurn ? 1 : 2;


    if (gameData[1][1] === 0) {
        // pick center spot
        gameData[1][1] = aiMark;
        return [1, 1]
    }

    // pick corner spot
    // try all four corner spots
    let cornersTried = [];
    let cornerNumber = 0;
    while(cornersTried.length < 4){
        //set cornerNumber to a new corner
        do{
            cornerNumber = Math.floor(Math.random() * 3);
        } while (cornersTried.includes(cornerNumber))
        cornersTried.push(cornerNumber); // add current corner to list of tried corners

        // attempt to place AIMark
        switch (cornerNumber) {
            case 0:
                if (gameData[0][0] === 0) {
                    gameData[0][0] = aiMark;
                    return [0, 0];
                }
                break;
            case 1:
                if (gameData[0][2] === 0) {
                    gameData[0][2] = aiMark;
                    return [0, 2];
                }
                break;
            case 2:
                if (gameData[2][0] === 0) {
                    gameData[2][0] = aiMark;
                    return [2, 0];
                }
                break;
            case 3:
                if (gameData[2][2] === 0) {
                    gameData[2][2] = aiMark;
                    return [2, 2];
                }
                break;
        }
    }



    // pick side spot
    // try all four side spots
    let sidesTried = [];
    let sideNumber = 0;
    while(sidesTried.length < 4) {
        //set cornerNumber to a new corner
        do {
            sideNumber = Math.floor(Math.random() * 3);
        } while (sidesTried.includes(sideNumber))
        sidesTried.push(cornerNumber); // add current corner to list of tried corners

        // attempt to place AI mark in side spot
        switch (sideNumber) {
            case 0:
                if (gameData[1][0] === 0) {
                    gameData[1][0] = aiMark;
                    return [1, 0];
                }
                break;
            case 1:
                if (gameData[0][1] === 0) {
                    gameData[0][1] = aiMark;
                    return [0, 1];
                }
                break;
            case 2:
                if (gameData[1][2] === 0) {
                    gameData[1][2] = aiMark;
                    return [1, 2];
                }
                break;
            case 3:
                if (gameData[2][1] === 0) {
                    gameData[2][1] = aiMark;
                    return [2, 1];
                }
                break;
        }
    }
}
