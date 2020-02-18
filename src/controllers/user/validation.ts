import UserRepository from './../../repositories/users/UserRepository';
import * as mongoose from 'mongoose';
const userRepository = new UserRepository();

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
            errorMessage: 'Name is required'

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
            errorMessage: 'Dob is required'
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
            in: ['body'],
            custom: (id) => {
                const _id = id;
                const check = mongoose.isValidObjectId(_id);
                if (!check) {
                    throw { error: 'Not a MongoDB ID' };
                }
            }
        }
        ,
        dataToUpdate: {
            in: ['body'],
            required: true,
            isObject: true,
            custom: async (dataToUpdate) => {

                console.log('-----------------');

                try {
                    const errorKeyArray: string[] = [];
                    const user = await userRepository.findTheData({ deletedAt: undefined });
                    const dataToUpdateKeys = Object.keys(dataToUpdate);
                    console.log(user);
                    await dataToUpdateKeys.forEach(dataKey => {
                        console.log('----------------', user[0]['_doc'], dataToUpdateKeys.length, user[0].hasOwnProperty(dataKey));
                        if (!user[0].hasOwnProperty(dataKey)) {
                            throw ({ error: 'Invalid Data ' + dataKey });
                        }

                    });

                }
                catch (error) {
                    throw error;

                }

            }
        },
    }


};
export default validation;