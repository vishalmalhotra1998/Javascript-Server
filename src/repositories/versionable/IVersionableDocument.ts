import * as mongoose from 'mongoose';
export default interface IVersionModel extends mongoose.document {

    createID: Date;

}