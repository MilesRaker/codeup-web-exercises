(function(){
    "use strict";

    /**
     * TODO:
     * Create an array of 4 people's names and store it in a variable called
     * 'names'.
     */

    let names = ["Miles", "Laura", "Jay", "Princess"];
    /**
     * TODO:
     * Create a log statement that will log the number of elements in the names
     * array.
     */
    console.log("There are " + names.length + " names in the names array.");
    /**
     * TODO:
     * Create log statements that will print each of the names individually by
     * accessing each element's index.
     */
    console.log("Logging names individually...");
    console.log(names[0]);
    console.log(names[1]);
    console.log(names[2]);
    console.log(names[3]);
    /**
     * TODO:
     * Write some code that uses a for loop to log every item in the names
     * array.
     */
    console.log("logging names with a for loop...");
    for(let i = 0; i < names.length; i ++){
        console.log("names[" + i + "]= " + names[i]);
    }
    /**
     * TODO:
     * Refactor your above code to use a `forEach` loop
     */
    console.log("Logging names with a forEach loop...");
    names.forEach(function(name, index){
        console.log("names[" + index + "]: " + name);
    })
    /**
     * TODO:
     * Create the following three functions, each will accept an array and
     * return an an element from it
     * - first: returns the first item in the array
     * - second: returns the second item in the array
     * - last: returns the last item in the array
     *
     * Example:
     *  > first([1, 2, 3, 4, 5]) // returns 1
     *  > second([1, 2, 3, 4, 5]) // returns 2
     *  > last([1, 2, 3, 4, 5]) // return 5
     */
    console.log(":::::::::::FINAL QUESTION:::::::");

    function first(array){
        return (array[0] == null) ? null : array[0];
    }

    function second(array){
        return (array[1] == null) ? null : array[1];
    }

    function last(array){
        return (array[array.length - 1] == null) ? null : array[array.length - 1];
    }

    console.log(first([1, 2, 3, 4, 5])); // returns 1
    console.log(first([])); // returns null
    console.log(first(["a", "b", "c"])); // returns a
    console.log(second([1, 2, 3, 4, 5])); // returns 2
    console.log(last([1, 2, 3, 4, 5])); // return 5
    console.log(last([])); // returns null

})();