import UserRepository from '../repositories/users/UserRepository';
import config from './../config/configuration';
import * as bcrypt from 'bcrypt';
const userRepository = new UserRepository();

export default async () => {
    const saltRounds = 10;
    const { PASSWORD: loginPassword } = config;
    let hashPassword: string;
    await bcrypt.hash(loginPassword, saltRounds).then((async hash => {

        hashPassword = hash;

    })).catch(error => {
        if (error) {
            throw error;
        }
    });
    const user = {
        name: 'Vishal Malhotra',
        address: 'Noida',
        dob: new Date('02-12-1998'),
        email: 'trainee@successive.tech',
        password: hashPassword,
        role: 'trainee',
        mob: 8744907196,
        hobbies: ['Singing', 'guitar']

    };

    userRepository.count()
        .then((count) => {

            if (!count) {
                return userRepository.create(user).then((res) => {
                    console.log('User Added Successfully', res);
                });
            }
            console.log('User already Exist');

        });

};
