const user = [

    {
        traineeEmail: "vishal.malhotra@successive.tech",
        reviewerEmail: "madhav.bansal@successive.tech",

    },
    {
        traineeEmail: "ravi.chauhan@successive.tech",
        reviewerEmail: "vinay.chuadhary@successive.tech",

    }
]

let countForValid = 0;
let countForInvalid = 0;
const validEmailStore = [];
const invalidEmailStore = [];


//checking wheather Email is valid or not.
const validEmail = (email) => {
    const regex = /([a-zA-Z0-9\+_.])+@successive.tech/g;

    return regex.test(email);
}

//Printing of vaild and invalid email user with thier counts.
const printUser = (validEmails, invalidEmails, validCount, invalidCount) => {
    console.log("=> No. of Valid Users : " + validCount);
    validEmails.forEach(element => {
        console.log("- " + element);
    });
    console.log("=> No. of Invalid Users : " + invalidCount);
    invalidEmails.forEach(element => {
        console.log("- " + element);
    })

}

// check for valid users

const validUser = (users) => {
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
    //calling for printUser function

    printUser(validEmailStore, invalidEmailStore, countForValid, countForInvalid);



}

// calling for valid user

validUser(user);





