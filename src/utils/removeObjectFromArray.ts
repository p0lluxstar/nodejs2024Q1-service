import { db } from 'src/data/db';

export const RemoveObjectFromArray = (id, property) => {
  db[property] = db[property].filter((item) => item.id !== id);
};

export const RemoveObjectFromArrayTwo = (id, property1, property2) => {
  db[property1][property2] = db[property1][property2].filter(
    (item) => item.id !== id,
  );
};
