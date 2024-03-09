export const FindObjectById = (arrData, id: string) => {
  const foundObjectById = arrData.find((obj) => obj.id === id);
  return foundObjectById;
};
