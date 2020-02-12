import * as mongoose from 'mongoose';

export default class VersionSchema extends mongoose.Schema {

    constructor(schema, option) {
        const baseSchema = {
            createdAt: {
                type: Date,
                default: Date.now
            }

        };
        super({ ...schema, ...baseSchema }, option);
    }

}
