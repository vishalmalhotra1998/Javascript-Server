import { Request, Response } from 'express';
import UserRepository from '../../repositories/users/UserRepository';
import SystemResponse from '../../libs/SystemResponse';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import IRequest from '../../libs/routes/IRequest';
import * as jwt from 'jsonwebtoken';
import config from './../../config/configuration';


class UserController {

    static instance;
    userRepository = new UserRepository();
    static getInstance = (): UserController => {

        if (!UserController.instance) {
            return UserController.instance = new UserController();
        }

        return UserController.instance;

    }

    me = (req: IRequest, res: Response): void => {
        SystemResponse.success(res, req.user, 'Trainee Data Retrived');
    }

    login = (req: any, res: Response): void => {

        const { email, password } = req.user[0];
        const loginPassword = req.decodeUser.password;

        this.userRepository.findTheData({ email }).then(async data => {

            if (!data) {
                SystemResponse.success(res, { error: 'Invalid User' }, 'Invaid User');
            }
            else {
                console.log(password, loginPassword);
                const result = await bcrypt.compare(loginPassword, password);
                if (result) {

                    const token = jwt.sign({ email, password }, config.SECRET_KEY, { expireIn: 60 * 15 });
                    SystemResponse.success(res, token, 'Token generated');
                }
                else {
                    SystemResponse.success(res, { error: 'Invalid Password' }, 'Invaid Password');
                }

            }

        }).catch(error => {
            throw error;
        });

    }
    get = (req: Request, res: Response): void => {

        this.userRepository.get().then(data => {
            SystemResponse.success(res, data, 'Trainee Data Founded');
        }).catch(error => {
            throw error;
        });

    }

    put = (req: Request, res: Response): void => {
        const { id, dataToUpdate } = req.body;
        this.userRepository.update(id, dataToUpdate).then(data => {
            SystemResponse.success(res, data, 'Trainee Data Updated');
        }).catch(error => {
            throw error;
        });
    }

    post = (req: Request, res: Response): void => {

        this.userRepository.create(req.body).then(user => {
            SystemResponse.success(res, user, 'Trainee Data Added');
        }).catch(error => {
            throw error;
        });

    }

    delete = (req: Request, res: Response): void => {
        const { id } = req.params;
        this.userRepository.delete(id).then(user => {
            SystemResponse.success(res, user, 'Trainee Data Deleted');
        }).catch(error => {
            throw error;
        });
    }

}
export default UserController.getInstance();