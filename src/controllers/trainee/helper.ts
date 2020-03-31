export const searching = (searchObject) => {
  const searchData = {};
  Object.keys(searchObject).map((key) => {
    searchData[key] = { $regex: `^${searchObject[key]}`, $options: 'i' };
  });

  return searchData;
};
