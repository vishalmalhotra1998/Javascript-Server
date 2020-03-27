import { userModel } from './UserModel';
import * as mongoose from 'mongoose';
import { IUserModel } from './IUserModel';
import VersionRepository from '../versionable/VersionRepository';

class UserRepository extends VersionRepository<IUserModel, mongoose.Model<IUserModel>> {

  constructor() {
    super(userModel);
  }
  static generateObjectId() {
    return String(mongoose.Types.ObjectId());
  }
  async create (data: any, authId= {}): Promise<IUserModel> {
    return super.create(data, authId);
  }

  async count(): Promise<number> {
    return super.count();
  }

  async list (query: any = {}, options: any = {}): Promise<IUserModel[]> {
    return super.list(query, options);
  }

  async delete (data: any): Promise<IUserModel> {
    return super.delete(data);
  }

  async update (data: object, dataToUpdate: object): Promise<IUserModel> {
    return super.update(data, dataToUpdate);
  }

  async get (query: object): Promise<IUserModel> {
    return super.get(query);
  }
}

export default UserRepository;
