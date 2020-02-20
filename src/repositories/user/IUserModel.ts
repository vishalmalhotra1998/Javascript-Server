import { Document } from 'mongoose';

export interface IUserModel extends Document {
    id: string;
    name: string;
    address: string;
    dob: Date;
    mobileNumber: number;
    hobbies: string[];
}