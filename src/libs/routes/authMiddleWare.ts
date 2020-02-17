import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../../config/configuration';
import hasPermission from './permissions';
import UserRepository from '../../repositories/users/UserRepository';
import IRequest from './IRequest';
const userRepository = new UserRepository();

export default (module, permissionType) => (req: IRequest, res: Response, next: NextFunction) => {
    try {

        const token: string = req.headers.authorization;
        const { SECRET_KEY: secretKey } = config;
        const decodeUser = jwt.verify(token, secretKey);

        if (!decodeUser) {
            next({
                status: 403,
                error: 'Unauthorized Access',
                message: 'Unauthorized Access'
            });
        }
        const { _id, email } = decodeUser;
        userRepository.findTheData({ _id, email }).then(user => {
            if (!user.length) {
                next({
                    status: 403,
                    error: 'Unauthorized Access',
                    message: 'User does not exist'
                });
            }
            req.user = user;
        }).then(() => {
            if (!hasPermission(module, decodeUser.role, permissionType)) {
                next({
                    status: 403,
                    error: 'Unauthorized Access',
                    message: 'Unauthorized Access'

                });
            }
            next();
        }).catch(error => {
            throw error;
        });

    }
    catch (error) {
        next({
            status: 403,
            error: 'Unauthorized Access',
            message: error.message
        });
    }
};
