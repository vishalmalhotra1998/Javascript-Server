import { Request, Response } from 'express';
import UserRepository from '../../repositories/users/UserRepository';
import SystemResponse from '../../libs/SystemResponse';
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
        const { email: email, password: loginPassword } = req.body;

        this.userRepository.findTheData({ email }).then(async data => {

            if (!data) {
                SystemResponse.success(res, { error: 'Invalid User' }, 'Invaid User');
            }
            else {

                const result = await bcrypt.compare(loginPassword, data[0].password);
                if (result) {

                    const _id = data[0]._id;
                    const role = data[0].role;
                    const token = jwt.sign({ email, _id, role }, config.SECRET_KEY, { expiresIn: 60 * 60 });
                    SystemResponse.success(res, token, 'Token generated');
                }
                else {
                    SystemResponse.success(res, { error: 'Invalid Password' }, 'Invalid Password');
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

    put = async (req: Request, res: Response): Promise<void> => {
        const { id, dataToUpdate } = req.body;
        try {
            const data = await this.userRepository.update(id, dataToUpdate);


            SystemResponse.success(res, data, 'Trainee Data Updated');
        }
        catch (error) {
            SystemResponse.success(res, error, 'Invalid Input');

        }
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
            if (user !== undefined) {
                SystemResponse.success(res, user, 'Trainee Data Deleted');
            }
            else {
                SystemResponse.success(res, { error: 'Not Found' }, 'No data to delete');
            }
        }).catch(error => {
            throw error;
        });
    }

}
export default UserController.getInstance();