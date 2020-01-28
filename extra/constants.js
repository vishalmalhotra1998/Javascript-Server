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
const permissions = {
    'getUsers': {
        all: ['head-trainer'],
        read: ['trainee', 'trainer'],
        write: ['trainer'],
        delete: [],
    },

}

export {user,permissions}