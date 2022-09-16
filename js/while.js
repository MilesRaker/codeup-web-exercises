"use strict";

// while.js is linked to loops.html
// Question 7: While

(function(){
    let num = 2;
    while(num < 70000){
        console.log(num);
        num *= 2;
    }
})();

// Question 8: Do-While

(function(){
    let conesToSell = Math.floor(Math.random() * 50) + 50;

    console.log("I have " + conesToSell + " cones to sell.");
    do{
        let conesWanted = Math.floor(Math.random() * 5) + 1;
        if(conesWanted < conesToSell){
            conesToSell -= conesWanted;
            console.log(conesWanted + " cone" + (conesWanted == 1 ? "" : "s") + " sold...");
        } else if (conesWanted == conesToSell){
            conesToSell -= conesWanted;
            console.log("Yay! I sold them all!");
        } else {
            console.log("Cannot sell you " + conesWanted + " cones, I only have " + conesToSell);
        }
    }while(0 < conesToSell);
})();