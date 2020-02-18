import * as mongoose from 'mongoose';
export default interface IVersionModel extends mongoose.Document {

    createdAt: Date;
    createdBy: string;
    modifiedAt: Date;
    modifiedBy: string;
    deletedAt: Date;
    deletedBy: string;
    originalId: string;

}