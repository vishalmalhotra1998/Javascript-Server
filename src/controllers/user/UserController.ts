import { Request, Response } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
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
        SystemResponse.success(res, req.user, 'Trainee Data Retrieved');
    }

    login = async (req: any, res: Response): Promise<void> => {
        const { email, password: loginPassword } = req.body;
        try {
            const data = await this.userRepository.get({ email });
            if (!data) {
                throw ({ message: 'Email is invalid' });
            }
            const result = await bcrypt.compare(loginPassword, data.password);
            if (result) {

                const _id = data.originalId;
                const role = data.role;
                const token = jwt.sign({ email, _id , role }, config.SECRET_KEY, { expiresIn: (60 * 60) / 4 });
                SystemResponse.success(res, token, 'Token generated');
            }
            else {
                throw ({ message: 'Invalid Password' });
            }
        }
        catch (error) {
            SystemResponse.failure(res, error);
        }



    }
    get = async (req: Request, res: Response): Promise<void> => {
        try {
            const query = req.query;
            const user = await this.userRepository.list(query);
            if (!user) {
                throw ({ error: 'No Data To Find' });

            }
            SystemResponse.success(res, user, 'Trainee Data Founded');
        }
        catch (error) {
            SystemResponse.failure(res, error);
        }

    }

    put = async (req: IRequest, res: Response): Promise<void> => {
        const { id, dataToUpdate } = req.body;
        const authId = req.user.originalId;
        try {
            const data = await this.userRepository.update({ id, authId }, dataToUpdate);
            if (data) {
                SystemResponse.success(res, data, 'Trainee Data Updated');
            }
            else {
                throw ({ message: 'Not found' });

            }
        }
        catch (error) {
            SystemResponse.failure(res, error);

        }
    }

    post = async (req: IRequest, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;
            const emailLowerCase = email.toLowerCase();
            console.log(email, password);
            const checkForPreviousUser = await this.userRepository.get({ email: emailLowerCase, deletedAt: undefined });
            if (!checkForPreviousUser) {
                const saltTable = 10;
                const loginPassword = await bcrypt.hash(password, saltTable);
                const user = Object.assign(req.body, { password: loginPassword, email: emailLowerCase });
                const authId = req.user.originalId;
                const data = await this.userRepository.create({ user, authId });

                SystemResponse.success(res, data, 'Trainee Created');
            }
            else {
                throw ({ message: 'Email already been used' });
            }
        }
        catch (error) {

            SystemResponse.failure(res, error);
        }
    }

    delete = async (req: IRequest, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const authId = req.user.originalId;
            const user = await this.userRepository.delete({ id, authId });
            if (user) {
                SystemResponse.success(res, user, 'Trainee Data Deleted');
            }
            else {
                throw ({ message: 'Not Found' });
            }
        }
        catch (error) {
            SystemResponse.failure(res, error);
        }
    }

}
export default UserController.getInstance();
