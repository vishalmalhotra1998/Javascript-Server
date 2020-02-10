import * as mongoose from 'mongoose';
import { stringify } from 'querystring';
export default class UserSchema extends mongoose.Schema {
    constructor(options) {
        const userSchema = {
            id: String,
            name: String,
            email: String,
            address: String,
            dob: Date,
            mobileNumber: Number,
            hobbies: [String]
        };
        super(userSchema, options);

    }
}


