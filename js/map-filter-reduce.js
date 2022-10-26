"use strict"

/*Exercises
1. ✅ Create a file named map-filter-reduce.js in your js directory and copy the users data below into it.
2. ✅ Use .filter to create an array of user objects where each user object has at least 3 languages in the languages array.
3. ✅ Use .map to create an array of strings where each element is a user's email address
4. ✅ Use .reduce to get the total years of experience from the list of users. Once you get the total of years you can use the result to calculate the average.
5. ✅ Use .reduce to get the longest email from the list of users.
6. ✅ Use .reduce to get the list of user's names in a single string. Example: Your instructors are: ryan, luis, zach, fernando, justin.
Bonus
1. Use .reduce to get the unique list of languages from the list of users.*/

const users = [
    {
        id: 1,
        name: 'ryan',
        email: 'ryan@codeup.com',
        languages: ['clojure', 'javascript'],
        yearsOfExperience: 5
    },
    {
        id: 2,
        name: 'luis',
        email: 'luis@codeup.com',
        languages: ['java', 'scala', 'php'],
        yearsOfExperience: 6
    },
    {
        id: 3,
        name: 'zach',
        email: 'zach@codeup.com',
        languages: ['javascript', 'bash'],
        yearsOfExperience: 7
    },
    {
        id: 4,
        name: 'fernando',
        email: 'fernando@codeup.com',
        languages: ['java', 'php', 'sql'],
        yearsOfExperience: 8
    },
    {
        id: 5,
        name: 'justin',
        email: 'justin@codeup.com',
        languages: ['html', 'css', 'javascript', 'php'],
        yearsOfExperience: 9
    }
];

// Exercise 2:
const smartyPants = users.filter((user) => user.languages.length > 2);
console.log(`Exercise 2 output: `, smartyPants);

// Exercise 3:
const emailParty = users.map((user) => user.email);
console.log(`Exercise 3 output: `, emailParty);

// Exercise 4:
const yearsExperience = users.reduce((yearsAccumulator, user) => yearsAccumulator + user.yearsOfExperience, 0);
console.log(`Exercise 4 output: `, `\ntotal years experience: ${yearsExperience}`, `\naverage years experience: ${yearsExperience/users.length}`);

// Exercise 5:
const longestEmail = users.reduce((longestEmail, user) => user.email.length > longestEmail.length?user.email:longestEmail, "");
console.log(`Exercise 5 output: `, longestEmail);

// Exercise 6:
const allUserNames = users.reduce((allNamesAccumulator, user) => allNamesAccumulator += `${user.name} `, "");
console.log(`Exercise 6 output: `, allUserNames);

// Bonus 1:
// I am using all the shorthand I know
const uniqueLanguages = users.reduce((pV, cV) => {
    for(const language of cV.languages)
        !pV.includes(language) ? pV.push(language): pV;
    return pV;
}, [])

console.log(`Bonus 1 output: `, uniqueLanguages);