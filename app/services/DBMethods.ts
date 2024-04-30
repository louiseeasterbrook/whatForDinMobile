export const AddDocumentIdToEachDataSet = (recipeData: any[]) => {
  return recipeData._docs.map(x => ({
    ...x._data,
    Id: x.id,
  }));
};
