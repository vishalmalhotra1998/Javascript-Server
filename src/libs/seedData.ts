import UserRepository from '../repositories/user/UserRepository';
import config from './../config/configuration';
import * as bcrypt from 'bcrypt';


export default async () => {
  const saltRounds = 10;
  const { PASSWORD: loginPassword } = config;
  let hashPassword: string;
  const userRepository = new UserRepository();
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

  const count = await userRepository.count();

  if (!count) {
    const authId = '5e577abc417c5b3a22164a8c';
    return userRepository.create({ user, authId }).then((res) => {
      console.log('User Added Successfully', res);
    });
  }

};
