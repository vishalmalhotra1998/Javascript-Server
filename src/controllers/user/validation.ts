export const validation = {
    create:
    {
        name: {
            required: true,
            regex: '^[a-zA-Z\\s]*$',
            in: ['body'],
            errorMessage: 'Name is required',
        },
        email: {
            required: true,
            regex: '([a-zA-Z0-9\+_.])+@successive.tech',
            in: ['body'],
            errorMessage: 'Email is required'

        },
        mob: {
            required: true,
            number: true,
            in: ['body'],
            errorMessage: 'Number is required'

        },
        address: {
            required: true,
            string: true,
            in: ['body'],
            errorMessage: 'Address is required'

        },
        dob: {
            required: true,
            string: true,
            in: ['body'],
            errorMessage: 'Date of Birth is required'
        },
        hobbies: {
            required: true,
            isObject: true,
            in: ['body'],
            errorMessage: 'Hobbies is required'
        }

    },
    delete: {
        id: {
            required: true,
            errorMessage: 'Id is required',
            in: ['params']
        }
    },
    get: {
        skip: {
            required: false,
            default: 0,
            number: true,
            in: ['query'],
            errorMessage: 'Skip is invalid',
        },
        limit: {
            required: false,
            default: 10,
            number: true,
            in: ['query'],
            errorMessage: 'Limit is invalid',
        }
    },
    update: {
        id: {
            required: true,
            string: true,
            in: ['body']
        },
        dataToUpdate: {
            in: ['body'],
            required: true,
            isObject: true,
            custom: (dataToUpdate) => {
                {
                    if (!dataToUpdate) {
                        throw ({
                            error: 'error from custom function',
                            message: 'Enter The Valid Object'
                        });
                    }
                }
            },
        }
    }
};
export default validation;