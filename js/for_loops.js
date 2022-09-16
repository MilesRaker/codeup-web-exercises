"use strict"

// Question 2:

function showMultiplicationTable(num){
    console.log("showMultiplicationTable() for num = " + num);
    for (let i = 1; i < 11; i ++){
        console.log(num + " x " + i + " = " + num * i);
    }
}

showMultiplicationTable(2);
showMultiplicationTable(-3);


// Question 3:

function isEven(num){
    if(isNaN(num)){
        return false;
    }
    return (num % 2 == 0);
}

function generateRandom20to200(){
    return Math.floor(Math.random() * 180) + 20; // found the idea on W3schools
}

(function(){
    console.log("\nQuestion 3: ");
    for(let i = 0; i < 10; i++){
        let num = generateRandom20to200();
        console.log(num + " is " + (isEven(num) ? "even" : "odd"));
    }

})();

// Question 4:

(function(){
    console.log("\nQuestion 4: ");
    for(let i = 1; i < 10; i++){
        let output = "";
        for(let j = 0; j < i; j++){
            output += i;
        }
        console.log(output);
    }
})();

// Question 5:

(function(){
    console.log("\nQuestion 5: ");
    for(let i = 100; i > 0; i -= 5){
        console.log(i);
    }
})();