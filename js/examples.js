// alert("sanity check");

/*Working with Data Types, Operators, and Variables*/

// Exercise 1:

//part 1:
/*
var a = 1;
var b = a++;
var c = ++a;
// what is the value of a, b, and c?*/

var a = 1;
var b = a++;
var c = ++a;

console.log("I prediect a = 3, b = 1, c = 3");
console.log("a = " + a + " b = " + b + " c = " + c);

// part 2
var d = "hello";
var e = false;

d++;
e++;

console.log("I predict d = NaN and e = 1");
console.log("d = " + d + " e = " + e);

// part 3 // ask instructor

var perplexed; // perplexed is undefined (no value is assigned)
console.log("before increment:" + perplexed);
perplexed += 2;

console.log("perplexed will stay undefined");
console.log("perplexed = " + perplexed);

// part 4

var price = 2.7;
price.toFixed(2);

console.log("I predict price = 2.7, price was not reassigned.");
console.log("price: " + price);

//part 5

var price = "2.7";
// price.toFixed(2); // throws error, cannot toFixed(NaN)

console.log("I predict price to stay 2.7, no reassignment happened.");
// console.log("price: " + price);

//part 6
console.log("Expected: false");
console.log(isNaN(0));

console.log("Expected: false");
console.log(isNaN(1));

console.log("Expected isNaN(\"\"): false");
console.log(isNaN(""));
console.log("Testing zero: " + (0 == ""));

console.log("Expected: true");
console.log(isNaN("string"));

console.log("Expected: false");
console.log("isNan(\"0\")" + isNaN("0"));
// console.log("12 == \"12\": " + (12 == "a 12 "));


console.log("Expected: false");
console.log(isNaN("1"));

console.log("Expected: false");
console.log(isNaN("3.145"));

console.log("Expected: false");
// console.log(Number.MAX_VALUE + 1);
console.log(isNaN(Number.MAX_VALUE));

console.log("Expected: false");
console.log(isNaN(Infinity));
console.log("typeof(infiinity): " + typeof (Infinity));

console.log("Expected: true");
console.log(isNaN("true"));

console.log("Expected: false");
console.log(isNaN(true));

console.log("Expected: true");
console.log(isNaN("false"));

console.log("Expected: false");
console.log(isNaN(false));

// to illustrate why the isNaN() function is needed:
console.log("Expected: false");
console.log("typeof (NaN): " + (typeof (NaN)));
console.log("NaN == !NaN: "  + (NaN == !NaN));
console.log("NaN == NaN: " + (NaN == NaN));
console.log(isNaN(NaN));
console.log("NaN === NaN: " + (NaN === NaN));

// Part 7:
console.log("Expecting: false");
console.log("!true: " + !true);

console.log("Expecting: true");
console.log("!false: " + !false);

console.log("Expecting: true");
console.log("!!true: " + !!true);

console.log("Expecting: false");
console.log("!!false: " + !!false);

console.log("Expecting: false");
console.log("!!0: " + !!0);

console.log("Expecting: false");
console.log("!!-0: " + (!!-0));

console.log("Expecting: true");
console.log("!!1: " + !!1);

console.log("Expecting: true");
console.log("!!-1: " + !!-1);

console.log("Expecting: true");
console.log("!!0.1: " + !!0.1);

console.log("Expecting: true");
console.log("!!\"hello\": " + !!"hello");

console.log("Expecting: false");
console.log("!!\"\": " + !!"");

console.log("Expecting: false");
console.log("!!'': " + !!'');

console.log("Expecting: true");
console.log("!!\"false\": " + !!"false");

console.log("Expecting: true");
console.log("!!\"0\": " + !!"0");

// Exercise 2:

var sample = "Hello Codeup";
console.log("sample.length: " + sample.length);
console.log(sample.toUpperCase());
console.log(sample.toLowerCase());
sample += " Students";
console.log(sample.replace("Students", "Class"));
console.log(sample.indexOf("c"));
console.log(sample.indexOf("C"));
console.log(sample.substring(sample.indexOf("Codeup"), sample.indexOf("Codeup") + 6 ));

// Exercise 3:

var rentalCost = (3+5+1) * 3;
console.log("The total rental cost is: " + rentalCost);

var weeklyPay = (10*350) + (6*400) + (4*380);
console.log("I will get paid $" + weeklyPay.toFixed(2)) + " this week.";

var notFull = true;
var noScheduleConflict = false;
var canEnroll = notFull && noScheduleConflict;

console.log("The student may enroll: " + canEnroll);

var numberOfItemsPurchased = 3;
var OfferExpirationDate = new Date(2030, 11, 5);
var currentDate = new Date();
var isPremium = true
var canBeOfferred = (isPremium || numberOfItemsPurchased > 2) && (OfferExpirationDate > currentDate);
console.log("The item " + (canBeOfferred ? "can" : "cannot") + " be offered.");

// Exercise 4

var username = 'codeup';
var password = 'notastrongpassword';

var atLeastFiveCharacters = 5 < username.length;
var passwordContainsUsername = password.includes(username);
var lessThanTwentyCharacters = username.length < 20;
var isTrimmed = !(username[0]==" " | username[username.length] == " " | password[0] == " " | password[password.length] == " ")

console.log("Username " + (atLeastFiveCharacters?"is":"is not") + " at least five characters long.");
console.log("The Password " + (passwordContainsUsername?"does":"does not") + " contain the Username.");
console.log("Username " + (lessThanTwentyCharacters?"is":"is not") + " less than twenty characters long.");
console.log("The Username or password " + (isTrimmed?"do not ":"") + "have white space at the start or end.");
