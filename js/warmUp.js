(function(){
/*Warm up 21 September 2022*/

/*Area of a Triangle: Write a JavaScript function that accepts the 3 lengths of a triangle and outputs the triangle’s area.*/
function triangleArea(x, y, z){
    let p = (x + y + z)/2;
    return Math.sqrt(p*(p-x)*(p-y)*(p-z));
    // p((1-x)(1-y)(1-z))**(1/2)
}

/*Reverse a String: Write a JS function that accepts a string and returns the string in reverse. example input: codeup, example output: puedoc*/

function reverseString(input){
    return input.reverse();
}

function FizzBuzz(){
    for(let i = 1; i <= 100; i++){
        let output = "Fancy number " + i + " ";
        if(i%3==0){
            output += "Fizz";
        }
        if(i%5==0){
            output += "Buzz";
        }
        console.log(output);
    }
}

FizzBuzz()

function shuffleArray(array){
    return array.sort(randomCompare);
}
let randomCompare = function(){
    if(Math.random() > Math.random()){
        return -1;
    } else{
        return 1;
    }
}
console.log(shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]));

/*Warm up 22 September 2022*/

/* Create a function to sort the array from lowest to highest.
Make sure the function accepts an array and returns an array. */
let arr1 = [5, 4, 3, 2, 1];
let arr2 = [10, 33, 22, 2, 1, 2, 2, 4, 4, 6, 9];

function sortArray(arrayIn){
    return arrayIn.sort(function(a,b){
        if(Number(a) > Number(b)){
            return 1;
        } else if(Number(a) == Number(b)){
            return 0;
        } else {
            return -1;
        }
    });

}

    console.log("sort array 1: " + sortArray(arr1));
    console.log("sort array 2: " + sortArray(arr2));

    /* Write a function that returns the reading status of each of the following books: */

let library = [
    {
        author: 'Bill Gates',
        title: 'The Road Ahead',
        readingStatus: true
    },
    {
        author: 'Steve Jobs',
        title: 'Walter Isaacson',
        readingStatus: true
    },
    {
        author: 'Suzanne Collins',
        title:  'Mockingjay: The Final Book of The Hunger Games',
        readingStatus: false
    }];

function returnBookStatus(array){
    let readingStatus = [];
    array.forEach(function(book){
        readingStatus.push(book.readingStatus)
    })

    return readingStatus;
}

    (function(){
        let readingStatus = returnBookStatus(library);
        readingStatus.forEach(function(status, index){
            console.log(`Book number ${index}'s reading status is: ${status}`)
        })
    })()

})()