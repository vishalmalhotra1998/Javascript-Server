import validEmail from '../utils/helpers'

// Export for valid user
export default validUser;

let validUser = 0;
let invalidUser = 0;
const validUserStore = [];
const invalidUserStore = [];
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






