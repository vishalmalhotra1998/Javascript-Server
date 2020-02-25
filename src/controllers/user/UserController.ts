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

    login = async (req: any, res: Response): Promise<void> => {
        const { email, password: loginPassword } = req.body;
        try {
            const data = await this.userRepository.findTheData({ email });
            if (!data) {
                throw ({ error: 'Email is invalid' });
            }
            const result = await bcrypt.compare(loginPassword, data.password);
            if (result) {

                const _id = data.id;
                const role = data.role;
                const token = jwt.sign({ email, _id, role }, config.SECRET_KEY, { expiresIn: (60 * 60) / 4 });
                SystemResponse.success(res, token, 'Token generated');
            }
            else {
                throw ({ error: 'Invalid Password' });
            }
        }
        catch (error) {
            SystemResponse.success(res, error, 'Invalid Input');
        }



    }
    get = async (req: Request, res: Response): Promise<void> => {
        try {
            const { skip, limit, sortBy } = req.query;
            delete req.query.skip;
            delete req.query.limit;
            delete req.query.sortBy;
            const user = await this.userRepository.get(skip, limit, sortBy, req.query);
            if (!user) {
                throw ({ error: 'No Data To Find' });

            }
            SystemResponse.success(res, user, 'Trainee Data Founded');
        }
        catch (error) {
            SystemResponse.success(res, error, 'No data to Update');
        }

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

    post = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;
            const emailLowerCase = email.toLowerCase();
            const checkForPreviousUser = await this.userRepository.findTheData({ email: emailLowerCase, deletedAt: undefined });
            if (!checkForPreviousUser) {
                const saltTable = 10;
                const loginPassword = await bcrypt.hash(password, saltTable);
                const passwordEncryptUser = Object.assign(req.body, { password: loginPassword, email: emailLowerCase });
                const user = await this.userRepository.create(passwordEncryptUser);

                SystemResponse.success(res, user, 'Trainee Created');
            }
            else {
                throw ({ error: 'Email already been used' });
            }
        }
        catch (error) {

            SystemResponse.success(res, error, 'Email already beene used');
        }
    }

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const user = await this.userRepository.delete(id);
            console.log('deleted', user);
            if (user) {
                SystemResponse.success(res, user, 'Trainee Data Deleted');
            }
            else {
                SystemResponse.success(res, { user: 'Not Found' }, 'No data to delete');
            }
        }
        catch (error) {
            throw error;
        }
    }

}
export default UserController.getInstance();