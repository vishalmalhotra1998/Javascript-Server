import { userModel } from './UserModel';
import * as mongoose from 'mongoose';
import { IUserModel } from './IUsermodel';
import IUserCreate from './IUserCreate';
import VersionRepository from '../versionable/VersionRepository';

class UserRepository extends VersionRepository<IUserModel, mongoose.model<IUserModel>> {

    private userModel: mongoose.model<IUserModel>;
    constructor() {
        super(userModel);
    }
    static generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }
    create = (data: IUserCreate): Promise<IUserModel> => {
        console.log(data);
        return super.create(data);
    }
    count = () => {
        console.log('Erorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
        return  super.count();

    }

    findTheData = (data) => {
        try {
            return this.userModel.find(data, (error) => {
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
            return this.userModel.findByIdAndDelete(id, (error) => {
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
            return this.userModel.findByIdAndUpdate(id, dataToUpdate, (error) => {
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

            return this.userModel.find((error) => {
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

export default UserRepository;