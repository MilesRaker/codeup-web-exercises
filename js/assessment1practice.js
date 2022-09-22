/*
Core competencies assessed
Reading and following directions
Producing solutions that match the problem specification
Using Git and working with GitHub
    Cloning a git repository from GitHub
Creating your own branch
Committing and pushing work to a new branch on GitHub
Programing fundamentals in JavaScript
Working with values, variables, and data types
Using assignment and comparision operators
Working with JS internal functions to make decisions and perform actions.
    Using conditional logic to make decisions inside functions
Writing functions that take in inputs, process, and return outputs.

    Here's some example word problems:
// Define a function named timesFour that takes in an input and multiples that input by four if it is numeric. If the input is not numeric, then return false.
// timesFour(0) //0
// timesFour("5") //20
// timesFour(-5) //-20
// timesFour('Texas') //false
// timesFour([2,1,0]) //false
// timesFour(true) //false
// timesFour(null) //false

// Define a function named convertDaystoHours that takes in one input Days. Return the conversion of the number of days into total hours. If the input is not numeric or a numeric string, convertDaystoHours, should return false.
// convertDaystoHours(0) //0
// convertDaystoHours('5') // 120
// convertDaystoHours('Texas') //false
// convertDaystoHours([2, 1, 0]) //false
// convertDaystoHours(true) //false
// convertDaystoHours(false) //false

// Write a function named calculateTax that takes in two inputs representing the totalPaid and the taxPercent. If both inputs are numeric or numeric strings, calculateTax should return the total with tax added in a string looking like: “$XX.XX”. If either or both inputs are not numeric or numeric strings, calculateTax should return false.
// calculateTax(25, 8)               // “$27.00"
// calculateTax(10, 12)             // “$11.20”
// calculateTax(120, 15.5)           // “$138.60"
// calculateTax(10, true)           // false
// calculateTax([1, 2, 3], 10)      // false
// calculateTax(“Codeup”, 100)      // false
// calculateTax()                   // false
*/

function timesFour(input){
    if(isNaN(input) || typeof input == 'boolean' || input == null){
        return false;
    }

    return input * 4;

}

console.log("\n-----------Question 1----------");
console.log("timesFour(0): " + timesFour(0)); //0
console.log("timesFour(\"5\"): " + timesFour("5")); //20
console.log("timesFour(-5): " + timesFour(-5)); //-20
console.log("timesFour('Texas'): " + timesFour('Texas')); //false
console.log("timesFour([2, 1, 0]): " + timesFour([2, 1, 0])); //false
console.log("timesFour(true): " + timesFour(true)); //false
console.log("timesFour(null): " + timesFour(null)); //false

function convertDaystoHours(days){
    if(isNaN(days) || typeof days == 'boolean' || days == null){
        return false;
    }

    return days * 24;
}

console.log("\n-----------Question 2----------");
console.log("convertDaystoHours(0): " + convertDaystoHours(0)); //0
console.log("convertDaystoHours('5'): " + convertDaystoHours('5')); // 120
console.log("convertDaystoHours('Texas'): " + convertDaystoHours('Texas')); //false
console.log("convertDaystoHours([2, 1, 0]): " + convertDaystoHours([2, 1, 0])); //false
console.log("convertDaystoHours(true): " + convertDaystoHours(true)); //false
console.log("convertDaystoHours(false): " + convertDaystoHours(false)); //false

function calculateTax(totalPaid, taxPercent){
    if(isNaN(totalPaid) || typeof totalPaid == 'boolean' || totalPaid == null || isNaN(taxPercent) || typeof taxPercent == 'boolean' || taxPercent == null ){
        return false;
    }
    let priceWithTax = (totalPaid + (totalPaid * taxPercent * 0.01)).toFixed(2);
    return `$${priceWithTax};`
}
console.log(calculateTax(25, 8));               // “$27.00"
console.log(calculateTax(10, 12));              // “$11.20”
console.log(calculateTax(120, 15.5));           // “$138.60"
console.log(calculateTax(10, true));            // false
console.log(calculateTax([1, 2, 3], 10));       // false
console.log(calculateTax("Codeup", 100));       // false
console.log(calculateTax());                                       // false