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
const valid_Email = [];
const invalid_Email = [];


//checking wheather Email is valid or not.
function validEmail(email) {
    const regex = /([a-zA-Z0-9\+_.])+@successive.tech/g;

    return regex.test(email);
}

//Printing of vaild and invalid email user with thier counts.
function printUser(validEmails, invalidEmails, validCount, invalidCount) {
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

function validUser(users) {
    users.forEach(element => {

        // Destructuring the object 
        const { traineeEmail: trainee, reviewerEmail: reviewer } = element;
        if (validEmail(trainee)) {
            valid_Email.push(trainee);
            countForValid++;
        }
        else {
            invalid_Email.push(trainee);
            countForInvalid++;
        }

        if (validEmail(reviewer)) {
            valid_Email.push(reviewer);
            countForValid++;

        }
        else {
            invalid_Email.push(reviewer);
            countForInvalid++;
        }


    });
    //calling for printUser function

    printUser(valid_Email, invalid_Email, countForValid, countForInvalid);



}

// calling for valid user

validUser(user);





