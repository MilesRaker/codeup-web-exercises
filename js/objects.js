(function() {
    "use strict";

    /**
     * TODO:
     * Create an object with firstName and lastName properties that are strings
     * with your first and last name. Store this object in a variable named
     * `person`.
     *
     * Example:
     *  > console.log(person.firstName) // "Rick"
     *  > console.log(person.lastName) // "Sanchez"
     */
    let person = {
        firstName: "Miles",
        lastName: "Raker"
    }

    console.log("Logging person object: ");
    console.log(person.firstName);
    console.log(person.lastName);
    /**
     * TODO:
     * Add a sayHello method to the person object that returns a greeting using
     * the firstName and lastName properties.
     * console.log the returned message to check your work
     *
     * Example
     * > console.log(person.sayHello()) // "Hello from Rick Sanchez!"
     */
    person.sayHello = function(){
        console.log("Hello, from " + this.firstName + " " + this.lastName + "!");
    }

    person.sayHello();

    /** TODO:
     * HEB has an offer for the shoppers that buy products amounting to
     * more than $200. If a shopper spends more than $200, they get a 12%
     * discount. Write a JS program, using conditionals, that logs to the
     * browser, how much Ryan, Cameron and George need to pay. We know that
     * Cameron bought $180, Ryan $250 and George $320. Your program will have to
     * display a line with the name of the person, the amount before the
     * discount, the discount, if any, and the amount after the discount.
     *
     * Uncomment the lines below to create an array of objects where each object
     * represents one shopper. Use a foreach loop to iterate through the array,
     * and console.log the relevant messages for each person
     */

    let shoppers = [
        {name: 'Cameron', amount: 180},
        {name: 'Ryan', amount: 250},
        {name: 'George', amount: 320}
    ];
    function calculateTotal(shoppers){
        shoppers.forEach(function(person){
            console.log(person.name + " has a total bill of $" + person.amount + ". " + (person.amount >= 200 ? person.name + " qualifies for a 12% discount, making their final bill $" + (person.amount - person.amount * 0.12) : person.name + " does not qualify for a discount"));
        });
    }

    calculateTotal(shoppers);

    /** TODO:
     * Create an array of objects that represent books and store it in a
     * variable named `books`. Each object should have a title and an author
     * property. The author property should be an object with properties
     * `firstName` and `lastName`. Be creative and add at least 5 books to the
     * array
     *
     * Example:
     * > console.log(books[0].title) // "The Salmon of Doubt"
     * > console.log(books[0].author.firstName) // "Douglas"
     * > console.log(books[0].author.lastName) // "Adams"
     */
// let books = [
//         {title: "Undeniable", author: {firstName: "Bill", lastName: "Nye"}},
//         {title: "Cosmos", author:{firstName: "Carl", lastName: "Sagan"}},
//         {title: "Hit Refresh", author:{firstName: "Satya", lastName: "Nedala"}},
//         {title: "Cracking the Coding Interview", author: {firstName: "Gayle", lastName: "McDowell"}},
//         {title: "The Skeptics Guide to the Universe", author: {firstName: "Steven", lastName: "Novella"}}
//     ];
    let createBook = function(title, authorFirstName, authorLastName){
        let book = {
            title: title,
            author: {firstName: authorFirstName, lastName: authorLastName}
        };
        return book;
    }

    let books = [
        createBook("Undeniable", "Bill", "Nye"),
        createBook("Cosmos", "Carl", "Sagan"),
        createBook("Hit Refresh", "Satya", "Nadella"),
        createBook("Cracking the Coding Interview", "Gayle", "McDowell"),
        createBook("Skeptics Guide to the Universe", "Steven", "Novella")
    ];

    /**
     * TODO:
     * Loop through the books array and output the following information about
     * each book:
     * - the book number (use the index of the book in the array)
     * - the book title
     * - author's full name (first name + last name)
     *
     * Example Console Output:
     *
     *      Book # 1
     *      Title: The Salmon of Doubt
     *      Author: Douglas Adams
     *      ---
     *      Book # 2
     *      Title: Walkaway
     *      Author: Cory Doctorow
     *      ---
     *      Book # 3
     *      Title: A Brief History of Time
     *      Author: Stephen Hawking
     *      ---
     *      ...
     */
    (function(){
        console.log("Logging Library Data: ");
        books.forEach(function(book,index){
            console.log("Book # " + (index + 1));
            console.log("Title: " + book.title);
            console.log("Author: " + book.author.firstName + " " + book.author.lastName);
            console.log("---");
        })
    })();

    /**
     * Bonus:
     * - Create a function named `createBook` that accepts a title and author
     *   name and returns a book object with the properties described
     *   previously. Refactor your code that creates the books array to instead
     *   use your function.
     * - Create a function named `showBookInfo` that accepts a book object and
     *   outputs the information described above. Refactor your loop to use your
     *   `showBookInfo` function.
     */


    /* createBook() is on line 83 */

    // let showBookInfo = function(book, index){
    //     console.log("Book # " + (index + 1));
    //     console.log("Title: " + book.title);
    //     console.log("Author: " + book.author.firstName + " " + book.author.lastName);
    //     console.log("---");
    // };
    //
    // (function(){
    //     console.log("using new function, showBookInfo");
    //     for(let i = 0; i < books.length; i ++){
    //         showBookInfo(books[i], i);
    //     }
    // })();










let cat = {
    name: "Penny",
    lengthOfHair: "longhair",
    furStyle: "matted",
    meow: function(){
        console.log("M E O W !");}
}
cat.meow();

// function showBookInfo(arrayOfBooks){
//     let niceString = "";
//     for(let i = 0; i < arrayOfBooks.length; i++){
//         niceString += arrayOfBooks[i].title;
//         niceString += "\n";
//         niceString += arrayOfBooks[i].author.firstName + " " + arrayOfBooks[i].author.lastName;
//         niceString += "\n==================\n"
//     }
//     return niceString// nicely formatted info of each book
// }

// function showBookInfo(arrayOfBooks){
//     let niceString="";
//
//     arrayOfBooks.forEach(function(book){
//         niceString += book.title;
//         niceString += "\n";
//         niceString += book.author.firstName + " " + book.author.lastName;
//         niceString += "\n==================\n"
//     })
//     return niceString;
// }
//console.log(showBookInfo(books));

function showBookInfo(book){
    let niceString = book.title + "\n" + book.author.firstName + " " + book.author.lastName + "\n------------------";
    return niceString;
}
    (function(){
        for(let i = 0; i < books.length; i++){
            console.log(showBookInfo(books[i]));
        }
    })()

})();