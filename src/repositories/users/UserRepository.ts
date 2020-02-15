import { userModel } from './UserModel';
import * as mongoose from 'mongoose';
import { IUserModel } from './IUsermodel';
import IUserCreate from './IUserCreate';
import VersionRepository from '../versionable/VersionRepository';

class UserRepository extends VersionRepository<IUserModel, mongoose.Model<IUserModel>> {

    private userModel: mongoose.Model<IUserModel>;
    constructor() {
        super(userModel);
    }
    static generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }
    create = (data: any): Promise<IUserModel> => {
        return super.create(data);
    }

    count = () => {

        return super.count();

    }

    findTheData = (data) => {
        try {
            return super.findTheData(data);
        }
        catch (error) {
            throw error;
        }
    }


    delete = (id: any) => {
        try {
            return super.delete(id);
        }
        catch (error) {
            throw error;
        }

    }
    update = (_id: any, dataToUpdate: any) => {
        try {
            return super.update(_id, dataToUpdate);
        } catch (error) {
            throw error;
        }
    }
    get = () => {
        try {

            return super.get();
        }
        catch (error) {
            throw error;
        }
    }
}

export default UserRepository;