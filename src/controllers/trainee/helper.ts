import UserRepository from './../../repositories/user/UserRepository';
export const searching = async (keysOfSearchObject, searchObject, options): Promise<[]> => {
  const userRepository = new UserRepository();
  const searchData = {};
  keysOfSearchObject.map((key) => {
    searchData[key] = { $regex: `^${searchObject[key]}`, $options: 'i' };
  });
  const data = await userRepository.list(searchData, options);
  return data;
};
