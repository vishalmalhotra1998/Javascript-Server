import * as mongoose from 'mongoose';
import VersionSchema from './../versionable/ VersionableSchema';
export default class UserSchema extends VersionSchema {
    constructor(options) {
        const userSchema = {
            id: String,
            name: String,
            email: String,
            password: String,
            address: String,
            dob: Date,
            role: String,
            mobileNumber: Number,
            hobbies: [String]
        };
        super(userSchema, options);

    }
}


