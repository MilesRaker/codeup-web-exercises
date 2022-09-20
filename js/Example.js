function first(item){
    for(let i = 0; i < item.length; i++){
        console.log(item[i]);
    }
    return item[0];
}

let arrayOfItems = [1, 2, 3, 4, 5];

first(arrayOfItems);

// item = arrayOfItems

let arrayOfOtherItems = [6, 6, 7, 8, 9];

first(arrayOfOtherItems);

// item = arrayOfOtherItems

first([1, 2, 3, 4, 5]);