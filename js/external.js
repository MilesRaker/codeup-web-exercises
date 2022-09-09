"use strict";

console.log("Hello from External JavaScript");

// ******** Part two! ********

alert("Welcome to my Website!");

let favoriteColor = prompt("What is your favorite color?");
alert("My favorite color is " + favoriteColor + " too!");

// Exercise 3 from previous lesson
alert("Exercise 3 starts here: ");
let rentalLengthMermaid = parseInt(prompt("How many days will you rent The Little Mermaid?"));
let rentalLengthBear = parseInt(prompt("How many days will you rent Brother Bear?"));
let rentalLengthHercules = parseInt(prompt("How many days will you rent Hercules?"));
let rentalCost = (rentalLengthMermaid+rentalLengthBear+rentalLengthHercules) * 3;
alert("The total rental cost is: " + rentalCost);

let hoursWorkedAmazon = prompt("How many hours did you work at Amazon this week?");
let hoursWorkedGoogle = prompt("How many hours did you work at Google this week?");
let hoursWorkedFacebook = prompt("How many hours did you work at Facebook this week?");
let weeklyPay = (hoursWorkedGoogle*350) + (hoursWorkedAmazon*400) + (hoursWorkedFacebook*380);
alert("I will get paid $" + weeklyPay.toFixed(2) + " this week.");

let notFull = true;
let noScheduleConflict = false;
let canEnroll = notFull && noScheduleConflict;

alert("The student may enroll: " + canEnroll);

let numberOfItemsPurchased = prompt("How many items were purchased?");
let OfferExpirationDate = new Date(2030, 11, 5);
let currentDate = new Date();
let isPremium = true
let canBeOffered = (isPremium || numberOfItemsPurchased > 2) && (OfferExpirationDate > currentDate);
alert("The item " + (canBeOffered ? "can" : "cannot") + " be offered.");
