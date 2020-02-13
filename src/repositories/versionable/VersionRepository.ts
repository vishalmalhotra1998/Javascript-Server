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
    create = (options): Promise<D> => {
        const id = VersionRepository.generateObjectId();
        console.log('-----verrrrr-----')
        return this.modelType.create({
            ...options,
            _id: id,
            originalID: id,
        });
    }
    count = (): Promise<D> => {
        console.log('Inside Versionable');
        return this.modelType.countDocuments();
    }

    findTheData = (data) => {
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


    delete = (id: any) => {
        try {
            return this.modelType.findByIdAndDelete(id, (error) => {
                if (error) {
                    throw error;
                }
            });
        }
        catch (error) {
            throw error;
        }

    }
    update = (id: any, dataToUpdate: object) => {
        try {
            return this.modelType.findByIdAndUpdate(id, dataToUpdate, (error) => {
                if (error) {
                    throw error;
                }
            });
        } catch (error) {
            throw error;
        }
    }
    get = () => {
        try {

            return this.modelType.find((error) => {
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