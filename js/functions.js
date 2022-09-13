(function (){

"use strict";

/**
/**
 * TODO:
 * Create a function called 'sayHello' that takes a parameter 'name'.
 * When called, the function should return a message that says hello to the passed in name.
 *
 * Example
 * > sayHello("codeup") // returns "Hello, codeup!"
 */

function sayHello(name){
    return "Hello " + name + ".";
}

console.log(sayHello("Jeffery"));


function sayHello(name) {
    return "Hello " + name + ".";
}

/**
 * TODO:
 * Call the function 'sayHello' and pass your name as a string literal argument.
 * Store the result of the function call in a variable named 'helloMessage'.
 *
 * console.log 'helloMessage' to check your work
 */
let helloMessage = sayHello("Miles");
console.log(helloMessage);
/**
 * TODO:
 * Store your name as a string in a variable named 'myName', and pass that
 * variable to the 'sayHello' function. You should see the same output in the
 * console.
 */

let myName1 = "Miles Raker";

console.log("testing: " + sayHello(myName1));



let myName = "Miles";
let newHelloMessage = sayHello(myName);
console.log(newHelloMessage);
// Don't modify the following line, it generates a random number between 1 and 3
// and stores it in a variable named random
const random = Math.floor((Math.random() * 3) + 1);

/**
 * TODO:
 * Create a function called 'isTwo' that takes a number as a parameter.
 * The function should return a boolean value based on whether or not the passed
 * number is the number 2.
 *
 * Example
 * > isTwo(1) // returns false
 * > isTwo(2) // returns true
 * > isTwo(3) // returns false
 *
 * Call the function 'isTwo' passing the variable 'random' as a argument.
 *
 * console.log *outside of the function* to check your work (you should see a
 * different result everytime you refresh the page if you are using the random
 * number)
 */

// isTwo()
// parameters: numberToCheckIfTwo
// return: boolean isTwo

function isTwo(num){
    return num === 2;
}

console.log("The random number is: "+ random + " isTwo: " + isTwo(random));






function isTwo(num){
    return num === 2;
}

console.log(isTwo(random));

/**
 * TODO:
 * Create a function named 'calculateTip' to calculate a tip on a bill at a
 * restaurant. The function should accept a tip percentage and the total of the
 * bill, and return the amount to tip
 *
 * Examples:
 * > calculateTip(0.20, 20) // returns 4
 * > calculateTip(0.25, 25.50) // returns 6.375
 * > calculateTip(0.15, 33.42) // returns 5.013
 */

function calculateTip(percentTip, billTotal){
    let amountToTip = percentTip * billTotal;
    return amountToTip;
}






/*

function calculateTip(percent, total){
    let tipAmount = total * percent;
    return tipAmount.toFixed(2);
}*/

console.log("20% tip on a $29.22 bill is: " + calculateTip(.2, 29.22));
/**
 * TODO:
 * Use prompt and alert in combination with your calculateTip function to
 * prompt the user for the bill total and a percentage they would like to tip,
 * then display the dollar amount they should tip
 */

/*
let total = prompt("What was the total bill?");
let percentToTip = prompt("What percent do you want to tip? (Enter as a decimal)");

alert(calculateTip(percentToTip, total));

*/







        let bill = parseFloat(prompt("Enter the bill total amount: "));
        let tipPercent = parseFloat(prompt("Enter percent tip as a decimal: "));

        alert("The calculated tip for a $" + bill + " bill and " + tipPercent + " tip is: " + calculateTip(tipPercent, bill));
        /*
/!**
 * TODO:
 * Create a function named `applyDiscount`. This function should accept a price
 * (before a discount is applied), and a discount percentage (a number between 0
 * and 1). It should return the result of applying the discount to the original
 * price.
 *
 * Example:
 * > var originalPrice = 100;
 * > var discountPercent = .2; // 20%
 * > applyDiscount(originalPrice, discountPercent) // 80
 *
 * > applyDiscount(45.99, 0.12) // 40.4712
 *!/

function applyDiscount()
parameters: priceBeforeDiscount, discountAmount - decimal
return: totalAfterDiscount

*/

        function applyDiscount(price, discountPercent) {
            return price - price * discountPercent;
        }

        console.log("A $23.43 item with a 15% discount costs: " + applyDiscount(23.43, .15));

        let itemPrice = parseFloat(prompt("How much does the item cost? "));
        let discountPercent = parseFloat(prompt("What is the discount rate? (enter as a decimal): "));


        alert("The final item cost is: " + applyDiscount(itemPrice, discountPercent));

}
)();