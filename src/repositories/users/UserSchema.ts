import * as mongoose from 'mongoose';
export default class UserSchema extends mongoose.Schema{
    constructor(options) {
        const userSchema = {
            id: String,
            name: String,
            address: String,
            dob: Date,
            mobileNumber: Number,
            hobbies: [String]
        };
        super(userSchema, options);

    }
}


