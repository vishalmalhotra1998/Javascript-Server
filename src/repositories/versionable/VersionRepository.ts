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

    async findTheData(data) {
        try {
            console.log('Yahna');
            console.log(data);
            return await this.modelType.find(data, (error) => {
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
                    return data[0];
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
                if (!prevData) {
                    throw ({ error: 'ID is invalid' });

                }

                const newObject = Object.assign(prevData, dataToUpdate);
                const valueOriginalID = newObject['originalID'];
                delete newObject['_doc']['_id'];
                delete newObject['_doc']['deleteAt'];
                delete newObject['_doc']['deleteBy'];
                const newObject1 = newObject;
                await this.modelType.findOneAndUpdate({ originalID, deletedAt: undefined }, { deletedAt: new Date(), deletedBy: valueOriginalID });
                return await this.modelType.create({ ...newObject1['_doc'], modifiedAt: new Date(), modifiedBy: valueOriginalID, originalID: valueOriginalID });

            }

            else {
                const prevData = await this.modelType.findOne({ _id, deletedAt: undefined });
                if (!prevData) {
                    throw { error: 'ID is Invalid' };

                }
                const newObject = Object.assign(prevData, dataToUpdate);
                let valueOriginalID = newObject['originalID'];
                if (valueOriginalID === undefined) {
                    valueOriginalID = prevData['_id'];
                }
                delete newObject['_doc']['_id'];
                delete newObject['_doc']['deleteAt'];
                delete newObject['_doc']['deleteBy'];
                console.log(newObject);
                const newObject1 = newObject;
                await this.modelType.findByIdAndUpdate({ _id, deletedAt: undefined }, { deletedAt: new Date(), deletedBy: valueOriginalID });
                return await this.modelType.create({ ...newObject1['_doc'], modifiedAt: new Date(), modifiedBy: valueOriginalID, originalID: valueOriginalID });

            }
        }
        catch (error) {
            throw { error: 'Invalid Id' };
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