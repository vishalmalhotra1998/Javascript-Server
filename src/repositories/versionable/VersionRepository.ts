import * as mongoose from 'mongoose';


class VersionRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {
    private modelType: M;
    constructor(modelType) {
        this.modelType = modelType;
    }
    static generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }
    async create(options): Promise<D> {
        const id = VersionRepository.generateObjectId();
        let valueOriginalID = options.originalID;
        if (valueOriginalID === undefined) {
            valueOriginalID = id;
        }
        console.log(valueOriginalID);
        return await this.modelType.create({
            ...options,
            _id: id,
            createdBy: valueOriginalID
        });
    }

    count() {
        return this.modelType.countDocuments();
    }

    async findTheData(data): Promise<D> {
        try {
            console.log(data);
            return await this.modelType.findOne(data, (error) => {
                if (error) {
                    throw error;
                }
            }).lean();
        }
        catch (error) {
            throw error;
        }
    }
    async delete(originalID: any): Promise<D> {
        try {
            const _id = originalID;
            const firstData = await this.modelType.findOne({ _id, deletedAt: undefined }).lean();
            if (!firstData) {
                const data = await this.modelType.findOne({ originalID, deletedAt: undefined }).lean();
                if (data) {
                    return await this.modelType.findOneAndUpdate({ originalID, deletedAt: undefined }, { deletedAt: new Date(), deletedBy: originalID }, (error) => {
                        if (error) {
                            throw error;
                        }
                    });
                }
                else {
                    return data;
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
                const prevData = await this.modelType.findOne({ originalID, deletedAt: undefined }).lean();
                if (!prevData) {
                    throw ({ error: 'ID is invalid' });

                }
                const newObject = Object.assign(prevData, dataToUpdate);
                const valueOriginalID = newObject.originalID;
                delete newObject._id;
                await this.modelType.findOneAndUpdate({ originalID, deletedAt: undefined }, { deletedAt: new Date(), deletedBy: valueOriginalID });
                return await this.create({ ...newObject, modifiedAt: new Date(), modifiedBy: valueOriginalID, originalID: valueOriginalID });

            }

            else {
                const prevData = await this.modelType.findOne({ _id, deletedAt: undefined }).lean();
                if (!prevData) {
                    throw { error: 'ID is Invalid' };

                }
                const newObject = Object.assign(prevData, dataToUpdate);
                let valueOriginalID = newObject.originalID;
                if (valueOriginalID === undefined) {
                    valueOriginalID = prevData._id;
                }
                delete newObject._id;
                await this.modelType.findOneAndUpdate({ _id, deletedAt: undefined }, { deletedAt: new Date(), deletedBy: valueOriginalID });
                return await this.create({ ...newObject, modifiedAt: new Date(), modifiedBy: valueOriginalID, originalID: valueOriginalID });

            }
        }
        catch (error) {
            throw { error: 'Invalid is Id' };
        }

    }
    async get(skip, limit, sortBy, search): Promise<D[]> {
        try {
            console.log('In this');
            console.log(search);
            const { name, email } = search;
            if (!Object.keys(search).length) {
                console.log('Search w');
                return await this.modelType.find({ deletedBy: undefined }, (error) => {
                    if (error) {
                        throw error;
                    }
                }).sort(String(sortBy)).skip(Number(skip)).limit(Number(limit));
            }
            else {
                console.log('Search');
                const newSearch = JSON.stringify(search);
                const newSearch1 = JSON.parse(newSearch);
                console.log('check', newSearch1);
                return await this.modelType.find({ ...newSearch1, deletedBy: undefined }, (error) => {
                    if (error) {
                        throw error;
                    }
                }).sort(String(sortBy)).skip(Number(skip)).limit(Number(limit));
            }
        }
        catch (error) {
            throw error;
        }
    }
}

export default VersionRepository;