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

