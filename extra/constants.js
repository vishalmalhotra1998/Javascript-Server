const users = [
    {
        traineeEmail: "vishal.malhotra@successive.tech",
        reviewerEmail: "madhav.bansalsuccessive.tech",

    },
    {
        traineeEmail: "ravi.chauhan@successive.tech",
        reviewerEmail: "vinay.chaudhary@successive.tech",

    }
];
const permissions = {
    'getUsers': {
        all: ['head-trainer'],
        read: ['trainee', 'trainer'],
        write: ['trainer'],
        delete: [],
    },

};
//Export the constants user and permission
export { users, permissions };