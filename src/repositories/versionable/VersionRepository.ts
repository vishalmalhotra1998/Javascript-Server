import * as mongoose from 'mongoose';

class VersionRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {
    private modelType: M;
    constructor(modelType) {
        this.modelType = modelType;
    }
    static generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }
    create(options): Promise<D> {
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
    async delete(originalID: any): Promise<D> {
        try {
            const _id = originalID;
            const firstData = await this.modelType.find({ _id, deletedAt: undefined });
            if (!firstData.length) {
                const data = await this.modelType.find({ originalID, deletedAt: undefined });
                console.log(data);
                if (data.length) {
                    return await this.modelType.findOneAndUpdate({ originalID, deletedAt: undefined }, { deletedAt: new Date(), deletedBy: originalID }, (error) => {
                        if (error) {
                            throw error;
                        }
                    });
                }
                else {
                    return data.length;
                }
            }
            else {
                return await this.modelType.findOneAndUpdate({ _id, deletedAt: undefined }, { deletedAt: new Date(), deletedBy: _id }, (error) => {
                    if (error) {
                        throw error;
                    }
                });

            }
        }
        catch (error) {
            throw error;
        }

    }

    async  update(originalID: any, dataToUpdate: object): Promise<D> {
        try {
            const _id = originalID;
            const firstData = await this.modelType.find({ _id, deletedAt: undefined });
            if (!firstData.length) {
                const prevData = await this.modelType.findOne({ originalID, deletedAt: undefined });
                if (prevData) {
                    const newObject = Object.assign(prevData, dataToUpdate);
                    let valueOriginalID = newObject._doc.originalID;
                    if (valueOriginalID === undefined) {
                        valueOriginalID = prevData._doc._id;
                    }
                    delete newObject._doc._id;
                    delete newObject._doc.deletedAt;
                    delete newObject._doc.deletedBy;
                    const newObject1 = newObject._doc;
                    await this.modelType.findOneAndUpdate({ originalID, deletedAt: undefined }, { deletedAt: new Date(), deletedBy: valueOriginalID });
                    return await this.modelType.create({ ...newObject1, modifiedAt: new Date(), modifiedBy: valueOriginalID, originalID: valueOriginalID });
                }
                else {
                    console.log(prevData);
                    return prevData;
                }
            }
            else {
                const prevData = await this.modelType.findOne({ _id, deletedAt: undefined });
                if (prevData) {
                    const newObject = Object.assign(prevData, dataToUpdate);
                    let valueOriginalID = newObject._doc.originalID;
                    if (valueOriginalID === undefined) {
                        valueOriginalID = prevData._doc._id;
                    }
                    delete newObject._doc._id;
                    delete newObject._doc.deletedAt;
                    delete newObject._doc.deletedBy;
                    const newObject1 = newObject._doc;
                    await this.modelType.findByIdAndUpdate({ _id, deletedAt: undefined }, { deletedAt: new Date(), deletedBy: valueOriginalID });
                    return await this.modelType.create({ ...newObject1, modifiedAt: new Date(), modifiedBy: valueOriginalID, originalID: valueOriginalID });
                }
                else {
                    console.log(prevData);
                    return prevData;
                }
            }
        }
        catch (error) {
            return error;
        }

    }
    get() {
        try {

            return this.modelType.find({ deletedBy: undefined }, (error) => {
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