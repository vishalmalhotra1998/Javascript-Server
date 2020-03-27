import { Request, Response } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
import SystemResponse from '../../libs/SystemResponse';
import * as bcrypt from 'bcrypt';
import IRequest from '../../libs/routes/IRequest';
import * as jwt from 'jsonwebtoken';
import config from './../../config/configuration';


class UserController {

    static instance;
    private userRepository: UserRepository = new UserRepository();
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
            if (!result) {
              throw ({ message: 'Invalid Password' });
            }
            const _id = data.originalId;
            const role = data.role;
            const token = jwt.sign({ email, _id , role }, config.SECRET_KEY, { expiresIn: (60 * 60) / 4 });
            SystemResponse.success(res, token, 'Token generated');
        }
        catch (error) {
            SystemResponse.failure(res, error);
        }
    }

}
export default UserController.getInstance();
