export const AddDocumentIdToEachDataSet = (dataArray: any[]) => {
  return dataArray._docs.map(x => ({
    ...x._data,
    Id: x.id,
  }));
};

export const AddDocumentIdToSingleData = (data: any) => {
  return {...data._data, Id: data.id};
};
