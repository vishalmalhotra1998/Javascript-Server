import * as mongoose from 'mongoose';

export default class VersionSchema extends mongoose.Schema {

    constructor(schema, options) {
        const baseSchema = {
            createdAt: {
                type: Date,
                default: Date.now
            },
            originalId: String,
            updatedAt: Date,
            updatedBy: String,
            deletedAt: Date,
            deletedBy: String,
            createdBy: String
        };
        super({ ...schema, ...baseSchema }, options);
    }

}
