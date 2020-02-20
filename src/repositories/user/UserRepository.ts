import { userModel } from './UserModel';
import * as mongoose from 'mongoose';
import { IUserModel } from './IUserModel';
import IUserCreate from './IUserCreate';

class UserRepository {

    private userModel: mongoose.Model<IUserModel>;
    constructor() {
        this.userModel = userModel;
    }
    create = (data: IUserCreate) => {

        return this.userModel.create(data);
    }
    count = () => {
        return this.userModel.countDocuments();
    }
    findTheData = (data) => {
        return this.userModel.findById(data);
    }
    delete = (id: any) => {
        return this.userModel.findByIdAndDelete(id);
    }
    update = (id: any, dataToUpdate: object) => {
        return this.userModel.findByIdAndUpdate(id, dataToUpdate);
    }
    get = () => {
        return this.userModel.find();
    }
}

export default UserRepository;