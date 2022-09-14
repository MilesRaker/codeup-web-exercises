"use strict";

// this file is linked to loops.html
// Question 6:

(function(){
    let breakPoint;
    while(true){
        breakPoint = parseInt(prompt("Select your breakPoint. Enter an odd integer between 1 and 50: "));
        if(!isNaN(breakPoint) && breakPoint >= 1 && breakPoint <= 50 && !isEven(breakPoint)){
            break;
        }
    }
    for(let i = 1; i < 51; i +=2){
        if(i == breakPoint){
            console.log("Yikes! Skipping number: " + i);
            continue;
        }
        console.log("Here is an odd number: " + i);
    }


})();