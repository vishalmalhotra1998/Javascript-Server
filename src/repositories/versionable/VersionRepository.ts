import * as mongoose from 'mongoose';
import * as queryString from 'query-string';


class VersionRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {
  private modelType: M;
  constructor(modelType) {
    this.modelType = modelType;
  }
  static generateObjectId() {
    return String(mongoose.Types.ObjectId());
  }
  async create(options): Promise<D> {
    const id = VersionRepository.generateObjectId();
    const { user, authId } = options;
    return await this.modelType.create({
      ...user,
      _id: id,
      createdBy: authId,
      originalId: id

    });

  }

  async count() {
    return await this.modelType.countDocuments();
  }

  async get(data: object): Promise<D> {
    return await this.modelType.findOne({ ...data, deletedBy: undefined }).lean();
  }
  async delete(data: any): Promise<D> {
    const { id, authId } = data;
    const update = { deletedAt: new Date(), deletedBy: authId };
    return await this.modelType.findOneAndUpdate({ originalId: id, deletedAt: undefined }, update, { new: true });

  }

  async  update(data: any, dataToUpdate: object): Promise<D> {
    const { id, authId } = data;
    console.log(data);
    const currentData = await this.modelType.findOne({ originalId: id, deletedAt: undefined }).lean();
    const newUpdatedData = Object.assign(currentData, dataToUpdate);
    const update = { updatedBy: authId, updatedAt: new Date() };
    delete newUpdatedData._id;
    await this.delete({ id, authId });
    console.log(newUpdatedData, update);
    return await this.modelType.create({ ...newUpdatedData, ...update });


  }
  async list(query: any = {}, options: any = {}) {
    const { sortBy } = options;
    query.deletedAt = undefined;
    delete options.sortBy;
    options = { ...options, sort: sortBy };
    return await this.modelType.find(query, undefined, options).collation({locale: 'en'});

  }
}

export default VersionRepository;
