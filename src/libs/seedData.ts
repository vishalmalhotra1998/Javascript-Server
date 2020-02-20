import UserRepository from '../repositories/user/UserRepository';
import { userModel } from '../repositories/user/UserModel';
const userRepository = new UserRepository();

export default () => {

    const user = {
        name: 'Vishal Malhotra',
        address: 'Noida',
        dob: new Date('02-12-1998'),
        email: 'vishalmalhotra1998',
        mob: 8744907196,
        hobbies: ['Singing', 'guitar']

    };

    userRepository.count().then((count) => {

        if (!count) {
            return userRepository.create(user).then((res) => {
                console.log('User Added Successfully', res);
            });
        }

    });
};
