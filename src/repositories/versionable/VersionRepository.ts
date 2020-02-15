import { userModel } from './../users/UserModel';
import * as mongoose from 'mongoose';
import { IUserModel } from './../users/IUsermodel';
import IUserCreate from './../users/IUserCreate';

class VersionRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {


    private modelType: M;
    constructor(modelType) {
        this.modelType = modelType;
    }

    static generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }
    public create(options): Promise<D> {
        const id = VersionRepository.generateObjectId();
        return this.modelType.create({
            ...options,
            _id: id,
            createdBy: id
        });
    }

    count() {
        return this.modelType.countDocuments();
    }

    findTheData(data) {
        try {
            return this.modelType.find(data, (error) => {
                if (error) {
                    throw error;
                }
            });
        }
        catch (error) {
            throw error;
        }
    }


    async delete(_id: any): Promise<D> {
        try {
            const data = await this.modelType.find({ _id });

            let { originalID } = data[0];
            console.log(originalID);
            if (originalID === undefined) {
                originalID = data[0]._id;
            }

            return await this.modelType.findByIdAndUpdate(_id, { deletedAt: new Date(), deletedBy: originalID }, (error) => {
                if (error) {
                    throw error;
                }
            });
        }
        catch (error) {
            throw error;
        }

    }

    async  update(_id: any, dataToUpdate: object): Promise<D> {

        const prevData = await this.modelType.findOne({ _id });
        const newObject = Object.assign(prevData, dataToUpdate);
        let valueOriginalID = newObject._doc.originalID;
        if (valueOriginalID === undefined) {
            valueOriginalID = prevData._doc._id;
        }
        delete newObject._doc._id;
        delete newObject._doc.deletedAt;
        delete newObject._doc.deletedBy;
        const newObject1 = newObject._doc;
        await this.modelType.findByIdAndUpdate(_id, { deletedAt: new Date(), deletedBy: valueOriginalID });
        return await this.modelType.create({ ...newObject1, modifiedAt: new Date(), modifiedBy: valueOriginalID, originalID: valueOriginalID });

    }
    get() {
        try {

            return this.modelType.find({ deletedBy: null }, (error) => {
                if (error) {
                    throw error;
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
}

export default VersionRepository;