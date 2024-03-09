export interface Idb {
  users: Iuser[];
  artists: Iartist[];
}

export interface Iuser {
  id: string;
  login: string;
  password?: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface Iartist {
  id: string;
  name: string;
  grammy: boolean;
}
