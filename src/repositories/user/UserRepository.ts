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

    list = (query: any = {}) => {
        return super.list(query);
    }

    delete = (data: any) => {
        return super.delete(data);
    }

    update = (data: object, dataToUpdate: object) => {
        return super.update(data, dataToUpdate);
    }

    get = (query) => {
        return super.get(query);
    }
}

export default UserRepository;