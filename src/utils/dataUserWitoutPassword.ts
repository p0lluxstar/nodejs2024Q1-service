export const DataUserWitoutPassword = (dataUser: any) => {
  const newArray = [];
  dataUser.forEach((item: any) => {
    const newItem = { ...item };
    delete newItem.password;
    newArray.push(newItem);
  });
  return newArray;
};
