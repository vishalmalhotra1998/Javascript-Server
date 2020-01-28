import validEmail from '../utils/helpers';
import { Iemail } from '../interfaces';
let countForValid = 0;
let countForInvalid = 0;
const validEmailStore = [];
const invalidEmailStore = [];
// Printing of vaild and invalid email user with thier counts.
const printUser = (validEmails: string[], invalidEmails: string[], validCount: number, invalidCount: number): void => {
    console.log('=> No. of Valid Users : ' + validCount + '\n');
    validEmails.forEach(element => {
        console.log('- ' + element + '\n');
    });
    console.log('=> No. of Invalid Users : ' + invalidCount + '\n');
    invalidEmails.forEach(element => {
        console.log('- ' + element + '\n');
    });
};
// check for valid users
const validUser = (users: Iemail[]): void => {
    users.forEach(element => {
        // Destructuring the object
        const { traineeEmail: trainee, reviewerEmail: reviewer } = element;
        if (validEmail(trainee)) {
            validEmailStore.push(trainee);
            countForValid++;
        }
        else {
            invalidEmailStore.push(trainee);
            countForInvalid++;
        }
        if (validEmail(reviewer)) {
            validEmailStore.push(reviewer);
            countForValid++;
        }
        else {
            invalidEmailStore.push(reviewer);
            countForInvalid++;
        }
    });
    // Calling for printUser function
    printUser(validEmailStore, invalidEmailStore, countForValid, countForInvalid);
};
// Export for valid user
export default validUser;







