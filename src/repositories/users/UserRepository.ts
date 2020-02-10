import { userModel } from './UserModel';
import * as mongoose from 'mongoose';
import { IUserModel } from './IUsermodel';
import IUserCreate from './IUserCreate';

class UserRepository {

    private userModel: mongoose.model<IUserModel>;
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
        try {
            return this.userModel.findByIdAndDelete(id, (err) => {
                if (err) console.log(err);
            });
        }
        catch (error) {
            throw error;
        }

    }
    update = (id: any, dataToUpdate: object) => {
        try {
            return this.userModel.findByIdAndUpdate(id, dataToUpdate);
        } catch (err) {
            throw err;
        }
    }
    get = () => {
        try {

            return this.userModel.find();
        }
        catch (err) {
            throw err;
        }
    }
}

export default UserRepository;