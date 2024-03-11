export const ChangePropertyObjectToNull = (dataArr, id, property) => {
  const obj = dataArr.find((obj: any) => obj[property] === id);
  if (obj) obj[property] = null;
};
