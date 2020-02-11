import { Request, Response } from 'express';
import UserRepository from '../../repositories/users/UserRepository';
import SystemResponse from '../../libs/SystemResponse';
import * as mongoose from 'mongoose';
import IRequest from '../../libs/routes/IRequest';


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