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

  count = (): Promise<void> => {
    return super.count();
  }

  list = (query: any = {}, options: any = {}): Promise<IUserModel[]> => {
    return super.list(query, options);
  }

  delete = (data: any): Promise<IUserModel> => {
    return super.delete(data);
  }

  update = (data: object, dataToUpdate: object): Promise<IUserModel> => {
    return super.update(data, dataToUpdate);
  }

  get = (query: object): Promise<IUserModel> => {
    return super.get(query);
  }
}

export default UserRepository;
