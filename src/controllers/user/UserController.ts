import { Request, Response } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
import SystemResponse from '../../libs/SystemResponse';

class UserController {

    static instance;
    userRepository = new UserRepository();
    static getInstance = (): UserController => {

        if (!UserController.instance) {
            return UserController.instance = new UserController();
        }

        return UserController.instance;

    }

    get = (req: Request, res: Response): void => {
        this.userRepository.get().then(data => {
            SystemResponse.success(res, data, 'Trainee Data Founded');
        }).catch(error => {
            SystemResponse.failure(res, error);
        });

    }

    put = (req: Request, res: Response): void => {
        const { id, dataToUpdate } = req.body;
        this.userRepository.update(id, dataToUpdate).then(data => {
            SystemResponse.success(res, data, 'Trainee Data Updated');
        }).catch(error => {
            SystemResponse.failure(res, error);
        });
    }

    post = (req: Request, res: Response): void => {
        this.userRepository.create(req.body).then(user => {
            SystemResponse.success(res, user, 'Trainee Data Added');
        }).catch(error => {
            SystemResponse.failure(res, error);
        });

    }

    delete = (req: Request, res: Response): void => {
        const { id } = req.params;
        this.userRepository.delete(id).then(user => {
            SystemResponse.success(res, user, 'Trainee Data Deleted');
        }).catch(error => {
            SystemResponse.failure(res, error);
        });
    }

}
export default UserController.getInstance();