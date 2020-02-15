import * as mongoose from 'mongoose';

export default class VersionSchema extends mongoose.Schema {

    constructor(schema, options) {
        const baseSchema = {
            createdAt: {
                type: Date,
                default: Date.now
            },
            originalID: String,
            modifiedAt: Date,
            modifiedBy: String,
            deletedAt: Date,
            deletedBy: String,
            createdBy: String
        };
        super({ ...schema, ...baseSchema }, options);
    }

}
