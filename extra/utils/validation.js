const users = [

    {
        traineeEmail: "vishal.malhotra@successive.tech",
        reviewerEmail: "madhav.bansalsuccessive.tech",

    },
    {
        traineeEmail: "ravi.chauhan@successive.tech",
        reviewerEmail: "vinay.chuadhary@successive.tech",

    }
];

let validUser = 0;
let invalidUser = 0;
const validUserStore = [];
const invalidUserStore = [];
// Checking wheather Email is valid or not.
const validateEmail = (email) => {
    const regex = /([a-zA-Z0-9\+_.])+@successive.tech/g;
    return regex.test(email);
};
// Printing of vaild and invalid email user with thier counts.
const printUser = (validEmail, invalidEmail, validCount, invalidCount) => {
    console.log("=> No. of Valid Users : " + validCount);
    console.log(validEmail);
    console.log("=> No. of Invalid Users : " + invalidCount);
    console.log(invalidEmail);
};
// Check for valid users
const validateUser = (users) => {
    users.forEach(user => {
        // Destructuring the object 
        const { traineeEmail: trainee, reviewerEmail: reviewer } = user;
        if (validateEmail(trainee) && validateEmail(reviewer)) {
            validUserStore.push(trainee, reviewer);
            validUser++;
        }
        else {
            invalidUserStore.push(trainee, reviewer);
            invalidUser++;
        }
    });
    printUser(validUserStore, invalidUserStore, validUser, invalidUser);
};
validateUser(users);






