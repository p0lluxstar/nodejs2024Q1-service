export const DataUserWitoutPassword = (dataUser) => {
  const newArray = [];
  dataUser.forEach((item) => {
    const newItem = { ...item };
    delete newItem.password;
    newArray.push(newItem);
  });
  return newArray;
};
