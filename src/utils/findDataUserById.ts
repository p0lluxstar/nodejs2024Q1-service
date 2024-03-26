export const FindObjectById = (arrData: any, id: string) => {
  const foundObjectById = arrData.find((obj: any) => obj.id === id);
  return foundObjectById;
};
