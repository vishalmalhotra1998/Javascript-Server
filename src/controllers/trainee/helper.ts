export const searching = async (keysOfSearchObject, searchObject, options): Promise<{}> => {
  const searchData = {};
  keysOfSearchObject.map((key) => {
    searchData[key] = { $regex: `^${searchObject[key]}`, $options: 'i' };
  });

  return await searchData;
};
