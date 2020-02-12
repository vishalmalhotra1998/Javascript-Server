import { userModel } from './../users/UserModel';
import * as mongoose from 'mongoose';
import { IUserModel } from './../users/IUsermodel';
import IUserCreate from './../users/IUserCreate';

class VersionRepository {

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

export default VersionRepository;