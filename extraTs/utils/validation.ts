import validateEmail from '../utils/helpers';
import { Iemail } from '../interfaces';

// Printing of vaild and invalid email user with thier counts.
const printUser = (validEmail: Iemail[], invalidEmail: Iemail[], validCount: number, invalidCount: number): void => {
    console.log('=> No. of Valid Users : ' + validCount);
    console.log(validEmail);
    console.log('=> No. of Invalid Users : ' + invalidCount);
    console.log(invalidEmail);
};
// Check for valid users
const validateUser = (users: Iemail[]) => {
    let validUser = 0;
    let invalidUser = 0;
    const validUserStore: Iemail[] = [];
    const invalidUserStore: Iemail[] = [];
    users.forEach(user => {
        const { traineeEmail: trainee, reviewerEmail: reviewer } = user;
        if (validateEmail(trainee) && validateEmail(reviewer)) {
            validUserStore.push(user);
            validUser++;
        }
        else {
            invalidUserStore.push(user);
            invalidUser++;
        }
    });
    printUser(validUserStore, invalidUserStore, validUser, invalidUser);
};
export default validateUser;






