import { userModel } from './UserModel';
import * as mongoose from 'mongoose';
import { IUserModel } from './IUserModel';
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
        return super.findTheData(data);
    }

    delete = (id: any) => {
        return super.delete(id);
    }

    update = (_id: any, dataToUpdate: any) => {
        return super.update(_id, dataToUpdate);
    }

    get = () => {
        return super.get();
    }
}

export default UserRepository;