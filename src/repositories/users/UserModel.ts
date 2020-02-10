import * as mongoose from 'mongoose';
import { IUserModel } from './IUsermodel';
import UserSchema from './UserSchema';

export const userSchema = new UserSchema({
    collection: 'user'
});

export const userModel: mongoose.model<IUserModel> = mongoose.model<IUserModel>(
    'user', userSchema, 'Users', true);
