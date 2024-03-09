export interface Idb {
  users: Iuser[];
}

export interface Iuser {
  id: string;
  login: string;
  password?: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
