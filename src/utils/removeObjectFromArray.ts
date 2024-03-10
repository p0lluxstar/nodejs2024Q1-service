import { db } from 'src/data/db';

export const RemoveObjectFromArray = (dataArr, id, property) => {
  db[property] = dataArr.filter((album) => album.id !== id);
};
