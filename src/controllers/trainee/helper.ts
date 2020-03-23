export const searching = (keysOfSearchObject, searchObject, options) => {
  const searchData = {};
  keysOfSearchObject.map((key) => {
    searchData[key] = { $regex: `^${searchObject[key]}`, $options: 'i' };
  });

  return searchData;
};
