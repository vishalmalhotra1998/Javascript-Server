export const validation = {
    create:
    {
        id: {
            required: true,
            string: true,
            in: ['body'],
            custom: ((value) => {
                if (!value) {
                    throw ({
                        error: 'error from custom function',
                        message: 'Enter The Valid Id'
                    });
                }
            })
        },
        name: {
            required: true,
            regex: '^[a-zA-Z\\s]*$',
            in: ['body'],
            errorMessage: 'Name is required',
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
                    console.log('In custom Function');
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