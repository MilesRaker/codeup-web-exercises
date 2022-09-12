"use strict";

function userName(){
    let firstName = prompt("Enter your first name: ");
    let lastName = prompt("Enter your last name: ");

    return firstName + " " + lastName;
}

document.getElementById("userNameP").innerHTML = userName();