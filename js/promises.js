"use strict"

/* Exercises
Part 1 - Handle An API Promise:

1. ✅ Create a file named promises.js inside your js directory and link it to an HTML file of your choice.

2. ✅ Generate a Personal Access Token for the GitHub API.

    We will use this so that we don't get rate limited when talking to the GitHub API.
    You can add the token to your requests like this:
    fetch(url, {headers: {'Authorization': 'token YOUR_TOKEN_HERE'}})

3. Create a function that accepts a GitHub username, and returns a promise that resolves returning
    just the date of the last commit that user made. Reference the GitHub api documentation to achieve this.

Part 2 - Create Your Own Promise
1. Write a function named wait that accepts a number as a parameter,
and returns a promise that resolves after the passed number of milliseconds.

    wait(1000).then(() => console.log('You\'ll see this after 1 second'));
    wait(3000).then(() => console.log('You\'ll see this after 3 seconds'));

1. As a bonus make sure the promise resolves with the milliseconds in return, so you can make the console log message more dynamic.*/


/**
 * ask GitHub's api for data about a specific user
 * fulfills requirements of Promises: Part 1 - Exercise 3
 * @param {string} username a GitHub username
 * @return {string} date of user's last commit*/
function lastUserCommitDate(username){

    fetch(`https://api.github.com/user/${username}`)
        .then(response => response.json())
        .then(data => console.log(data));
}

lastUserCommitDate("MilesRaker");