import * as mongoose from 'mongoose';
import VersionSchema from './../versionable/ VersionableSchema';
export default class UserSchema extends VersionSchema {
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


