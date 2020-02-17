import { Request } from 'express';
import { IUserModel } from '../../repositories/users/IUsermodel';

export default interface IRequest extends Request {
    user: IUserModel;
    decodeUser: object;
}