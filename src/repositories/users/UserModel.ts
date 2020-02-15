import * as mongoose from 'mongoose';
import { IUserModel } from './IUsermodel';
import UserSchema from './UserSchema';

export const userSchema = new UserSchema({
    collection: 'user'
});

export const userModel: mongoose.Model<IUserModel> = mongoose.model<IUserModel>(
    'user', userSchema, 'Users', true);
