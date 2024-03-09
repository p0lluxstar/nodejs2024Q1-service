export interface Idb {
  users: Iuser[];
  artists: Iartist[];
  tracks: Itrack[];
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

export interface Itrack {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}
