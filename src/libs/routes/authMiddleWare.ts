import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../../config/configuration';
import hasPermission from './permissions';

export default (module, permissionType) => (req: Request, res: Response, next: NextFunction) => {
    try {

        const token: string = req.headers.authorization;
        const { SECRET_KEY: secretKey } = config;

        const decodeUser = jwt.verify(token, secretKey);
        if (!decodeUser) {
            next({
                status: 403,
                error: 'Unauthorized Acess',
                message: 'Unauthorized Acess'
            });
        }
        if (!hasPermission(module, decodeUser['role'], permissionType)) {
            next({
                status: 403,
                error: 'Unauthorized Acess',
                message: 'Unauthorized Acess'

            })
        }
        next();
    }
    catch (error) {
        next({
            status: 403,
            error: 'Unauthorized Acess',
            message: error.message
        });
    }
};
